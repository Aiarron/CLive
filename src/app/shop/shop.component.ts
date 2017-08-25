import { Component, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { IndexService } from "./service/index.service";

declare var $: any;
declare var Swiper: any;

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss'],
  providers: [
    IndexService
  ]
})
export class ShopComponent implements OnInit, AfterViewInit {
  public getimgs;//轮播图
  public getHomePageCate;//分类
  public guessLike;//猜你喜欢

  public itemsPerPage: number = 20;
  public totalRecords: number = 120;
  public currentPage: number = 1;
  public offset: number = 0;
  public end: number = 0;

  constructor(
    public index: IndexService,
    public el: ElementRef,
  ) { }

  ngOnInit() {
    this.index.getImgs()
      .subscribe(
      data => {
        // console.log(data);
        this.getimgs = data.d;
      },
      error => console.log(error)
      )
    this.index.getHomePageCate()
      .subscribe(
      data => {
        // console.log(data);
        this.getHomePageCate = data.d.items;
      },
      error => console.log(error)
      )
    this.index.guessLike()
      .subscribe(
      data => {
        // console.log(data);
        this.guessLike = data.d.items;
      },
      error => console.log(error)
      )
  }

  ngAfterViewInit() {
    window.localStorage.setItem('setSearch', JSON.stringify({
      id: 2,
      placeholder: '请输入商品名称'
    }));
    var mySwiper = new Swiper('.swiper-container', {
      autoplay: 5000,//可选选项，自动滑动
      pagination: '.swiper-pagination',
    })

  }

  pageChanged(event) {
    console.log(event);
  }
}
