/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 7/21/17.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { SynopseComponent } from './synopse.component';
import { TextgridModule } from '../shared/textgrid/textgrid.module';
import { SynopseWerkzeugleisteComponent } from './synopse-werkzeugleiste/synopse-werkzeugleiste.component';
import {
  MdButtonModule,
  MdButtonToggleModule,
  MdCheckboxModule,
  MdDialogModule,
  MdIconModule,
  MdToolbarModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { SynopseHilfeComponent } from './synopse-hilfe/synopse-hilfe.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCheckboxModule,
    MdIconModule,
    MdToolbarModule,
    MdDialogModule,
    RouterModule.forChild([
      { path: 'synopsen/:synopse', component: SynopseComponent }
    ]),
    TextgridModule
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
