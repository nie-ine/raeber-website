import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, Output, OnInit } from '@angular/core';
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
import { SucheDarstellungsoptionenService } from '../suche-darstellungsoptionen.service';
import { HostListener, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';


@Component({
  moduleId: module.id,
  selector: 'rae-suchmaske',
  templateUrl: './suchmaske.component.html',
  styleUrls: [ './suchmaske.component.css' ]
})

export class SuchmaskeComponent implements OnChanges, OnInit {

  // Emits changes of search parameters
  @Output() public suchEvents: EventEmitter<AbstractControl> = new EventEmitter<AbstractControl>();
  @Output() startSearch: EventEmitter<any> = new EventEmitter<any>();
  // Form model which contains all search parameters
  suchmenuForm: FormGroup;
  @Input() sidenavOpened: boolean;
  @Input() searchTermArray: Array<string>;
  @Input() poemsInGrid: string;
  @Input() startSearchImmediately: boolean;
  @Input() loadingIndicatorInput: boolean;
  @Input() lastSearchTerm: string;

  relativeSizeOfColumns: string = '43%';
  textboxHeight: number = 0;
  textsHaveAlignedFrames: boolean = false;
  showTexts: boolean = true;
  navIsFixed = false;

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

  allConvolutesSelected: boolean = true;
  loadingIndicator = true;


  constructor(private fb: FormBuilder,
              private cdr: ChangeDetectorRef,
              private sucheDarstellungsoptionen: SucheDarstellungsoptionenService,
              @Inject(DOCUMENT) private document: Document) {
    this.createForm();
    this.onSearchParamsChange();
    this.sucheDarstellungsoptionen.relativeSizeOfColumns$.subscribe(
      colsSize => this.relativeSizeOfColumns = colsSize
    );
    this.sucheDarstellungsoptionen.textboxHeight$.subscribe(
      height => this.textboxHeight = height
    );
    this.sucheDarstellungsoptionen.textsHaveAlignedFrames$.subscribe(
      alignedFrames => this.textsHaveAlignedFrames = alignedFrames
    );
    this.sucheDarstellungsoptionen.showTexts$.subscribe(
      showTexts => this.showTexts = showTexts
    );
  }

  ngOnChanges() {
    //console.log(this.loadingIndicator);
    this.loadingIndicator = this.loadingIndicatorInput;
    if(this.startSearchImmediately) this.sidenavOpened = false;
    //console.log('Data arrived back in Suchmaske: ');
    //console.log(this.poemsInGrid);
    //console.log(this.searchTermArray);
    this.cdr.detectChanges();

  }

  ngOnInit() {
    //this.onSearchParamsChange();
  }

  /**
   * Checks if all child elements have the same value
   * @param {string} formGroupPath Path to respective `FormGroup`
   * @param {string} parentFormControlName Name of parent `FormControl`
   * @returns {boolean} True if all have the same value
   */
  childElemsHaveSameValues(formGroupPath: string, parentFormControlName: string) {
    const children = (this.suchmenuForm.get(formGroupPath) as FormGroup).controls;
    let res: boolean = true;
    let b: boolean;
    for (const v in children) {
      if (v !== parentFormControlName) {
        if (b == null || children[ v ].value === b) {
          b = children[ v ].value;
        } else {
          res = false;
        }
      }
    }
    return res;
  }

  pristineConvolutes() {
    return this.suchmenuForm.get('notizbuchForm').pristine &&
      this.suchmenuForm.get('manuskriptForm').pristine &&
      this.suchmenuForm.get('typoskriptForm').pristine &&
      this.suchmenuForm.get('druckForm').pristine &&
      this.suchmenuForm.get('zeitschriftForm').pristine &&
      this.suchmenuForm.get('materialienForm').pristine;
  }

  selectAllConvolutes() {
    this.allConvolutesSelected = !this.allConvolutesSelected;
    this.toggleGroupDisabled('notizbuchForm', 'notizbuchAll');
    this.toggleGroupDisabled('manuskriptForm', 'manuskriptAll');
    this.toggleGroupDisabled('typoskriptForm', 'typoskriptAll');
    this.toggleGroupDisabled('druckForm', 'druckAll');
    this.toggleGroupDisabled('zeitschriftForm', 'zeitschriftAll');
    this.toggleGroupDisabled('materialienForm', 'materialienAll');
    //console.log('allConvolutesSelected: ' + this.allConvolutesSelected);
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
   * Toggles value of child elements
   * @param {string} formGroupPath Path to respective `FormGroup`
   * @param {string} parentFormControlName Path to respective parent `FormControl`
   */
  toggleGroupDisabled(formGroupPath: string, parentFormControlName: string) {
    const children = (this.suchmenuForm.get(formGroupPath) as FormGroup).controls;
    for (const c in children) {
      children[ c ].setValue(this.allConvolutesSelected);
      if (this.suchmenuForm.get(formGroupPath).pristine) {
        this.suchmenuForm.get(formGroupPath).markAsDirty();
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
        const v = children[ c ].value;
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
      children[ c ].setValue(allElemValue, { emitModeltoViewChange: true });
    }
  }

  /**
   * Emits updated form model to caller
   */
  onSearchParamsChange() {
    const suchmenuForm = (this.suchmenuForm as FormGroup).controls;
    for (const s in suchmenuForm) {
      suchmenuForm[ s ].valueChanges.forEach(
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
      keineEndfassung: false,
      strophen: false,
      keineStrophen: false,
      mundart: false,
      keineMundart: false,
      zyklus: false,
      keinZyklus: false
    });
  }

  startTheSearch() {
    //console.log('startTheSearch');
    this.startSearch.emit();
  }

  generateTextForInputField(): string {
    if(!this.lastSearchTerm) {
      return null;
    } else return this.lastSearchTerm;

  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (window.pageYOffset > 100 || document.documentElement.scrollTop > 100 || document.body.scrollTop > 100) {
      this.navIsFixed = true;
    } else if (this.navIsFixed && window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop < 10) {
      this.navIsFixed = false;
    }
  }


  scrollToTop() {
    (function smoothscroll() {
      const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
      }
    })();
  }
  generatePlaceHolder() {
    if(this.lastSearchTerm) return null;
    else return 'Sucheingabe';
  }


}
