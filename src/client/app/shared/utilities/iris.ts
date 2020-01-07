export enum Event {
  hasStartDate = 'http://www.knora.org/ontology/shared/event#hasStartDate',
  hasEndDate = 'http://www.knora.org/ontology/shared/event#hasEndDate'
}

export enum Human {
  hasCreatingPeriod = 'http://www.knora.org/ontology/shared/human#hasCreating',
  hasCreationDate = 'http://www.knora.org/ontology/shared/human#creationHasDate',
  hasModificationDate = 'http://www.knora.org/ontology/shared/human#hasModificationDate'
}

export enum KunoRaeber {
  containsEarlierStagesOfManuscriptConvolute = 'http://www.knora.org/ontology/004D/kuno-raeber#containsEarlierStagesOfManuscriptConvolute',
  containsEarlierStagesOfTypescriptConvolute = 'http://www.knora.org/ontology/004D/kuno-raeber#containsEarlierStagesOfTypescriptConvolute',
  containsLaterStagesOfManuscriptConvolute = 'http://www.knora.org/ontology/004D/kuno-raeber#containsLaterStagesOfManuscriptConvolute',
  containsLaterStagesOfNotebook = 'http://www.knora.org/ontology/004D/kuno-raeber#containsLaterStagesOfNotebook',
  containsLaterStagesOfTypescriptConvolute = 'http://www.knora.org/ontology/004D/kuno-raeber#containsLaterStagesOfTypescriptConvolute',
  hasDiplomaticTranscription = 'http://www.knora.org/ontology/shared/text-editing#hasDiplomaticTranscription',
  hasReferencePoem = 'http://www.knora.org/ontology/004D/kuno-raeber#hasReferencePoem',
  hasReferenceTitle = 'http://www.knora.org/ontology/004D/kuno-raeber#hasReferenceTitle',
  hasSameEditionAs = 'http://www.knora.org/ontology/shared/text-editing#hasSameEditionAs',
  isInDiary = 'http://www.knora.org/ontology/004D/kuno-raeber#isInDiary',
  isInManuscript = 'http://www.knora.org/shared/information-carrier#isInManuscript',
  isInNotebook = 'http://www.knora.org/ontology/004D/kuno-raeber#isInNotebook',
  isInTypescript = 'http://www.knora.org/ontology/shared/information-carrier#isInTypescript',
  DiaryConvolute = 'http://www.knora.org/ontology/004D/kuno-raeber#DiaryConvolute',
  HandwrittenPoem = 'http://www.knora.org/ontology/004D/kuno-raeber#HandwrittenPoem',
  PoemManuscriptConvolute = 'http://www.knora.org/ontology/004D/kuno-raeber#ManuscriptConvolute',
  PoemNote = 'http://www.knora.org/ontology/004D/kuno-raeber#PoemNote',
  PoemNotebook = 'http://www.knora.org/ontology/004D/kuno-raeber#PoemNotebook',
  PoemPostcardConvolute = 'http://www.knora.org/ontology/004D/kuno-raeber#PoemPostcardConvolute',
  PoemTypescriptConvolute = 'http://www.knora.org/ontology/004D/kuno-raeber#TypescriptConvolute',
  PolyAuthorPublicationConvolute = 'http://www.knora.org/ontology/004D/kuno-raeber#PolyAuthorPublicationConvolute',
  PrintedPoemBookPublication = 'http://www.knora.org/ontology/004D/kuno-raeber#PrintedPoemBookPublication',
  PublicationPoem = 'http://www.knora.org/ontology/004D/kuno-raeber#PublicationPoem',
  TypewrittenPoem = 'http://www.knora.org/ontology/004D/kuno-raeber#TypewrittenPoem',
  TypewrittenPostface = 'http://www.knora.org/ontology/004D/kuno-raeber#TypewrittenPostface'
}

export enum KunoRaeberGUI {
  hasAlphabeticIndex = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#hasAlphabeticIndex',
  hasConvoluteIri = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#hasConvoluteIRI',
  hasConvoluteTitle = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#hasConvoluteTitle',
  hasDateIndex = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#hasPublishingStateIndex', // WHAT'S THAT THING ?hasDateIndex --> hasPublishingStateIndex
  hasPoemCreationDate = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#hasCreationDate',
  hasPoemCreationDateType = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#hasCreationDateType',
  hasPoemIri = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#hasPoemIRI',
  hasPoemText = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#hasPoemText',
  hasPoemTitle = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#hasPoemTitle',
  hasSameEditionAs = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#hasSameEditionAs',
  hasStrophe = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#hasStrophe',
  hasStructure = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#hasRhyme', // Changed
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
  containsEarlierStagesOfPublication = 'http://www.knora.org/ontology/shared/information-carrier#containsEarlierStagesOfPublication',
  hasCarrierCollectionDescription = 'http://www.knora.org/ontology/shared/information-carrier#hasCarrierDescription',
  hasCarrierDescription = 'http://www.knora.org/ontology/shared/information-carrier#carrierHasDescription', //WHAT about this? It's here but changed directions?
  hasConvoluteContentRepresentation = 'http://www.knora.org/ontology/shared/information-carrier#convoluteHasContentRepresentation',
  hasConvoluteDescription = 'http://www.knora.org/ontology/shared/information-carrier#ConvolutehasDescription',
  hasConvoluteOriginDescription = 'http://www.knora.org/ontology/shared/information-carrier#convoluteHasOriginDescription',
  hasConvoluteSizeDescription = 'http://www.knora.org/ontology/shared/information-carrier#convoluteHasSizeDescription',
  hasConvoluteTitle = 'http://www.knora.org/ontology/shared/information-carrier#convoluteHasTitle',
  hasEnteringDate = 'http://www.knora.org/ontology/shared/information-carrier#hasDiaryEnteringDate',
  isWrittenWith = 'http://www.knora.org/ontology/shared/information-carrier#isWrittenWith',
  hasComment = 'http://www.knora.org/ontology/shared/text#hasComment',
  hasContent = 'http://www.knora.org/ontology/shared/language#hasContent',
  hasDetailDescription = 'http://www.knora.org/ontology/shared/text#hasDetailDescription',
  hasAlias = 'http://www.knora.org/ontology/shared/text#hasAlias',
  hasPublicationNumber = 'http://www.knora.org/ontology/shared/publishing#hasPublicationNumber',
  hasSpecialDescription = 'http://www.knora.org/ontology/shared/text#hasSpecialDescription',
  hasStrophe = 'http://www.knora.org/ontology/004D/kuno-raeber#hasStrophe',
  hasStructure = 'http://www.knora.org/ontology/shared/text#hasStructure', // HERE a whole new ontology has been defined and no equivalent existing ... !!!
  hasTitle = 'http://www.knora.org/ontology/shared/text#hasTitle',
  isDiplomaticTranscriptionOfTextOnPage = 'http://www.knora.org/ontology/shared/scientific-editing#isDiplomaticTranscriptionOfTextOnPage',
  isFinalVersion = 'http://www.knora.org/ontology/004D/kuno-raeber#isFinalVersion',
  isInDialect = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#isInSwissGerman',
  isPartOfCycle = 'http://www.knora.org/ontology/004D/kuno-raeber#isPartOfCycle',
}

export enum Work {
  hasPublisherDescription = 'http://www.knora.org/ontology/shared/publishing#hasPublisherDescription',
  hasPrinterDescription = 'http://www.knora.org/ontology/shared/publishing#hasPrinterDescription',
  hasArchiveSignature = 'http://www.knora.org/ontology/shared/information-carrier#hasArchiveSignature',
  hasLastAuthorizedPublication = 'http://www.knora.org/ontology/shared/publishing#hasLastAuthorizedPublication',
  hasNachlassPublicationDescription = 'http://www.knora.org/ontology/shared/publishing#hasNachlassPublicationDescription',
  hasPageNumber = 'http://www.knora.org/ontology/004E/kuno-raeber-gui#hasPageNumber',
  hasPageNumberDescription = 'http://www.knora.org/ontology/shared/text#hasPageNumberDescription',
  hasPublicationDescription = 'http://www.knora.org/ontology/shared/publishing#hasDescription',
  hasPublicationTitle = 'http://www.knora.org/ontology/shared/publishing#hasTitle',
  hasPublishingState = 'http://www.knora.org/ontology/shared/publishing#hasPublishingState',
  hasUnauthorizedPublication = 'http://www.knora.org/ontology/shared/publishing#hasUnauthorizedPublication',
  isExpressedIn = 'http://www.knora.org/ontology/shared/concept#isExpressedIn',
  isPublishedIn = 'http://www.knora.org/ontology/shared/publishing#isPublishedIn'
}

export enum TextEditing {
  hasScientificEdition = 'http://www.knora.org/ontology/shared/scientific-editing#hasScientificEdition'
}
