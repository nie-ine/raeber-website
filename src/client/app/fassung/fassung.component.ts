/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/7/17.
 */
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { FulltextSearch } from '../shared/utilities/knora-api-params';
import { globalSearchVariableService } from '../suche/globalSearchVariablesService';

@Component({
  moduleId: module.id,
  selector: 'rae-fassung',
  templateUrl: 'fassung.component.html',
  styleUrls: [ 'fassung.component.css' ]
})
export class FassungComponent implements OnInit {
  creationDate = 'Freitag, 01 Juni 1979';
  modificationDate = 'Samstag, 13 Mai 2017';

  zeigeKonstituiert: boolean = true;
  zeigeDiplomatisch: boolean = false;

  fassung_tag: Array<string> = [
    'Sonne',
    'Wind',
    'Wasser'
  ];
  // TODO dynamisieren

  pageIRIs: Array<string>;

  // for testings
  searchQuery: string;

  poem_id: string;
  konvolut_id: string;
  konvolut_type: string;
  konvolutIRI = 'http://rdfh.ch/kuno-raeber/34FIMLqvTZqHv4GUaaohKw';

  nextPoem: string = '219-brunnen'; // TODO
  prevPoem: string = '221-baum'; // TODO

  poem_resizable: boolean;
  show_register: boolean;

  private sub: any;
  private sub2: any;

  constructor(private http: Http, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.poem_resizable = true;
    this.show_register = true;

    this.konvolut_type = this.route.snapshot.url[ 0 ].path;

    let searchParams = new FulltextSearch;
    searchParams.searchstring = 'e';

    this.konvolut_type = this.route.snapshot.url[ 0 ].path;
    this.sub = this.route.params.subscribe(params => {
      this.konvolut_id = params[ 'konvolut' ];
      this.poem_id = params[ 'fassung' ];
    });

    this.sub2 = this.http.get(globalSearchVariableService.API_URL + '/resources/' +
      encodeURIComponent('http://rdfh.ch/kuno-raeber/R-eJHE7NQnCXElwfZ5o95g'))
      .map(result => result.json())
      .subscribe(res => {
        this.pageIRIs = res.props['http://www.knora.org/ontology/kuno-raeber#isOnPage'].values;
      });
  }
}
