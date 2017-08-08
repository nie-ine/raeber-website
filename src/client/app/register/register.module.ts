/**
 * Created by Reto Baumgartner (rfbaumgartner) on 07.07.17.
 */

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MdButtonModule, MdListModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { RegisterComponent } from './register.component';
import { RegisterNavigationComponent } from './register-navigation/register-navigation.component';
import { RegisterBeschreibungComponent } from './register-beschreibung/register-beschreibung.component';
import { RegisterTitelregisterComponent } from './titelregister/register-titelregister.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    MdButtonModule,
    MdListModule,
    RouterModule.forChild([
      { path: 'register', component: RegisterComponent },
      { path: 'register/:zeitraum', component: RegisterComponent }
    ])
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
