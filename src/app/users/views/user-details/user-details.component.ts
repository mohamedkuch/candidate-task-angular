import {Component, ElementRef, ViewChild} from '@angular/core';
import {User} from "../../models/user.model";
import {UserEditComponent} from "../user-edit/user-edit.component";
import {MatDialog} from "@angular/material/dialog";
import {UsersDataService} from "../../services/users-data.service";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
  @ViewChild('editButton', {read: ElementRef}) editButton!: ElementRef;

  user: User = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    joiningDate: new Date('2024-01-15'),
    department: 'Web',
    location: 'Germany',
    projects: 10,
    teamMembers: 55,
    team: 'SUI Team'
  };


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
