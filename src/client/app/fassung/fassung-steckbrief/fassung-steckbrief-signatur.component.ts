/**
 * Created by Reto Baumgartner (rfbaumgartner) on 25.09.17.
 */
import { Component, Input, OnChanges } from '@angular/core';
import { Http } from '@angular/http';
import { Work } from '../../shared/utilities/iris';
import { KnoraResource } from '../../shared/utilities/knora-request';


@Component({
  moduleId: module.id,
  selector: 'rae-fassung-steckbrief-signatur',
  template: '<span>{{ signature }}</span>'
})
export class FassungSteckbriefSignaturComponent implements OnChanges {

  @Input() carrierIRI: string;

  signature: string;

  private sub: any;

  constructor(private http: Http) {
  }

  ngOnChanges() {
    this.signature = '';
    if (this.carrierIRI) {
      this.sub = this.http.get(new KnoraResource(this.carrierIRI).toString())
        .map(result => result.json())
        .subscribe(res => {
          this.signature = res.props[ Work.hasArchiveSignature ].values[ 0 ].utf8str;
        });
    }
  }
}
