import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'rae-konvolut-kommentar',
  templateUrl: 'konvolut-kommentar.component.html'
})
export class KonvolutKommentarComponent {

  constructor(@Inject(MD_DIALOG_DATA) public data: any, public dialogRef: MdDialogRef<KonvolutKommentarComponent>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
