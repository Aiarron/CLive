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
  public getFansRankUrl = GLOBAL_URL + '/app/1/getFansRank';
  public getRankTotalUrl = GLOBAL_URL + '/app/1/getRankTotal';
  public getRoomAdminsUrl = GLOBAL_URL + '/app/1/getRoomAdmins';
  public sendPubmsgsUrl = GLOBAL_URL + '/app/1/sendPubmsg';
  public getPubNotifyUrlUrl = GLOBAL_URL + '/app/1/getPubNotifyUrl';
  public getPushGoodsUrl = GLOBAL_URL + '/app/1/getPushGoods';
  public pushGoodsUrl = GLOBAL_URL + '/app/1/pushGoods';
  public sendGiftUrl = GLOBAL_URL + '/app/1/sendGift';
  public getShareUrlUrl = GLOBAL_URL + '/app/1/getShareUrl';
  public stopLiveUrl = GLOBAL_URL + '/app/1/stopLive';

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

  sendGift(rid, uid, gid, num, gift_type): Observable<any> {
    let data = new URLSearchParams();
    data.set('rid', rid);
    data.set('uid', uid);
    data.set('gid', gid);
    data.set('num', num);
    data.set('gift_type', gift_type);
    return this.http.get(this.sendGiftUrl, {
      params: data,
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

  getFansRank(rid, livelogo, pagesize): Observable<any> { // 获取直播间贡献榜
    let data = new URLSearchParams();
    data.set('rid', livelogo);
    data.set('livelogo', livelogo);
    data.set('pagesize', pagesize);
    return this.http.get(this.getFansRankUrl, {
      params: data,
      withCredentials: true
    })
      .map((res: Response) => res.json())
      .catch(this.erroes.handleError);
  }

  getRankTotal(uid, page, pagesize, type): Observable<any> { // 粉丝贡献榜(前十)
    let data = new URLSearchParams();
    data.set('uid', uid);
    data.set('page', page);
    data.set('pagesize', pagesize);
    data.set('type', type);
    return this.http.get(this.getRankTotalUrl, {
      params: data,
      withCredentials: true
    })
      .map((res: Response) => res.json())
      .catch(this.erroes.handleError);
  }

  getRoomAdmins(): Observable<any> { // 获取管理员列表
    let data = new URLSearchParams();
    data.set('page', '1');
    data.set('pagesize', '20');
    return this.http.get(this.getRoomAdminsUrl, {
      params: data,
      withCredentials: true
    })
      .map((res: Response) => res.json())
      .catch(this.erroes.handleError);
  }

  sendPubmsg(rid, msg): Observable<any> { // 公聊
    let data = new URLSearchParams();
    data.set('rid', rid);
    data.set('msg', msg);
    return this.http.get(this.sendPubmsgsUrl, {
      params: data,
      withCredentials: true
    })
      .map((res: Response) => res.json())
      .catch(this.erroes.handleError);
  }

  getPubNotifyUrl(): Observable<any> { // 获取公用通知地址接口
    return this.http.get(this.getPubNotifyUrlUrl, {
      withCredentials: true
    })
      .map((res: Response) => res.json())
      .catch(this.erroes.handleError);
  }

  getPushGoods(rid, type): Observable<any> {// 获取主播推送商品接口
    let data = new URLSearchParams();
    data.set('rid', rid);
    data.set('type', type);
    return this.http.get(this.getPushGoodsUrl, {
      params: data,
      withCredentials: true
    })
      .map((res: Response) => res.json())
      .catch(this.erroes.handleError);
  }

  pushGoods(goods_commonid, rid): Observable<any> {// 主播推送商品
    let data = new URLSearchParams();
    data.set('goods_commonid', goods_commonid);
    data.set('rid', rid);
    return this.http.get(this.pushGoodsUrl, {
      params: data,
      withCredentials: true
    })
      .map((res: Response) => res.json())
      .catch(this.erroes.handleError);
  }

  getShareUrl(type, id) { // 获取分享地址
    let data = new URLSearchParams();
    data.set('type', type);
    data.set('id', id);
    return this.http.get(this.getShareUrlUrl, {
      params: data,
      withCredentials: true
    })
      .map((res: Response) => res.json())
      .catch(this.erroes.handleError);
  }

  stopLive(): Observable<any> {
    return this.http.get(this.stopLiveUrl, {
      withCredentials: true
    })
      .map((res: Response) => res.json()).catch(this.erroes.handleError);
  }

}
