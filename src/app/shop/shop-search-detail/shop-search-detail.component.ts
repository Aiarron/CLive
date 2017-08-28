import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { ShopSearchDetailService } from "./service/shop-search-detail.service";

import { ShopSearchDetailModel } from "../model/shop-search-detail-model";

declare var $: any;

@Component({
  selector: 'app-shop-search-detail',
  templateUrl: './shop-search-detail.component.html',
  styleUrls: ['./shop-search-detail.component.scss'],
  providers: [ShopSearchDetailService]
})
export class ShopSearchDetailComponent implements OnInit {
  public searchModel = new ShopSearchDetailModel('', '', '', '2', '1', '', '', '', '');
  public routerParams; //路由参数

  public itemsPerPage: number = 20;
  public totalRecords: number = 120;
  public currentPage: number = 1;
  public offset: number = 0;
  public end: number = 0;

  constructor(
    public router: Router,
    public activeRouter: ActivatedRoute,
    public shopService: ShopSearchDetailService
  ) { }

  ngOnInit() {
    console.log(this.searchModel);
    this.activeRouter.params.subscribe(
      data => {
        this.routerParams = data;// {text: "123", searchParams: ""}
      }
    )
    this.shopService.searchGoods(this.routerParams.text, '', '', '', '', '', '', '', '')
      .subscribe(
      data => {
        console.log(data);
      }, error => console.log(error)
      )

    $(document).on('click', function (e) {
      $(e.target).find('.numberBox span, .priceBox span').removeClass('active').data('is', 1);
    })
  }

  pageChanged(event) {
    console.log(event);
  }

  selectNumber(event, value) {
    // console.log('order: ' + this.searchModel.order, 'sort: ' + this.searchModel.sort);
    console.log(event);
  }

  selectPrice(event, value) {
    // console.log('order: ' + this.searchModel.order, 'sort: ' + this.searchModel.sort);
  }

  inputSearch(event) {
    console.log(event);
  }

  showdown(event) {
    // console.log(event);
    let box = event.target.parentNode;
    let span = box.querySelector('span');
    let dataIs = event.target.getAttribute('data-is');
    if (dataIs == 1) {
      span.classList.add('active');
      event.target.setAttribute('data-is', '0');
    } else {
      span.classList.remove('active');
      event.target.setAttribute('data-is', '1');
    }
    // console.log(box, span, dataIs);
  }


}
