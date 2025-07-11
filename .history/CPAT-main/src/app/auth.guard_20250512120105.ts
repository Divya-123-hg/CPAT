import { Injectable } from '@angular/core';
import { CanActivateFn, CanActivate, Router, ActivatedRouteSnapshot, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn:'root'
})

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };

export class AuthGuard implements CanActivate{
  constructor(private router:Router){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
      
  }

}