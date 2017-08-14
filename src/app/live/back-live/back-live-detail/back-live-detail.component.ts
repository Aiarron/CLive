import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';

declare var prismplayer: any;

@Component({
  selector: 'app-back-live-detail',
  templateUrl: './back-live-detail.component.html',
  styleUrls: ['./back-live-detail.component.scss']
})
export class BackLiveDetailComponent implements OnInit {
  public player;
  public cover;
  public source;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {
    // let activatedRouteSnapshot: ActivatedRouteSnapshot = this.activatedRoute.snapshot;
    // let routerState: RouterState = this.router.routerState;
    // let routerStateSnapshot: RouterStateSnapshot = routerState.snapshot;
    // this.activatedRoute.params.subscribe(
    //   data => console.log(data)
    // );
    // console.log(activatedRouteSnapshot, routerState, routerStateSnapshot);
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

}
