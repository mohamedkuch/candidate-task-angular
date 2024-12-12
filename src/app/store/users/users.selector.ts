import {createFeatureSelector, createSelector} from '@ngrx/store';
import {UsersState} from "./users.reducer";

export const selectUserState$ = createFeatureSelector<UsersState>('users');
export const selectUsers$ = createSelector(selectUserState$, (state) => state.users);
