import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Druck,
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

  // Emits changes of search parameters
  @Output() public suchEvents: EventEmitter<AbstractControl> = new EventEmitter<AbstractControl>();
  // Form model which contains all search parameters
  suchmenuForm: FormGroup;

  /*
  Options for extension of fulltext search
   */
  suchraumOptions = [
    { value: 'volltext', viewValue: 'in Text & Titel' },
    { value: 'text', viewValue: 'in Text' },
    { value: 'titel', viewValue: 'in Titel' }
  ];

  /*
  Tracks if convolute category elements are hidden
   */
  catHidden = {
    notizbuecher: false,
    manuskripte: false,
    typoskripte: false,
    drucke: false,
    zeitschriften: false,
    materialien: false
  };

  /*
  Tracks if convolute category elements are disabled
   */
  catDisabled = {
    notizbuecher: false,
    manuskripte: false,
    typoskripte: false,
    drucke: false,
    zeitschriften: false,
    materialien: false
  };

  constructor(private fb: FormBuilder) {
    this.createForm();
    this.onSearchParamsChange();
  }

  /**
   * Checks if all child elements have the same value
   * @param {string} formGroupPath Path to respective `FormGroup`
   * @param {string} parentFormControlName Name of parent `FormControl`
   * @returns {boolean} True if all have the same value
   */
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

  /**
   * Toggles disabled/enabled state of element
   * @param {string} formControlPath Path to `FormControl`
   */
  toggleDisabled(formControlPath: string) {
    if ((this.suchmenuForm.get(formControlPath) as FormControl).disabled) {
      this.suchmenuForm.get(formControlPath).enable();
    } else {
      this.suchmenuForm.get(formControlPath).disable();
    }
  }

  /**
   * Toggles disabled/enabled state of child elements
   * @param {string} formGroupPath Path to respective `FormGroup`
   * @param {string} parentFormControlName Path to respective parent `FormControl`
   */
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

  /**
   * Aligns the values of the child elements with the value of the parent element
   * @param {string} formGroupPath Path to `FormGroup`
   * @param {string} parentFormControlPath Path to parent `FormControl`
   */
  setValueForChildElems(formGroupPath: string, parentFormControlPath: string) {
    const children = (this.suchmenuForm.get(formGroupPath) as FormGroup).controls;
    const allElemValue = (this.suchmenuForm.get(parentFormControlPath) as FormControl).value;
    for (const c in children) {
      children[c].setValue(allElemValue, { emitModeltoViewChange: true });
    }
  }

  /**
   * Emits updated form model to caller
   */
  onSearchParamsChange() {
    const suchmenuForm = (this.suchmenuForm as FormGroup).controls;
    for (const s in suchmenuForm) {
      suchmenuForm[s].valueChanges.forEach(
        x => this.suchEvents.next(this.suchmenuForm));
    }
  }


  /**
   * Creates form model
   */
  createForm() {
    this.suchmenuForm = this.fb.group({
      suchwortForm: this.fb.group(new Suchwort()),
      notizbuchForm: this.fb.group(new Notizbuch()),
      manuskriptForm: this.fb.group(new Manuskript()),
      typoskriptForm: this.fb.group(new Typoskript()),
      druckForm: this.fb.group(new Druck()),
      /*      druckForm: this.fb.group({
              druckAll: false,
              druckGesicht: false,
              druckSchiffe: false,
              druckGedichte: false,
              druckFlussufer: false,
              druckReduktionen: false,
              druckAbgewandt: this.fb.group(new DruckAbgewandt())
            }),*/
      zeitschriftForm: this.fb.group(new Zeitschrift()),
      materialienForm: this.fb.group(new Materialien()),
      textartForm: this.fb.group(new Textart()),
      zeitraumForm: this.fb.group(new Zeitraum, [
        Validators.maxLength(4),
        Validators.minLength(4),
        Validators.pattern('[0-9]{4}')
      ]),
      endfassung: false,
      strophen: false,
      mundart: false,
      zyklus: false
    });
  }

  ngOnInit() {
    /* this.route.paramMap
      .switchMap((params: ParamMap) => console.log(params.keys))
      .subscribe(x => ) */
  }

}
