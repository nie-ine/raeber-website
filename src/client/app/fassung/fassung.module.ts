/**
 * Created by Reto Baumgartner (rfbaumgartner) on 05.07.17.
 */

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdDialogModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { DiplomatischerTextModule } from '../shared/diplomatischer-text/diplomatischer-text.module';
import { FassungRoutingModule } from './fassung-routing.module';
import { ImageFrameModule } from '../shared/image-frame/image-frame.module';
import { RegisterspalteModule } from '../shared/registerspalte/registerspalte.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { KonvolutModule } from '../konvolut/konvolut.module';

import { FassungBlaetternComponent } from './fassung-blaettern/fassung-blaettern.component';
import { FassungComponent } from './fassung.component';
import { FassungDiplomatischComponent } from './fassung-diplomatisch/fassung-diplomatisch.component';
import { FassungSteckbriefComponent } from './fassung-steckbrief/fassung-steckbrief.component';
import { FassungWeitereComponent } from './fassung-weitere/fassung-weitere.component';
import { FassungWerkzeugleisteComponent } from './fassung-werkzeugleiste/fassung-werkzeugleiste.component';
import { TextComponent } from '../shared/text/text.component';
import { FassungDiplomatischSeitenComponent } from './fassung-diplomatisch/fassung-diplomatisch-seiten.component';
import { FassungHilfeComponent } from './fassung-hilfe/fassung-hilfe.component';


@NgModule({
  imports: [
    BrowserModule,
    DiplomatischerTextModule,
    FassungRoutingModule,
    FormsModule,
    HttpModule,
    ImageFrameModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdDialogModule,
    MdCardModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    NgbModule,
    RegisterspalteModule,
    KonvolutModule,
    FassungRoutingModule
  ],
  declarations: [
    FassungBlaetternComponent,
    FassungComponent,
    FassungDiplomatischComponent,
    FassungDiplomatischSeitenComponent,
    FassungHilfeComponent,
    FassungSteckbriefComponent,
    FassungWeitereComponent,
    FassungWerkzeugleisteComponent,
    TextComponent
  ],
  exports: [ FassungComponent ],
  providers: [],
  entryComponents: [
    FassungHilfeComponent
  ]
})
export class FassungModule {
}
