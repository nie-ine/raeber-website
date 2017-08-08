/**
 * Created by Reto Baumgartner (rfbaumgartner) on 07.07.17.
 */
import { Component, Input } from '@angular/core';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'rae-register-beschreibung',
  templateUrl: 'register-beschreibung.component.html'
})
export class RegisterBeschreibungComponent {

  @Input() selectedTab: string;

}
