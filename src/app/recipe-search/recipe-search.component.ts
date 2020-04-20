import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.scss']
})
export class RecipeSearchComponent implements OnInit {

  constructor(private recipeService: RecipeService, private router: Router) { }


  searchForm = new FormGroup({
    name: new FormControl("", [
      Validators.required,
      Validators.minLength(3)
    ]),
    minCalories: new FormControl("0", [
      Validators.required
    ]),
    maxCalories: new FormControl("1500", [
      Validators.required,
    ])
  })


  ngOnInit(): void {
  }

  onSubmit() {
    let minCalories = +this.searchForm.controls.minCalories.value;
    let maxCalories = +this.searchForm.controls.maxCalories.value;
    let name = this.searchForm.controls.name.value;
    this.recipeService.searchRecipes(minCalories, maxCalories, name);
    this.router.navigate(["recipes"]);
  }
}
