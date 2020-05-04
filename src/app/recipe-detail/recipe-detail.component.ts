import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../models/recipe.model';
import { Subscription } from 'rxjs';
import { UiService } from '../shared/ui.service';
import { AuthService } from '../auth/auth.service';

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
  authSubscription: Subscription;

  isAuth = false;

  constructor(private recipeService: RecipeService, private uiService: UiService, private authService: AuthService) {}

  ngOnInit(): void {
    // recipe
    this.recipe = this.recipeService.getRecipe();

    this.recipeSubscription = this.recipeService.recipeSubject.subscribe((recipe: Recipe) => {
      this.recipe = recipe;
      console.log(this.recipe);
    });

    // auth state
    this.isAuth = this.authService.isAuth();

    this.authSubscription = this.authService.authChange.subscribe(isLoading => {
      this.isAuth = isLoading;
    });

    // loading state
    this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.loading = isLoading;
    });
  }

  onAddRecipe() {
    this.uiService.alertAction("Successfully added recipe to your dashboard!", "success");
  }

  // unsubscribe (subscriptions)
  ngOnDestroy() {
    if (this.recipeSubscription) {
      this.recipeSubscription.unsubscribe();
    }
    if(this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }

}
