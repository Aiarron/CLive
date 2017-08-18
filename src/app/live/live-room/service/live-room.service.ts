import { Injectable } from '@angular/core';
import { Http, Jsonp, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from "rxjs/Observable";
import { GLOBAL_URL } from "../../../model-data/GLOBAL";

import { ErrorsService } from "../../../service/errors.service";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs';
@Injectable()
export class LiveRoomService {
  public enterroomURL = GLOBAL_URL + '/app/1/enterroom';
  public genLiveURL = GLOBAL_URL + '/app/1/genLive';
  public getGiftsURL = GLOBAL_URL + '/app/1/getGifts';
  public getLiveClassUrl = GLOBAL_URL + '/app/1/getLiveClass';
  public startLiveUrl = GLOBAL_URL + '/app/1/startLive';

  constructor(
    public http: Http,
    public sp: Jsonp,
    public erroes: ErrorsService
  ) { }

  genLive(): Observable<any> {// 获取推流地址
    return this.http.get(this.genLiveURL, {
      withCredentials: true
    })
      .map((res: Response) => res.json())
      .catch(this.erroes.handleError);
  }

  enterroom(id): Observable<any> { // 进入直播房间
    let data = new URLSearchParams();
    data.set('rid', id);
    return this.http.get(this.enterroomURL, {
      params: data,
      withCredentials: true
    })
      .map((res: Response) => res.json())
      .catch(this.erroes.handleError)
  }

  getGifts(): Observable<any> { // 获取礼物列表
    return this.http.get(this.getGiftsURL, {
      withCredentials: true
    })
      .map((res: Response) => res.json())
      .catch(this.erroes.handleError);
  }

  getLiveClass(): Observable<any> {// 获取直播话题
    return this.http.get(this.getLiveClassUrl, {
      withCredentials: true
    })
      .map((res: Response) => res.json())
      .catch(this.erroes.handleError);
  }

  startLive(livelogo, livetitle, liveclass, liveaddr): Observable<any> { // 开始直播
    let data = new URLSearchParams();
    data.set('livelogo', livelogo);
    data.set('livetitle', livetitle);
    data.set('liveclass', liveclass);
    data.set('liveaddr', liveaddr);
    return this.http.get(this.startLiveUrl, {
      params: data,
      withCredentials: true
    })
      .map((res: Response) => res.json())
      .catch(this.erroes.handleError);
  }

}
