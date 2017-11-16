/**
 * Created by Reto Baumgartner (rfbaumgartner) on 27.06.17.
 */

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MdButtonToggleModule, MdIconModule, MdListModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { RegisterspalteComponent } from './registerspalte.component';
import { CommonModule } from '@angular/common';
import { FromKonvolutIRIToPoemIRIsModule } from '../fromKonvolutIRIToPoemIRIs/fromKonvolutIRIToPoemIRIs.module';
import { FromPoemIRIToTextgridInformationModule } from '../fromPoemIRIToTextgridInformation/FromPoemIRIToTextgridInformation.module';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    FromKonvolutIRIToPoemIRIsModule,
    FromPoemIRIToTextgridInformationModule,
    HttpModule,
    MdButtonToggleModule,
    MdListModule,
    MdIconModule,
    RouterModule
  ],
  declarations: [ RegisterspalteComponent ],
  exports: [ RegisterspalteComponent ],
  providers: []
})
export class RegisterspalteModule {
}
