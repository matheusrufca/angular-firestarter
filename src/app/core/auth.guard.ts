import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { NotifyService } from './notify.service';


@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router,
    private notificationService: NotifyService
  ) { }
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.user.pipe(take(1), map(user => !!user), tap(loggedIn => {
      const currentPage = next.routeConfig.path;
      if (!loggedIn) {
        this.notificationService.notify('You must be logged in!', 'Error');
        this.router.navigate(['/login']);
      }
    }));
  }
}
