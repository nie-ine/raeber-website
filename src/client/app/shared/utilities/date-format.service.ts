/**
 * Created by Reto Baumgartner (rfbaumgartner) on 06.09.17.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class DateFormatService {

  germanLongMonth = [
    '',
    'Januar',
    'Februar',
    'März',
    'April',
    'Mai',
    'Juni',
    'Juli',
    'August',
    'September',
    'Oktober',
    'November',
    'Dezember'
  ];

  germanShortMonth = [
    '',
    'Jan.',
    'Feb.',
    'März',
    'Apr.',
    'Mai',
    'Jun.',
    'Jul.',
    'Aug.',
    'Sept.',
    'Okt.',
    'Nov.',
    'Dez.'
  ];

  germanLongDate(isoDate: string): string {
    let parts = isoDate.split('-');
    let year = parts[ 0 ];
    let month = this.germanLongMonth[ Number(parts[ 1 ]) ];
    let day = parts[ 2 ] + '.';
    return day + ' ' + month + ' ' + year;
  }

  germanNumericDate(isoDate: string): string {
    let parts = isoDate.split('-');
    let year = parts[ 0 ];
    let month = parts[ 1 ];
    let day = parts[ 2 ];
    return day + '.' + month + '.' + year;
  }
}
