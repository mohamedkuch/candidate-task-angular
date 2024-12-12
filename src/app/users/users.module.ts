import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersRoutingModule} from './users-routing.module';
import {UserListComponent} from "./views/user-list/user-list.component";
import {UserEditComponent} from "./views/user-edit/user-edit.component";
import {UserDetailsComponent} from "./views/user-details/user-details.component";
import {FormsModule} from "@angular/forms";
import {UserItemComponent} from "./components/user-item/user-item.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import {EffectsModule} from "@ngrx/effects";
import {StoreModule} from "@ngrx/store";
import {usersReducer} from "../store/users/users.reducer";
import {UsersEffects} from "../store/users/users.effect";
import {UsersDataService} from "./services/users-data.service";


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
    MatButtonModule,
    StoreModule.forFeature('users', usersReducer),
    EffectsModule.forFeature([UsersEffects]),
  ],
  providers: [
    UsersDataService
  ]
})
export class UsersModule {
}
