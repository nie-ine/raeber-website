/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 7/21/17.
 */

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdMenuModule,
  MdSelectModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { DynamicPaging } from './paging.service';
import { TextgridComponent } from './textgrid.component';
import { HttpModule } from '@angular/http';

@NgModule({
  imports: [
    CommonModule,
    MdButtonToggleModule,
    MdCardModule,
    RouterModule,
    MdInputModule,
    MdButtonModule,
    MdGridListModule,
    MdIconModule,
    MdMenuModule,
    MdCheckboxModule,
    MdSelectModule,
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    TextgridComponent
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
