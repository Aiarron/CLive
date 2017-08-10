import { Injectable } from '@angular/core';

import { Observable } from "rxjs/Observable";

@Injectable()
export class ErrorsService {

    constructor() { }

    handleError(error: any) {
        // 我们的服务处理器(handleError)把响应对象记录到控制台中
        // 把错误转换成对用户友好的消息，并且通过Observable.throw来
        // 把这个消息放进一个新的、用于表示“失败”的可观察对象
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // 输出异常信息
        return Observable.throw(errMsg);
    }
}