import { CanActivateFn, CanActivate, Router } from '@angular/router';

@in

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
