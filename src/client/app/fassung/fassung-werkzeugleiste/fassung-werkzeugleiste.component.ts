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
  @Output() goToOtherFassung: EventEmitter<any> = new EventEmitter<any>();
  @Output() showEditedTextChange: EventEmitter<any> = new EventEmitter();
  @Output() showTranscriptionChange: EventEmitter<any> = new EventEmitter();

  @Input() idOfPrev: string;
  @Input() idOfNext: string;

  constructor(public dialog: MdDialog) {}

  neuladen() {
    // TODO: Don't reload the whole window!
    // window.location.reload();
    this.poemResizable = true;
    this.showRegister = true;
    this.poemResizableChange.emit(this.poemResizable);
    this.showRegisterChange.emit(this.showRegister);
    this.showEditedTextChange.emit();
    this.showTranscriptionChange.emit();
  }

  showHelp(): void {
    let dialogRef =
      this.dialog.open(FassungHilfeComponent, {
        width: '700px',
        height: '95%'
      });
  }


  goToNextFassung() {
    console.log('Go to next Fassung');
    this.goToOtherFassung.emit(this.idOfNext);
  }

  goToPrevFassung() {
    console.log('Go to prev Fassung');
    this.goToOtherFassung.emit(this.idOfPrev);
  }

}
