import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

import { LiveComponent } from './live.component';
import { IndexShowDirective } from './directive/index-show.directive';

import { LiveService } from "./service/live.service";

import { NgMathPipesModule, NgArrayPipesModule } from 'angular-pipes';
import { IndexGotoRoomShowDirective } from './directive/index-goto-room-show.directive';
import { LiveDetailComponent } from './live-detail/live-detail.component';
import { HotLiveComponent } from './hot-live/hot-live.component';
import { NewLiveComponent } from './new-live/new-live.component';
import { BackLiveComponent } from './back-live/back-live.component';
import { SearchComponent } from './search/search.component';
import { BackLiveDetailComponent } from './back-live/back-live-detail/back-live-detail.component';

import { PaginatorModule } from 'primeng/primeng';
import { LiveRoomComponent } from './live-room/live-room.component';
import { TabsDirective } from './live-room/directive/tabs.directive';
import { RankingTabsDirective } from './live-room/directive/ranking-tabs.directive';
import { ShowRankDirective } from './live-room/directive/show-rank.directive';
import { BarrageSwitchDirective } from './live-room/directive/barrage-switch.directive';
import { IndexChangeLiveDirective } from './directive/index-change-live.directive';
import { MessageComponent } from './live-room/message/message.component';
import { BarrageScrollComponent } from './live-room/barrage-scroll/barrage-scroll.component';

const router: Routes = [
    { path: '', redirectTo: 'lives', pathMatch: 'full' },
    { path: 'lives', component: LiveComponent },
    { path: 'lives/:id', component: LiveComponent },
    { path: 'hot-live', component: HotLiveComponent },
    { path: 'back-live', component: BackLiveComponent },
    { path: 'search/:id', component: SearchComponent },
    { path: 'back-live/:id', component: BackLiveDetailComponent },
    { path: 'live-room/:id/:flag', component: LiveRoomComponent }, // :flag  1、主播开播 0、用户进入
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NgMathPipesModule,
        NgArrayPipesModule,
        PaginatorModule,
        RouterModule.forChild(router)
    ],
    exports: [
    ],
    declarations: [
        LiveComponent,
        IndexShowDirective,
        IndexGotoRoomShowDirective,
        LiveDetailComponent,
        HotLiveComponent,
        NewLiveComponent,
        BackLiveComponent,
        SearchComponent,
        BackLiveDetailComponent,
        LiveRoomComponent,
        TabsDirective,
        RankingTabsDirective,
        ShowRankDirective,
        BarrageSwitchDirective,
        IndexChangeLiveDirective,
        MessageComponent,
        BarrageScrollComponent,
    ],
    providers: [
        LiveService
    ],
    entryComponents: [
        MessageComponent,
        BarrageScrollComponent,
    ]
})
export class LiveModule { }
