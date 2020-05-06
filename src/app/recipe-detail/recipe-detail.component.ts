import { Component, OnInit, OnDestroy } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../models/recipe.model';
import { Subscription } from 'rxjs';
import { UiService } from '../shared/ui.service';
import { AuthService } from '../auth/auth.service';
import { DashboardService } from '../dashboard/dashboard.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss'],
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
  recipe: Recipe;
  loading: boolean;

  recipeSubscription: Subscription;
  loadingSubscription: Subscription;
  authSubscription: Subscription;
  userIdSubscription: Subscription;

  isAuth = false;

  id: string;

  constructor(
    private recipeService: RecipeService,
    private uiService: UiService,
    private authService: AuthService,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    // get current user's id
    this.authService.getCurrentUser();

    // recipe
    this.recipe = this.recipeService.getRecipe();

    this.recipeSubscription = this.recipeService.recipeSubject.subscribe(
      (recipe: Recipe) => {
        this.recipe = recipe;
      }
    );

    // auth state
    this.isAuth = this.authService.isAuth();

    this.authSubscription = this.authService.authChange.subscribe((isAuth) => {
      this.isAuth = isAuth;
    });

    // loading state
    this.uiService.loadingStateChanged.subscribe((isLoading) => {
      this.loading = isLoading;
    });
  }

  onAddRecipe() {
    this.uiService.alertAction(
      'Successfully added recipe to your dashboard!',
      'success'
    );
    this.dashboardService.addRecipe(this.recipe);
  }

  // unsubscribe (subscriptions)
  ngOnDestroy() {
    if (this.recipeSubscription) {
      this.recipeSubscription.unsubscribe();
    }
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }

    if (this.userIdSubscription) {
      this.userIdSubscription.unsubscribe();
    }
  }
}
