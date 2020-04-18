import { environment } from "./../environments/environment";
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from './recipe.model';
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipes: Recipe[] = [];
  constructor(private http: HttpClient) { }

  searchRecipes(minCal: number, maxCal: number, name: string) {
    let searchParams = new HttpParams();
    searchParams = searchParams.append("q", name);
    searchParams = searchParams.append("calories", `${minCal}-${maxCal}`);
    searchParams = searchParams.append("app_id", environment.app_id);
    searchParams = searchParams.append("app_key", environment.app_key);
    this.http.get<Recipe[]>("https://api.edamam.com/search", {
      params: searchParams
    }).subscribe(responseData => {
      console.log(responseData);
    })


  }
}
