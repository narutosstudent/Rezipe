import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/recipe.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.scss']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe = null;

  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
  }

  onClick() {
    this.recipeService.searchRecipe(this.recipe.uri);
    this.router.navigate(["/recipes/single"]);
  }

}
