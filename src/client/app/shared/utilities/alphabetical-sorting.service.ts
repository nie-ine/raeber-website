/**
 * Created by Reto Baumgartner (rfbaumgartner) on 24.07.17.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class AlphabeticalSortingService {
  germanAlphabeticalSortKey(key: string): string {
    // replace special characters of Latin-1 by base letter and append original string for internal sorting
    return key
      .toLowerCase()
      .replace(/[àáâãäå]/gi, 'a')
      .replace(/[æ]/gi, 'ae')
      .replace(/[ç]/gi, 'c')
      .replace(/[ð]/gi, 'd')
      .replace(/[èéêë]/gi, 'e')
      .replace(/[ìíîï]/gi, 'i')
      .replace(/[òóôõöø]/gi, 'o')
      .replace(/[ñ]/gi, 'n')
      .replace(/[ß]/gi, 'ss')
      .replace(/[ùúûü]/gi, 'u')
      .replace(/[ýÿ]/gi, 'y')
      .replace(/[^a-z0-9 ]/gi, '')
      .concat('\t', key.toLowerCase(), '\t', key);
  }
}
