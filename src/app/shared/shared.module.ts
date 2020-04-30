import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { RouterModule } from '@angular/router';
import { RecipeItemComponent } from './recipe-item/recipe-item.component';
import { AlertComponent } from './alert/alert.component';



@NgModule({
  declarations: [
    SpinnerComponent,
    RecipeItemComponent,
    AlertComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    SpinnerComponent,
    RecipeItemComponent,
    AlertComponent,
    CommonModule,
    RouterModule
  ]
})
export class SharedModule { }
