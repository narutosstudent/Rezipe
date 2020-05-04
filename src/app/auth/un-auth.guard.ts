import { Injectable } from '@angular/core';
import { CanLoad, Route, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UnAuthGuard implements CanLoad {

  constructor(private router: Router, private authService: AuthService) {}

  canLoad(route: Route) {
    if (this.authService.isAuth()) {
      this.router.navigate(["/dashboard"]);
    } else {
      return true;
    }
  }

}
