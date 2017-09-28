export const globalSearchVariableService = Object.freeze({
  initialVocabulary: 'http://www.knora.org/ontology/beol',
  API_URL: 'http://130.60.24.65:3333/v1',
  resourceTypesPath:  '/resourcetypes?vocabulary=',
  propertyListsQuery: '/propertylists?restype=',
  extendedSearch: '/search/?searchtype=extended&filter_by_restype=',
  extendedProperty: '&property_id=',
  compareOperator: '&compop=',
  searchval: '&searchval='
  //... more of your variables
});
