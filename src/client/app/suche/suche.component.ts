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
import { createKnoraV1APICall } from './suchServices/createKnoraV1APICall';

@Component({
  moduleId: module.id,
  selector: 'rae-suche',
  templateUrl: 'suche.component.html',
  styleUrls: [ 'suche.component.css' ]
})
export class SucheComponent implements OnInit, AfterViewChecked {
  numberOfComponents = 1;
  query: string;
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
  count = 0;
  numberOfPropertiesInSearchBox = '';
  helpArray: any;
  value: string;
  sendInputStringToSuchmaske: string;
  finalQueryArray = [ '' ];
  currentSearchBox = '1';
  allSearchResults: Array<CachePoem>;
  inputSearchStringToBeParsed: string;
  input: Array<any>;
  searchTerm: string;
  numberOfSearchResults: number;
  queries: Array<any>;
  partOfAllSearchResults: Array<any>;
  trueIfDuplicate = false;
  firstTermAfterOr = true;
  setOfKonvolutIRIs = new Set();
  setOfAlowedPoemIRIs = new Set();
  setOfPerformedQueries = new Set();
  setOfKonvolutIRIsOld = new Set();
  setOfKonvolutQueries = new Set();
  setOfWholePoemsInResult = new Set();
  setOfPoemsInResult = new Set();
  poemsToCheck = new Set();
  searchTermArray: Array<string>;
  startSearchImmediately = false;
  warning: string;
  warningread: boolean;
  currentPath: string;
  loadingIndicatorInput: boolean;
  progressIndicator = 0;
  sizeOld=0;
  noMoreChange = false;
  menuEntries = 0;
  menuArray: Array<any>;
  chosenPage: number;
  poemsPerPage = 50;
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
    this.checkProgress();
    // for (let konvolut of this.suchmaskeKonvolutIRIMapping) {
    //   this.getKonvolutIRI(konvolut.konvolut, konvolut.index);
    // }
    if (this.route.snapshot.queryParams[ 'wort' ]) {
      for ( let konvolut of this.suchmaskeKonvolutIRIMapping ) {
        konvolut.enabled = this.updateFilterParams(this.route.snapshot.queryParams[ konvolut.suchmaskeKonvolutName ], true);
      }
      this.startSearchImmediately = true;
      this.searchTermArray = [];
      this.searchTermArray[this.searchTermArray.length] = this.route.snapshot.queryParams[ 'wort' ];
      //setTimeout(() => {
        //console.log('Wait for Konvolutes to load');
        this.inputSearchStringToBeParsed = this.route.snapshot.queryParams[ 'wort' ];
      //}, 3000);

    }
    if (this.allSearchResults === undefined) {
      this.numberOfSearchResults = 0;
    } else {
      this.numberOfSearchResults = this.allSearchResults.length;
    }
  }


  executeFinalQueries() {
    this.menuArray = [];
    this.noMoreChange = false;
    this.setOfPoemsInResult.clear();
    this.sendInputStringToSuchmaske = this.inputSearchStringToBeParsed;
    this.warning = '';
    this.numberOfSearchResults = 0;
    this.allSearchResults = [];
    this.searchTermArray = [];
    this.helpArray = [];
    this.partOfAllSearchResults = undefined;
    if(this.arg) this.updateQueryParamsInURL();
    if (!this.queries) {
      console.log('No query defined');
    } else {
      this.allSearchResults = undefined;
      this.translateQueriesReturnedFromParserToKnoraRequests(this.queries);
    }
  }

  translateQueriesReturnedFromParserToKnoraRequests(queries: Array<any>) {
    for (this.i = 0; this.i < queries.length; this.i++) {
      this.firstTermAfterOr = true;
      console.log('Request Group nr: ' + this.i);
      for (this.j = 0; this.j < queries[ this.i ].length; this.j++) {
        if (this.j !== 0) {
          //console.log('And merge with?');
        }
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
          numberOfTermsInSearchGroup);
        this.performSearchInText(
          searchTerm,
          searchGroup,
          numberOfTermsInSearchGroup);
      }
    } else if (location === 'title') {
      for (this.m = 0; this.m < this.poemResTypes.length; this.m++) {
        this.performSearchInTitle(
          searchTerm,
          firstTermAfterOr,
          searchGroup,
          numberOfTermsInSearchGroup);
      }
    } else if (location === 'text') {
      for (this.m = 0; this.m < this.poemResTypes.length; this.m++) {
        this.performSearchInText(
          searchTerm,
          searchGroup,
          numberOfTermsInSearchGroup);
      }
    }
  }

  performSearchInTitle(searchTerm: string,
                       firstTermAfterOr: boolean,
                       searchGroup: number,
                       numberOfTermsInSearchGroup: number) {
      return this.http.get(
        createKnoraV1APICall(searchTerm, 'title') )
        .map(
          (lambda: Response) => {
            const data = lambda.json();
            if (data.subjects[0] !== undefined) {
              this.addToTemporarySearchResultArray(data.subjects,
                searchGroup,
                numberOfTermsInSearchGroup,
                searchTerm);
          } else {
              //
          }
          return null;
        }
      )
      .subscribe(response => response = response);

  }
  performSearchInText(searchTerm: string,
                      searchGroup: number,
                      numberOfTermsInSearchGroup: number) {
    //console.log('Search in Text');
    return this.http.get(
      createKnoraV1APICall(searchTerm, 'text') )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          if (data.subjects[ 0 ] !== undefined) {
            this.addToTemporarySearchResultArray(data.subjects,
              searchGroup,
              numberOfTermsInSearchGroup,
              searchTerm);
          } else {
            //console.log('Keine Treffer fuer diese Suche');
          }
          return null;
        }
      )
      .subscribe(response => response = response);

  }

  addToTemporarySearchResultArray(searchResults: Array<any>,
                                  searchGroup: number,
                                  numberOfTermsInSearchGroup: number,
                                  searchTerm: string) {
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
    searchResults =  null;
  }

  addToFinalSearchResultArray(searchResults: Array<any>, singlePoem: any) {
    this.checkProgress();
    if (this.allSearchResults === undefined) {
      this.allSearchResults = [];
    }
    if( searchResults ) {
      for (let poem of searchResults) {
        if( !this.poemsToCheck.has( poem.value['6'] ) ) {
          this.onlyChoosePoemsThatAreInChosenConvolutes( poem );
          console.log('add');
          this.poemsToCheck.add( poem.value['6'] );
        }
      }
      searchResults = null;
    }
    if( singlePoem ) {
      if( !this.poemsToCheck.has( singlePoem.value['6'] ) ) {
        this.onlyChoosePoemsThatAreInChosenConvolutes( singlePoem );
        console.log('add');
        this.poemsToCheck.add( singlePoem.value['6'] );
      }
      singlePoem = null;
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
    onlyChoosePoemsThatAreInChosenConvolutes( poem: any ) {
        this.checkProgress();
            if( !this.setOfPoemsInResult.has( poem.value[ '6' ] ) ) { this.setOfPoemsInResult.add( poem.value[ '6' ] );
              if( this.checkTextart( poem.value[ '10' ] ) ) {
                if( this.checkTimeInterval( poem.value[ '5' ] ) ) {
                  if( this.checkIfFinalVersion( poem.value[ '13' ] ) ) {
                    if( this.checkIfHasStrophe( poem.value[ '9' ] ) ) {
                      if( this.checkIfIsInDialect(poem.value[ '14' ] ) ) {
                        if( this.checkIfPartOfCycle( poem.value[ '15' ] ) ) {
                          this.setOfWholePoemsInResult.add(poem);
                          this.sizeOld = this.setOfWholePoemsInResult.size;
                          setTimeout(() => {
                            this.setToArray(this.setOfWholePoemsInResult.size);
                          }, 3000);
                          this.numberOfSearchResults += 1;
                        }
                      }
                    }
                  }
                }
              }
          }
    }

  setToArray(newSize: number) {
    if( newSize === this.sizeOld ) {
        this.setOfWholePoemsInResult.forEach((value: string, key: string) => {
          (value as any).reservedPointer = this.helpArray.length;
          this.helpArray[ (value as any).reservedPointer ] = new CachePoem();
          this.helpArray[ (value as any).reservedPointer ].poemTitle = (value as any).value['8'];
          this.helpArray[ (value as any).reservedPointer ].poemCreationDate = (value as any).value['5'];
          this.helpArray[ (value as any).reservedPointer ].poemText = (value as any).value['7'];
          this.helpArray[ (value as any).reservedPointer ].poemIRI = (value as any).value['6'];
          this.helpArray[ (value as any).reservedPointer ].synopsisIRI = (value as any).value['11'];
          this.helpArray[ (value as any).reservedPointer ].synopsisTitle = (value as any).value['12'];
          this.helpArray[ (value as any).reservedPointer ].isFinalVersion = (value as any).value['13'];
          this.helpArray[ (value as any).reservedPointer ].searchOfficialName = (value as any).value['3'];
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
        });
        this.sortResultArray();
        this.setOfKonvolutIRIs.clear();
        this.setOfAlowedPoemIRIs.clear();
        this.setOfPerformedQueries.clear();
        this.setOfKonvolutIRIsOld.clear();
        this.setOfKonvolutQueries.clear();
        this.setOfWholePoemsInResult.clear();
        this.poemsToCheck.clear();
        this.setOfWholePoemsInResult.clear();
        this.renderPage();
    }
  }

  renderPage() {
    if(this.helpArray <= this.poemsPerPage) {
      this.allSearchResults = this.helpArray;
    } else {
      this.chosenPage = 0;
      this.menuEntries = this.helpArray.length / this.poemsPerPage;
      this.menuArray = [];
      for ( let i = 0; i <  this.menuEntries; i++ ) {
        this.menuArray[ i ] = i + 1;
      }
      //console.log(this.menuArray);
      this.menuArray[this.menuEntries] = '';
      this.allSearchResults = this.helpArray.slice(0, this.poemsPerPage);
    }
  }

  choosePage(page: number) {
    this.chosenPage = page;
    //console.log('chose Page: ' + page);
    this.allSearchResults = this.helpArray.slice(
      page * this.poemsPerPage, ( page + 1) * this.poemsPerPage );
  }

  checkIfChosen(page: number) {
    if (page === this.chosenPage ) {
      return true;
    } else return false;

  }

  sortResultArray() {
    for(let i = 0; i < this.helpArray.length - 1; i++ ) {
      if(this.helpArray[i].poemCreationDate < this.helpArray[i + 1].poemCreationDate) {
        //console.log(this.allSearchResults[i][1] + ' ist kleiner als ' + this.allSearchResults[i + 1][1]);
      } else {
        let help = this.helpArray[i + 1];
        this.helpArray[i + 1] = this.helpArray[i];
        this.helpArray[i] = help;
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
            console.log('Poem liegt im beidseitig geschlossenen Intervall');
            return true;
          } else {
            return false;
          }
        } else if(
          (this.arg.get('zeitraumForm.zeitraumVon').value !== ''
            && date.split('-')[0] >= this.arg.get('zeitraumForm.zeitraumVon').value)
        ) {
          console.log('Groesser als Linker Intervall');
          return true;
        } else if(
          (this.arg.get('zeitraumForm.zeitraumBis').value !== ''
            && date.split('-')[0] <= this.arg.get('zeitraumForm.zeitraumBis').value )
        ) {
          console.log('Kleiner als Linker Intervall');
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
            console.log('Poem liegt im beidseitig geschlossenen Intervall');
            return true;
          } else {
            return false;
          }
        } else if(
          this.route.snapshot.queryParams[ 'zeitBeginn' ] !== undefined
            && date.split('-')[0] >= this.route.snapshot.queryParams[ 'zeitBeginn' ]
        ) {
          console.log('Groesser als Linker Intervall');
          return true;
        } else if(
          this.route.snapshot.queryParams[ 'zeitEnde' ] !== undefined
            && date.split('-')[0] <= this.route.snapshot.queryParams[ 'zeitEnde' ]
        ) {
          console.log('Kleiner als Linker Intervall');
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
