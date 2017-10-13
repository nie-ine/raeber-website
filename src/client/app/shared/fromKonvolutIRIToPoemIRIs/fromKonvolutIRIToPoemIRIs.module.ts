/**
 * Created by Reto Baumgartner (rfbaumgartner) on 09.10.17.
 */

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FromKonvolutIRIToPoemIRIsComponent } from './fromKonvolutIRIToPoemIRIs.component';

@NgModule({
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpModule,
    RouterModule
  ],
  declarations: [ FromKonvolutIRIToPoemIRIsComponent ],
  exports: [ FromKonvolutIRIToPoemIRIsComponent ],
  providers: []
})
export class FromKonvolutIRIToPoemIRIsModule {
}
