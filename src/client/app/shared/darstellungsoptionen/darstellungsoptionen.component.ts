import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'rae-darstellungsoptionen',
  templateUrl: './darstellungsoptionen.component.html'
})
export class DarstellungsoptionenComponent {
  @Output() darstellung = new EventEmitter<FormGroup>();

  layoutSettingsForm: FormGroup = new FormGroup({
    frameSizeSetter: new FormControl(5),
    frameToggler: new FormControl(true),
    textToggler: new FormControl(true),
    colsSetter: new FormControl('2')
  });

  constructor() {
    this.layoutSettingsForm.valueChanges
      .debounceTime(200)
      .subscribe(darstellung => this.darstellung.emit(darstellung));
  }

  resetLayout() {
    this.layoutSettingsForm.get('frameSizeSetter').setValue(5);
    this.layoutSettingsForm.get('frameToggler').setValue(true);
    this.layoutSettingsForm.get('textToggler').setValue(true);
    this.layoutSettingsForm.get('colsSetter').setValue('2');
  }
}
