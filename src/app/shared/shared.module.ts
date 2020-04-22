import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';



@NgModule({
  declarations: [
    SpinnerComponent,
    RecipeItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SpinnerComponent,
    RecipeItemComponent
  ]
})
export class SharedModule { }
