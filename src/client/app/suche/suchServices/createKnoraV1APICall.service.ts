import { globalSearchVariableService } from '../globalSearchVariablesService';

export function createKnoraV1APICall(searchTerm: string, propertyToSearchIn: string) {
  function checkWhere ( propertyToSearchIn: string , location: string): string {
    if( location === propertyToSearchIn ) {
      return  '&compop=LIKE' + '&searchval=' + encodeURIComponent(searchTerm);
    } else {
      return  '&compop=!EQ' + '&searchval=123455666';
    }
  }

  let request = globalSearchVariableService.API_URL +
    globalSearchVariableService.extendedSearch +
    'http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23Poem' +
    '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasConvoluteIRI' +
    '&compop=!EQ' +
    '&searchval=123455666' +
    '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemTitle' +
    checkWhere( propertyToSearchIn, 'title') +
    '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemCreationDate' +
    '&compop=!EQ' +
    '&searchval=GREGORIAN:2217-01-27' +
    '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemText' +
    checkWhere( propertyToSearchIn, 'text') +
    '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasPoemIRI' +
    '&compop=!EQ' +
    '&searchval=123455666' +
    '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasConvoluteIRI' +
    '&compop=!EQ' +
    '&searchval=123455666'+
    '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasConvoluteTitle' +
    '&compop=!EQ' +
    '&searchval=123455666' +
    '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasDateIndex' +
    '&compop=!EQ' +
    '&searchval=123455666' +
    '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasAlphabeticIndex' +
    '&compop=!EQ' +
    '&searchval=123455666' +
    '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasSynopsisTitle' +
    '&compop=!EQ' +
    '&searchval=123455666' +
    '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasSynopsisIRI' +
    '&compop=!EQ' +
    '&searchval=123455666' +
    '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23isFinalVersion' +
    '&compop=!EQ' +
    '&searchval=123455666' +
    '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23isInDialect' +
    '&compop=!EQ' +
    '&searchval=123455666' +
    '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasStructure' +
    '&compop=!EQ' +
    '&searchval=123455666' +
    '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23isPartOfCycle' +
    '&compop=!EQ' +
    '&searchval=123455666' +
    '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Fkuno-raeber-gui%23hasStrophe' +
    '&compop=!EQ' +
    '&searchval=123455666' +
    '&show_nrows=2000';
  return request;
}
