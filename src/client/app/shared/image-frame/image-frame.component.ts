import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import 'rxjs/Rx';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  selector: 'rae-image-frame',
  templateUrl: 'image-frame.component.html',
  styleUrls: [ 'image-frame.component.css' ]
})

export class ImageFrameComponent implements OnInit {

  @Input() pictureData: any;
  @Input() initWidth: number;
  @Input() origName: string;

  @Output() pictureReduced = new EventEmitter();
  @Output() pictureIncreased = new EventEmitter();

  pictureIdBase: string;
  orignameWithoutPath: string;

  zoomfactor = 5;
  heightAndWidth = 100;
  height = 200;
  width = 200;
  overflow = 'auto';
  resize = 'both';
  px = 'px';

  ngOnInit() {
    this.pictureIdBase = this.pictureData.path.split(this.pictureData.nx + ',' + this.pictureData.ny)[ 0 ];
    this.width = this.initWidth;
    this.height = Math.ceil(this.width * this.pictureData.ny / this.pictureData.nx);
  }

  increaseFrameSize() {
    this.width += 200;
    this.height = Math.ceil(this.width * this.pictureData.ny / this.pictureData.nx);
    this.pictureIncreased.emit(null);
  }

  reduceFrameSize() {
    this.width -= 200;
    this.height = Math.ceil(this.width * this.pictureData.ny / this.pictureData.nx);
    this.pictureReduced.emit(null);
  }

  resetSize() {
    this.ngOnInit();
  }


}
