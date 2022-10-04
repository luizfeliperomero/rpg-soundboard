import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { User } from 'src/app/models';
import { UserService } from 'src/app/services';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css'],
})
export class CreateUserComponent implements OnInit {
  @Output() sendSuccess = new EventEmitter<boolean>();
  user: User;
  form: FormGroup;
  success: boolean = false;
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

  save(): void {
    this.userService.save(this.form.value).subscribe(() => {
      this.success = true;
      this.sendSuccess.emit(true);
    });
  }
}
