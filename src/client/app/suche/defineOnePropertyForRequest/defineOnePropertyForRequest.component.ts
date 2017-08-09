import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rae-search-define-property',
  templateUrl: 'defineOnePropertyForRequest.component.html',
  styleUrls: [ 'defineOnePropertyForRequest.component.css' ]
})
export class DefineOnePropertyForRequestComponent implements OnInit {
  @Input() nthProperty: string;
  @Input() array: Array<any>;
  @Input() myProperties: Array<any>;
  @Input() availableboolOperators: Array<any>;
  @Input() nthResourceSearch: string;
  selectedProperty: string;
  propertyTriple = [''];
  selectedBoolOperator: string;
  searchForVal: string;
  ngOnInit() {
    console.log('This is SearchBox nr: ' + this.nthProperty + ' and property chosen number: ' );
  }

  public updatePropertyTriple() {
    // Updating Property
    this.propertyTriple[0] = this.nthResourceSearch;

    if ( this.propertyTriple[1] === 'undefined' ) {
      this.propertyTriple.push(this.nthProperty);
    } else {
      this.propertyTriple[1] = this.nthProperty;
    }

    if ( this.propertyTriple[2] === 'undefined' ) {
      this.propertyTriple.push(this.selectedProperty);
    } else {
      this.propertyTriple[2] = this.selectedProperty;
    }

    if ( this.propertyTriple[3] === 'undefined' ) {
      this.propertyTriple.push(this.selectedBoolOperator);
    } else {
      this.propertyTriple[3] = this.selectedBoolOperator;
    }

    if ( this.propertyTriple[4] === 'undefined' ) {
      this.propertyTriple.push(this.searchForVal);
    } else {
      this.propertyTriple[4] = this.searchForVal;
    }
    //console.log('PropertyTriple is: ' + this.propertyTriple);
    this.sendPropertyTripleBack.emit(this.propertyTriple);
  }

  @Output() sendPropertyTripleBack: EventEmitter<any> = new EventEmitter<any>();


}
