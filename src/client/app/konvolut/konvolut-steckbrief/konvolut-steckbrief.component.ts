/**
 * Created by retobaumgartner on 06.06.17.
 */
import { Component, Input, OnChanges } from '@angular/core';
import { Http } from '@angular/http';
import { DateFormatService } from '../../shared/utilities/date-format.service';
import { MdDialog } from '@angular/material';
import { globalSearchVariableService } from '../../suche/globalSearchVariablesService';


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
  private sub: any;
  private sub2: any;

  constructor(private http: Http, private dateFormatService: DateFormatService, public dialog: MdDialog) {}

  ngOnChanges() {
    if (this.IRI) {
      this.sub = this.http.get(globalSearchVariableService.API_URL
        + '/resources/' + encodeURIComponent(this.IRI))
        .map(response => response.json()).subscribe(res => {

          this.konvoluttyp = res.resinfo.restype_label;

          try {
            this.publicationTitle = res.props[ 'http://www.knora.org/ontology/work#hasPublicationDescription' ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.publicationTitle = null;
          }

          try {
            this.publisherDescription = res.props[ 'http://www.knora.org/ontology/work#hasPublisherDescription' ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.publisherDescription = null;
          }

          try {
            this.printerDescription = res.props[ 'http://www.knora.org/ontology/work#hasPrinterDescription' ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.printerDescription = null;
          }

          try {
            this.convoluteDescription = res.props[ 'http://www.knora.org/ontology/text#hasConvoluteDescription' ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.convoluteDescription = null;
          }

          try {
            this.carrierDescription = res.props[ 'http://www.knora.org/ontology/text#hasCarrierDescription' ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.carrierDescription = null;
          }

          try {
            this.comment = res.props[ 'http://www.knora.org/ontology/text#hasComment' ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.comment = null;
          }

          try {
            this.archiveSignature = res.props[ 'http://www.knora.org/ontology/work#hasArchiveSignature' ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.archiveSignature = null;
          }

          try {
            this.convoluteSizeDescripton =
              res.props[ 'http://www.knora.org/ontology/text#hasConvoluteSizeDescription' ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.convoluteSizeDescripton = null;
          }

          try {
            this.convoluteContentRepresentation =
              res.props[ 'http://www.knora.org/ontology/text#hasConvoluteContentRepresentation' ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.convoluteContentRepresentation = null;
          }

          try {
            this.convoluteOriginDescription =
              res.props[ 'http://www.knora.org/ontology/text#hasConvoluteOriginDescription' ].values[ 0 ].utf8str;
          } catch (TypeError) {
            this.convoluteOriginDescription = null;
          }

          try {
            this.creatingPeriod = res.props[ 'http://www.knora.org/ontology/human#hasCreatingPeriod' ].values[ 0 ];
          } catch (TypeError) {
            this.creatingPeriod = null;
          }

          this.containsEarlierStagesOfPublicationIRIs = [];
          try {
            for (let i = 0; i <
            res.props[ 'http://www.knora.org/ontology/text#containsEarlierStagesOfPublication' ].values.length; i++) {
              this.containsEarlierStagesOfPublicationIRIs
                .push(res.props[ 'http://www.knora.org/ontology/text#containsEarlierStagesOfPublication' ].values[ i ]);
            }
          } catch (TypeError) {
            // skip if there is no print convolute
          }

          this.laterStagesIRIs = [];
          try {
            for (let i = 0; i <
            res.props[ 'http://www.knora.org/ontology/kuno-raeber#containsEarlierStagesOfManuscriptConvolute' ]
              .values.length; i++) {
              this.laterStagesIRIs
                .push(res
                  .props[ 'http://www.knora.org/ontology/kuno-raeber#containsEarlierStagesOfManuscriptConvolute' ]
                  .values[ i ]);
            }
          } catch (TypeError) {
            // skip if there is no manuscript of this notebook
          }
          try {
            for (let i = 0; i <
            res.props[ 'http://www.knora.org/ontology/kuno-raeber#containsEarlierStagesOfTypescriptConvolute' ]
              .values.length; i++) {
              this.laterStagesIRIs
                .push(res
                  .props[ 'http://www.knora.org/ontology/kuno-raeber#containsEarlierStagesOfTypescriptConvolute' ]
                  .values[ i ]);
            }
          } catch (TypeError) {
            // skip if there is no typescript of this notebook or manuscript
          }

          this.earlierStagesIRIs = [];
          try {
            for (let i = 0; i <
            res.props[ 'http://www.knora.org/ontology/kuno-raeber#containsLaterStagesOfNotebook' ].values.length; i++) {
              this.earlierStagesIRIs
                .push(res.props[ 'http://www.knora.org/ontology/kuno-raeber#containsLaterStagesOfNotebook' ]
                  .values[ i ]);
            }
          } catch (TypeError) {
            // skip if there is no notebook preceding this manuscript, typescript or publication
          }
          try {
            for (let i = 0; i <
            res.props[ 'http://www.knora.org/ontology/kuno-raeber#containsLaterStagesOfManuscriptConvolute' ]
              .values.length; i++) {
              this.earlierStagesIRIs
                .push(res.props[ 'http://www.knora.org/ontology/kuno-raeber#containsLaterStagesOfManuscriptConvolute' ]
                  .values[ i ]);
            }
          } catch (TypeError) {
            // skip if there is no manuscript preceding this typescript or publication
          }
          try {
            for (let i = 0; i <
            res.props[ 'http://www.knora.org/ontology/kuno-raeber#containsLaterStagesOfTypescriptConvolute' ]
              .values.length; i++) {
              this.earlierStagesIRIs
                .push(res.props[ 'http://www.knora.org/ontology/kuno-raeber#containsLaterStagesOfTypescriptConvolute' ]
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


  formatDate(date: string) {
    return this.dateFormatService.germanNumericDate(date);
  }
}
