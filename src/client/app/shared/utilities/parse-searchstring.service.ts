/**
 * Created by Reto Baumgartner (rfbaumgartner) on 16.08.17.
 */

/**
 * NOW IN parser Module!, This version has not been used anymore! Written by Jan Clemens Stoffregen
 */
/
import { Injectable } from '@angular/core';

@Injectable()
export class ParseSearchstringService {

  // expects a searchquery like '"palm trees" apples OR intext: pears'
  // returns an array of an array containing a map per word like
  // [ [{searchString: "palm trees", where: "anywhere"}, {searchString: "apples", where: "anywhere"}],
  //   [{searchString: "pears", where: "text"}] ]

  parseSearchString(unparsedSearch: string) {

    let quoteSplit = unparsedSearch.split('"'); // quotation marks have the highest precedency. Split on them first.
    let queryWords: Array<any> = []; // list for the words of the unparsed search

    for (let i = 0; i < quoteSplit.length; i++) {

      if (i % 2 === 0 && quoteSplit[i] !== '') {
        // words in even places are considered as outside of quotation marks

        let restWordSplit = quoteSplit[i].trim().split(' ');
        for (let j = 0; j < restWordSplit.length; j++) {

          if (restWordSplit[j] === 'intitle:' || restWordSplit[j] === 'intext:' || restWordSplit[j] === 'OR') {
            // functional words are marked with where:open
            queryWords.push({'searchString': restWordSplit[j], 'where': 'open'});
          } else {
            // non-functional words are defaulted to be looked for everywhere
            queryWords.push({'searchString': restWordSplit[j], 'where': 'anywhere'});
          }
        }
      } else if (quoteSplit[i] !== '') {
        // words in odd places are considered to be in quotation marks
        queryWords.push({'searchString': quoteSplit[i], 'where': 'anywhere'});
      }
    }

    // cleanup functional words
    for (let i = 0; i < queryWords.length; i++) {
      if (queryWords[i].searchString === 'intitle:' && queryWords[i].where === 'open' && queryWords[i+1]) {
        // if there is a word after, intitle is set to that word's property and marked to be deleted
        queryWords[ i ].where = 'delete';
        queryWords[ i + 1 ].where = 'title';
      } else if (queryWords[i].searchString === 'intitle:' && queryWords[i].where === 'open' && i === queryWords.length) {
        // if intitle: is the last word it is treated like a normal word
        queryWords[ i ].where = 'anywhere';
      } else if (queryWords[i].searchString === 'intext:' && queryWords[i].where === 'open' && queryWords[i+1]) {
        // if there is a word after, intext is set to that word's property and marked to be deleted
        queryWords[ i ].where = 'delete';
        queryWords[ i + 1 ].where = 'text';
      } else if (queryWords[i].searchString === 'intext:' && queryWords[i].where === 'open' && i === queryWords.length) {
        // if intext: is the last word it is treated like a normal word
        queryWords[ i ].where = 'anywhere';
      } else if (queryWords[i].searchString === 'OR' && queryWords[i].where === 'open' && i === 0) {
        // if OR is the first word it is treated like a normal word
        queryWords[ i ].where = 'anywhere';
      } else if (queryWords[i].searchString === 'OR' && queryWords[i].where === 'open' && i === queryWords.length) {
        // if OR is the last word it is treated like a normal word
        queryWords[ i ].where = 'anywhere';
      }
    }

    let queries: Array<Array<any>> = []; // queries divided by OR
    let queryEntry: Array<any> = []; // query words divided by AND

    for (let i = 0; i < queryWords.length; i++) {
      if (queryWords[i].searchString === 'OR' && queryWords[i].where === 'open' && i !== 0 && i !== queryWords.length) {
        // on OR (if not in the first or last element) a new query array is started

        queries.push(queryEntry);
        queryEntry = [];
      } else if (queryWords[i].where !== 'delete') {
        // all normal words of the query are collected in the AND list

        queryEntry.push({'searchString': queryWords[i].searchString, 'where': queryWords[i].where});
      }
    }

    queries.push(queryEntry);

    return queries;
  }
}
