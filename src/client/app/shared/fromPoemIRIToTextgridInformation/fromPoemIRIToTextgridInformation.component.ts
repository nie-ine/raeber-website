import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Http, Response } from '@angular/http';
import { globalSearchVariableService } from '../../suche/globalSearchVariablesService';
import { Config } from '../config/env.config';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'from-poem-iri-to-textgrid-information',
  templateUrl: 'fromPoemIRIToTextgridInformation.component.html'
})
export class FromPoemIRIToTextgridInformationComponent implements OnChanges {
  @Input() poemIRIArray: Array<any>;
  @Input() konvolutIRI: Array<any>;
  @Output() sendPoemInformationBack: EventEmitter<any> = new EventEmitter<any>();
  responseArray: Array<any>;
  i: number;
  countRequests: number;
  poemInformation: Array<any>;

  constructor(private http: Http, private router: Router) {

  }

  ngOnChanges() {
    if(this.konvolutIRI) console.log('Konvoluttitle to get Poems with Cache ' + this.konvolutIRI);
    this.poemInformation = [];
    this.countRequests = 0;
    //if (this.poemIRIArray !== undefined && this.poemIRIArray.length !== 0) {
    //  for (this.i = 0; this.i < this.poemIRIArray.length; this.i++) {
        //console.log('get information for this poem:');
        //this.getTitleAndDate(this.poemIRIArray[ this.i ], this.i);
    //    this.poemInformation[ this.i ] = [];
    //  }
    //}
    this.performQuery();
  }

//}

performQuery() {
  for(this.i = 0; this.i < 350; this.i ++) {
    this.poemInformation[this.i] = [];
    this.poemInformation[this.i][0] = 'Fake Title';
    this.poemInformation[this.i][1] = 'Creation Date';
    this.poemInformation[this.i][2] = 'Text';
  }
  this.sendPoemInformationBack.emit(this.poemInformation);
}

  /*
  getTitleAndDate(IRI: string, i: number) {
    //console.log('get Title and Date' + IRI);
    this.performQuery(IRI, i);
  }

  performQuery(queryPart: string, i: number) {
    return this.http.get
    (
      globalSearchVariableService.API_URL +
      '/resources/' +
      encodeURIComponent(queryPart)
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          //console.log(data); */

          /*
          Fields in poemInformation
          0: Poem title
          1: Creation date of Poem
          2: Edited text of this poem
          3: Poem IRI
          4: Same edition as poem: IRI
          5: Array: Resource type of poem
          6: Convolute link
          7: Convolute title
          8: seqnum of poem for sorting as in convolute
          9: Array: synopse IRI
           */
/*
          this.poemInformation[ i ][ 0 ] = data.props[ 'http://www.knora.org/ontology/text#hasTitle' ].values[ 0 ].utf8str;
          this.poemInformation[ i ][ 1 ] = data.props[ 'http://www.knora.org/ontology/human#hasCreationDate' ].values[ 0 ].dateval1;
          this.poemInformation[ i ][ 3 ] = queryPart;
          this.poemInformation[ i ][ 5 ] = [];
          this.poemInformation[ i ][ 9 ] = [];
          this.poemInformation[ i ][ 8 ] = data.props['http://www.knora.org/ontology/knora-base#seqnum'].values[ 0 ];
          if (this.router.url.split('/')[ 1 ] === 'synopsen' || this.router.url.split('/')[ 1 ] === 'suche') {
            const sameEditionAs = data.props[ 'http://www.knora.org/ontology/kuno-raeber#hasSameEditionAs' ];
            this.poemInformation[ i ][ 4 ] = sameEditionAs.values !== undefined;
            this.poemInformation[ i ][ 5 ] = data.resdata[ 'restype_name' ].split('#')[ 1 ];
            this.getConvoluteIriName(this.poemInformation[ i ][ 5 ], data, i);
          } else {
            for (let j = 0; j < data.incoming.length; j++ ) {
              if (data.incoming[ j ].ext_res_id.pid === 'http://www.knora.org/ontology/work#isExpressedIn') {
                this.poemInformation[ i ][ 9 ][ j ] = data.incoming[ j ].ext_res_id.id;
              }
            }
          }
          // console.log(data.resdata[ 'restype_name' ].split('#')[ 1 ]);
          // console.log(data.resdata[ 'restype_name' ]);
          // console.log(this.poemInformation[ i ][ 0 ]);
          // console.log(this.poemInformation[ i ][ 1 ]);
          this.performTextQuery(data.props[ 'http://www.knora.org/ontology/kuno-raeber#hasEdition' ].values[ 0 ], i);
          return data.resourcetypes;
        }
      )
      .subscribe(response => this.responseArray = response);
  }

  performTextQuery(IRI: string, i: number) {
    //console.log('get Text: ' + IRI);
    return this.http.get
    (
      globalSearchVariableService.API_URL +
      '/resources/' +
      encodeURIComponent(IRI)
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          //console.log(data);
          this.poemInformation[ i ][ 2 ] = data.props[ 'http://www.knora.org/ontology/text#hasContent' ].values[ 0 ].utf8str;
          //console.log(this.poemInformation[i][2]);
          this.countRequests += 1;
          if (this.countRequests = this.poemIRIArray.length) {
            this.sendPoemInformationBack.emit(this.poemInformation);
          }
          return data.resourcetypes;
        }
      )
      .subscribe(response => this.responseArray = response);

  }

  private getConvoluteIriName(res: string, data: any, i: number): void {
    let convolute: string;
    switch (res) {
      case 'PoemNote':
        //console.log(data);
        this.getConvoluteTitleAlias(data.props[ 'http://www.knora.org/ontology/kuno-raeber#isInNotebook' ].values[ 0 ],
          'notizbuecher', i);
        break;
      case 'HandwrittenPoem':
        const manuscriptIri = data.props[ 'http://www.knora.org/ontology/text#isInManuscript' ].values[ 0 ];
        this.getConvoluteIri(manuscriptIri, 'manuskripte', i);
        break;
      case 'PostCardPoem':
        this.getConvoluteIri(data.props[ 'http://www.knora.org/ontology/text#isOnPostcard' ].values[ 0 ], 'karten', i);
        break;
      case 'TypewrittenPoem':
        const typescriptIri = data.props[ 'http://www.knora.org/ontology/text#isInTypescript' ].values[ 0 ];
        this.getConvoluteIri(typescriptIri, 'typoskripte', i);
        break;
      case 'PublicationPoem':
        // console.log(data);
        // FIXME: Remove next two lines if data problem is solved!
        // this.poemInformation[ i ][ 6 ] = '';
        // this.poemInformation[ i ][ 7 ] = '';
        // FIXME: Data not available?
        const publicationIri = (data.props[ 'http://www.knora.org/ontology/work#isPublishedIn' ].values === undefined ?
        data.props[ 'http://www.knora.org/ontology/work#hasLastAuthorizedPublication' ].values[ 0 ] :
        data.props[ 'http://www.knora.org/ontology/work#isPublishedIn' ].values[ 0 ]);
        this.getConvoluteTitleAlias(publicationIri, 'drucke', i);
    }
  }

  private getConvoluteIri(iri: string, convType: string, i: number): void {
    let convoluteIri: string;
    let convoluteLink: string;

    this.http.get(Config.API + 'resources/' + encodeURIComponent(iri)).map((res: any) => res.json())
      .subscribe((res: any) => {
        switch (convType) {
          case 'manuskripte':
            convoluteIri = res.props[ 'http://www.knora.org/ontology/kuno-raeber#isPartOfManuscriptConvolute' ].values[ 0 ];
            break;
          case 'karten':
            convoluteIri = res.props[ 'http://www.knora.org/ontology/kuno-raeber#isPartOfPostcardConvolute' ].values[ 0 ];
            break;
          case 'typoskripte':
            convoluteIri = res.props[ 'http://www.knora.org/ontology/kuno-raeber#isPartOfTypescriptConvolute' ].values[ 0 ];
            break;
        }
        this.getConvoluteTitleAlias(convoluteIri, convType, i);
      });
  }

  private getConvoluteTitleAlias(convoluteIri: string, convType: string, i: number): void {
    this.http.get(Config.API + 'resources/' + encodeURIComponent(convoluteIri)).map((res: any) => res.json())
      .subscribe((res: any) => {
        // if (convType === 'drucke') {
        //  this.poemInformation[ i ][ 7 ] = res.props[ 'http://www.knora.org/ontology/work#hasPublicationTitle' ].values[ 0 ][ 'utf8str' ];
        //} else {
          // this.poemInformation[ i ][ 7 ] = res.props[ 'http://www.knora.org/ontology/text#hasConvoluteTitle' ].values[ 0 ][ 'utf8str' ];
        //}
        console.log(res);
        if (res.props[ 'http://www.knora.org/ontology/text#hasConvoluteTitle' ] === undefined) {
          this.poemInformation[ i ][ 7 ] = res.props[ 'http://www.knora.org/ontology/work#hasPublicationTitle' ].values[ 0 ][ 'utf8str' ];
        } else {
          this.poemInformation[ i ][ 7 ] = res.props[ 'http://www.knora.org/ontology/text#hasConvoluteTitle' ].values[ 0 ][ 'utf8str' ];
        }
        // TODO: Check links!
        this.poemInformation[ i ][ 6 ] =
          '/' + convType + '/' + res.props[ 'http://www.knora.org/ontology/text#hasAlias' ].values[ 0 ][ 'utf8str' ];
      });
  } */
}
