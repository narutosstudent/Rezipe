import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: "", pathMatch: "full", loadChildren: () => import("./home/home.module").then(m => m.HomeModule)},
  {path: "register", loadChildren: () => import("./register/register.module").then(m => m.RegisterModule)},
  {path: "login", loadChildren: () => import("./login/login.module").then(m => m.LoginModule)},
  {path: "search", loadChildren: () => import("./recipe-search/recipe-search.module").then(m => m.RecipeSearchModule)},
  {path: "recipes", loadChildren: () => import("./recipe-list/recipe-list.module").then(m => m.RecipeListModule)},
  {path: "recipes/single", loadChildren: () => import("./recipe-detail/recipe-detail.module").then(m => m.RecipeDetailModule)},
  {path: "dashboard", loadChildren: () => import("./dashboard/dashboard.module").then(m => m.DashboardModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
