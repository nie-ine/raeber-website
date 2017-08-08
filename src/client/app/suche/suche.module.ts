/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 7/21/17.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdMenuModule,
  MdCheckboxModule,
  MdSelectModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { SucheRoutingModule } from './suche-routing.module';
import { SucheComponent } from './suche.component';
import { TextgridModule } from './textgrid/textgrid.module';
import { SearchForOneResourceModule } from './searchForOneResourceComponent/searchForOneResource.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    RouterModule.forChild([
      { path: 'suche', component: SucheComponent }
    ]),
    SucheRoutingModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdMenuModule,
    MdCheckboxModule,
    BrowserAnimationsModule,
    MdSelectModule,
    TextgridModule,
    SearchForOneResourceModule
  ],
  declarations: [
    SucheComponent
  ],
  exports: [ SucheComponent ],
  providers: []
})
export class SucheModule {
}
