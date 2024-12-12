import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {catchError, map, of, switchMap} from 'rxjs';
import {loadUsers, loadUsersFailure, loadUsersSuccess} from "./users.actions";
import {UsersDataService} from "../../users/services/users-data.service";

@Injectable()
export class UsersEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly usersDataService: UsersDataService
  ) {
  }

  loadUsers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadUsers),
      switchMap(() =>
        this.usersDataService.getUsers().pipe(
          map(users => loadUsersSuccess({users})),
          catchError(error =>
            of(loadUsersFailure({
              error: `Failed to load users: ${error.message || 'Unknown error'}`,
            }))
          )
        )
      )
    );
  });
}
