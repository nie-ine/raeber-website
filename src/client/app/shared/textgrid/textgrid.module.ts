/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 7/21/17.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdButtonModule, MdButtonToggleModule, MdCardModule, MdIconModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { DynamicPaging } from './paging.service';
import { TextgridComponent } from './textgrid.component';
import { TextgridSynopsenlinkComponent } from './textgrid-synopsenlink/textgrid-synopsenlink.component';

@NgModule({
  imports: [
    CommonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdIconModule,
    MdButtonModule,
    RouterModule
  ],
  declarations: [
    TextgridComponent,
    TextgridSynopsenlinkComponent
  ],
  providers: [
    DynamicPaging
  ],
  exports: [
    TextgridComponent
  ]
})
export class TextgridModule {
}
