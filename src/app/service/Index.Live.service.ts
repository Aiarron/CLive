import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from "@angular/http";

import { Observable } from "rxjs/Observable";
import { GLOBAL_URL } from "../model-data/GLOBAL";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class IndexLiveService {

    constructor() { }
}