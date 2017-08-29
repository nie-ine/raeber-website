import { Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';


@Component({
  moduleId: module.id,
  selector: 'rae-parser',
  templateUrl: 'parser.component.html',
  styleUrls: [ 'parser.component.css' ]
})

export class ParserComponent implements OnChanges {

  @Input() inputSearchStringToBeParsed: string;
  queries: Array<Array<any>> = [];
  str: string;
  ngOnChanges(changes: SimpleChanges) {
    //console.log(this.vocabulary);
    console.log('String to parse: ' + this.inputSearchStringToBeParsed);
    if(this.inputSearchStringToBeParsed !== undefined) {
      this.queries = this.parseSearchString(this.inputSearchStringToBeParsed);
    }
    this.str = JSON.stringify(this.queries, null, 4);
    console.log(this.str);
  }

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
