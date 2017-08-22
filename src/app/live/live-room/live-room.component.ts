import { ComponentFactoryResolver, ViewContainerRef, ElementRef, Renderer, ViewChild, ViewChildren, Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';

import { ProfileService } from "../../service/profile.service";
import { BackLiveDetailService } from "../../live/back-live/back-live-detail/service/back-live-detail.service";
import { LiveRoomService } from "./service/live-room.service";
import { ToolsService } from "../../service/tools.service";

import { StartLive } from "../../model-data/startLive";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import * as io from 'socket.io-client';

import { MessageComponent } from "./message/message.component";
import { BarrageScrollComponent } from "./barrage-scroll/barrage-scroll.component";

// declare var Swiper: any;
declare var layer: any;
declare var prismplayer: any;
declare var OSS: any;


@Component({
    selector: 'app-live-room',
    templateUrl: './live-room.component.html',
    styleUrls: ['./live-room.component.scss'],
    providers: [
        ProfileService,
        BackLiveDetailService,
        LiveRoomService,
        ToolsService
    ]
})
export class LiveRoomComponent implements OnInit {
    @ViewChild('getMessage', { read: ViewContainerRef }) getMessage; // 动态添加组件用
    @ViewChild('getMessage') getMessage1;   // 操作dom用
    @ViewChild('barrageScroll', { read: ViewContainerRef }) barrageScroll;
    @ViewChild('saveBarrage') saveBarrage; // 发送消息  弹幕的盒子
    public player;
    public cover;
    public source;
    public barrageSwitch: boolean = true; //弹幕开关
    public isFollow: boolean;// 是否关注
    public textAreNum: number = 0;
    public profiles;//个人信息
    public anchorDetail;//
    public anchor;//参数
    public isAnchor;// 是否主播
    public averageGift; //普通礼物
    public advancedGift; //高级礼物
    public startLiveForm = new StartLive('', '');
    public topic; // 直播话题
    public startLivePanel; // 开始直播面板
    public enterroom; // 进入房间
    public enterroomAnchor; // 进入房间--主播信息
    public getStartLive; // 开始直播
    public startFiles; // 开始直播的封面logo
    public rankDay; // 日榜
    public rankWeek;// 周榜
    public rankMonth;// 月榜
    public rankTotal;// 总榜
    public rankNum;// 总榜
    public websocket;
    public websocketInit;
    public socket;
    public onlines;
    public admins; // 管理员列表
    public fileUploadToken; // 文件上传token
    public fileUploadImg; // 图片上传之后预览

    public itemsPerPage: number = 9;
    public totalRecords: number = 9;
    public currentPage: number = 1;
    public offset: number = 0;
    public end: number = 0;

    constructor(
        public el: ElementRef,
        public activatedRoute: ActivatedRoute,
        public profileService: ProfileService,
        public backLiveDetailService: BackLiveDetailService,
        public liveRoomService: LiveRoomService,
        public tools: ToolsService,
        public ren: Renderer,
        public cfr: ComponentFactoryResolver,
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
                if (this.anchor.flag == 1) { // 主播
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

        this.liveRoomService.getGifts() //礼物列表
            .subscribe(
            data => {
                // console.log(data);
                this.averageGift = data.d.gift[0].items;
                this.advancedGift = data.d.gift[1].items;
            },
            error => console.log(error)
            )
        this.liveRoomService.getLiveClass() // 直播话题
            .subscribe(
            data => {
                // console.log(data);
                this.topic = data.d.items;
            },
            error => console.log(error)
            )
        this.liveRoomService.getPubNotifyUrl() // 获取公用通知地址接口
            .subscribe(
            data => {
                // console.log(data);
                this.websocketInit = new WebSocket(data.d);
            },
            error => console.log(error)
            )
        this.liveRoomService.enterroom(this.anchor.id) //进入房间
            .subscribe(
            data => {
                console.log(data);
                this.enterroom = data.d;
                this.enterroomAnchor = data.d.anchor;
                this.liveRoomWebsocket(this.enterroom.notify)
                    .subscribe(
                    data => {
                        let datas = JSON.parse(data);
                        console.log(datas);
                        if (datas.type == 'onlines') { // 在线人数
                            this.onlines = datas.data;
                        } else if (datas.type == "sendpubmsg") {
                            this.fillMsgBox(datas);
                        }
                        // this.websocket.close();
                        // this.websocket.onclose = (e) => console.log(e);
                    },
                    error => console.log(error)
                    );
            },
            error => console.log(error)
            )
        this.liveRoomService.getRankTotal(this.anchor.id, 1, 10, 1) // 日榜
            .subscribe(
            data => {
                // console.log(data);
                // this.rankDay = data.d;
                this.rankDay = [
                    {
                        "value": "30.00",
                        "nick": "test123",
                        "richlvl": "3",
                        "avatar": "def_user_icon.png",
                        "id": "10385",
                        "sex": "女"
                    },
                    {
                        "value": "30.001",
                        "nick": "test1231",
                        "richlvl": "31",
                        "avatar": "def_user_icon1.png",
                        "id": "103851",
                        "sex": "女"
                    },
                    {
                        "value": "30.001",
                        "nick": "test1231",
                        "richlvl": "31",
                        "avatar": "def_user_icon1.png",
                        "id": "103851",
                        "sex": "女"
                    },
                    {
                        "value": "30.001",
                        "nick": "test1231",
                        "richlvl": "31",
                        "avatar": "def_user_icon1.png",
                        "id": "103851",
                        "sex": "女"
                    }
                ];
                this.rankNum = this.rankDay;
            },
            error => console.log(error)
            )
        this.liveRoomService.getRankTotal(this.anchor.id, 1, 10, 2) // 周榜
            .subscribe(data => { this.rankWeek = data.d; }, error => console.log(error));
        this.liveRoomService.getRankTotal(this.anchor.id, 1, 10, 3) // 月榜
            .subscribe(data => { this.rankMonth = data.d; }, error => console.log(error));
        this.liveRoomService.getRankTotal(this.anchor.id, 1, 10, 4) // 总榜
            .subscribe(data => { this.rankTotal = data.d; }, error => console.log(error))
        this.liveRoomService.getRoomAdmins() // 获取管理员
            .subscribe(
            data => {
                // console.log(data);
                this.admins = data.d.items;
            },
            error => console.log(error)
            )
        this.fileUploadToken = JSON.parse(window.localStorage.getItem('fileUploadToken'));
    }

    getBarrage(data) { // 弹幕开关
        this.barrageSwitch = data;
        console.log(data);
    }

    saveBarrageNum(value) {
        this.textAreNum = value.length;
    }

    sendBarrage(value) { // 发送弹幕 公聊
        this.liveRoomService.sendPubmsg(this.anchor.id, value)
            .subscribe(
            data => {
                this.saveBarrage.nativeElement.value = "";
            },
            error => console.log(error)
            )
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
        this.startFiles = file[0];
        console.log(this.fileUploadToken);
        let AccessKeyId = this.fileUploadToken.d.AccessKeyId;
        let AccessKeySecret = this.fileUploadToken.d.AccessKeySecret;
        let BucketName = this.fileUploadToken.d.BucketName;
        let Expiration = this.fileUploadToken.d.Expiration;
        let SecurityToken = this.fileUploadToken.d.SecurityToken;
        let Endpoint = this.fileUploadToken.d.Endpoint;
        OSS.urllib.request(BucketName + '.' + Endpoint,
            { method: 'GET', },
            function (err, response) {
                if (err) {
                    return alert(err);
                }
                try {
                    let result = JSON.parse(response);
                } catch (e) {
                    let errmsg = 'parse sts response info error: ' + e.message;
                    return alert(errmsg);
                }
                // console.log(result)
                // var client = new OSS.Wrapper({
                //     accessKeyId: result.AccessKeyId,
                //     accessKeySecret: result.AccessKeySecret,
                //     stsToken: result.SecurityToken,
                //     endpoint: '<oss endpoint>',
                //     bucket: '<Your bucket name>'
                // });
                // client.list({
                //     'max-keys': 10
                // }).then(function (result) {
                //     console.log(result);
                // }).catch(function (err) {
                //     console.log(err);
                // });
            })

        // let formData = new FormData();
        // formData.append('file', this.startFiles);
        // let headers = new Headers();
        // headers.append('Accept', 'application/json');
        // let options = new RequestOptions({ headers: headers });
    }

    onStartLive() {
        console.log(this.startLiveForm);
        console.log(this.startFiles);
        console.log(OSS);

        // 获取推流地址
        this.liveRoomService.genLive()
            .subscribe(
            data => {
                this.startLivePanel = false;
                layer.alert('您的推流地址为：' + data.d.up_url, {
                    closeBtn: 0
                }, function () {
                    layer.closeAll();
                });
            },
            error => console.log(error)
            )
    }

    getRankItems(data) {
        switch (data) {
            case 1:
                this.rankNum = this.rankDay;
                break;
            case 2:
                this.rankNum = this.rankWeek;
                break;
            case 3:
                this.rankNum = this.rankMonth;
                break;
            case 4:
                this.rankNum = this.rankTotal;
                break;
            default:
                break;
        }
    }

    liveRoomWebsocket(url) {
        this.websocket = new WebSocket(url);
        this.websocket.onopen = (e) => {
            // this.websocket.send('11111');
        }
        return Observable.create(observer => {
            this.websocket.onmessage = (e) => {
                observer.next(e);
            };
        }).map(res => res.data);
    }

    fillMsgBox(val) {
        let dom = this.cfr.resolveComponentFactory(MessageComponent);
        let barrageDom = this.cfr.resolveComponentFactory(BarrageScrollComponent);

        let componentRef = this.getMessage.createComponent(dom);
        let barrageRef = this.barrageScroll.createComponent(barrageDom);

        (<MessageComponent>componentRef.instance).data = val;
        (<BarrageScrollComponent>barrageRef.instance).data = val;

        setTimeout(() => {
            this.scrollTopMax(this.getMessage1.nativeElement.parentNode);
        }, 500);

    }

    scrollTopMax(e) {
        e.scrollTop = e.scrollHeight;
    }
}
