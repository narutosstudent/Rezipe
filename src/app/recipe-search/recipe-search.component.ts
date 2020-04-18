import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-recipe-search',
  templateUrl: './recipe-search.component.html',
  styleUrls: ['./recipe-search.component.scss']
})
export class RecipeSearchComponent implements OnInit {
  searchForm = new FormGroup({
    name: new FormControl("", [
      Validators.required,
      Validators.minLength(3)
    ]),
    minCalories: new FormControl("0", [
      Validators.required
    ]),
    maxCalories: new FormControl("1000", [
      Validators.required,
    ])
  })

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.searchForm.controls)
  }
}
