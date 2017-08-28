import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from "@angular/http";

import { GLOBAL_URL } from "../../../model-data/GLOBAL";
import { Observable } from "rxjs/Observable";
import { ErrorsService } from "../../../service/errors.service";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ShopSearchDetailService {
  public searchGoodsURL = GLOBAL_URL + '/app/2/searchGoods';

  constructor(
    public http: Http,
    public errors: ErrorsService,
  ) { }

  searchGoods(skey, page, pagesize, order, sort, s_price, e_price, gc_id, show_another): Observable<any> {// 查找商品
    let data = new URLSearchParams();
    data.set('skey', skey);
    data.set('page', page || '');
    data.set('pagesize', pagesize || '');
    data.set('order', order || '');
    data.set('sort', sort || '');
    data.set('s_price', s_price || '');
    data.set('e_price', e_price || '');
    data.set('gc_id', gc_id || '');
    data.set('show_another', show_another || '');
    return this.http.get(this.searchGoodsURL, {
      params: data,
      withCredentials: true
    }).map((res: Response) => res.json()).catch(this.errors.handleError);
  }

}
