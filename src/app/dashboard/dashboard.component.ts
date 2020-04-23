import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { DashboardService } from './dashboard.service';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  recipes: Recipe[];

  recipesChangedSubscription: Subscription;
  getRecipesSubscription: Subscription;

  buttonActionName: string = "Delete";
  alertMessage: string = "Successfully deleted the recipe!"

  alertActive: boolean = false;

  constructor(private dashboardService: DashboardService, private recipeService: RecipeService) {}

    ngOnInit(): void {
      this.recipesChangedSubscription = this.dashboardService.recipesChanged.subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });

      this.getRecipesSubscription = this.dashboardService.getRecipes().subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
      });
  }

  onDeleteRecipe(index: number) {
    this.alertActive = true;
    this.dashboardService.deleteRecipe(index);
    setTimeout(() => {
      this.alertActive = false;
    }, 1500);
  }

  ngOnDestroy() {
    this.recipesChangedSubscription.unsubscribe();
    this.getRecipesSubscription.unsubscribe();
  }
}
