import { AfterViewChecked, ChangeDetectorRef, Component, OnChanges, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Event as NavigationEvent } from '@angular/router';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
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
  creationDateOfPoem: string;
  modificationDateOfPoem: string;

  showEditedText: boolean = true;
  showDiplomaticTranscription: boolean = false;

  urlPrefix: string = 'http://rdfh.ch/kuno-raeber/';

  diplomaticIRIs: Array<string>;

  poemShortIri: string;
  poemTitle: string;
  poemType: string;
  poemSeqnum: number;
  editedPoemText: string;
  convoluteIri: string;
  convoluteTitle: string;
  synopsisIri: string = '';
  synopsisTitle: string;
  relatedPoems: any[] = [];

  convoluteTypeGermanLabel: string;

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
    return '/' + convoluteTitle + '/' + FassungComponent.removeSlashesAndParanthesesInRouteElement(poemTitle) +
      '---' + poemShortIRI + '###' + poemTitle;
  }

  private static removeSlashesAndParanthesesInRouteElement(element: string) {
    return element.includes('/') ?
      element.replace(/[/()]/g, '') : element;
  }

  goToConvoluteview(searchTerm: string, page: string, convolutURl: string) {
    this.router.navigateByUrl(
      convolutURl +
      '?wort=' +
      searchTerm +
      '&page=' + page);
  }

  constructor(private http: Http,
              private route: ActivatedRoute,
              private cdr: ChangeDetectorRef,
              private dfs: DateFormatService,
              private router: Router) {
    route.params.subscribe(p => {
      this.convoluteTitle = p.konvolut;
      this.poemShortIri = p.fassung.split('---')[ 1 ];
    });
    router.events.subscribe( (event: NavigationEvent) => {
      if (event instanceof NavigationEnd) {
        this.updateAfterNavigation('abc---'+this.poemShortIri);
      }
    });
  }

  ngOnInit() {
    this.poem_resizable = false;
    this.show_register = true;
    this.getDataFromDB();
  }

  ngAfterViewChecked() {
    this.cdr.detectChanges();
  }

  buildLinkToRelatedConvolute(convoluteTitle: string): string {
    if (convoluteTitle.includes('Notizbuch')) {
      return '/notizbuecher/notizbuch-' + convoluteTitle.split(' ')[ 1 ].replace('-', '-19');
    } else if (convoluteTitle.includes('Manuskripte')) {
      return '/manuskripte/manuskripte-' + convoluteTitle.split(' ')[ 1 ].replace('-', '-19');
    } else if (convoluteTitle.includes('Typoskripte 1979-spez')) {
      return '/typoskripte/typoskripte-1979-spez';
    } else if (convoluteTitle.includes('Typoskript')) {
      return '/typoskripte/typoskripte-' + convoluteTitle.split(' ')[ 1 ].replace('-', '-19');
    } else {
      if (convoluteTitle === 'GESICHT IM MITTAG 1950') {
        return '/drucke/gesicht-im-mittag';
      } else if (convoluteTitle === 'Die verwandelten Schiffe 1957') {
        return '/drucke/die-verwandelten-schiffe';
      } else if (convoluteTitle === 'GEDICHTE 1960') {
        return '/drucke/gedichte';
      } else if (convoluteTitle === 'FLUSSUFER 1963') {
        return '/drucke/flussufer';
      } else if (convoluteTitle === 'Reduktionen 1981') {
        return '/drucke/reduktionen';
      } else if (convoluteTitle === 'Hochdeutsche Gedichte 1985') {
        return '/drucke/abgewandt-zugewandt-hochdeutsche-gedichte';
      } else if (convoluteTitle === 'Alemannische Gedichte 1985') {
        return '/drucke/abgewandt-zugewandt-alemannische-gedichte';
      } else if (convoluteTitle === 'Tagebuch') {
        return '/material/tagebuecher';
      } else if (convoluteTitle === 'Karten 1984') {
        return '/manuskripte/karten-1984';
      } else {
        return '/drucke/verstreutes';
      }
    }
  }

  searchInConvolute(searchTerm: any) {
    console.log(searchTerm);
    console.log('Search in Convolute for Term: ' + searchTerm.searchTerm);
    console.log('Search in Convolute for Page: ' + searchTerm.page);
    console.log(searchTerm.searchTerm.length);
    console.log(this.convoluteTitle);
    if(searchTerm.searchTerm.length > 1 || searchTerm.page !== null) {
      if(this.convoluteTitle === 'Notizbuch 1979') {
        this.goToConvoluteview(searchTerm.searchTerm, searchTerm.page, 'notizbuecher/notizbuch-1979');
      } else if(this.convoluteTitle === 'Notizbuch 1979-82') {
        this.goToConvoluteview(searchTerm.searchTerm, searchTerm.page, 'notizbuecher/notizbuch-1979-1982');
      } else if(this.convoluteTitle === 'Notizbuch 1980-88') {
        this.goToConvoluteview(searchTerm.searchTerm, searchTerm.page, 'notizbuecher/notizbuch-1980-1988');
      } else if(this.convoluteTitle === 'Manuskripte 1979') {
        this.goToConvoluteview(searchTerm.searchTerm, searchTerm.page, 'manuskripte/manuskripte-1979');
      } else if(this.convoluteTitle === 'Manuskripte 1979-83') {
        this.goToConvoluteview(searchTerm.searchTerm, searchTerm.page, 'manuskripte/manuskripte-1979-1983');
      } else if(this.convoluteTitle === 'Karten 1984') {
        this.goToConvoluteview(searchTerm.searchTerm, searchTerm.page, 'manuskripte/karten-1984');
      } else if(this.convoluteTitle === 'Typoskripte 1979') {
        this.goToConvoluteview(searchTerm.searchTerm, searchTerm.page, 'typoskripte/typoskripte-1979');
      } else if(this.convoluteTitle === 'Typoskripte 1979-spez') {
        this.goToConvoluteview(searchTerm.searchTerm, searchTerm.page, 'typoskripte/typoskripte-1979-spez');
      } else if(this.convoluteTitle === 'Typoskripte 1983') {
        this.goToConvoluteview(searchTerm.searchTerm, searchTerm.page, 'typoskripte/typoskripte-1983');
      } else if(this.convoluteTitle === 'GESICHT IM MITTAG 1950') {
        this.goToConvoluteview(searchTerm.searchTerm, searchTerm.page, 'drucke/gesicht-im-mittag');
      } else if(this.convoluteTitle === 'Die verwandelten Schiffe 1957') {
        this.goToConvoluteview(searchTerm.searchTerm, searchTerm.page, 'drucke/die-verwandelten-schiffe');
      } else if(this.convoluteTitle === 'GEDICHTE 1960') {
        this.goToConvoluteview(searchTerm.searchTerm, searchTerm.page, 'drucke/gedichte');
      } else if(this.convoluteTitle === 'FLUSSUFER 1963') {
        this.goToConvoluteview(searchTerm.searchTerm, searchTerm.page, 'drucke/flussufer');
      } else if(this.convoluteTitle === 'Reduktionen 1981') {
        this.goToConvoluteview(searchTerm.searchTerm, searchTerm.page, 'drucke/reduktionen');
      } else if(this.convoluteTitle === 'Abgewandt Zugewandt 1985 – Hochdeutsche Gedichte') {
        this.goToConvoluteview(searchTerm.searchTerm, searchTerm.page, 'drucke/abgewandt-zugewandt-hochdeutsche-gedichte');
      } else if(this.convoluteTitle === 'Abgewandt Zugewandt 1985 – Alemannische Gedichte') {
        this.goToConvoluteview(searchTerm.searchTerm, searchTerm.page, 'drucke/abgewandt-zugewandt-alemannische-gedichte');
      } else if(this.convoluteTitle === 'Verstreutes') {
        this.goToConvoluteview(searchTerm.searchTerm, searchTerm.page, 'drucke/verstreutes');
      } else if(this.convoluteTitle === 'Tagebuch') {
        this.goToConvoluteview(searchTerm.searchTerm, searchTerm.page, 'material/tagebuecher');
      }


    }
  }

  updateAfterNavigation(idOfFassung: string) {
    const tempPoemId = idOfFassung.split('---')[ 1 ];
    this.poemShortIri = tempPoemId !== undefined && !tempPoemId.includes('/') ? tempPoemId : this.poemShortIri;
    this.getDataFromDB();
  }

  belongsToSynopsis() {
    return this.synopsisIri.split('/')[4] !== undefined;
  }

  private getDataFromDB() {
    this.getBasicInformationOnCurrentPoem();
    this.getConvoluteIriSynopsisIriAndRelatedPoems();
  }

  private getBasicInformationOnCurrentPoem() {
    this.http
      .get(Config.API + '/resources/' + encodeURIComponent(this.urlPrefix + this.poemShortIri))
      .map(result => result.json())
      .subscribe(res => {
        this.poemType = res.resinfo[ 'restype_id' ].split('#')[ 1 ];
        this.poemTitle = res.props[ 'http://www.knora.org/ontology/text#hasTitle' ].values[ 0 ].utf8str;
        const textEdition = res.props[ 'http://www.knora.org/ontology/kuno-raeber#hasEdition' ].values[ 0 ];
        this.getEditedPoemText(textEdition);
        this.poemSeqnum = res.props[ 'http://www.knora.org/ontology/knora-base#seqnum' ].values[ 0 ];
        this.creationDateOfPoem = this.poemType === 'DiaryEntry' ?
          this.dfs.germanLongDate(res.props[ 'http://www.knora.org/ontology/text#hasEnteringDate' ].values[ 0 ].dateval1) :
          this.dfs.germanLongDate(res.props[ 'http://www.knora.org/ontology/human#hasCreationDate' ].values[ 0 ].dateval1);
        this.modificationDateOfPoem =
          this.dfs.germanLongDate(res.props[ 'http://www.knora.org/ontology/human#hasModificationDate' ].values[ 0 ].utf8str);
        switch (this.poemType) {
          case 'PoemNote':
            this.diplomaticIRIs = res.props[ 'http://www.knora.org/ontology/kuno-raeber#hasDiplomaticTranscription' ].values;
            this.convoluteTypeGermanLabel = 'Notizbuch';
            break;
          case 'HandwrittenPoem':
            this.diplomaticIRIs = res.props[ 'http://www.knora.org/ontology/kuno-raeber#hasDiplomaticTranscription' ].values;
            this.convoluteTypeGermanLabel = 'Manuskript';
            break;
          case 'PostCardPoem':
            this.convoluteTypeGermanLabel = 'Manuskript';
            break;
          case 'TypewrittenPoem':
            this.convoluteTypeGermanLabel = 'Typoskript';
            break;
          case 'PublicationPoem':
            this.convoluteTypeGermanLabel = 'DRUCK';
            break;
        }
        this.getNeighbouringPoems();
      });
  }

  private getEditedPoemText(editedTextIri: string) {
    this.http.get(Config.API + '/resources/' + encodeURIComponent(editedTextIri))
      .map(result => result.json())
      .subscribe(res => this.editedPoemText = res.props[ 'http://www.knora.org/ontology/text#hasContent' ].values[ 0 ].utf8str);
  }

  private getNeighbouringPoems() {
    const searchParamsPrev = FassungComponent.createRequestForNeighbouringPoem(this.convoluteIri, (this.poemSeqnum - 1));
    this.http.get(searchParamsPrev)
      .map(result => result.json())
      .subscribe(res => {
        if (res.subjects[ 0 ] !== undefined) {
          this.prevPoem = FassungComponent.buildRouteTitleStringFromResultSet(res, this.convoluteTitle);
        } else {
          this.prevPoem = '';
        }
      });
    const searchParamsNext = FassungComponent.createRequestForNeighbouringPoem(this.convoluteIri, (this.poemSeqnum + 1));
    this.http.get(searchParamsNext)
      .map(result => result.json())
      .subscribe(res => {
        if (res.subjects[ 0 ] !== undefined) {
          this.nextPoem = FassungComponent.buildRouteTitleStringFromResultSet(res, this.convoluteTitle);
        } else {
          this.nextPoem = '';
        }
      });
  }

  private getConvoluteIriSynopsisIriAndRelatedPoems() {
    this.http
      .get(globalSearchVariableService.API_URL +
        globalSearchVariableService.extendedSearch +
        'http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23Poem' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemIRI' +
        '&compop=EQ' +
        '&searchval=' +
        encodeURIComponent(this.urlPrefix + this.poemShortIri) +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasConvoluteIRI' +
        '&compop=EXISTS' +
        '&searchval=' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasSynopsisIRI' +
        '&compop=EXISTS' +
        '&searchval=' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasSynopsisTitle' +
        '&compop=EXISTS' +
        '&searchval='
      )
      .map(result => result.json())
      .subscribe(res => {
        if (res.subjects[ 0 ] !== undefined) {
          this.convoluteIri = res.subjects[ 0 ].value[ 1 ];
          this.synopsisIri = res.subjects[ 0 ].value[ 3 ];
          this.synopsisTitle = res.subjects[ 0 ].value[ 4 ];
          if (this.synopsisIri !== ' ') {
            this.getInformationOnRelatedPoems();
          }
        }
      });
  }

  private getInformationOnRelatedPoems() {
    const request = globalSearchVariableService.API_URL +
      globalSearchVariableService.extendedSearch +
      'http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23Poem' +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasSynopsisIRI' +
      '&compop=EQ' +
      '&searchval=' +
      encodeURIComponent(this.synopsisIri) +
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
      '&show_nrows=2000';
    return this.http.get(
      request
    )
      .map(
        (lambda: Response) => lambda.json()
      )
      .subscribe(response => {
        this.relatedPoems = [];
          for (let res of response.subjects) {
            this.relatedPoems.push('/' + res.value[ 3 ] + '/' +
              FassungComponent.produceFassungsLink(res.value[ 7 ], res.value[ 5 ]) +
              '###' + res.value[ 7 ] + '###' + res.value[ 4 ] + '###' + res.value[ 1 ]);
          }
        }
      );
  }
}
