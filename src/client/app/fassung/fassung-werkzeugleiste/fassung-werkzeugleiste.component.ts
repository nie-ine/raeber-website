/**
 * Created by Reto Baumgartner (rfbaumgartner) on 05.07.17.
 */

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FassungHilfeComponent } from '../fassung-hilfe/fassung-hilfe.component';
import { MdDialog } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'rae-fassung-werkzeugleiste',
  templateUrl: 'fassung-werkzeugleiste.component.html',
  styleUrls: [ 'fassung-werkzeugleiste.component.css' ]
})
export class FassungWerkzeugleisteComponent {

  @Input() poemResizable: boolean;
  @Input() showRegister: boolean;
  @Output() poemResizableChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() showRegisterChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Input() idOfPrev: string;
  @Input() idOfNext: string;

  constructor(public dialog: MdDialog) {}

  neuladen() {
    window.location.reload();
  }

  showHelp(): void {
    let dialogRef =
      this.dialog.open(FassungHilfeComponent, {
        width: '700px',
        height: '95%'
      });
  }

  @Output() goToOtherFassung: EventEmitter<any> = new EventEmitter<any>();

  goToNextFassung() {
    console.log('Go to next Fassung');
    this.goToOtherFassung.emit(this.idOfNext);
  }

  goToPrevFassung() {
    console.log('Go to prev Fassung');
    this.goToOtherFassung.emit(this.idOfPrev);
  }

}
