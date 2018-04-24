/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 7/21/17.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { KonvolutModule } from '../konvolut/konvolut.module';
import { FormsModule } from '@angular/forms';
import { TextgridModule } from '../shared/textgrid/textgrid.module';
import {
  MdButtonModule,
  MdButtonToggleModule,
  MdCheckboxModule,
  MdDialogModule,
  MdIconModule,
  MdSelectModule,
  MdToolbarModule
} from '@angular/material';

import { SynopseComponent } from './synopse.component';
import { SynopseWerkzeugleisteComponent } from './synopse-werkzeugleiste/synopse-werkzeugleiste.component';
import { SynopseHilfeComponent } from './synopse-hilfe/synopse-hilfe.component';
import { TestversionGuard } from '../shared/testversion-service/testversion-guard.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCheckboxModule,
    MdIconModule,
    MdSelectModule,
    MdToolbarModule,
    MdDialogModule,
    KonvolutModule,
    TextgridModule,
    RouterModule.forChild([
      {path: 'synopsen/:synopse', component: SynopseComponent, canActivate: [TestversionGuard]}
    ])
  ],
  declarations: [
    SynopseComponent,
    SynopseWerkzeugleisteComponent,
    SynopseHilfeComponent
  ],
  exports: [
    SynopseComponent
  ],
  entryComponents: [
    SynopseHilfeComponent
  ]
})
export class SynopseModule {
}
