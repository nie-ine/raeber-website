/**
 * Created by retobaumgartner on 10.10.17.
 */
import { Component, Input, OnChanges } from '@angular/core';
import { Http } from '@angular/http';
import { globalSearchVariableService } from '../../suche/globalSearchVariablesService';

@Component({
  moduleId: module.id,
  selector: 'rae-fassung-steckbrief-fassung',
  templateUrl: 'fassung-steckbrief-fassung.component.html'
})
export class FassungSteckbriefFassungComponent implements OnChanges {

  @Input() fassungIRI: Array<string>;

  fassung: Array<any>;

  private sub: any;
  private sub2: any;

  constructor(private http: Http) {}

  ngOnChanges() {
    if (this.fassungIRI) {
      for (let i = 0; i < this.fassungIRI.length; i++) {
        this.sub = this.http.get(globalSearchVariableService.API_URL + '/resources/' +
          encodeURIComponent(this.fassungIRI[ i ]))
          .map(result => result.json())
          .subscribe(res => {
            let title = res.props[ 'http://www.knora.org/ontology/text#hasTitle' ].values[ 0 ].utf8str;
            let iriPart = this.fassungIRI[ i ].split('raeber/')[ 1 ];
            // TODO get convolute title for linking
            this.fassung.push({ 'konvolutTitle': 'hoffnung', 'title': title, 'iri': iriPart });
            console.log(res);
          });

        this.sub2 = this.http.get(globalSearchVariableService.API_URL + '/search/'
          + '?searchtype=extended&property_id='
          + encodeURIComponent('http://www.knora.org/ontology/kuno-raeber-gui#Poem')
          + '&property_id=' + encodeURIComponent('http://www.knora.org/ontology/kuno-raeber-gui#hasPoemIRI')
          + '&compop=EQ&searchval=' + encodeURIComponent(this.fassungIRI[i])
          + '&property_id=' + encodeURIComponent('http://www.knora.org/ontology/kuno-raeber-gui#hasConvoluteTitle')
          + '&compop=EXISTS&searchval=')
          .map(results => results.json())
          .subscribe(res => {
            for (let j = 0; j < this.fassung.length; j++) {
              if (this.fassung[j]['pageIRI'] = this.fassungIRI[j]) {
                this.fassung[j]['konvolutTitle'] = res.subjects[ 0 ].values[ 1 ];
              }
            }
          });
      }
    }
  }
}
