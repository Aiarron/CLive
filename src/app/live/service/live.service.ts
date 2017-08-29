import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams, RequestOptions } from "@angular/http";

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
  public imgUploadURL = GLOBAL_URL + '/upload/files';

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
      .map((res: Response) => res.json()).catch(this.errors.handleError);
  }

  public getTopNewLive(): Observable<any> {

    return this.http.get(this.topNewLiveURL, {
      withCredentials: true
    })
      .map((res: Response) => res.json()).catch(this.errors.handleError)
  }

  public imgUpload(file): Observable<any> {
    let data = new URLSearchParams();
    // let headers = new Headers();
    // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Accept', 'application/json');
    // let options = new RequestOptions({ headers: headers });
    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(this.imgUploadURL, formData, {
      params: data,
      withCredentials: true,
    })
      .map((res: Response) => res.json()).catch(this.errors.handleError);
  }

}
