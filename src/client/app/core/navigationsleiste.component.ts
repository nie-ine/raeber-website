/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/7/17.
 */

import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { globalSearchVariableService } from '../suche/globalSearchVariablesService';

@Component({
  moduleId: module.id,
  selector: 'rae-navigationsleiste',
  templateUrl: './navigationsleiste.component.html'
})
export class NavigationsleisteComponent implements OnInit {
  abgewandtZugewandtNachwortIri: string;

  constructor(private http: Http, private route: ActivatedRoute, private location: Location) {
    this.route.params.subscribe(params => console.log(params));
  }

  ngOnInit() {
    this.createLinkToSearch();
    this.getLinkToAbgewandtZugewandtNachwort();
    console.log(this.route.snapshot.queryParams[ 'wort' ]);
  }

  createLinkToSearch() {
    //console.log(this.route._routerState.snapshot.url);
    // if(this.route._routerState.snapshot.url === '/suche') {
    if (this.route) {
      return 'resetSuche';
    } else return 'suche';
  }

  private getLinkToAbgewandtZugewandtNachwort() {
    const request = globalSearchVariableService.API_URL +
      globalSearchVariableService.extendedSearch +
      'http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23Poem' +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasConvoluteTitle' +
      '&compop=EQ' +
      '&searchval=Abgewandt Zugewandt (Nachwort)' +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemTitle' +
      '&compop=EQ' +
      '&searchval=Nachwort über das schweizerische Sprachdilemma' +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemIRI' +
      '&compop=EXISTS' +
      '&searchval=' +
      '&show_nrows=1';
    console.log(request);
    return this.http.get(request)
      .map(lambda => lambda.json())
      .subscribe(res => this.abgewandtZugewandtNachwortIri =
        '/Abgewandt Zugewandt (Nachwort)/Nachwort über das schweizerische Sprachdilemma---' +
        res.subjects[ 0 ].value[ 2 ].split('/')[ 4 ]);
  }

}
