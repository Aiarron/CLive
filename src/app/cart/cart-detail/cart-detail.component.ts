import { Component, OnInit } from '@angular/core';
import { Http } from "@angular/http";

declare var $: any;
declare var Swiper: any;
declare var layer: any;

@Component({
  selector: 'app-cart-detail',
  templateUrl: './cart-detail.component.html',
  styleUrls: ['./cart-detail.component.scss']
})
export class CartDetailComponent implements OnInit {
  public cityData;
  constructor(public http: Http) { }

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
    this.http.get('/assets/js/cityData.min.json')
      .subscribe(data => {
        // console.log(data);
        this.cityData = data.json();
        // console.log($.cxSelect, this.cityData);
      })
  }

  useAddress() {
    let that = this;
    console.log(that);
    layer.msg('123123')
    // console.log('123123');
    layer.open({
      type: 1,
      title: '新增收货地址',
      skin: 'layui-layer-rim', //加上边框
      area: ['690px', '440px'], //宽高
      content: '<div class="container" style="padding: 20px 40px; ">\
        <div style="display: flex;align-items: center;">\
          <p style="width: 80px; text-align: right; font-size: 12px;">所在地址：</p>\
          <div id="city_china_val">\
            <select class="province other" data-first-title="选择省" style="width: 120px;height: 30px;">\
              <option value="">请选择</option>\
              <option value="浙江省" selected>浙江省</option>\
            </select>\
            <select class="city" data-first-title="选择市" style="width: 120px;height: 30px;">\
              <option value="">请选择</option>\
              <option value="杭州市" selected>杭州市</option>\
            </select>\
            <select class="area" data-first-title="选择地区" style="width: 120px;height: 30px;">\
              <option value="">请选择</option>\
              <option value="西湖区" selected>西湖区</option>\
            </select>\
          </div>\
        </div>\
        <div style="display: flex; margin-top: 20px;">\
          <p style="width: 80px; text-align: right; font-size: 12px;">详细地址：</p>\
          <textarea style="padding: 10px; width: 440px; height: 71px; resize: none;"></textarea>\
        </div>\
        <div style="display: flex; margin-top: 20px;" align-items: center;>\
          <p style="width: 80px; text-align: right; font-size: 12px;">收货人姓名：</p>\
          <input style="width: 200px; height: 24px">\
        </div>\
        <div style="display: flex; margin-top: 20px; align-items: center;">\
          <p style="width: 80px; text-align: right; font-size: 12px;">手机号码：</p>\
          <input style="width: 200px; height: 24px">\
        </div>\
        <div style="display: flex; margin-top: 20px; align-items: center;">\
          <p style="width: 80px; text-align: right; font-size: 12px;"></p>\
          <div style="display: flex;font-size: 12px;align-items: center;"><input type="checkbox" id="setDefault"><p>设为默认地址</p></div>\
        </div>\
        <div style="display: flex; margin-top: 20px; align-items: center;">\
          <p style="width: 80px; text-align: right; font-size: 12px;"></p>\
          <div style="width: 72px; height: 30px; line-height: 30px; text-align: center; color: #fff; background: #fe345e;">保存</div>\
        </div>\
      </div>'
    });
    $.cxSelect.defaults.data = this.cityData;
    // 设置默认值及选项标题
    $('#city_china_val').cxSelect({
      selects: ['province', 'city', 'area'],
      emptyStyle: 'none'
    });
  }

  useAddress1() {
    console.log(123);
  }

}
