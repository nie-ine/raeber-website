/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/7/17.
 */

import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  moduleId: module.id,
  selector: 'rae-navigationsleiste',
  templateUrl: './navigationsleiste.component.html'
})
export class NavigationsleisteComponent implements OnInit {
  constructor( private http: Http, private route: ActivatedRoute, private location: Location) {
    this.route.params.subscribe(params => console.log(params));
  }

  ngOnInit() {
    this.createLinkToSearch();
    console.log(this.route.snapshot.queryParams[ 'wort' ]);
  }
  createLinkToSearch() {
      //console.log(this.route._routerState.snapshot.url);
      if(this.route._routerState.snapshot.url === '/suche') {
        return 'resetSuche';
      } else return 'suche';
  }

}
