/**
 * Created by Roberta Padlina (roberta.padlina@unibas.ch) on 27/10/17.
 */

import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { globalSearchVariableService } from '../suche/globalSearchVariablesService';

@Component({
  moduleId: module.id,
  selector: 'rae-werkliste-unselbst',
  templateUrl: 'werkliste-unselbst.component.html'
})

export class WerklisteUnselbstComponent {
  title = 'Unselbständige Publikationen';
  poemIRI: string;
  poemLink: string;

  constructor(private http: Http) {
  }

  fromPoemTitleToPoemIRI(poemTitle: string) {

    return this.http.get
    (
      globalSearchVariableService.API_URL +
      globalSearchVariableService.extendedSearch +
      'http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23Poem' +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasConvoluteTitle' +
      '&compop=EQ' +
      '&searchval=Verstreutes' +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemTitle' +
      '&compop=EQ' +
      '&searchval=' +
      poemTitle +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemIRI' +
      '&compop=EXISTS' +
      '&searchval='
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          this.poemIRI = data.subjects.value[2];
        }
        )
      .subscribe(res => this.poemLink =  '/Verstreutes/' + poemTitle + '---' + this.poemIRI);
  }

}
