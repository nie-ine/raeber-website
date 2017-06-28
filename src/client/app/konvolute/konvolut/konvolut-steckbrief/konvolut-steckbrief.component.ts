/**
 * Created by retobaumgartner on 06.06.17.
 */
import { Component, Input, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'rae-konvolut-steckbrief',
  templateUrl: 'konvolut-steckbrief.component.html',
  styleUrls: ['konvolut-steckbrief.component.css']
})
export class KonvolutSteckbriefComponent implements OnInit {

  @Input() id: string;

  ngOnInit() {

  }
}
