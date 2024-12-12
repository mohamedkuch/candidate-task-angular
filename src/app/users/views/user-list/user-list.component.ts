import {Component} from '@angular/core';
import {User} from "../../models/user.model";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  users: User[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'Active',
      joiningDate: new Date('2024-01-15'),
      department: 'Web',
      location: 'Germany'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Manager',
      status: 'Active',
      joiningDate: new Date('2024-02-01'),
      department: 'Marketing',
      location: 'USA'
    },
  ];

  searchTerm: string = '';
}
