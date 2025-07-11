import { CanActivateFn, CanActivate, R } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
