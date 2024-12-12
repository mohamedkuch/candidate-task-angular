import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { UserListComponent } from './user-list.component';
import { Store } from '@ngrx/store';
import { User } from '../../models/user.model';
import { loadUsers, updateSearchTerm } from '../../../store/users/users.actions';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Component, Input } from '@angular/core';
import { By } from '@angular/platform-browser';
import { UsersDataService } from '../../services/users-data.service';

// Create a mock UserItemComponent
@Component({
  selector: 'app-user-item',
  template: '<div class="user-item">{{user.name}}</div>'
})
class MockUserItemComponent {
  @Input() user!: User;
}

describe('User List Component Test', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let storeMock: jasmine.SpyObj<Store>;
  let usersDataServiceMock: jasmine.SpyObj<UsersDataService>;

  const mockUsers = [
    new User({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin',
      status: 'Active'
    }),
    new User({
      id: 2,
      name: 'Jane Doe',
      email: 'jane@example.com',
      role: 'User',
      status: 'Active'
    })
  ];

  beforeEach(async () => {
    storeMock = jasmine.createSpyObj('Store', ['dispatch', 'select']);
    usersDataServiceMock = jasmine.createSpyObj('UsersDataService', ['getUsers', 'editUser']);

    storeMock.select.and.returnValue(of(mockUsers));

    await TestBed.configureTestingModule({
      declarations: [
        UserListComponent,
        MockUserItemComponent // Use mock component
      ],
      imports: [FormsModule],
      providers: [
        { provide: Store, useValue: storeMock },
        { provide: UsersDataService, useValue: usersDataServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadUsers on init', () => {
    expect(storeMock.dispatch).toHaveBeenCalledWith(loadUsers());
  });

  it('should display users from store', (done) => {
    component.users$.subscribe(users => {
      expect(users).toEqual(mockUsers);
      expect(users.length).toBe(2);
      done();
    });
  });

  it('should debounce search term updates', fakeAsync(() => {
    component.onSearchChange('test');
    component.onSearchChange('test1');
    component.onSearchChange('test2');

    tick(300);

    expect(storeMock.dispatch).toHaveBeenCalledWith(
      updateSearchTerm({ searchTerm: 'test2' })
    );
  }));

  it('should handle search input changes', () => {
    const searchInput = fixture.debugElement.query(
      By.css('input[type="text"]')
    ).nativeElement;

    searchInput.value = 'test';
    searchInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(component.searchTerm).toBe('test');
  });

  it('should render user list table with correct headers', () => {
    const headers = fixture.debugElement.queryAll(By.css('th'));
    expect(headers.length).toBe(5);
    expect(headers[0].nativeElement.textContent).toContain('User');
    expect(headers[1].nativeElement.textContent).toContain('Email');
    expect(headers[2].nativeElement.textContent).toContain('Role');
    expect(headers[3].nativeElement.textContent).toContain('Status');
  });

  it('should render user items for each user', () => {
    const userItems = fixture.debugElement.queryAll(By.directive(MockUserItemComponent));
    expect(userItems.length).toEqual(mockUsers.length);
  });
});
