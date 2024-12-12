import { createAction, props } from '@ngrx/store';
import {User} from "../../users/models/user.model";

export const loadUsers = createAction('[User List] Load Users');
export const loadUsersSuccess = createAction(
  '[Users List] Load Users Success',
  props<{ users: User[] }>()
);
export const loadUsersFailure = createAction(
  '[Users List] Load Users Failure',
  props<{ error: string }>()
);
export const updateSearchTerm = createAction(
  '[Users List] Update Search Term',
  props<{ searchTerm: string }>()
);
export const updateUser = createAction(
  '[Users List] Update User',
  props<{ updatedUser: User }>() // Payload with the updated user
);
