import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MdInputModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

import { KonvolutsucheComponent } from './konvolutsuche.component';

@NgModule({
  imports: [
    MdInputModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserModule
  ],
  declarations: [
    KonvolutsucheComponent
  ],
  exports: [
    KonvolutsucheComponent
  ]
})
export class KonvolutsucheModule {
}
