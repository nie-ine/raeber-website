/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/7/17.
 */

import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { globalSearchVariableService } from './globalSearchVariablesService';
import {isUndefined} from "util";



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
  isAlreadyInArray = 0;
  //setOfAllQueries: Array<any>; //{numberOfSearchBox: '', numberOfProperty: '', propertyIRI: '', logicalOperator: '', searchVal: ''}
  setOfAllQueries: any[][];
  count = 0;
  numberOfParams: number;

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
    // Case: setOfAllQueries it totally empty:
    this.numberOfParams = propertyTriple.length;
    if ( this.count === 0) {
      this.setOfAllQueries = propertyTriple;
      this.count += 1;
    } else {
      for( this.i = 0; this.i < this.numberOfParams; this.i++ ){
        this.setOfAllQueries.push(propertyTriple[ this.i ]);
      }
      this.setOfAllQueries.push(propertyTriple);
      /*for (this.i = 0; this.i < this.setOfAllQueries.length; this.i++) {
            // Check if entry exists for respective searchox
            if ( this.setOfAllQueries[this.i] === propertyTriple[0]) {
              this.isAlreadyInArray = 1;
              this.setOfAllQueries[this.i] = propertyTriple;
              console.log('Is already in Set of Searchboxes');
            }
            if( this.i ===  this.setOfAllQueries.length && this.isAlreadyInArray === 0) {
              this.setOfAllQueries.push(propertyTriple);
            }
          }*/
    }
    console.log('----------');
    for (this.i = 0; this.i < this.setOfAllQueries.length; this.i += this.numberOfParams) {
      console.log(
        'SearchBox Number: '   + this.setOfAllQueries[ this.i ]      + '\n'
        + 'Property Number: '  + this.setOfAllQueries[ this.i + 1 ]  + '\n'
        + 'Property IRI: '     + this.setOfAllQueries[ this.i + 2 ]  + '\n'
        + 'Compare Operator: ' + this.setOfAllQueries[ this.i + 3 ]  + '\n'
        + 'Search Value: ' + this.setOfAllQueries[ this.i + 4 ]  + '\n'
        + '\n\n' );
    }
    console.log('----------');

    //console.log('Event has triggered this function in Root Suche Component. Propertytriple: ' + propertyTriple);
  }


}
