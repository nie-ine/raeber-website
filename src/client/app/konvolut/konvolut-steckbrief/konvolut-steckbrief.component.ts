/**
 * Created by retobaumgartner on 06.06.17.
 */
import { Component, Input, OnChanges } from '@angular/core';
import { Http } from '@angular/http';
import { MdDialog } from '@angular/material';
import { DateFormatService } from '../../shared/utilities/date-format.service';
import { KonvolutKommentarComponent } from '../konvolut-kommentar/konvolut-kommentar.component';
import { KOMMENTARINHALTE } from '../konvolut-kommentar/konvolut-kommentar-inhalte';
import { Human, KunoRaeber, Text, Work } from '../../shared/utilities/iris';
import { KnoraResource } from '../../shared/utilities/knora-api-params';

@Component({
  moduleId: module.id,
  selector: 'rae-konvolut-steckbrief',
  templateUrl: 'konvolut-steckbrief.component.html',
  styleUrls: [ 'konvolut-steckbrief.component.css' ],
  providers: [ DateFormatService ]
})
export class KonvolutSteckbriefComponent implements OnChanges {

  @Input() id: string;
  @Input() konvolutTitle: string;
  @Input() IRI: string;
  @Input() konvolutBild: string;

  konvoluttyp: string;

  publicationTitle: string;
  publisherDescription: string;
  printerDescription: string;
  convoluteDescription: string;
  carrierDescription: string;
  carrierCollectionDescription: string;
  comment: string;
  archiveSignature: string;
  convoluteSizeDescripton: string;
  convoluteContentRepresentation: string;
  convoluteOriginDescription: string;
  creatingPeriod: string;
  containsEarlierStagesOfPublicationIRIs: Array<string>;
  earlierStagesIRIs: Array<string>;
  laterStagesIRIs: Array<string>;
  stufenIRIs: Array<string>;
  commentsContent = KOMMENTARINHALTE;
  private sub: any;

  constructor(private http: Http, private dateFormatService: DateFormatService, public dialog: MdDialog) {
  }

  ngOnChanges() {
    if (this.IRI) {
      this.sub = this.http.get(new KnoraResource(this.IRI).toString())
        .map(response => response.json()).subscribe(res => {

          this.konvoluttyp = res.resinfo.restype_label;

          try {
            this.publicationTitle = res.props[ Work.hasPublicationDescription ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.publicationTitle = null;
          }

          try {
            this.publisherDescription = res.props[ Work.hasPublisherDescription ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.publisherDescription = null;
          }

          try {
            this.printerDescription = res.props[ Work.hasPrinterDescription ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.printerDescription = null;
          }

          try {
            this.convoluteDescription = res.props[ Text.hasConvoluteDescription ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.convoluteDescription = null;
          }

          try {
            this.carrierDescription = res.props[ Text.hasCarrierDescription ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.carrierDescription = null;
          }

          try {
            this.carrierCollectionDescription
              = res.props[ Text.hasCarrierCollectionDescription ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.carrierCollectionDescription = null;
          }

          try {
            this.comment = res.props[ Text.hasComment ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.comment = null;
          }

          try {
            this.archiveSignature = res.props[ Work.hasArchiveSignature ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.archiveSignature = null;
          }

          try {
            this.convoluteSizeDescripton =
              res.props[ Text.hasConvoluteSizeDescription ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.convoluteSizeDescripton = null;
          }

          try {
            this.convoluteContentRepresentation =
              res.props[ Text.hasConvoluteContentRepresentation ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.convoluteContentRepresentation = null;
          }

          try {
            this.convoluteOriginDescription =
              res.props[ Text.hasConvoluteOriginDescription ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.convoluteOriginDescription = null;
          }

          try {
            this.creatingPeriod = res.props[ Human.hasCreatingPeriod ].values[ 0 ];
          } catch (TypeError) {
            this.creatingPeriod = null;
          }

          this.containsEarlierStagesOfPublicationIRIs = [];
          try {
            for (let i = 0; i <
            res.props[ Text.containsEarlierStagesOfPublication ].values.length; i++) {
              this.containsEarlierStagesOfPublicationIRIs
                .push(res.props[ Text.containsEarlierStagesOfPublication ].values[ i ]);
            }
          } catch (TypeError) {
            // skip if there is no print convolute
          }

          this.laterStagesIRIs = [];
          try {
            for (let i = 0; i <
            res.props[ KunoRaeber.containsEarlierStagesOfManuscriptConvolute ]
              .values.length; i++) {
              this.laterStagesIRIs
                .push(res
                  .props[ KunoRaeber.containsEarlierStagesOfManuscriptConvolute ]
                  .values[ i ]);
            }
          } catch (TypeError) {
            // skip if there is no manuscript of this notebook
          }
          try {
            for (let i = 0; i <
            res.props[ KunoRaeber.containsEarlierStagesOfTypescriptConvolute ]
              .values.length; i++) {
              this.laterStagesIRIs
                .push(res
                  .props[ KunoRaeber.containsEarlierStagesOfTypescriptConvolute ]
                  .values[ i ]);
            }
          } catch (TypeError) {
            // skip if there is no typescript of this notebook or manuscript
          }

          this.earlierStagesIRIs = [];
          try {
            for (let i = 0; i <
            res.props[ KunoRaeber.containsLaterStagesOfNotebook ].values.length; i++) {
              this.earlierStagesIRIs
                .push(res.props[ KunoRaeber.containsLaterStagesOfNotebook ]
                  .values[ i ]);
            }
          } catch (TypeError) {
            // skip if there is no notebook preceding this manuscript, typescript or publication
          }
          try {
            for (let i = 0; i <
            res.props[ KunoRaeber.containsLaterStagesOfManuscriptConvolute ]
              .values.length; i++) {
              this.earlierStagesIRIs
                .push(res.props[ KunoRaeber.containsLaterStagesOfManuscriptConvolute ]
                  .values[ i ]);
            }
          } catch (TypeError) {
            // skip if there is no manuscript preceding this typescript or publication
          }
          try {
            for (let i = 0; i <
            res.props[ KunoRaeber.containsLaterStagesOfTypescriptConvolute ]
              .values.length; i++) {
              this.earlierStagesIRIs
                .push(res.props[ KunoRaeber.containsLaterStagesOfTypescriptConvolute ]
                  .values[ i ]);
            }
          } catch (TypeError) {
            // skip if there is no typoscript preceding this publication
          }
        });
    } else {
      this.publicationTitle = null;
      this.publisherDescription = null;
      this.printerDescription = null;
      this.convoluteDescription = null;
      this.carrierDescription = null;
      this.comment = null;
      this.archiveSignature = null;
      this.convoluteSizeDescripton = null;
      this.convoluteContentRepresentation = null;
      this.convoluteOriginDescription = null;
      this.creatingPeriod = null;
      this.containsEarlierStagesOfPublicationIRIs = null;
      this.earlierStagesIRIs = null;
      this.laterStagesIRIs = null;
      this.stufenIRIs = null;
    }
  }

  openDialog(comment: string): void {
    let dialogRef = this.dialog.open(KonvolutKommentarComponent, {
      // data: { text: this.comment },
      data: { text: comment },
      width: '865px',
      height: '550px'
    });
  }


  formatDate(date: string) {
    return this.dateFormatService.germanNumericDate(date);
  }
}
