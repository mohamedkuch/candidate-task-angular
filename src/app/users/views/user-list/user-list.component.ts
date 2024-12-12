import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {loadUsers, updateSearchTerm} from "../../../store/users/users.actions";
import {debounceTime, Observable, Subject, takeUntil} from "rxjs";
import {User} from "../../models/user.model";
import {selectFilteredUsers$} from "../../../store/users/users.selector";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  private searchTerm$: Subject<string> = new Subject<string>();

  users$: Observable<User[]>
  onDestroy$ = new Subject<void>();

  constructor(private store: Store) {
    this.users$ = this.store.select(selectFilteredUsers$)
  }


  ngOnInit(): void {
    this.store.dispatch(loadUsers());

    // Debounce is added here to simulate a real-world scenario where search input is throttled
    // to reduce the frequency of dispatching actions, thereby avoiding unnecessary computations
    // or API calls on every keystroke.
    this.searchTerm$.pipe(
      debounceTime(300),
      takeUntil(this.onDestroy$)
    ).subscribe(searchTerm => {
      this.store.dispatch(updateSearchTerm({searchTerm}));
    });
  }

  onSearchChange(value: string): void {
    this.searchTerm$.next(value);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
