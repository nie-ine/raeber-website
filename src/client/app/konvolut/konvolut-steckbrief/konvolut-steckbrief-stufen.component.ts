/**
 * Created by Reto Baumgartner (rfbaumgartner) on 25.09.17.
 */
import { Component, Input, OnChanges } from '@angular/core';
import { Http } from '@angular/http';


@Component({
  moduleId: module.id,
  selector: 'rae-konvolut-steckbrief-stufen',
  templateUrl: 'konvolut-steckbrief-stufen.component.html'
})
export class KonvolutSteckbriefStufenComponent implements OnChanges {

  @Input() konvolutIRI: Array<string>;

  konvolutTitel: Array<string>;
  private sub: any;

  constructor(private http: Http) {}

  ngOnChanges() {
    this.konvolutTitel = [];

    for (let i = 0; i < this.konvolutIRI.length; i++) {
      this.sub = this.http.get('http://knora.nie-ine.ch/v1/resources/' + encodeURIComponent(this.konvolutIRI[i]))
        .map(response => response.json()).subscribe(res => {

          try {
            this.konvolutTitel.push(res.props[ 'http://www.knora.org/ontology/text#hasConvoluteTitle' ].values[ 0 ].utf8str);
          } catch (TypeError) {
            // skip convolute
          }
        });
    }
  }
}
