import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UiService } from '../shared/ui.service';
import { AuthService } from './auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  loginMode = true;
  isLoading = false;

  isLoadingSubscription: Subscription;

  constructor(private uiService: UiService, private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoadingSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    });
  }

  onSubmit(form: NgForm) {
    const email = form.form.value.email;
    const password = form.form.value.password;
    const password2 = form.form.value.password2;
    if (!this.loginMode) {
      if (password !== password2) {
        return this.uiService.alertAction("Passwords Do Not Match", "danger");
      } else {
        this.authService.registerUser({
          email,
          password
        });
      }
    } else {
      this.authService.login({
        email,
        password
      });
    }
  }

  onSwitchAuth(event: any) {
    event.preventDefault();
    this.loginMode = !this.loginMode;
  }


  ngOnDestroy() {
    if (this.isLoadingSubscription) {
      this.isLoadingSubscription.unsubscribe();
    }
  }


}
