import { Component, OnInit } from '@angular/core';
import { LiveService } from "./service/live.service";

import { IndexLive } from "../model-data/index-live";

declare var prismplayer: any;

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss'],
  providers: [
    LiveService
  ]
})
export class LiveComponent implements OnInit {
  public player;
  public newLive1;
  public newLive2;
  public hotLive;
  public cover;
  public source;
  public backArray;
  public topNewLive;
  constructor(
    public liveService: LiveService,
  ) { }

  ngOnInit() {
    this.getNewLive1(1, 20);
    // this.getNewLive2(1, 4);
    this.liveService.getHotLive(1, 20) //热门
      .subscribe(
      data => {
        // console.log(data);
        this.hotLive = data.d.lives.items.slice(0, 4);
      },
      error => console.log(error)
      );

    this.liveService.getTopNewLive() // 最新轮播
      .subscribe(
      data => {
        console.log(data);
        this.topNewLive = data.d.lives;
        this.source = this.topNewLive[0].play_url_m3u8;
        this.cover = this.topNewLive[0].avatar;
        this.media(this.source, this.cover);
      },
      error => console.log(error)
      )
  }


  updateIndexLive(address, logo) {
    this.cover = logo;
    this.source = address;
    // console.log(this.cover, this.source);
  }

  public getNewLive1(page: number, pagesize: number) { //最新直播
    this.liveService.getNewLive(page, pagesize)
      .subscribe(
      data => {
        console.log(data);
        if (data.d) {
          this.newLive1 = data.d.lives.items || null;
          this.newLive2 = data.d.lives.items.slice(0, 4) || null;
          this.backArray = data.d.plays.items;
        }
      },
      error => console.log(error)
      )
  }

  media(source, cover) {
    // console.log(source, cover);
    this.player = new prismplayer({
      id: "J_prismPlayer", // 容器id
      source: source,
      autoplay: true,    //自动播放：否
      width: "100%",       // 播放器宽度
      height: "inherit",      // 播放器高度
      isLive: true,
      preload: true,
      cover: cover
    });

    this.player.on("pause", function () {
      console.log("播放器暂停啦！");
    });
  }
}
