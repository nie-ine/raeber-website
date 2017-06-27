/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/7/17.
 */

import { NgModule } from '@angular/core';

import { KonvolutRoutingModule } from './konvolut-routing.module';
import { KonvolutComponent } from './konvolut.component';
import { KonvolutSteckbriefComponent } from './konvolut-steckbrief/konvolut-steckbrief.component';
import {
  MdButtonModule,
  MdButtonToggleModule, MdCardModule, MdGridListModule, MdIconModule, MdInputModule, MdListModule
} from '@angular/material';
import { KonvolutGridComponent } from './konvolut-grid/konvolut-grid.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { RegisterspalteModule } from '../shared/registerspalte/registerspalte.module';

@NgModule({
  imports: [
    KonvolutRoutingModule,
    MdCardModule,
    MdGridListModule,
    MdButtonToggleModule,
    MdListModule ,
    MdIconModule,
    BrowserModule,
    HttpModule,
    MdButtonModule,
    MdInputModule,
    RegisterspalteModule
  ],
  declarations: [
    KonvolutComponent,
    KonvolutSteckbriefComponent,
    KonvolutGridComponent
  ],
  exports: [ KonvolutComponent ],
  providers: []
})
export class KonvolutModule {
}
