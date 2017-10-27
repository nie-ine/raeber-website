/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/7/17.
 */
import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Router } from '@angular/router';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { ExtendedSearch, KnoraProperty } from '../shared/utilities/knora-api-params';
import { Config } from '../shared/config/env.config';
import { globalSearchVariableService } from '../suche/globalSearchVariablesService';
import { DateFormatService } from '../shared/utilities/date-format.service';

@Component({
  moduleId: module.id,
  selector: 'rae-fassung',
  templateUrl: 'fassung.component.html',
  styleUrls: [ 'fassung.component.css' ]
})
export class FassungComponent implements OnInit, AfterViewChecked {
  creationDate: string;
  modificationDate: string;

  zeigeKonstituiert: boolean = true;
  zeigeDiplomatisch: boolean = false;

  urlPrefix: string = 'http://rdfh.ch/kuno-raeber/';

  diplomaticIRIs: Array<string>;

  poem_id: string;
  poemTitle: string;
  poemSeqnum: number;
  poemConvoluteType: string;
  editedPoemText: string;
  textEdition: string;
  konvolutType: string;
  konvolutIRI: string;
  konvolutTitel: string;
  konvolutLink: string;
  synopseIRI: string;
  workTitle: string;
  otherWorkExpressions: any[] = [];

  konvolutTypeName: string;

  nextPoem: string = '';
  prevPoem: string = '';

  poem_resizable: boolean;
  show_register: boolean;

  private static produceFassungsLink(titel: string, iri: string) {
    if (titel !== undefined && iri !== undefined) {
      return titel.split('/')[ 0 ] + '---' + iri.split('raeber/')[ 1 ];
    } else {
      return 'Linkinformation has not arrived yet';
    }
  }

  constructor(private http: Http, private router: Router, private cdr: ChangeDetectorRef, private dfs: DateFormatService) {
  }

  private static createRequestForNeighbouringPoem(convoluteIRI: string, seqnumOfNeighbour: number) {
    let searchParams = new ExtendedSearch();
    searchParams.filterByRestype = 'http://www.knora.org/ontology/kuno-raeber-gui#Poem';
    searchParams.property =
      new KnoraProperty('http://www.knora.org/ontology/kuno-raeber-gui#hasConvoluteIRI', 'EQ', convoluteIRI);
    searchParams.property =
      new KnoraProperty('http://www.knora.org/ontology/knora-base#seqnum', 'EQ', (seqnumOfNeighbour).toString());
    searchParams.property =
      new KnoraProperty('http://www.knora.org/ontology/kuno-raeber-gui#hasPoemIRI', 'EXISTS', '');
    searchParams.property =
      new KnoraProperty('http://www.knora.org/ontology/kuno-raeber-gui#hasPoemTitle', 'EXISTS', '');
    return searchParams.toString();
  }

  private static buildRouteTitleStringFromResultSet(resultSet: any, convoluteTitle: string) {
    const poemShortIRI = resultSet.subjects[ 0 ].value[ 3 ].split('/')[ 4 ];
    const poemTitle = resultSet.subjects[ 0 ].value[ 4 ];
    return '/' + convoluteTitle + '/' + FassungComponent.escapeSlashesInRouteElement(poemTitle) +
      '---' + poemShortIRI + '###' + poemTitle;
  }

  private static escapeSlashesInRouteElement(element: string) {
    element.replace('/', '/*');
  }

  ngOnInit() {
    this.poem_resizable = true;
    this.show_register = true;
    this.konvolutTitel = decodeURIComponent(this.router.url.split('/')[ 1 ]);
    this.poem_id = this.router.url.split('/')[ 2 ].split('---')[ 1 ];
    this.updateView();

    if (this.konvolutTitel.includes('Notizbuch')) {
      this.konvolutLink = '/notizbuecher/notizbuch-' + this.konvolutTitel.split(' ')[ 1 ];
    } else if (this.konvolutTitel.includes('manuskripte')) {
      this.konvolutLink = '/manuskripte/manuskripte-' + this.konvolutTitel.split(' ')[ 1 ];
    } else if (this.konvolutTitel.includes('Typoskript')) {
      this.konvolutLink = '/typoskripte/typoskripte-' + this.konvolutTitel.split(' ')[ 1 ];
    } else {
      if (this.konvolutTitel === 'GESICHT IM MITTAG 1950') {
        this.konvolutLink = '/drucke/gesicht-im-mittag';
      } else if (this.konvolutTitel === 'Die verwandelten Schiffe 1957') {
        this.konvolutLink = '/drucke/die-verwandelten-schiffe';
      } else if (this.konvolutTitel === 'GEDICHTE 1960') {
        this.konvolutLink = '/drucke/gedichte';
      } else if (this.konvolutTitel === 'FLUSSUFER 1963') {
        this.konvolutLink = '/drucke/flussufer';
      } else if (this.konvolutTitel === 'Reduktionen 1981') {
        this.konvolutLink = '/drucke/reduktionen';
      } else if (this.konvolutTitel === 'Hochdeutsche Gedichte 1985') {
        this.konvolutLink = '/drucke/abgewandt-zugewandt-hochdeutsche-gedichte';
      } else if (this.konvolutTitel === 'Alemannische Gedichte 1985') {
        this.konvolutLink = '/drucke/abgewandt-zugewandt-alemannische-gedichte';
      } else {
        this.konvolutLink = '/drucke/verstreutes';
      }
    }
  }

  updateView() {
    this.http
      .get(Config.API + 'resources/' + encodeURIComponent(this.urlPrefix + this.poem_id))
      .map(result => result.json())
      .subscribe(res => {
        this.poemConvoluteType = res.resinfo[ 'restype_id' ].split('#')[ 1 ];
        this.poemTitle = res.props[ 'http://www.knora.org/ontology/text#hasTitle' ].values[ 0 ].utf8str;
        this.textEdition = res.props[ 'http://www.knora.org/ontology/kuno-raeber#hasEdition' ].values[ 0 ];
        this.getEditedPoemText(this.textEdition);
        this.poemSeqnum = res.props[ 'http://www.knora.org/ontology/knora-base#seqnum' ].values[ 0 ];
        this.creationDate = this.dfs.germanLongDate(res.props[ 'http://www.knora.org/ontology/human#hasCreationDate' ].values[ 0 ].dateval1);
        this.modificationDate = this.dfs.germanLongDate(res.props[ 'http://www.knora.org/ontology/human#hasModificationDate' ].values[ 0 ].utf8str);
        switch (this.poemConvoluteType) {
          case 'PoemNote':
            this.diplomaticIRIs = res.props[ 'http://www.knora.org/ontology/kuno-raeber#hasDiplomaticTranscription' ].values;
            this.konvolutTypeName = 'Notizbuch';
            break;
          case 'HandwrittenPoem':
            // FIXME
            this.diplomaticIRIs = res.props[ 'http://www.knora.org/ontology/kuno-raeber#hasDiplomaticTranscription' ].values;
            this.konvolutTypeName = 'Manuskript';
            break;
          case 'PostCardPoem':
            // FIXME
            this.konvolutTypeName = 'Manuskript';
            break;
          case 'TypewrittenPoem':
            // FIXME
            this.konvolutTypeName = 'Typoskript';
            break;
          case 'PublicationPoem':
            this.konvolutTypeName = 'DRUCK';
            break;
        }
        this.getNeighbouringPoems(this.poemSeqnum);
      });

    this.http
      .get(globalSearchVariableService.API_URL +
        globalSearchVariableService.extendedSearch +
        'http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23Poem' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemIRI' +
        '&compop=EQ' +
        '&searchval=' +
        encodeURIComponent(this.urlPrefix + this.poem_id) +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasConvoluteIRI' +
        '&compop=EXISTS' +
        '&searchval=' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasSynopsisIRI' +
        '&compop=EXISTS' +
        '&searchval='
      )
      .map(result => result.json())
      .subscribe(res => {
        this.konvolutIRI = res.subjects[ 0 ].value[ 1 ];
        this.synopseIRI = res.subjects[ 0 ].value[ 3 ];
        this.getWork(this.synopseIRI);
      });
  }

  goToOtherFassung(idOfFassung: string) {
    const tempPoemId = idOfFassung.split('---')[ 1 ];
    this.poem_id = tempPoemId !== undefined && !tempPoemId.includes('/') ? tempPoemId : this.poem_id;
    this.updateView();
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  private getEditedPoemText(editedTextIri: string) {
    this.http.get(Config.API + 'resources/' + encodeURIComponent(editedTextIri))
      .map(result => result.json())
      .subscribe(res => this.editedPoemText = res.props[ 'http://www.knora.org/ontology/text#hasContent' ].values[ 0 ].utf8str);
  }

  private getWork(workIri: string) {
    this.http.get(Config.API + 'resources/' + encodeURIComponent(workIri))
      .map(result => result.json())
      .subscribe(res => {
        this.workTitle = res.props[ 'http://www.knora.org/ontology/text#hasTitle' ].values[ 0 ].utf8str;
      });
    const request = globalSearchVariableService.API_URL +
      globalSearchVariableService.extendedSearch +
      'http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23Poem' +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasSynopsisIRI' +
      '&compop=EQ' +
      '&searchval=' +
      encodeURIComponent(this.synopseIRI) +
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
      /*'&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasSameEditionAs' +
       '&compop=EXISTS' +
       '&searchval=' +*/
      '&show_nrows=2000';
    return this.http.get(
      request
    )
      .map(
        (lambda: Response) => lambda.json()
      )
      .subscribe(response => {
          this.otherWorkExpressions = [];
          for (let res of response.subjects) {
            this.otherWorkExpressions.push('/' + res.value[ 3 ] + '/' +
              FassungComponent.produceFassungsLink(res.value[ 7 ], res.value[ 5 ]) +
              '###' + res.value[ 7 ]);
          }
        }
      );
  }

  private getNeighbouringPoems(poemSeqnum: number) {
    const searchParamsPrev = FassungComponent.createRequestForNeighbouringPoem(this.konvolutIRI, (poemSeqnum - 1));
    this.http.get(searchParamsPrev)
      .map(result => result.json())
      .subscribe(res => {
        if (res.subjects[ 0 ] !== undefined) {
          this.prevPoem = FassungComponent.buildRouteTitleStringFromResultSet(res, this.konvolutTitel);
        }
      });
    const searchParamsNext = FassungComponent.createRequestForNeighbouringPoem(this.konvolutIRI, (poemSeqnum + 1));
    this.http.get(searchParamsNext)
      .map(result => result.json())
      .subscribe(res => {
        if (res.subjects[ 0 ] !== undefined) {
          this.nextPoem = FassungComponent.buildRouteTitleStringFromResultSet(res, this.konvolutTitel);
        }
      });
  }

}
