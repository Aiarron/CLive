import { Directive, Renderer2, ElementRef, Input, OnInit, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appIndexShow]',
  host: {
    '(mouseenter)': 'onMouseEnter()',
    '(mouseleave)': 'onMouseLeave()'
  }
})
export class IndexShowDirective implements OnInit, AfterViewInit {

  constructor(
    public el: ElementRef,
    public ren2: Renderer2
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  onMouseEnter() {
    this.el.nativeElement.style.boxShadow = 'rgba(220,218,218,0.3) 0px 5px 10px';
    this.el.nativeElement.querySelector('.act_title').style.color = '#fe345e';
    this.el.nativeElement.querySelector('.liveLayer').style.display = 'block';
  }

  onMouseLeave() {
    this.el.nativeElement.style.boxShadow = '';
    this.el.nativeElement.querySelector('.act_title').style.color = '';
    this.el.nativeElement.querySelector('.liveLayer').style.display = 'none';
  }

}
