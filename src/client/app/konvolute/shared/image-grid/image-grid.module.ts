/**
 * Created by Jan Stoffregen
 */

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import {
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdSliderModule,
  MdMenuModule
} from '@angular/material';

import { ImageGridComponent } from './image-grid.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    MdButtonToggleModule,
    MdListModule,
    RouterModule,
    MdCardModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdButtonModule,
    MdSliderModule,
    MdMenuModule,
    BrowserAnimationsModule
  ],
  declarations: [ ImageGridComponent ],
  exports: [ ImageGridComponent ],
  providers: []
})
export class ImageGridModule {
}
