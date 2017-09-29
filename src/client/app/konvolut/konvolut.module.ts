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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DarstellungsoptionenModule } from '../shared/darstellungsoptionen/darstellungsoptionen.module';
import { KonvolutsucheModule } from '../shared/konvolutsuche/konvolutsuche.module';

import { KonvolutComponent } from './konvolut.component';
import { KonvolutRoutingModule } from './konvolut-routing.module';
import { KonvolutSteckbriefComponent } from './konvolut-steckbrief/konvolut-steckbrief.component';
import { RegisterspalteModule } from '../shared/registerspalte/registerspalte.module';
import { TextgridModule } from '../shared/textgrid/textgrid.module';
import { GetKonvolutIRIComponent } from './get-konvolut-IRI/get-konvolut-IRI.component';
import { KonvolutTrefferleisteComponent } from './konvolut-trefferleiste/konvolut-trefferleiste.component';

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
    NgbModule,
    DarstellungsoptionenModule,
    KonvolutsucheModule,
    KonvolutRoutingModule
  ],
  declarations: [
    KonvolutComponent,
    KonvolutSteckbriefComponent,
    GetKonvolutIRIComponent,
    KonvolutTrefferleisteComponent
  ],
  exports: [ KonvolutComponent ]
})
export class KonvolutModule {
}
