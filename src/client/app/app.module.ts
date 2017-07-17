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
import { PdfNotizbuecherComponent } from './statisch/pdf-notizbuecher.component';
import { PdfSynopsenComponent } from './statisch/pdf-synopsen.component';
import { SignaturenComponent } from './statisch/signaturen.component';
import { WerkausgabeComponent } from './statisch/werkausgabe.component';
import { WerklisteComponent } from './statisch/werkliste.component';
import { ImpressumComponent } from './statisch/impressum.component';
import { FusszeileComponent } from './fusszeile.component';
import { KopfzeileComponent } from './kopfzeile.component';
import { NavigationsleisteComponent } from './navigationsleiste.component';
import { SynopseComponent } from './konvolute/synopse/synopse.component';
import { SucheComponent } from './suche/suche.component';
import { RegisterComponent } from './suche/register.component';
import { KonvolutModule } from './konvolute/konvolut/konvolut.module';
import { FassungModule } from './konvolute/fassung/fassung.module';


@NgModule({
  imports: [
    BrowserModule,
    FassungModule,
    HttpModule,
    KonvolutModule,
    AppRoutingModule
  ],
  declarations: [
    AnleitungComponent,
    AppComponent,
    FusszeileComponent,
    HomepageComponent,
    ImpressumComponent,
    KopfzeileComponent,
    LebensdatenComponent,
    NavigationsleisteComponent,
    PageNotFoundComponent,
    PdfNotizbuecherComponent,
    PdfSynopsenComponent,
    RegisterComponent,
    SignaturenComponent,
    SucheComponent,
    SynopseComponent,
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
