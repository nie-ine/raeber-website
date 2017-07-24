/**
 * Created by Reto Baumgartner (rfbaumgartner) on 24.07.17.
 */

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule, MdToolbarModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { DimplomatischerTextComponent } from './diplomatischer-text.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    MdToolbarModule
  ],
  declarations: [
    DimplomatischerTextComponent
  ],
  exports: [ DimplomatischerTextComponent ],
  providers: []
})
export class DiplomatischerTextModule {
}
