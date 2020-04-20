import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: "recipes", loadChildren: () => import("./recipe-list/recipe-list.module").then(m => m.RecipeListModule)},
  {path: "", pathMatch: "full", loadChildren: () => import("./recipe-search/recipe-search.module").then(m => m.RecipeSearchModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
