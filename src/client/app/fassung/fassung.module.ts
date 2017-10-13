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

import { FassungBlaetternComponent } from './fassung-blaettern/fassung-blaettern.component';
import { FassungComponent } from './fassung.component';
import { FassungDiplomatischComponent } from './fassung-diplomatisch/fassung-diplomatisch.component';
import { FassungSteckbriefComponent } from './fassung-steckbrief/fassung-steckbrief.component';
import { FassungWeitereComponent } from './fassung-weitere/fassung-weitere.component';
import { FassungWerkzeugleisteComponent } from './fassung-werkzeugleiste/fassung-werkzeugleiste.component';
import { TextComponent } from '../shared/text/text.component';
import { FassungDiplomatischSeitenComponent } from './fassung-diplomatisch/fassung-diplomatisch-seiten.component';
import { FassungSteckbriefKonvolutComponent } from './fassung-steckbrief/fassung-steckbrief-konvolut.component';
import { FassungSteckbriefFassungComponent } from './fassung-steckbrief/fassung-steckbrief-fassung.component';
import { FassungSteckbriefSignaturComponent } from './fassung-steckbrief/fassung-steckbrief-signatur.component';


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
    MdCardModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    RegisterspalteModule,
    FassungRoutingModule
  ],
  declarations: [
    FassungBlaetternComponent,
    FassungComponent,
    FassungDiplomatischComponent,
    FassungDiplomatischSeitenComponent,
    FassungSteckbriefComponent,
    FassungSteckbriefFassungComponent,
    FassungSteckbriefKonvolutComponent,
    FassungSteckbriefSignaturComponent,
    FassungWeitereComponent,
    FassungWerkzeugleisteComponent,
    TextComponent
  ],
  exports: [ FassungComponent ],
  providers: []
})
export class FassungModule {
}
