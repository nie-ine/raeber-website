/**
 * Created by Reto Baumgartner (rfbaumgartner) on 16.08.17.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class ParseSearchstringService {

  parseSearchString(searchString: string) {
    let quoteSplit = searchString.split('"');
    let queryWords: Array<any> = [];
    for (let i = 0; i < quoteSplit.length; i++) {
      if (i % 2 === 0 && quoteSplit[i] !== '') {
        let restWordSplit = quoteSplit[i].trim().split(' ');
        for (let j = 0; j < restWordSplit.length; j++) {
          if (restWordSplit[j] === 'intitle:' || restWordSplit[j] === 'intext:' || restWordSplit[j] === 'OR') {
            queryWords.push({'searchString': restWordSplit[j], 'where': 'open'});
          } else {
            queryWords.push({'searchString': restWordSplit[j], 'where': 'anywhere'});
          }
        }
      } else if (quoteSplit[i] !== '') {
        queryWords.push({'searchString': quoteSplit[i], 'where': 'anywhere'});
      }
    }

    for (let i = 0; i < queryWords.length; i++) {
      if (queryWords[i].searchString === 'intitle:' && queryWords[i].where === 'open' && queryWords[i+1]) {
        queryWords[ i ].where = 'delete';
        queryWords[ i + 1 ].where = 'title';
      } else if (queryWords[i].searchString === 'intext:' && queryWords[i].where === 'open' && queryWords[i+1]) {
        queryWords[ i ].where = 'delete';
        queryWords[ i + 1 ].where = 'text';
      }
    }

    let queries: Array<Array<any>> = [];
    let queryEntry: Array<any> = [];

    for (let i = 0; i < queryWords.length; i++) {
      if (queryWords[i].searchString === 'OR' && queryWords[i].where === 'open' && i !== 0) {
        queries.push(queryEntry);
        queryEntry = [];
      } else if (queryWords[i].searchString === 'OR' && queryWords[i].where === 'open' && i === 0) {
        queryEntry.push({'searchString': queryWords[i], 'where': 'anywhere'});
      } else if (queryWords[i].where !== 'delete') {
        queryEntry.push({'searchString': queryWords[i], 'where': queryWords[i].where});
      }
    }

    queries.push(queryEntry);

    return queries;
  }
}
