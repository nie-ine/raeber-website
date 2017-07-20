/**
 * Created by Reto Baumgartner (rfbaumgartner) on 07.07.17.
 */

import {Component, Input, OnInit} from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { FulltextSearch } from '../../../shared/utilities/knora-api-params';

@Component({
  moduleId: module.id,
  selector: 'rae-register-titelregister',
  templateUrl: 'register-titelregister.component.html',
  styleUrls: [ 'register-titelregister.component.css' ]
})
export class RegisterTitelregisterComponent implements OnInit {

  rsEntry: Array<any>;
  nHits: number;

  @Input() selectedTab: string;

  static alphabeticalSortKey(key: string) {
    // replace special characters of Latin-1 by base letter and append original string for internal sorting
    return key
      .toLowerCase()
      .replace(/[àáâãäå]/gi, 'a')
      .replace(/[æ]/gi, 'ae')
      .replace(/[ç]/gi, 'c')
      .replace(/[ð]/gi, 'd')
      .replace(/[èéêë]/gi, 'e')
      .replace(/[ìíîï]/gi, 'i')
      .replace(/[òóôõöø]/gi, 'o')
      .replace(/[ñ]/gi, 'n')
      .replace(/[ß]/gi, 'ss')
      .replace(/[ùúûü]/gi, 'u')
      .replace(/[ýÿ]/gi, 'y')
      .replace(/[^a-z0-9 ]/gi, '')
      .concat('\t', key.toLowerCase(), '\t', key);
  }

  constructor(private http: Http, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    let searchParams = new FulltextSearch;
    searchParams.searchstring = 'e';

    this.route.params
      .switchMap((params: Params) => this.http.get(searchParams.toString()))
      .map(response => response.json().subjects)
      .subscribe((res: Array<any>) => this.rsEntry = res);
    this.route.params
      .switchMap((params: Params) => this.http.get(searchParams.toString()))
      .map(response => response.json().nhits)
      .subscribe((res: number) => { this.nHits = res; this.sortAlphabetically() });
  }

  // TODO: Sort alphabetically after init. How?

  sortAlphabetically() {
    this.rsEntry = this.rsEntry.sort((n1, n2) => {
      const k1 = RegisterTitelregisterComponent.alphabeticalSortKey(n1.value[ 0 ]);
      const k2 = RegisterTitelregisterComponent.alphabeticalSortKey(n2.value[ 0 ]);
      if (k1 > k2) {
        return 1;
      }

      if (k1 < k2) {
        return -1;
      }

      return 0;
    });
  }

  sortChronologically() {
    // Sortiere nach obj_id bis eine interne Nummerierung da ist
    this.rsEntry = this.rsEntry.sort((n1, n2) => {
      const k1 = n1.obj_id;
      const k2 = n2.obj_id;
      if (k1 > k2) {
        return 1;
      }

      if (k1 < k2) {
        return -1;
      }

      return 0;
    });
  }
}
