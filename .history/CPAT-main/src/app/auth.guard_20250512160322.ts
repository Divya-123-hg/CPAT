import { isPlatformBrowser } from '@angular/common';
import { Injectable } from '@angular/core';
import { CanActivateFn, CanActivate, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }

  // canActivate():boolean{

  //   console.log('AuthGuard triggered');
  //   let allowAccess=false;

  //   if(typeof window!=='undefined'){
  //     allowAccess= localStorage.getItem('authenticated')==='true';
  //   }

  //   if(!allowAccess){
  //     this.router.navigate(['/login'])
  //     return false;
  //   } 
  // return true;  
  // }

  // canActivate(): boolean {
  //   console.log('AuthGuard triggered');

  //   let allowAccess = false;

  //   if (typeof window !== 'undefined') {
  //     const authValue = localStorage.getItem('authenticated');
  //     console.log('Auth value from localStorage:', authValue);
  //     allowAccess = authValue === 'true';
  //   }

  //   if (!allowAccess) {
  //     console.log('Access denied. Redirecting to login.');
  //     this.router.navigate(['/login']);
  //     return false;
  //   }

  //   console.log('Access granted.');
  //   return true;
  // }



  canActivate(): boolean | UrlTree {
    //     const isAuthenticated = localStorage.getItem('authenticated') === 'true';
    //     return isAuthenticated ? true : this.router.parseUrl('/login');

console.log('AuthGuard triggered');

    if (isPlatformBrowser(this.platformId)) {
      console.log('AuthGuard triggered inside');
      const isAuthenticated = localStorage.getItem('authenticated') === 'true';
      return isAuthenticated ? true : this.router.parseUrl('/login');
    }

    // If not in browser (e.g., SSR), deny access or handle differently
    return this.router.parseUrl('/login');
    console.log('AuthGuard triggered');

  }
  platformId(platformId: any) {
    throw new Error('Method not implemented.');
  }




}