import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';

import { ProfileService } from "../../service/profile.service";
import { BackLiveDetailService } from "../../live/back-live/back-live-detail/service/back-live-detail.service";
import { LiveRoomService } from "./service/live-room.service";

import { StartLive } from "../../model-data/startLive";

// declare var Swiper: any;
declare var layer: any;
declare var prismplayer: any;

@Component({
    selector: 'app-live-room',
    templateUrl: './live-room.component.html',
    styleUrls: ['./live-room.component.scss'],
    providers: [
        ProfileService,
        BackLiveDetailService,
        LiveRoomService
    ]
})
export class LiveRoomComponent implements OnInit {
    public player;
    public cover;
    public source;
    public barrageSwitch: boolean = false; //弹幕开关
    public isFollow: boolean;// 是否关注
    public textAreNum: number = 0;
    public profiles;//个人信息
    public anchorDetail;//
    public anchor;//参数
    public isAnchor;// 是否主播
    public averageGift; //普通礼物
    public advancedGift; //高级礼物
    public startLiveForm = new StartLive('', '哈哈');
    public topic; // 直播话题
    public startLivePanel; // 开始直播面板
    public enterroom; // 进入房间
    public enterroomAnchor; // 进入房间--主播信息
    public getStartLive; // 开始直播
    public startFiles; // 开始直播的封面logo

    public itemsPerPage: number = 9;
    public totalRecords: number = 9;
    public currentPage: number = 1;
    public offset: number = 0;
    public end: number = 0;

    constructor(
        public activatedRoute: ActivatedRoute,
        public profileService: ProfileService,
        public backLiveDetailService: BackLiveDetailService,
        public liveRoomService: LiveRoomService
    ) { }

    ngOnInit() {
        this.profileService.getProfile()
            .subscribe(
            data => {
                this.profiles = data.d;
            },
            error => console.log(error)
            );
        this.activatedRoute.params
            .subscribe(
            data => {
                // console.log(data);
                this.anchor = data;
                if (this.anchor.flag) { // 主播
                    this.isAnchor = true;
                    this.startLivePanel = true; // 开始直播面板
                } else {
                    this.isAnchor = false;
                    this.startLivePanel = false;
                }
            }
            );

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

        this.liveRoomService.getGifts()
            .subscribe(
            data => {
                // console.log(data);
                this.averageGift = data.d.gift[0].items;
                this.advancedGift = data.d.gift[1].items;
            },
            error => console.log(error)
            )
        this.liveRoomService.getLiveClass()
            .subscribe(
            data => {
                // console.log(data);
                this.topic = data.d.items;
            },
            error => console.log(error)
            )
        this.liveRoomService.enterroom(this.anchor.id)
            .subscribe(
            data => {
                console.log(data);
                this.enterroom = data.d;
                this.enterroomAnchor = data.d.anchor;
            },
            error => console.log(error)
            )

    }

    getBarrage(data) { // 弹幕开关
        this.barrageSwitch = data;
    }

    saveBarrageNum(value) {
        this.textAreNum = value.length;
    }

    sendBarrage(value) {
        console.log(value);

    }

    // doFollow(status, id) {
    //     console.log(status, id);
    //     if (status == false) {
    //         this.backLiveDetailService.addFollow(id)
    //             .subscribe(
    //             data => {
    //                 console.log(data)
    //                 layer.msg("关注成功");
    //                 this.isFollow = true;
    //             },
    //             error => console.log(error)
    //             )
    //     } else {
    //         this.backLiveDetailService.cancelFollow(id)
    //             .subscribe(
    //             data => {
    //                 console.log(data);
    //                 layer.msg("已取消关注");
    //                 this.isFollow = false;
    //             },
    //             error => console.log(error)
    //             )
    //     }
    // }

    closeStartLive() { //关闭面板
        this.startLivePanel = false;
    }

    coverChange(file) {
        console.log(file);
        this.startFiles = file[0];
        let formData = new FormData();
        formData.append('file', this.startFiles);
        // let headers = new Headers();
        // headers.append('Accept', 'application/json');
        // let options = new RequestOptions({ headers: headers });
    }

    onStartLive() {
        console.log(this.startLiveForm);
    }

}
