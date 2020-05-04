import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { UnAuthGuard } from './auth/un-auth.guard';


const routes: Routes = [
  {path: "", pathMatch: "full", loadChildren: () => import("./home/home.module").then(m => m.HomeModule)},
  {
    path: "auth",
    loadChildren: () => import("./auth/auth.module").then(m => m.AuthModule),
    canLoad: [UnAuthGuard]
  },
  {path: "search", loadChildren: () => import("./recipe-search/recipe-search.module").then(m => m.RecipeSearchModule)},
  {path: "recipes", loadChildren: () => import("./recipe-list/recipe-list.module").then(m => m.RecipeListModule)},
  {path: "recipes/single", loadChildren: () => import("./recipe-detail/recipe-detail.module").then(m => m.RecipeDetailModule)},
  {
    path: "dashboard",
    loadChildren: () => import("./dashboard/dashboard.module").then(m => m.DashboardModule),
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
