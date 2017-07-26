/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/7/17.
 */

import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { globalSearchVariableService } from './globalSearchVariablesService';



@Component({
  moduleId: module.id,
  selector: 'rae-suche',
  templateUrl: 'suche.component.html'
})
export class SucheComponent implements OnInit{
  vocabulary: 'http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext';

  myResources: Array<any>;
  myProperties: Array<any>;
  searchResult: Array<any>;
  selectedResource: string;
  selectedProperty: string;
  firstInput: string;
  secondInput: string;
  concatenatedString: string;
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

  constructor(private http: Http, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    console.log(this.vocabulary);
    this.initialQuery(this.vocabulary, this.resourceTypesPath);
  }

  initialQuery(firstInput: string, secondInput: string) {
    this.concatenatedString = this.firstInput + this.secondInput;
    console.log(this.concatenatedString);
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

      console.log('Path to request property:' + globalSearchVariableService.propertyListsQuery);
      this.encodedURL = encodeURIComponent(this.selectedResource);
      console.log('Selected resource:' + this.encodedURL);


      console.log('Funktion wird ausgeführt');
       // TODO: Encode URL that arrives here
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
    // Es wird hier nicht angezeigt wegen der Raute
    console.log(
      'Final extended search URl: ' + this.query);
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

}
