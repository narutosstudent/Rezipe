import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../recipe.service';
import { RecipeResponseData } from '../models/response-data.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DashboardService } from '../dashboard/dashboard.service';
import { UiService } from '../shared/ui.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})


export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  loading = false;

  recipesSubjectSubscription: Subscription;
  loadingSubscription: Subscription;

  buttonActionName: string = "Add";


  constructor(
              private recipeService: RecipeService,
              private dashboardService: DashboardService,
              private uiService: UiService
              ) {

    this.recipes = [];
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();

    this.recipesSubjectSubscription = this.recipeService.recipesSubject.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });

    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(loading => {
      this.loading = loading;
    });
  }

  onAddRecipe(recipe: Recipe) {
    this.uiService.alertAction("Successfully added this recipe!", "success");
  }

  ngOnDestroy() {
    if (this.recipesSubjectSubscription) {
          this.recipesSubjectSubscription.unsubscribe();
    }

    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }

  }

}
