import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { Subject, Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { UiService } from '../shared/ui.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private recipesCollection: AngularFirestoreCollection<Recipe>;
  private userRecipesCollection: AngularFirestoreCollection<Recipe>;
  private userRecipes: Recipe[];

  recipesSubject = new Subject<Recipe[]>();

  constructor(
    private authService: AuthService,
    private afs: AngularFirestore,
    private uiService: UiService
    ) {

    this.recipesCollection = this.afs.collection<Recipe>("recipes");

    this.userRecipes = [];
  }

  addRecipe(recipe: Recipe, id: string) {
    const recipeToSave: Recipe = {
      label: recipe.label,
      uri: recipe.uri,
      ingredients: recipe.ingredients,
      image: recipe.image,
      cautions: recipe.cautions,
      calories: recipe.calories,
      healthLabels: recipe.healthLabels,
      dietLabels: recipe.dietLabels,
      userId: id
    };
    this.recipesCollection.add(recipeToSave);
  }


  fetchUserRecipes(id: string) {
    this.uiService.loadingStateChanged.next(true);
    this.userRecipesCollection = this.afs.collection<Recipe>("recipes", ref => ref.where("userId", "==", id));

    this.userRecipesCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Recipe;
          const id = a.payload.doc.id;
          return {id, ...data};
        }
        ))
        ).subscribe((recipes: Recipe[]) => {
          this.userRecipes = recipes;
          console.log(this.userRecipes);
          this.recipesSubject.next([...this.userRecipes]);
          setTimeout(() => {
            this.uiService.loadingStateChanged.next(false);
          }, 200);
    });
  }

  deleteRecipe(id: string) {

  }



}
