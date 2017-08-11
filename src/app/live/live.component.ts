import { Component, OnInit } from '@angular/core';
import { LiveService } from "./service/live.service";

import { IndexLive } from "../model-data/index-live";

declare var prismplayer: any;

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {
  player;
  newLive;
  newLive2;
  cover;
  source;
  constructor(
    public liveService: LiveService
  ) { }

  ngOnInit() {
    this.getNewLive(1, 9);
    this.getNewLive2(1, 4);

    this.player = new prismplayer({
      id: "J_prismPlayer", // 容器id
      // source: "http://pili-live-hls.www.autoclub.com.cn/diwei-live/test.m3u8",
      source: this.source,
      autoplay: true,    //自动播放：否
      width: "100%",       // 播放器宽度
      height: "inherit",      // 播放器高度
      isLive: true,
      preload: true,
      cover: this.cover
    });

    // 监听播放器的pause事件
    this.player.on("pause", function () {
      console.log("播放器暂停啦！");
    });

  }

  // play() {
  //   this.player.play();
  // }

  updateIndexLive(address, logo) {
    this.cover = logo;
    this.source = address;
    console.log(this.cover, this.source);
  }

  public getNewLive(page: number, pagesize: number) {
    this.liveService.getNewLive(page, pagesize)
      .subscribe(
      data => {
        this.newLive = data.d.items;
        this.source = this.newLive[0].liveaddress;
        this.cover = this.newLive[0].livelogo;
      },
      error => console.log(error)
      )
  }

  public getNewLive2(page: number, pagesize: number) {
    this.liveService.getNewLive(page, pagesize)
      .subscribe(
      data => {
        this.newLive2 = data.d.items;
      },
      error => console.log(error)
      )
  }
}
