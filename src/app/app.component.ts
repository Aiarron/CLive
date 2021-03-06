import { Component, ElementRef, Renderer, OnInit, } from '@angular/core';
import { Router } from "@angular/router";
import { IndexLogin } from "./model-data/index-login";
import { IndexProfile } from "./model-data/index-profile";

import { LoginService } from "./service/login.service";
import { ProfileService } from "./service/profile.service";
import { ToolsService } from "./service/tools.service";

declare const $: any;
declare const layer: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [LoginService, ProfileService]
})
export class AppComponent implements OnInit {
  public isLogin: number = 0;
  public model = new IndexLogin('', '', '');
  public profiles;
  public placeholder;

  constructor(
    public elementRef: ElementRef,
    public renderer: Renderer,
    public router: Router,
    public login: LoginService,
    public profile: ProfileService,
    public tools: ToolsService,
  ) { }

  ngOnInit() {
    window.localStorage.setItem('setSearch', JSON.stringify({
      id: 1,
      placeholder: '请输入主播昵称'
    }));
    this.placeholder = JSON.parse(window.localStorage.getItem('setSearch'));
    this.getProfile();
    this.tools.getUploadToken()
      .subscribe(
      data => {
        // console.log(data);
        window.localStorage.setItem('fileUploadToken', JSON.stringify(data));
      },
      error => console.log(error)
      )
  }

  choosePanle(value) {
    this.isLogin = value;
  }

  getProfile() {
    this.profile.getProfile().subscribe(
      data => {
        console.log(data);
        if (data.c == 1) { // 遊客許可權
          localStorage.setItem('profile', JSON.stringify(data.d));
          this.profiles = data.d;
          this.choosePanle(0);
        }
      },
      error => console.log(error)
    )
  }

  onSubmitLogin() {
    console.log(this.model);
    if (this.model && this.model.mobile && this.model.password) {
      this.isLogin = 0;
      this.login.login(this.model.mobile, this.model.password)
        .subscribe(
        data => {
          console.log(data);
          if (data.c == 1) {
            layer.msg('登录成功');
            this.choosePanle(0);
            this.profiles = this.getProfile();
            console.log(this.profiles);
          }
        },
        error => console.log(error)
        );

    }
  }

  onSubmitReg() {
    console.log(this.model);
    this.login.register(this.model)
      .subscribe(
      data => {
        console.log(data);
        if (data.c == 1) {
          layer.msg('注册成功');
          this.onSubmitLogin();
        } else {
          layer.msg(data.m);
        }
      }
      );
  }

  sendCode() {
    console.log(this.model);
    if (this.model.mobile.length != 11) {
      layer.msg('用户名只能为11位');
      return;
    }
    this.login.sendCode(this.model)
      .subscribe(
      data => {
        console.log(data);
        if (data.c == 1) {
          layer.msg('发送验证码成功');
        } else {
          layer.msg('验证码发送失败');
        }
      },
      error => console.log(error)
      )
  }

  search(event, value) {

    if (value) {
      let data = JSON.stringify({
        id: this.placeholder.id == 1 ? 1 : 2,
        text: value
      });
      if (this.placeholder.id == 1) {
        this.router.navigate(["/live/search", data]);
      } else {
        this.router.navigate(["/shop/shop-search-detail", value, '']);
      }
    }
  }

  logout() {
    this.login.logout()
      .subscribe(
      data => {
        console.log(data);
        layer.confirm('确认退出？', {
          btn: ['确定', '取消'] //按钮
        }, function () {
          layer.msg('已退出');
          setTimeout(() => {
            window.location.reload();
          }, 1000)
        }, function () {
          layer.closeAll();
        });
      },
      error => console.log(error)
      )
  }

  goIndex() {
    window.localStorage.setItem('setSearch', JSON.stringify({
      id: 1,
      placeholder: '请输入主播昵称'
    }));
    this.placeholder = JSON.parse(window.localStorage.getItem('setSearch'));
  }

  goShop() {
    window.localStorage.setItem('setSearch', JSON.stringify({
      id: 2,
      placeholder: '请输入商品名称'
    }));
    this.placeholder = JSON.parse(window.localStorage.getItem('setSearch'));
  }

}
