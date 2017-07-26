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
  MdListModule, MdSidenavModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';

import { RegisterspalteModule } from '../shared/registerspalte/registerspalte.module';
import { FassungRoutingModule } from './fassung-routing.module';

import { FassungComponent } from './fassung.component';
import { FassungBlaetternComponent } from './fassung-blaettern/fassung-blaettern.component';
import { FassungSteckbriefComponent } from './fassung-steckbrief/fassung-steckbrief.component';
import { FassungWerkzeugleisteComponent } from './fassung-werkzeugleiste/fassung-werkzeugleiste.component';
import { FassungWeitereComponent } from './fassung-weitere/fassung-weitere.component';
import { TextComponent } from '../shared/text/text.component';

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
    MdListModule,
    MdSidenavModule,
    RegisterspalteModule,
    FassungRoutingModule
  ],
  declarations: [
    FassungBlaetternComponent,
    FassungComponent,
    FassungSteckbriefComponent,
    FassungWeitereComponent,
    FassungWerkzeugleisteComponent,
    TextComponent
  ],
  exports: [ FassungComponent ],
  providers: []
})
export class FassungModule {
}
