import { environment } from "./../environments/environment";
import { Injectable } from '@angular/core';
import { of, Observable, Subject, BehaviorSubject } from "rxjs";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from './models/recipe.model';
import {tap, catchError} from "rxjs/operators";
import { RecipeResponseData } from './models/response-data.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipes: Recipe[];
  recipesSubject = new Subject<Recipe[]>();

  recipe: Recipe;
  recipeSubject = new Subject<Recipe>();

  loading = new BehaviorSubject<boolean>(false);


  constructor(private http: HttpClient) {
    this.recipes = [];
  }



  // Fetches the Recipes based on parameters and also sets multiple values into localStorage
  searchRecipes(minCal: number, maxCal: number, name: string ) {
    this.loading.next(true);

    this.recipes = [];

    let searchParams = new HttpParams();
    searchParams = searchParams.append("q", name);
    searchParams = searchParams.append("calories", `${minCal}-${maxCal}`);
    searchParams = searchParams.append("app_id", environment.app_id);
    searchParams = searchParams.append("app_key", environment.app_key);
    searchParams = searchParams.append("from", String(0));
    searchParams = searchParams.append("to", String(75));
    this.http.get<RecipeResponseData>("https://api.edamam.com/search", {
      params: searchParams
    })
    .pipe(tap((responseData: RecipeResponseData) => {
      console.log("Recipes Fetched", responseData);
    }),
    catchError(this.handleError<RecipeResponseData>("Search Recipes"))
    )
    .subscribe((responseData: RecipeResponseData) => {
      responseData.hits.forEach(hit => {
        this.recipes.push(hit.recipe);
      });

      localStorage.removeItem("recipes");
      localStorage.setItem("recipes", JSON.stringify(this.recipes));

      this.recipesSubject.next(this.recipes.slice());
      this.loading.next(false);
    });
  }
  

  // Get the recipes
  getRecipes() {
    const recipes: Recipe[] = JSON.parse(localStorage.getItem("recipes"));
    return of(recipes);
  }



  // Retrieve a single http by its uri
  searchRecipe(uri: string) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append("r", uri);
    searchParams = searchParams.append("app_id", environment.app_id);
    searchParams = searchParams.append("app_key", environment.app_key);
    this.http.get<Recipe>("https://api.edamam.com/search", {
      params: searchParams
    })
    .pipe(catchError(this.handleError<Recipe>("Search Recipe")))
    .subscribe(responseData => {
      this.recipe = responseData[0];
      this.recipeSubject.next(Object.assign({}, this.recipe));
      localStorage.removeItem("recipe");
      localStorage.setItem("recipe", JSON.stringify(this.recipe));
    });
  }



  // Get a single recipe
  getRecipe() {
    const recipe = JSON.parse(localStorage.getItem("recipe"));
    return of(recipe);
  }



  // Error handling for Http Requests
  private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    console.log(`${operation} failed: ${error.message}`);
    return of(result as T);
  };
}
}
