import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
  PlaylistComponent,
  PlayerComponent,
  AddPlaylistModalComponent,
  WelcomeComponent,
  HomeComponent,
  CreateUserComponent,
  LoginComponent,
  StagingAreaComponent,
  SoundSenderComponent,
} from './components/';
import {
  UserService,
  PlaylistService,
  SoundService,
  PlayerService,
} from './services';

@NgModule({
  declarations: [
    AppComponent,
    PlaylistComponent,
    PlayerComponent,
    AddPlaylistModalComponent,
    WelcomeComponent,
    HomeComponent,
    CreateUserComponent,
    LoginComponent,
    StagingAreaComponent,
    SoundSenderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [UserService, PlaylistService, SoundService, PlayerService],
  bootstrap: [AppComponent],
})
export class AppModule {}
