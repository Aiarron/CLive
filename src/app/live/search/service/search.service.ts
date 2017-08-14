import { Injectable } from '@angular/core';
import { Http, URLSearchParams, Headers, RequestOptions, Response } from "@angular/http";

import { Observable } from "rxjs/Observable";
import { GLOBAL_URL } from "../../../model-data/GLOBAL";

import { ErrorsService } from "../../../service/errors.service";

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SearchService {
  searchAnchors = GLOBAL_URL + '/app/1/searchAnchors';

  constructor(
    public http: Http,
    public errors: ErrorsService
  ) { }

  getSearch(skey, page, pagesize): Observable<any> {
    let params = new URLSearchParams();
    params.set('skey', skey);
    params.set('page', page);
    params.set('pagesize', pagesize);
    return this.http.get(this.searchAnchors, { params: params })
      .map((res: Response) => res.json())
      .catch(this.errors.handleError);
  }

}
