import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Http, Response } from '@angular/http';
import { globalSearchVariableService } from '../../suche/globalSearchVariablesService';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'from-poem-iri-to-textgrid-information',
  templateUrl: 'fromPoemIRIToTextgridInformation.component.html'
})
export class FromPoemIRIToTextgridInformationComponent implements OnChanges {
  @Input() contentType: string;
  @Input() poemIRIArray: Array<any>;
  @Input() konvolutIRI: string;
  @Input() workIRI: string;
  @Output() sendPoemInformationBack: EventEmitter<any> = new EventEmitter<any>();
  responseArray: Array<any>;
  i: number;
  countRequests: number;
  poemInformation: Array<any>;

  constructor(private http: Http, private router: Router) {
  }

  ngOnChanges() {
    if (this.contentType === 'synopse') {
      if (this.workIRI) console.log('Work iri to get Poems with Cache ' + this.workIRI);
      this.poemInformation = [];
      this.countRequests = 0;
      this.performQuery();
    } else {
      //if(this.konvolutIRI) console.log('Konvoluttitle to get Poems with Cache ' + this.konvolutIRI);
      this.poemInformation = [];
      this.countRequests = 0;
      this.performQuery();
    }
    //if (this.poemIRIArray !== undefined && this.poemIRIArray.length !== 0) {
    //  for (this.i = 0; this.i < this.poemIRIArray.length; this.i++) {
    //console.log('get information for this poem:');
    //this.getTitleAndDate(this.poemIRIArray[ this.i ], this.i);
    //    this.poemInformation[ this.i ] = [];
    //  }
    //}
  }

//}

  performQuery() {
    if (this.contentType === 'synopse') {
      return this.http.get
      (
        globalSearchVariableService.API_URL +
        globalSearchVariableService.extendedSearch +
        'http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23Poem' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasSynopsisIRI' +
        '&compop=EQ' +
        '&searchval=' +
        encodeURIComponent('http://rdfh.ch/kuno-raeber/' + this.workIRI) +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemTitle' +
        '&compop=EXISTS' +
        '&searchval=' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemCreationDate' +
        '&compop=EXISTS' +
        '&searchval=' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemText' +
        '&compop=EXISTS' +
        '&searchval=' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemIRI' +
        '&compop=EXISTS' +
        '&searchval=' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasConvoluteIRI' +
        '&compop=EXISTS' +
        '&searchval=' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasConvoluteTitle' +
        '&compop=EXISTS' +
        '&searchval=' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fknora-base%23seqnum' +
        '&compop=EXISTS' +
        '&searchval=' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasSameEditionAs' +
        '&compop=EXISTS' +
        '&searchval=' +
        '&show_nrows=2000'
      )
        .map(
          (lambda: Response) => {
            const data = lambda.json();
            for (this.i = 0; this.i < data.subjects.length; this.i++) {
              this.poemInformation[ this.i ] = [];
              this.poemInformation[ this.i ][ 0 ] = data.subjects[ this.i ].value[ 7 ]; // poem title
              this.poemInformation[ this.i ][ 1 ] = data.subjects[ this.i ].value[ 4 ]; // poem creation date
              this.poemInformation[ this.i ][ 2 ] = data.subjects[ this.i ].value[ 6 ]; // poem text
              this.poemInformation[ this.i ][ 3 ] = data.subjects[ this.i ].value[ 5 ]; // poem IRI
              this.poemInformation[ this.i ][ 4 ] = data.subjects[ this.i ].value[ 3 ]; // convolute Title
              this.poemInformation[ this.i ][ 5 ] = data.subjects[ this.i ].value[ 1 ]; // poem seqnum
              this.poemInformation[ this.i ][ 6 ] = data.subjects[ this.i ].value[ 8 ]; // hasSameEditionAs
              if (this.poemInformation[ this.i ][ 4 ].includes('Notizbuch')) {
                this.poemInformation[ this.i ][ 11 ] = '/notizbuecher/notizbuch-' + this.poemInformation[ this.i ][ 4 ].split(' ')[ 1 ];
              } else if (this.poemInformation[ this.i ][ 4 ].includes('manuskripte')) {
                this.poemInformation[ this.i ][ 11 ] = '/manuskripte/manuskripte-' + this.poemInformation[ this.i ][ 4 ].split(' ')[ 1 ];
              } else if (this.poemInformation[ this.i ][ 4 ].includes('Typoskript')) {
                this.poemInformation[ this.i ][ 11 ] = '/typoskripte/typoskripte-' + this.poemInformation[ this.i ][ 4 ].split(' ')[ 1 ];
              } else {
                if (this.poemInformation[ this.i ][ 4 ] === 'GESICHT IM MITTAG 1950') {
                  this.poemInformation[ this.i ][ 11 ] = '/drucke/gesicht-im-mittag';
                } else if (this.poemInformation[ this.i ][ 4 ] === 'Die verwandelten Schiffe 1957') {
                  this.poemInformation[ this.i ][ 11 ] = '/drucke/die-verwandelten-schiffe';
                } else if (this.poemInformation[ this.i ][ 4 ] === 'GEDICHTE 1960') {
                  this.poemInformation[ this.i ][ 11 ] = '/drucke/gedichte';
                } else if (this.poemInformation[ this.i ][ 4 ] === 'FLUSSUFER 1963') {
                  this.poemInformation[ this.i ][ 11 ] = '/drucke/flussufer';
                } else if (this.poemInformation[ this.i ][ 4 ] === 'Reduktionen 1981') {
                  this.poemInformation[ this.i ][ 11 ] = '/drucke/reduktionen';
                } else if (this.poemInformation[ this.i ][ 4 ] === 'Hochdeutsche Gedichte 1985') {
                  this.poemInformation[ this.i ][ 11 ] = '/drucke/abgewandt-zugewandt-hochdeutsche-gedichte';
                } else if (this.poemInformation[ this.i ][ 4 ] === 'Alemannische Gedichte 1985') {
                  this.poemInformation[ this.i ][ 11 ] = '/drucke/abgewandt-zugewandt-alemannische-gedichte';
                } else {
                  this.poemInformation[ this.i ][ 11 ] = '/drucke/verstreutes';
                }
              }
            }
            this.sendPoemInformationBack.emit(this.poemInformation);
            return null;
          }
        )
        .subscribe(response => this.responseArray = response);
    } else {
      return this.http.get
      (
        globalSearchVariableService.API_URL +
        globalSearchVariableService.extendedSearch +
        'http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23Poem' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasConvoluteIRI' +
        '&compop=EQ' +
        '&searchval=' +
        encodeURIComponent(this.konvolutIRI) +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemTitle' +
        '&compop=!EQ' +
        '&searchval=123455666' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemCreationDate' +
        '&compop=!EQ' +
        '&searchval=GREGORIAN:2217-01-27' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemText' +
        '&compop=!EQ' +
        '&searchval=123455666' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemIRI' +
        '&compop=!EQ' +
        '&searchval=123455666' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasConvoluteIRI' +
        '&compop=!EQ' +
        '&searchval=123455666' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasConvoluteTitle' +
        '&compop=!EQ' +
        '&searchval=123455666' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fknora-base%23seqnum' +
        '&compop=!EQ' +
        '&searchval=123455666' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasDateIndex' +
        '&compop=!EQ' +
        '&searchval=123455666' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasAlphabeticIndex' +
        '&compop=!EQ' +
        '&searchval=123455666' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasSynopsisTitle' +
        '&compop=!EQ' +
        '&searchval=123455666' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasSynopsisIRI' +
        '&compop=!EQ' +
        '&searchval=123455666' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23isFinalVersion' +
        '&compop=!EQ' +
        '&searchval=123455666' +
/*        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23isOnPage' +
        '&compop=!EQ' +
        '&searchval=123455666' +*/
        '&show_nrows=2000'
      )
        .map(
          (lambda: Response) => {
            const data = lambda.json();
            for (this.i = 0; this.i < data.subjects.length; this.i++) {
              this.poemInformation[ this.i ] = [];
              this.poemInformation[ this.i ][ 0 ] = data.subjects[ this.i ].value[ 9 ];
              this.poemInformation[ this.i ][ 1 ] = data.subjects[ this.i ].value[ 6 ];
              this.poemInformation[ this.i ][ 2 ] = data.subjects[ this.i ].value[ 8 ];
              this.poemInformation[ this.i ][ 3 ] = data.subjects[ this.i ].value[ 7 ];
              this.poemInformation[ this.i ][ 11 ] = data.subjects[ this.i ].value[ 2 ];
              this.poemInformation[ this.i ][ 10 ] = data.subjects[ this.i ].value[ 5 ];
              this.poemInformation[ this.i ][ 8 ] = data.subjects[ this.i ].value[ 1 ];
              this.poemInformation[ this.i ][ 9 ] = data.subjects[ this.i ].value[ 10 ];
              this.poemInformation[ this.i ][ 12 ] = data.subjects[ this.i ].value[ 11 ];
              this.poemInformation[ this.i ][ 14 ] = data.subjects[ this.i ].value[ 12 ];
              this.poemInformation[ this.i ][ 13 ] = data.subjects[ this.i ].value[ 13 ];
              this.poemInformation[ this.i ][ 15 ] = data.subjects[ this.i ].value[ 4 ];
            }
            this.sendPoemInformationBack.emit(this.poemInformation);
            return null;
          }
        )
        .subscribe(response => this.responseArray = response);
    }
  }
}
