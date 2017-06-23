/**
 * Created by retobaumgartner on 19.06.17.
 */
import { Component, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rae-konvolut-register',
  templateUrl: 'konvolut-register.component.html',
  styleUrls: ['konvolut-register.component.css']
})
export class KonvolutRegisterComponent {

  @Input() poems_in_register: Array<any>;

  selectedRow: number;
  sortingType: string = 'alphabetic';

  constructor() {
  }
}
