import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {loadUsers} from "../../../store/users/users.actions";
import {Observable} from "rxjs";
import {User} from "../../models/user.model";
import {selectUsers$} from "../../../store/users/users.selector";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit {
  searchTerm: string = '';
  users$: Observable<User[]>

  constructor(private store: Store) {
    this.users$ = this.store.select(selectUsers$)
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers());
  }

}
