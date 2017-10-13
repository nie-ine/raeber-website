/**
 * Created by Reto Baumgartner (rfbaumgartner) on 06.10.17.
 */
import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
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

  properties = {'diplIRI': '', 'pagenumber': '', 'picData': ''};

  private sub: any;

  constructor(private http: Http){
  }

  ngOnChanges() {

    if (this.pageIRI) {
      this.sub = this.http.get(globalSearchVariableService.API_URL + '/resources/' + encodeURIComponent(this.pageIRI))
        .map(results => results.json())
        .subscribe(res =>{
          this.properties['pagenumber'] = res.props[ 'http://www.knora.org/ontology/work#hasPageNumber' ].values[ 0 ].utf8str;
          for (let j = 0; j < res.incoming.length; j++) {
            if (res.incoming[ j ].ext_res_id.pid === 'http://www.knora.org/ontology/text#isDiplomaticTranscriptionOfTextOnPage') {
              this.properties['diplIRI'] = res.incoming[ j ].ext_res_id.id;
            }
          }
          this.properties['picData'] = res.resinfo.locdata;
          this.propertiesReset.emit(this.properties);
        });
    }
  }
}
