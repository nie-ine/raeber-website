/**
 * Created by Reto Baumgartner (rfbaumgartner) on 27.06.17.
 */

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdButtonToggleModule, MdListModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { RegisterspalteComponent } from './registerspalte.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MdButtonToggleModule,
    MdListModule,
    RouterModule
  ],
  declarations: [ RegisterspalteComponent ],
  exports: [ RegisterspalteComponent ],
  providers: []
})
export class RegisterspalteModule {
}
