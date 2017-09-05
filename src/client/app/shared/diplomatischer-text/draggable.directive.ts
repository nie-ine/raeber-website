/* Written by cedvdb (https://github.com/cedvdb/ng2draggable/ https://www.npmjs.com/package/ng2draggable)
* Version 1.3.2 */

import { Directive, Input, ElementRef, HostListener, OnInit} from '@angular/core';

@Directive({
  selector: '[ng2-draggable]'
})
export class Draggable implements OnInit{
  private topStart:number;
  private leftStart:number;
  private _allowDrag:boolean = true;
  private md:boolean;
  private _handle: HTMLElement;

  constructor(public element: ElementRef) {
  }


  ngOnInit(){
    // css changes
    if(this._allowDrag){
      this.element.nativeElement.style.position = 'relative';
      this.element.nativeElement.className += ' cursor-draggable';
    }
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(event:MouseEvent) {
    if(event.button === 2 || (this._handle !== undefined && event.target !== this._handle))
      return; // prevents right click drag, remove his if you don't want it
    this.md = true;
    this.topStart = event.clientY - this.element.nativeElement.style.top.replace('px','');
    this.leftStart = event.clientX - this.element.nativeElement.style.left.replace('px','');
  }

  @HostListener('document:mouseup', [ '$event' ])
  onMouseUp(event:MouseEvent) {
    this.md = false;
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event:MouseEvent) {
    //console.dir(event.target)
    if( this.md && this._allowDrag ){
      this.element.nativeElement.style.top = (event.clientY - this.topStart) + 'px';
      this.element.nativeElement.style.left = (event.clientX - this.leftStart) + 'px';
    }
  }

  @HostListener('document:mouseleave', ['$event'])
  onMouseLeave(event:MouseEvent) {
    this.md = false;
  }

  @HostListener('touchstart', ['$event'])
  onTouchStart(event:TouchEvent) {
    this.md = true;
    this.topStart = event.changedTouches[0].clientY - this.element.nativeElement.style.top.replace('px','');
    this.leftStart = event.changedTouches[0].clientX - this.element.nativeElement.style.left.replace('px','');
    event.stopPropagation();
  }

  @HostListener('document:touchend', [ '$event' ])
  onTouchEnd() {
    this.md = false;
  }

  @HostListener('document:touchmove', ['$event'])
  onTouchMove(event:TouchEvent) {
    if(this.md && this._allowDrag){
      this.element.nativeElement.style.top = ( event.changedTouches[0].clientY - this.topStart ) + 'px';
      this.element.nativeElement.style.left = ( event.changedTouches[0].clientX - this.leftStart ) + 'px';
    }
    event.stopPropagation();
  }

  @Input('ng2-draggable')
  set allowDrag(value:boolean){
    this._allowDrag = value;
    if(this._allowDrag)
      this.element.nativeElement.className += ' cursor-draggable';
    else
      this.element.nativeElement.className = this.element.nativeElement.className
        .replace(' cursor-draggable','');
  }

  @Input()
  set ng2DraggableHandle(handle: HTMLElement){
    this._handle = handle;
  }
}
