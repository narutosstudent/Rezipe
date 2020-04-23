import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/recipe.service';
import { Recipe } from 'src/app/models/recipe.model';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe = null;
  @Input() actionName: string = "";
  @Output() buttonAction = new EventEmitter<Recipe>();


  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
  }

  onClick() {
    this.recipeService.searchRecipe(this.recipe.uri);
    this.router.navigate(["/recipes/single"]);
  }

  onButtonClick() {
    this.buttonAction.emit(this.recipe);
  }

}
