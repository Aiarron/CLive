import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from "@angular/http";

import { GLOBAL_URL } from "../../model-data/GLOBAL";
import { Observable } from "rxjs/Observable";
import { ErrorsService } from "../../service/errors.service";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LiveService {
  public newLiveURL = GLOBAL_URL + '/app/1/index/newList'; // 直播列表  回放列表
  public hotLiveURL = GLOBAL_URL + '/app/1/index/hotList';
  public topNewLiveURL = GLOBAL_URL + '/app/1/index/topList';

  constructor(
    public http: Http,
    public errors: ErrorsService,
  ) { }

  public getNewLive(page, pagesize): Observable<any> {
    let data = new URLSearchParams();
    data.set('page', page);
    data.set('pagesize', pagesize);

    return this.http.get(this.newLiveURL, {
      params: data,
      withCredentials: true
    })
      .map((res: Response) => res.json())
      .catch(this.errors.handleError);
  }

  public getHotLive(page, pagesize): Observable<any> {
    let data = new URLSearchParams();
    data.set('page', page);
    data.set('pagesize', pagesize);

    return this.http.get(this.hotLiveURL, {
      params: data,
      withCredentials: true
    })
      .map((res: Response) => res.json())
      .catch(this.errors.handleError);
  }

  public getTopNewLive(): Observable<any> {

    return this.http.get(this.topNewLiveURL, {
      withCredentials: true
    })
      .map((res: Response) => res.json())
      .catch(this.errors.handleError)
  }

}
