import { Injectable } from '@angular/core';
import { Http, Jsonp, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from "rxjs/Observable";
import { GLOBAL_URL } from "../model-data/GLOBAL";

import { ErrorsService } from "../service/errors.service";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ProfileService {

    public profileURL = GLOBAL_URL + '/app/1/getProfile'; // 获取个人信息

    constructor(
        public http: Http,
        public errors: ErrorsService
    ) { }

    //获取个人信息
    public getProfile(): Observable<any> {
        return this.http.get(this.profileURL, {
            withCredentials: true
        })
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.errors.handleError);
    }

}