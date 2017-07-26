import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
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
    TextgridModule
  ],
  declarations: [
    SucheComponent
  ],
  exports: [ SucheComponent ],
  providers: []
})
export class SucheModule {
}
