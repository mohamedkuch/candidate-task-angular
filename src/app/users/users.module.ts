import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersRoutingModule} from './users-routing.module';
import {UserListComponent} from "./views/user-list/user-list.component";
import {UserEditComponent} from "./views/user-edit/user-edit.component";
import {UserDetailsComponent} from "./views/user-details/user-details.component";
import {FormsModule} from "@angular/forms";
import {UserItemComponent} from "./components/user-item/user-item.component";
import { MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    UserListComponent,
    UserEditComponent,
    UserDetailsComponent,
    UserItemComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    MatDialogModule
  ]
})
export class UsersModule {
}
