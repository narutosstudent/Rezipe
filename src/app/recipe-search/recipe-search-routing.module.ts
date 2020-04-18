import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeSearchComponent } from './recipe-search.component';


const routes: Routes = [
  {path: "", component: RecipeSearchComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeSearchRoutingModule { }
