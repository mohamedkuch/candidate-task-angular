import {Injectable,} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {filter, first, map, Observable, of, tap,} from "rxjs";
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

  getUserById(id: number): Observable<User | null> {
    const storedUsers = this.getUsersFromLocalStorage();
    const user = storedUsers.find(u => u.id === id);
    return of(user || null);
  }

  storeUsers(users: User[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }

  getUsersFromLocalStorage(): User[] {
    const storedUsers = localStorage.getItem(this.localStorageKey);
    return storedUsers ? JSON.parse(storedUsers).map((item: any) => new User(item)) : [];
  }

  editUser(user: User): Observable<User | null> {
    const dialogRef = this.dialog.open(UserEditComponent, {
      data: user,
    });

    return dialogRef.afterClosed().pipe(
      filter((res) => !!res),
      map((res: any) => new User(res)),
      tap((result: User) => {
        this.store.dispatch(updateUser({ updatedUser: result }));
      })
    );
  }
}

