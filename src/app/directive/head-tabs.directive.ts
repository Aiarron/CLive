import { Directive, ElementRef, Renderer2, Input } from '@angular/core';

@Directive({
  selector: '[headTabs]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class HeadTabsDirective {

  @Input('headTabs') highlightColor: string;

  constructor(
    public el: ElementRef,
    public ren2: Renderer2
  ) { }
  onMouseEnter() {
    this.highlight(this.highlightColor || 'red');
  }

  onMouseLeave() {
    this.highlight('yellow');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }



}
