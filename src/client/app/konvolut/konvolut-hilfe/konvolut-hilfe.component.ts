import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'rae-konvolut-hilfe',
  templateUrl: './konvolut-hilfe.component.html'
})
export class KonvolutHilfeComponent {
  constructor(public dialogRef: MdDialogRef<KonvolutHilfeComponent>, @Inject(MD_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
