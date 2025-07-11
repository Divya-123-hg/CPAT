import { Injectable } from '@angular/core';
import { CanActivateFn, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn:'root'
})

export class AuthGuard implements CanActivate{
  constructor(private router:Router){}
  
  canActivate():boolean{
    let allowAccess=false;
    
    if(!allowAccess){
      this.router.navigate(['/homepage'])
      return false;
    } 
  return true;  
  }

}