import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserListComponent} from "./components/user-list/user-list.component";
import {UserDetailsComponent} from "./components/user-details/user-details.component";
import {UserEditComponent} from "./components/user-edit/user-edit.component";

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: ':id', component: UserDetailsComponent },
  { path: ':id/edit', component: UserEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
