import {isDevMode, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {MatDialogModule} from "@angular/material/dialog";
import {EffectsModule, provideEffects} from "@ngrx/effects";
import {provideStore, StoreModule} from "@ngrx/store";
import {HttpClientModule} from "@angular/common/http";
import {usersReducer} from "./store/users/users.reducer";
import {UsersEffects} from "./store/users/users.effect";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatDialogModule,
    HttpClientModule,
    StoreModule.forRoot({}), // Initialize root store (empty, as feature modules handle their own state)
    EffectsModule.forRoot([]), // Initialize root effects
  ],
  providers: [
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
