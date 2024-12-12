import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {User} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UsersDataService {
  private usersUrl = 'assets/data/users.json';

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<any[]>(this.usersUrl).pipe(
      map((data) => data.map((item) => new User(item)))
    );
  }
}
