import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersRoutingModule} from './users-routing.module';
import {UserListComponent} from "./components/user-list/user-list.component";
import {UserEditComponent} from "./components/user-edit/user-edit.component";
import {UserDetailsComponent} from "./components/user-details/user-details.component";


@NgModule({
  declarations: [
    UserListComponent,
    UserEditComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule
  ]
})
export class UsersModule {
}
