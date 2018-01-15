/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/7/17.
 */

import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'rae-anleitung',
  templateUrl: 'anleitung.component.html'
})
export class AnleitungComponent {
  title = 'Anleitung zur Online-Edition Kuno Raeber';

  constructor(public dialogRef: MdDialogRef<AnleitungComponent>, @Inject(MD_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
