/**
 * Created by Reto Baumgartner (rfbaumgartner) on 06.10.17.
 */
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Http } from '@angular/http';
import { Work } from '../../shared/utilities/iris';
import { KnoraResource } from '../../shared/utilities/knora-api-params';

@Component({
  moduleId: module.id,
  selector: 'rae-fassung-diplomatisch-seiten',
  template: ''
})
export class FassungDiplomatischSeitenComponent implements OnChanges {

  @Input() pageIRI: string;

  @Output() propertiesReset = new EventEmitter();

  properties = { 'pageIRI': '', 'pagenumber': '', 'picData': '', 'origName': '' };

  private sub: any;

  constructor(private http: Http) {
  }

  ngOnChanges() {
    if (this.pageIRI) {
      this.sub = this.http.get(new KnoraResource(this.pageIRI).toString())
        .map(results => results.json())
        .subscribe(res => {
          this.properties[ 'pagenumber' ] = res.props[ Work.hasPageNumber ].values[ 0 ].utf8str;
          this.properties[ 'picData' ] = res.resinfo.locdata;
          this.properties[ 'pageIRI' ] = this.pageIRI;
          this.properties[ 'origName' ]
            = res.resinfo.locdata.origname.split('/')[ res.resinfo.locdata.origname.split('/').length - 1 ];
          this.propertiesReset.emit(this.properties);
        });
    }
  }
}
