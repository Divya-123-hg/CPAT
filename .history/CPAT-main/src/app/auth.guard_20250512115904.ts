import { CanActivateFn, CanActivate, Router } from '@angular/router';

@inj

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
