/**
 * Created by Roberta Padlina (roberta.padlina@unibas.ch) on 27/10/17.
 */

import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { globalSearchVariableService } from '../suche/globalSearchVariablesService';


interface Poem {
  [title: string]: string;
}

@Component({
  moduleId: module.id,
  selector: 'rae-werkliste-unselbst',
  templateUrl: 'werkliste-unselbst.component.html'
})
export class WerklisteUnselbstComponent {
  title = 'Unselbständige Publikationen';
  private poemsInVerstreutes: Poem = {};

  constructor(private http: Http) {
    this.getLinkToPoem();
  }

  private static getIriFromRequestResult(elem: any) {
    return elem.value[ 2 ].split('/')[ 4 ];
  }

  private static getNameFromRequestResult(elem: any) {
    return elem.value[ 3 ];
  }

  private static removeSlashes(text: string): string {
    return text.replace(/\//g, '');
  }

  buildLinkFromPoemTitle(poemTitle: string) {
    return '/Verstreutes/' + WerklisteUnselbstComponent.removeSlashes(poemTitle) + '---' + this.poemsInVerstreutes[ poemTitle ];
  }

  private getLinkToPoem() {
    return this.http.get(
      globalSearchVariableService.API_URL +
      globalSearchVariableService.extendedSearch +
      'http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23Poem' +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasConvoluteTitle' +
      '&compop=EQ' +
      '&searchval=Verstreutes' +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemTitle' +
      '&compop=EXISTS' +
      '&searchval=' +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemIRI' +
      '&compop=EXISTS' +
      '&searchval=&show_nrows=300'
    )
      .map(lambda => lambda.json())
      .subscribe(res => {
        for (let r of res.subjects) {
          this.poemsInVerstreutes[ WerklisteUnselbstComponent.getNameFromRequestResult(r) ] =
            WerklisteUnselbstComponent.getIriFromRequestResult(r);
        }
        console.log(this.poemsInVerstreutes);
      });
  }
}
