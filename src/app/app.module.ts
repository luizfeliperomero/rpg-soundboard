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
} from './components/';
import { UserService, PlaylistService, SoundService } from './services';
import { SoundSenderComponent } from './components/sound-sender/sound-sender.component';

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
  providers: [UserService, PlaylistService, SoundService],
  bootstrap: [AppComponent],
})
export class AppModule {}
