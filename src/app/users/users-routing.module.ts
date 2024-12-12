import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from "./views/user-list/user-list.component";
import {UserDetailsComponent} from "./views/user-details/user-details.component";
import {userDetailsResolver} from "./resolvers/user-details.resolver";
import {UserNotFoundComponent} from "./views/user-not-found/user-not-found.component";

const routes: Routes = [
  {path: '', component: UserListComponent},
  {
    path: 'not-found',
    component: UserNotFoundComponent
  },
  {
    path: ':id', component: UserDetailsComponent,
    resolve: {user: userDetailsResolver}
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
