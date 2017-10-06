/**
 * Created by Reto Baumgartner (rfbaumgartner) on 05.07.17.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SynopseHilfeComponent } from '../synopse-hilfe/synopse-hilfe.component';
import { MdDialog } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'rae-synopse-werkzeugleiste',
  templateUrl: 'synopse-werkzeugleiste.component.html',
  styleUrls: [ 'synopse-werkzeugleiste.component.css' ]
})
export class SynopseWerkzeugleisteComponent {

  @Input() showText: boolean = true;
  @Input() gridHeight: number = 0;
  @Output() showTextChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output() vergroessereText = new EventEmitter();
  @Output() verkleinereText = new EventEmitter();
  @Output() resetHeight = new EventEmitter();
  @Output() cols: EventEmitter<number> = new EventEmitter<number>();
  @Output() firstLastState = new EventEmitter();

  columns: number = 2;
  rahmen: boolean = true;
  firstLast: boolean = false;

  constructor(public dialog: MdDialog) {
  }

  neuladen() {
    this.rahmen = true;
    this.columns = 2;
    this.cols.emit(2);
    this.resetHeight.emit();
    if (this.firstLast) {
      this.setFirstLast();
    }
  }

  textVergroessern() {
    this.vergroessereText.emit(null);
  }

  textVerkleinern() {
    this.verkleinereText.emit(null);
  }

  toggleFrame() {
    this.rahmen = !this.rahmen;
  }

  showHelp(): void {
    let dialogRef =
      this.dialog.open(SynopseHilfeComponent, {
        width: '500px'
      });
  }

  setFirstLast() {
    this.firstLast = !this.firstLast;
    this.firstLastState.emit();
  }


}
