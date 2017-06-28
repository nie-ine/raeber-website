/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/7/17.
 */

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  MdButtonModule,
  MdButtonToggleModule, MdCardModule, MdGridListModule, MdIconModule, MdInputModule, MdListModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { KonvolutComponent } from './konvolut.component';
import { KonvolutGridComponent } from './konvolut-grid/konvolut-grid.component';
import { KonvolutRegisterComponent } from './konvolut-register/konvolut-register.component';
import { KonvolutRoutingModule } from './konvolut-routing.module';
import { KonvolutSteckbriefComponent } from './konvolut-steckbrief/konvolut-steckbrief.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    KonvolutRoutingModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule
  ],
  declarations: [
    KonvolutComponent,
    KonvolutGridComponent,
    KonvolutRegisterComponent,
    KonvolutSteckbriefComponent
  ],
  exports: [ KonvolutComponent ],
  providers: []
})
export class KonvolutModule {
}
