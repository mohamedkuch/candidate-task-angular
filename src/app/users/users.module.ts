import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersRoutingModule} from './users-routing.module';
import {UserListComponent} from "./views/user-list/user-list.component";
import {UserEditComponent} from "./views/user-edit/user-edit.component";
import {UserDetailsComponent} from "./views/user-details/user-details.component";
import {FormsModule} from "@angular/forms";
import {UserItemComponent} from "./components/user-item/user-item.component";
import { MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";


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
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ]
})
export class UsersModule {
}
