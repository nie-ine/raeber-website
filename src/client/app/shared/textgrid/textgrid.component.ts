/**
 * Created by retobaumgartner on 21.06.17.
 */

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, ParamMap, UrlSegment } from '@angular/router';
import 'rxjs/add/operator/switchMap';

export class Konvolut {
  id: number;
  name: string;
}

@Component({
  moduleId: module.id,
  selector: 'rae-textgrid',
  templateUrl: 'textgrid.component.html',
  styleUrls: ['textgrid.component.css']
})
export class TextgridComponent implements OnChanges, OnInit {

  @Input() contentType: string = 'suche'; // synopse OR konvolut OR suche
  @Input() viewMode: string = 'grid';
  @Input() showText: boolean = true;

  @Input() poemsInGrid: Array<any>;

  gridTextHeight: number = 10;

  convoluteRoute: string = '';

  constructor(private route: ActivatedRoute) {
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      if (propName === 'poemsInGrid') {
        let chng = changes[propName];
        this.poemsInGrid = chng.currentValue;
      }
    }
    /*    for (let propName in changes) {
     let chng = changes[propName];
     let cur  = JSON.stringify(chng.currentValue);
     let prev = JSON.stringify(chng.previousValue);
     this.changeLog.push(`${propName}: currentValue = ${cur}, previousValue = ${prev}`);
     }*/
    // changes.prop contains the old and the new value...
  }

  ngOnInit(): void {
    this.route.url
      .switchMap((elems: UrlSegment[]) =>
        (elems[0].path)).subscribe(convTypeFrag => this.convoluteRoute = this.convoluteRoute + convTypeFrag);
    this.convoluteRoute = this.convoluteRoute + '/';
    this.route.paramMap
      .switchMap((params: ParamMap) =>
        (params.getAll('konvolut'))).subscribe(konvolut => this.convoluteRoute = this.convoluteRoute + konvolut);
    this.convoluteRoute = this.convoluteRoute + '/';
  }

  vergroessereFeld() {
    this.gridTextHeight += 2;
  }

  verkleinereFeld() {
    if (this.gridTextHeight > 3) {
      this.gridTextHeight -= 2;
    }
  }
}
