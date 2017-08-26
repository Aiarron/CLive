import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { ShopDetailService } from "./service/shop-detail.service";

declare var $: any;
declare var Swiper: any;

@Component({
  selector: 'app-shop-detail',
  templateUrl: './shop-detail.component.html',
  styleUrls: ['./shop-detail.component.scss'],
  providers: [
    ShopDetailService
  ]
})
export class ShopDetailComponent implements OnInit, AfterViewInit {
  @ViewChild('addReduceInput') addReduceInput;
  public routerDetail; // 获取商品ID
  public goodsDetail; // 商品详情
  public shopInfo; // 商品详情区详情
  public evaluate; // 商品评价

  constructor(
    public activatedRoute: ActivatedRoute,
    public shopDetail: ShopDetailService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(
      data => {
        this.routerDetail = data;
      }
    )

    this.shopDetail.getGoodsInfo(this.routerDetail.id, '')
      .subscribe(
      data => {
        // console.log(data);
        this.goodsDetail = data.d;
      }, error => console.log(error)
      );
    this.shopDetail.getCommentByGoodId(this.routerDetail.id, 1, 20)
      .subscribe(
      data => {
        console.log(data);
      }, error => console.log(error)
      );
  }

  ngAfterViewInit() {

  }

  reduce() { //价格-
    let el = this.addReduceInput.nativeElement;
    let value = el.value.trim();
    if (value <= 1) {
      return;
    }
    value--;
    el.value = value;
  }

  add() { //价格 +
    let el = this.addReduceInput.nativeElement;
    let value = el.value.trim()
    value++;
    el.value = value;
  }

  colorItemSelect(event) { // 颜色切换
    // console.log(event);
    let colorItem = event.target.parentNode;
    let colorBox = colorItem.parentNode;
    let colorItems = colorBox.querySelectorAll('.colorItem');
    // console.log(colorItem, colorBox, colorItems);
    colorItems.forEach((e, i) => {
      e.classList.remove('active');
    });
    colorItem.classList.add('active');
  }

  roleItemSelect(event) { //  规格切换
    console.log(event.target);
    let roleItem = event.target;
    let roleBox = roleItem.parentNode;
    let roleItems = roleBox.querySelectorAll('.roleItem');
    roleItems.forEach((e, i) => {
      e.classList.remove('active');
    });
    roleItem.classList.add('active');
  }

  payMethodSelect(event) { // 支付方式切换
    // console.log(event.target);
    let el = event.target.parentNode;
    let methodBox = el.parentNode;
    methodBox.querySelector('.alipay').classList.remove('active');
    methodBox.querySelector('.weixin').classList.remove('active');
    el.classList.add('active');
  }

  imgListSelect(event) { //详情页面幻灯片切换
    // console.log(event.target);
    let item = event.target.parentNode;
    let imgList = item.parentNode;
    let items = imgList.querySelectorAll('.item');
    items.forEach((e, i) => {
      e.classList.remove('active');
    });
    item.classList.add('active');
  }

  detailSelect(event) {// 商品详情切换
    // console.log(event.target);
    let item = event.target;
    let tabs = item.parentNode;
    let shopDetail = tabs.parentNode;
    let body = shopDetail.querySelector('.body');
    let items = tabs.querySelectorAll('.item');
    let bodyItems = body.querySelectorAll('.item');
    let index = this.DOMIndex(item, items);
    items.forEach((e, i) => {
      e.classList.remove('active');
    });
    item.classList.add('active');
    bodyItems.forEach((ee, ii) => {
      ee.classList.remove('active');
      if (ii == index) {
        bodyItems[index].classList.add('active');
        return;
      }
    });
  }

  DOMIndex(current, obj) { // 获取dom在list的索引
    for (var i = 0; i < obj.length; i++) {
      if (obj[i] == current) {
        return i;
      }
    }
  }

}
