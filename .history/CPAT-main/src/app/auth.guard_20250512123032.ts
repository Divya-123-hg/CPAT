import { Injectable } from '@angular/core';
import { CanActivateFn, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn:'root'
})

export class AuthGuard implements CanActivate{
  constructor(private router:Router){}

if(typeof window!=='undefined'){
      
    }

  canActivate():boolean{
    const allowAccess=localStorage.getItem('authenticated')==='true';
    
    if(!allowAccess){
      this.router.navigate(['/login'])
      return false;
    }
  return true;  
  }

}