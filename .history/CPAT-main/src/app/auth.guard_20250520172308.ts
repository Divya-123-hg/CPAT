import { isPlatformBrowser } from '@angular/common';
import { Injectable } from '@angular/core';
import { CanActivateFn, CanActivate, Router, UrlTree, ActivatedRouteSnapshot, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(): boolean {
    
    console.log('AuthGuard triggered');

    let allowAccess = 'true';

    if (typeof window !== 'undefined') {
      const authValue = localStorage.getItem('authenticated');
      console.log('Auth value from localStorage:', authValue);
      allowAccess:string = authValue === 'true';
    }

    if (!allowAccess) {
      console.log('Access denied. Redirecting to login.');
      this.router.navigate(['/login']);
      return false;
    }

    console.log('Access granted.');
    return true;
  }

}