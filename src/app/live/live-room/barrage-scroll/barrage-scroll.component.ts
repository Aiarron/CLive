import { ElementRef, Component, OnInit, Input, AfterViewInit, OnDestroy } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-barrage-scroll',
  templateUrl: './barrage-scroll.component.html',
  styleUrls: ['./barrage-scroll.component.scss']
})
export class BarrageScrollComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('data') data;
  constructor(public el: ElementRef) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    let p_barrage = $(this.el.nativeElement);
    let box = p_barrage.closest('.barrageScroll');
    let pageW = box.width();
    let pageH = box.height();
    let Top, Right;
    Top = parseInt(pageH) * (Math.random());
    if (Top > pageH - 90) {
      Top = pageH - 90;
    }
    p_barrage.css({ "top": Top, "right": -480 });
    let lastDom = $(this.el.nativeElement);
    lastDom.stop().animate({ "right": pageW + 300 }, 10000, "linear", () => {
      this.el.nativeElement.remove();
      this.ngOnDestroy();
    });
  }

  ngOnDestroy() {

  }

}
