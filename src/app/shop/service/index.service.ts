import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from "@angular/http";

import { GLOBAL_URL } from "../../model-data/GLOBAL";
import { Observable } from "rxjs/Observable";
import { ErrorsService } from "../../service/errors.service";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
@Injectable()
export class IndexService {
  public getImgsURL = GLOBAL_URL + '/app/1/getImgs';
  public getHomePageCateURL = GLOBAL_URL + '/app/2/getHomePageCate';
  public guessLikeURL = GLOBAL_URL + '/app/2/guessLike';

  constructor(
    public http: Http,
    public errors: ErrorsService,
  ) { }

  getImgs(): Observable<any> {// 轮播图
    let data = new URLSearchParams();
    data.set('type', '3');
    return this.http.get(this.getImgsURL, {
      params: data,
      withCredentials: true
    })
      .map((res: Response) => res.json())
      .catch(this.errors.handleError);
  }

  getHomePageCate(): Observable<any> { // 获取商品分类
    let data = new URLSearchParams();
    data.set('page', '1');
    data.set('pagesize', '4');
    return this.http.get(this.getHomePageCateURL, {
      params: data,
      withCredentials: true
    })
      .map((res: Response) => res.json())
      .catch(this.errors.handleError);
  }

  guessLike(): Observable<any> { // 猜你喜欢接口
    let data = new URLSearchParams();
    data.set('page', '1');
    data.set('pagesize', '30');
    return this.http.get(this.guessLikeURL, {
      params: data,
      withCredentials: true
    })
      .map((res: Response) => res.json())
      .catch(this.errors.handleError);
  }

}
