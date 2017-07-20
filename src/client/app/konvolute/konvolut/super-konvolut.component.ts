/**
 * Created by Reto Baumgartner (rfbaumgartner) on 29.06.17.
 */

import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { ExtendedSearch, KnoraProperty } from '../../shared/utilities/knora-api-params';

@Component({
  moduleId: module.id,
  selector: 'rae-super-konvolut',
  templateUrl: 'super-konvolut.component.html'
})
export class SuperKonvolutComponent implements OnInit {

  poems: Array<any>;

  // for testings
  searchQuery: string;

  konvolut_id: string;
  konvolut_type: string;
  private sub: any;
  private _esearch = new ExtendedSearch();

  constructor(private http: Http, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.konvolut_type = this.route.snapshot.url[ 0 ].path;

    this._esearch.filterByRestype = 'http://www.knora.org/ontology/text#Convolute';
    this._esearch.property = new KnoraProperty('http://www.knora.org/ontology/text#hasTitle', '!EQ', ' ');
    this._esearch.property = new KnoraProperty('http://www.knora.org/ontology/text#hasDescription', '!EQ', ' ');
    this._esearch.showNRows = 500;

    this.route.params
      .switchMap((params: Params) =>
        this.http.get(this._esearch.toString()))
      .map(response => response.json().subjects)
      .subscribe((res: Array<any>) => this.poems = res);

    this.konvolut_type = this.route.snapshot.url[ 0 ].path;
    this.sub = this.route.params.subscribe(params => {
      this.konvolut_id = params[ 'id' ];
    });

    console.log('search/schlaf?searchtype=fulltext');
  }

}
