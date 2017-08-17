import { Injectable } from '@angular/core';
import { Http, Jsonp, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from "rxjs/Observable";
import { GLOBAL_URL } from "../../../../model-data/GLOBAL";

import { ErrorsService } from "../../../../service/errors.service";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class BackLiveDetailService {
  public backLiveDetailURL = GLOBAL_URL + '/app/1/enterPlaybackRoom';
  public addFollowURL = GLOBAL_URL + '/app/1/addFollow';
  public cancelFollowURL = GLOBAL_URL + '/app/1/cancelFollow';

  constructor(
    public http: Http,
    public error: ErrorsService,
  ) { }

  // 获取回放具体信息
  public getBackLiveDetail(id): Observable<any> {
    let params = new URLSearchParams();
    params.set('playbackid', id);
    return this.http.get(this.backLiveDetailURL, {
      params: params,
      withCredentials: true
    })
      .map((res: Response) => res.json())
      .catch(this.error.handleError);
  }

  // 添加关注
  public addFollow(uid): Observable<any> {
    let params = new URLSearchParams();
    params.set('uid', uid);
    return this.http.get(this.addFollowURL, {
      params: params,
      withCredentials: true
    })
      .map((res: Response) => res.json())
      .catch(this.error.handleError);
  }

  // 取消关注
  public cancelFollow(uid): Observable<any> {
    let params = new URLSearchParams();
    params.set('uid', uid);
    return this.http.get(this.cancelFollowURL, {
      params: params,
      withCredentials: true
    })
      .map((res: Response) => res.json())
      .catch(this.error.handleError);
  }

}
