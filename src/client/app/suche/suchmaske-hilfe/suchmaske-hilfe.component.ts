import { Component, Inject } from '@angular/core';
import { MD_DIALOG_DATA, MdDialogRef } from '@angular/material';

@Component({
  moduleId: module.id,
  selector: 'suchmaske-hilfe',
  templateUrl: 'suchmaske-hilfe.component.html'
})
export class SuchmaskeHilfeComponent {
  constructor(public dialogRef: MdDialogRef<SuchmaskeHilfeComponent>, @Inject(MD_DIALOG_DATA) public data: any) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
