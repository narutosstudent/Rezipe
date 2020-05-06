import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../recipe.service';
import { RecipeResponseData } from '../models/response-data.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DashboardService } from '../dashboard/dashboard.service';
import { UiService } from '../shared/ui.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})


export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  loading = false;
  isAuth = false;

  authSubscription: Subscription;
  recipesSubjectSubscription: Subscription;
  loadingSubscription: Subscription;

  buttonActionName: string = "Add";


  // Related To Pagination
  currentPage: number = 1;
  recipesPerPage: number = 10;

  // Get current recipes (Pagination)
  indexOfLastRecipe: number;
  indexOfFirstRecipe: number;
  currentRecipes: Recipe[];



  constructor(
              private recipeService: RecipeService,
              private dashboardService: DashboardService,
              private uiService: UiService,
              private authService: AuthService
              ) {

              this.recipes = [];
              this.authService.getCurrentUser();
  }

  ngOnInit(): void {

    // the recipes
    this.recipes = this.recipeService.getRecipes();

    this.recipesSubjectSubscription = this.recipeService.recipesSubject.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });

    // Auth state
    this.isAuth = this.authService.isAuth();

    this.authSubscription = this.authService.authChange.subscribe(isAuth => {
      this.isAuth = isAuth;
    });

    // loading state
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(loading => {
      this.loading = loading;
    });


    // Pagination Related
    this.indexOfLastRecipe = this.currentPage * this.recipesPerPage;

    this.indexOfFirstRecipe = this.indexOfLastRecipe - this.recipesPerPage;

    this.currentRecipes = this.recipes.slice(this.indexOfFirstRecipe, this.indexOfLastRecipe);
  }

  // Click to another page
  onPaginate(paginateNumber: number) {
    this.currentPage = paginateNumber;

    this.indexOfLastRecipe = this.currentPage * this.recipesPerPage;

    this.indexOfFirstRecipe = this.indexOfLastRecipe - this.recipesPerPage;

    this.currentRecipes = this.recipes.slice(this.indexOfFirstRecipe, this.indexOfLastRecipe);
  }

  // add recipe
  onAddRecipe(recipe: Recipe) {
    this.uiService.alertAction("Successfully added this recipe!", "success");
    this.dashboardService.addRecipe(recipe);
  }

  // Unsubscribe (Subscriptions)
  ngOnDestroy() {
    if (this.recipesSubjectSubscription) {
          this.recipesSubjectSubscription.unsubscribe();
    }

    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }

    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }

  }

}
