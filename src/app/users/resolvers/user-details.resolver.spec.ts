import { TestBed } from '@angular/core/testing';
import { ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { UsersDataService } from '../services/users-data.service';
import { User } from '../models/user.model';
import { userDetailsResolver } from './user-details.resolver';
import { Observable, of, throwError } from 'rxjs';

describe('User Details Resolver Test', () => {
  let resolver: ResolveFn<User | null>;
  let usersDataServiceMock: jasmine.SpyObj<UsersDataService>;
  let routerMock: jasmine.SpyObj<Router>;
  let routeSnapshotMock: ActivatedRouteSnapshot;
  let routeStateMock: RouterStateSnapshot;

  const mockUser = new User({
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
  });

  beforeEach(() => {
    usersDataServiceMock = jasmine.createSpyObj('UsersDataService', ['getUserById']);
    routerMock = jasmine.createSpyObj('Router', ['navigate']);

    routeSnapshotMock = {
      paramMap: new Map<string, string>()
    } as any;

    routeStateMock = {
      url: 'test-url'
    } as RouterStateSnapshot;

    TestBed.configureTestingModule({
      providers: [
        { provide: UsersDataService, useValue: usersDataServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    resolver = userDetailsResolver;
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });

  it('should return user when found', (done) => {
    // Arrange
    spyOn(routeSnapshotMock.paramMap, 'get').and.returnValue('1');
    usersDataServiceMock.getUserById.and.returnValue(of(mockUser));

    // Act
    const result = TestBed.runInInjectionContext(() =>
      resolver(routeSnapshotMock, routeStateMock)
    );

    // Assert
    if (result instanceof Observable) {
      result.subscribe({
        next: (resolvedUser) => {
          expect(resolvedUser).toBeTruthy();
          expect(resolvedUser).toBeInstanceOf(User);
          expect(resolvedUser?.id).toBe(1);
          expect(routerMock.navigate).not.toHaveBeenCalled();
          done();
        },
        error: done.fail
      });
    } else {
      done.fail('Resolver should return an Observable');
    }
  });

  it('should navigate to not-found and return null when user not found', (done) => {
    // Arrange
    spyOn(routeSnapshotMock.paramMap, 'get').and.returnValue('999');
    usersDataServiceMock.getUserById.and.returnValue(of(null));

    // Act
    const result = TestBed.runInInjectionContext(() =>
      resolver(routeSnapshotMock, routeStateMock)
    );

    // Assert
    if (result instanceof Observable) {
      result.subscribe({
        next: (resolvedUser) => {
          expect(resolvedUser).toBeNull();
          expect(routerMock.navigate).toHaveBeenCalledWith(['/users/not-found']);
          done();
        },
        error: done.fail
      });
    } else {
      done.fail('Resolver should return an Observable');
    }
  });

  it('should navigate to not-found and return null on error', (done) => {
    // Arrange
    spyOn(routeSnapshotMock.paramMap, 'get').and.returnValue('1');
    usersDataServiceMock.getUserById.and.returnValue(
      throwError(() => new Error('Test error'))
    );

    // Act
    const result = TestBed.runInInjectionContext(() =>
      resolver(routeSnapshotMock, routeStateMock)
    );

    // Assert
    if (result instanceof Observable) {
      result.subscribe({
        next: (resolvedUser) => {
          expect(resolvedUser).toBeNull();
          expect(routerMock.navigate).toHaveBeenCalledWith(['/users/not-found']);
          done();
        },
        error: done.fail
      });
    } else {
      done.fail('Resolver should return an Observable');
    }
  });

  it('should handle invalid user ID in route params', (done) => {
    // Arrange
    spyOn(routeSnapshotMock.paramMap, 'get').and.returnValue('invalid-id');
    usersDataServiceMock.getUserById.and.returnValue(of(null));

    // Act
    const result = TestBed.runInInjectionContext(() =>
      resolver(routeSnapshotMock, routeStateMock)
    );

    // Assert
    if (result instanceof Observable) {
      result.subscribe({
        next: (resolvedUser) => {
          expect(resolvedUser).toBeNull();
          expect(routerMock.navigate).toHaveBeenCalledWith(['/users/not-found']);
          expect(usersDataServiceMock.getUserById).toHaveBeenCalledWith(NaN);
          done();
        },
        error: done.fail
      });
    } else {
      done.fail('Resolver should return an Observable');
    }
  });
});
