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

import { RegisterspalteModule } from '../shared/registerspalte/registerspalte.module';
import { FassungRoutingModule } from './fassung-routing.module';

import { FassungComponent } from './fassung.component';
import { FassungBlaetternComponent } from './fassung-blaettern/fassung-blaettern.component';
import { FassungSteckbriefComponent } from './fassung-steckbrief/fassung-steckbrief.component';
import { FassungWerkzeugleisteComponent } from './fassung-werkzeugleiste/fassung-werkzeugleiste.component';

@NgModule({
  imports: [
    BrowserModule,
    FassungRoutingModule,
    FormsModule,
    HttpModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdListModule,
    RegisterspalteModule
  ],
  declarations: [
    FassungBlaetternComponent,
    FassungComponent,
    FassungSteckbriefComponent,
    FassungWerkzeugleisteComponent
  ],
  exports: [ FassungComponent ],
  providers: []
})
export class FassungModule {
}
