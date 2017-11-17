/**
 * Created by Sebastian Schüpbach (sebastian.schuepbach@unibas.ch) on 6/7/17.
 */

import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { KonvolutComponent } from './konvolut.component';
import { ConvoluteNotAvailableComponent } from './convolute-not-available.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'drucke/:konvolut',
        component: KonvolutComponent
      },
      {
        path: 'manuskripte/manuskripte-1948-1951',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Manuskripte 1948-51' }
      },
      {
        path: 'manuskripte/manuskripte-1951',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Manuskripte 1951' }
      },
      {
        path: 'manuskripte/manuskripte-1952',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Manuskripte 1952' }
      },
      {
        path: 'manuskripte/manuskripte-1953',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Manuskripte 1953' }
      },
      {
        path: 'manuskripte/manuskripte-1954',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Manuskripte 1954' }
      },
      {
        path: 'manuskripte/manuskripte-1955',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Manuskripte 1955' }
      },
      {
        path: 'manuskripte/manuskripte-1956',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Manuskripte 1956' }
      },
      {
        path: 'manuskripte/manuskripte-1957',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Manuskripte 1957' }
      },
      {
        path: 'manuskripte/manuskripte-1958',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Manuskripte 1958' }
      },
      {
        path: 'manuskripte/manuskripte-1958-1959',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Manuskripte 1958-59' }
      },
      {
        path: 'manuskripte/manuskripte-1959-1960',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Manuskripte 1959-60' }
      },
      {
        path: 'manuskripte/manuskripte-1961',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Manuskripte 1961' }
      },
      {
        path: 'manuskripte/manuskripte-1962',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Manuskripte 1962' }
      },
      {
        path: 'manuskripte/manuskripte-1963',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Manuskripte 1963' }
      },
      {
        path: 'manuskripte/manuskripte-1964-1965',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Manuskripte 1964-65' }
      },
      {
        path: 'manuskripte/:konvolut',
        component: KonvolutComponent
      },
      {
        path: 'notizbuecher/notizbuch-divers/notizbuch-1965-80',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Notizbuch 1965-80' }
      },
      {
        path: 'notizbuecher/notizbuch-divers/:konvolut',
        component: KonvolutComponent
      },
      {
        path: 'notizbuecher/notizbuch-1948-1949',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Notizbuch 1948-49' }
      },
      {
        path: 'notizbuecher/notizbuch-1949',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Notizbuch 1949' }
      },
      {
        path: 'notizbuecher/notizbuch-1950',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Notizbuch 1950' }
      },
      {
        path: 'notizbuecher/notizbuch-1950-1951',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Notizbuch 1950-51' }
      },
      {
        path: 'notizbuecher/notizbuch-1952-1954',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Notizbuch 1952-54' }
      },
      {
        path: 'notizbuecher/notizbuch-1954-1955',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Notizbuch 1954-55' }
      },
      {
        path: 'notizbuecher/notizbuch-1955-1957',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Notizbuch 1955-57' }
      },
      {
        path: 'notizbuecher/notizbuch-1957-1958',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Notizbuch 1957-58' }
      },
      {
        path: 'notizbuecher/notizbuch-1958-1961',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Notizbuch 1958-61' }
      },
      {
        path: 'notizbuecher/notizbuch-1961-1965',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Notizbuch 1961-65' }
      },
      {
        path: 'notizbuecher/:konvolut',
        component: KonvolutComponent
      },
      {
        path: 'typoskripte/typoskripte-sammlungen/sammlung-kutter',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Sammlung Kutter' }
      },
      {
        path: 'typoskripte/typoskripte-sammlungen/sammlung-thomas-raeber',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Sammlung Th. Raeber' }
      },
      {
        path: 'typoskripte/typoskripte-sammlungen/sammlung-hochstrasser',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Sammlung Hochstrasser' }
      },
      {
        path: 'typoskripte/typoskripte-sammlungen/typoskripte-divers',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Typoskripte divers' }
      },
      {
        path: 'typoskripte/typoskripte-sammlungen/:konvolut',
        component: KonvolutComponent
      },
      {
        path: 'typoskripte/typoskripte-1943-1946',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Typoskripte 1943-46' }
      },
      {
        path: 'typoskripte/typoskripte-1945-1950',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Typoskripte 1945-50' }
      },
      {
        path: 'typoskripte/typoskripte-1948-1950',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Typoskripte 1948-50' }
      },
      {
        path: 'typoskripte/typoskripte-1951',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Typoskripte 1951' }
      },
      {
        path: 'typoskripte/typoskripte-1952',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Typoskripte 1952' }
      },
      {
        path: 'typoskripte/typoskripte-1953',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Typoskripte 1953' }
      },
      {
        path: 'typoskripte/typoskripte-1954',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Typoskripte 1954' }
      },
      {
        path: 'typoskripte/typoskripte-1955',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Typoskripte 1955' }
      },
      {
        path: 'typoskripte/typoskripte-1956',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Typoskripte 1956' }
      },
      {
        path: 'typoskripte/typoskripte-1957',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Typoskripte 1957' }
      },
      {
        path: 'typoskripte/typoskripte1958',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Typoskripte 1958' }
      },
      {
        path: 'typoskripte/typoskripte1959',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Typoskripte 1959' }
      },
      {
        path: 'typoskripte/typoskripte-1960',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Typoskripte 1960' }
      },
      {
        path: 'typoskripte/typoskripte-1961',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Typoskripte 1961' }
      },
      {
        path: 'typoskripte/typoskripte-1962',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Typoskripte 1962' }
      },
      {
        path: 'typoskripte/typoskripte-1963',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Typoskripte 1963' }
      },
      {
        path: 'typoskripte/typoskripte-1965',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Typoskripte 1965' }
      },
      {
        path: 'typoskripte/:konvolut',
        component: KonvolutComponent
      },
      {
        path: 'material/tagebuecher-2',
        component: ConvoluteNotAvailableComponent,
        data: { title: 'Briefe' }
      },
      {
        path: 'material/:konvolut',
        component: KonvolutComponent
      },
      {
        path: 'suchergebnisse/:konvolut',
        component: KonvolutComponent
      }
    ])
  ],
  exports: [ RouterModule ]
})
export class KonvolutRoutingModule {
}
