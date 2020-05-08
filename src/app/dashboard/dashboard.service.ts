import {Injectable} from '@angular/core';
import {Recipe} from '../models/recipe.model';
import {Subject, Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {UiService} from '../shared/ui.service';

@Injectable({providedIn: 'root'})
export class DashboardService {
    private recipesCollection: AngularFirestoreCollection <Recipe>;
    private userRecipesCollection: AngularFirestoreCollection <Recipe>;
    private userRecipes: Recipe[];
    private userId: string;

    recipesSubject = new Subject < Recipe[] > ();
    userIdSubject = new Subject < string > ();

    constructor(private afs : AngularFirestore, private uiService : UiService) {

        this
            .userIdSubject
            .subscribe(userId => {
                this.userId = userId;
            });

        this.recipesCollection = this.afs.collection<Recipe>('recipes');
        this.userRecipes = [];
    }

    addRecipe(recipe: Recipe) {
        if (this.userId) {
            const recipeToSave : Recipe = {
                label: recipe.label,
                uri: recipe.uri,
                ingredients: recipe.ingredients,
                image: recipe.image,
                cautions: recipe.cautions,
                calories: recipe.calories,
                healthLabels: recipe.healthLabels,
                dietLabels: recipe.dietLabels,
                userId: this.userId
            };
            this
                .recipesCollection
                .add(recipeToSave);
        }
    }

    fetchUserRecipes() {
        if (this.userId) {
            this
                .uiService
                .loadingStateChanged
                .next(true);
            this.userRecipesCollection = this.afs.collection < Recipe > ('recipes',
            (ref) => ref.where('userId', '==', this.userId));
            this
                .userRecipesCollection
                .snapshotChanges()
                .pipe(map((actions) => actions.map((a) => {
                    const data = a
                        .payload
                        .doc
                        .data()as Recipe;
                    const id = a.payload.doc.id;
                    return {
                        id,
                        ...data
                    };
                })))
                .subscribe((recipes: Recipe[]) => {
                    this.userRecipes = recipes;
                    this
                        .recipesSubject
                        .next([...this.userRecipes]);
                    setTimeout(() => {
                        this
                            .uiService
                            .loadingStateChanged
                            .next(false);
                    }, 200);
                });
        }
    }

    deleteRecipe(id: string) {
        const recipeRef = this
            .recipesCollection
            .doc(id);
        recipeRef
            .delete()
            .then(result => {
                this
                    .uiService
                    .alertAction("Successfully deleted your recipe", "success")
            })
            .catch(err => {
                this.uiService.alertAction(err.message, "success");
            });
    }
}
