import { Directive, Renderer2, ElementRef, Input, Output, OnInit, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appRankingTabs]',
  host: {
    '(click)': 'click()',
  }
})
export class RankingTabsDirective {
  @Input('appRankingTabs') appRankingTabs;

  constructor(
    public el: ElementRef,
    public ren2: Renderer2
  ) { }

  click() {
    if (this.appRankingTabs == "day") { // 日榜
      this.el.nativeElement.classList.add('active');
      this.el.nativeElement.parentNode.querySelector('.week').classList.remove('active');
      this.el.nativeElement.parentNode.querySelector('.month').classList.remove('active');
      this.el.nativeElement.parentNode.querySelector('.total').classList.remove('active');

      this.el.nativeElement.parentNode.parentNode.querySelector('.conBody .day').classList.add('active');
      this.el.nativeElement.parentNode.parentNode.querySelector('.conBody .week').classList.remove('active');
      this.el.nativeElement.parentNode.parentNode.querySelector('.conBody .month').classList.remove('active');
      this.el.nativeElement.parentNode.parentNode.querySelector('.conBody .total').classList.remove('active');
    } else if (this.appRankingTabs == "week") { // 周榜
      this.el.nativeElement.classList.add('active');
      this.el.nativeElement.parentNode.querySelector('.day').classList.remove('active');
      this.el.nativeElement.parentNode.querySelector('.month').classList.remove('active');
      this.el.nativeElement.parentNode.querySelector('.total').classList.remove('active');

      this.el.nativeElement.parentNode.parentNode.querySelector('.conBody .day').classList.remove('active');
      this.el.nativeElement.parentNode.parentNode.querySelector('.conBody .week').classList.add('active');
      this.el.nativeElement.parentNode.parentNode.querySelector('.conBody .month').classList.remove('active');
      this.el.nativeElement.parentNode.parentNode.querySelector('.conBody .total').classList.remove('active');
    } else if (this.appRankingTabs == "month") { // 月榜
      this.el.nativeElement.classList.add('active');
      this.el.nativeElement.parentNode.querySelector('.day').classList.remove('active');
      this.el.nativeElement.parentNode.querySelector('.week').classList.remove('active');
      this.el.nativeElement.parentNode.querySelector('.total').classList.remove('active');

      this.el.nativeElement.parentNode.parentNode.querySelector('.conBody .day').classList.remove('active');
      this.el.nativeElement.parentNode.parentNode.querySelector('.conBody .week').classList.remove('active');
      this.el.nativeElement.parentNode.parentNode.querySelector('.conBody .month').classList.add('active');
      this.el.nativeElement.parentNode.parentNode.querySelector('.conBody .total').classList.remove('active');
    } else {// 总榜
      this.el.nativeElement.classList.add('active');
      this.el.nativeElement.parentNode.querySelector('.day').classList.remove('active');
      this.el.nativeElement.parentNode.querySelector('.week').classList.remove('active');
      this.el.nativeElement.parentNode.querySelector('.month').classList.remove('active');

      this.el.nativeElement.parentNode.parentNode.querySelector('.conBody .day').classList.remove('active');
      this.el.nativeElement.parentNode.parentNode.querySelector('.conBody .week').classList.remove('active');
      this.el.nativeElement.parentNode.parentNode.querySelector('.conBody .month').classList.remove('active');
      this.el.nativeElement.parentNode.parentNode.querySelector('.conBody .total').classList.add('active');
    }
  }
}
