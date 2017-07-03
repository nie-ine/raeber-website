/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/7/17.
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
  MdInputModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { KonvolutComponent } from './konvolut.component';
import { KonvolutGridComponent } from './konvolut-grid/konvolut-grid.component';
import { KonvolutRoutingModule } from './konvolut-routing.module';
import { KonvolutSteckbriefComponent } from './konvolut-steckbrief/konvolut-steckbrief.component';
import { RegisterspalteModule } from '../shared/registerspalte/registerspalte.module';
import { SuperKonvolutComponent } from './super-konvolut.component';

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
    RegisterspalteModule
  ],
  declarations: [
    KonvolutComponent,
    KonvolutGridComponent,
    KonvolutSteckbriefComponent,
    SuperKonvolutComponent
  ],
  exports: [ KonvolutComponent ],
  providers: []
})
export class KonvolutModule {
}
