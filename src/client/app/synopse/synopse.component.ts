/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/7/17.
 */

import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params } from '@angular/router';

import { ExtendedSearch, KnoraProperty } from '../shared/utilities/knora-api-params';

@Component({
  moduleId: module.id,
  selector: 'rae-synopse',
  templateUrl: 'synopse.component.html'
})
export class SynopseComponent implements OnInit {

  poemsInSynopse: Array<any>;
  nHits: number;
  synopseTag: string;

  showText: boolean;

  columns: string;

  private sub: any;

  constructor(private http: Http, private route: ActivatedRoute) {
    this.showText = true;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.synopseTag = params['synopse'];
    });

    // TODO Parameter anpassen
    let searchParams = new ExtendedSearch();
    searchParams.filterByRestype = 'http://www.knora.org/ontology/text#Convolute';
    // searchParams.property = new KnoraProperty('http://www.knora.org/ontology/text#hasTitle', 'MATCH', this.synopseTag);
    searchParams.property = new KnoraProperty('http://www.knora.org/ontology/text#hasTitle', '!EQ', ' ');
    searchParams.property = new KnoraProperty('http://www.knora.org/ontology/text#hasDescription', '!EQ', ' ');
    searchParams.showNRows = 500;

    this.route.params
      .switchMap((params: Params) =>
        this.http.get(searchParams.toString()))
      .map(response => response.json())
      .subscribe((res: any) => {
        this.poemsInSynopse = res.subjects;
        this.nHits = res.nhits;
        console.log(res.nhits);
      });
  }

  setColumns(cols: number) {
    switch (cols) {
      case 1:
        this.columns = '93%';
        break;
      case 2:
        this.columns = '43%';
        break;
      case 3:
        this.columns = '26%';
        break;
    }
  }
}
