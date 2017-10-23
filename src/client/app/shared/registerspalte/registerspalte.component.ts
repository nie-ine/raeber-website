/**
 * Created by Reto Baumgartner (rfbaumgartner) on 27.06.17.
 */

import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AlphabeticalSortingService } from '../utilities/alphabetical-sorting.service';
import { DateFormatService } from '../utilities/date-format.service';
import { globalSearchVariableService } from '../../suche/globalSearchVariablesService';

@Component({
  moduleId: module.id,
  selector: 'rae-registerspalte',
  templateUrl: 'registerspalte.component.html',
  styleUrls: [ 'registerspalte.component.css' ],
  providers: [ AlphabeticalSortingService, DateFormatService ]
})
export class RegisterspalteComponent implements OnChanges {

  @Input() konvolutIRI: string;

  @Output() goToOtherFassung: EventEmitter<any> = new EventEmitter<any>();

  poems: Array<any>;
  poemIRIArray: Array<any>;
  nrOfPoems: number;
  konvolutId: string;
  konvolutType: string;
  knoraKonvolutType: string;
  konvolutTypeMap: any = {
    'poem notebook': 'notizbuecher',
    'poem manuscript convolute': 'manuskripte',
    'poem typescript convolute': 'typoskripte',
    'poem typescript convolute with image': 'typoskripte',
    'printed poem book publication': 'drucke',
    'poly-author publication convolute': 'drucke',
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
    console.log('Registerspalte ' + this.konvolutIRI);
    // infos for title and routing
    if (this.konvolutIRI !== undefined) {
      this.sub = this.http.get(globalSearchVariableService.API_URL + '/resources/' + encodeURIComponent(this.konvolutIRI))
        .map(response => response.json()).subscribe(res => {
          this.konvolutTitle = res.props[ 'http://www.knora.org/ontology/text#hasConvoluteTitle' ].values[ 0 ].utf8str;
          this.konvolutId = res.props[ 'http://www.knora.org/ontology/text#hasAlias' ].values[ 0 ].utf8str;
          this.knoraKonvolutType = res.resinfo.restype_label;
          this.konvolutType = this.konvolutTypeMap[ this.knoraKonvolutType ];
        });
    }
  }

  updatePoemInformation(poemInformation: Array<any>) {
    console.log('Update Poem Information');
    console.log(poemInformation);
    this.poems = [];

    for (let i = 0; i < poemInformation.length; i++) {
      this.poems.push({
        'title': poemInformation[ i ][ 0 ],
        'date': poemInformation[ i ][ 1 ],
        'text': this.removeHtml(poemInformation[ i ][ 2 ]),
        'iri': poemInformation[ i ][ 3 ],
        'reihe': poemInformation[ i ][ 8 ]
      });

    }
    this.nrOfPoems = poemInformation.length;

    this.sortingType = 'alphabetic';
    this.sortAlphabetically();
  }

  createPoemIRIList(poemIRIList: Array<any>) {
    this.poemIRIArray = poemIRIList;
  }

  sortAlphabetically() {
    this.sortingType = 'alphabetic';
    this.poems = this.poems.sort((n1, n2) => {
      const k1 = this.sortingService.germanAlphabeticalSortKey(n1.title);
      const k2 = this.sortingService.germanAlphabeticalSortKey(n2.title);
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
    this.sortingType = 'chronologic';
    // Sortiere nach obj_id bis eine interne Nummerierung da ist
    // TODO passe an entsprechende Datentypen der Felder an
    this.poems = this.poems.sort((n1, n2) => {
      let k1;
      let k2;
      if (this.konvolutType === 'notizbuecher' || this.konvolutType === 'manuskripte') {
        k1 = n1.date;
        k2 = n2.date;
      } else {
        k1 = n1.reihe;
        k2 = n2.reihe;
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

  produceFassungsLink(titel: string, iri: string) {
    if (titel !== undefined && iri !== undefined) {
      return titel.split('/')[ 0 ] + '---' + iri.split('raeber/')[ 1 ];
    } else {
      return 'Linkinformation has not arrived yet';
    }
  }

  removeHtml(content: string) {
    if (content !== undefined) {
      return content.replace(/<[^>]+>/g, '');
    } else {
      return undefined;
      //console.log('no value yet');
    }
  }

}
