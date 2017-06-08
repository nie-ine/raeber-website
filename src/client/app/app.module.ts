import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { PageNotFoundComponent } from './404.component';
import { AnleitungComponent } from './statisch/anleitung.component';
import { HomepageComponent } from './statisch/homepage.component';
import { LebensdatenComponent } from './statisch/lebensdaten.component';
import { NotizbuecherComponent } from './statisch/notizbuecher.component';
import { SignaturenComponent } from './statisch/signaturen.component';
import { WerkausgabeComponent } from './statisch/werkausgabe.component';
import { WerklisteComponent } from './statisch/werkliste.component';
import { ImpressumComponent } from './statisch/impressum.component';
import { FusszeileComponent } from './fusszeile.component';
import { KopfzeileComponent } from './kopfzeile.component';
import { NavigationsleisteComponent } from './navigationsleiste.component';
import { FassungComponent } from './konvolute/fassung/fassung.component';
import { SynopseComponent } from './konvolute/synopse/synopse.component';
import { TagebuecherComponent } from './konvolute/tagebuecher/tagebuecher.component';
import { BriefeComponent } from './konvolute/briefe/briefe.component';
import { SucheComponent } from './suche/suche.component';
import { RegisterComponent } from './suche/register.component';
import { KonvolutModule } from './konvolute/konvolut/konvolut.module';
import { AppMaterialModule } from './app-material.module';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    KonvolutModule,
    AppMaterialModule,
    AppRoutingModule
  ],
  declarations: [
    AnleitungComponent,
    AppComponent,
    BriefeComponent,
    FassungComponent,
    FusszeileComponent,
    HomepageComponent,
    ImpressumComponent,
    KopfzeileComponent,
    LebensdatenComponent,
    NavigationsleisteComponent,
    NotizbuecherComponent,
    PageNotFoundComponent,
    RegisterComponent,
    SignaturenComponent,
    SucheComponent,
    SynopseComponent,
    TagebuecherComponent,
    WerkausgabeComponent,
    WerklisteComponent
  ],
  providers: [
    {
      provide: APP_BASE_HREF,
      useValue: '<%= APP_BASE %>'
    }
  ],
  bootstrap: [ AppComponent ]

})
export class AppModule {
}
