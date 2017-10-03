import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  moduleId: module.id,
  selector: 'rae-darstellungsoptionen',
  templateUrl: './darstellungsoptionen.component.html'
})
export class DarstellungsoptionenComponent {
  @Output() darstellung: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();
  @Output() vergroessereText = new EventEmitter();
  @Output() verkleinereText = new EventEmitter();
  @Input() gridHeight: number = 0;

  layoutSettingsForm: FormGroup;

  constructor() {
    this.layoutSettingsForm = new FormGroup({
      frameToggler: new FormControl(true),
      textToggler: new FormControl(true),
      colsSetter: new FormControl('2')
    });
    this.layoutSettingsForm.valueChanges
      .debounceTime(200)
      .subscribe((dars: FormGroup) => this.darstellung.emit(dars));
  }

  resetLayout() {
    this.layoutSettingsForm.get('frameSizeSetter').setValue(5);
    this.layoutSettingsForm.get('frameToggler').setValue(true);
    this.layoutSettingsForm.get('textToggler').setValue(true);
    this.layoutSettingsForm.get('colsSetter').setValue('2');
  }

  textVergroessern() {
    this.vergroessereText.emit(null);
  }

  textVerkleinern() {
    this.verkleinereText.emit(null);
  }
}
