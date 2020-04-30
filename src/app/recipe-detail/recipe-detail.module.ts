import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { RecipeDetailRoutingModule } from './recipe-detail-routing.module';
import { RecipeDetailComponent } from './recipe-detail.component';


@NgModule({
  declarations: [
    RecipeDetailComponent
  ],
  imports: [
    SharedModule,
    RecipeDetailRoutingModule
  ],
  exports: [
    RecipeDetailComponent
  ]
})
export class RecipeDetailModule { }
