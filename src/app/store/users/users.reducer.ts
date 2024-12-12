import {createReducer, on} from '@ngrx/store';
import {User} from "../../users/models/user.model";
import {loadUsers, loadUsersFailure, loadUsersSuccess, updateSearchTerm, updateUser} from "./users.actions";

export interface UsersState {
  users: User[];
  error: string | null;
  searchTerm: string;
}

const initialState: UsersState = {
  users: [],
  error: null,
  searchTerm: '',
};

export const usersReducer = createReducer(
  initialState,
  on(loadUsers, (state) => ({...state})),
  on(loadUsersSuccess, (state, {users}) => ({...state, users, error: null})),
  on(loadUsersFailure, (state, {error}) => ({...state, error})),
  on(updateSearchTerm, (state, {searchTerm}) => ({...state, searchTerm})),
  on(updateUser, (state, { updatedUser }) => ({
    ...state,
    users: state.users.map((user) =>
      user.id === updatedUser.id ? updatedUser : user // Replace the updated user
    ),
  }))
);
