/**
 * Created by Reto Baumgartner (rfbaumgartner) on 07.07.17.
 */

import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { MdButtonModule, MdListModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { RegisterComponent } from './register.component';
import { RegisterBeschreibungComponent } from './register-beschreibung/register-beschreibung.component';
import { RegisterTitelregisterComponent } from './titelregister/register-titelregister.component';
import { RouterModule } from '@angular/router';
import { FromKonvolutIRIToPoemIRIsModule } from '../shared/fromKonvolutIRIToPoemIRIs/fromKonvolutIRIToPoemIRIs.module';
import { FromPoemIRIToTextgridInformationModule } from '../shared/fromPoemIRIToTextgridInformation/FromPoemIRIToTextgridInformation.module';
import { GetKonvolutIRIsComponent } from './titelregister/get-konvolut-IRIs.component';
import { TestversionGuard } from '../shared/testversion-service/testversion-guard.service';


@NgModule({
  imports: [
    BrowserModule,
    FromKonvolutIRIToPoemIRIsModule,
    FromPoemIRIToTextgridInformationModule,
    HttpModule,
    MdButtonModule,
    MdListModule,
    RouterModule.forChild([
      {path: 'register', component: RegisterComponent, canActivate: [TestversionGuard]},
      {path: 'register/:zeitraum', component: RegisterComponent, canActivate: [TestversionGuard]}
    ])
  ],
  declarations: [
    GetKonvolutIRIsComponent,
    RegisterBeschreibungComponent,
    RegisterComponent,
    RegisterTitelregisterComponent
  ],
  exports: [ RegisterComponent ],
  providers: []
})
export class RegisterModule {
}
