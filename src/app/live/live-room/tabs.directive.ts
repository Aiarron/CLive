import { Directive, Renderer2, ElementRef, Input, Output, OnInit, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appTabs]',
  host: {
    '(click)': 'click()',
  }
})
export class TabsDirective {
  @Input('appTabs') appTabs;

  constructor(
    public el: ElementRef,
    public ren2: Renderer2
  ) { }

  click() {
    console.log(this.appTabs);
  }
}
