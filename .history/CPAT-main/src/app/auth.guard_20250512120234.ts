import { Injectable } from '@angular/core';
import { CanActivateFn, CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn:'root'
})

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

export class AuthGuard implements CanActivate{
  constructor(private router:Router){}

  canActivate():boolean{
    const allowAccess=false;
    if(!allowAccess){
      this.router.navigate(['/homepage'])
      re
    }
  }

}