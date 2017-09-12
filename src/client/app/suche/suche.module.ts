/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 7/21/17.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdMenuModule,
  MdSelectModule,
  MdSidenavModule,
  MdSlideToggleModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { SucheRoutingModule } from './suche-routing.module';
import { SucheComponent } from './suche.component';
import { TextgridModule } from './textgrid/textgrid.module';
import { SearchForOneResourceModule } from './searchForOneResourceComponent/searchForOneResource.module';
import { ParserModule } from './parser/parser.module';

import { SuchmaskeComponent } from './suchmaske/suchmaske.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    CommonModule,
    ReactiveFormsModule,
    NgbModule,
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
    MdSidenavModule,
    TextgridModule,
    SearchForOneResourceModule,
    MdSlideToggleModule,
    ParserModule,
    RouterModule.forChild([
      { path: 'suche', component: SucheComponent }
    ]),
  ],
  declarations: [
    SucheComponent,
    SuchmaskeComponent
  ],
  exports: [
    SucheComponent
  ],
  providers: []
})
export class SucheModule {
}
