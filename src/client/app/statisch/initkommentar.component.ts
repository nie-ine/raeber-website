import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  moduleId: module.id,
  templateUrl: './initkommentar.component.html'
})
export class InitKommentarComponent {
  constructor(@Inject(MD_DIALOG_DATA) public data: any,
              public dialogRef: MdDialogRef<InitKommentarComponent>) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
