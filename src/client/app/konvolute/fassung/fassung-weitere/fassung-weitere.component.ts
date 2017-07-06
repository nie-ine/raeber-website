/**
 * Created by retobaumgartner on 06.07.17.
 */

import {Component, Input} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rae-fassung-weitere',
  templateUrl: 'fassung-weitere.component.html'
})
export class FassungWeitereComponent {
  @Input() synopsenTags: Array<string>;
  weitereFassungen: Array<any> = [{'id': 'brunnen', 'text': 'gedicht'}, {'id': 'bruecke', 'text': 'fluss'}];


}
