/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/7/17.
 */

import { Component, OnInit } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';


@Component({
  moduleId: module.id,
  selector: 'rae-suche',
  templateUrl: 'suche.component.html'
})
export class SucheComponent implements OnInit{
  vocabulary: 'http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext';
  resourceTypesPath: 'http://130.60.24.65:3333/v1/resourcetypes?vocabulary=';
  myResources: Array<any>;
  myProperties: Array<any>;
  selectedResource: string;
  selectedProperty: string;
  firstInput: string;
  secondInput: string;
  concatenatedString: string;
  boolOperator: string;

  constructor(private http: Http, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    console.log(this.vocabulary);
    this.initialQuery(this.vocabulary, this.resourceTypesPath);
    this.concatenate('OneAnd','TwoAnd');
  }

  concatenate(firstInput: string, secondInput: string) {
    console.log(this.firstInput);
    const myOutput = this.firstInput + this.secondInput;
    console.log(myOutput);
    return myOutput;
}

  initialQuery(firstInput: string, secondInput: string) {
    this.concatenatedString = this.firstInput + this.secondInput;
    console.log(this.concatenatedString);
    return this.http.get('http://130.60.24.65:3333/v1/resourcetypes?vocabulary=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext')
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          console.log(data);
          //console.log(JSON.stringify(data.subjects, null, 4));
          return data.resourcetypes;
        }
      )
      .subscribe(response => this.myResources = response);
  }

  propertyQuery() {
    if (this.selectedResource !== undefined) {
      console.log(this.selectedResource);
      console.log('Funktion wird ausgeführt');
       // TODO: Encode URL that arrives here
      return this.http.get('http://130.60.24.65:3333/v1/propertylists?restype=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23Manuscript')
        .map(
          (lambda: Response) => {
            const data = lambda.json();
            console.log(data);
            //console.log(JSON.stringify(data.subjects, null, 4));
            return data.properties;
          }
        )
        .subscribe(response => this.myProperties = response);
    }
  }

}
