import { globalSearchVariableService } from '../suche/globalSearchVariablesService';
import { Http, Response } from '@angular/http';

export function getKonvolutIRI(konvolut_id: string, http: Http, responseArray: Array<any>) {
  //**
  // Notizbuch 1979
  // TODO: Steckbrief etc.
  // */
  if(konvolut_id === 'notizbuch-1979') {
    console.log('Klicked on Menu: ' + konvolut_id);
    return http.get
    (
      globalSearchVariableService.API_URL +
      globalSearchVariableService.resourceTypesPath +
      globalSearchVariableService.initialVocabulary
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          console.log(data);
          return data.resourcetypes;
        }
      )
      .subscribe(response => responseArray = response);
  }
  //**
  // Notizbuch 1979-1982
  // TODO: Steckbrief etc.
  // */
  if(konvolut_id === 'notizbuch-1979-1982') {
    console.log('Klicked on Menu: ' + konvolut_id);
    return http.get
    (
      globalSearchVariableService.API_URL +
      globalSearchVariableService.resourceTypesPath +
      globalSearchVariableService.initialVocabulary
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          console.log(data);
          return data.resourcetypes;
        }
      )
      .subscribe(response => responseArray = response);
  }
  //**
  // Notizbuch 1980-1988
  // TODO: Steckbrief etc.
  // */
  if(konvolut_id === 'notizbuch-1980-1988') {
    console.log('Klicked on Menu: ' + konvolut_id);
    return http.get
    (
      globalSearchVariableService.API_URL +
      globalSearchVariableService.resourceTypesPath +
      globalSearchVariableService.initialVocabulary
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          console.log(data);
          return data.resourcetypes;
        }
      )
      .subscribe(response => responseArray = response);
  }
  // Notizbuch 1965-80
  // TODO: Steckbrief etc.
  // */
  if(konvolut_id === 'notizbuch-1965-80') {
    console.log('Klicked on Menu: ' + konvolut_id);
    return http.get
    (
      globalSearchVariableService.API_URL +
      globalSearchVariableService.resourceTypesPath +
      globalSearchVariableService.initialVocabulary
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          console.log(data);
          return data.resourcetypes;
        }
      )
      .subscribe(response => responseArray = response);
  }
  // Manuskripte 1979
  // TODO: Steckbrief etc.
  // */
  if(konvolut_id === 'manuskripte-1979') {
    console.log('Klicked on Menu: ' + konvolut_id);
    return http.get
    (
      globalSearchVariableService.API_URL +
      globalSearchVariableService.resourceTypesPath +
      globalSearchVariableService.initialVocabulary
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          console.log(data);
          return data.resourcetypes;
        }
      )
      .subscribe(response => responseArray = response);
  }
  // Manuskripte 1979-1983
  // TODO: Steckbrief etc.
  // */
  if(konvolut_id === 'manuskripte-1979-1983') {
    console.log('Klicked on Menu: ' + konvolut_id);
    return http.get
    (
      globalSearchVariableService.API_URL +
      globalSearchVariableService.resourceTypesPath +
      globalSearchVariableService.initialVocabulary
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          console.log(data);
          return data.resourcetypes;
        }
      )
      .subscribe(response => responseArray = response);
  }
  // Karten 1984
  // TODO: Steckbrief etc.
  // */
  if(konvolut_id === 'karten-1984') {
    console.log('Klicked on Menu: ' + konvolut_id);
    return http.get
    (
      globalSearchVariableService.API_URL +
      globalSearchVariableService.resourceTypesPath +
      globalSearchVariableService.initialVocabulary
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          console.log(data);
          return data.resourcetypes;
        }
      )
      .subscribe(response => responseArray = response);
  }
  // Typoskripte 1979
  // TODO: Steckbrief etc.
  // */
  if(konvolut_id === 'typoskripte-1979') {
    console.log('Klicked on Menu: ' + konvolut_id);
    return http.get
    (
      globalSearchVariableService.API_URL +
      globalSearchVariableService.resourceTypesPath +
      globalSearchVariableService.initialVocabulary
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          console.log(data);
          return data.resourcetypes;
        }
      )
      .subscribe(response => responseArray = response);
  }
  // Typoskripte 1979-spez
  // TODO: Steckbrief etc.
  // */
  if(konvolut_id === 'typoskripte-1979-spez') {
    console.log('Klicked on Menu: ' + konvolut_id);
    return http.get
    (
      globalSearchVariableService.API_URL +
      globalSearchVariableService.resourceTypesPath +
      globalSearchVariableService.initialVocabulary
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          console.log(data);
          return data.resourcetypes;
        }
      )
      .subscribe(response => responseArray = response);
  }
  // Typoskripte 1983
  // TODO: Steckbrief etc.
  // */
  if(konvolut_id === 'typoskripte-1983') {
    console.log('Klicked on Menu: ' + konvolut_id);
    return http.get
    (
      globalSearchVariableService.API_URL +
      globalSearchVariableService.resourceTypesPath +
      globalSearchVariableService.initialVocabulary
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          console.log(data);
          return data.resourcetypes;
        }
      )
      .subscribe(response => responseArray = response);
  }
  // Gesicht im Mittag
  // TODO: Steckbrief etc.
  // */
  if(konvolut_id === 'gesicht-im-mittag') {
    console.log('Klicked on Menu: ' + konvolut_id);
    return http.get
    (
      globalSearchVariableService.API_URL +
      globalSearchVariableService.resourceTypesPath +
      globalSearchVariableService.initialVocabulary
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          console.log(data);
          return data.resourcetypes;
        }
      )
      .subscribe(response => responseArray = response);
  }
  // Die Verwandelten Schiffe
  // TODO: Steckbrief etc.
  // */
  if(konvolut_id === 'die-verwandelten-schiffe') {
    console.log('Klicked on Menu: ' + konvolut_id);
    return http.get
    (
      globalSearchVariableService.API_URL +
      globalSearchVariableService.resourceTypesPath +
      globalSearchVariableService.initialVocabulary
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          console.log(data);
          return data.resourcetypes;
        }
      )
      .subscribe(response => responseArray = response);
  }
}
