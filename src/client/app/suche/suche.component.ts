import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { globalSearchVariableService } from './globalSearchVariablesService';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MdDialog } from '@angular/material';
import { SuchmaskeHilfeComponent } from './suchmaske-hilfe/suchmaske-hilfe.component';
import { CachePoem } from '../shared/textgrid/cache-poem';
import { createsuchmaskeKonvolutIRIMapping } from './suchServices/suchModel.service';

@Component({
  moduleId: module.id,
  selector: 'rae-suche',
  templateUrl: 'suche.component.html',
  styleUrls: [ 'suche.component.css' ]
})
export class SucheComponent implements OnInit, AfterViewChecked {
  numberOfComponents = 1;

  myResources: Array<any>;
  myProperties: Array<any>;
  responseArray: Array<any>;
  selectedResource: string;
  selectedProperty: string;
  searchForVal: string;
  query: string;
  availableboolOperators = [
    { name: 'equal to', operator: 'EQ' },
    { name: 'not equal to', operator: '!EQ' },
    { name: 'greater than', operator: 'GT' },
    { name: 'greater or equal', operator: 'GT_EQ' },
    { name: 'lower than', operator: 'LT' },
    { name: 'lower or equal than', operator: 'LT_EQ' },
    { name: 'exists', operator: 'EXISTS' },
    { name: 'match', operator: 'MATCH' },
    { name: 'like', operator: 'LIKE' },
    { name: '!like', operator: '!LIKE' },
    { name: 'match_boolean', operator: 'MATCH_BOOLEAN' }
  ];
  array = [
    1
  ];
  i: number;
  j: number;
  k: number;
  l: number;
  m: number;
  o: number;
  isAlreadyInArray = 0;
  helperMap = new Map();
  mapOfAllQueries = new Map();
  count = 0;
  numberOfPropertiesInSearchBox = '';
  helpArray: any;
  str: string;
  value: string;
  sendInputStringToSuchmaske: string;
  finalQueryArray = [ '' ];
  currentSearchBox = '1';
  allSearchResults: Array<CachePoem>;
  notizbuchDisabled = false;
  manuskriptDisabled = false;
  typoscriptDisabled = false;
  druckDisabled = false;
  materialDisabled = false;
  inputSearchStringToBeParsed: string;
  numberOfQueries = 0;
  input: Array<any>;
  searchTerm: string;
  numberOfSearchResults: number;
  queries: Array<any>;
  partOfAllSearchResults: Array<any>;
  trueIfDuplicate = false;
  temporarySearchResults: Array<any>;
  finalTemporaryResults: Array<any>;
  firstTermAfterOr = true;
  konvolutIDToGetIRI: any;
  setOfKonvolutIRIs = new Set();
  setOfAlowedPoemIRIs = new Set();
  setOfPerformedQueries = new Set();
  setOfKonvolutIRIsOld = new Set();
  setOfKonvolutQueries = new Set();
  searchTermArray: Array<string>;
  zeitschriftWortTat = new Set();
  startSearchImmediately = false;
  setOfPoemsInResult = new Set();
  setOfAllSearchResults = new Set();
  warning: string;
  warningread: boolean;
  currentPath: string;
  loadingIndicatorInput: boolean;
  allSearchResultsLengthOld: number;
  noMoreChanges = false;
  progressIndicator = 0;
  arrayOfResultsInAllSearchGroups = [
    {
      'setOfSearchTermsInSearchGroup': new Set(),
      'setOfResultsInSearchGroup': new Set()
    }
  ];
  arg: AbstractControl;
  rightProperty: string;
  convoluteIndex = -1;
  suchmaskeKonvolutIRIMapping = createsuchmaskeKonvolutIRIMapping();
  poemResTypes = [
    'http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber%23PoemNote',
    'http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber%23HandwrittenPoem',
    'http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber%23PostCardPoem',
    'http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber%23TypewrittenPoem',
    'http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber%23PublicationPoem',
    'http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber%23DiaryConvolute'
  ];

  constructor(public dialog: MdDialog, private http: Http, private route: ActivatedRoute, private location: Location,
              private cdr: ChangeDetectorRef) {
    this.route.params.subscribe(params => console.log(params));
  }


  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  checkProgress() {
    //console.log('check progress');
    this.loadingIndicatorInput = true;
    setTimeout(() => {
      this.loadingIndicatorInput = false;
    }, 8000);
  }

  handleSearchEvent(arg: AbstractControl) {
    //console.log(arg);
    if(this.startSearchImmediately) this.startSearchImmediately = false;
    this.arg = arg;
    this.updateSuchmaskeKonvolutIRIMapping(arg);
    //Send String to Parser:
    if (arg.get('suchwortForm').value.suchwortInput !== '') this.inputSearchStringToBeParsed = arg.get('suchwortForm').value.suchwortInput;
    else this.inputSearchStringToBeParsed = this.searchTerm;
    this.currentPath = '/suche?wort=' + this.inputSearchStringToBeParsed;
    this.location.replaceState(this.currentPath);
  }
  updateFilterParams(routeSnapshot: boolean, defaultValue: boolean): boolean {
    if(routeSnapshot) return routeSnapshot;
    else return defaultValue;
  }

  ngOnInit() {
    for (this.o = 0; this.o < this.suchmaskeKonvolutIRIMapping.length; this.o++) {
      this.getKonvolutIRI(this.suchmaskeKonvolutIRIMapping[ this.o ].konvolut, this.o);
    }
    if (this.route.snapshot.queryParams[ 'wort' ]) {
      for ( let konvolut of this.suchmaskeKonvolutIRIMapping ) {
        konvolut.enabled = this.updateFilterParams(this.route.snapshot.queryParams[ konvolut.suchmaskeKonvolutName ], true);
      }
      this.startSearchImmediately = true;
      this.searchTermArray = [];
      this.searchTermArray[this.searchTermArray.length] = this.route.snapshot.queryParams[ 'wort' ];
      setTimeout(() => {
        //console.log('Wait for Konvolutes to load');
        this.inputSearchStringToBeParsed = this.route.snapshot.queryParams[ 'wort' ];
      }, 3000);

    }
    if (this.allSearchResults === undefined) {
      this.numberOfSearchResults = 0;
    } else {
      this.numberOfSearchResults = this.allSearchResults.length;
    }
  }


  executeFinalQueries() {
    this.checkProgress();
    this.allSearchResultsLengthOld = 0;
    this.noMoreChanges = false;
    this.setOfPoemsInResult.clear();
    this.sendInputStringToSuchmaske = this.inputSearchStringToBeParsed;
    this.warning = '';
    this.numberOfQueries = 0;
    this.numberOfSearchResults = 0;
    this.allSearchResults = [];
    this.searchTermArray = [];
    this.partOfAllSearchResults = undefined;
    this.setOfAllSearchResults.clear();
    if(this.arg) this.updateQueryParamsInURL();
    if (!this.queries) {
      //console.log('No query defined');
    } else {
      this.allSearchResults = undefined;
      this.translateQueriesReturnedFromParserToKnoraRequests(this.queries);
    }
  }

  translateQueriesReturnedFromParserToKnoraRequests(queries: Array<any>) {
    this.str = JSON.stringify(queries, null, 4);
    //console.log('Queries: ' + this.str);
    this.temporarySearchResults = undefined;
    for (this.i = 0; this.i < queries.length; this.i++) {
      this.firstTermAfterOr = true;
      //console.log('Request Group nr: ' + this.i);
      this.finalTemporaryResults = undefined;
      this.temporarySearchResults = undefined;
      for (this.j = 0; this.j < queries[ this.i ].length; this.j++) {
        if (this.j !== 0) {
          //console.log('And merge with?');
        }
        this.numberOfQueries += 1;
        //console.log('Search for: '
        //  + queries[ this.i ][ this.j ].searchString
        //  + ' in: ' + queries[ this.i ][ this.j ].where);
        this.searchTerm = queries[ this.i ][ this.j ].searchString;
        if (this.searchTermArray === undefined) {
          this.searchTermArray = [];
        }
        this.searchTermArray[ this.searchTermArray.length ] = this.searchTerm;
        if(this.searchTerm.length < 3) {
          if(!this.warningread) {
            this.warning = ' - Bitte geben Sie ein Wort mit mindestens 3 Buchstaben ein oder starten Sie die Suche erneut.';
            this.warningread = true;
          } else {
            this.warning = '';
            this.performQuery(this.searchTerm, queries[ this.i ][ this.j ].where, this.firstTermAfterOr, this.i, queries[ this.i ].length);
            this.firstTermAfterOr = false;
          }
        } else {
          this.performQuery(this.searchTerm, queries[ this.i ][ this.j ].where, this.firstTermAfterOr, this.i, queries[ this.i ].length);
          this.firstTermAfterOr = false;
        }
      }
    }
  }

  getQueries(queries: Array<any>) {
    //console.log(queries);
    this.queries = queries;
    if (this.startSearchImmediately) {
      this.executeFinalQueries();
    }
  }

  performQuery(searchTerm: string, location: string, firstTermAfterOr: boolean, searchGroup: number, numberOfTermsInSearchGroup: number) {
    if (location === 'anywhere') {
      for (this.m = 0; this.m < this.poemResTypes.length; this.m++) {
        this.performSearchInTitle(
          searchTerm,
          firstTermAfterOr,
          searchGroup,
          numberOfTermsInSearchGroup,
          this.poemResTypes[ this.m ]);
        this.performSearchInText(
          searchTerm,
          firstTermAfterOr,
          searchGroup,
          numberOfTermsInSearchGroup,
          this.poemResTypes[ this.m ]);
      }
    } else if (location === 'title') {
      for (this.m = 0; this.m < this.poemResTypes.length; this.m++) {
        this.performSearchInTitle(
          searchTerm,
          firstTermAfterOr,
          searchGroup,
          numberOfTermsInSearchGroup,
          this.poemResTypes[ this.m ]);
      }
    } else if (location === 'text') {
      for (this.m = 0; this.m < this.poemResTypes.length; this.m++) {
        this.performSearchInText(
          searchTerm,
          firstTermAfterOr,
          searchGroup,
          numberOfTermsInSearchGroup,
          this.poemResTypes[ this.m ]);
      }
    }
  }

  performSearchInTitle(searchTerm: string,
                       firstTermAfterOr: boolean,
                       searchGroup: number,
                       numberOfTermsInSearchGroup: number,
                       poemResType: string) {
      return this.http.get(
        globalSearchVariableService.API_URL +
        globalSearchVariableService.extendedSearch +
        'http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23Poem' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasConvoluteIRI' +
        '&compop=!EQ' +
        '&searchval=123455666' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemTitle' +
        '&compop=LIKE' +
        '&searchval=' + encodeURIComponent(searchTerm) +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemCreationDate' +
        '&compop=!EQ' +
        '&searchval=GREGORIAN:2217-01-27' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemText' +
        '&compop=!EQ' +
        '&searchval=123455666'+
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemIRI' +
        '&compop=!EQ' +
        '&searchval=123455666' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasConvoluteIRI' +
        '&compop=!EQ' +
        '&searchval=123455666'+
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasConvoluteTitle' +
        '&compop=!EQ' +
        '&searchval=123455666' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasDateIndex' +
        '&compop=!EQ' +
        '&searchval=123455666' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasAlphabeticIndex' +
        '&compop=!EQ' +
        '&searchval=123455666' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasSynopsisTitle' +
        '&compop=!EQ' +
        '&searchval=123455666' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasSynopsisIRI' +
        '&compop=!EQ' +
        '&searchval=123455666' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23isFinalVersion' +
        '&compop=!EQ' +
        '&searchval=123455666' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23isInDialect' +
        '&compop=!EQ' +
        '&searchval=123455666' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasStructure' +
        '&compop=!EQ' +
        '&searchval=123455666' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23isPartOfCycle' +
        '&compop=!EQ' +
        '&searchval=123455666' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasStrophe' +
        '&compop=!EQ' +
        '&searchval=123455666' +
        '&show_nrows=2000')
        .map(
          (lambda: Response) => {
            const data = lambda.json();
            //console.log('Data from Titel');
            //console.log(data.subjects[0]);
            if (data.subjects[0] !== undefined) {
              //console.log('add to temporary results');
              this.addToTemporarySearchResultArray(data.subjects,
                firstTermAfterOr,
                searchGroup,
                numberOfTermsInSearchGroup,
                searchTerm,
                undefined);
          } else {
            //console.log('Keine Treffer fuer diese Suche');
          }
          return null;
        }
      )
      .subscribe(response => response = response);

  }
  performSearchInText(searchTerm: string,
                      firstTermAfterOr: boolean,
                      searchGroup: number,
                      numberOfTermsInSearchGroup: number,
                      poemResType: string) {
    //console.log('Search in Text');
    return this.http.get(
      globalSearchVariableService.API_URL +
      globalSearchVariableService.extendedSearch +
      'http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23Poem' +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasConvoluteIRI' +
      '&compop=!EQ' +
      '&searchval=123455666' +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemTitle' +
      '&compop=!EQ' +
      '&searchval=123455666' +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemCreationDate' +
      '&compop=!EQ' +
      '&searchval=GREGORIAN:2217-01-27' +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemText' +
      '&compop=LIKE' +
      '&searchval=' + encodeURIComponent(searchTerm) +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemIRI' +
      '&compop=!EQ' +
      '&searchval=123455666' +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasConvoluteIRI' +
      '&compop=!EQ' +
      '&searchval=123455666'+
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasConvoluteTitle' +
      '&compop=!EQ' +
      '&searchval=123455666' +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasDateIndex' +
      '&compop=!EQ' +
      '&searchval=123455666' +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasAlphabeticIndex' +
      '&compop=!EQ' +
      '&searchval=123455666' +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasSynopsisTitle' +
      '&compop=!EQ' +
      '&searchval=123455666' +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasSynopsisIRI' +
      '&compop=!EQ' +
      '&searchval=123455666' +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23isFinalVersion' +
      '&compop=!EQ' +
      '&searchval=123455666' +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23isInDialect' +
      '&compop=!EQ' +
      '&searchval=123455666' +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasStructure' +
      '&compop=!EQ' +
      '&searchval=123455666' +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23isPartOfCycle' +
      '&compop=!EQ' +
      '&searchval=123455666' +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasStrophe' +
      '&compop=!EQ' +
      '&searchval=123455666' +
      '&show_nrows=2000')
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          //console.log('Data From Text');
          //console.log(data);
          if (data.subjects[ 0 ] !== undefined) {
            //console.log('add to temporary search array');
            this.addToTemporarySearchResultArray(data.subjects,
              firstTermAfterOr,
              searchGroup,
              numberOfTermsInSearchGroup,
              searchTerm,
              undefined);
          } else {
            //console.log('Keine Treffer fuer diese Suche');
          }
          return null;
        }
      )
      .subscribe(response => response = response);

  }

  addToTemporarySearchResultArray(searchResults: Array<any>,
                                  firstTermAfterOr: boolean,
                                  searchGroup: number,
                                  numberOfTermsInSearchGroup: number,
                                  searchTerm: string,
                                  poemIRI: string) {
    //console.log('add to temporary result');
    this.checkProgress();
    if (this.partOfAllSearchResults === undefined) {
      this.partOfAllSearchResults = [];
    }
    if (this.partOfAllSearchResults[searchGroup] === undefined) {
      this.partOfAllSearchResults[searchGroup] = [];
      this.partOfAllSearchResults[searchGroup] = new Set();
    }
    if (numberOfTermsInSearchGroup > 1) {
      if (searchResults !== undefined) {
        for (let poem of searchResults) {
          if (this.partOfAllSearchResults[searchGroup].has(poem.value[7]) &&
            !this.partOfAllSearchResults[searchGroup].has(poem.value[7] + searchTerm)) {
            //console.log('Found Duplicate, so add to results');
            this.partOfAllSearchResults[searchGroup].add(poem.value[7] + searchTerm);
            this.addToFinalSearchResultArray(undefined, poem);
          } else {
            this.partOfAllSearchResults[searchGroup].add(poem.value[7] + searchTerm);
            this.partOfAllSearchResults[searchGroup].add(poem.value[7]);
            //console.log('No duplicate found');
          }
        }
      }
    } else {
      if (searchResults !== undefined) {
        this.addToFinalSearchResultArray(searchResults, undefined);
      }
    }
  }

  addToFinalSearchResultArray(searchResults: Array<any>, singlePoem: any) {
    this.checkProgress();
    if (this.allSearchResults === undefined) {
      this.allSearchResults = [];
    }
    if(searchResults) {
      //console.log('add every poem to final search results');
      for (let poem of searchResults) {
        //console.log(poem.value['7']);
        this.onlyChoosePoemsThatAreInChosenConvolutes(
          poem);
      }
    }
    if(singlePoem) {
      //console.log('add poem to final search results');
      this.onlyChoosePoemsThatAreInChosenConvolutes(
        singlePoem);
    }
  }

  updateSuchmaskeKonvolutIRIMapping(arg: AbstractControl) {
    if (
      arg.get('notizbuchForm').pristine
      && arg.get('druckForm').pristine
      && arg.get('materialienForm').pristine
      && arg.get('typoskriptForm').pristine
      && arg.get('manuskriptForm').pristine
      && arg.get('zeitschriftForm').pristine
    ) {
      //console.log('Perform Search in all convolutes');
      //console.log(this.suchmaskeKonvolutIRIMapping);
    } else {
      for ( let konvolut of this.suchmaskeKonvolutIRIMapping ) {
        //console.log(konvolut.suchmaskeFormName + '.' + konvolut.suchmaskeKonvolutName);
        konvolut.enabled = arg.get( konvolut.suchmaskeFormName + '.' + konvolut.suchmaskeKonvolutName ).value;
      }
    }
  }
  updateQueryParamsInURL() {
    for ( let konvolut of this.suchmaskeKonvolutIRIMapping ) {
      this.currentPath += '&' + konvolut.suchmaskeKonvolutName + '=' + konvolut.enabled;
    }
    this.currentPath = this.currentPath +
      '&textartFreieVerse=' + this.arg.get('textartForm.textartFreieVerse').value +
      '&textartProsanotat=' + this.arg.get('textartForm.textartProsanotat').value +
      '&textartProsa=' + this.arg.get('textartForm.textartProsa').value +
      '&textartBriefentwurf=' + this.arg.get('textartForm.textartBriefentwurf').value +
      '&textartGereimteVerse=' + this.arg.get('textartForm.textartGereimteVerse').value +
      '&zeitBeginn=' + this.arg.get('zeitraumForm.zeitraumVon').value +
      '&zeitEnde=' + this.arg.get('zeitraumForm.zeitraumBis').value +
      '&nurEndfassungen=' + this.arg.get('endfassung').value +
      '&nurMitStrophen=' + this.arg.get('strophen').value +
      '&nurMundart=' + this.arg.get('mundart').value +
      '&keineMundart=' + this.arg.get('keineMundart').value +
      '&keinZyklus=' + this.arg.get('keinZyklus').value +
      '&nurZyklus=' + this.arg.get('zyklus').value;
    this.location.replaceState(this.currentPath);
  }


  getKonvolutIRI(konvolut_id: string, i: number) {
    //console.log('Get IRI Component for Konvolut - ID: ' + konvolut_id);
    if (konvolut_id === 'notizbuch-1979') {
      this.performQueryToGetIRI(
        '%23PoemNotebook' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=EQ' +
        '&searchval=Notizbuch%201979', i, undefined);
    } else if (konvolut_id === 'notizbuch-1979-1982') {
      this.performQueryToGetIRI(
        '%23PoemNotebook' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Notizbuch%201979-82', i, undefined);
    } else if (konvolut_id === 'notizbuch-1980-1988') {
      this.performQueryToGetIRI(
        '%23PoemNotebook' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Notizbuch%201980-88', i, undefined);
    } else if (konvolut_id === 'notizbuch-1965-80') {
      this.performQueryToGetIRI(
        '%23PoemNotebook' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Notizbuch%201965-80', i, undefined);
    } else if (konvolut_id === 'manuskripte-1979') {
      this.performQueryToGetIRI(
        '%23PoemManuscriptConvolute' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Manuskripte%201979', i, undefined);
    } else if (konvolut_id === 'manuskripte-1979-1983') {
      this.performQueryToGetIRI(
        '%23PoemManuscriptConvolute' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Manuskripte%201979-83', i, undefined);
    } else if (konvolut_id === 'karten-1984') {
      this.performQueryToGetIRI(
        '%23PoemPostcardConvolute' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Karten%201984', i, undefined);
    } else if (konvolut_id === 'karten-1984') {
      this.performQueryToGetIRI(
        '%23PoemManuscriptConvolute' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Karten%201984', i, undefined);
    } else if (konvolut_id === 'typoskripte-1979') {
      this.performQueryToGetIRI(
        '%23PoemTypescriptConvolute' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=EQ' +
        '&searchval=Typoskripte%201979', i, undefined);
    }
    if (konvolut_id === 'typoskripte-1979-spez') {
      this.performQueryToGetIRI(
        '%23PoemTypescriptConvolute' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=EQ' +
        '&searchval=Typoskripte%201979-spez', i, undefined);
    } else if (konvolut_id === 'typoskripte-1983') {
      this.performQueryToGetIRI(
        '%23PoemTypescriptConvolute' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=EQ' +
        '&searchval=Typoskripte%201983', i, undefined);
    } else if (konvolut_id === 'gesicht-im-mittag') {
      this.performQueryToGetIRI(
        '%23PrintedPoemBookPublication' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=gesicht', i, undefined);
    } else if (konvolut_id === 'die-verwandelten-schiffe') {
      this.performQueryToGetIRI(
        '%23PrintedPoemBookPublication' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Schiffe', i, undefined);
    } else if (konvolut_id === 'gedichte') {
      this.performQueryToGetIRI(
        '%23PrintedPoemBookPublication' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=GEDICHTE%201960', i, undefined);
    } else if (konvolut_id === 'flussufer') {
      this.performQueryToGetIRI(
        '%23PrintedPoemBookPublication' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Flussufer', i, undefined);
    } else if (konvolut_id === 'reduktionen') {
      this.performQueryToGetIRI(
        '%23PrintedPoemBookPublication' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Reduktionen', i, undefined);
    } else if (konvolut_id === 'abgewandt-zugewandt-hochdeutsche-gedichte') {
      this.performQueryToGetIRI(
        '%23PrintedPoemBookPublication' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Hochdeutsche', i, undefined);
    } else if (konvolut_id === 'abgewandt-zugewandt-alemannische-gedichte') {
      this.performQueryToGetIRI(
        '%23PrintedPoemBookPublication' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Alemannische', i, undefined);
    } else if (konvolut_id === 'verstreutes') {
      this.performQueryToGetIRI(
        '%23PolyAuthorPublicationConvolute' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Verstreutes', i, undefined);
    } else if (konvolut_id === 'materialienTagebuch') {
      this.performQueryToGetIRI(
        '%23DiaryConvolute' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Tagebuch', i, undefined);
    } else if (konvolut_id === 'tagebuecher-2') {
      this.performQueryToGetIRI(
        '%23DiaryConvolute' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Tagebuch', i, undefined);
    } else if (konvolut_id === 'akzente') {
      this.performQueryToGetIRI(
        undefined, i,
        globalSearchVariableService.API_URL
        + '/search/?searchtype=extended' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fwork%23hasPublicationTitle' +
        '&compop=EQ' +
        '&searchval=Akzente');
    } else if (konvolut_id === 'blaetter+bilder') {
      this.performQueryToGetIRI(
        undefined, i,
        globalSearchVariableService.API_URL
        + '/search/?searchtype=extended' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fwork%23hasPublicationTitle' +
        '&compop=EQ' +
        '&searchval=bl%C3%A4tter%20%2B%20bilder');
    } else if (konvolut_id === 'zeitschriftSchoenste') {
      this.performQueryToGetIRI(
        undefined, i,
        globalSearchVariableService.API_URL
        + '/search/?searchtype=extended' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fwork%23hasPublicationTitle' +
        '&compop=EQ' +
        '&searchval=Das%20Sch%C3%B6nste');
    } else if (konvolut_id === 'zeitschriftTag') {
      this.performQueryToGetIRI(
        undefined, i,
        globalSearchVariableService.API_URL
        + '/search/?searchtype=extended' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fwork%23hasPublicationTitle' +
        '&compop=EQ' +
        '&searchval=Tages-Anzeiger');
    } else if (konvolut_id === 'zeitschriftTat') {
      this.performQueryToGetIRI(
        undefined, i,
        globalSearchVariableService.API_URL
        + '/search/?searchtype=extended' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fwork%23hasPublicationTitle' +
        '&compop=EQ' +
        '&searchval=Die%20Tat');
    } else if (konvolut_id === 'zeitschriftZeit') {
      this.performQueryToGetIRI(
        undefined, i,
        globalSearchVariableService.API_URL
        + '/search/?searchtype=extended' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fwork%23hasPublicationTitle' +
        '&compop=EQ' +
        '&searchval=Die%20Zeit');
    } else if (konvolut_id === 'zeitschriftEnsemble') {
      this.performQueryToGetIRI(
        undefined, i,
        globalSearchVariableService.API_URL
        + '/search/?searchtype=extended' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fwork%23hasPublicationTitle' +
        '&compop=EQ' +
        '&searchval=ensemble');
    } else if (konvolut_id === 'zeitschriftHortulus') {
      this.performQueryToGetIRI(
        undefined, i,
        globalSearchVariableService.API_URL
        + '/search/?searchtype=extended' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fwork%23hasPublicationTitle' +
        '&compop=EQ' +
        '&searchval=Hortulus');
    } else if (konvolut_id === 'zeitschriftJahresring') {
      this.performQueryToGetIRI(
        undefined, i,
        globalSearchVariableService.API_URL
        + '/search/?searchtype=extended' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fwork%23hasPublicationTitle' +
        '&compop=EQ' +
        '&searchval=Jahresring');
    } else if (konvolut_id === 'zeitschriftKonturen') {
      this.performQueryToGetIRI(
        undefined, i,
        globalSearchVariableService.API_URL
        + '/search/?searchtype=extended' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fwork%23hasPublicationTitle' +
        '&compop=EQ' +
        '&searchval=Konturen');
    } else if (konvolut_id === 'zeitschriftLNN') {
      this.performQueryToGetIRI(
        undefined, i,
        globalSearchVariableService.API_URL
        + '/search/?searchtype=extended' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fwork%23hasPublicationTitle' +
        '&compop=EQ' +
        '&searchval=Luzerner%20Neueste%20Nachrichten');
    } else if (konvolut_id === 'zeitschriftLadZ') {
      this.performQueryToGetIRI(
        undefined, i,
        globalSearchVariableService.API_URL
        + '/search/?searchtype=extended' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fwork%23hasPublicationTitle' +
        '&compop=EQ' +
        '&searchval=Lyrik%20aus%20dieser%20Zeit');
    } else if (konvolut_id === 'zeitschriftLuZ') {
      this.performQueryToGetIRI(
        undefined, i,
        globalSearchVariableService.API_URL
        + '/search/?searchtype=extended' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fwork%23hasPublicationTitle' +
        '&compop=EQ' +
        '&searchval=Lyrik%20unserer%20Zeit');
    } else if (konvolut_id === 'zeitschriftMerkur') {
      this.performQueryToGetIRI(
        undefined, i,
        globalSearchVariableService.API_URL
        + '/search/?searchtype=extended' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fwork%23hasPublicationTitle' +
        '&compop=EQ' +
        '&searchval=Merkur');
    } else if (konvolut_id === 'zeitschriftDeutscheHefte') {
      this.performQueryToGetIRI(
        undefined, i,
        globalSearchVariableService.API_URL
        + '/search/?searchtype=extended' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fwork%23hasPublicationTitle' +
        '&compop=EQ' +
        '&searchval=Neue%20Deutsche%20Hefte');
    } else if (konvolut_id === 'zeitschriftNZN') {
      this.performQueryToGetIRI(
        undefined, i,
        globalSearchVariableService.API_URL
        + '/search/?searchtype=extended' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fwork%23hasPublicationTitle' +
        '&compop=EQ' +
        '&searchval=Neue%20Z%C3%BCrcher%20Nachrichten');
    } else if (konvolut_id === 'zeitschriftNZZ') {
      this.performQueryToGetIRI(
        undefined, i,
        globalSearchVariableService.API_URL
        + '/search/?searchtype=extended' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fwork%23hasPublicationTitle' +
        '&compop=EQ' +
        '&searchval=Neue%20Z%C3%BCrcher%20Zeitung');
    } else if (konvolut_id === 'zeitschriftRenaissance') {
      this.performQueryToGetIRI(
        undefined, i,
        globalSearchVariableService.API_URL
        + '/search/?searchtype=extended' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fwork%23hasPublicationTitle' +
        '&compop=EQ' +
        '&searchval=Renaissance');
    } else if (konvolut_id === 'zeitschriftRundschau') {
      this.performQueryToGetIRI(
        undefined, i,
        globalSearchVariableService.API_URL
        + '/search/?searchtype=extended' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fwork%23hasPublicationTitle' +
        '&compop=EQ' +
        '&searchval=Schweizer%20Rundschau');
    } else if (konvolut_id === 'zeitschriftSueddeutsche') {
      this.performQueryToGetIRI(
        undefined, i,
        globalSearchVariableService.API_URL
        + '/search/?searchtype=extended' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fwork%23hasPublicationTitle' +
        '&compop=EQ' +
        '&searchval=S%C3%BCddeutsche%20Zeitung');
    } else if (konvolut_id === 'zeitschriftWortTat') {
      this.performQueryToGetIRI(
        undefined, i,
        globalSearchVariableService.API_URL
        + '/search/?searchtype=extended' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fwork%23hasPublicationTitle' +
        '&compop=EQ' +
        '&searchval=Wort%20und%20Tat');
    }
  }
  performQueryToGetIRI(queryPart: string, i: number, individualQueryPart: string) {
    if (queryPart === undefined) {
      queryPart = individualQueryPart;
    } else {
      queryPart = globalSearchVariableService.API_URL +
        globalSearchVariableService.extendedSearch +
        encodeURIComponent(globalSearchVariableService.initialVocabulary) +
        queryPart;
    }
    //console.log(queryPart);
    return this.http.get
    (
      queryPart
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          //console.log(data);
          this.setOfPerformedQueries.add(globalSearchVariableService.API_URL +
            globalSearchVariableService.extendedSearch +
            globalSearchVariableService.initialVocabulary +
            queryPart);
          if (data.subjects[ 0 ] !== undefined) {
            this.setOfKonvolutIRIs.add(data.subjects[ 0 ].obj_id);
            this.suchmaskeKonvolutIRIMapping[ i ].IRI = data.subjects[ 0 ].obj_id;
            //console.log(this.suchmaskeKonvolutIRIMapping);
            this.rightProperty = '';
            this.performQueryToGetAllowedPoems(data.subjects[ 0 ].obj_id, data.subjects[ 0 ].iconlabel, this.rightProperty, i);
          }
          //console.log('alle Konvolutinformationen');
          //console.log(this.setOfKonvolutIRIs);
          return null;
        }
      )
      .subscribe(response => this.responseArray = response);
  }


    performQueryToGetAllowedPoems(queryPart: string, konvolutType: string, rightProperty: string, i: number) {
      //console.log(konvolutType);
      return this.http.get
      (
        globalSearchVariableService.API_URL +
        '/graphdata/' +
        encodeURIComponent(queryPart) +
        '?depth=2'
      )
        .map(
          (lambda: Response) => {
            const data = lambda.json();
            //console.log(data);
            for (this.l = 0; this.l < data.nodes.length; this.l++) {
              if (konvolutType === 'poem notebook') {
                rightProperty = 'http://www.knora.org/ontology/kuno-raeber#PoemNote';
                //console.log('Right Property: ' + rightProperty);
              } else if (konvolutType === 'poem manuscript convolute') {
                rightProperty = 'http://www.knora.org/ontology/kuno-raeber#HandwrittenPoem';
                //console.log('Right Property: ' + rightProperty);
              } else if (konvolutType === 'poem typescript convolute') {
                rightProperty = 'http://www.knora.org/ontology/kuno-raeber#TypewrittenPoem';
                //console.log('Right Property: ' + rightProperty);
              } else if (konvolutType === 'poem typescript convolute with image') {
                rightProperty = 'http://www.knora.org/ontology/kuno-raeber#TypewrittenPoem';
                //console.log('Right Property: ' + rightProperty);
              } else if (konvolutType === 'printed poem book publication') {
                rightProperty = 'http://www.knora.org/ontology/kuno-raeber#PublicationPoem';
                //console.log('Right Property: ' + rightProperty);
              } else if (konvolutType === 'poly-author publication') {
                rightProperty = 'http://www.knora.org/ontology/kuno-raeber#PublicationPoem';
                //console.log('Right Property: ' + rightProperty);
              } else if (konvolutType === 'diary convolute') {
                rightProperty = 'http://www.knora.org/ontology/kuno-raeber#DiaryEntry';
                //console.log('Right Property: ' + rightProperty);
              }
              if (
                data.nodes[ this.l ].resourceClassIri === rightProperty
              ) {
                //this.setOfAlowedPoemIRIs.add(data.nodes[this.l].resourceIri);
                this.suchmaskeKonvolutIRIMapping[ i ].memberPoems.add(data.nodes[ this.l ].resourceIri);
                }
              }
            //console.log(this.setOfAlowedPoemIRIs);
            return null;
          }
        ).subscribe(response => this.responseArray = response);
    }
    onlyChoosePoemsThatAreInChosenConvolutes(poem: any) {
    //console.log(this.suchmaskeKonvolutIRIMapping);
      for (let k = 0; k < this.suchmaskeKonvolutIRIMapping.length; k++) {
        this.checkProgress();
        if (this.suchmaskeKonvolutIRIMapping[ k ].enabled &&
          this.suchmaskeKonvolutIRIMapping[ k ].enabled.toString() !== 'false') {
          //console.log(this.suchmaskeKonvolutIRIMapping[ k ].enabled + " " + this.suchmaskeKonvolutIRIMapping[ k ].konvolut);
          if(this.suchmaskeKonvolutIRIMapping[ k ].memberPoems.has(poem.value['6'])) {
            //console.log(this.suchmaskeKonvolutIRIMapping[ k ].enabled + " " + this.suchmaskeKonvolutIRIMapping[ k ].konvolut);
            this.checkIfDone(this.allSearchResults.length);
            if(!this.setOfPoemsInResult.has(poem.value['6'])) {
              this.setOfPoemsInResult.add(poem.value['6']);
              //console.log('checktextart');
              if(this.checkTextart(poem.value['10'])) {
                //console.log('checkdate');
                if(this.checkTimeInterval(poem.value['5'])) {
                  //console.log('checkFinalVersion');
                  if(this.checkIfFinalVersion(poem.value['13'])) {
                    if(this.checkIfHasStrophe(poem.value['9'])) {
                      if(this.checkIfIsInDialect(poem.value['14'])) {
                        if(this.checkIfPartOfCycle(poem.value['15'])) {
                              //console.log('Date: ' + poem.value['5'] + ' Titel: ' + poem.value['8']);
                              //console.log(this.allSearchResults);
                              poem.reservedPointer = this.allSearchResults.length;
                              //console.log(poem.reservedPointer);
                              //console.log(poem.value['5']);

                              this.allSearchResults[ poem.reservedPointer ] = new CachePoem();
                              this.allSearchResults[ poem.reservedPointer ].poemTitle = poem.value['8'];
                              this.allSearchResults[ poem.reservedPointer ].poemCreationDate = poem.value['5'];
                              this.allSearchResults[ poem.reservedPointer ].poemText = poem.value['7'];
                              this.allSearchResults[ poem.reservedPointer ].poemIRI = poem.value['6'];
                              this.allSearchResults[ poem.reservedPointer ].synopsisIRI = poem.value['11'];
                              this.allSearchResults[ poem.reservedPointer ].synopsisTitle = poem.value['12'];
                              this.allSearchResults[ poem.reservedPointer ].isFinalVersion = poem.value['13'];
                              this.allSearchResults[ poem.reservedPointer ].searchConvolute
                                = this.suchmaskeKonvolutIRIMapping[ k ].konvolut;
                              this.allSearchResults[ poem.reservedPointer ].searchOfficialName
                                = this.suchmaskeKonvolutIRIMapping[ k ].officialName;

                              /*
                              TODO: Old indexes (for missed indexes - delete after 2017-11-30):
                              0: poemTitle
                              1: poemCreationDate
                              2: poemText
                              3: poemIRI
                              4: ?
                              5: ?
                              6: searchConvolute - what is this?
                              7: searchOfficialName - what is this?
                              8: seqnum - not used here
                              9: synopsisIRI
                              10: dateIndex - not used here
                              11: alphaIndex - not used here
                              12: synopsisTitle
                              13: onPage
                              14: isFinal - not used here
                              15: convoluteTitle - not used here
                               */
                              this.numberOfSearchResults += 1;
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

  checkIfDone(currentLength: number) {
    this.sortResultArray();
  }

  sortResultArray() {
    for(let i = 0; i < this.allSearchResults.length - 1; i++ ) {
      if(this.allSearchResults[i].poemCreationDate < this.allSearchResults[i + 1].poemCreationDate) {
        //console.log(this.allSearchResults[i][1] + ' ist kleiner als ' + this.allSearchResults[i + 1][1]);
      } else {
        this.helpArray = this.allSearchResults[i + 1];
        this.allSearchResults[i + 1] = this.allSearchResults[i];
        this.allSearchResults[i] = this.helpArray;
      }
    }
  }

    checkIfPartOfCycle(isPartOfCycle: string): boolean {
    if(this.arg) {
      if(this.arg.get('zyklus').value || this.route.snapshot.queryParams[ 'nurZyklus' ] === 'true') {
        return this.checkIfTrue('nurZyklus','zyklus', isPartOfCycle);
      }
      if(this.arg.get('keinZyklus').value || this.route.snapshot.queryParams[ 'keinZyklus' ] === 'true') {
        if(isPartOfCycle === '1') isPartOfCycle = '0';
        else isPartOfCycle = '1';
        return this.checkIfTrue('keinZyklus','keinZyklus', isPartOfCycle);
      } else return true;
    } else {
      if(this.route.snapshot.queryParams[ 'nurZyklus' ] === 'true') {
        return this.checkIfTrue('nurZyklus','zyklus', isPartOfCycle);
      }
      if(this.route.snapshot.queryParams[ 'keinZyklus' ] === 'true') {
        if(isPartOfCycle === '1') isPartOfCycle = '0';
        else isPartOfCycle = '1';
        return this.checkIfTrue('keinZyklus','keinZyklus', isPartOfCycle);
      } else return true;
    }

  }
    checkIfIsInDialect(isInDialiect: string): boolean {
    if(this.arg) {
      if(this.arg.get('mundart').value || this.route.snapshot.queryParams[ 'nurMundart' ] === 'true') {
        return this.checkIfTrue('nurMundart','mundart', isInDialiect);
      }
      if(this.arg.get('keineMundart').value || this.route.snapshot.queryParams[ 'keineMundart' ] === 'true') {
        if(isInDialiect === '1') isInDialiect = '0';
        else isInDialiect = '1';
        return this.checkIfTrue('keineMundart','keineMundart', isInDialiect);
      } else return true;
    } else {
      if(this.route.snapshot.queryParams[ 'nurMundart' ] === 'true') {
        return this.checkIfTrue('nurMundart','mundart', isInDialiect);
      }
      if(this.route.snapshot.queryParams[ 'keineMundart' ] === 'true') {
        if(isInDialiect === '1') isInDialiect = '0';
        else isInDialiect = '1';
        return this.checkIfTrue('keineMundart','keineMundart', isInDialiect);
      } else return true;
    }

    }
    checkIfHasStrophe(hatStrophenunterteilung: string): boolean {
      if(this.arg) {
        if(this.arg.get('strophen').value || this.route.snapshot.queryParams[ 'nurMitStrophen' ] === 'true') {
          return this.checkIfTrue('nurMitStrophen','strophen', hatStrophenunterteilung);
        }
        if(this.arg.get('keineStrophen').value || this.route.snapshot.queryParams[ 'keineStrophen' ] === 'true') {
          if(hatStrophenunterteilung === '1') hatStrophenunterteilung = '0';
          else hatStrophenunterteilung = '1';
          return this.checkIfTrue('keineStrophen','keineStrophen', hatStrophenunterteilung);
        } else return true;
      } else {
        if(this.route.snapshot.queryParams[ 'nurMitStrophen' ] === 'true') {
          return this.checkIfTrue('nurMitStrophen','strophen', hatStrophenunterteilung);
        }
        if(this.route.snapshot.queryParams[ 'keineStrophen' ] === 'true') {
          if(hatStrophenunterteilung === '1') hatStrophenunterteilung = '0';
          else hatStrophenunterteilung = '1';
          return this.checkIfTrue('keineStrophen','keineStrophen', hatStrophenunterteilung);
        } else return true;
      }
    }
    checkIfTrue(inputFromRoute: string, controlFromFormName: string, parameterToCheck: string) {
      if(!this.arg) {
        if(this.route.snapshot.queryParams[ inputFromRoute ] === 'false') return true;
        if(this.route.snapshot.queryParams[ inputFromRoute ] === 'true' && parameterToCheck === '1') return true;
        if(this.route.snapshot.queryParams[ inputFromRoute ] === 'true' && parameterToCheck === '0') return false;
      }
      if(!this.arg) return true;
      if(!this.arg.get(controlFromFormName).value) {
        return true;
      } else if ((this.arg.get(controlFromFormName).value)
        && parameterToCheck === '1') {
        return true;
      } else return false;
    }
    checkIfFinalVersion(isFinalVersion: string): boolean {
    if(this.arg) {
      if(this.arg.get('endfassung').value || this.route.snapshot.queryParams[ 'nurEndfassungen' ] === 'true') {
        return this.checkIfTrue('nurEndfassungen','endfassung', isFinalVersion);
      }
      if(this.arg.get('keineEndfassung').value || this.route.snapshot.queryParams[ 'keineEndfassung' ] === 'true') {
        if(isFinalVersion === '1') isFinalVersion = '0';
        else isFinalVersion = '1';
        return this.checkIfTrue('keineEndfassung','keineEndfassung', isFinalVersion);
      } else return true;
    } else {
      if(this.route.snapshot.queryParams[ 'nurEndfassungen' ] === 'true') {
        return this.checkIfTrue('nurEndfassungen','endfassung', isFinalVersion);
      }
      if(this.route.snapshot.queryParams[ 'keineEndfassung' ] === 'true') {
        if(isFinalVersion === '1') isFinalVersion = '0';
        else isFinalVersion = '1';
        return this.checkIfTrue('keineEndfassung','keineEndfassung', isFinalVersion);
      } else return true;
    }

    }
    checkTextart(textart: string): boolean {
      if (this.route.snapshot.queryParams[ 'textartFreieVerse' ] === 'true' && textart === 'FreeVerse') {
        return true;
      } else if (this.route.snapshot.queryParams[ 'textartProsanotat' ] === 'true' && textart === 'NoteProse') {
        return true;
      } else if (this.route.snapshot.queryParams[ 'textartProsa' ] === 'true' && textart === 'RythmicProse') {
        return true;
      } else if (this.route.snapshot.queryParams[ 'textartBriefentwurf' ] === 'true' && textart === 'LetterStructure') {
        return true;
      } else if (this.route.snapshot.queryParams[ 'textartGereimteVerse' ] === 'true' && textart === 'RythmicVerse') {
        return true; } else if (
          this.route.snapshot.queryParams[ 'textartFreieVerse' ] === 'true' ||
          this.route.snapshot.queryParams[ 'textartProsanotat' ] === 'true' ||
          this.route.snapshot.queryParams[ 'textartProsa' ] === 'true' ||
          this.route.snapshot.queryParams[ 'textartBriefentwurf' ] === 'true' ||
          this.route.snapshot.queryParams[ 'textartGereimteVerse' ] === 'true'
      ) {
        return false;
      }
      if(!this.arg ) return true;
      if (this.arg.get('textartForm').pristine) {
        //console.log(textart);
        return true;
      } else if(this.arg.get('textartForm.textartFreieVerse').value && textart === 'FreeVerse') {
          return true;
      } else if(this.arg.get('textartForm.textartProsanotat').value && textart === 'NoteProse') {
        return true;
      } else if(this.arg.get('textartForm.textartProsa').value && textart === 'RythmicProse') {
        return true;
      } else if(this.arg.get('textartForm.textartBriefentwurf').value && textart === 'LetterStructure') {
        return true;
      } else if(this.arg.get('textartForm.textartGereimteVerse').value && textart === 'RythmicVerse') {
        return true;
      } else {
        return false;
      }
      }
    checkTimeInterval(date: string): boolean {
      //console.log('Check time interval');
      //console.log(this.route.snapshot.queryParams[ 'zeitBeginn' ]);
      //console.log(this.route.snapshot.queryParams[ 'zeitEnde' ]);
      //console.log(date);
      if(!this.arg) {
        if(this.route.snapshot.queryParams[ 'zeitBeginn' ] === undefined
          && this.route.snapshot.queryParams[ 'zeitEnde' ] === undefined) return true;
        if(this.route.snapshot.queryParams[ 'zeitBeginn' ] === ''
          && this.route.snapshot.queryParams[ 'zeitEnde' ] === '') return true;
      }
      if(this.arg) {
        //console.log(this.arg.get('zeitraumForm.zeitraumVon').value);
        //console.log(this.arg.get('zeitraumForm.zeitraumBis').value);
        if (
          this.arg.get('zeitraumForm.zeitraumVon').value === ''
          && this.arg.get('zeitraumForm.zeitraumBis').value === '') {
          //console.log('case 1');
          return true;
        } else if (
          this.arg.get('zeitraumForm.zeitraumVon').value !== ''
            && this.arg.get('zeitraumForm.zeitraumBis').value !== '') {
          if(
            (date.split('-')[0]  >= this.arg.get('zeitraumForm.zeitraumVon').value
              && date.split('-')[0] <= this.arg.get('zeitraumForm.zeitraumBis').value )
          ) {
            //console.log('Poem liegt im beidseitig geschlossenen Intervall');
            return true;
          } else {
            return false;
          }
        } else if(
          (this.arg.get('zeitraumForm.zeitraumVon').value !== ''
            && date.split('-')[0] >= this.arg.get('zeitraumForm.zeitraumVon').value)
        ) {
          //console.log('Groesser als Linker Intervall');
          return true;
        } else if(
          (this.arg.get('zeitraumForm.zeitraumBis').value !== ''
            && date.split('-')[0] <= this.arg.get('zeitraumForm.zeitraumBis').value )
        ) {
          //console.log('Kleiner als Linker Intervall');
          return true;
        } else return false;
      } else {
        if (
          this.route.snapshot.queryParams[ 'zeitBeginn' ] === undefined
          && this.route.snapshot.queryParams[ 'zeitEnde' ] === undefined) {
          return true;
        } else if (
          this.route.snapshot.queryParams[ 'zeitBeginn' ] !== undefined
            && this.route.snapshot.queryParams[ 'zeitEnde' ] !== undefined
        ) {
          if(
            date.split('-')[0] >= this.route.snapshot.queryParams[ 'zeitBeginn' ]
              && date.split('-')[0] <= this.route.snapshot.queryParams[ 'zeitEnde' ]
          ) {
            //console.log('Poem liegt im beidseitig geschlossenen Intervall');
            return true;
          } else {
            return false;
          }
        } else if(
          this.route.snapshot.queryParams[ 'zeitBeginn' ] !== undefined
            && date.split('-')[0] >= this.route.snapshot.queryParams[ 'zeitBeginn' ]
        ) {
          //console.log('Groesser als Linker Intervall');
          return true;
        } else if(
          this.route.snapshot.queryParams[ 'zeitEnde' ] !== undefined
            && date.split('-')[0] <= this.route.snapshot.queryParams[ 'zeitEnde' ]
        ) {
          //console.log('Kleiner als Linker Intervall');
          return true;
        } else return false;
      }
    }

  showHelp(): void {
    let dialogRef =
      this.dialog.open(SuchmaskeHilfeComponent, {
        width: '500px'
      });
  }

}
