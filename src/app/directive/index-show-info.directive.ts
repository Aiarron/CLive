import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[showInfo]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()',
  }
})
export class IndexShowInfoDirective {

  constructor(
    public el: ElementRef,
    public ren2: Renderer2
  ) { }

  onMouseEnter() {
    this.el.nativeElement.querySelector('.showInfo').style.display = 'block';
  }

  onMouseLeave() {
    this.el.nativeElement.querySelector('.showInfo').style.display = 'block';
  }

}
