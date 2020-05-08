import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { UiService } from '../shared/ui.service';
import { Subject } from 'rxjs';
import { DashboardService } from '../dashboard/dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(
    public auth: AngularFireAuth,
    private router: Router,
    private uiService: UiService,
    private dashboardService: DashboardService
    ) {}


  initAuthListener() {
    this.auth.authState.subscribe(user => {
      if (user) {
        this.authChange.next(true);
        this.isAuthenticated = true;
        this.router.navigate(["/dashboard"]);
        this.dashboardService.userIdSubject.next(user.uid);
      } else {
        this.authChange.next(false);
        this.isAuthenticated = false;
        this.router.navigate(["/auth"]);
      }
    });
  }

  // setTimeout is used to prevent the user from seeing the auth page after succeded by keep loading a while.
  registerUser(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.auth.createUserWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      setTimeout(() => {
        this.uiService.loadingStateChanged.next(false);
      }, 300);
    })
    .catch(error => {
      this.uiService.loadingStateChanged.next(false);
      this.uiService.alertAction(error.message, "danger");
    });
  }

  login(authData: AuthData) {
    this.uiService.loadingStateChanged.next(true);
    this.auth.signInWithEmailAndPassword(authData.email, authData.password)
    .then(result => {
      setTimeout(() => {
        this.uiService.loadingStateChanged.next(false);
      }, 300);
    })
    .catch(error => {
      this.uiService.loadingStateChanged.next(false);
      this.uiService.alertAction(error.message, "danger");
    });
  }

  getCurrentUser() {
    this.auth.currentUser.then(user => {
      if (user) {
        this.dashboardService.userIdSubject.next(user.uid);
      }
    })
    .catch(error => {
      console.log(error.message);
    });
  }

  logout() {
    this.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }

}
