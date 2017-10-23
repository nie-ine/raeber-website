/**
 * Created by Reto Baumgartner (rfbaumgartner) on 06.10.17.
 */
import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { Http } from '@angular/http';
import { globalSearchVariableService } from '../../suche/globalSearchVariablesService';

@Component({
  moduleId: module.id,
  selector: 'rae-fassung-diplomatisch-seiten',
  template: ''
})
export class FassungDiplomatischSeitenComponent implements OnChanges {

  @Input() pageIRI: string;

  @Output() propertiesReset = new EventEmitter();

  properties = { 'pageIRI': '', 'pagenumber': '', 'picData': '' };

  private sub: any;

  constructor(private http: Http) {
  }

  ngOnChanges() {
    if (this.pageIRI) {
      this.sub = this.http.get(globalSearchVariableService.API_URL + '/resources/' + encodeURIComponent(this.pageIRI))
        .map(results => results.json())
        .subscribe(res => {
          this.properties[ 'pagenumber' ] = res.props[ 'http://www.knora.org/ontology/work#hasPageNumber' ].values[ 0 ].utf8str;
          this.properties[ 'picData' ] = res.resinfo.locdata;
          this.properties[ 'pageIRI' ] = this.pageIRI;
          this.propertiesReset.emit(this.properties);
        });
    }
  }
}
