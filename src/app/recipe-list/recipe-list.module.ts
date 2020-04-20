import { SpinnerModule } from "./../shared/spinner/spinner.module";
import { RecipeListComponent } from "./recipe-list.component";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecipeListRoutingModule } from './recipe-list-routing.module';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';


@NgModule({
  declarations: [
    RecipeItemComponent,
    RecipeListComponent
  ],
  imports: [
    CommonModule,
    SpinnerModule,
    RecipeListRoutingModule
  ],
  exports: [
    RecipeItemComponent,
    RecipeListComponent
  ]
})
export class RecipeListModule { }
