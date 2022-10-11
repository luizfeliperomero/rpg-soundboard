import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Sound } from 'src/app/models';
import { SoundService } from 'src/app/services';

@Component({
  selector: 'app-edit-sound-modal',
  templateUrl: './edit-sound-modal.component.html',
  styleUrls: ['./edit-sound-modal.component.css'],
})
export class EditSoundModalComponent implements OnInit, OnDestroy {
  form: FormGroup;
  subscription: Subscription;
  @Input() sound: Sound;
  @Output() editConfirmation: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private soundService: SoundService
  ) {}

  ngOnInit(): void {
    this.subscription = null;
    this.form = this.formBuilder.group({
      name: [this.sound.name],
    });
  }

  ngOnDestroy(): void {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }

  send(): void {
    this.sound.name = this.form.value.name;
    this.subscription = this.soundService.edit(this.sound).subscribe(
      () => {},
      () => {},
      () => {
        this.editConfirmation.emit(true);
      }
    );
  }
}
