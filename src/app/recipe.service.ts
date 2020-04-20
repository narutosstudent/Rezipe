import { environment } from "./../environments/environment";
import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject } from "rxjs";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from './models/recipe.model';
import {tap, map, catchError} from "rxjs/operators";
import { RecipeResponseData } from './models/response-data.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipes: Recipe[] = [];

  recipe: Recipe;

  loading = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) { }

  searchRecipes(minCal: number, maxCal: number, name: string) {
    this.loading.next(true);
    let searchParams = new HttpParams();
    searchParams = searchParams.append("q", name);
    searchParams = searchParams.append("calories", `${minCal}-${maxCal}`);
    searchParams = searchParams.append("app_id", environment.app_id);
    searchParams = searchParams.append("app_key", environment.app_key);
    this.http.get<RecipeResponseData>("https://api.edamam.com/search", {
      params: searchParams
    })
    .pipe(tap(responseData => {
      console.log("Recipes Fetched", responseData);
    }),
    catchError(this.handleError<RecipeResponseData>("Search Recipes"))
    )
    .subscribe(responseData => {
      responseData.hits.forEach(hit => {
        this.recipes.push(hit.recipe);
      });
      localStorage.removeItem("recipes");
      localStorage.setItem("recipes", JSON.stringify(this.recipes));
      this.loading.next(false);
    });
  }

  getRecipes() {
    let recipes = JSON.parse(localStorage.getItem("recipes"));
    return of(recipes);
  }

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
      localStorage.removeItem("recipe");
      localStorage.setItem("recipe", JSON.stringify(this.recipe));
      this.loading.next(false);
    });

  }

  private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    console.log(`${operation} failed: ${error.message}`);
    return of(result as T);
  };
}
}
