import { Component } from '@angular/core';
import { MdDialog } from '@angular/material';
import { InitKommentarComponent } from './initkommentar.component';
import { Router } from '@angular/router';
import { TestversionGuard } from '../shared/testversion-service/testversion-guard.service';

@Component({
  moduleId: module.id,
  template: ''

})
export class HomepageWithInitTextComponent {


  constructor(public dialog: MdDialog, private router: Router, private testversionGuard: TestversionGuard) {
    this.openDialog();
  }


  openDialog(): void {
    let dialogRef = this.dialog.open(InitKommentarComponent, {
      width: '600px',
      height: '600px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(() => {
      this.testversionGuard.acceptTestversionInfo();
      this.router.navigateByUrl(this.testversionGuard.redirectUrl);
    });
  }
}
