import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { globalSearchVariableService } from './globalSearchVariablesService';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MdDialog } from '@angular/material';
import { SuchmaskeHilfeComponent } from './suchmaske-hilfe/suchmaske-hilfe.component';


@Component({
  moduleId: module.id,
  selector: 'rae-suche',
  templateUrl: 'suche.component.html',
  styleUrls: [ 'suche.component.css' ]
})
export class SucheComponent implements OnInit {
  numberOfComponents = 1;

  myResources: Array<any>;
  myProperties: Array<any>;
  responseArray: Array<any>;
  searchResult: Array<any>;
  selectedResource: string;
  selectedProperty: string;
  boolOperator: string;
  encodedURL: string;
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
  arraySize: number;
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
  str: string;
  value: string;
  keys: Array<any>;
  finalQueryArray = [ '' ];
  currentSearchBox = '1';
  allSearchResults: Array<any>;
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
  setOfPoemsNotizbuch79 = new Set();
  setOfPoemsNotizbuch7982 = new Set();
  setOfPoemsNotizbuch8088 = new Set();
  setOfPoemsManuskript79 = new Set();
  setOfPoemsManuskript7983 = new Set();
  setOfPoemsManuskriptKarten = new Set();
  setOfPoemsTyposkript79 = new Set();
  setOfPoemsTyposkript79Spez = new Set();
  setOfPoemsTyposkript83 = new Set();
  setOfPoemsdruckGesicht = new Set();
  setOfPoemsdruckSchiffe = new Set();
  setOfPoemsdruckGedichte = new Set();
  setOfPoemsdruckFlussufer = new Set();
  setOfPoemsdruckReduktionen = new Set();
  setOfPoemsdzeitschriftAkzente = new Set();
  setOfPoemszeitschriftBlaetter = new Set();
  zeitschriftZeit = new Set();
  zeitschriftTat = new Set();
  zeitschriftTag = new Set();
  zeitschriftJahresring = new Set();
  zeitschriftEnsemble = new Set();
  zeitschriftSchoenste = new Set();
  zeitschriftLadZ = new Set();
  setOfAllSearchResults = new Set();
  zeitschriftLNN = new Set();
  zeitschriftKonturen = new Set();
  numberOfPerformedQueries = 0;
  setOfResultsInSearchGroup = new Set();
  setOfSearchTermsInSearchGroup = new Set();
  zeitschriftLuZ = new Set();
  zeitschriftDeutscheHefte = new Set();
  zeitschriftMerkur = new Set();
  zeitschriftSueddeutsche = new Set();
  zeitschriftNZZ = new Set();
  zeitschriftNZN = new Set();
  materialienTagebuch = new Set();
  zeitschriftHortulus = new Set();
  zeitschriftRundschau = new Set();
  zeitschriftRenaissance = new Set();
  searchTermArray: Array<string>;
  zeitschriftWortTat = new Set();
  startSearchImmediately = false;
  warning: string;
  warningread: boolean;
  currentPath: string;
  loadingIndicatorInput: boolean;
  progressIndicator = 0;
  arrayOfResultsInAllSearchGroups = [
    {
      'setOfSearchTermsInSearchGroup': new Set(),
      'setOfResultsInSearchGroup': new Set()
    }
  ];
  arg: AbstractControl;
  rightProperty: string;
  suchmaskeKonvolutIRIMapping = [
    {
      'konvolut': 'notizbuch-1979',
      'suchmaskeKonvolutName': 'notizbuch79',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.setOfPoemsNotizbuch79,
      'officialName': 'Notizbuch 1979'
    },
    {
      'konvolut': 'notizbuch-1979-1982',
      'suchmaskeKonvolutName': 'notizbuch7982',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.setOfPoemsNotizbuch7982,
      'officialName': 'Notizbuch 1979 - 82'
    },
    {
      'konvolut': 'notizbuch-1980-1988',
      'suchmaskeKonvolutName': 'notizbuch8088',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.setOfPoemsNotizbuch8088,
      'officialName': 'Notizbuch 1980 - 1988'
    },
    {
      'konvolut': 'manuskripte-1979',
      'suchmaskeKonvolutName': 'manuskript79',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.setOfPoemsManuskript79,
      'officialName': 'Manuskripte 1979'
    },
    {
      'konvolut': 'manuskripte-1979-1983',
      'suchmaskeKonvolutName': 'manuskript7983',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.setOfPoemsManuskript7983,
      'officialName': 'Manuskripte 1979 - 1983'
    },
    {
      'konvolut': 'karten-1984',
      'suchmaskeKonvolutName': 'manuskriptKarten',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.setOfPoemsManuskriptKarten,
      'officialName': 'Karten 1984'
    },
    {
      'konvolut': 'typoskripte-1979',
      'suchmaskeKonvolutName': 'typoskript79',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.setOfPoemsTyposkript79,
      'officialName': 'Typoskripte 1979'
    },
    {
      'konvolut': 'typoskripte-1979-spez',
      'suchmaskeKonvolutName': 'typoskript79Spez',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.setOfPoemsTyposkript79Spez,
      'officialName': 'Manuskripte 1979 - spez'
    },
    {
      'konvolut': 'typoskripte-1983',
      'suchmaskeKonvolutName': 'typoskript83',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.setOfPoemsTyposkript83,
      'officialName': 'Manuskripte 1983'
    },
    {
      'konvolut': 'gesicht-im-mittag',
      'suchmaskeKonvolutName': 'druckGesicht',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.setOfPoemsdruckGesicht,
      'officialName': 'Gesicht im Mittag'
    },
    {
      'konvolut': 'die-verwandelten-schiffe',
      'suchmaskeKonvolutName': 'druckSchiffe',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.setOfPoemsdruckSchiffe,
      'officialName': 'Die verwandelten Schiffe'
    },
    {
      'konvolut': 'gedichte',
      'suchmaskeKonvolutName': 'druckGedichte',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.setOfPoemsdruckGedichte,
      'officialName': 'Gedichte'
    },
    {
      'konvolut': 'flussufer',
      'suchmaskeKonvolutName': 'druckFlussufer',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.setOfPoemsdruckFlussufer,
      'officialName': 'Flussufer'
    },
    {
      'konvolut': 'reduktionen',
      'suchmaskeKonvolutName': 'druckReduktionen',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.setOfPoemsdruckReduktionen,
      'officialName': 'Reduktionen'
    },
    {
      'konvolut': 'akzente',
      'suchmaskeKonvolutName': 'zeitschriftAkzente',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.setOfPoemsdzeitschriftAkzente,
      'officialName': 'Akzente'
    },
    {
      'konvolut': 'blaetter+bilder',
      'suchmaskeKonvolutName': 'zeitschriftBlaetter',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.setOfPoemszeitschriftBlaetter,
      'officialName': 'Blätter + Bilder'
    },
    {
      'konvolut': 'zeitschriftSchoenste',
      'suchmaskeKonvolutName': 'zeitschriftSchoenste',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.zeitschriftSchoenste,
      'officialName': 'Schönste'
    },
    {
      'konvolut': 'zeitschriftTag',
      'suchmaskeKonvolutName': 'zeitschriftTag',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.zeitschriftTag,
      'officialName': 'Tag'
    },
    {
      'konvolut': 'zeitschriftTat',
      'suchmaskeKonvolutName': 'zeitschriftTat',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.zeitschriftTat,
      'officialName': 'Tat'
    },
    {
      'konvolut': 'zeitschriftZeit',
      'suchmaskeKonvolutName': 'zeitschriftZeit',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.zeitschriftZeit,
      'officialName': 'DIE ZEIT'
    },
    {
      'konvolut': 'zeitschriftEnsemble',
      'suchmaskeKonvolutName': 'zeitschriftEnsemble',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.zeitschriftEnsemble,
      'officialName': 'ensemble'
    },
    {
      'konvolut': 'zeitschriftHortulus',
      'suchmaskeKonvolutName': 'zeitschriftHortulus',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.zeitschriftHortulus,
      'officialName': 'Hortulus'
    },
    {
      'konvolut': 'zeitschriftJahresring',
      'suchmaskeKonvolutName': 'zeitschriftJahresring',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.zeitschriftJahresring,
      'officialName': 'Jahresring'
    },
    {
      'konvolut': 'zeitschriftKonturen',
      'suchmaskeKonvolutName': 'zeitschriftKonturen',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.zeitschriftKonturen,
      'officialName': 'Konturen'
    },
    {
      'konvolut': 'zeitschriftLNN',
      'suchmaskeKonvolutName': 'zeitschriftLNN',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.zeitschriftLNN,
      'officialName': 'Luzerner Neueste Nachrichten'
    },
    {
      'konvolut': 'zeitschriftLadZ',
      'suchmaskeKonvolutName': 'zeitschriftLadZ',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.zeitschriftLadZ,
      'officialName': 'Lyrik aus dieser Zeit'
    },
    {
      'konvolut': 'zeitschriftLuZ',
      'suchmaskeKonvolutName': 'zeitschriftLuZ',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.zeitschriftLuZ,
      'officialName': 'Lyrik unserer Zeit'
    },
    {
      'konvolut': 'zeitschriftMerkur',
      'suchmaskeKonvolutName': 'zeitschriftMerkur',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.zeitschriftMerkur,
      'officialName': 'Merkur'
    },
    {
      'konvolut': 'zeitschriftDeutscheHefte',
      'suchmaskeKonvolutName': 'zeitschriftDeutscheHefte',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.zeitschriftDeutscheHefte,
      'officialName': 'Neue Deutsche Hefte'
    },
    {
      'konvolut': 'zeitschriftNZN',
      'suchmaskeKonvolutName': 'zeitschriftNZN',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.zeitschriftNZN,
      'officialName': 'Neue Zürcher Nachrichten'
    },
    {
      'konvolut': 'zeitschriftNZZ',
      'suchmaskeKonvolutName': 'zeitschriftNZZ',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.zeitschriftNZZ,
      'officialName': 'Neue Zürcher Zeitung'
    },
    {
      'konvolut': 'zeitschriftRenaissance',
      'suchmaskeKonvolutName': 'zeitschriftRenaissance',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.zeitschriftRenaissance,
      'officialName': 'Renaissance'
    },
    {
      'konvolut': 'zeitschriftRundschau',
      'suchmaskeKonvolutName': 'zeitschriftRundschau',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.zeitschriftRundschau,
      'officialName': 'Schweizer Rundschau'
    },
    {
      'konvolut': 'zeitschriftSueddeutsche',
      'suchmaskeKonvolutName': 'zeitschriftSueddeutsche',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.zeitschriftSueddeutsche,
      'officialName': 'Sueddeutsche Zeitung'
    },
    {
      'konvolut': 'zeitschriftWortTat',
      'suchmaskeKonvolutName': 'zeitschriftWortTat',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.zeitschriftWortTat,
      'officialName': 'Wort und Tat'
    },
    {
      'konvolut': 'materialienTagebuch',
      'suchmaskeKonvolutName': 'materialienTagebuch',
      'enabled': true,
      'IRI': 'undefined',
      'memberPoems': this.materialienTagebuch,
      'officialName': 'Tagebuch'
    }
  ];
  poemResTypes = [
    'http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber%23PoemNote',
    'http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber%23HandwrittenPoem',
    'http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber%23PostCardPoem',
    'http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber%23TypewrittenPoem',
    'http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber%23PublicationPoem'
  ];

  constructor(public dialog: MdDialog, private http: Http, private route: ActivatedRoute, private location: Location) {
    this.route.params.subscribe(params => console.log(params));
  }

  checkProgress() {
    console.log('check progress');
    this.loadingIndicatorInput = true;
    setTimeout(() => {
      this.loadingIndicatorInput = false;
    }, 8000);
  }

  handleSearchEvent(arg: AbstractControl) {
    if(this.startSearchImmediately) this.startSearchImmediately = false;
    //console.log(arg);
    this.arg = arg;
    this.updateSuchmaskeKonvolutIRIMapping(arg);
    //Send String to Parser:
    this.inputSearchStringToBeParsed = arg.get('suchwortForm').value.suchwortInput;
    this.currentPath = '/suche?wort=' + this.inputSearchStringToBeParsed
    this.location.replaceState(this.currentPath);
  }
  updateFilterParams(routeSnapshot: boolean, defaultValue: boolean): boolean {
    if(routeSnapshot) return routeSnapshot;
    else return defaultValue;
  }

  ngOnInit() {
    this.checkProgress();
    for (this.o = 0; this.o < this.suchmaskeKonvolutIRIMapping.length; this.o++) {
      this.getKonvolutIRI(this.suchmaskeKonvolutIRIMapping[ this.o ].konvolut, this.o);
    }
    if (this.route.snapshot.queryParams[ 'wort' ]) {
      console.log('Start search immediately');
      this.suchmaskeKonvolutIRIMapping[ 0 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'notizbuch79' ],true);
      this.suchmaskeKonvolutIRIMapping[ 1 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'notizbuch7982' ],true);
      this.suchmaskeKonvolutIRIMapping[ 2 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'notizbuch8088' ],true);
      this.suchmaskeKonvolutIRIMapping[ 3 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'manuskript79' ],true);
      this.suchmaskeKonvolutIRIMapping[ 4 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'manuskript7983' ],true);
      this.suchmaskeKonvolutIRIMapping[ 5 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'manuskriptKarten' ],true);
      this.suchmaskeKonvolutIRIMapping[ 6 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'typoskript79' ],true);
      this.suchmaskeKonvolutIRIMapping[ 7 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'typoskript79Spez' ],true);
      this.suchmaskeKonvolutIRIMapping[ 8 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'typoskript83' ],true);
      this.suchmaskeKonvolutIRIMapping[ 9 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'druckGesicht' ],true);
      this.suchmaskeKonvolutIRIMapping[ 10 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'druckSchiffe' ],true);
      this.suchmaskeKonvolutIRIMapping[ 11 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'druckGedichte' ],true);
      this.suchmaskeKonvolutIRIMapping[ 12 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'druckFlussufer' ],true);
      this.suchmaskeKonvolutIRIMapping[ 13 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'druckReduktionen' ],true);
      this.suchmaskeKonvolutIRIMapping[ 14 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'zeitschriftAkzente' ],true);
      this.suchmaskeKonvolutIRIMapping[ 15 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'zeitschriftBlaetter' ],true);
      this.suchmaskeKonvolutIRIMapping[ 16 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'zeitschriftSchoenste' ],true);
      this.suchmaskeKonvolutIRIMapping[ 17 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'zeitschriftTag' ],true);
      this.suchmaskeKonvolutIRIMapping[ 18 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'zeitschriftTat' ],true);
      this.suchmaskeKonvolutIRIMapping[ 19 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'zeitschriftZeit' ],true);
      this.suchmaskeKonvolutIRIMapping[ 20 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'zeitschriftEnsemble' ],true);
      this.suchmaskeKonvolutIRIMapping[ 21 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'zeitschriftHortulus' ],true);
      this.suchmaskeKonvolutIRIMapping[ 22 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'zeitschriftJahresring' ],true);
      this.suchmaskeKonvolutIRIMapping[ 23 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'zeitschriftKonturen' ],true);
      this.suchmaskeKonvolutIRIMapping[ 24 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'zeitschriftLNN' ],true);
      this.suchmaskeKonvolutIRIMapping[ 25 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'zeitschriftLadZ' ],true);
      this.suchmaskeKonvolutIRIMapping[ 26 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'zeitschriftLuZ' ],true);
      this.suchmaskeKonvolutIRIMapping[ 27 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'zeitschriftMerkur' ],true);
      this.suchmaskeKonvolutIRIMapping[ 28 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'zeitschriftDeutscheHefte' ],true);
      this.suchmaskeKonvolutIRIMapping[ 29 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'zeitschriftNZN' ],true);
      this.suchmaskeKonvolutIRIMapping[ 30 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'zeitschriftNZZ' ],true);
      this.suchmaskeKonvolutIRIMapping[ 31 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'zeitschriftRenaissance' ],true);
      this.suchmaskeKonvolutIRIMapping[ 32 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'zeitschriftRundschau' ],true);
      this.suchmaskeKonvolutIRIMapping[ 33 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'zeitschriftSueddeutsche' ],true);
      this.suchmaskeKonvolutIRIMapping[ 34 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'zeitschriftWortTat' ],true);
      this.suchmaskeKonvolutIRIMapping[ 35 ].enabled
        = this.updateFilterParams(this.route.snapshot.queryParams[ 'materialienTagebuch' ],true);
      console.log(this.suchmaskeKonvolutIRIMapping);
      this.startSearchImmediately = true;
      this.searchTermArray = [];
      this.searchTermArray[this.searchTermArray.length] = this.route.snapshot.queryParams[ 'wort' ];
      this.inputSearchStringToBeParsed = this.route.snapshot.queryParams[ 'wort' ];
    }
    if (this.allSearchResults === undefined) {
      this.numberOfSearchResults = 0;
    } else {
      this.numberOfSearchResults = this.allSearchResults.length;
    }
  }




  executeFinalQueries() {
    this.warning = '';
    this.numberOfQueries = 0;
    this.numberOfSearchResults = 0;
    this.allSearchResults = [];
    this.searchTermArray = [];
    this.partOfAllSearchResults = undefined;
    this.setOfAllSearchResults.clear();
    if(this.arg) this.updateQueryParamsInURL();
    if (!this.queries) {
      console.log('No query defined');
    } else {
      this.allSearchResults = undefined;
      this.translateQueriesReturnedFromParserToKnoraRequests(this.queries);
    }
  }

  translateQueriesReturnedFromParserToKnoraRequests(queries: Array<any>) {
    this.str = JSON.stringify(queries, null, 4);
    console.log('Queries: ' + this.str);
    this.temporarySearchResults = undefined;
    for (this.i = 0; this.i < queries.length; this.i++) {
      this.firstTermAfterOr = true;
      console.log('Request Group nr: ' + this.i);
      this.finalTemporaryResults = undefined;
      this.temporarySearchResults = undefined;
      for (this.j = 0; this.j < queries[ this.i ].length; this.j++) {
        if (this.j !== 0) {
          console.log('And merge with?');
        }
        this.numberOfQueries += 1;
        console.log('Search for: '
          + queries[ this.i ][ this.j ].searchString
          + ' in: ' + queries[ this.i ][ this.j ].where);
        this.searchTerm = queries[ this.i ][ this.j ].searchString;
        if(this.searchTermArray === undefined) {
          this.searchTermArray = [];
        }
        this.searchTermArray[this.searchTermArray.length] = this.searchTerm;
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
    console.log(queries);
    this.queries = queries;
    if(this.startSearchImmediately) {
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
    this.numberOfPerformedQueries += 1;
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
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fknora-base%23seqnum' +
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
        '&show_nrows=2000')
        .map(
          (lambda: Response) => {
            const data = lambda.json();
            console.log(data);
            if (data.subjects[0] !== undefined) {
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
    console.log('Search in Text');
    this.numberOfPerformedQueries += 1;
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
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fknora-base%23seqnum' +
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
      '&show_nrows=2000')
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          //console.log(data);
          if (data.subjects[ 0 ] !== undefined) {
            this.addToTemporarySearchResultArray(data.subjects,
              firstTermAfterOr,
              searchGroup,
              numberOfTermsInSearchGroup,
              searchTerm,
              undefined);
          } else {
            console.log('Keine Treffer fuer diese Suche');
          }
          return data.properties;
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
            console.log('Found Duplicate, so add to results');
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
/*      }
      if (poemIRI !== undefined) {
        this.addToFinalSearchResultArray(undefined, poemIRI);*/
      }
    }
  }

  addToFinalSearchResultArray(searchResults: Array<any>, singlePoem: any) {
    this.checkProgress();
    //console.log('Add to final Search Results');
    //console.log(searchResults);
    //console.log(singlePoem);
    if (this.allSearchResults === undefined) {
      this.allSearchResults = [];
    }
    if(searchResults) {
      //console.log('add every poem to final search results');
      for (let poem of searchResults) {
        //console.log(poem.value['7']);
        this.onlyChoosePoemsThatAreInChosenConvolutes(
          poem.value['7'],
          poem.value['8'],
          poem.value['9'],
          poem.value['1'],
          poem.value['6'],
          0,
          undefined,
          undefined,
          undefined,
          undefined,
          undefined,
          poem.value['11'],
          poem.value['10']);
      }
    }
    if(singlePoem) {
      console.log('add poem to final search results');
      this.onlyChoosePoemsThatAreInChosenConvolutes(
        singlePoem.value['7'],
        singlePoem.value['8'],
        singlePoem.value['9'],
        singlePoem.value['1'],
        singlePoem.value['6'],
        0,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        singlePoem.value['11'],
        singlePoem.value['10']);
    }
    //console.log(searchResultString);
/*    if (searchResultString !== undefined) {
      if (this.allSearchResults === undefined) {
        this.allSearchResults = [];
      }
      this.performPoemQuery(
        searchResultString,
        undefined,
        undefined,
        undefined);
    }
    if (searchResults !== undefined && searchResults.length !== 0) {
      if (this.allSearchResults === undefined) {
        this.allSearchResults = [];
      }
      for (let result of searchResults) {
        this.performPoemQuery(
          result.obj_id,
          result.value[ 3 ],
          result.value[ 1 ],
          result.value[ 2 ]);
      }
    }*/
  }

  updateSuchmaskeKonvolutIRIMapping(arg: AbstractControl) {
    console.log(arg);
    if (
      arg.get('notizbuchForm').pristine
      && arg.get('druckForm').pristine
      && arg.get('materialienForm').pristine
      && arg.get('typoskriptForm').pristine
      && arg.get('manuskriptForm').pristine
      && arg.get('zeitschriftForm').pristine
    ) {
      //console.log('Perform Search in all convolutes');
    } else {
      console.log('Gehe durch jedes Konvolut');
      this.suchmaskeKonvolutIRIMapping[ 0 ].enabled = arg.get('notizbuchForm.notizbuch79').value;
      this.suchmaskeKonvolutIRIMapping[ 1 ].enabled = arg.get('notizbuchForm.notizbuch7982').value;
      this.suchmaskeKonvolutIRIMapping[ 2 ].enabled = arg.get('notizbuchForm.notizbuch8088').value;
      this.suchmaskeKonvolutIRIMapping[ 3 ].enabled = arg.get('manuskriptForm.manuskript79').value;
      this.suchmaskeKonvolutIRIMapping[ 4 ].enabled = arg.get('manuskriptForm.manuskript7983').value;
      this.suchmaskeKonvolutIRIMapping[ 5 ].enabled = arg.get('manuskriptForm.manuskriptKarten').value;
      this.suchmaskeKonvolutIRIMapping[ 6 ].enabled = arg.get('typoskriptForm.typoskript79').value;
      this.suchmaskeKonvolutIRIMapping[ 7 ].enabled = arg.get('typoskriptForm.typoskript79Spez').value;
      this.suchmaskeKonvolutIRIMapping[ 8 ].enabled = arg.get('typoskriptForm.typoskript83').value;
      this.suchmaskeKonvolutIRIMapping[ 9 ].enabled = arg.get('druckForm.druckGesicht').value;
      this.suchmaskeKonvolutIRIMapping[ 10 ].enabled = arg.get('druckForm.druckSchiffe').value;
      this.suchmaskeKonvolutIRIMapping[ 11 ].enabled = arg.get('druckForm.druckGedichte').value;
      this.suchmaskeKonvolutIRIMapping[ 12 ].enabled = arg.get('druckForm.druckFlussufer').value;
      this.suchmaskeKonvolutIRIMapping[ 13 ].enabled = arg.get('druckForm.druckReduktionen').value;
      this.suchmaskeKonvolutIRIMapping[ 14 ].enabled = arg.get('zeitschriftForm.zeitschriftAkzente').value;
      this.suchmaskeKonvolutIRIMapping[ 15 ].enabled = arg.get('zeitschriftForm.zeitschriftBlaetter').value;
      this.suchmaskeKonvolutIRIMapping[ 16 ].enabled = arg.get('zeitschriftForm.zeitschriftSchoenste').value;
      this.suchmaskeKonvolutIRIMapping[ 17 ].enabled = arg.get('zeitschriftForm.zeitschriftTag').value;
      this.suchmaskeKonvolutIRIMapping[ 18 ].enabled = arg.get('zeitschriftForm.zeitschriftTat').value;
      this.suchmaskeKonvolutIRIMapping[ 19 ].enabled = arg.get('zeitschriftForm.zeitschriftZeit').value;
      this.suchmaskeKonvolutIRIMapping[ 20 ].enabled = arg.get('zeitschriftForm.zeitschriftEnsemble').value;
      this.suchmaskeKonvolutIRIMapping[ 21 ].enabled = arg.get('zeitschriftForm.zeitschriftHortulus').value;
      this.suchmaskeKonvolutIRIMapping[ 22 ].enabled = arg.get('zeitschriftForm.zeitschriftJahresring').value;
      this.suchmaskeKonvolutIRIMapping[ 23 ].enabled = arg.get('zeitschriftForm.zeitschriftKonturen').value;
      this.suchmaskeKonvolutIRIMapping[ 24 ].enabled = arg.get('zeitschriftForm.zeitschriftLNN').value;
      this.suchmaskeKonvolutIRIMapping[ 25 ].enabled = arg.get('zeitschriftForm.zeitschriftLadZ').value;
      this.suchmaskeKonvolutIRIMapping[ 26 ].enabled = arg.get('zeitschriftForm.zeitschriftLuZ').value;
      this.suchmaskeKonvolutIRIMapping[ 27 ].enabled = arg.get('zeitschriftForm.zeitschriftMerkur').value;
      this.suchmaskeKonvolutIRIMapping[ 28 ].enabled = arg.get('zeitschriftForm.zeitschriftDeutscheHefte').value;
      this.suchmaskeKonvolutIRIMapping[ 29 ].enabled = arg.get('zeitschriftForm.zeitschriftNZN').value;
      this.suchmaskeKonvolutIRIMapping[ 30 ].enabled = arg.get('zeitschriftForm.zeitschriftNZZ').value;
      this.suchmaskeKonvolutIRIMapping[ 31 ].enabled = arg.get('zeitschriftForm.zeitschriftRenaissance').value;
      this.suchmaskeKonvolutIRIMapping[ 32 ].enabled = arg.get('zeitschriftForm.zeitschriftRundschau').value;
      this.suchmaskeKonvolutIRIMapping[ 33 ].enabled = arg.get('zeitschriftForm.zeitschriftSueddeutsche').value;
      this.suchmaskeKonvolutIRIMapping[ 34 ].enabled = arg.get('zeitschriftForm.zeitschriftWortTat').value;
      this.suchmaskeKonvolutIRIMapping[ 35 ].enabled = arg.get('materialienForm.materialienTagebuch').value;
      console.log(this.suchmaskeKonvolutIRIMapping);
    }
  }
  updateQueryParamsInURL() {
    this.currentPath = this.currentPath +
      '&notizbuch79=' + this.suchmaskeKonvolutIRIMapping[ 0 ].enabled +
      '&notizbuch7982=' + this.suchmaskeKonvolutIRIMapping[ 1 ].enabled +
      '&notizbuch8088=' + this.suchmaskeKonvolutIRIMapping[ 2 ].enabled +
      '&manuskript79=' + this.suchmaskeKonvolutIRIMapping[ 3 ].enabled +
      '&manuskript7983=' + this.suchmaskeKonvolutIRIMapping[ 4 ].enabled +
      '&manuskriptKarten=' + this.suchmaskeKonvolutIRIMapping[ 5 ].enabled +
      '&typoskript79=' + this.suchmaskeKonvolutIRIMapping[ 6 ].enabled +
      '&typoskript79Spez=' + this.suchmaskeKonvolutIRIMapping[ 7 ].enabled +
      '&typoskript83=' + this.suchmaskeKonvolutIRIMapping[ 8 ].enabled +
      '&druckGesicht=' + this.suchmaskeKonvolutIRIMapping[ 9 ].enabled +
      '&druckSchiffe=' + this.suchmaskeKonvolutIRIMapping[ 10 ].enabled +
      '&druckGedichte=' + this.suchmaskeKonvolutIRIMapping[ 11 ].enabled +
      '&druckFlussufer=' + this.suchmaskeKonvolutIRIMapping[ 12 ].enabled +
      '&druckReduktionen=' + this.suchmaskeKonvolutIRIMapping[ 13 ].enabled +
      '&zeitschriftAkzente=' + this.suchmaskeKonvolutIRIMapping[ 14 ].enabled +
      '&zeitschriftBlaetter=' + this.suchmaskeKonvolutIRIMapping[ 15 ].enabled +
      '&zeitschriftSchoenste=' + this.suchmaskeKonvolutIRIMapping[ 16 ].enabled +
      '&zeitschriftTag=' + this.suchmaskeKonvolutIRIMapping[ 17 ].enabled +
      '&zeitschriftTat=' + this.suchmaskeKonvolutIRIMapping[ 18 ].enabled +
      '&zeitschriftZeit=' + this.suchmaskeKonvolutIRIMapping[ 19 ].enabled +
      '&zeitschriftEnsemble=' + this.suchmaskeKonvolutIRIMapping[ 20 ].enabled +
      '&zeitschriftHortulus=' + this.suchmaskeKonvolutIRIMapping[ 21 ].enabled +
      '&zeitschriftJahresring=' + this.suchmaskeKonvolutIRIMapping[ 22 ].enabled +
      '&zeitschriftKonturen=' + this.suchmaskeKonvolutIRIMapping[ 23 ].enabled +
      '&zeitschriftLNN=' + this.suchmaskeKonvolutIRIMapping[ 24 ].enabled +
      '&zeitschriftLadZ=' + this.suchmaskeKonvolutIRIMapping[ 25 ].enabled +
      '&zeitschriftLuZ=' + this.suchmaskeKonvolutIRIMapping[ 26 ].enabled +
      '&zeitschriftMerkur=' + this.suchmaskeKonvolutIRIMapping[ 27 ].enabled +
      '&zeitschriftDeutscheHefte=' + this.suchmaskeKonvolutIRIMapping[ 28 ].enabled +
      '&zeitschriftNZN=' + this.suchmaskeKonvolutIRIMapping[ 29 ].enabled +
      '&zeitschriftNZZ=' + this.suchmaskeKonvolutIRIMapping[ 30 ].enabled +
      '&zeitschriftRenaissance=' + this.suchmaskeKonvolutIRIMapping[ 31 ].enabled +
      '&zeitschriftRundschau=' + this.suchmaskeKonvolutIRIMapping[ 32 ].enabled +
      '&zeitschriftSueddeutsche=' + this.suchmaskeKonvolutIRIMapping[ 33 ].enabled +
      '&zeitschriftWortTat=' + this.suchmaskeKonvolutIRIMapping[ 34 ].enabled +
      '&materialienTagebuch=' + this.suchmaskeKonvolutIRIMapping[ 35 ].enabled +
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
    if(queryPart === undefined) {
      queryPart = individualQueryPart;
    } else {
      queryPart = globalSearchVariableService.API_URL +
        globalSearchVariableService.extendedSearch +
        encodeURIComponent(globalSearchVariableService.initialVocabulary) +
        queryPart;
    }
    this.numberOfPerformedQueries += 1;
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
      this.numberOfPerformedQueries += 1;
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
        )
        .subscribe(response => this.responseArray = response);
    }
/*    performPoemQuery(poemIRI: string, titel: string, date: string, seqnum: string) {
      this.numberOfPerformedQueries += 1;
      return this.http.get
      (
        globalSearchVariableService.API_URL +
        '/resources/' +
        encodeURIComponent(poemIRI)
      )
        .map(
          (lambda: Response) => {
            const data = lambda.json();
            //console.log(data);
            if(data.props[ 'http://www.knora.org/ontology/text#hasStructure' ].value_firstprops !== undefined) {
              this.performTextQuery(
                data.props[ 'http://www.knora.org/ontology/kuno-raeber#hasEdition' ].values[ 0 ],
                poemIRI,
                data.props[ 'http://www.knora.org/ontology/text#hasTitle' ].values[ 0 ].utf8str,
                date,
                seqnum,
                data.props[ 'http://www.knora.org/ontology/text#hasStructure' ].value_firstprops[0],
                data.props[ 'http://www.knora.org/ontology/text#isFinalVersion' ].values[0],
                data.props[ 'http://www.knora.org/ontology/text#hasStrophe' ].values[0],
                data.props[ 'http://www.knora.org/ontology/text#isInDialect' ].values[0],
                data.props[ 'http://www.knora.org/ontology/text#isPartOfCycle' ].values[0]
              );
            }
            return null;
          }
        )
        .subscribe(response => this.responseArray = response);
    }*/
/*    performTextQuery(editionIRI: string,
                     poemIRI: string,
                     titel: string,
                     date: string,
                     seqnum: string,
                     textart: string,
                     isFinalVersion: string,
                     hatStrophenunterteilung: string,
                     isInDialiect: string,
                     isPartOfCycle: string) {
      //console.log(editionIRI);
      return this.http.get
      (
        globalSearchVariableService.API_URL +
        '/resources/' +
        encodeURIComponent(editionIRI)
      )
        .map(
          (lambda: Response) => {
            const data = lambda.json();
            if (!this.setOfAllSearchResults.has(poemIRI)) {
              this.setOfAllSearchResults.add(poemIRI);
              this.onlyChoosePoemsThatAreInChosenConvolutes(
                poemIRI,
                data.props[ 'http://www.knora.org/ontology/text#hasContent' ].values[ 0 ].utf8str,
                titel,
                seqnum,
                date,
                0,
                textart,
                isFinalVersion,
                hatStrophenunterteilung,
                isInDialiect,
                isPartOfCycle);
            }
            return null;
          }
        )
        .subscribe(response => this.responseArray = response);
    }*/
    onlyChoosePoemsThatAreInChosenConvolutes(poemIRI: string,
                                             text: string,
                                             titel: string,
                                             seqnum: string,
                                             date: string,
                                             k: number,
                                             textart: string,
                                             isFinalVersion: string,
                                             hatStrophenunterteilung: string,
                                             isInDialiect: string,
                                             isPartOfCycle: string,
                                             synopsisTitle: string,
                                             synopsisIRI: string,) {
      for (k = 0; k < this.suchmaskeKonvolutIRIMapping.length; k++) {
        this.checkProgress();
        if (this.suchmaskeKonvolutIRIMapping[ k ].enabled &&
          this.suchmaskeKonvolutIRIMapping[ k ].enabled.toString() !== 'false') {
          //console.log(this.suchmaskeKonvolutIRIMapping[ k ].enabled + " " + this.suchmaskeKonvolutIRIMapping[ k ].konvolut);
          //console.log(k);
          //console.log(poemIRI);
          if(this.suchmaskeKonvolutIRIMapping[ k ].memberPoems.has(poemIRI)) {
              // if(this.checkTextart(textart)) {
                 if(this.checkTimeInterval(date)) {
              //     if(this.checkIfFinalVersion(isFinalVersion)) {
              //       if(this.checkIfHasStrophe(hatStrophenunterteilung)) {
              //         if(this.checkIfIsInDialect(isInDialiect)) {
              //           if(this.checkIfPartOfCycle(isPartOfCycle)) {
                          //console.log('Poem included in ' + this.suchmaskeKonvolutIRIMapping[ k ].konvolut);
                          if (this.allSearchResults[ this.allSearchResults.length ] === undefined) {
                            this.allSearchResults[ this.allSearchResults.length ] = [];
                            this.allSearchResults[ this.allSearchResults.length - 1 ][ 0 ] = titel;
                            this.allSearchResults[ this.allSearchResults.length - 1 ][ 1 ] = date;
                            this.allSearchResults[ this.allSearchResults.length - 1 ][ 2 ] = text;
                            this.allSearchResults[ this.allSearchResults.length - 1 ][ 3 ] = poemIRI;
                            this.allSearchResults[ this.allSearchResults.length - 1 ][ 4 ] = seqnum;
                            this.allSearchResults[ this.allSearchResults.length - 1 ][ 12 ] = synopsisTitle;
                            this.allSearchResults[ this.allSearchResults.length - 1 ][ 9 ] = synopsisIRI;
                            this.allSearchResults[ this.allSearchResults.length - 1 ][ 7 ]
                              = this.suchmaskeKonvolutIRIMapping[ k ].officialName;
                            this.allSearchResults[ this.allSearchResults.length - 1 ][ 6 ]
                              = this.suchmaskeKonvolutIRIMapping[ k ].konvolut;
                            this.numberOfSearchResults += 1;
                        }
              //         }
              //       }
              //     }
              //   }
                 }
              // }
          }
        }
      }
    }
    checkIfPartOfCycle(isPartOfCycle: string): boolean {
      //console.log(isPartOfCycle);
      if(!this.arg) return true;
      if(!this.arg.get('zyklus').value) {
        return true;
      } else if (this.arg.get('zyklus').value && isPartOfCycle) {
        return true;
      } else return false;
    }
    checkIfIsInDialect(isInDialiect: string): boolean {
      //console.log(isInDialiect);
      if(!this.arg) return true;
      if(!this.arg.get('mundart').value) {
        return true;
      } else if (this.arg.get('mundart').value && isInDialiect) {
        return true;
      } else return false;
    }
    checkIfHasStrophe(hatStrophenunterteilung: string): boolean {
      //console.log(hatStrophenunterteilung);
      if(!this.arg) return true;
      if(!this.arg.get('strophen').value) {
        return true;
      } else if (this.arg.get('strophen').value && hatStrophenunterteilung) {
        return true;
      } else return false;
    }
    checkIfFinalVersion(isFinalVersion: string):boolean {
      if(!this.arg) return true;
      if(!this.arg.get('endfassung').value) {
        return true;
      } else if (this.arg.get('endfassung').value && isFinalVersion) {
        return true;
      } else return false;
    }
    checkTextart(textart: string): boolean {
      if(!this.arg) return true;
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
      } else if (this.route.snapshot.queryParams[ 'textartFreieVerse' ] === 'true' && textart === 'FreeVerse') {
        return true;
      } else if (this.route.snapshot.queryParams[ 'textartProsanotat' ] === 'true' && textart === 'NoteProse') {
        return true;
      } else if (this.route.snapshot.queryParams[ 'textartProsa' ] === 'true' && textart === 'RythmicProse') {
        return true;
      } else if (this.route.snapshot.queryParams[ 'textartBriefentwurf' ] === 'true' && textart === 'LetterStructure') {
        return true;
      } else if (this.route.snapshot.queryParams[ 'textartGereimteVerse' ] === 'true' && textart === 'RythmicVerse') {
        return true;
      } else {
        return false;
      }
      }
    checkTimeInterval(date: string): boolean {
      //console.log(this.route.snapshot.queryParams[ 'zeitBeginn' ]);
      //console.log(this.route.snapshot.queryParams[ 'zeitEnde' ]);
      if(!this.arg
        && this.route.snapshot.queryParams[ 'zeitBeginn' ] === undefined
        && this.route.snapshot.queryParams[ 'zeitEnde' ] === undefined) return true;
      if(this.arg) {
        if (
          this.arg.get('zeitraumForm.zeitraumVon').value === ''
          && this.arg.get('zeitraumForm.zeitraumBis').value === '') {
          return true;
        } else if (
          this.arg.get('zeitraumForm.zeitraumVon').value !== ''
            && this.arg.get('zeitraumForm.zeitraumBis').value !== '') {
          if(
            (date.split('-')[0] > this.arg.get('zeitraumForm.zeitraumVon').value
              && date.split('-')[0] < this.arg.get('zeitraumForm.zeitraumBis').value)
          ) {
            console.log('Poem liegt im beidseitig geschlossenen Intervall');
            return true;
          } else {
            return false;
          }
        } else if(
          (this.arg.get('zeitraumForm.zeitraumVon').value !== ''
            && date.split('-')[0] > this.arg.get('zeitraumForm.zeitraumVon').value)
        ) {
          console.log('Groesser als Linker Intervall');
          return true;
        } else if(
          (this.arg.get('zeitraumForm.zeitraumBis').value !== ''
            && date.split('-')[0] < this.arg.get('zeitraumForm.zeitraumBis').value)
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
            date.split('-')[0] > this.route.snapshot.queryParams[ 'zeitBeginn' ]
              && date.split('-')[0] < this.route.snapshot.queryParams[ 'zeitEnde' ]
          ) {
            console.log('Poem liegt im beidseitig geschlossenen Intervall');
            return true;
          } else {
            return false;
          }
        } else if(
          this.route.snapshot.queryParams[ 'zeitBeginn' ] !== undefined
            && date.split('-')[0] > this.route.snapshot.queryParams[ 'zeitBeginn' ]
        ) {
          console.log('Groesser als Linker Intervall');
          return true;
        } else if(
          this.route.snapshot.queryParams[ 'zeitEnde' ] !== undefined
            && date.split('-')[0] < this.route.snapshot.queryParams[ 'zeitEnde' ]
        ) {
          console.log('Kleiner als Linker Intervall');
          return true;
        } else return false;
      }
    }

}
