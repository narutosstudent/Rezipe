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
  searchForm = this.fb.group({});

  constructor(
    private recipeService: RecipeService,
    private fb: FormBuilder,
    private uiService: UiService
    ) {
  }

  ngOnInit(): void {
    // loading state
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.loading = isLoading;
    });

    // initalizing the form
  this.searchForm = this.fb.group({
    name: ["", [Validators.required, Validators.minLength(3)]],
    minCalories: ["",
    [
      Validators.required,
      Validators.min(0)
    ]
  ],
    maxCalories: ["", [
      Validators.required,
      Validators.min(0)
    ]
  ]
  });

  }


  // submit function that calls the searchRecipes function from the recipe service
  onSubmit() {
    const minCalories = +this.searchForm.get("minCalories").value;
    const maxCalories = +this.searchForm.get("maxCalories").value;
    const name = this.searchForm.get("name").value;
    if (minCalories > maxCalories) {
      return this.uiService.alertAction("Min Calories can not be greater than Max Calories", "danger");
    } else {
      this.recipeService.searchRecipes(minCalories, maxCalories, name);
    }
  }

  // access the controls
  get f() {
    return this.searchForm.controls;
  }

  ngOnDestroy() {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }

  }



}
