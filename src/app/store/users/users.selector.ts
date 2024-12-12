import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UsersState} from "./users.reducer";

export const selectUserState$ = createFeatureSelector<UsersState>('users');
export const selectUsers$ = createSelector(selectUserState$, (state) => state.users);
export const selectSearchTerm$ = createSelector(selectUserState$, (state) => state.searchTerm);

// Filtered users based on the search term
export const selectFilteredUsers$ = createSelector(
  selectUsers$,
  selectSearchTerm$,
  (users, searchTerm) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return users.filter(user =>
      user.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.email.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.role.toLowerCase().includes(lowerCaseSearchTerm)
    );
  }
);
