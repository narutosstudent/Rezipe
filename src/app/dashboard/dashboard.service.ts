import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Subject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  recipesChanged = new Subject<Recipe[]>();

  constructor() {
  }

  addRecipe(recipe: Recipe) {
    let recipes: Recipe[] = JSON.parse(localStorage.getItem("dashboardRecipes"));
    recipes.unshift(recipe);

    this.recipesChanged.next(recipes.slice());
    localStorage.setItem("dashboardRecipes", JSON.stringify(recipes));
  }

  getRecipes() {
    const recipes = JSON.parse(localStorage.getItem("dashboardRecipes"));
    return of(recipes);
  }

  deleteRecipe(index: number) {
  let recipes: Recipe[] = JSON.parse(localStorage.getItem("dashboardRecipes"));
  recipes.splice(index, 1);
  this.recipesChanged.next(recipes.slice());
  localStorage.setItem("dashboardRecipes", JSON.stringify(recipes));
  }


}
