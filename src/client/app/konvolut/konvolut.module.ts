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
  MdInputModule, MdSidenavModule, MdToolbarModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { KonvolutComponent } from './konvolut.component';
import { KonvolutRoutingModule } from './konvolut-routing.module';
import { KonvolutSteckbriefComponent } from './konvolut-steckbrief/konvolut-steckbrief.component';
import { RegisterspalteModule } from '../shared/registerspalte/registerspalte.module';
import { SuperKonvolutComponent } from './super-konvolut.component';
import { TextgridModule } from '../shared/textgrid/textgrid.module';
import { KonvolutWerkzeugleisteComponent } from './konvolut-werkzeugleiste/konvolut-werkzeugleiste.component';

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
    MdSidenavModule,
    MdToolbarModule,
    RegisterspalteModule,
    TextgridModule,
    KonvolutRoutingModule
  ],
  declarations: [
    KonvolutComponent,
    KonvolutSteckbriefComponent,
    KonvolutWerkzeugleisteComponent,
    SuperKonvolutComponent
  ],
  exports: [ KonvolutComponent ]
})
export class KonvolutModule {
}
