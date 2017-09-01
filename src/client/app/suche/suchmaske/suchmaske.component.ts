import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import {
  DruckAbgewandt,
  Manuskript,
  Materialien,
  Notizbuch,
  Suchwort,
  Textart,
  Typoskript,
  Zeitraum,
  Zeitschrift
} from './mockSucheCategories';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'rae-suchmaske',
  templateUrl: './suchmaske.component.html',
  styleUrls: ['./suchmaske.component.css']
})
export class SuchmaskeComponent implements OnInit {

  @Output() public suchEvents: EventEmitter<AbstractControl> = new EventEmitter<AbstractControl>();
  suchmenuForm: FormGroup;
  showNotizbuecher = false;
  buttonShow = this.showNotizbuecher ? 'fa-caret-down' : 'fa-caret-right';
  showManuskripte = false;
  showTyposkripte = false;
  showSelbPub = false;
  showUnselbPub = false;
  showMaterialien = false;
  showTextarten = true;
  filterChangeLog: boolean[] = [];
  suchraumOptions = [
    { value: 'volltext', viewValue: 'in Text & Titel' },
    { value: 'text', viewValue: 'in Text' },
    { value: 'titel', viewValue: 'in Titel' }
  ];

  constructor(private fb: FormBuilder /*, private route: ActivatedRoute */) {
    this.createForm();
    this.onSearchParamsChange();
    // this.logNotizbuchCbChange();
  }

  childElemsHaveSameValues(formGroupPath: string, parentFormControlName: string) {
    const children = (this.suchmenuForm.get(formGroupPath) as FormGroup).controls;
    let b: boolean;
    for (const v in children) {
      if (v !== parentFormControlName) {
        if (b === null) {
          b = children[v].value;
        } else {
          if (children[v].value !== b) {
            return false;
          }
        }
      }
    }
    return true;
  }

  toggleDisabled(formControlPath: string) {
    if ((this.suchmenuForm.get(formControlPath) as FormControl).disabled) {
      this.suchmenuForm.get(formControlPath).enable();
    } else {
      this.suchmenuForm.get(formControlPath).disable();
    }
  }

  toggleGroupDisabled(formGroupPath: string, parentFormControlName: string) {
    const children = (this.suchmenuForm.get(formGroupPath) as FormGroup).controls;
    if ((this.suchmenuForm.get(parentFormControlName) as FormControl).disabled) {
      for (const c in children) {
        children[c].enable();
      }
    } else {
      for (const c in children) {
        children[c].disable();
      }
    }
  }

  /**
   * Examines if the child elements (checkboxes) are checked or not
   * @param {string} formGroupPath Path to `FormGroup` to which the parent and child elements belong
   * @param {string} parentFormControlName Name of parent element
   * @param {boolean} reverseFilter If set to true examines if none is checked
   * @returns {boolean} True if all (none) is checked, false otherwise
   */
  childElemsAreChecked(formGroupPath: string, parentFormControlName: string, reverseFilter: boolean = false) {
    const children = (this.suchmenuForm.get(formGroupPath) as FormGroup).controls;
    for (const c in children) {
      if (c !== parentFormControlName) {
        const v = children[c].value;
        if (v === reverseFilter) {
          return false;
        }
      }
    }
    return true;
  }

  setValueForChildElems(path: string, allElemPath: string) {
    const children = (this.suchmenuForm.get(path) as FormGroup).controls;
    const allElemValue = (this.suchmenuForm.get(allElemPath) as FormControl).value;
    for (const c in children) {
      children[c].setValue(allElemValue, { emitModeltoViewChange: true });
    }
  }

  onSearchParamsChange() {
    const suchmenuForm = (this.suchmenuForm as FormGroup).controls;
    for (const s in suchmenuForm) {
      suchmenuForm[s].valueChanges.forEach(
        x => this.suchEvents.next(this.suchmenuForm));
    }
  }

  createForm() {
    this.suchmenuForm = this.fb.group({
      suchwortForm: this.fb.group(new Suchwort()),
      notizbuchForm: this.fb.group(new Notizbuch()),
      manuskriptForm: this.fb.group(new Manuskript()),
      typoskriptForm: this.fb.group(new Typoskript()),
      druckForm: this.fb.group({
        druckAll: false,
        druckGesicht: false,
        druckSchiffe: false,
        druckGedichte: false,
        druckFlussufer: false,
        druckReduktionen: false,
        druckAbgewandt: this.fb.group(new DruckAbgewandt())
      }),
      zeitschriftForm: this.fb.group(new Zeitschrift()),
      materialienForm: this.fb.group(new Materialien()),
      textartForm: this.fb.group(new Textart()),
      zeitraumForm: this.fb.group(new Zeitraum()),
      endfassung: false,
      strophen: false,
      mundart: false,
      mehrteilig: false
    });
  }

  ngOnInit() {
    /* this.route.paramMap
      .switchMap((params: ParamMap) => console.log(params.keys))
      .subscribe(x => ) */
  }

}
