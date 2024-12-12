import {Injectable,} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {filter, map, Observable, of, tap,} from "rxjs";
import {User} from "../models/user.model";
import {UserEditComponent} from "../views/user-edit/user-edit.component";
import {MatDialog} from "@angular/material/dialog";
import {updateUser} from "../../store/users/users.actions";
import {Store} from "@ngrx/store";

@Injectable()
export class UsersDataService {
  private usersUrl = 'assets/data/users.json';
  private localStorageKey = 'usersData';

  constructor(private http: HttpClient,
              private dialog: MatDialog,
              private store: Store) {
  }

  /**
   * Retrieves the list of users, prioritizing localStorage data over HTTP requests.
   * If no data exists in localStorage, fetches from the JSON file and maps the response
   * to User objects.
   *
   * @returns Observable<User[]> Stream of user array data
   */
  getUsers(): Observable<User[]> {
    const storedUsers = this.getUsersFromLocalStorage();
    if (storedUsers.length > 0) {
      return of(storedUsers);
    } else {
      return this.http.get<any[]>(this.usersUrl).pipe(
        map((data) => data.map((item) => new User(item)))
      );
    }
  }

  /**
   * Retrieves a specific user by their ID from localStorage.
   *
   * @param id The unique identifier of the user to retrieve
   * @returns Observable<User | null> Stream containing either the found user or null if not found
   */
  getUserById(id: number): Observable<User | null> {
    const storedUsers = this.getUsersFromLocalStorage();
    const user = storedUsers.find(u => u.id === id);
    return of(user || null);
  }

  /**
   * Persists the users array to localStorage.
   * Converts the users array to JSON string before storage.
   *
   * @param users Array of User objects to be stored
   */
  storeUsers(users: User[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }

  /**
   * Retrieves and deserializes the users array from localStorage.
   * If no data exists or if localStorage is empty, returns an empty array.
   *
   * @returns User[] Array of User objects from localStorage, or empty array if none exists
   */
  getUsersFromLocalStorage(): User[] {
    const storedUsers = localStorage.getItem(this.localStorageKey);
    return storedUsers ? JSON.parse(storedUsers).map((item: any) => new User(item)) : [];
  }

  /**
   * Opens a dialog for editing a user and handles the result.
   * When the dialog is closed with a valid result, updates the store with the modified user.
   *
   * @param user The User object to be edited
   * @returns Observable<User> Stream containing the edited user
   * @dispatch updateUser action to the NgRx store when a user is successfully edited
   */
  editUser(user: User): Observable<User> {
    const dialogRef = this.dialog.open(UserEditComponent, {
      data: user,
    });

    return dialogRef.afterClosed().pipe(
      filter((res) => !!res),
      map((res: any) => new User(res)),
      tap((result: User) => {
        this.store.dispatch(updateUser({updatedUser: result}));
      })
    );
  }
}

