import { Injectable } from '@angular/core';
import { Http, Headers, Response, URLSearchParams } from "@angular/http";

import { GLOBAL_URL } from "../../model-data/GLOBAL";
import { Observable } from "rxjs/Observable";
import { ErrorsService } from "../../service/errors.service";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LiveService {
  public newLiveURL = GLOBAL_URL + '/app/1/getNewAnchors';
  public hotLiveURL = GLOBAL_URL + '/app/1/getHotAnchors';

  constructor(
    public http: Http,
    public errors: ErrorsService,
  ) { }

  public getNewLive(page: number, pagesize: number): Observable<any> {
    let header = new Headers();

    let data = JSON.stringify({
      'page': page,
      'pagesize': pagesize
    })

    return this.http.get(this.newLiveURL, data)
      .map((res: Response) => res.json())
      .catch(this.errors.handleError);
  }

  public getHotLive(): Observable<any> {
    return this.http.get(this.hotLiveURL)
      .map((res: Response) => res.json())
      .catch(this.errors.handleError);
  }

}
