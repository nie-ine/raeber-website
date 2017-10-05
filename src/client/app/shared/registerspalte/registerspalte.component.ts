/**
 * Created by Reto Baumgartner (rfbaumgartner) on 27.06.17.
 */

import { Component, Input, OnChanges } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ExtendedSearch, KnoraProperty } from '../utilities/knora-api-params';
import { AlphabeticalSortingService } from '../utilities/alphabetical-sorting.service';
import { DateFormatService } from '../utilities/date-format.service';

@Component({
  moduleId: module.id,
  selector: 'rae-registerspalte',
  templateUrl: 'registerspalte.component.html',
  styleUrls: [ 'registerspalte.component.css' ],
  providers: [ AlphabeticalSortingService, DateFormatService ]
})
export class RegisterspalteComponent implements OnChanges {

  @Input() konvolutIRI: string;

  rsEntry: Array<any>;
  nHits: number;
  konvolutId: string;
  konvolutType: string;
  konvolutTypeMap = {
    'poem notebook': 'notizbuecher',
    'poem manuscript convolute': 'manuskripte',
    'poem typescript convolute': 'typoskripte',
    'printed poem book publication': 'drucke',
    'poem postcard convolute': 'manuskripte',
    'diary convolute': 'material',
    'letter convolute': 'material'
  };
  konvolutTitle: string;
  sortingType: string;
  private sub: any;

  constructor(private http: Http, private sortingService: AlphabeticalSortingService,
              private dateFormatService: DateFormatService) {
  }

  ngOnChanges() {

    // infos for title and routing
    this.sub = this.http.get('http://knora.nie-ine.ch/v1/resources/' + encodeURIComponent(this.konvolutIRI))
      .map(response => response.json()).subscribe(res => {
        this.konvolutTitle = res.props['http://www.knora.org/ontology/text#hasConvoluteTitle'].values[0].utf8str;
        this.konvolutId = res.props['http://www.knora.org/ontology/text#hasAlias'].values[0].utf8str;
        this.konvolutType = res.resinfo.restype_label;
      });

    // load poems
    let searchParams = new ExtendedSearch();
    searchParams.property = new KnoraProperty('http://www.knora.org/ontology/work#isPartOf', 'EQ', this.konvolutIRI);
    searchParams.showNRows = 500;

    this.http.get(searchParams.toString())
      .map(response => response.json())
      .subscribe((res: any) => {
        this.rsEntry = res.subjects;
        this.nHits = res.nhits;
        this.sortAlphabetically();
        this.sortingType = 'alphabetic';
      });
  }

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
    // TODO passe an entsprechende Datentypen der Felder an
    this.rsEntry = this.rsEntry.sort((n1, n2) => {
      let k1;
      let k2;
      if (this.konvolutType === 'notizbuecher' || this.konvolutType === 'manuskripte') {
        k1 = n1.obj_id;
        k2 = n2.obj_id;
      } else {
        k1 = n1.obj_id;
        k2 = n2.obj_id;
      }
      if (k1 > k2) {
        return 1;
      }

      if (k1 < k2) {
        return -1;
      }

      return 0;
    });
  }

  formatDate(date: string) {
    return this.dateFormatService.germanLongDate(date);
  }
}
