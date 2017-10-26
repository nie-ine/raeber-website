import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SucheDarstellungsoptionenService } from '../suche-darstellungsoptionen.service';
import { SuchmaskeHilfeComponent } from '../suchmaske-hilfe/suchmaske-hilfe.component';
import { MdDialog } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'rae-suche-werkzeugleiste',
  templateUrl: './suche-werkzeugleiste.component.html',
  styleUrls: [ './suche-werkzeugleiste.component.css' ]
})
export class SucheWerkzeugleisteComponent {

  numberOfColumns: number = 3;
  textsHaveAlignedFrames: boolean = false;
  textboxHeight: number = 0;
  showTexts: boolean = true;

  constructor(private sucheDarstellungsoptionen: SucheDarstellungsoptionenService, public dialog: MdDialog) {
    this.sucheDarstellungsoptionen.numberOfColumns$.subscribe(
      cols => this.numberOfColumns = cols
    );
    this.sucheDarstellungsoptionen.textboxHeight$.subscribe(
      height => this.textboxHeight = height
    );
    this.sucheDarstellungsoptionen.textsHaveAlignedFrames$.subscribe(
      alignedFrames => this.textsHaveAlignedFrames = alignedFrames
    );
    this.sucheDarstellungsoptionen.showTexts$.subscribe(
      showTexts => this.showTexts = showTexts
    );
  }

  resetDisplayOptions() {
    this.sucheDarstellungsoptionen.resetDisplayOptions();
  }

  increaseTextboxHeight() {
    this.sucheDarstellungsoptionen.increaseTextboxHeight();
  }

  decreaseTextboxHeight() {
    this.sucheDarstellungsoptionen.decreaseTextboxHeight();
  }

  toggleAlignedFrames() {
    this.sucheDarstellungsoptionen.toggleAlignedFrames();
  }

  rotateNumberOfColumns() {
    this.sucheDarstellungsoptionen.rotateNumberOfColumns();
  }

  toggleShowTexts() {
    this.sucheDarstellungsoptionen.toggleShowTexts();
  }

  showHelp(): void {
    let dialogRef =
      this.dialog.open(SuchmaskeHilfeComponent, {
        width: '500px'
      });
  }

}
