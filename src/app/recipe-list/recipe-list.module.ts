import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';


import { RecipeListComponent } from "./recipe-list.component";
import { RecipeListRoutingModule } from './recipe-list-routing.module';


@NgModule({
  declarations: [
    RecipeListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RecipeListRoutingModule
  ],
  exports: [
    RecipeListComponent
  ]
})
export class RecipeListModule { }
