import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { globalSearchVariableService } from './globalSearchVariablesService';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';


@Component({
  moduleId: module.id,
  selector: 'rae-suche',
  templateUrl: 'suche.component.html',
  styleUrls: [ 'suche.component.css' ]
})
export class SucheComponent implements OnInit {
  vocabulary: 'http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext';
  numberOfComponents = 1;

  myResources: Array<any>;
  myProperties: Array<any>;
  searchResult: Array<any>;
  selectedResource: string;
  selectedProperty: string;
  boolOperator: string;
  encodedURL: string;
  searchForVal: string;
  query: string;
  availableboolOperators = [
    {name: 'equal to', operator: 'EQ'},
    {name: 'not equal to', operator: '!EQ'},
    {name: 'greater than', operator: 'GT'},
    {name: 'greater or equal', operator: 'GT_EQ'},
    {name: 'lower than', operator: 'LT'},
    {name: 'lower or equal than', operator: 'LT_EQ'},
    {name: 'exists', operator: 'EXISTS'},
    {name: 'match', operator: 'MATCH'},
    {name: 'like', operator: 'LIKE'},
    {name: '!like', operator: '!LIKE'},
    {name: 'match_boolean', operator: 'MATCH_BOOLEAN'}
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
  finalQueryArray = [''];
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
  setOfAllSearchResults = new Set();
  arg: AbstractControl;
  rightProperty: string;
  responseArray: Array<any>;
  suchmaskeKonvolutIRIMapping = [
    {
      'konvolut': 'notizbuch-1979',
      'suchmaskeKonvolutName': 'notizbuch79',
      'enabled': 'true',
      'IRI': 'undefined',
      'memberPoems': this.setOfPoemsNotizbuch79
    },
    {
      'konvolut': 'notizbuch-1979-1982',
      'suchmaskeKonvolutName': 'notizbuch7982',
      'enabled': 'true',
      'IRI': 'undefined',
      'memberPoems': this.setOfPoemsNotizbuch7982
    },
    {
      'konvolut': 'notizbuch-1980-1988',
      'suchmaskeKonvolutName': 'notizbuch8088',
      'enabled': 'true',
      'IRI': 'undefined',
      'memberPoems': this.setOfPoemsNotizbuch8088
    },
    {
      'konvolut': 'manuskripte-1979',
      'suchmaskeKonvolutName': 'manuskript79',
      'enabled': 'true',
      'IRI': 'undefined',
      'memberPoems': this.setOfPoemsManuskript79},
    {
      'konvolut': 'manuskripte-1979-1983',
      'suchmaskeKonvolutName': 'manuskript7983',
      'enabled': 'true',
      'IRI': 'undefined',
      'memberPoems': this.setOfPoemsManuskript7983
    },
    {
      'konvolut': 'karten-1984',
      'suchmaskeKonvolutName': 'manuskriptKarten',
      'enabled': 'true',
      'IRI': 'undefined',
      'memberPoems': this.setOfPoemsManuskriptKarten},
    {
      'konvolut': 'typoskripte-1979',
      'suchmaskeKonvolutName': 'typoskript79',
      'enabled': 'true',
      'IRI': 'undefined',
      'memberPoems': this.setOfPoemsTyposkript79},
    {
      'konvolut': 'typoskripte-1979-spez',
      'suchmaskeKonvolutName': 'typoskript79Spez',
      'enabled': 'true',
      'IRI': 'undefined',
      'memberPoems': this.setOfPoemsTyposkript79Spez
    },
    {
      'konvolut': 'typoskripte-1983',
      'suchmaskeKonvolutName': 'typoskript83',
      'enabled': 'true',
      'IRI': 'undefined',
      'memberPoems': this.setOfPoemsTyposkript83},
    {
      'konvolut': 'gesicht-im-mittag',
      'suchmaskeKonvolutName': 'druckGesicht',
      'enabled': 'true',
      'IRI': 'undefined',
      'memberPoems': this.setOfPoemsdruckGesicht},
    {
      'konvolut': 'die-verwandelten-schiffe',
      'suchmaskeKonvolutName': 'druckSchiffe',
      'enabled': 'true',
      'IRI': 'undefined',
      'memberPoems': this.setOfPoemsdruckSchiffe
    },
    {
      'konvolut': 'gedichte',
      'suchmaskeKonvolutName': 'druckGedichte',
      'enabled': 'true',
      'IRI': 'undefined',
      'memberPoems': this.setOfPoemsdruckGedichte},
    {
      'konvolut': 'flussufer',
      'suchmaskeKonvolutName': 'druckFlussufer',
      'enabled': 'true',
      'IRI': 'undefined',
      'memberPoems': this.setOfPoemsdruckFlussufer},
    {
      'konvolut': 'reduktionen',
      'suchmaskeKonvolutName': 'druckReduktionen',
      'enabled': 'true',
      'IRI': 'undefined',
      'memberPoems': this.setOfPoemsdruckReduktionen}
  ];
  poemResTypes = [
    'http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber%23PoemNote',
    'http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber%23HandwrittenPoem',
    'http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber%23PostCardPoem',
    'http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber%23TypewrittenPoem',
    'http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber%23PublicationPoem'
  ];

  constructor(private http: Http, private route: ActivatedRoute, private location: Location) {
    this.route.params.subscribe(params => console.log(params));
  }

  handleSearchEvent(arg: AbstractControl) {
    //console.log(arg);
    this.arg = arg;
    this.updateSuchmaskeKonvolutIRIMapping(arg);
    //Send String to Parser:
    this.inputSearchStringToBeParsed = arg.get('suchwortForm').value.suchwortInput;
    this.location.replaceState('/suche/' + this.inputSearchStringToBeParsed);
    console.log(this.suchmaskeKonvolutIRIMapping);
  }

  ngOnInit() {
    for(this.o = 0; this.o < this.suchmaskeKonvolutIRIMapping.length; this.o++) {
      this.getKonvolutIRI(this.suchmaskeKonvolutIRIMapping[this.o].konvolut, this.o);
    }
    this.initialQuery();
    if (!this.inputSearchStringToBeParsed) {
      this.inputSearchStringToBeParsed = this.route.snapshot.params['queryParameters'];
      console.log('Queryparameters: ' + this.inputSearchStringToBeParsed);
    }
    if (this.allSearchResults === undefined) {
      this.numberOfSearchResults = 0;
    } else {
      this.numberOfSearchResults = this.allSearchResults.length;
    }
  }

  initialQuery() {
    return this.http.get
    (
      globalSearchVariableService.API_URL +
      globalSearchVariableService.resourceTypesPath +
      globalSearchVariableService.initialVocabulary
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          console.log(data);
          return data.resourcetypes;
        }
      )
      .subscribe(response => this.myResources = response);
  }

  propertyQuery(): Subscription {
    if (this.selectedResource !== undefined) {

      //console.log('Path to request property:' + globalSearchVariableService.propertyListsQuery);
      this.encodedURL = encodeURIComponent(this.selectedResource);
      //console.log('Selected resource:' + this.encodedURL);

      return this.http.get(globalSearchVariableService.API_URL + globalSearchVariableService.propertyListsQuery + this.encodedURL)
        .map(
          (lambda: Response) => {
            const data = lambda.json();
            console.log(data);
            return data.properties;
          }
        )
        .subscribe(response => this.myProperties = response);
    } else {
      return null;
    }
  }


  finalQuery() {
    this.query = globalSearchVariableService.API_URL +
      globalSearchVariableService.extendedSearch +
      encodeURIComponent(this.selectedResource) +
      globalSearchVariableService.extendedProperty +
      encodeURIComponent(this.selectedProperty) +
      globalSearchVariableService.compareOperator +
      this.boolOperator +
      globalSearchVariableService.searchval +
      encodeURIComponent(this.searchForVal);
    //console.log(
    //'Final extended search URl: ' + this.query);
    return this.http.get(this.query)
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          console.log(data);
          return data.subjects;
        }
      )
      .subscribe(response => this.searchResult = response);
  }

  increaseNumberOfComponents() {
    this.numberOfComponents += 1;
    console.log(this.numberOfComponents);
    console.log(typeof this.arraySize);
  }

  increaseArrayElement() {
    this.arraySize = this.array[this.array.length - 1];
    this.arraySize += 1;
    this.array.push(this.arraySize);
    console.log(this.arraySize);
  }

  updateQuerySet(propertyTriple: Array<any>) {
    this.k = 0;
    // Case: setOfAllQueries it totally empty:
    console.log('PropertyTriple: ' + propertyTriple);
    console.log('Resource: ' + this.selectedResource);
    this.mapOfAllQueries.set(
      propertyTriple[0].toString() + propertyTriple[1].toString(), [
        propertyTriple[2], [
          propertyTriple[3], propertyTriple[4]
        ]
      ]
    );
    this.str = JSON.stringify(this.mapOfAllQueries, null, 4);
    console.log(this.str);
    //Final list of Queries:
    this.keys = Array.from(this.mapOfAllQueries.keys());
    console.log(this.keys);
    this.mapOfAllQueries.forEach(
      value => {
        if (this.keys[this.k][1] === '1') {
          this.searchTerm = value[1][1];
          console.log('Add first property');
          this.finalQueryArray[this.keys[this.k][0] - 1] =
            globalSearchVariableService.API_URL
            + globalSearchVariableService.extendedSearch
            + encodeURIComponent(propertyTriple[5])
            + globalSearchVariableService.extendedProperty
            + encodeURIComponent(value[0])
            + globalSearchVariableService.compareOperator
            + value[1][0]
            + globalSearchVariableService.searchval
            + encodeURIComponent(value[1][1]);
        } else {
          console.log('Add additional property');
          this.finalQueryArray[this.keys[this.k][0] - 1]
            += globalSearchVariableService.extendedProperty
            + encodeURIComponent(value[0])
            + globalSearchVariableService.compareOperator
            + value[1][0]
            + globalSearchVariableService.searchval
            + encodeURIComponent(value[1][1]);
        }
        this.k++;
        console.log(value[0]);
        for (this.i = 0; this.i < value[1].length; this.i++) {
          console.log(value[1][this.i]);
        }
      }
    );

  }

  executeFinalQueriesOld() {
    //Old generic Search:
    console.log('Execute final query old');
    this.allSearchResults = undefined;
    if (this.finalQueryArray) {
      this.allSearchResults = [];
      console.log(this.finalQueryArray);
      for (this.i = 0; this.i < this.finalQueryArray.length; this.i++) {
        this.performQueryOld(this.finalQueryArray[this.i]);
      }
    }
  }

  executeFinalQueries() {
    //this.executeFinalQueriesOld();
    this.allSearchResults = [];
    this.setOfAllSearchResults.clear();
    if (!this.queries) {
      console.log('No query defined');
    } else {
      this.allSearchResults = undefined;
      console.log('execute simple full text search');
      this.translateQueriesReturnedFromParserToKnoraRequests(this.queries);
    }
  }


  performQueryOld(query: string) {
    return this.http.get(query)
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          console.log(data);
          this.k = 0;
          if (data.subjects !== undefined) {
            if (this.allSearchResults === undefined) {
              this.allSearchResults = [];
            }
            this.allSearchResults.push.apply(this.allSearchResults, data.subjects);
            /*
             if(data.obj_id !== undefined) {
             this.allSearchResults.push.apply(this.allSearchResults, data.subjects);
             } else {
             console.log('Keine Treffer fuer diese Suchanzeige');
             }*/
            if (this.allSearchResults === undefined) {
              this.numberOfSearchResults = 0;
            } else {
              this.numberOfSearchResults = this.allSearchResults.length;
            }
          }
          console.log(this.allSearchResults);
          return data.subjects;
        }
      )
      .subscribe(response => this.searchResult = response);
  }

  translateQueriesReturnedFromParserToKnoraRequests(queries: Array<any>) {
    this.str = JSON.stringify(queries, null, 4);
    console.log('Queries: ' + this.str);
    this.numberOfQueries = 0;
    this.temporarySearchResults = undefined;
    for (this.i = 0; this.i < queries.length; this.i++) {
      this.firstTermAfterOr = true;
      console.log('Request Group nr: ' + this.i);
      this.finalTemporaryResults = undefined;
      this.temporarySearchResults = undefined;
      for (this.j = 0; this.j < queries[this.i].length; this.j++) {
        if (this.j !== 0) {
          console.log('And merge with?');
        }
        this.numberOfQueries += 1;
        console.log('Search for: '
          + queries[this.i][this.j].searchString
          + ' in: ' + queries[this.i][this.j].where);
        this.searchTerm = queries[this.i][this.j].searchString;
        this.performQuery(this.searchTerm, queries[this.i][this.j].where, this.firstTermAfterOr, this.i, queries[this.i].length);
        this.firstTermAfterOr = false;
      }
    }
  }

  getQueries(queries: Array<any>) {
    this.queries = queries;
  }

  performQuery(searchTerm: string, location: string, firstTermAfterOr: boolean, searchGroup: number, numberOfTermsInSearchGroup: number) {
    for(this.m = 0; this.m < this.poemResTypes.length; this.m ++) {
      if (location === 'anywhere') {
        this.performSearchInTitle(
          searchTerm,
          firstTermAfterOr,
          searchGroup,
          numberOfTermsInSearchGroup,
          this.poemResTypes[this.m]);
      }
    }
  }

  performSearchInTitle(searchTerm: string,
                       firstTermAfterOr: boolean,
                       searchGroup: number,
                       numberOfTermsInSearchGroup:
                         number,
                       poemResType: string) {
      return this.http.get(
        globalSearchVariableService.API_URL +
        globalSearchVariableService.extendedSearch +
        poemResType +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasTitle' +
        '&compop=LIKE' +
        '&searchval=' +
        encodeURIComponent(searchTerm) +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fhuman%23hasCreationDate' +
        '&compop=!EQ&searchval=GREGORIAN:2217-01-27' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fknora-base%23seqnum' +
        '&compop=!EQ&searchval=' + 1 + '&show_nrows=' + 2000)
        .map(
          (lambda: Response) => {
            const data = lambda.json();
            console.log(data);
            if (data.subjects[0] !== undefined) {
              this.addToTemporarySearchResultArray(data.subjects, firstTermAfterOr, searchGroup, numberOfTermsInSearchGroup);
            } else {
              console.log('Keine Treffer fuer diese Suche');
            }
            return data.properties;
          }
        )
        .subscribe(response => this.myProperties = response);

  }

  // For more statements between the ORs
  // Scenarios: 2 times the same word, one word without output
  addToTemporarySearchResultArray(searchResults: Array<any>,
                                  firstTermAfterOr: boolean,
                                  searchGroup: number,
                                  numberOfTermsInSearchGroup: number) {
    //console.log('Add to temporary Search Results and only take one of the duplicates');
    //console.log('firstTermAfterOr: ' + firstTermAfterOr);
    //console.log(searchResults);
    //console.log(this.temporarySearchResults);
    if (searchResults !== undefined) {
      //if (this.temporarySearchResults === undefined) {
      //  this.temporarySearchResults = [];
      //  this.temporarySearchResults[searchGroup] = searchResults;
      //}
      //if (this.temporarySearchResults[searchGroup] === undefined) {
      //  this.temporarySearchResults[searchGroup] = searchResults;
        //console.log(this.temporarySearchResults);
     // } //else {
        //for (this.l = 0; this.l < searchResults.length; this.l++) {
          //console.log('SearchGroup:' + searchGroup);
          //for (this.m = 0; this.m < this.temporarySearchResults[searchGroup].length; this.m++) {
            //if (searchResults[this.l].obj_id === this.temporarySearchResults[searchGroup][this.m].obj_id) {
              //console.log('found duplicate in temporary array');
              //if (this.finalTemporaryResults === undefined) {
              //  this.finalTemporaryResults = [];
              //}
              //this.finalTemporaryResults[this.finalTemporaryResults.length] = searchResults[this.l];
            //}
          //}
        //}
      //}
      //TODO: consider more than 2 searchTerms between ORs
      //Following statement for one search without output
      //if (searchResults.length === 0 && this.temporarySearchResults !== undefined) {
      //  this.addToFinalSearchResultArray(searchResults);
      //}
      //console.log('Final Temporary Search Results: ');
      //console.log(this.finalTemporaryResults);
      this.addToFinalSearchResultArray(searchResults);
      //console.log('Number of terms in searchgroup: ' + numberOfTermsInSearchGroup);
      //if (numberOfTermsInSearchGroup === 1) {
      //  this.addToFinalSearchResultArray(searchResults);
      //}
    }
  }

  addToFinalSearchResultArray(searchResults: Array<any>) {
    //console.log('Add to final Search Results');
    //console.log(searchResults);
    if (searchResults !== undefined && searchResults.length !== 0) {
        if(this.allSearchResults === undefined) {
          this.allSearchResults = [];
        }
        for (let result of searchResults) {
            this.performPoemQuery(
              result.obj_id,
              result.value[3],
              result.value[1],
              result.value[2]);
          }
    }
  }

  updateSuchmaskeKonvolutIRIMapping(arg: AbstractControl) {
    console.log(arg);
    if (
      arg.get('notizbuchForm').pristine
      && arg.get('druckForm').pristine
      && arg.get('materialienForm').pristine
      && arg.get('typoskriptForm').pristine
      && arg.get('manuskriptForm').pristine
    ) {
      console.log('Perform Search in all convolutes');
    } else {
      console.log('Gehe durch jedes Konvolut');
      this.suchmaskeKonvolutIRIMapping[0].enabled = arg.get('notizbuchForm').controls.notizbuch79.value;
      this.suchmaskeKonvolutIRIMapping[1].enabled = arg.get('notizbuchForm').controls.notizbuch7982.value;
      this.suchmaskeKonvolutIRIMapping[2].enabled = arg.get('notizbuchForm').controls.notizbuch8088.value;
      this.suchmaskeKonvolutIRIMapping[3].enabled = arg.get('manuskriptForm').controls.manuskript79.value;
      this.suchmaskeKonvolutIRIMapping[4].enabled = arg.get('manuskriptForm').controls.manuskript7983.value;
      this.suchmaskeKonvolutIRIMapping[5].enabled = arg.get('manuskriptForm').controls.manuskriptKarten.value;
      this.suchmaskeKonvolutIRIMapping[6].enabled = arg.get('typoskriptForm').controls.typoskript79.value;
      this.suchmaskeKonvolutIRIMapping[7].enabled = arg.get('typoskriptForm').controls.typoskript79Spez.value;
      this.suchmaskeKonvolutIRIMapping[8].enabled = arg.get('typoskriptForm').controls.typoskript83.value;
      this.suchmaskeKonvolutIRIMapping[9].enabled = arg.get('druckForm').controls.druckGesicht.value;
      this.suchmaskeKonvolutIRIMapping[10].enabled = arg.get('druckForm').controls.druckSchiffe.value;
      this.suchmaskeKonvolutIRIMapping[11].enabled = arg.get('druckForm').controls.druckGedichte.value;
      this.suchmaskeKonvolutIRIMapping[12].enabled = arg.get('druckForm').controls.druckFlussufer.value;
      this.suchmaskeKonvolutIRIMapping[13].enabled = arg.get('druckForm').controls.druckReduktionen.value;
      for (this.k = 0; this.k < this.suchmaskeKonvolutIRIMapping.length; this.k++) {
        if (this.suchmaskeKonvolutIRIMapping[this.k].enabled) {
            console.log('check if poems in result is in one set of allowed poems in: ' + this.suchmaskeKonvolutIRIMapping[this.k].konvolut);
          }
        }
      }
    }




  getKonvolutIRI(konvolut_id: string, i: number) {
    console.log('Get IRI Component for Konvolut - ID: ' + konvolut_id);
    if (konvolut_id === 'notizbuch-1979') {
      this.performQueryToGetIRI(
        '%23PoemNotebook' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=EQ' +
        '&searchval=Notizbuch%201979',i);
    } else if (konvolut_id === 'notizbuch-1979-1982') {
      this.performQueryToGetIRI(
        '%23PoemNotebook' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Notizbuch%201979-82',i);
    } else if (konvolut_id === 'notizbuch-1980-1988') {
      this.performQueryToGetIRI(
        '%23PoemNotebook' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Notizbuch%201980-88',i);
    } else if (konvolut_id === 'notizbuch-1965-80') {
      this.performQueryToGetIRI(
        '%23PoemNotebook' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Notizbuch%201965-80',i);
    } else if (konvolut_id === 'manuskripte-1979') {
      this.performQueryToGetIRI(
        '%23PoemManuscriptConvolute' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Manuskripte%201979',i);
    } else if (konvolut_id === 'manuskripte-1979-1983') {
      this.performQueryToGetIRI(
        '%23PoemManuscriptConvolute' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Manuskripte%201979-83',i);
    } else if (konvolut_id === 'karten-1984') {
      this.performQueryToGetIRI(
        '%23PoemManuscriptConvolute' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Karten%201984',i);
    } else if (konvolut_id === 'karten-1984') {
      this.performQueryToGetIRI(
        '%23PoemManuscriptConvolute' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Karten%201984',i);
    } else if (konvolut_id === 'typoskripte-1979') {
      this.performQueryToGetIRI(
        '%23PoemTypescriptConvolute' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=EQ' +
        '&searchval=Typoskripte%201979',i);
    }
    if (konvolut_id === 'typoskripte-1979-spez') {
      this.performQueryToGetIRI(
        '%23PoemTypescriptConvolute' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=EQ' +
        '&searchval=Typoskripte%201979-spez',i);
    } else if (konvolut_id === 'typoskripte-1983') {
      this.performQueryToGetIRI(
        '%23PoemTypescriptConvolute' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=EQ' +
        '&searchval=Typoskripte%201983',i);
    } else if (konvolut_id === 'gesicht-im-mittag') {
      this.performQueryToGetIRI(
        '%23PrintedPoemBookPublication' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=gesicht',i);
    } else if (konvolut_id === 'die-verwandelten-schiffe') {
      this.performQueryToGetIRI(
        '%23PrintedPoemBookPublication' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Schiffe',i);
    } else if (konvolut_id === 'gedichte') {
      this.performQueryToGetIRI(
        '%23PrintedPoemBookPublication' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=GEDICHTE%201960',i);
    } else if (konvolut_id === 'flussufer') {
      this.performQueryToGetIRI(
        '%23PrintedPoemBookPublication' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Flussufer',i);
    } else if (konvolut_id === 'reduktionen') {
      this.performQueryToGetIRI(
        '%23PrintedPoemBookPublication' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Reduktionen',i);
    } else if (konvolut_id === 'abgewandt-zugewandt-hochdeutsche-gedichte') {
      this.performQueryToGetIRI(
        '%23PrintedPoemBookPublication' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Hochdeutsche',i);
    } else if (konvolut_id === 'abgewandt-zugewandt-alemannische-gedichte') {
      this.performQueryToGetIRI(
        '%23PrintedPoemBookPublication' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Alemannische',i);
    } else if (konvolut_id === 'verstreutes') {
      this.performQueryToGetIRI(
        '%23PolyAuthorPublicationConvolute' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Verstreutes',i);
    } else if (konvolut_id === 'tagebuecher') {
      this.performQueryToGetIRI(
        '%23DiaryConvolute' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Tagebuch',i);
    } else if (konvolut_id === 'tagebuecher-2') {
      this.performQueryToGetIRI(
        '%23DiaryConvolute' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=LIKE' +
        '&searchval=Tagebuch',i);
    }
  }

  performQueryToGetIRI(queryPart: string, i: number) {
    return this.http.get
    (
      globalSearchVariableService.API_URL +
      globalSearchVariableService.extendedSearch +
      globalSearchVariableService.initialVocabulary +
      queryPart
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          console.log(data);
          this.setOfPerformedQueries.add(globalSearchVariableService.API_URL +
            globalSearchVariableService.extendedSearch +
            globalSearchVariableService.initialVocabulary +
            queryPart);
          if ( data.subjects[0] !== undefined) {
            this.setOfKonvolutIRIs.add(data.subjects[0].obj_id);
            this.suchmaskeKonvolutIRIMapping[i].IRI = data.subjects[0].obj_id;
            console.log(this.suchmaskeKonvolutIRIMapping);
            this.rightProperty = '';
            this.performQueryToGetAllowedPoems(data.subjects[0].obj_id,data.subjects[0].iconlabel, this.rightProperty, i);
          }
          console.log('alle Konvolutinformationen');
          console.log(this.setOfKonvolutIRIs);
            return null;
        }
      )
      .subscribe(response => this.responseArray = response);
  }



  performQueryToGetAllowedPoems(queryPart: string, konvolutType: string, rightProperty: string, i: number) {
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
          console.log(data);
          for(this.l = 0; this.l < data.nodes.length; this.l ++) {
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
            } else if (konvolutType === 'poly-author publication convolute') {
              rightProperty = 'http://www.knora.org/ontology/kuno-raeber#PublicationPoem';
              //console.log('Right Property: ' + rightProperty);
            }
            if(
              data.nodes[this.l].resourceClassIri === rightProperty
            ) {
              //this.setOfAlowedPoemIRIs.add(data.nodes[this.l].resourceIri);
              this.suchmaskeKonvolutIRIMapping[i].memberPoems.add(data.nodes[this.l].resourceIri);
            }
          }
          //console.log(this.setOfAlowedPoemIRIs);
          return null;
        }
      )
      .subscribe(response => this.responseArray = response);

  }

  performPoemQuery(poemIRI: string, titel: string, date: string, seqnum: string) {
    return this.http.get
    (
      globalSearchVariableService.API_URL +
      '/resources/' +
      encodeURIComponent(poemIRI)
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          this.performTextQuery(
            data.props['http://www.knora.org/ontology/kuno-raeber#hasEdition'].values[0],
            poemIRI,
            titel,
            date,
            seqnum);
          return data.resourcetypes;
        }
      )
      .subscribe(response => this.responseArray = response);
  }
  performTextQuery(editionIRI: string, poemIRI: string, titel: string, date: string, seqnum: string) {
    //console.log('get Text: ');
    return this.http.get
    (
      globalSearchVariableService.API_URL +
      '/resources/' +
      encodeURIComponent(editionIRI)
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          if(!this.setOfAllSearchResults.has(poemIRI)) {
            this.setOfAllSearchResults.add(poemIRI);
            if (this.allSearchResults[this.allSearchResults.length] === undefined) {
              this.allSearchResults[this.allSearchResults.length] = [];
              this.allSearchResults[this.allSearchResults.length - 1][0] = titel;
              this.allSearchResults[this.allSearchResults.length - 1][1] = date;
              this.allSearchResults[this.allSearchResults.length - 1][2]
                = data.props['http://www.knora.org/ontology/text#hasContent'].values[0].utf8str;
              this.allSearchResults[this.allSearchResults.length - 1][3] = poemIRI;
              this.allSearchResults[this.allSearchResults.length - 1][4] = seqnum;
              this.numberOfSearchResults += 1;
            }
          }
          return null;
        }
      )
      .subscribe(response => this.responseArray = response);
  }

}
