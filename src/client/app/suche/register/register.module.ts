/**
 * Created by Reto Baumgartner (rfbaumgartner) on 07.07.17.
 */

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import {
  MdButtonModule, MdListModule,
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { RegisterComponent } from './register.component';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterNavigationComponent } from './register-navigation/register-navigation.component';
import { RegisterBeschreibungComponent } from './register-beschreibung/register-beschreibung.component';
import { RegisterTitelregisterComponent } from './titelregister/register-titelregister.component';



@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    MdButtonModule,
    MdListModule,
    RegisterRoutingModule
  ],
  declarations: [
    RegisterBeschreibungComponent,
    RegisterComponent,
    RegisterNavigationComponent,
    RegisterTitelregisterComponent
  ],
  exports: [ RegisterComponent ],
  providers: []
})
export class RegisterModule {
}
