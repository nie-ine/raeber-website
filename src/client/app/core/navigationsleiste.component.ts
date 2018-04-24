/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/7/17.
 */

import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { equals, exists, ExtendedSearch } from '../shared/utilities/knora-api-params';
import { KunoRaeberGUI } from '../shared/utilities/iris';

@Component({
  moduleId: module.id,
  selector: 'rae-navigationsleiste',
  templateUrl: './navigationsleiste.component.html'
})
export class NavigationsleisteComponent implements OnInit {
  abgewandtZugewandtNachwortIri: string;

  constructor(private http: Http, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.createLinkToSearch();
    this.getLinkToAbgewandtZugewandtNachwort();
  }

  createLinkToSearch() {
    //console.log((this.route as any)._routerState.snapshot.url.split('?')[0]);
    // if(this.route._routerState.snapshot.url === '/suche') {
    if ( (this.route as any)._routerState.snapshot.url.split('?')[0] === '/suche') {
      //console.log('Erster Fall');
      return 'resetSuche';
    } else {
      //console.log('Zweiter Fall');
      return 'suche';
    }
  }

  private getLinkToAbgewandtZugewandtNachwort() {
    const request = new ExtendedSearch()
      .filterByRestype(KunoRaeberGUI.Poem)
      .property(KunoRaeberGUI.hasConvoluteTitle, equals, 'Abgewandt Zugewandt (Nachwort)')
      .property(KunoRaeberGUI.hasPoemTitle, equals, 'Nachwort über das schweizerische Sprachdilemma')
      .property(KunoRaeberGUI.hasPoemIri, exists)
      .showNRows(1)
      .toString();
    return this.http.get(request)
      .map(lambda => lambda.json())
      .subscribe(res => this.abgewandtZugewandtNachwortIri =
        '/Abgewandt Zugewandt (Nachwort)/Nachwort über das schweizerische Sprachdilemma---' +
        res.subjects[ 0 ].value[ 2 ].split('/')[ 4 ]);
  }

}
