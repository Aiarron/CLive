import { Directive, Renderer2, ElementRef, Input, Output, OnInit, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appShowRank]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class ShowRankDirective {

  constructor(
    public el: ElementRef,
    public ren2: Renderer2,
  ) { }

  onMouseEnter() {
    this.el.nativeElement.querySelector('.rankItem').style.display = "block";
  }
  
  onMouseLeave() {
    this.el.nativeElement.querySelector('.rankItem').style.display = "none";
  }

}
