/**
 * Created by Jan Stoffregen
 */

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MdButtonToggleModule, MdListModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { ImageGridComponent } from './image-grid.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    MdButtonToggleModule,
    MdListModule,
    RouterModule
  ],
  declarations: [ ImageGridComponent ],
  exports: [ ImageGridComponent ],
  providers: []
})
export class ImageGridModule {
}
