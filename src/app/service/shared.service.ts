import { Injectable } from '@angular/core';
import { Http, Jsonp, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from "rxjs/Observable";
import { GLOBAL_URL } from "../model-data/GLOBAL";

import { ErrorsService } from "../service/errors.service";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SharedService {
    // public profileURL = 'http://192.168.1.66:8007/upload/index.php'; // 获取个人信息
    public shareQQURL = 'https://graph.qq.com/t/add_pic_t';

    constructor(
        public http: Http,
        public errors: ErrorsService
    ) { }

    shareQQ() {
        return this.http.get(this.shareQQURL, {
            withCredentials: true
        })
            .map((res: Response) => {
                return res.json();
            })
            .catch(this.errors.handleError);
    }

}