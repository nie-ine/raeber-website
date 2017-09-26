import { Component, Input, OnChanges } from '@angular/core';
import { Http, Response } from '@angular/http';
import { DateFormatService } from '../../shared/utilities/date-format.service';
import { globalSearchVariableService } from '../../suche/globalSearchVariablesService';
import * as konvolutVariables from '../konvolutVariables';

@Component({
  moduleId: module.id,
  selector: 'get-konvolut-iri',
  templateUrl: 'get-konvolut-IRI.component.html'
})
export class GetKonvolutIRIComponent implements OnChanges {

  responseArray: Array<any>

  constructor(private http: Http) {

  }

  @Input() konvolut_id: string;

  ngOnChanges() {
    console.log('Get IRI Component for Konvolut - ID: ' + this.konvolut_id);
    //**
    // Notizbuch 1979
    // TODO: Steckbrief etc.
    // */
    if(this.konvolut_id === 'notizbuch-1979') {
      this.performQuery(
        '%23PoemNotebook' +
        '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
        '&compop=EQ' +
        '&searchval=Notizbuch%201979');
    }
  }
  performQuery(queryPart: string) {
    console.log('Klicked on Menu: ' + this.konvolut_id);
    return this.http.get
    (
      globalSearchVariableService.API_URL +
      globalSearchVariableService.extendedSearch +
      globalSearchVariableService.initialVocabulary +
      queryPart
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          console.log(data);
          konvolutVariables.konvolutTitel = data.subjects[0].value[1];
          konvolutVariables.konvolutIRI = data.subjects[0].obj_id;
          konvolutVariables.konvolutBild = data.subjects[0].preview_path;
          return data.resourcetypes;
        }
      )
      .subscribe(response => this.responseArray = response);
  }
}
