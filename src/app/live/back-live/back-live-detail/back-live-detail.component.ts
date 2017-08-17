import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';

import { BackLiveDetailService } from "./service/back-live-detail.service";

declare var prismplayer: any;
declare var layer: any;

@Component({
  selector: 'app-back-live-detail',
  templateUrl: './back-live-detail.component.html',
  styleUrls: ['./back-live-detail.component.scss'],
  providers: [
    BackLiveDetailService
  ]
})
export class BackLiveDetailComponent implements OnInit {
  public player;
  public cover;
  public source;
  public anchorDetail;
  public isFollow: boolean;

  constructor(
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public backLiveDetailService: BackLiveDetailService
  ) { }

  ngOnInit() {
    this.activatedRoute.params
      .subscribe(
      data => {
        this.backLiveDetailService.getBackLiveDetail(data.id)
          .subscribe(
          datas => {
            console.log(datas);
            this.anchorDetail = datas.d;
            this.cover = this.anchorDetail.avatar;
            this.source = this.anchorDetail.live;
            this.media(this.source, this.cover);
            this.anchorDetail.followed ? this.isFollow = true : this.isFollow = false;
          },
          errors => console.log(errors)
          )
      },
      error => console.log(error)
      )
  }

  media(source, cover) {
    console.log(source, cover);
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

  doFollow(status, id) {
    if (status == false) {
      console.log(status, id);
      this.backLiveDetailService.addFollow(id)
        .subscribe(
        data => {
          console.log(data)
          layer.msg(data.m);
        },
        error => console.log(error)
        )
    } else {
      this.backLiveDetailService.cancelFollow(id)
        .subscribe(
        data => console.log(data),
        error => console.log(error)
        )
    }
  }

}
