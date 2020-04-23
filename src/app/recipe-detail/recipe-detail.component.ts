import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../models/recipe.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  loading: boolean;

  getRecipeSubscription: Subscription;
  recipeSubscription: Subscription;

  constructor(private recipeService: RecipeService) {
    console.log(this.recipe);
  }

  ngOnInit(): void {

    this.getRecipeSubscription = this.recipeService.getRecipe().subscribe((recipe: Recipe) => {
      this.recipe = recipe;
      console.log(this.recipe);
    });

    this.recipeSubscription = this.recipeService.recipeSubject.subscribe((recipe: Recipe) => {
      this.recipe = recipe;
    })

  }

  ngOnDestroy() {
    this.getRecipeSubscription.unsubscribe();
    this.recipeSubscription.unsubscribe();
  }

}
