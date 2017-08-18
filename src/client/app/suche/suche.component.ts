/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/7/17.
 */

import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { globalSearchVariableService } from './globalSearchVariablesService';
import {isUndefined} from "util";
import {forEach} from "@angular/router/src/utils/collection";



@Component({
  moduleId: module.id,
  selector: 'rae-suche',
  templateUrl: 'suche.component.html'
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
  isAlreadyInArray = 0;
  //setOfAllQueries: Array<any>; //{numberOfSearchBox: '', numberOfProperty: '', propertyIRI: '', logicalOperator: '', searchVal: ''}
  helperMap = new Map();
  mapOfAllQueries = new Map();
  count = 0;
  numberOfPropertiesInSearchBox = '';
  str: string;
  value: string;
  keys: Array<any>;
  finalQueryArray= [''];
  currentSearchBox = '1';
  allSearchResults: Array<any>;

  constructor(private http: Http) {
  }

  ngOnInit() {
    //console.log(this.vocabulary);
    this.initialQuery(this.vocabulary, this.resourceTypesPath);
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

  propertyQuery() {
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
          this.searchForVal;
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
    this.arraySize = this.array[this.array.length - 1 ];
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
        if(this.keys[this.k][1] === '1') {
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
            + value[1][1];
        } else {
          console.log('Add additional property');
          this.finalQueryArray[this.keys[this.k][0] - 1]
            += globalSearchVariableService.extendedProperty
            + encodeURIComponent(value[0])
            + globalSearchVariableService.compareOperator
            + value[1][0]
            + globalSearchVariableService.searchval
            + value[1][1];
        }
        this.k++;
        console.log(value[0]);
        for(this.i = 0; this.i < value[1].length; this.i++) {
          console.log(value[1][this.i]);
        }
      }
    );

  }

  executeFinalQueries() {
    console.log(this.finalQueryArray);
    for(this.i = 0; this.i < this.finalQueryArray.length; this.i ++) {
      this.performQuery(this.finalQueryArray[this.i]);
    }
  }
  performQuery(query: string) {
    return this.http.get(query)
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          //console.log(data);
          this.k = 0;
          if(data.subjects !== undefined) {
            if(this.allSearchResults === undefined) {
              this.allSearchResults = [];
            }
            this.allSearchResults.push.apply(this.allSearchResults,data.subjects);
          }
          console.log(this.allSearchResults);
          return data.subjects;
        }
      )
      .subscribe(response => this.searchResult = response);
  }

}
