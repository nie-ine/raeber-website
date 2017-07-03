/**
 * Created by Reto Baumgartner (rfbaumgartner) on 27.06.17.
 */

import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Component({
  moduleId: module.id,
  selector: 'rae-registerspalte',
  templateUrl: 'registerspalte.component.html',
  styleUrls: [ 'registerspalte.component.css' ]
})
export class RegisterspalteComponent implements OnInit {

  rsEntry: Array<any>;

  // for testings
  searchQuery: string;

  konvolut_id: string;
  konvolut_type: string;
  private sub: any;

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
    this.konvolut_type = this.route.snapshot.url[ 0 ].path;

    this.route.params
      .switchMap((params: Params) => this.http.get('http://localhost:3333/v1/search/e?searchtype=fulltext'))
      .map(response => response.json().subjects)
      .subscribe((res: Array<any>) => this.rsEntry = res);

    this.konvolut_type = this.route.snapshot.url[ 0 ].path;
    this.sub = this.route.params.subscribe(params => {
      this.konvolut_id = params[ 'id' ];
    });
  }

  // TODO: Sort alphabetically after init. How?

  sortAlphabetically() {
    this.rsEntry = this.rsEntry.sort((n1, n2) => {
      const k1 = RegisterspalteComponent.alphabeticalSortKey(n1.value[ 0 ]);
      const k2 = RegisterspalteComponent.alphabeticalSortKey(n2.value[ 0 ]);
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
