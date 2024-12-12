import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, of} from "rxjs";
import {User} from "../models/user.model";

@Injectable()
export class UsersDataService {
  private usersUrl = 'assets/data/users.json';
  private localStorageKey = 'usersData';

  constructor(private http: HttpClient) {
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

  storeUsers(users: User[]): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
  }

  getUsersFromLocalStorage(): User[] {
    const storedUsers = localStorage.getItem(this.localStorageKey);
    return storedUsers ? JSON.parse(storedUsers).map((item: any) => new User(item)) : [];
  }
}

