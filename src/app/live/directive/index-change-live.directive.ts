import { Directive, Renderer2, ElementRef, Input, OnInit, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appIndexChangeLive]',
  host: {
    '(click)': 'click()'
  }
})
export class IndexChangeLiveDirective {

  constructor(
    public el: ElementRef,
    public ren2: Renderer2
  ) { }

  click() {
    let lines = this.el.nativeElement.parentNode.querySelectorAll('.line');
    lines.forEach((e, i) => {
      e.classList.remove('active');
    });
    this.el.nativeElement.classList.add('active');
  }

}
