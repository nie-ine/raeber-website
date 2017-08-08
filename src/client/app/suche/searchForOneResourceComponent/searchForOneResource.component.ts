import { Component, Input, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { globalSearchVariableService } from './../globalSearchVariablesService';

@Component({
  moduleId: module.id,
  selector: 'rae-search-for-one-resource',
  templateUrl: 'searchForOneResource.component.html',
  styleUrls: [ 'searchForOneResource.component.css' ]
})
export class SearchForOneResourceComponent implements OnInit {


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
  arraySize: number;
  array = [
    1
  ];
  @Input() nthResourceSearch: number;
  @Input() myResources: Array<any>;

  constructor(private http: Http) {
  }

  ngOnInit() {
    console.log('This is resource Search nr: ' + this.nthResourceSearch);
    if( typeof this.myResources !== 'undefined') {
      console.log('ResourceArray: ' + this.myResources[0].label);
    }

  }

  increaseArrayElement() {
    this.arraySize = this.array[this.array.length - 1 ];
    this.arraySize += 1;
    this.array.push(this.arraySize);
    console.log('ResourceSearch: ' + this.nthResourceSearch + 'Constraint: ' + this.arraySize);
  }



  propertyQuery() {
    console.log('Property Query for Resource: ' + this.selectedResource);
    if (this.selectedResource !== undefined) {

      console.log('Path to request property:' + globalSearchVariableService.propertyListsQuery);
      this.encodedURL = encodeURIComponent(this.selectedResource);
      console.log('Selected resource:' + this.encodedURL);


      console.log('Funktion wird ausgeführt');
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

  chooseProperty() {
    console.log('SearchInstance ' + this.nthResourceSearch + ' chooses property ' + this.selectedProperty);
  }

  updateQuerySet(propertyTriple: Array<any>) {
    console.log('Event has triggered this function in parent component! Propertytriple: ' + propertyTriple);
  }
}
