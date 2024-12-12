import {Component, ElementRef, Input, ViewChild,} from '@angular/core';
import {User} from "../../models/user.model";
import {UsersDataService} from "../../services/users-data.service";

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrl: './user-item.component.scss'
})
export class UserItemComponent {
  @ViewChild('editButton', {read: ElementRef}) editButton!: ElementRef;
  @Input() user!: User;

  constructor(
    private usersDataService: UsersDataService
  ) {
  }

  onEditUserClick(): void {
    // Blur button to prevent aria-hidden focus error when modal opens
    this.editButton.nativeElement.blur();
    this.usersDataService.editUser(this.user);
  }
}
