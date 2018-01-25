import {
  ChangeDetectorRef, Component, EventEmitter, HostListener, Inject, Input, OnChanges, OnInit, Output,
  ViewChild
} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Druck, Manuskript, Materialien, Notizbuch, Suchwort, Textart, Typoskript, Zeitraum,
  Zeitschrift
} from './mockSucheCategories';
import 'rxjs/add/operator/switchMap';
import { SucheDarstellungsoptionenService } from '../suche-darstellungsoptionen.service';
import { DOCUMENT } from '@angular/platform-browser';
import { TextgridComponent } from '../../shared/textgrid/textgrid.component';


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
  @Input() searchTermArray: Array<string>;
  @Input() poemsInGrid: string;
  @Input() startSearchImmediately: boolean;
  @Input() loadingIndicatorInput: boolean;
  @Input() lastSearchTerm: string;

  relativeSizeOfColumns: string = '45%';
  textboxHeight: number = 0;
  textsHaveAlignedFrames: boolean = false;
  showTexts: boolean = true;
  navIsFixed = false;
  yearPickerArray: Array<any>;
  endYearPickerArray: Array<any>;
  firstYear = 1948;
  lastYear = 1992;
  chosenStartYear: number;
  chosenEndYear: number;
  sidenavOpened = true;

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
   0 = No child category is selected
   1 = Some child categories are selected
   2 = All child categories are selected
   */
  parentCategoryState: { [name: string]: number } = {
    notizbuchForm: 2,
    manuskriptForm: 2,
    typoskriptForm: 2,
    druckForm: 2,
    zeitschriftForm: 2,
    materialienForm: 2
  };

  allConvolutesSelected = true;
  allGenresSelected = true;
  loadingIndicator = true;

  @ViewChild(TextgridComponent)
  private textgridComponent: TextgridComponent;

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
    this.sucheDarstellungsoptionen.noSinglePoemIsHidden$.subscribe(
      noSinglePoemIsHidden => this.textgridComponent.resetSinglePoemHiddenState()
    );
  }

  ngOnChanges() {
    //console.log(this.loadingIndicator);
    this.loadingIndicator = this.loadingIndicatorInput;
    //console.log('Data arrived back in Suchmaske: ');
    //console.log(this.poemsInGrid);
    //console.log(this.searchTermArray);
    this.cdr.detectChanges();

  }

  ngOnInit() {
    if( this.startSearchImmediately ) this.sidenavOpened = false;
    this.yearPickerArray = [];
    for(let i = 0; i < this.lastYear - this.firstYear; i++) {
      this.yearPickerArray[ i ] = this.firstYear + i;
    }
    //this.onSearchParamsChange();
  }

  selectAllConvolutes() {
    this.allConvolutesSelected = !this.allConvolutesSelected;
    this.toggleGroupDisabled('notizbuchForm', 'notizbuchAll');
    this.toggleGroupDisabled('manuskriptForm', 'manuskriptAll');
    this.toggleGroupDisabled('typoskriptForm', 'typoskriptAll');
    this.toggleGroupDisabled('druckForm', 'druckAll');
    this.toggleGroupDisabled('zeitschriftForm', 'zeitschriftAll');
    this.toggleGroupDisabled('materialienForm', 'materialienAll');
  }

  selectAllGenres() {
    this.allGenresSelected = !this.allGenresSelected;
    const genres = (this.suchmenuForm.get('textartForm') as FormGroup).controls;
    for (const v in genres) {
      genres[ v ].setValue(this.allGenresSelected);
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
    this.setStateOfParentElement(formGroupPath, parentFormControlName);
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
    this.setStateOfParentElement(formGroupPath, parentFormControlPath.split('.').pop());
  }

  setStateOfParentElement(category: string, parentName: string): void {
    const children = (this.suchmenuForm.get(category) as FormGroup).controls;
    this.parentCategoryState[ category ] = Object.keys(children)
      .filter(e => e !== parentName)
      .reduce((x, y) => {
        if (x === -1) {
          return children[ y ].value ? 2 : 0;
        } else {
          const yAsNumVal = children[ y ].value ? 2 : 0;
          return x === yAsNumVal ? x : 1;
        }
      }, -1);
  }

  /**
   * Emits updated form model to caller
   */
  onSearchParamsChange() {
    console.log('Params Change');
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
    this.startSearch.emit();
  }

  generateTextForInputField(): string {
    if (!this.lastSearchTerm) {
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
    if (this.lastSearchTerm) return null;
    else return 'Sucheingabe';
  }

  resetInputValue() {
    this.createForm();
    this.onSearchParamsChange();
  }

  openAndCloseSidenav() {
    this.sidenavOpened = !this.sidenavOpened;
  }

}
