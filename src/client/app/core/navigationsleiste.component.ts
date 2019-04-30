/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/7/17.
 */

import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { equals, exists, ExtendedSearch } from '../shared/utilities/knora-request';
import { KunoRaeber, KunoRaeberGUI, Text} from '../shared/utilities/iris';

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
      .filterByRestype(KunoRaeber.TypewrittenPostface)
      .property(Text.expressionHasTitle, equals, 'NACHWORT ÜBER DAS SCHWEIZERISCHE SPRACHDILEMMA')
      .showNRows(1)
      .toString();
      return this.http.get(request)
        .map(lambda => lambda )
        .subscribe(res => {
            let objectIri = res.json().subjects[0].obj_id.split('/')[4];
            this.abgewandtZugewandtNachwortIri = '/Abgewandt Zugewandt (Nachwort)/Nachwort über das schweizerische Sprachdilemma---' + objectIri;
          }
        );
  }

}
