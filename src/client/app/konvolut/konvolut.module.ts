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
import { FromKonvolutIRIToPoemIRIsModule } from '../shared/fromKonvolutIRIToPoemIRIs/fromKonvolutIRIToPoemIRIs.module';
import { FromPoemIRIToTextgridInformationModule } from '../shared/fromPoemIRIToTextgridInformation/FromPoemIRIToTextgridInformation.module';
import { FromPoemIRIToTextgridInformationComponent } from '../shared/fromPoemIRIToTextgridInformation/fromPoemIRIToTextgridInformation.component';
import { RegisterspalteModule } from '../shared/registerspalte/registerspalte.module';
import { TextgridModule } from '../shared/textgrid/textgrid.module';
import { KonvolutRoutingModule } from './konvolut-routing.module';

import { KonvolutComponent } from './konvolut.component';
import { KonvolutSteckbriefComponent } from './konvolut-steckbrief/konvolut-steckbrief.component';
import { KonvolutWerkzeugleisteComponent } from './konvolut-werkzeugleiste/konvolut-werkzeugleiste.component';
import { KonvolutSteckbriefPublikationComponent } from './konvolut-steckbrief/konvolut-steckbrief-publikation.component';
import { KonvolutSteckbriefStufenComponent } from './konvolut-steckbrief/konvolut-steckbrief-stufen.component';
import { KonvolutSteckbriefDatierungComponent } from './konvolut-steckbrief/konvolut-steckbrief-datierung.component';
import { GetKonvolutIRIComponent } from './get-konvolut-IRI/get-konvolut-IRI.component';
import { KonvolutTrefferleisteComponent } from './konvolut-trefferleiste/konvolut-trefferleiste.component';
import { KonvolutSteckbriefMiniaturansichtComponent } from './konvolut-steckbrief/konvolut-steckbrief-miniaturansicht.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    FromKonvolutIRIToPoemIRIsModule,
    FromPoemIRIToTextgridInformationModule,
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
    KonvolutSteckbriefDatierungComponent,
    KonvolutSteckbriefMiniaturansichtComponent,
    KonvolutSteckbriefPublikationComponent,
    KonvolutSteckbriefStufenComponent,
    KonvolutWerkzeugleisteComponent,
    GetKonvolutIRIComponent,
    KonvolutTrefferleisteComponent
  ],
  exports: [
    KonvolutComponent,
    KonvolutsucheModule
  ]
})
export class KonvolutModule {
}
