/**
 * Created by retobaumgartner on 06.06.17.
 */
import { Component, Input, OnChanges } from '@angular/core';
import { Http } from '@angular/http';
import { DateFormatService } from '../../shared/utilities/date-format.service';
import { KonvolutKommentarComponent } from '../konvolut-kommentar/konvolut-kommentar.component';
import { MdDialog } from '@angular/material';


@Component({
  moduleId: module.id,
  selector: 'rae-konvolut-steckbrief',
  templateUrl: 'konvolut-steckbrief.component.html',
  styleUrls: ['konvolut-steckbrief.component.css'],
  providers: [DateFormatService]
})
export class KonvolutSteckbriefComponent implements OnChanges {

  @Input() id: string;
  @Input() konvolutTitle: string;
  @Input() IRI: string;
  @Input() konvolutBild: string;

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
  creatingPeriodStart: string;
  creatingPeriodEnd: string;
  private sub: any;
  private sub2: any;

  constructor(private http: Http, private dateFormatService: DateFormatService, public dialog: MdDialog) {
  }

  ngOnChanges() {
    if (this.IRI) {
      this.sub = this.http.get('http://knora.nie-ine.ch/v1/resources/' + encodeURIComponent(this.IRI))
        .map(response => response.json()).subscribe(res => {

          try {
            this.publicationTitle = res.props['http://www.knora.org/ontology/work#hasPublicationDescription'].values[0].utf8str;
          } catch (TypeError) {
          }

          try {
            this.publisherDescription = res.props['http://www.knora.org/ontology/work#hasPublisherDescription'].values[0].utf8str;
          } catch (TypeError) {
          }

          try {
            this.printerDescription = res.props['http://www.knora.org/ontology/work#hasPrinterDescription'].values[0].utf8str;
          } catch (TypeError) {
          }

          try {
            this.convoluteDescription = res.props['http://www.knora.org/ontology/text#hasConvoluteDescription'].values[0].utf8str;
          } catch (TypeError) {
          }

          try {
            this.carrierDescription = res.props['http://www.knora.org/ontology/text#hasCarrierDescription'].values[0].utf8str;
          } catch (TypeError) {
          }

          try {
            this.comment = res.props['http://www.knora.org/ontology/text#hasComment'].values[0].utf8str;
          } catch (TypeError) {
          }

          try {
            this.archiveSignature = res.props['http://www.knora.org/ontology/work#hasArchiveSignature'].values[0].utf8str;
          } catch (TypeError) {
          }

          try {
            this.archiveSignature = res.props['http://www.knora.org/ontology/text#hasConvoluteSizeDescription'].values[0].utf8str;
          } catch (TypeError) {
          }

          try {
            this.convoluteContentRepresentation = res.props['http://www.knora.org/ontology/text#hasConvoluteContentRepresentation'].values[0].utf8str;
          } catch (TypeError) {
          }

          try {
            this.convoluteOriginDescription = res.props['http://www.knora.org/ontology/text#hasConvoluteOriginDescription'].values[0].utf8str;
          } catch (TypeError) {
          }

          try {
            this.creatingPeriod = res.props['http://www.knora.org/ontology/human#hasCreatingPeriod'].values[0];
          } catch (TypeError) {
          }

        });

    }
    if (true) {
      this.sub2 = this.http.get('http://knora.nie-ine.ch/v1/resources/' + encodeURIComponent('http://rdfh.ch/human/YNOD3dS_RJas5Oj0XjA51w'
      ))
        .map(response => response.json()).subscribe(res => {

          try {
            this.creatingPeriodStart = res.props['http://www.knora.org/ontology/event#hasStartDate'].values[0].dateval1;
          } catch (TypeError) {
          }

          try {
            this.creatingPeriodEnd = res.props['http://www.knora.org/ontology/event#hasEndDate'].values[0].dateval1;
          } catch (TypeError) {
          }
        });

    }
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(KonvolutKommentarComponent, {
      // data: { text: this.comment },
      data: { text: this.comment },
      width: '600px',
      height: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }


  formatDate(date: string) {
    return this.dateFormatService.germanNumericDate(date);
  }
}
