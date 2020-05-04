import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [AuthComponent],
  imports: [
    SharedModule,
    FormsModule,
    AngularFireAuthModule,
    AuthRoutingModule
  ],
  exports: [AuthComponent]
})
export class AuthModule { }
