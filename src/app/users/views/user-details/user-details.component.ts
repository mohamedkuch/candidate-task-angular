import {Component, ElementRef, ViewChild} from '@angular/core';
import {User} from "../../models/user.model";
import {UsersDataService} from "../../services/users-data.service";
import {ActivatedRoute} from "@angular/router";
import {first, switchMap} from "rxjs";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  @ViewChild('editButton', {read: ElementRef}) editButton!: ElementRef;
  user!: User;

  constructor(
    private usersDataService: UsersDataService,
    private activatedRoute: ActivatedRoute
  ) {
    this.user = this.activatedRoute.snapshot.data['user'];
  }

  onEditUserClick(): void {
    // Blur button to prevent aria-hidden focus error when modal opens
    this.editButton.nativeElement.blur();

    this.usersDataService.editUser(this.user).pipe(
      first(),
      switchMap(() => this.usersDataService.getUserById(this.user.id))
    ).subscribe(updatedUser => {
      if (updatedUser) {
        this.user = updatedUser;
      }
    });
  }
}
