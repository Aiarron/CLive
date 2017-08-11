import { Directive, Renderer2, ElementRef, Input, OnInit, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[gotoRoom]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class IndexGotoRoomShowDirective {

  constructor(
    public el: ElementRef,
    public ren2: Renderer2,
  ) { }

  onMouseEnter() {
    this.el.nativeElement.querySelector('.gotoRoom').style.display = 'block';
  }

  onMouseLeave() {
    this.el.nativeElement.querySelector('.gotoRoom').style.display = '';
  }

}
