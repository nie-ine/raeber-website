/**
 * Created by retobaumgartner on 10.10.17.
 */
import { Component, Input, OnChanges } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  moduleId: module.id,
  selector: 'rae-fassung-steckbrief-fassung',
  template: '<span></span>'
})
export class FassungSteckbriefFassungComponent implements OnChanges {

  @Input() fassungIRI: Array<string>;

  fassung: Array<any>;


  constructor(private http: Http) {}

  ngOnChanges() {
    // TODO: fassungen verlinken
    this.fassung = [{'konvolutTitle': 'hoffnung', 'title': 'stirbt_zuletzt', 'iri': this.fassungIRI}];
  }
}
