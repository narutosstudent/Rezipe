import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { RecipeSearchRoutingModule } from './recipe-search-routing.module';
import { RecipeSearchComponent } from './recipe-search.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    RecipeSearchComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RecipeSearchRoutingModule
  ],
  exports: [
    RecipeSearchComponent
  ]
})
export class RecipeSearchModule { }
