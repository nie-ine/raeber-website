/**
 * Created by Reto Baumgartner (rfbaumgartner) on 05.07.17.
 */

import { Component, Input, OnChanges } from '@angular/core';
import { Http } from '@angular/http';
import { globalSearchVariableService } from '../../suche/globalSearchVariablesService';

@Component({
  moduleId: module.id,
  selector: 'rae-fassung-steckbrief',
  templateUrl: 'fassung-steckbrief.component.html'
})
export class FassungSteckbriefComponent implements OnChanges {
  @Input() fassungIRI: string;
  @Input() konvolutIRI: string;

  isWrittenWith: string;
  specialDescription: string;
  lastAuthorizedPublication: string;
  pageNumberDescription: string;
  isFinalVersion: boolean;
  sameEditionAs: Array<string>;
  structure: string;
  detailDescription: string;
  publishingState: string;
  hasStrophen: boolean;
  isPartOfCycle: boolean;
  isInDialect: boolean;
  nachlassPublicationDescription: string;
  publicationNumber: string;
  unauthorizedPublication: Array<string>;
  publishedIn: Array<string>;
  referencePoemIRIs: Array<string>;

  carrierIRIs: Array<string>;

  schreibzeugMap = {
    'pencil': 'Bleistift',
    'pen': 'Tinte',
    'writing utensil': '',
    'typewriter': 'Schreibmaschine'
  };
  textartMap = {
    'structure': '[...]',
    'free verse': 'Reimlose Verse',
    'rhyming verse': 'Gereimte Verse',
    'rhythmic prose': 'Rhythmische Prosa',
    'note prose': 'Prosanotat'
  };

  private sub: any;

  constructor(private http: Http) {
  }

  ngOnChanges() {
    console.log("Fassungs-IRI: " + this.fassungIRI);
    console.log("Konvolut-IRI: " + this.konvolutIRI);
    if (this.fassungIRI) {
      this.sub = this.http.get(globalSearchVariableService.API_URL
        + '/resources/' + encodeURIComponent(this.fassungIRI))
        .map(response => response.json()).subscribe(res => {

          try {
            this.isWrittenWith = res.props[ 'http://www.knora.org/ontology/text#isWrittenWith' ][ 'value_restype' ][ 0 ];
          } catch (TypeError) {
            this.isWrittenWith = null;
          }

          try {
            this.specialDescription = res.props[ 'http://www.knora.org/ontology/text#hasSpecialDescription' ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.specialDescription = null;
          }

          try {
            this.lastAuthorizedPublication = res.props[ 'http://www.knora.org/ontology/work#hasLastAuthorizedPublication' ].values[ 0 ];
          } catch (TypeError) {
            this.lastAuthorizedPublication = null;
          }

          try {
            this.pageNumberDescription = res.props[ 'http://www.knora.org/ontology/work#hasPageNumberDescription' ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.pageNumberDescription = null;
          }

          try {
            this.isFinalVersion = res.props[ 'http://www.knora.org/ontology/text#isFinalVersion' ].values[ 0 ];
          } catch (TypeError) {
            this.isFinalVersion = null;
          }

          this.sameEditionAs = [];
          try {
            for (let i = 0; i <
            res.props[ 'http://www.knora.org/ontology/kuno-raeber#hasSameEditionAs' ].values.length; i++) {
              this.sameEditionAs
                .push(res.props[ 'http://www.knora.org/ontology/kuno-raeber#hasSameEditionAs' ].values[ i ]);
            }
          } catch (TypeError) {
            // skip if there is no same edition
          }

          try {
            this.structure = res.props[ 'http://www.knora.org/ontology/text#hasStructure' ][ 'value_restype' ][ 0 ];
          } catch (TypeError) {
            this.structure = null;
          }

          try {
            this.detailDescription =
              res.props[ 'http://www.knora.org/ontology/text#hasDetailDescription' ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.detailDescription = null;
          }

          try {
            this.publishingState =
              res.props[ 'http://www.knora.org/ontology/work#hasPublishingState' ][ 'value_restype' ][ 0 ];
          } catch (TypeError) {
            this.publishingState = null;
          }

          try {
            this.hasStrophen =
              res.props[ 'http://www.knora.org/ontology/text#hasStrophe' ].values[ 0 ];
          } catch (TypeError) {
            this.hasStrophen = null;
          }

          try {
            this.isPartOfCycle =
              res.props[ 'http://www.knora.org/ontology/text#isPartOfCycle' ].values[ 0 ];
          } catch (TypeError) {
            this.isPartOfCycle = null;
          }

          try {
            this.isInDialect =
              res.props[ 'http://www.knora.org/ontology/text#isInDialect' ].values[ 0 ];
          } catch (TypeError) {
            this.isInDialect = null;
          }

          try {
            this.nachlassPublicationDescription =
              res.props[ 'http://www.knora.org/ontology/work#hasNachlassPublicationDescription' ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.nachlassPublicationDescription = null;
          }

          try {
            this.publicationNumber =
              res.props[ 'http://www.knora.org/ontology/text#hasPublicationNumber' ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.publicationNumber = null;
          }

          this.unauthorizedPublication = [];
          try {
            for (let i = 0; i <
            res.props[ 'http://www.knora.org/ontology/work#hasUnauthorizedPublication' ].values.length; i++) {
              this.unauthorizedPublication
                .push(res.props[ 'http://www.knora.org/ontology/work#hasUnauthorizedPublication' ].values[ i ]);
            }
          } catch (TypeError) {
            // skip if there is no same edition
          }

          this.publishedIn = [];
          try {
            for (let i = 0; i <
            res.props[ 'http://www.knora.org/ontology/work#isPublishedIn' ].values.length; i++) {
              this.publishedIn
                .push(res.props[ 'http://www.knora.org/ontology/work#isPublishedIn' ].values[ i ]);
            }
          } catch (TypeError) {
            // skip if there is no same edition
          }

          this.referencePoemIRIs = [];
          try {
            for (let i = 0; i <
            res.props[ 'http://www.knora.org/ontology/kuno-raeber#hasReferencePoem' ].values.length; i++) {
              this.referencePoemIRIs
                .push(res.props[ 'http://www.knora.org/ontology/kuno-raeber#hasReferencePoem' ].values[ i ]);
            }
          } catch (TypeError) {
            // skip if there is no bezugstext
          }

          this.carrierIRIs = [];
          try {
            for (let i = 0; i <
            res.props[ 'http://www.knora.org/ontology/kuno-raeber#isInNotebook' ].values.length; i++) {
              this.carrierIRIs
                .push(res.props[ 'http://www.knora.org/ontology/kuno-raeber#isInNotebook' ].values[ i ]);
            }
          } catch (TypeError) {
            // skip if there is no notebook
          }
          try {
            for (let i = 0; i <
            res.props[ 'http://www.knora.org/ontology/text#isInManuscript' ].values.length; i++) {
              this.carrierIRIs
                .push(res.props[ 'http://www.knora.org/ontology/text#isInManuscript' ].values[ i ]);
            }
          } catch (TypeError) {
            // skip if there is no manuscript
          }
          try {
            for (let i = 0; i <
            res.props[ 'http://www.knora.org/ontology/text#isInTypescript' ].values.length; i++) {
              this.carrierIRIs
                .push(res.props[ 'http://www.knora.org/ontology/text#isInTypescript' ].values[ i ]);
            }
          } catch (TypeError) {
            // skip if there is no notebook
          }

        });
    }
  }
}
