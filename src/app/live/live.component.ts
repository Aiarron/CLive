import { Component, OnInit } from '@angular/core';
import { LiveService } from "./service/live.service";

import { IndexLive } from "../model-data/index-live";
import { IndexLiveService } from "../service/index.Live.service";

declare var prismplayer: any;

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss'],
  providers: [IndexLiveService]
})
export class LiveComponent implements OnInit {
  public player;
  public newLive1;
  public newLive2;
  public cover;
  public source;
  public backArray;
  public aaaaa; //11111111111111111111
  constructor(
    public liveService: LiveService,
    public indexLiveService: IndexLiveService
  ) { }

  ngOnInit() {

    this.aaaaa = 1;//11111111111111111111

    this.getNewLive1(1, 9);
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

    this.indexLiveService.getBackPlay()
      .subscribe(
      data => {
        console.log(data);
        this.backArray = data.d;
      },
      error => console.log(error)
      );
  }

  // play() {
  //   this.player.play();
  // }

  updateIndexLive(address, logo) {
    this.cover = logo;
    this.source = address;
    console.log(this.cover, this.source);
  }

  public getNewLive1(page: number, pagesize: number) {
    this.liveService.getNewLive(page, pagesize)
      .subscribe(
      data => {
        if (data.d) {
          this.newLive1 = data.d.items;
          this.source = this.newLive1[0].liveaddress;
          this.cover = this.newLive1[0].livelogo;
        }
      },
      error => console.log(error)
      )
  }

  public getNewLive2(page: number, pagesize: number) {
    this.liveService.getNewLive(page, pagesize)
      .subscribe(
      data => {
        if (data.d) {
          this.newLive2 = data.d.items;
        }
      },
      error => console.log(error)
      )
  }
}
