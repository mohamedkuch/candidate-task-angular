import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { UsersDataService } from './users-data.service';
import { User } from '../models/user.model';
import { updateUser } from '../../store/users/users.actions';

describe('Users Data Service Test', () => {
  let service: UsersDataService;
  let httpMock: HttpTestingController;
  let dialogMock: jasmine.SpyObj<MatDialog>;
  let storeMock: jasmine.SpyObj<Store>;

  // Mock data
  const mockUserData = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: 'Admin',
    status: 'Active',
    joiningDate: new Date('2024-01-01'),
    department: 'IT',
    location: 'NY',
    team: 'Development',
    schedule: '9-5',
    manager: 'Jane Manager',
    projects: 5,
    tasks: 10,
    teamMembers: 3
  };

  const mockUsersData = [
    mockUserData,
    {
      id: 2,
      name: 'Jane Doe',
      email: 'jane@example.com',
      role: 'User',
      status: 'Active',
      joiningDate: new Date('2024-01-02'),
      department: 'HR',
      location: 'LA',
      team: 'HR Team',
      schedule: '9-5',
      manager: 'John Manager',
      projects: 3,
      tasks: 8,
      teamMembers: 2
    }
  ];

  // Create User instances
  const mockUser = new User(mockUserData);
  const mockUsers = mockUsersData.map(data => new User(data));

  beforeEach(() => {
    dialogMock = jasmine.createSpyObj('MatDialog', ['open']);
    storeMock = jasmine.createSpyObj('Store', ['dispatch']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UsersDataService,
        { provide: MatDialog, useValue: dialogMock },
        { provide: Store, useValue: storeMock }
      ]
    });

    service = TestBed.inject(UsersDataService);
    httpMock = TestBed.inject(HttpTestingController);

    localStorage.clear();
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  describe('getUsers', () => {
    it('should return users from localStorage if available', () => {
      // Store the raw data in localStorage
      localStorage.setItem('usersData', JSON.stringify(mockUsersData));

      service.getUsers().subscribe(users => {
        expect(users.length).toBe(2);
        expect(users[0]).toBeInstanceOf(User);
        expect(users[0].id).toBe(mockUsers[0].id);
        expect(users[0].name).toBe(mockUsers[0].name);
        expect(users[0].joiningDate).toEqual(mockUsers[0].joiningDate);
      });
    });

    it('should fetch users from API if localStorage is empty', () => {
      service.getUsers().subscribe(users => {
        expect(users[0]).toBeInstanceOf(User);
        expect(users[0].id).toBe(mockUsers[0].id);
        expect(users[0].name).toBe(mockUsers[0].name);
        expect(users[0].joiningDate).toEqual(mockUsers[0].joiningDate);
      });

      const req = httpMock.expectOne('assets/data/users.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockUsersData);
    });
  });

  describe('getUserById', () => {
    beforeEach(() => {
      localStorage.setItem('usersData', JSON.stringify(mockUsersData));
    });

    it('should return user if found in localStorage', () => {
      service.getUserById(1).subscribe(user => {
        expect(user).toBeInstanceOf(User);
        expect(user?.id).toBe(mockUser.id);
        expect(user?.name).toBe(mockUser.name);
        expect(user?.joiningDate).toEqual(mockUser.joiningDate);
      });
    });

    it('should return null if user not found', () => {
      service.getUserById(999).subscribe(user => {
        expect(user).toBeNull();
      });
    });
  });

  describe('storeUsers', () => {
    it('should store users in localStorage', () => {
      service.storeUsers(mockUsers);

      const storedData = localStorage.getItem('usersData');
      const parsedData = storedData ? JSON.parse(storedData) : [];

      expect(parsedData[0].id).toBe(mockUsers[0].id);
      expect(parsedData[0].name).toBe(mockUsers[0].name);
      expect(new Date(parsedData[0].joiningDate)).toEqual(mockUsers[0].joiningDate);
    });
  });

  describe('getUsersFromLocalStorage', () => {
    it('should return empty array if no users in localStorage', () => {
      const users = service.getUsersFromLocalStorage();
      expect(users).toEqual([]);
    });

    it('should return users array if users exist in localStorage', () => {
      localStorage.setItem('usersData', JSON.stringify(mockUsersData));

      const users = service.getUsersFromLocalStorage();
      expect(users[0]).toBeInstanceOf(User);
      expect(users[0].id).toBe(mockUsers[0].id);
      expect(users[0].name).toBe(mockUsers[0].name);
      expect(users[0].joiningDate).toEqual(mockUsers[0].joiningDate);
    });
  });

  describe('editUser', () => {
    it('should open dialog and dispatch update action on success', () => {
      const updatedUserData = { ...mockUserData, name: 'Updated Name' };
      const dialogRefMock = {
        afterClosed: () => of(updatedUserData)
      };
      dialogMock.open.and.returnValue(dialogRefMock as MatDialogRef<any>);

      service.editUser(mockUser).subscribe(result => {
        expect(result).toBeInstanceOf(User);
        expect(result.name).toBe('Updated Name');
        expect(dialogMock.open).toHaveBeenCalledWith(
          jasmine.any(Function),
          { data: mockUser }
        );
        expect(storeMock.dispatch).toHaveBeenCalledWith(
          updateUser({ updatedUser: result })
        );
      });
    });

    it('should not emit or dispatch if dialog is cancelled', () => {
      const dialogRefMock = {
        afterClosed: () => of(null)
      };
      dialogMock.open.and.returnValue(dialogRefMock as MatDialogRef<any>);

      let emitted = false;
      service.editUser(mockUser).subscribe({
        next: () => emitted = true,
        complete: () => {
          expect(emitted).toBeFalse();
          expect(storeMock.dispatch).not.toHaveBeenCalled();
        }
      });
    });
  });
});
