import { ResolveFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { User } from '../models/user.model';
import {UsersDataService} from "../services/users-data.service";

export const userDetailsResolver: ResolveFn<User | null> = (route) => {
  const usersDataService = inject(UsersDataService);
  const router = inject(Router);
  const userId = Number(route.paramMap.get('id'));


  return usersDataService.getUserById(userId).pipe(
    map(user => {
      if (!user) {
        router.navigate(['/users/not-found']);
        return null;
      }
      return user;
    }),
    catchError(() => {
      router.navigate(['/users/not-found']);
      return of(null);
    })
  );
};
