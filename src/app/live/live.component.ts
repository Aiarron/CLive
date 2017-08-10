import { Component, OnInit } from '@angular/core';
declare var prismplayer: any;

@Component({
  selector: 'app-live',
  templateUrl: './live.component.html',
  styleUrls: ['./live.component.scss']
})
export class LiveComponent implements OnInit {
  player;
  constructor() { }

  ngOnInit() {
    this.player = new prismplayer({
      id: "J_prismPlayer", // 容器id
      source: "http://pili-live-hls.www.autoclub.com.cn/diwei-live/test.m3u8",
      autoplay: true,    //自动播放：否
      width: "100%",       // 播放器宽度
      height: "inherit",      // 播放器高度
      isLive: true,
      preload: true,
      cover: 'http://liveroom-img.oss-cn-qingdao.aliyuncs.com/logo.png'
    });

    // 监听播放器的pause事件
    this.player.on("pause", function () {
      console.log("播放器暂停啦！");
    });
  }

  // play() {
  //   this.player.play();
  // }

}
