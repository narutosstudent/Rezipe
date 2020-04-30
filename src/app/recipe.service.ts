import { environment } from "./../environments/environment";
import { Injectable } from '@angular/core';
import { of, Observable, Subject } from "rxjs";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from './models/recipe.model';
import {tap, catchError} from "rxjs/operators";
import { RecipeResponseData } from './models/response-data.model';
import { UiService } from './shared/ui.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: Recipe[];
  recipesSubject = new Subject<Recipe[]>();

  private recipe: Recipe;
  recipeSubject = new Subject<Recipe>();


  constructor(private http: HttpClient, private uiService: UiService, private router: Router) {
    this.recipes = [];
  }



  // Fetches the Recipes based on parameters and also sets multiple values into localStorage
  searchRecipes(minCal: number, maxCal: number, name: string ) {
    this.uiService.loadingStateChanged.next(true);

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
    .pipe(catchError(this.handleError<RecipeResponseData>("Search Recipes")))
    .subscribe((responseData: RecipeResponseData) => {
      responseData.hits.forEach(hit => {
        this.recipes.push(hit.recipe);
      });
      this.recipesSubject.next(this.recipes.slice());
      this.router.navigate(["/recipes"]);

      setTimeout(() => {
        this.uiService.loadingStateChanged.next(false);
      }, 1000);
    });
  }


  // Get the recipes
  getRecipes() {
    return this.recipes;
  }



  // Retrieve a single http by its uri
  searchRecipe(uri: string) {
    this.uiService.loadingStateChanged.next(true);
    let searchParams = new HttpParams();
    searchParams = searchParams.append("r", uri);
    searchParams = searchParams.append("app_id", environment.app_id);
    searchParams = searchParams.append("app_key", environment.app_key);
    this.http.get<Recipe>("https://api.edamam.com/search", {
      params: searchParams
    })
    .pipe(catchError(this.handleError<Recipe>("Search Recipe")))
    .subscribe(responseData => {
      this.router.navigate(["/recipes/single"]);
      this.recipe = responseData[0];
      this.recipeSubject.next(Object.assign({}, this.recipe));

      setTimeout(() => {
        this.uiService.loadingStateChanged.next(false);
      }, 1000);
    });
  }



  // Get a single recipe
  getRecipe() {
    return this.recipe;
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
