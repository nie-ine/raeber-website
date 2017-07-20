/**
 * Created by retobaumgartner on 06.06.17.
 */
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { ExtendedSearch, FulltextSearch, KnoraProperty } from '../../shared/utilities/knora-api-params';

@Component({
  moduleId: module.id,
  selector: 'rae-konvolut',
  templateUrl: 'konvolut.component.html'
})
export class KonvolutComponent implements OnInit {

  poems: Array<any>;

  // for testings
  searchQuery: string;

  konvolut_id: string;
  konvolut_type: string;
  private sub: any;

  constructor(private http: Http, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.konvolut_type = this.route.snapshot.url[ 0 ].path;

    let searchParams = new ExtendedSearch();
    searchParams.filterByRestype = 'http://www.knora.org/ontology/text#Convolute';
    searchParams.property = new KnoraProperty('http://www.knora.org/ontology/text#hasTitle', '!EQ', ' ');
    searchParams.property = new KnoraProperty('http://www.knora.org/ontology/text#hasDescription', '!EQ', ' ');
    searchParams.showNRows = 500;

    this.route.params
      .switchMap((params: Params) =>
        this.http.get(searchParams.toString()))
      .map(response => response.json().subjects)
      .subscribe((res: Array<any>) => this.poems = res);

    this.konvolut_type = this.route.snapshot.url[ 0 ].path;
    this.sub = this.route.params.subscribe(params => {
      this.konvolut_id = params[ 'konvolut' ];
    });

    console.log('search/schlaf?searchtype=fulltext');
  }

  // for testings
  searchForDoctor(fulltextQuery: string) {
    let searchParams = new FulltextSearch;
    searchParams.searchstring = fulltextQuery;
    this.http.get(searchParams.toString())
      .map(response => response.json().subjects)
      .subscribe(res => this.poems = res);
    console.log(searchParams.toString());
  }

  // for testings
  freeSearch() {
    this.http.get('http://knora.nie-ine.ch/v1/search/' + this.searchQuery)
      .map(response => response.json().subjects)
      .subscribe(res => this.poems = res);
    console.log('/search/' + this.searchQuery);
  }
}
