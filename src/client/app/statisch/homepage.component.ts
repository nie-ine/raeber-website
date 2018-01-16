/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/7/17.
 */

import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';
import { AnleitungComponent } from './anleitung.component';

@Component({
  moduleId: module.id,
  selector: 'rae-homepage',
  templateUrl: 'homepage.component.html'
})
export class HomepageComponent {
  title = 'Historisch-kritische Online-Edition';

  constructor(public dialog: MdDialog) {
  }

  showHelp(): void {
    let dialogRef =
      this.dialog.open(AnleitungComponent, {
        width: '700px',
        height: '90%'
      });
  }

}
