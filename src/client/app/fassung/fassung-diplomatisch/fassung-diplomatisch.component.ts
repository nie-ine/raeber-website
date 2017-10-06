/**
 * Created by Reto Baumgartner (rfbaumgartner) on 24.07.17.
 */
import { Component, EventEmitter, Input, Output, OnChanges } from '@angular/core';
import { Http } from '@angular/http';
import { globalSearchVariableService } from '../../suche/globalSearchVariablesService';

@Component({
  moduleId: module.id,
  selector: 'rae-fassung-diplomatisch',
  templateUrl: 'fassung-diplomatisch.component.html'
})
export class FassungDiplomatischComponent implements OnChanges {

  @Input() pageIRIs: any;

  @Output() pictureReduced = new EventEmitter();
  @Output() pictureIncreased = new EventEmitter();

  pages: Array<any>;
  gewaehlteSchicht: string = 'schicht0';

  private sub: any;

  constructor(private http: Http) {}

  ngOnChanges() {

    if (this.pageIRIs) {
      console.log(this.pageIRIs.length);

      for (let i = 0; i < this.pageIRIs.length; i++) {
        this.pages.push({'diplIRI': '', 'pagenumber': '', 'picIRI': ''});

        this.sub = this.http.get(globalSearchVariableService.API_URL + '/resources/' + encodeURIComponent(this.pageIRIs[ i ]))
          .map(results => results.json())
          .subscribe(res =>{
            this.pages[ i ][ 'pagenumber' ] = res.props[ 'http://www.knora.org/ontology/work#hasPageNumber' ].values[ 0 ].utf8str;
            for (let j = 0; j < res.incoming.length; j++) {
              if (res.incoming[ j ].ext_res_id.pid === 'http://www.knora.org/ontology/text#isDiplomaticTranscriptionOfTextOnPage') {
                this.pages[ i ][ 'diplIRI' ] = res.incoming[ j ].ext_res_id.pid;
              }
            }
          });
      }
    }
  }

  // TODO: sort pages by seqnum, find picture id and transcription id per page.

}
