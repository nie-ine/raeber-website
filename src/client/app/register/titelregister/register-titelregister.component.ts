/**
 * Created by Reto Baumgartner (rfbaumgartner) on 07.07.17.
 */

import { Component, Input, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { FulltextSearch } from '../../shared/utilities/knora-api-params';
import { AlphabeticalSortingService } from '../../shared/utilities/alphabetical-sorting.service';

@Component({
  moduleId: module.id,
  selector: 'rae-register-titelregister',
  templateUrl: 'register-titelregister.component.html',
  styleUrls: [ 'register-titelregister.component.css' ],
  providers: [ AlphabeticalSortingService ]
})
export class RegisterTitelregisterComponent implements OnInit {

  rsEntry: Array<any>;
  nHits: number;

  @Input() selectedTab: string;

  constructor(private http: Http, private route: ActivatedRoute, private router: Router,
              private sortingService: AlphabeticalSortingService) {
  }

  ngOnInit() {
    let searchParams = new FulltextSearch;
    searchParams.searchstring = 'e';

    this.route.params
      .switchMap((params: Params) => this.http.get(searchParams.toString()))
      .map(response => response.json())
      .subscribe((res: any) => {
      this.rsEntry = res.subjects;
      this.nHits = res.nhits;
      this.sortAlphabetically();
    });
  }

  // TODO: Sort alphabetically after init. How?

  sortAlphabetically() {
    this.rsEntry = this.rsEntry.sort((n1, n2) => {
      const k1 = this.sortingService.germanAlphabeticalSortKey(n1.value[ 0 ]);
      const k2 = this.sortingService.germanAlphabeticalSortKey(n2.value[ 0 ]);
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
