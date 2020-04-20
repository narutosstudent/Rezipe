import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  loading: boolean;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getRecipe().subscribe((recipe: Recipe) => {
      this.recipe = recipe;
      console.log(this.recipe);
    });
    this.recipeService.recipeSubject.subscribe((recipe: Recipe) => {
      this.recipe = recipe;
    });
    this.recipeService.loading.subscribe((loading: boolean) => {
      this.loading = loading;
    });
  }

}
