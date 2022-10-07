import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { User } from 'src/app/models';
import { UserService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Output() sendSuccess = new EventEmitter<boolean>();
  user: User;
  form: FormGroup;
  unauthorized: boolean = false;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null],
      password: [null],
    });
  }

  authenticate(): void {
    this.userService.authenticate(this.form.value).subscribe(
      (data) => {
        console.log(data.status);
        if (data.status === 200) {
          this.sendSuccess.emit(true);
          localStorage.setItem('user', JSON.stringify(data));
        }
      },
      (err) => {
        if (err.status === 401 || err.status === 404) {
          this.unauthorized = true;
        }
      }
    );
  }
}
