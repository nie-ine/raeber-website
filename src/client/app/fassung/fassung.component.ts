/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/7/17.
 */
import { AfterViewChecked, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Config } from '../shared/config/env.config';
import { ExtendedSearch, KnoraProperty } from '../shared/utilities/knora-api-params';

@Component({
  moduleId: module.id,
  selector: 'rae-fassung',
  templateUrl: 'fassung.component.html',
  styleUrls: [ 'fassung.component.css' ]
})
export class FassungComponent implements OnInit, AfterViewChecked {
  creationDate = 'Freitag, 01 Juni 1979';
  modificationDate = 'Samstag, 13 Mai 2017';

  zeigeKonstituiert: boolean = true;
  zeigeDiplomatisch: boolean = false;

  urlPrefix: string = 'http://rdfh.ch/kuno-raeber/';

  pageIRIs: Array<string>;

  poem_id: string;
  poemTitle: string;
  poemSeqnum: number;
  poemConvoluteIri: string;
  poemConvoluteType: string;
  convoluteProperty: string;
  editedPoemText: string;
  textEdition: string;
  konvolutType: string;
  konvolutIRI: string;
  konvolutTitel: string;
  synopseIRI: string;
  workTitle: string;
  otherWorkExpressions: any[] = [];
  otherWorkExpressionsIri: string[];

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

  constructor(private http: Http, private route: ActivatedRoute, private router: Router, private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.poem_resizable = true;
    this.show_register = true;

    // TODO: Change when route definitions have been changed
    this.konvolutTitel = decodeURIComponent(this.router.url.split('/')[ 1 ]);
    this.poem_id = this.router.url.split('/')[ 2 ].split('---')[ 1 ];

    this.http
      .get(Config.API + 'resources/' + encodeURIComponent(this.urlPrefix + this.poem_id))
      .map(result => result.json())
      .subscribe(res => {
        console.log(res);
        this.poemTitle = res.props[ 'http://www.knora.org/ontology/text#hasTitle' ].values[ 0 ].utf8str;
        this.textEdition = res.props[ 'http://www.knora.org/ontology/kuno-raeber#hasEdition' ].values[ 0 ];
        this.getEditedPoemText(this.textEdition);
        this.pageIRIs = res.props[ 'http://www.knora.org/ontology/kuno-raeber#isOnPage' ].values;
        this.poemSeqnum = res.props[ 'http://www.knora.org/ontology/knora-base#seqnum' ].values[ 0 ];
        this.poemConvoluteType = res.resdata[ 'restype_name' ].split('#')[ 1 ];
        switch (this.poemConvoluteType) {
          case 'PoemNote':
            this.convoluteProperty = 'http://www.knora.org/ontology/kuno-raeber#isInNotebook';
            break;
          case 'HandwrittenPoem':
            this.convoluteProperty = 'http://www.knora.org/ontology/text#isInManuscript';
            break;
          case 'PostCardPoem':
            this.convoluteProperty = 'http://www.knora.org/ontology/text#isOnPostcard';
            break;
          case 'TypewrittenPoem':
            this.convoluteProperty = 'http://www.knora.org/ontology/text#isInTypescript';
            break;
          case 'PublicationPoem':
            this.convoluteProperty = 'http://www.knora.org/ontology/work#isPublishedIn';
            break;
        }
        this.poemConvoluteIri = res.props[ this.convoluteProperty ].values[ 0 ];
        this.getPrevNextPoems(this.poemSeqnum);
      });

    this.http
      .get(Config.API + 'graphdata/' + encodeURIComponent(this.urlPrefix + this.poem_id) + '?depth=2')
      .map(result => result.json())
      .subscribe(res => {
        for (const r of res.nodes) {
          console.log(r);
          if (r[ 'resourceClassIri' ].split('#')[ 1 ] === ('PoemNotebook' ||
              'PoemManuscriptConvolute' ||
              'PoemPostcardConvolute' ||
              'PoemTypescriptConvolute' ||
              'PrintedPoemBookPublication' ||
              'PolyAuthorPublication')) {
            this.konvolutIRI = r[ 'resourceIri' ];
            this.konvolutType = r[ 'resourceClassIri' ].split('#')[ 1 ];
          }
          if (r[ 'resourceClassIri' ].split('#')[ 1 ] === 'Work') {
            this.synopseIRI = r[ 'resourceIri' ];
            this.getWork(this.synopseIRI);
          }
        }
      });
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
          this.otherWorkExpressionsIri = res.props[ 'http://www.knora.org/ontology/work#isExpressedIn' ].values;
          for (const { item, index } of this.otherWorkExpressionsIri.map((item, index) => ({ item, index }))) {
            this.getOtherPoemsTitle(item, index);
          }
        }
      );
  }

  private getOtherPoemsTitle(poemIri: string, index: number) {
    this.http.get(Config.API + 'resources/' + encodeURIComponent(poemIri))
      .map(result => result.json())
      .subscribe(res => {
          const otherPoemTitle = res.props[ 'http://www.knora.org/ontology/text#hasTitle' ].values[ 0 ].utf8str;
        this.otherWorkExpressions[ index ] = '/' + this.konvolutTitel + '/' +
          FassungComponent.produceFassungsLink(otherPoemTitle, poemIri) +
            '###' + otherPoemTitle;
        }
      );
  }

  private getPrevNextPoems(poemSeqnum: number) {
    let searchParamsPrev = new ExtendedSearch();
    searchParamsPrev.filterByRestype = 'http://www.knora.org/ontology/kuno-raeber#Poem';
    searchParamsPrev.property = new KnoraProperty('http://www.knora.org/ontology/knora-base#seqnum', 'EQ', (poemSeqnum - 1).toString());
    searchParamsPrev.property = new KnoraProperty(this.convoluteProperty, 'EQ', this.poemConvoluteIri);
    let searchParamsNext = new ExtendedSearch();
    searchParamsNext.filterByRestype = 'http://www.knora.org/ontology/kuno-raeber#Poem';
    searchParamsNext.property = new KnoraProperty('http://www.knora.org/ontology/knora-base#seqnum', 'EQ', (poemSeqnum + 1).toString());
    searchParamsNext.property = new KnoraProperty(this.convoluteProperty, 'EQ', this.poemConvoluteIri);
    console.log(searchParamsPrev.toString());
    console.log(searchParamsNext.toString());
    this.http.get(searchParamsPrev.toString())
      .map(result => result.json())
      .subscribe(res => {
        console.log(res);
        let poemIri = res.subjects[ 0 ][ 'obj_id' ];
        console.log(poemIri);
        this.prevPoem = poemIri.split('/')[ 4 ];
        this.http.get(Config.API + 'resources/' + encodeURIComponent(poemIri))
          .map(result => result.json())
          .subscribe(res => {
            if (res.nhits !== '0') {
              console.log(this.konvolutTitel);
              this.prevPoem = '/' + this.konvolutTitel + '/' +
                encodeURIComponent(res.props[ 'http://www.knora.org/ontology/text#hasTitle' ].values[ 0 ].utf8str) +
                '---' + this.prevPoem + '###' +
                res.props[ 'http://www.knora.org/ontology/text#hasTitle' ].values[ 0 ].utf8str;
              console.log(this.prevPoem);
            } else {
              this.prevPoem = '###';
            }
          });
      });
    this.http.get(searchParamsNext.toString())
      .map(result => result.json())
      .subscribe(res => {
        let poemIri = res.subjects[ 0 ][ 'obj_id' ];
        console.log(poemIri);
        this.nextPoem = poemIri.split('/')[ 4 ];
        this.http.get(Config.API + 'resources/' + encodeURIComponent(poemIri))
          .map(result => result.json())
          .subscribe(res => {
            if (res.nhits !== '0') {
              console.log(this.konvolutTitel);
              this.nextPoem = '/' + this.konvolutTitel + '/' +
                encodeURIComponent(res.props[ 'http://www.knora.org/ontology/text#hasTitle' ].values[ 0 ].utf8str) +
                '---' + this.nextPoem + '###' +
                res.props[ 'http://www.knora.org/ontology/text#hasTitle' ].values[ 0 ].utf8str;
              console.log(this.nextPoem);
            } else {
              this.prevPoem = '###';
            }
          });
      });

  }

}
