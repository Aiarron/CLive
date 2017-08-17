import { Injectable } from '@angular/core';
import { Http, Jsonp, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from "rxjs/Observable";
import { GLOBAL_URL } from "../model-data/GLOBAL";

import { ErrorsService } from "../service/errors.service";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class IndexLiveService {
    public backPlayURL = GLOBAL_URL + '/app/1/getHomePlayBackList';

    constructor(
        public http: Http,
        public errors: ErrorsService,
    ) { }

    // 获取回放
    getBackPlay(): Observable<any> {
        return this.http.get(this.backPlayURL, {
            withCredentials: true
        })
            .map((res: Response) => res.json())
            .catch(this.errors.handleError);
    }

}