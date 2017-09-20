/**
 * Created by retobaumgartner on 06.06.17.
 */
import { Component, Input, OnChanges } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  moduleId: module.id,
  selector: 'rae-konvolut-steckbrief',
  templateUrl: 'konvolut-steckbrief.component.html',
  styleUrls: [ 'konvolut-steckbrief.component.css' ]
})
export class KonvolutSteckbriefComponent implements OnChanges {

  @Input() id: string;
  @Input() konvulutTitle: string;
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
  private sub: any;

  constructor(private http: Http) {}

  ngOnChanges() {
    if(this.IRI) {
      this.sub = this.http.get('http://knora.nie-ine.ch/v1/resources/' + encodeURIComponent(this.IRI))
        .map(response => response.json()).subscribe(res => {

          try {
            this.publicationTitle = res.props[ 'http://www.knora.org/ontology/work#hasPublicationDescription' ].values[ 0 ].utf8str;
          } catch (TypeError) {}

          try {
          this.publisherDescription = res.props[ 'http://www.knora.org/ontology/work#hasPublisherDescription' ].values[ 0 ].utf8str;
          } catch (TypeError) {}

          try {
          this.printerDescription = res.props[ 'http://www.knora.org/ontology/work#hasPrinterDescription' ].values[ 0 ].utf8str;
          } catch (TypeError) {}

          try {
          this.convoluteDescription = res.props[ 'http://www.knora.org/ontology/text#hasConvoluteDescription' ].values[ 0 ].utf8str;
          } catch (TypeError) {}

          try {
          this.carrierDescription = res.props[ 'http://www.knora.org/ontology/text#hasCarrierDescription' ].values[ 0 ].utf8str;
          } catch (TypeError) {}

          try {
          this.comment = res.props[ 'http://www.knora.org/ontology/text#hasComment' ].values[ 0 ].utf8str;
          } catch (TypeError) {}

          try {
            this.archiveSignature = res.props[ 'http://www.knora.org/ontology/work#hasArchiveSignature' ].values[ 0 ].utf8str;
          } catch (TypeError) {}

          try {
            this.archiveSignature = res.props[ 'http://www.knora.org/ontology/text#hasConvoluteSizeDescription' ].values[ 0 ].utf8str;
          } catch (TypeError) {}

        });
    }
  }
}
