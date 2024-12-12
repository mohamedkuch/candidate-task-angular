import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'users', pathMatch: 'full'},
  {path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule)},
  // Wildcard route at the end to catch all invalid URLs
  {path: '**', redirectTo: 'users'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
