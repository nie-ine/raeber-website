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

  germanNamesOfDays = [
    'Sonntag',
    'Montag',
    'Dienstag',
    'Mittwoch',
    'Donnerstag',
    'Freitag',
    'Samstag'
  ];

  private static getNameOfDay(dayOfTheWeek: number, dayNames: string[]) {
    return dayNames[dayOfTheWeek];
  }

  germanLongDate(isoDate: string): string {
    const parts = isoDate.split('-');
    const year = parts[ 0 ];
    const monthAsNumber = parts[1];
    const monthAsName = this.germanLongMonth[ Number(monthAsNumber) ];
    const day = parts[ 2 ].split(' ')[0];
    const d = new Date(+year, +monthAsNumber-1, +day);
    const nameOfDay = DateFormatService.getNameOfDay(d.getDay(), this.germanNamesOfDays);
    return nameOfDay + ', ' + day + '. ' + monthAsName + ' ' + year;
  }

  germanNumericDate(isoDate: string): string {
    let parts = isoDate.split('-');
    let year = parts[ 0 ];
    let month = parts[ 1 ];
    let day = parts[ 2 ].split(' ')[0];
    return day + '.' + month + '.' + year;
  }

}
