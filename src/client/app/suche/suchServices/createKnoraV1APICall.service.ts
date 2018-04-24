import { ExtendedSearch, like, notEquals } from '../../shared/utilities/knora-api-params';
import { KunoRaeberGUI } from '../../shared/utilities/iris';

export function createKnoraV1APICall(searchTerm: string, propertyToSearchIn: string) {
  return new ExtendedSearch()
    .filterByRestype(KunoRaeberGUI.Poem)
    .property(KunoRaeberGUI.hasConvoluteIri, notEquals, '123455666')
    .property(KunoRaeberGUI.hasPoemTitle,
      (propertyToSearchIn === 'title' ? like : notEquals),
      (propertyToSearchIn === 'title' ? searchTerm : '123455666'))
    .property(KunoRaeberGUI.hasPoemCreationDate, notEquals, 'GREGORIAN:2217-01-27')
    .property(KunoRaeberGUI.hasPoemText,
      (propertyToSearchIn === 'text' ? like : notEquals),
      (propertyToSearchIn === 'text' ? searchTerm : '123455666'))
    .property(KunoRaeberGUI.hasPoemIri, notEquals, '123455666')
    .property(KunoRaeberGUI.hasConvoluteIri, notEquals, '123455666')
    .property(KunoRaeberGUI.hasConvoluteTitle, notEquals, '123455666')
    .property(KunoRaeberGUI.hasDateIndex, notEquals, '123455666')
    .property(KunoRaeberGUI.hasAlphabeticIndex, notEquals, '123455666')
    .property(KunoRaeberGUI.hasSynopsisTitle, notEquals, '123455666')
    .property(KunoRaeberGUI.hasSynopsisIri, notEquals, '123455666')
    .property(KunoRaeberGUI.isFinalVersion, notEquals, '123455666')
    .property(KunoRaeberGUI.isInDialect, notEquals, '123455666')
    .property(KunoRaeberGUI.hasStructure, notEquals, '123455666')
    .property(KunoRaeberGUI.isPartOfCycle, notEquals, '123455666')
    .property(KunoRaeberGUI.hasStrophe, notEquals, '123455666')
    .showNRows(2000)
    .toString();
}
