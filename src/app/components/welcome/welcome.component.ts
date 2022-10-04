import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
})
export class WelcomeComponent implements OnInit {
  showSignIn: boolean = false;
  showSignUp: boolean = false;
  signUpSuccess: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

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
