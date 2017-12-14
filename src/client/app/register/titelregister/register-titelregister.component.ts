/**
 * Created by Reto Baumgartner (rfbaumgartner) on 07.07.17.
 */

import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Http , Response } from '@angular/http';
import { ActivatedRoute, Params, Router } from '@angular/router';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { globalSearchVariableService } from '../../suche/globalSearchVariablesService';
import { ExtendedSearch } from '../../shared/utilities/knora-api-params';
import { FulltextSearch } from '../../shared/utilities/knora-api-params';
import { AlphabeticalSortingService } from '../../shared/utilities/alphabetical-sorting.service';
import { DateFormatService } from '../../shared/utilities/date-format.service';

@Component({
  moduleId: module.id,
  selector: 'rae-register-titelregister',
  templateUrl: 'register-titelregister.component.html',
  styleUrls: [ 'register-titelregister.component.css' ],
  providers: [ AlphabeticalSortingService, DateFormatService ]
})
export class RegisterTitelregisterComponent implements OnChanges {

  @Input() selectedTab: string;
  poems: Array<any>;
  konvolutTitel: Array<string>;
  konvolutNr: number;

  constructor(private http: Http, private route: ActivatedRoute, private router: Router,
              private sortingService: AlphabeticalSortingService,
              private dateFormatService: DateFormatService) {

    this.poems = [];
    this.konvolutTitel = [];
  }

  ngOnChanges() {
    this.poems = [];
    this.konvolutTitel = [];
    switch (this.selectedTab) {
      case 'publizierte-gedichte':
        /*
         * nur Endfassungen aus Verstreutes und den Drucken
         */
        this.konvolutTitel = ['GESICHT IM MITTAG 1950', 'Die verwandelten Schiffe 1957', 'GEDICHTE 1960',
          'FLUSSUFER 1963', 'Reduktionen 1981', 'Hochdeutsche Gedichte 1985','Alemannische Gedichte 1985',
          'Abgewandt Zugewandt (Nachwort)', 'Verstreutes'];
        for(this.konvolutNr = 0; this.konvolutNr < this.konvolutTitel.length; this.konvolutNr++) {
          this.convolutePoemsQuery(this.konvolutTitel[this.konvolutNr], true);
        }
        break;
      case 'unpublizierte-gedichte':
        /*
         * nur Endfassungen mit "letzter Druck: unpubliziert" (Notizbücher, Manuskripte, Typoskripte)
         */
        this.konvolutTitel = ['Notizbuch 1979', 'Notizbuch 1979-82', 'Notizbuch 1980-88',
          'Manuskripte 1979', 'Manuskripte 1979-83', 'Karten 1984',
          'Typoskripte 1979', 'Typoskripte 1979-spez','Typoskripte 1983'];
        for(this.konvolutNr = 0; this.konvolutNr < this.konvolutTitel.length; this.konvolutNr++) {
          this.convolutePoemsQuery(this.konvolutTitel[this.konvolutNr], true);
        }
        break;
      case 'nachlass-1979':
        /*
         * Notizbuch 1979, Manuskripte 1979 und Typoskripte 1979 spezial
         */
        this.konvolutTitel = ['Notizbuch 1979', 'Manuskripte 1979', 'Typoskripte 1979-spez'];
        for(this.konvolutNr = 0; this.konvolutNr < this.konvolutTitel.length; this.konvolutNr++) {
          this.convolutePoemsQuery(this.konvolutTitel[this.konvolutNr], false);
        }
        break;
      case 'nachlass-1979-1988':
        /*
         * Notizbuch 1979-82, Notizbuch 1980-88, Manuskripte 1979-83 und Karten 1984
         */
        this.konvolutTitel = ['Notizbuch 1979-82', 'Notizbuch 1980-88', 'Manuskripte 1979-83', 'Karten 1984'];
        for(this.konvolutNr = 0; this.konvolutNr < this.konvolutTitel.length; this.konvolutNr++) {
          this.convolutePoemsQuery(this.konvolutTitel[this.konvolutNr], false);
        }
        break;
    }


  }

convolutePoemsQuery(konvolutTitel:string, endFassungen:boolean) {
  if (!endFassungen) return this.http.get
  (
    globalSearchVariableService.API_URL +
    globalSearchVariableService.extendedSearch +
    'http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23Poem' +
    '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasConvoluteTitle' +
    '&compop=EQ&searchval=' +
    encodeURIComponent(konvolutTitel) +
    '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemTitle' +
    '&compop=EXISTS&searchval=' +
    '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemIRI' +
    '&compop=EXISTS&searchval=' +
    '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemCreationDate' +
    '&compop=EXISTS&searchval=' +
    '&show_nrows=2000'
  )
    .map(response => response.json())
    .subscribe(res => this.poems = this.poems.concat(res.subjects),
        error => console.log('Error: ', error), () => this.sortAlphabetically());
  else return this.http.get
  (
    globalSearchVariableService.API_URL +
    globalSearchVariableService.extendedSearch +
    'http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23Poem' +
    '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasConvoluteTitle' +
    '&compop=EQ&searchval=' +
    encodeURIComponent(konvolutTitel) +
    '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemTitle' +
    '&compop=EXISTS&searchval=' +
    '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemIRI' +
    '&compop=EXISTS&searchval=' +
    '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemCreationDate' +
    '&compop=EXISTS&searchval=' +
    '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23isFinalVersion' +
    '&compop=!EQ&searchval=0' +
    '&show_nrows=2000'
  )
    .map(response => response.json())
    .subscribe(res => this.poems = this.poems.concat(res.subjects),
      error => console.log('Error: ', error), () => { console.log(this.poems);
      return this.sortAlphabetically();});
}

produceFassungsLink(p: any) {
  if(p && p.value[1] !== undefined && p.value[4] !== undefined && p.value[3] !== undefined) {
    return ['/' + p.value[1]+ '/'] + p.value[4].split('/')[0].replace(/[()]/g, '') + '---' + p.value[3].split('raeber/')[1];
  } else {
    return 'Linkinformation has not arrived yet';
  }
}

formatDate(date: string) {
  return this.dateFormatService.germanLongDate(date);
}

sortAlphabetically() {
  console.log('sort');
  this.poems = this.poems.sort((n1, n2) => {
    const k1 = this.sortingService.germanAlphabeticalSortKey(n1.value[4]);
    const k2 = this.sortingService.germanAlphabeticalSortKey(n2.value[4]);
    if (k1 > k2) {
      return 1;
    }
    if (k1 < k2) {
      return -1;
    }
    return 0;
  });
}

/*  updateKonvolutType(konvolutType: string, i: number) {
console.log('KonvolutType [' + i + ']' + konvolutType);
if (this.knoraKonvolutType) {
this.knoraKonvolutType[i] = konvolutType;
}
}

updateKonvolutIRI(konvolutIRI: string, i: number) {
console.log('IRI [' + i + ']' + konvolutIRI);
if (this.konvolutIRI) {
this.konvolutIRI[i] = konvolutIRI;
}
}

createPoemIRIList(poemIRIList: Array<any>, i:number) {
console.log('poemIRIList [' + i + ']' + poemIRIList);
if (this.poemIRIArray) {
this.poemIRIArray[i] = poemIRIList;
}
}

updatePoemInformation(poemInformation: Array<any>, i:number) {
console.log('PoemInformation[' + i +']');
this.konvolutPoems[i]=[];
if (poemInformation) {
for (let j = 0; j < poemInformation.length; j++) {
this.konvolutPoems[i][ poemInformation[j]['11'] - 1 ] = [];
this.konvolutPoems[i][ poemInformation[j]['11'] - 1 ].title = poemInformation[ i ][ 0 ];
this.konvolutPoems[i][ poemInformation[j]['11'] - 1 ].date = poemInformation[ i ][ 1 ];
this.konvolutPoems[i][ poemInformation[j]['11'] - 1 ].iri = poemInformation[ i ][ 3 ];
this.konvolutPoems[i][ poemInformation[j]['11'] - 1 ].reihe = poemInformation[ i ][ 8 ];
this.konvolutPoems[i][ poemInformation[j]['11'] - 1 ].alphabeticIndex = poemInformation[ i ][ 11 ];
this.konvolutPoems[i][ poemInformation[j]['11'] - 1 ].dateIndex = poemInformation[ i ][ 10 ];
}
}
this.sortAlphabetically(i);
this.poems = [].concat(...this.konvolutPoems);
console.log(this.konvolutPoems);
console.log(this.poems);
}*/
}
