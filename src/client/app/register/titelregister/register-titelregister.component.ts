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
  @Output() sendKonvolutIRIBack: EventEmitter<any> = new EventEmitter<any>();
  @Output() sendKonvolutTypeBack: EventEmitter<any> = new EventEmitter<any>();

  poems: Array<any>;
  konvolutPoems: Array<Array<any>>;
  poemIRIArray: Array<Array<any>>;
  nrOfPoems: number;

  konvolutTitel: Array<string>;
  konvolutIRI: Array<string>;
  knoraKonvolutType: Array<string>;


  responseArray: Array<any>;
  nrOfEntries: number;


  constructor(private http: Http, private route: ActivatedRoute, private router: Router,
              private sortingService: AlphabeticalSortingService,
              private dateFormatService: DateFormatService) {

    this.poems = [];
    this.konvolutPoems = [];
    this.poemIRIArray = [];
    this.konvolutTitel = [];
    this.konvolutIRI = [];
    this.knoraKonvolutType = [];
  }

  ngOnChanges() {
/*
    this.poems = [];
    this.konvolutTitel = [];
    this.knoraKonvolutType = [];
*/
    switch (this.selectedTab) {
      case 'publiziert':
        /*
         * nur Endfassungen aus Verstreutes und den Drucken
         */
        break;
      case 'unpubliziert':
        /*
         * nur Endfassungen mit "letzter Druck: unpubliziert" (Notizbücher, Manuskripte, Typoskripte)
         */
        break;
      case 'nachlass-1979':
        /*
         * Notizbuch 1979, Manuskripte 1979 und Typoskripte 1979 spezial
         */
        this.konvolutTitel = ['Notizbuch%201979', 'Manuskripte%201979', 'Typoskripte%201979-spez'];
        break;
      case 'nachlass-1979-1988':
        /*
         * Notizbuch 1979-82, Notizbuch 1980-88, Manuskripte 1979-83 und Karten 1984
         */
        this.konvolutTitel = ['Notizbuch%201979-82', 'Notizbuch%201980-88', 'Manuskripte%201979-83', 'Karten%201984'];
        break;
    }


  }

  updateKonvolutType(konvolutType: string, i: number) {
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
        this.konvolutPoems[i][ poemInformation[j]['11'] - 1 ].text = this.removeHtml(poemInformation[ i ][ 2 ]);
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
  }

  produceFassungsLink(p: any) {
    if(p && p.konvolutTitel !== undefined && p.titel !== undefined && p.iri !== undefined) {
      return ['/' + p.konvolutTitel + '/'] + p.titel.split('/')[0] + '---' + p.iri.split('raeber/')[1];
    } else {
      return 'Linkinformation has not arrived yet';
    }
  }

  formatDate(date: string) {
    return this.dateFormatService.germanLongDate(date);
  }


  sortAlphabetically(i: number) {
    console.log('sort');
    this.konvolutPoems[i] = this.konvolutPoems[i].sort((n1, n2) => {
      const k1 = this.sortingService.germanAlphabeticalSortKey(n1.titel);
      const k2 = this.sortingService.germanAlphabeticalSortKey(n2.titel);
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
