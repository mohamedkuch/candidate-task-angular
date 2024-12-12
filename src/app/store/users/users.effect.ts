import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, of, switchMap, tap} from 'rxjs';
import {loadUsers, loadUsersFailure, loadUsersSuccess} from './users.actions';
import {UsersDataService} from '../../users/services/users-data.service';

@Injectable()
export class UsersEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly usersDataService: UsersDataService
  ) {
  }

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUsers), // Trigger when `loadUsers` action is dispatched
      switchMap(() =>
        this.usersDataService.getUsers().pipe(
          map((users) => loadUsersSuccess({users})), // Dispatch success action with loaded users
          catchError((error) =>
            of(
              loadUsersFailure({
                error: `Failed to load users: ${error.message || 'Unknown error'}`,
              })
            )
          )
        )
      )
    );
  });

  // Effect to store users in localStorage after loading them
  storeUsers$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadUsersSuccess), // Trigger when `loadUsersSuccess` action is dispatched
        tap(({users}) => {
          this.usersDataService.storeUsers(users); // Save users to localStorage
        })
      );
    },
    {dispatch: false} // No need to dispatch another action
  );
}
