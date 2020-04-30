import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../models/recipe.model';
import { Subscription } from 'rxjs';
import { UiService } from '../shared/ui.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  loading: boolean;

  recipeSubscription: Subscription;
  loadingSubscription: Subscription;

  constructor(private recipeService: RecipeService, private uiService: UiService) {}

  ngOnInit(): void {
    this.recipe = this.recipeService.getRecipe();

    this.recipeSubscription = this.recipeService.recipeSubject.subscribe((recipe: Recipe) => {
      this.recipe = recipe;
      console.log(this.recipe);
    });

    this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.loading = isLoading;
    });

  }

  ngOnDestroy() {
    if (this.recipeSubscription) {
      this.recipeSubscription.unsubscribe();
    }
    if(this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

}
