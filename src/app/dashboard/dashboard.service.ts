import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Subject, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private recipesCollection: AngularFirestoreCollection<Recipe>;
  private userId: any;

  recipes: Observable<Recipe[]>;

  constructor(private authService: AuthService, private afs: AngularFirestore) {
    this.recipesCollection = this.afs.collection<Recipe>("recipes");
    this.recipes = this.recipesCollection.valueChanges();
    this.authService.userIdSubject.subscribe(userId => {
      this.userId = userId;
    });

    console.log(this.recipesCollection);
    console.log(this.userId);
    console.log(this.recipes);
  }

  addRecipe(recipe: Recipe) {
    const recipeToSave: Recipe = {
      ...recipe,
      userId: this.userId
    };
    this.recipesCollection.add(recipeToSave);
    console.log(this.recipesCollection);
  }

  getUserRecipes() {

  }





}
