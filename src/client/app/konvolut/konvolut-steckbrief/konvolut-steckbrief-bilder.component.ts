/**
 * Created by Reto Baumgartner (rfbaumgartner) on 30.10.17.
 */
import { Component, Input, OnChanges } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rae-konvolut-steckbrief-bilder',
  templateUrl: 'konvolut-steckbrief-bilder.component.html'
})
export class KonvolutSteckbriefBilderComponent implements OnChanges {

  @Input() konvolutId: string;
  showThis: boolean = false;
  linkToPdf: string;
  assetBaseUrl: string = '/assets/pdf/notizbuecher/';

  ngOnChanges() {
    if (this.konvolutId && this.konvolutId === 'notizbuch-1979') {
      this.linkToPdf = this.assetBaseUrl + 'A-5-g_01.pdf';
      this.showThis = true;
    } else if (this.konvolutId && this.konvolutId === 'notizbuch-1979-1982') {
      this.linkToPdf = this.assetBaseUrl + 'A-5-h_01.pdf';
      this.showThis = true;
    } else if (this.konvolutId && this.konvolutId === 'notizbuch-1980-1988') {
      this.linkToPdf = this.assetBaseUrl + 'A-5-h_02.pdf';
      this.showThis = true;
    }

  }
}
