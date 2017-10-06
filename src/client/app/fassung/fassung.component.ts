/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/7/17.
 */
import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { FulltextSearch } from '../shared/utilities/knora-api-params';

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

  pages: Array<any> = ['page1', 'page2'];
  // TODO dynamisieren

  // for testings
  searchQuery: string;

  poem_id: string;
  konvolut_id: string;
  konvolut_type: string;
  konvolutIRI = 'http://rdfh.ch/kuno-raeber/UP1rlPeKR26d8YZPnTo1IQ';

  nextPoem: string = '219-brunnen'; // TODO
  prevPoem: string = '221-baum'; // TODO

  poem_resizable: boolean;
  show_register: boolean;

  private sub: any;

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
  }
}
