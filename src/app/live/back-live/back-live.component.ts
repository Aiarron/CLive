import { Component, OnInit } from '@angular/core';

import { LiveService } from "../service/live.service";

@Component({
  selector: 'app-back-live',
  templateUrl: './back-live.component.html',
  styleUrls: ['./back-live.component.scss'],
  providers: [LiveService]
})
export class BackLiveComponent implements OnInit {
  public backArray;
  constructor(
    public liveService: LiveService
  ) { }

  ngOnInit() {
    this.liveService.getNewLive(1, 20)
      .subscribe(
      data => {
        console.log(data)
        this.backArray = data.d.plays.items;
      },
      error => console.log(error)
      )
  }

}
