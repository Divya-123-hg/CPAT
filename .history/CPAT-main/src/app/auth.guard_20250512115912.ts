import { Injectable } from '@angular/core';
import { CanActivateFn, CanActivate, Router } from '@angular/router';

@Injectable()

export const authGuard: CanActivateFn = (route, state) => {
  return true;
};
