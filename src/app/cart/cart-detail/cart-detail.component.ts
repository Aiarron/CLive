import { Component, OnInit } from '@angular/core';

declare var $: any;
declare var Swiper: any;

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})
export class CartDetailComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      var mySwiper = new Swiper('.swiper-container', {
        // autoplay: 5000,//可选选项，自动滑动
        slidesPerView: 'auto',
        spaceBetween: 24,
        prevButton: '.swiper-button-prev',
        nextButton: '.swiper-button-next',
        slidesOffsetBefore: 55,
        slidesOffsetAfter: 55,
      })
    }, 500);

  }

}
