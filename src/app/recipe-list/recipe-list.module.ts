import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';


import { RecipeListComponent } from "./recipe-list.component";
import { RecipeListRoutingModule } from './recipe-list-routing.module';


@NgModule({
  declarations: [
    RecipeListComponent
  ],
  imports: [
    SharedModule,
    RecipeListRoutingModule
  ],
  exports: [
    RecipeListComponent
  ]
})
export class RecipeListModule { }
