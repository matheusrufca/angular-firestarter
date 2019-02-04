import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PublicGuard implements CanActivate {
  constructor(private readonly auth: AuthService, private readonly router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.user.pipe(take(1), map(user => !!!user), tap(notAuthenticated => {
      if (!notAuthenticated)
        this.router.navigate(['/']);
    }));
  }
}
