/**
 * Created by Reto Baumgartner (rfbaumgartner) on 25.09.17.
 */
import { Component, Input, OnChanges } from '@angular/core';
import { Http } from '@angular/http';
import { DateFormatService } from '../../shared/utilities/date-format.service';
import { globalSearchVariableService } from '../../suche/globalSearchVariablesService';


@Component({
  moduleId: module.id,
  selector: 'rae-konvolut-steckbrief-datierung',
  template: '<span *ngIf="startIso">{{ formatDate(startIso) }}</span> – <span *ngIf="endIso">{{ formatDate(endIso) }}</span>',
  providers: [ DateFormatService ]
})
export class KonvolutSteckbriefDatierungComponent implements OnChanges {

  @Input() dateIRI: string;

  startIso: string;
  endIso: string;
  private sub: any;

  constructor(private http: Http, private dateFormatService: DateFormatService) {}

  ngOnChanges() {

    if (this.dateIRI) {
      this.sub = this.http.get(globalSearchVariableService.API_URL
        + '/resources/' + encodeURIComponent(this.dateIRI))

        .map(response => response.json()).subscribe(res => {

          try {
            this.startIso = res.props[ 'http://www.knora.org/ontology/event#hasStartDate' ].values[ 0 ].dateval1;
          } catch (TypeError) {
            this.startIso = null;
          }

          try {
            this.endIso = res.props[ 'http://www.knora.org/ontology/event#hasEndDate' ].values[ 0 ].dateval1;
          } catch (TypeError) {
            this.endIso = null;
          }
        });
    }
  }

  formatDate(date: string) {
    return this.dateFormatService.germanNumericDate(date);
  }
}
