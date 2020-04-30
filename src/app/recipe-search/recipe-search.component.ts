import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';
import { UiService } from '../shared/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.scss']
})
export class RecipeSearchComponent implements OnInit, OnDestroy {

  loading = false;
  loadingSubscription: Subscription;

  // initilization of the form
  searchForm = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(3)]],
    minCalories: ["0", Validators.required],
    maxCalories: ["1500", Validators.required]
  });

  constructor(
    private recipeService: RecipeService,
    private fb: FormBuilder,
    private uiService: UiService
    ) {
  }

  ngOnInit(): void {
    this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.loading = isLoading;
    });
  }


  // submit function that calls the searchRecipes function from the recipe service
  onSubmit() {
    const minCalories = +this.searchForm.get("minCalories").value;
    const maxCalories = +this.searchForm.get("maxCalories").value;
    const name = this.searchForm.get("name").value;
    this.recipeService.searchRecipes(minCalories, maxCalories, name);
  }

  ngOnDestroy() {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }



}
