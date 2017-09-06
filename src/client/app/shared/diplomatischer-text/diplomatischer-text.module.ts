/**
 * Created by Reto Baumgartner (rfbaumgartner) on 24.07.17.
 */

import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  MdButtonModule,
  MdButtonToggleModule, MdCheckboxModule,
  MdToolbarModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { DimplomatischerTextComponent } from './diplomatischer-text.component';
import { DraggableDirective } from './draggable.directive';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCheckboxModule,
    MdToolbarModule,
    ReactiveFormsModule
  ],
  declarations: [
    DimplomatischerTextComponent,
    DraggableDirective
  ],
  exports: [ DimplomatischerTextComponent ],
  providers: []
})
export class DiplomatischerTextModule {
}
