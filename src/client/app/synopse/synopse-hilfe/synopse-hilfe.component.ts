import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'rae-synopse-hilfe',
  templateUrl: 'synopse-hilfe.component.html'
})
export class SynopseHilfeComponent {
  constructor(public dialogRef: MdDialogRef<SynopseHilfeComponent>, @Inject(MD_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
