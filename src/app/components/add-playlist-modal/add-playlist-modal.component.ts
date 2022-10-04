import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-playlist-modal',
  templateUrl: './add-playlist-modal.component.html',
  styleUrls: ['./add-playlist-modal.component.css'],
})
export class AddPlaylistModalComponent implements OnInit {
  form: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null],
      description: [null],
    });
  }

  submit(): void {
    console.log(this.form.value);
  }
}
