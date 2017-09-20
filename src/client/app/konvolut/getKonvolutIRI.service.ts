import { globalSearchVariableService } from '../suche/globalSearchVariablesService';
import { Http, Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import * as konvolutVariables from './konvolutVariables';

export function checkIfReponseHasArrived() {
  console.log('data has arrived');
}

export function getKonvolutIRI(konvolut_id: string,
                               http: Http,
                               responseArray: Array<any>,
                               konvolutTitle: string) : Subscription {
  //**
  // Notizbuch 1979
  // TODO: Steckbrief etc.
  // */
  if(konvolut_id === 'notizbuch-1979') {
    console.log('Klicked on Menu: ' + konvolut_id);
    return http.get
    (
      globalSearchVariableService.API_URL +
      globalSearchVariableService.extendedSearch +
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
      globalSearchVariableService.extendedSearch +
      globalSearchVariableService.initialVocabulary +
      '%23PoemNotebook' +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
      '&compop=LIKE' +
      '&searchval=Notizbuch%201979-82'
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          console.log(data);
          konvolutVariables.konvolutTitel = data.subjects[0].value[1];
          konvolutVariables.konvolutIRI = data.subjects[0].obj_id;
          konvolutVariables.konvolutBild = data.subjects[0].preview_path;
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
      globalSearchVariableService.extendedSearch +
      globalSearchVariableService.initialVocabulary +
      '%23PoemNotebook' +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
      '&compop=LIKE' +
      '&searchval=Notizbuch%201980-88'
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          console.log(data);
          konvolutVariables.konvolutTitel = data.subjects[0].value[1];
          konvolutVariables.konvolutIRI = data.subjects[0].obj_id;
          konvolutVariables.konvolutBild = data.subjects[0].preview_path;
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
      globalSearchVariableService.extendedSearch +
      globalSearchVariableService.initialVocabulary +
      '%23PoemNotebook' +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
      '&compop=LIKE' +
      '&searchval=Notizbuch%201965-80'
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          console.log(data);
          konvolutVariables.konvolutTitel = data.subjects[0].value[1];
          konvolutVariables.konvolutIRI = data.subjects[0].obj_id;
          konvolutVariables.konvolutBild = data.subjects[0].preview_path;
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
      globalSearchVariableService.extendedSearch +
      globalSearchVariableService.initialVocabulary +
      '%23PoemManuscriptConvolute' +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
      '&compop=LIKE' +
      '&searchval=Manuskripte%201979'
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          console.log(data);
          konvolutVariables.konvolutTitel = data.subjects[0].value[1];
          konvolutVariables.konvolutIRI = data.subjects[0].obj_id;
          konvolutVariables.konvolutBild = data.subjects[0].preview_path;
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
      globalSearchVariableService.extendedSearch +
      globalSearchVariableService.initialVocabulary +
      '%23PoemTypescriptConvolute' +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
      '&compop=EQ' +
      '&searchval=Typoskripte%201979'
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          console.log(data);
          konvolutVariables.konvolutTitel = data.subjects[0].value[1];
          konvolutVariables.konvolutIRI = data.subjects[0].obj_id;
          konvolutVariables.konvolutBild = data.subjects[0].preview_path;
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
      globalSearchVariableService.extendedSearch +
      globalSearchVariableService.initialVocabulary +
      '%23PoemTypescriptConvolute' +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
      '&compop=EQ' +
      '&searchval=Typoskripte%201979-spez'
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          console.log(data);
          konvolutVariables.konvolutTitel = data.subjects[0].value[1];
          konvolutVariables.konvolutIRI = data.subjects[0].obj_id;
          konvolutVariables.konvolutBild = data.subjects[0].preview_path;
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
      globalSearchVariableService.extendedSearch +
      globalSearchVariableService.initialVocabulary +
      '%23PoemTypescriptConvolute' +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
      '&compop=EQ' +
      '&searchval=Typoskripte%201983'
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          console.log(data);
          konvolutVariables.konvolutTitel = data.subjects[0].value[1];
          konvolutVariables.konvolutIRI = data.subjects[0].obj_id;
          konvolutVariables.konvolutBild = data.subjects[0].preview_path;
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
  // Gedichte
  // TODO: Steckbrief etc.
  // */
  if(konvolut_id === 'gedichte') {
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
  // Flussufer
  // TODO: Steckbrief etc.
  // */
  if(konvolut_id === 'flussufer') {
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
  // Reduktionen
  // TODO: Steckbrief etc.
  // */
  if(konvolut_id === 'reduktionen') {
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
  // abgewandt-zugewandt-hochdeutsche-gedichte
  // TODO: Steckbrief etc.
  // */
  if(konvolut_id === 'abgewandt-zugewandt-hochdeutsche-gedichte') {
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
  // abgewandt-zugewandt-alemannische-gedichte
  // First IRI Request: done
  // TODO: Steckbrief etc.
  // */
  if(konvolut_id === 'abgewandt-zugewandt-alemannische-gedichte') {
    console.log('Klicked on Menu: ' + konvolut_id);
    return http.get
    (
      globalSearchVariableService.API_URL +
      globalSearchVariableService.extendedSearch +
      globalSearchVariableService.initialVocabulary +
      '%23PrintedPoemBookPublication' +
      '&property_id=http%3A%2F%2Fwww.knora.org%2Fontology%2Ftext%23hasConvoluteTitle' +
      '&compop=LIKE' +
      '&searchval=Alemannische%20Gedichte%201985'
    )
      .map(
        (lambda: Response) => {
          const data = lambda.json();
          console.log('data: ');
          console.log(data);
          konvolutVariables.konvolutTitel = data.subjects[0].value[1];
          konvolutVariables.konvolutIRI = data.subjects[0].obj_id;
          konvolutVariables.konvolutBild = data.subjects[0].preview_path;
          return data.resourcetypes;
        }
      )
      .subscribe(response => responseArray = response);
  }
  // abgewandt-zugewandt-nachwort
  // TODO: Steckbrief etc.
  // */
  if(konvolut_id === 'abgewandt-zugewandt-nachwort') {
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
  // tagebuecher
  // TODO: Steckbrief etc.
  // */
  if(konvolut_id === 'tagebuecher') {
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
  // tagebuecher-2
  // TODO: Steckbrief etc.
  // */
  if(konvolut_id === 'tagebuecher-2') {
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
  // PDF - Dateien
  // TODO: Steckbrief etc.
  // */

}
