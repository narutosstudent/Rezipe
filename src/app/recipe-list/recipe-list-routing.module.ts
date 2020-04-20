import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeListComponent } from './recipe-list.component';


const routes: Routes = [
  {path: "", component: RecipeListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeListRoutingModule { }
