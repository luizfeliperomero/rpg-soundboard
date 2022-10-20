import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit, OnDestroy {
  showSignIn: boolean = false;
  showSignUp: boolean = false;
  signUpSuccess: boolean = false;
  audio: HTMLAudioElement = new Audio();

  constructor(private router: Router) {}

  ngOnDestroy(): void {
    this.audio.pause();
  }

  ngOnInit(): void {
    localStorage.removeItem('jwt');
    /*this.audio.src =
      'http://192.168.1.101:8080/api/v1/sound/getAudio/-64001108d58420f1d50b3b187f3e0e053b10606e';
    this.audio.load();
    this.audio.play();
    this.audio.loop = true;*/
  }

  setShowSignIn(): void {
    this.showSignIn = !this.showSignIn;
  }

  setShowSignUp(): void {
    this.showSignUp = !this.showSignUp;
  }

  signUpStatus(status: boolean): void {
    this.signUpSuccess = status;
    this.moveToSignIn();
  }

  moveToSignIn(): void {
    if (this.signUpSuccess) {
      setTimeout(() => {
        this.setShowSignUp();
        this.setShowSignIn();
      }, 4000);
    }
  }

  handleLogin(status: boolean): void {
    if (status) {
      this.router.navigate(['/home']);
    }
  }
}
