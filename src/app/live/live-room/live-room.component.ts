import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';

declare var Swiper: any;
declare var prismplayer: any;

@Component({
  selector: 'app-live-room',
  templateUrl: './live-room.component.html',
  styleUrls: ['./live-room.component.scss']
})
export class LiveRoomComponent implements OnInit {
  public player;
  public cover;
  public source;

  constructor() { }

  ngOnInit() {
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

    // var mySwiper = new Swiper('.swiper-container', {
    //   slidesPerView: 'auto',
    //   observer: true,
    //   observeParents: true,
    //   spaceBetween: 10,
    //   slidesOffsetBefore: 40,
    //   slidesOffsetAfter: 40,
    //   grabCursor: true,
    //   prevButton: '.swiper-button-prev',
    //   nextButton: '.swiper-button-next',
    // })
  }

}
