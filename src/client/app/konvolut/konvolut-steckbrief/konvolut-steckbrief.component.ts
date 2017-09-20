/**
 * Created by retobaumgartner on 06.06.17.
 */
import { Component, Input, OnInit, OnChanges, SimpleChanges, } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rae-konvolut-steckbrief',
  templateUrl: 'konvolut-steckbrief.component.html',
  styleUrls: [ 'konvolut-steckbrief.component.css' ]
})
export class KonvolutSteckbriefComponent implements OnInit, OnChanges {

  @Input() id: string;
  @Input() konvulutTitle: string;

  ngOnInit() {

  }
}
