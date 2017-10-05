import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import {
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdMenuModule,
  MdCheckboxModule,
  MdSelectModule
} from '@angular/material';

import { SearchForOneResourceComponent } from './searchForOneResource.component';
import { DefineOnePropertyForRequestModule } from '../defineOnePropertyForRequest/defineOnePropertyForRequest.module';


@NgModule({
  imports: [
    CommonModule,
    MdButtonToggleModule,
    MdCardModule,
    RouterModule,
    MdButtonModule,
    MdButtonToggleModule,
    MdCardModule,
    MdGridListModule,
    MdIconModule,
    MdInputModule,
    MdMenuModule,
    MdCheckboxModule,
    MdSelectModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    DefineOnePropertyForRequestModule
  ],
  declarations: [
    SearchForOneResourceComponent
  ],
  exports: [
    SearchForOneResourceComponent
  ]
})
export class SearchForOneResourceModule {
}
