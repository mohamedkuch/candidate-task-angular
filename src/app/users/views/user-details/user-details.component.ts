import {Component} from '@angular/core';
import {User} from "../../models/user.model";

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {
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


  constructor() {
  }


  goBack() {
  }
}
