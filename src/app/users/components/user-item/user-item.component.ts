import {Component, ElementRef, Input, ViewChild,} from '@angular/core';
import {User} from "../../models/user.model";
import {UsersDataService} from "../../services/users-data.service";
import {Router} from "@angular/router";
import {first} from "rxjs";

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.scss'
})
export class UserItemComponent {
  @ViewChild('editButton', {read: ElementRef}) editButton!: ElementRef;
  @Input() user!: User;

  constructor(
    private usersDataService: UsersDataService,
    private router: Router
  ) {
  }

  onEditUserClick(event: MouseEvent | TouchEvent): void {
    event.stopPropagation();
    // Blur button to prevent aria-hidden focus error when modal opens
    this.editButton.nativeElement.blur();
    this.usersDataService.editUser(this.user)
      .pipe(first())
      .subscribe();
  }

  onUserClick(userId: number) {
    this.router.navigate(['/users', userId]);
  }
}
