import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from "@angular/http";

import { GLOBAL_URL } from "../../../model-data/GLOBAL";
import { Observable } from "rxjs/Observable";
import { ErrorsService } from "../../../service/errors.service";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ShopDetailService {
  public getGoodsInfoURL = GLOBAL_URL + '/app/2/getGoodsInfo';
  public getGoodsPriceBySpecURL = GLOBAL_URL + '/app/2/getGoodsPriceBySpec';
  public goodsFavoritesURL = GLOBAL_URL + '/app/2/goodsFavorites';
  public getCommentByGoodIdURL = GLOBAL_URL + '/app/2/getCommentByGoodId';

  constructor(
    public http: Http,
    public errors: ErrorsService,
  ) { }

  getGoodsInfo(goods_commonid, goods_id): Observable<any> { //获取商品详情
    let data = new URLSearchParams();
    data.set('goods_commonid', goods_commonid);
    data.set('goods_id', goods_id);
    return this.http.get(this.getGoodsInfoURL, {
      params: data,
      withCredentials: true
    })
      .map((res: Response) => res.json())
      .catch(this.errors.handleError);
  }

  getGoodsPriceBySpec(goods_commonid, spec): Observable<any> { //获取商品规格详情
    let data = new URLSearchParams();
    data.set('goods_commonid', goods_commonid);
    data.set('spec', spec);
    return this.http.get(this.getGoodsPriceBySpecURL, {
      params: data,
      withCredentials: true
    })
      .map((res: Response) => res.json())
      .catch(this.errors.handleError);
  }

  goodsFavorites(goods_commonid): Observable<any> { //获取商品规格详情
    let data = new URLSearchParams();
    data.set('goods_commonid', goods_commonid);
    return this.http.get(this.goodsFavoritesURL, {
      params: data,
      withCredentials: true
    })
      .map((res: Response) => res.json())
      .catch(this.errors.handleError);
  }

  getCommentByGoodId(goods_commonid, page, pagesize): Observable<any> { //获取商品规格详情
    let data = new URLSearchParams();
    data.set('goods_commonid', goods_commonid);
    data.set('page', page);
    data.set('pagesize', pagesize);
    return this.http.get(this.getCommentByGoodIdURL, {
      params: data,
      withCredentials: true
    })
      .map((res: Response) => res.json())
      .catch(this.errors.handleError);
  }

}
