import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class SucheDarstellungsoptionenService {

  private textboxHeightSource = new Subject<number>();
  private showTextsSource = new Subject<boolean>();
  private numberOfColumnsSource = new Subject<number>();
  private relativeSizeOfColumnsSource = new Subject<string>();
  private textsHaveAlignedFramesSource = new Subject<boolean>();
  private noSinglePoemIsHiddenSource = new Subject<boolean>();

  private showTextFlag: boolean = true;
  private textboxHeight: number = 0;
  private numberOfColumns: number = 3;
  private relativeSizesOfColumns: [string, string, string] = ['100%', '45%', '29%'];
  private textsHaveAlignedFrames: boolean = false;

  // noinspection TsLint
  textboxHeight$ = this.textboxHeightSource.asObservable();
  // noinspection TsLint
  showTexts$ = this.showTextsSource.asObservable();
  // noinspection TsLint
  numberOfColumns$ = this.numberOfColumnsSource.asObservable();
  // noinspection TsLint
  relativeSizeOfColumns$ = this.relativeSizeOfColumnsSource.asObservable();
  // noinspection TsLint
  textsHaveAlignedFrames$ = this.textsHaveAlignedFramesSource.asObservable();
  // noinspection TsLint
  noSinglePoemIsHidden$ = this.noSinglePoemIsHiddenSource.asObservable();


  decreaseTextboxHeight() {
    this.textboxHeight = this.textboxHeight - 2;
    this.textboxHeightSource.next(this.textboxHeight);
  }

  increaseTextboxHeight() {
    this.textboxHeight = this.textboxHeight + 2;
    this.textboxHeightSource.next(this.textboxHeight);
  }

  toggleShowTexts() {
    this.showTextFlag = !this.showTextFlag;
    this.showTextsSource.next(this.showTextFlag);
  }

  rotateNumberOfColumns() {
    this.relativeSizeOfColumnsSource.next(this.relativeSizesOfColumns[this.numberOfColumns - 1]);
    this.numberOfColumns = this.numberOfColumns % 3 + 1;
    this.numberOfColumnsSource.next(this.numberOfColumns);
  }

  toggleAlignedFrames() {
    this.textsHaveAlignedFrames = !this.textsHaveAlignedFrames;
    this.textsHaveAlignedFramesSource.next(this.textsHaveAlignedFrames);
  }

  resetDisplayOptions() {
    this.showTextFlag = true;
    this.showTextsSource.next(this.showTextFlag);
    this.textboxHeight = 0;
    this.textboxHeightSource.next(this.textboxHeight);
    this.numberOfColumns = 3;
    this.relativeSizeOfColumnsSource.next(this.relativeSizesOfColumns[1]);
    this.numberOfColumnsSource.next(this.numberOfColumns);
    this.textsHaveAlignedFrames = false;
    this.textsHaveAlignedFramesSource.next(this.textsHaveAlignedFrames);
    this.noSinglePoemIsHiddenSource.next(true);
  }
}
