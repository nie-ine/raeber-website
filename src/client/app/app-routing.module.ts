import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { PageNotFoundComponent } from './404.component';
import { HomepageComponent } from './statisch/homepage.component';
import { NotizbuecherComponent } from './statisch/notizbuecher.component';
import { ImpressumComponent } from './statisch/impressum.component';
import { SignaturenComponent } from './statisch/signaturen.component';
import { WerklisteComponent } from './statisch/werkliste.component';
import { LebensdatenComponent } from './statisch/lebensdaten.component';
import { AnleitungComponent } from './statisch/anleitung.component';
import { WerkausgabeComponent } from './statisch/werkausgabe.component';
import { SucheComponent } from './suche/suche.component';
import { RegisterComponent } from './suche/register.component';
import { TagebuecherComponent } from './konvolute/tagebuecher/tagebuecher.component';
import { BriefeComponent } from './konvolute/briefe/briefe.component';
import { SynopseComponent } from './konvolute/synopse/synopse.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: 'werkausgabe', component: WerkausgabeComponent },
      { path: 'notizbuecher', component: NotizbuecherComponent },
      { path: 'anleitung', component: AnleitungComponent },
      { path: 'lebensdaten', component: LebensdatenComponent },
      { path: 'werkliste', component: WerklisteComponent },
      { path: 'signaturen', component: SignaturenComponent },
      { path: 'impressum', component: ImpressumComponent },
      { path: 'suche', component: SucheComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'notizbuecher', component: NotizbuecherComponent },
      { path: 'tagebuecher', component: TagebuecherComponent },
      { path: 'briefe', component: BriefeComponent },
      { path: 'synopsen', component: SynopseComponent },
      { path: 'start', component: HomepageComponent },
      { path: '', redirectTo: '/start', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
    ])
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {
}

