import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe = null;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    console.log(this.recipe);
  }

  onClick() {
    console.log(this.recipe.uri);
    this.recipeService.searchRecipe(this.recipe.uri);
  }

}
