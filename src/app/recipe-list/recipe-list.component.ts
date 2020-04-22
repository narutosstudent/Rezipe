import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipeService } from '../recipe.service';
import { RecipeResponseData } from '../models/response-data.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})


export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  loading: boolean;

  getRecipesSubscription: Subscription;
  loadingSubscription: Subscription;
  recipesSubjectSubscription: Subscription;


  constructor(private recipeService: RecipeService, private router: Router) {
    this.recipes = [];
  }

  ngOnInit(): void {
    this.getRecipesSubscription = this.recipeService.getRecipes().subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });

    this.loadingSubscription = this.recipeService.loading.subscribe((loading: boolean) => {
      this.loading = loading;
    });

    this.recipesSubjectSubscription = this.recipeService.recipesSubject.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes;
    });
  }

  ngOnDestroy() {
    this.getRecipesSubscription.unsubscribe();
    this.loadingSubscription.unsubscribe();
    this.recipesSubjectSubscription.unsubscribe();
  }

}
