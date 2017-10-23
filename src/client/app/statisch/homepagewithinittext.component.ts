import { Component, OnInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { InitKommentarComponent } from './initkommentar.component';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  template: ''

})
export class HomepageWithInitTextComponent implements OnInit {

  constructor(public dialog: MdDialog, private router: Router) {

  }

  ngOnInit() {
    this.openDialog();
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(InitKommentarComponent, {
      width: '600px',
      height: '600px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigateByUrl('/start');
    });
  }
}
