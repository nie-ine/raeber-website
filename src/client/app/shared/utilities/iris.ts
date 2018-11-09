export enum Event {
  hasStartDate = 'http://www.knora.org/ontology/0047/event#hasStartDate',
  hasEndDate = 'http://www.knora.org/ontology/0047/event#hasEndDate'
}

export enum Human {
  hasCreatingPeriod = 'http://www.knora.org/ontology/0048/human#hasCreating',   
  hasCreationDate = 'http://www.knora.org/ontology/0048/human#creationHasDate',
  hasModificationDate = 'http://www.knora.org/ontology/0048/human#hasModificationDate'
}

export enum KunoRaeber {
  containsEarlierStagesOfManuscriptConvolute = 'http://www.knora.org/ontology/004D/kuno-raeber#containsEarlierStagesOfManuscriptConvolute',
  containsEarlierStagesOfTypescriptConvolute = 'http://www.knora.org/ontology/004D/kuno-raeber#containsEarlierStagesOfTypescriptConvolute',
  containsLaterStagesOfManuscriptConvolute = 'http://www.knora.org/ontology/004D/kuno-raeber#containsLaterStagesOfManuscriptConvolute',
  containsLaterStagesOfNotebook = 'http://www.knora.org/ontology/004D/kuno-raeber#containsLaterStagesOfNotebook',
  containsLaterStagesOfTypescriptConvolute = 'http://www.knora.org/ontology/004D/kuno-raeber#containsLaterStagesOfTypescriptConvolute',
  hasDiplomaticTranscription = 'http://www.knora.org/ontology/005A/text-editing#hasDiplomaticTranscription',
  hasEdition = 'http://www.knora.org/ontology/005A/text-editing#hasEdition',
  hasReferencePoem = 'http://www.knora.org/ontology/004D/kuno-raeber#hasReferencePoem',
  hasReferenceTitle = 'http://www.knora.org/ontology/004D/kuno-raeber#hasReferenceTitle',
  hasSameEditionAs = 'http://www.knora.org/ontology/005A/text-editing#hasSameEditionAs',
  isInDiary = 'http://www.knora.org/ontology/004D/kuno-raeber#isInDiary',
  isInManuscript = 'http://www.knora.org/004C/information-carrier#isInManuscript',
  isInNotebook = 'http://www.knora.org/ontology/004D/kuno-raeber#isInNotebook',
  isInTypescript = 'http://www.knora.org/ontology/004C/information-carrier#isInTypescript',
  DiaryConvolute = 'http://www.knora.org/ontology/004D/kuno-raeber#DiaryConvolute',
  HandwrittenPoem = 'http://www.knora.org/ontology/004D/kuno-raeber#HandwrittenPoem',
  PoemManuscriptConvolute = 'http://www.knora.org/ontology/004D/kuno-raeber#HandwrittenPoem',
  PoemNote = 'http://www.knora.org/ontology/004D/kuno-raeber#PoemNote',
  PoemNotebook = 'http://www.knora.org/ontology/004D/kuno-raeber#PoemNotebook',
  PoemPostcardConvolute = 'http://www.knora.org/ontology/004D/kuno-raeber#PoemPostcardConvolute',
  PoemTypescriptConvolute = 'http://www.knora.org/ontology/004D/kuno-raeber#PoemTypescriptConvolute',
  PolyAuthorPublicationConvolute = 'http://www.knora.org/ontology/004D/kuno-raeber#PolyAuthorPublicationConvolute',
  PrintedPoemBookPublication = 'http://www.knora.org/ontology/004D/kuno-raeber#PrintedPoemBookPublication',
  PublicationPoem = 'http://www.knora.org/ontology/004D/kuno-raeber#PublicationPoem',
  TypewrittenPoem = 'http://www.knora.org/ontology/004D/kuno-raeber#TypewrittenPoem'
}

export enum KunoRaeberGUI {
  hasAlphabeticIndex = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#hasAlphabeticIndex',
  hasConvoluteIri = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#hasConvoluteIRI',
  hasConvoluteTitle = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#hasConvoluteTitle',
  hasDateIndex = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#hasDateIndex',
  hasPoemCreationDate = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#hasPoemCreationDate',
  hasPoemIri = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#hasPoemIRI',
  hasPoemText = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#hasPoemText',
  hasPoemTitle = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#hasPoemTitle',
  hasSameEditionAs = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#hasSameEditionAs',
  hasStrophe = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#hasStrophe',
  hasStructure = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#hasStructure',
  hasSynopsisIri = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#hasSynopsisIRI',
  hasSynopsisTitle = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#hasSynopsisTitle',
  isFinalVersion = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#isFinalVersion',
  isInDialect = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#isInDialect',
  isOnPage = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#isOnPage',
  isPartOfCycle = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#isPartOfCycle',
  Poem = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#Poem'
}

export enum KnoraBase {
  seqnum = 'http://www.knora.org/ontology/knora-base#seqnum'
}

export enum Text {
  containsEarlierStagesOfPublication = 'http://www.knora.org/ontology/004C/information-carrier#containsEarlierStagesOfPublication',
  hasAlias = 'http://www.knora.org/ontology/0059/text#hasAlias',
  hasCarrierCollectionDescription = 'http://www.knora.org/ontology/004C/information-carrier#hasCarrierDescription', //WHAT about this?
  hasCarrierDescription = 'http://www.knora.org/ontology/004C/information-carrier#hasCarrierDescription', //WHAT about this?
  hasComment = 'http://www.knora.org/ontology/0059/text#hasComment',
  hasContent = 'http://www.knora.org/ontology/004F/language#hasContent',
  hasConvoluteContentRepresentation = 'http://www.knora.org/ontology/004C/information-carrier#convoluteHasContentRepresentation',
  hasConvoluteDescription = 'http://www.knora.org/ontology/004C/information-carrier#ConvolutehasDescription',
  hasConvoluteOriginDescription = 'http://www.knora.org/ontology/004C/information-carrier#convoluteHasOriginDescription',
  hasConvoluteSizeDescription = 'http://www.knora.org/ontology/004C/information-carrier#convoluteHasSizeDescription',
  hasConvoluteTitle = 'http://www.knora.org/ontology/004C/information-carrier#convoluteHasTitle',
  hasDetailDescription = 'http://www.knora.org/ontology/0059/text#hasDetailDescription',
  hasEnteringDate = 'http://www.knora.org/ontology/004C/information-carrier#hasDiaryEnteringDate',
  hasPublicationNumber = 'http://www.knora.org/ontology/0056/publishing#hasPublicationNumber',
  hasSpecialDescription = 'http://www.knora.org/ontology/0059/text#hasSpecialDescription',
  hasStrophe = 'http://www.knora.org/ontology/004D/kuno-raeber#hasStrophe',
  hasStructure = 'http://www.knora.org/ontology/0059/text#hasStructure', // HERE a whole new ontology has been defined and no equivalent existing ... !!!
  hasTitle = 'http://www.knora.org/ontology/0059/text#hasTitle',
  isDiplomaticTranscriptionOfTextOnPage = 'http://www.knora.org/ontology/005A/text-editing#isDiplomaticTranscriptionOfTextOnPage',
  isFinalVersion = 'http://www.knora.org/ontology/0059/text#isFinalVersion', //new in Kuno Raueber or in Kuno Raeber gui??? Both exist
  isInDialect = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#isInDialect',
  isPartOfCycle = 'http://www.knora.org/ontology/0059/text#isPartOfCycle', //new in Kuno Raueber or in Kuno Raeber gui??? Both exist
  isWrittenWith = 'http://www.knora.org/ontology/0059/text#isWrittenWith' // lives in two ontologies: raeber-gui and infocar
}

export enum Work {
  hasPublisherDescription = 'http://www.knora.org/ontology/0056/publishing#hasPublisherDescription',
  hasPrinterDescription = 'http://www.knora.org/ontology/0056/publishing#hasPrinterDescription',
  hasArchiveSignature = 'http://www.knora.org/ontology/004C/information-carrier#hasArchiveSignature',
  hasLastAuthorizedPublication = 'http://www.knora.org/ontology/0056/publishing#hasLastAuthorizedPublication',
  hasNachlassPublicationDescription = 'http://www.knora.org/ontology/0056/publishing#hasNachlassPublicationDescription',
  hasPageNumber = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#hasPageNumber',
  hasPageNumberDescription = 'http://www.knora.org/ontology/0059/text#hasPageNumberDescription',
  hasPublicationDescription = 'http://www.knora.org/ontology/0056/publishing#hasDescription',
  hasPublicationTitle = 'http://www.knora.org/ontology/0056/publishing#hasTitle',
  hasPublishingState = 'http://www.knora.org/ontology/0056/publishing#hasPublishingState',
  hasUnauthorizedPublication = 'http://www.knora.org/ontology/0056/publishing#hasUnauthorizedPublication',
  isExpressedIn = 'http://www.knora.org/ontology/0044/concept#isExpressedIn',
  isPublishedIn = 'http://www.knora.org/ontology/0056/publishing#isPublishedIn'
}
