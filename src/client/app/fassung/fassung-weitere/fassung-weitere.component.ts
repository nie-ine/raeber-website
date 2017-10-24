/**
 * Created by retobaumgartner on 06.07.17.
 */

import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'rae-fassung-weitere',
  templateUrl: 'fassung-weitere.component.html'
})
export class FassungWeitereComponent {
  @Input() synopsenTags: any[] = [];

  constructor(private router: Router) {
  }

}
