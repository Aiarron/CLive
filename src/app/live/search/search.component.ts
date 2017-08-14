import { Component, OnInit } from '@angular/core';
import { SearchService } from "./service/search.service";

import { ActivatedRoute, Params, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [SearchService]
})
export class SearchComponent implements OnInit {
  public itemsPerPage: number = 9;
  public totalRecords: number = 9;
  public currentPage: number = 1;
  public offset: number = 0;
  public end: number = 0;

  public searchArray;
  public searchText;
  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public searchService: SearchService
  ) { }

  ngOnInit() {
    let activatedRouteSnapshot: ActivatedRouteSnapshot = this.activatedRoute.snapshot;
    let routerState: RouterState = this.router.routerState;
    let routerStateSnapshot: RouterStateSnapshot = routerState.snapshot;
    this.activatedRoute.params.subscribe(
      data => {
        console.log(data);
        this.searchText = JSON.parse(data.id).text;
        this.searchService.getSearch(this.searchText, JSON.parse(data.id).id, 20).subscribe(
          data => {
            if (data.c == 1) {
              this.searchArray = data.d.items;
              this.totalRecords = data.d.pagetotal;
            }
          },
          error => console.log(error)
        );
      }
    )
  }

  public pageChanged(event: any): void {
    let temp = JSON.stringify({
      id: parseInt(event.page) + 1,
      text: this.searchText
    });
    this.router.navigateByUrl("live/search/" + temp);
  }

  follow(value) {
    console.log(value);
  }

}
