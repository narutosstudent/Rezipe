import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { SpinnerModule } from "./shared/spinner/spinner.module";




import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
