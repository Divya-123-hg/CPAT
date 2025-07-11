import { Injectable } from '@angular/core';
import { CanActivateFn, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn:'root'
})

export class AuthGuard implements CanActivate{
  constructor(private router:Router){}
  
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

canActivate(): boolean {
  console.log('AuthGuard triggered');

  let allowAccess = false;

  if (typeof window !== 'undefined') {
    const authValue = localStorage.getItem('authenticated');
    console.log('Auth value from localStorage:', authValue);
    allowAccess = authValue === 'true';
  }

  if (!allowAccess) {
    console.log('Access denied. Redirecting to login.');
    return false;
  }

  console.log('Access granted.');
  return true;
}


}