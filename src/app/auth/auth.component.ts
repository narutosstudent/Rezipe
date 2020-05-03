import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UiService } from '../shared/ui.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginMode = false;

  constructor(private uiService: UiService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    const email = form.form.value.email;
    const password = form.form.value.password;
    const password2 = form.form.value.password2;
    if (!this.loginMode) {
      if (password !== password2) {
        return this.uiService.alertAction("Passwords Do Not Match", "danger");
      }
    } else {
      
    }



  }


  onSwitchAuth(event: any) {
    event.preventDefault();
    this.loginMode = !this.loginMode;
  }

}
