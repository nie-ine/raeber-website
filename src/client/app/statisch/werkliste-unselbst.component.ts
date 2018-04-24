/**
 * Created by Roberta Padlina (roberta.padlina@unibas.ch) on 27/10/17.
 */

import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { equals, exists, ExtendedSearch } from '../shared/utilities/knora-api-params';
import { KnoraBase, KunoRaeberGUI } from '../shared/utilities/iris';


interface Poem {
  [ title: string ]: string;
}

@Component({
  moduleId: module.id,
  selector: 'rae-werkliste-unselbst',
  templateUrl: 'werkliste-unselbst.component.html'
})
export class WerklisteUnselbstComponent {
  title = 'Unselbständige Publikationen';
  private poemsInVerstreutes: Poem = {};

  private static getIriFromRequestResult(elem: any) {
    return elem.value[ 3 ].split('/')[ 4 ];
  }

  private static getNameAndSeqnumFromRequestResult(elem: any) {
    return elem.value[ 1 ] + elem.value[ 4 ];
  }

  private static removeSlashes(text: string): string {
    return text.replace(/\//g, '');
  }

  constructor(private http: Http) {
    this.getLinkToPoem();
  }

  buildLinkFromPoemTitleAndSeqnum(poemTitle: string) {
    return '/Verstreutes/' + WerklisteUnselbstComponent.removeSlashes(poemTitle) + '---' + this.poemsInVerstreutes[ poemTitle ];
  }

  private getLinkToPoem() {
    return this.http.get(
      new ExtendedSearch()
        .filterByRestype(KunoRaeberGUI.Poem)
        .property(KunoRaeberGUI.hasConvoluteTitle, equals, 'Verstreutes')
        .property(KunoRaeberGUI.hasPoemTitle, exists)
        .property(KunoRaeberGUI.hasPoemIri, exists)
        .property(KnoraBase.seqnum, exists)
        .showNRows(300)
        .toString()
    )
      .map(lambda => lambda.json())
      .subscribe(res => {
        for (let r of res.subjects) {
          this.poemsInVerstreutes[ WerklisteUnselbstComponent.getNameAndSeqnumFromRequestResult(r) ] =
            WerklisteUnselbstComponent.getIriFromRequestResult(r);
        }
        console.log(this.poemsInVerstreutes);
      });
  }
}
