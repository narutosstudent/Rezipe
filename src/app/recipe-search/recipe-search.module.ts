import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RecipeSearchRoutingModule } from './recipe-search-routing.module';
import { RecipeSearchComponent } from './recipe-search.component';


@NgModule({
  declarations: [
    RecipeSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RecipeSearchRoutingModule
  ],
  exports: [
    RecipeSearchComponent
  ]
})
export class RecipeSearchModule { }
