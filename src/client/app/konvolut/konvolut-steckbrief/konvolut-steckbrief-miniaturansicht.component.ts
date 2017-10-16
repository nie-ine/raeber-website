/**
 * Created by Reto Baumgartner (rfbaumgartner) on 13.10.17.
 */
import { Component, Input, OnChanges } from '@angular/core';
import 'rxjs/Rx';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'rae-konvolut-steckbrief-miniaturansicht',
  templateUrl: 'konvolut-steckbrief-miniaturansicht.component.html'
})

export class KonvolutSteckbriefMiniaturansichtComponent implements OnChanges {

  @Input() konvolutBild: string;

  picturePath = '';

  height = 120;

  ngOnChanges() {
    if(this.konvolutBild) {
      let parts = this.konvolutBild.split('/');
      console.log(parts);
      parts[4] = parts[4].replace(/.jpg$/, '.jpx');
      parts[6] = ',' + this.height;
      this.picturePath = parts.join('/');
    }
  }
}
