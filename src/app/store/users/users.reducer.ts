import {createReducer, on} from '@ngrx/store';
import {User} from "../../users/models/user.model";
import {loadUsers, loadUsersFailure, loadUsersSuccess} from "./users.actions";

export interface UsersState {
  users: User[];
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  error: null,
};

export const usersReducer = createReducer(
  initialState,
  on(loadUsers, (state) => ({...state})),
  on(loadUsersSuccess, (state, {users}) => ({...state, users, error: null})),
  on(loadUsersFailure, (state, {error}) => ({...state, error}))
);
