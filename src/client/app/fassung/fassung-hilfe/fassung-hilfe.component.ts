import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'rae-fassung-hilfe',
  templateUrl: 'fassung-hilfe.component.html'
})
export class FassungHilfeComponent {
  constructor(public dialogRef: MdDialogRef<FassungHilfeComponent>, @Inject(MD_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
