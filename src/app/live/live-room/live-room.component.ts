import { ComponentFactoryResolver, ViewContainerRef, ElementRef, Renderer, ViewChild, ViewChildren, Component, OnInit, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ActivatedRoute, Router, ActivatedRouteSnapshot, RouterState, RouterStateSnapshot } from '@angular/router';

import { ProfileService } from "../../service/profile.service";
import { BackLiveDetailService } from "../../live/back-live/back-live-detail/service/back-live-detail.service";
import { LiveRoomService } from "./service/live-room.service";
import { LiveService } from "../service/live.service";
import { ToolsService } from "../../service/tools.service";

import { StartLive } from "../../model-data/startLive";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { MessageComponent } from "./message/message.component";
import { BarrageScrollComponent } from "./barrage-scroll/barrage-scroll.component";

declare var layer: any;
declare var prismplayer: any;
declare var QRCode: any;
declare var Clipboard: any;

@Component({
    selector: 'app-live-room',
    templateUrl: './live-room.component.html',
    styleUrls: ['./live-room.component.scss'],
    providers: [
        ProfileService,
        BackLiveDetailService,
        LiveRoomService,
        LiveService,
        ToolsService
    ]
})
export class LiveRoomComponent implements OnInit, AfterViewInit {
    @ViewChild('getMessage', { read: ViewContainerRef }) getMessage; // 动态添加组件用
    @ViewChild('getMessage') getMessage1;   // 操作dom用
    @ViewChild('barrageScroll', { read: ViewContainerRef }) barrageScroll;
    @ViewChild('saveBarrage') saveBarrage; // 发送消息  弹幕的盒子
    @ViewChild('lastcoins') lastcoins; // 发送消息  弹幕的盒子
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
    public pushGoods; // 获取主播推送商品列表
    public shouPushGoods; // 展示主播推送商品列表
    public pubshGoodsValue;//接受websocket主播商品推送
    public laseCoin;//赠送礼物剩余的余额
    public shareUrl;// 分享地址
    public shareCode;// 分享二维码插件实例化
    public pullAddress;// 拉流地址

    // public itemsPerPage: number = 9;
    // public totalRecords: number = 9;
    // public currentPage: number = 1;
    // public offset: number = 0;
    // public end: number = 0;

    public itemsPerPage: number = 20;
    public totalRecords: number = 120;
    public currentPage: number = 1;
    public offset: number = 0;
    public end: number = 0;

    constructor(
        public el: ElementRef,
        public activatedRoute: ActivatedRoute,
        public profileService: ProfileService,
        public backLiveDetailService: BackLiveDetailService,
        public liveRoomService: LiveRoomService,
        public liveService: LiveService,
        public tools: ToolsService,
        public ren: Renderer,
        public cfr: ComponentFactoryResolver,
    ) { }

    ngOnInit() {
        this.profileService.getProfile()
            .subscribe(
            data => {
                console.log(data);
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
        this.liveRoomService.getGifts() //礼物列表
            .subscribe(
            data => {
                console.log(data);
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
                this.pullAddress = data.d.live;
                this.anchorDetail = data.d.anchor;
                this.player = new prismplayer({
                    id: "J_prismPlayer", // 容器id
                    source: this.pullAddress,
                    autoplay: true,    //自动播放：否
                    width: "100%",       // 播放器宽度
                    height: "inherit",      // 播放器高度
                    isLive: true,
                    preload: true,
                    cover: this.cover
                });
                this.enterroomAnchor = data.d.anchor;
                this.liveRoomWebsocket(this.enterroom.notify)
                    .subscribe(
                    data => {
                        let datas = JSON.parse(data);
                        console.log(datas);
                        if (datas.type == 'onlines') { // 在线人数
                            this.onlines = datas.data;
                        } else if (datas.type == "sendpubmsg") { // 发送弹幕
                            this.fillMsgBox(datas);
                        } else if (datas.type == "pubshGoods") { // 推送商品
                            this.pubshGoods(datas);
                        } else if (datas.type == "stopLive") { // 主播退出直播

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
                console.log(data);
                if (data.d) {
                    this.admins = data.d.items;
                } else {
                    this.admins = '';
                }
            },
            error => console.log(error)
            )
        this.fileUploadToken = JSON.parse(window.localStorage.getItem('fileUploadToken'));
        // this.liveRoomService.getPushGoods(this.anchor.id, 3)
        // .subscribe(data => { this.pushGoods = data.d; }, error => console.log(error));
        this.shouPushGoods = this.pushGoods = [{
            "index_no": 1,
            "goods_commonid": "100051",
            "default_img": "def_user_icon.png",
            "goods_price": "1111.00",
            "goods_name": "商品测试11"
        }, {
            "index_no": 1,
            "goods_commonid": "100051",
            "default_img": "def_user_icon.png",
            "goods_price": "1111.00",
            "goods_name": "商品测试1"
        }]
        this.shouPushGoods = this.pushGoods.slice(0, 20);
        this.liveRoomService.getShareUrl(1, 100052)
            .subscribe(
            data => {
                console.log(data);
                if (data.d) {
                    this.shareUrl = data.d.url;
                } else {
                    this.shareUrl = '';
                }
            },
            error => console.log(error)
            )
    }

    ngAfterViewInit() {
        // this.profiles.id
        let profile = JSON.parse(window.localStorage.getItem('profile'));
        if (profile.id == this.anchor.id) { //判断进入的是不是自己的房间
            console.log(123123);
        }
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

    doFollow(id, event) {
        console.log(id, event);
        let isfollow = event.target.getAttribute('data-isfollowed');
        console.log(isfollow);
        if (isfollow == 'false') {
            this.backLiveDetailService.addFollow(id)
                .subscribe(
                data => {
                    console.log(data);
                    if (data.c == 10000) {
                        layer.msg(data.m);
                    }
                }, error => console.log(error)
                )
        } else {
            console.log('123123');
        }
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

    coverChange(file, event) {
        this.startFiles = file[0];
        // console.log(this.startFiles);
        this.liveService.imgUpload(this.startFiles)
            .subscribe(
            data => {
                // console.log(data); console.log(event);
                this.fileUploadImg = data[0].url;
                event.target.files[0] = "";
            }, error => console.log(error)
            )
    }

    onStartLive(event) {
        // 开始直播
        let logoImg = event.target.querySelector('.imgBox img').getAttribute('src');
        // console.log(this.startLiveForm);
        if (this.startLiveForm.title.length <= 0) {
            layer.msg('直播标题不能为空');
            return;
        } else if (this.startLiveForm.topic.length <= 0) {
            layer.msg('直播话题不能为空');
            return;
        } else if (logoImg == '/assets/img/comment_addimg.png') {
            layer.msg('直播封面不能为空');
            return;
        }
        this.liveRoomService.startLive(logoImg, this.startLiveForm.title, this.startLiveForm.topic, '')
            .subscribe(
            data => {
                console.log(data)
            }, error => console.log(error)
            )
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

    stopLive() {// 停止直播
        this.liveRoomService.stopLive()
            .subscribe(
            data => {
                console.log(data);
            }, error => console.log(error)
            )
    }

    getRankItems(data) { //排行榜
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

    fillMsgBox(val) { //公聊聊天盒子
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

    scrollTopMax(e) { // 滚动条置底
        e.scrollTop = e.scrollHeight;
    }

    pushGoodsAnchor(goods_commonid, id, event) {//主播推送商品
        console.log(goods_commonid, id);
        event.target.innerText = "再次推送";
        this.liveRoomService.pushGoods(goods_commonid, id)
            .subscribe(data => { })
    }

    pubshGoods(val) {
        console.log(val);
        this.pubshGoodsValue = val.data.goods;
        setTimeout(() => {
            this.pubshGoodsValue = ""
        }, 60000);
    }

    addCart() {

    }

    sendGift(rid, uid, gid, num, gift_type) {
        this.liveRoomService.sendGift(rid, uid, gid, num, gift_type)
            .subscribe(
            data => {
                console.log(data);
                if (data.c != 20000) {
                    this.laseCoin = data.d.coin;
                    this.anchorDetail.coin = data.d.coin;
                } else {
                    layer.msg(data.m);
                }
                console.log(this.lastcoins.nativeElement);
            },
            error => console.log(error)
            )
    }

    showShare(e) {
        e.target.parentNode.querySelector('.sharedPanel').style.display = 'block';
        this.shareCode = new QRCode(e.target.parentNode.querySelector('.sharedPanel .qrcode .code'), {
            text: this.shareUrl,
            width: 140,
            height: 140,
        });
    }

    hideShare(e) {
        e.target.parentNode.querySelector('.sharedPanel').style.display = 'none';
        e.target.parentNode.querySelector('.sharedPanel .qrcode .code').innerHTML = '';
        this.shareCode.clear();
    }

    clipboradShare(e) {// 复制分享地址
        let clipboard = new Clipboard('.copy');
        clipboard.on('success', (e) => {
            layer.msg('复制成功');
        });
        clipboard.on('error', (e) => {
            layer.msg('复制失败');
        });
    }

    shareToQQ(url, pics, event) {//手动分享到qq
        let source = event.target.ownerDocument.querySelector("head meta[name='site']").getAttribute('content');
        let title = event.target.ownerDocument.querySelector("head title").innerHTML;
        let desc = event.target.ownerDocument.querySelector("head meta[name='description']").getAttribute('content');
        window.location.href = "http://connect.qq.com/widget/shareqq/index.html?url=" + url + "&title=" + title + "&source=" + source + "&desc=" + desc + "&pics=" + pics;
    }

    shareToXinlang(url, pics, event) {//手动分享到微博
        let source = event.target.ownerDocument.querySelector("head meta[name='site']").getAttribute('content');
        let title = event.target.ownerDocument.querySelector("head title").innerHTML;
        let desc = event.target.ownerDocument.querySelector("head meta[name='description']").getAttribute('content');
        window.location.href = "http://service.weibo.com/share/share.php?url=" + url + "&title=" + title + "&pic=" + pics + "&appkey=" + '';
    }



    pageChanged(event: any): void { //假装分页
        console.log(event);
        this.shouPushGoods = this.pushGoods.slice(event.first, parseInt(event.first + parseInt(event.rows)));
    }
}
