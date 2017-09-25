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
  MdInputModule,
  MdToolbarModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { KonvolutComponent } from './konvolut.component';
import { KonvolutRoutingModule } from './konvolut-routing.module';
import { KonvolutSteckbriefComponent } from './konvolut-steckbrief/konvolut-steckbrief.component';
import { RegisterspalteModule } from '../shared/registerspalte/registerspalte.module';
import { TextgridModule } from '../shared/textgrid/textgrid.module';
import { KonvolutWerkzeugleisteComponent } from './konvolut-werkzeugleiste/konvolut-werkzeugleiste.component';
import { KonvolutSteckbriefPublikationComponent } from './konvolut-steckbrief/konvolut-steckbrief-publikation.component';
import { KonvolutSteckbriefStufenComponent } from './konvolut-steckbrief/konvolut-steckbrief-stufen.component';
import { KonvolutSteckbriefDatierungComponent } from './konvolut-steckbrief/konvolut-steckbrief-datierung.component';

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
    MdToolbarModule,
    RegisterspalteModule,
    TextgridModule,
    KonvolutRoutingModule
  ],
  declarations: [
    KonvolutComponent,
    KonvolutSteckbriefComponent,
    KonvolutSteckbriefDatierungComponent,
    KonvolutSteckbriefPublikationComponent,
    KonvolutSteckbriefStufenComponent,
    KonvolutWerkzeugleisteComponent,
  ],
  exports: [ KonvolutComponent ]
})
export class KonvolutModule {
}
