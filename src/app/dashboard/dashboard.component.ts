import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { DashboardService } from './dashboard.service';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe.service';
import { UiService } from '../shared/ui.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  isLoading = false;

  isLoadingSubscription: Subscription;

  buttonActionName: string = "Delete";

  constructor(
    private dashboardService: DashboardService,
    private recipeService: RecipeService,
    private uiService: UiService
    ) {
    this.recipes = [];
  }

    ngOnInit(): void {
      this.isLoadingSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
        this.isLoading = isLoading;
      });
  }

  ngOnDestroy() {
    if (this.isLoadingSubscription) {
      this.isLoadingSubscription.unsubscribe();
    }
  }


}
