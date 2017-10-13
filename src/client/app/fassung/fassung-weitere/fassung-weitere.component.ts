/**
 * Created by retobaumgartner on 06.07.17.
 */

import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rae-fassung-weitere',
  templateUrl: 'fassung-weitere.component.html'
})
export class FassungWeitereComponent {
  @Input() synopsenTags: { [iri: string]: string; } = {};
  // weitereFassungen: Array<any> = [{'id': 'wolke 2', 'text': 'manu'}, {'id': 'wolke 3', 'text': 'typo'}]; // TODO


}
