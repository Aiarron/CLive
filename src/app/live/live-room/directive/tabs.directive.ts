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
    if (this.appTabs == "contribution") { // 贡献榜
      this.el.nativeElement.classList.add('active');
      this.el.nativeElement.parentNode.querySelector('.online').classList.remove('active');
      this.el.nativeElement.parentNode.querySelector('.manager').classList.remove('active');

      this.el.nativeElement.parentNode.parentNode.querySelector('.body .contribution').classList.add('active');
      this.el.nativeElement.parentNode.parentNode.querySelector('.body .online').classList.remove('active');
      this.el.nativeElement.parentNode.parentNode.querySelector('.body .manager').classList.remove('active');

    } else if (this.appTabs == "online") { // 在线人数
      this.el.nativeElement.classList.add('active');
      this.el.nativeElement.parentNode.querySelector('.contribution').classList.remove('active');
      this.el.nativeElement.parentNode.querySelector('.manager').classList.remove('active');

      this.el.nativeElement.parentNode.parentNode.querySelector('.body .online').classList.add('active');
      this.el.nativeElement.parentNode.parentNode.querySelector('.body .contribution').classList.remove('active');
      this.el.nativeElement.parentNode.parentNode.querySelector('.body .manager').classList.remove('active');

    } else { // 管理员
      this.el.nativeElement.classList.add('active');
      this.el.nativeElement.parentNode.querySelector('.contribution').classList.remove('active');
      this.el.nativeElement.parentNode.querySelector('.online').classList.remove('active');

      this.el.nativeElement.parentNode.parentNode.querySelector('.body .manager').classList.add('active');
      this.el.nativeElement.parentNode.parentNode.querySelector('.body .contribution').classList.remove('active');
      this.el.nativeElement.parentNode.parentNode.querySelector('.body .online').classList.remove('active');
    }
  }
}
