import { Injectable } from '@angular/core';
import { Http, Jsonp, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';

import { Observable } from "rxjs/Observable";
import { GLOBAL_URL } from "../model-data/GLOBAL";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class LoginService {
    public loginURL = GLOBAL_URL + '/app/1/login';
    public registerURL = GLOBAL_URL + '/app/1/register';
    public codeURL = GLOBAL_URL + '/app/1/sendSms';
    public logoutURL = GLOBAL_URL + '/app/1/logout';

    constructor(
        public http: Http,
    ) { }
    // 登录
    public login(mobile: string, password: string): Observable<any> {
        let data = new URLSearchParams();
        data.append('authtoken', mobile);
        data.append('authsecret', password);
        data.append('authtype', 'phone');
        data.append('uniqueid', '1234');
        return this.http.get(this.loginURL, {
            withCredentials: true,
            search: data
        })
            .map((res: Response) => res.json());
    }

    //注册
    public register(obj): Observable<any> {
        let data = new URLSearchParams();
        data.append('authtoken', obj.mobile);
        data.append('authsecret', obj.password);
        data.append('authtype', 'phone');
        data.append('authcode', obj.code);
        return this.http.get(this.registerURL, {
            withCredentials: true,
            search: data
        })
            .map((res: Response) => res.json());
    }

    //发验证码
    public sendCode(obj): Observable<any> {
        console.log(obj);
        let data = new URLSearchParams();
        data.append('phone', obj.mobile);
        data.append('type', 'register');
        return this.http.get(this.codeURL, {
            withCredentials: true,
            search: data
        })
            .map((res: Response) => res.json());
    }

    // 退出
    public logout() : Observable<any>{
        return this.http.get(this.logoutURL, {
            withCredentials: true,
        })
            .map((res: Response) => res.json());
    }
}