/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/7/17.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KonvolutComponent } from './konvolut.component';
import { ConvoluteNotAvailableComponent } from './convolute-not-available.component';
import { TestversionGuard } from '../shared/testversion-service/testversion-guard.service';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'drucke/:konvolut',
        component: KonvolutComponent,
        canActivate: [TestversionGuard]
      },
      {
        path: 'manuskripte/manuskripte-1948-1951',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Manuskripte 1948-51'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'manuskripte/manuskripte-1951',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Manuskripte 1951'},
        canActivate: [TestversionGuard]
      },
      /*{
        path: 'manuskripte/manuskripte-1952',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Manuskripte 1952'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'manuskripte/manuskripte-1953',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Manuskripte 1953'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'manuskripte/manuskripte-1954',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Manuskripte 1954'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'manuskripte/manuskripte-1955',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Manuskripte 1955'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'manuskripte/manuskripte-1956',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Manuskripte 1956'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'manuskripte/manuskripte-1957',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Manuskripte 1957'},
        canActivate: [TestversionGuard]
      },*/
      {
        path: 'manuskripte/manuskripte-1958',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Manuskripte 1958'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'manuskripte/manuskripte-1958-1959',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Manuskripte 1958-59'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'manuskripte/manuskripte-1959-1960',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Manuskripte 1959-60'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'manuskripte/manuskripte-1961',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Manuskripte 1961'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'manuskripte/manuskripte-1962',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Manuskripte 1962'},
        canActivate: [TestversionGuard]
      },
/*      {
        path: 'manuskripte/manuskripte-1963',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Manuskripte 1963'},
        canActivate: [TestversionGuard]
      },*/
      {
        path: 'manuskripte/manuskripte-1964-1965',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Manuskripte 1964-65'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'manuskripte/:konvolut',
        component: KonvolutComponent,
        canActivate: [TestversionGuard]
      },
      {
        path: 'notizbuecher/notizbuch-divers/notizbuch-1965-80',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Notizbuch 1965-80'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'notizbuecher/notizbuch-divers/:konvolut',
        component: KonvolutComponent,
        canActivate: [TestversionGuard]
      },
      {
        path: 'notizbuecher/notizbuch-1948-1949',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Notizbuch 1948-49'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'notizbuecher/notizbuch-1949',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Notizbuch 1949'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'notizbuecher/notizbuch-1950',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Notizbuch 1950'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'notizbuecher/notizbuch-1950-1951',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Notizbuch 1950-51'},
        canActivate: [TestversionGuard]
      },
      // {
      //   path: 'notizbuecher/notizbuch-1952-1954',
      //   component: ConvoluteNotAvailableComponent,
      //   data: {title: 'Notizbuch 1952-54'},
      //   canActivate: [TestversionGuard]
      // },
      {
        path: 'notizbuecher/notizbuch-1954-1955',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Notizbuch 1954-55'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'notizbuecher/notizbuch-1955-1957',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Notizbuch 1955-57'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'notizbuecher/notizbuch-1957-1958',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Notizbuch 1957-58'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'notizbuecher/notizbuch-1958-1961',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Notizbuch 1958-61'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'notizbuecher/notizbuch-1961-1965',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Notizbuch 1961-65'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'notizbuecher/:konvolut',
        component: KonvolutComponent,
        canActivate: [TestversionGuard]
      },
      {
        path: 'typoskripte/typoskripte-sammlungen/sammlung-kutter',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Sammlung Kutter'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'typoskripte/typoskripte-sammlungen/sammlung-thomas-raeber',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Sammlung Th. Raeber'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'typoskripte/typoskripte-sammlungen/sammlung-hochstrasser',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Sammlung Hochstrasser'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'typoskripte/typoskripte-sammlungen/typoskripte-divers',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Typoskripte divers'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'typoskripte/typoskripte-sammlungen/:konvolut',
        component: KonvolutComponent,
        canActivate: [TestversionGuard]
      },
      {
        path: 'typoskripte/typoskripte-1943-1946',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Typoskripte 1943-46'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'typoskripte/typoskripte-1945-1950',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Typoskripte 1945-50'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'typoskripte/typoskripte-1948-1950',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Typoskripte 1948-50'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'typoskripte/typoskripte-1951',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Typoskripte 1951'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'typoskripte/typoskripte-1952',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Typoskripte 1952'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'typoskripte/typoskripte-1953',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Typoskripte 1953'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'typoskripte/typoskripte-1954',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Typoskripte 1954'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'typoskripte/typoskripte-1955',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Typoskripte 1955'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'typoskripte/typoskripte-1956',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Typoskripte 1956'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'typoskripte/typoskripte-1957',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Typoskripte 1957'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'typoskripte/typoskripte1958',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Typoskripte 1958'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'typoskripte/typoskripte1959',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Typoskripte 1959'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'typoskripte/typoskripte-1960',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Typoskripte 1960'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'typoskripte/typoskripte-1961',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Typoskripte 1961'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'typoskripte/typoskripte-1962',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Typoskripte 1962'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'typoskripte/typoskripte-1963',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Typoskripte 1963'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'typoskripte/typoskripte-1965',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Typoskripte 1965'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'typoskripte/:konvolut',
        component: KonvolutComponent,
        canActivate: [TestversionGuard]
      },
      {
        path: 'material/tagebuecher-2',
        component: ConvoluteNotAvailableComponent,
        data: {title: 'Briefe'},
        canActivate: [TestversionGuard]
      },
      {
        path: 'material/:konvolut',
        component: KonvolutComponent,
        canActivate: [TestversionGuard]
      },
      {
        path: 'suchergebnisse/:konvolut',
        component: KonvolutComponent,
        canActivate: [TestversionGuard]
      }
    ])
  ],
  exports: [RouterModule]
})
export class KonvolutRoutingModule {
}
