import { environment } from "./../environments/environment";
import { Injectable } from '@angular/core';
import { of, Observable } from "rxjs";
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from './models/recipe.model';
import {tap, map, catchError} from "rxjs/operators";
import { RecipeResponseData } from './models/response-data.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipes: Recipe[] = [];
  recipesData: RecipeResponseData = null;
  constructor(private http: HttpClient) { }

  searchRecipes(minCal: number, maxCal: number, name: string) {
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
      console.log(responseData);
      this.recipesData = responseData;
      responseData.hits.forEach(hit => {
        this.recipes.push(hit.recipe);
      });
      console.log(this.recipes)
    });
  }

  getRecipes() {
    return of(this.recipes);
  }

  private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error);
    console.log(`${operation} failed: ${error.message}`);
    return of(result as T);
  };
}
}
