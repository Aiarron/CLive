import { EventEmitter, Directive, Renderer2, ElementRef, Input, Output, OnInit, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appBarrageSwitch]',
  host: {
    '(click)': 'click()'
  }
})
export class BarrageSwitchDirective {
  @Input('appBarrageSwitch') switch;
  @Output() barrage = new EventEmitter();
  constructor(
    public el: ElementRef,
    public ren2: Renderer2,
  ) { }

  click() {
    if (!this.switch) {
      this.el.nativeElement.style.backgroundPosition = "-279px -392px";
      this.switch = true;
      this.barrage.emit(true);
    } else {
      this.el.nativeElement.style.backgroundPosition = "-227px -392px";
      this.switch = false;
      this.barrage.emit(false);
    }
  }


}
