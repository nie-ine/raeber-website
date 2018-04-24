/**
 * Created by Reto Baumgartner (rfbaumgartner) on 05.07.17.
 */

import { Component, Input, OnChanges } from '@angular/core';
import { Http } from '@angular/http';
import { KunoRaeber, Text, Work } from '../../shared/utilities/iris';
import { KnoraResource } from '../../shared/utilities/knora-request';

@Component({
  moduleId: module.id,
  selector: 'rae-fassung-steckbrief',
  templateUrl: 'fassung-steckbrief.component.html',
  styleUrls: [ 'fassung-steckbrief.component.css' ]
})
export class FassungSteckbriefComponent implements OnChanges {
  @Input() fassungIRI: string;
  @Input() konvolutIRI: string;
  @Input() convoluteTitle: string;

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
  referenceTitle: string;
  referencePoemIRI: string;
  unauthorizedPublication: Array<string>;
  publishedIn: Array<string>;

  carrierIRI: string;

  schreibzeugMap = {
    'pencil': 'Bleistift',
    'pen': 'Tinte',
    'writing utensil': '',
    'typewriter': 'Schreibmaschine'
  };
  textartMap: any = {
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
    //console.log("Fassungs-IRI: " +  this.fassungIRI);
    //console.log("Konvolut-IRI: " + this.konvolutIRI);
    if (this.fassungIRI) {
      this.sub = this.http.get(new KnoraResource(this.fassungIRI).toString())
        .map(response => response.json()).subscribe(res => {

          try {
            this.isWrittenWith = res.props[ Text.isWrittenWith ][ 'value_restype' ][ 0 ];
          } catch (TypeError) {
            this.isWrittenWith = null;
          }

          try {
            this.specialDescription = res.props[ Text.hasSpecialDescription ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.specialDescription = null;
          }

          try {
            this.lastAuthorizedPublication = res.props[ Work.hasLastAuthorizedPublication ].values[ 0 ];
          } catch (TypeError) {
            this.lastAuthorizedPublication = null;
          }

          try {
            this.pageNumberDescription = res.props[ Work.hasPageNumberDescription ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.pageNumberDescription = null;
          }

          try {
            this.isFinalVersion = res.props[ Text.isFinalVersion ].values[ 0 ];
          } catch (TypeError) {
            this.isFinalVersion = null;
          }

          this.sameEditionAs = [];
          try {
            for (let i = 0; i <
            res.props[ KunoRaeber.hasSameEditionAs ].values.length; i++) {
              this.sameEditionAs
                .push(res.props[ KunoRaeber.hasSameEditionAs ].values[ i ]);
            }
          } catch (TypeError) {
            // skip if there is no same edition
          }

          try {
            this.structure = res.props[ Text.hasStructure ][ 'value_restype' ][ 0 ];
          } catch (TypeError) {
            this.structure = null;
          }

          try {
            this.detailDescription =
              res.props[ Text.hasDetailDescription ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.detailDescription = null;
          }

          try {
            this.publishingState =
              res.props[ Work.hasPublishingState ][ 'value_restype' ][ 0 ];
          } catch (TypeError) {
            this.publishingState = null;
          }

          try {
            this.hasStrophen =
              res.props[ Text.hasStrophe ].values[ 0 ];
          } catch (TypeError) {
            this.hasStrophen = null;
          }

          try {
            this.isPartOfCycle =
              res.props[ Text.isPartOfCycle ].values[ 0 ];
          } catch (TypeError) {
            this.isPartOfCycle = null;
          }

          try {
            this.isInDialect =
              res.props[ Text.isInDialect ].values[ 0 ];
          } catch (TypeError) {
            this.isInDialect = null;
          }

          try {
            this.nachlassPublicationDescription =
              res.props[ Work.hasNachlassPublicationDescription ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.nachlassPublicationDescription = null;
          }

          try {
            this.publicationNumber =
              res.props[ Text.hasPublicationNumber ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.publicationNumber = null;
          }

          try {
            this.referenceTitle =
              res.props[ KunoRaeber.hasReferenceTitle ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.referenceTitle = null;
          }

          try {
            this.referencePoemIRI =
              res.props[ KunoRaeber.hasReferencePoem ].values[ 0 ];
          } catch (TypeError) {
            this.referencePoemIRI = null;
          }

          this.unauthorizedPublication = [];
          try {
            for (let i = 0; i <
            res.props[ Work.hasUnauthorizedPublication ].values.length; i++) {
              this.unauthorizedPublication
                .push(res.props[ Work.hasUnauthorizedPublication ].values[ i ]);
            }
          } catch (TypeError) {
            // skip if there is no same edition
          }

          this.publishedIn = [];
          try {
            for (let i = 0; i <
            res.props[ Work.isPublishedIn ].values.length; i++) {
              this.publishedIn
                .push(res.props[ Work.isPublishedIn ].values[ i ]);
            }
          } catch (TypeError) {
            // skip if there is no same edition
          }

          try {
            this.carrierIRI = res.props[ KunoRaeber.isInNotebook ].values[ 0 ];
          } catch (TypeError) {
            // skip if there is no notebook
          }
          try {
            this.carrierIRI = res.props[ KunoRaeber.isInManuscript ].values[ 0 ];
          } catch (TypeError) {
            // skip if there is no notebook
          }
          try {
            this.carrierIRI = res.props[ KunoRaeber.isInTypescript ].values[ 0 ];
          } catch (TypeError) {
            // skip if there is no notebook
          }
          try {
            this.carrierIRI = res.props[ KunoRaeber.isInDiary ].values[ 0 ];
          } catch (TypeError) {
            // skip if there is no diary entry
          }
        });
    }
  }
}
