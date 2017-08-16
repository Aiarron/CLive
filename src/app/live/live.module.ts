import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";

import { LiveComponent } from './live.component';
import { IndexShowDirective } from './directive/index-show.directive';

import { LiveService } from "./service/live.service";

import { NgMathPipesModule } from 'angular-pipes';
import { IndexGotoRoomShowDirective } from './directive/index-goto-room-show.directive';
import { LiveDetailComponent } from './live-detail/live-detail.component';
import { HotLiveComponent } from './hot-live/hot-live.component';
import { BackLiveComponent } from './back-live/back-live.component';
import { SearchComponent } from './search/search.component';
import { BackLiveDetailComponent } from './back-live/back-live-detail/back-live-detail.component';

import { PaginatorModule } from 'primeng/primeng';
import { LiveRoomComponent } from './live-room/live-room.component';
import { TabsDirective } from './live-room/directive/tabs.directive';
import { RankingTabsDirective } from './live-room/directive/ranking-tabs.directive';
import { ShowRankDirective } from './live-room/directive/show-rank.directive';
import { BarrageSwitchDirective } from './live-room/directive/barrage-switch.directive';

const router: Routes = [
    { path: '', redirectTo: 'lives', pathMatch: 'full' },
    { path: 'lives', component: LiveComponent },
    { path: 'hot-live', component: HotLiveComponent },
    { path: 'back-live', component: BackLiveComponent },
    { path: 'search/:id', component: SearchComponent },
    { path: 'back-live/:id', component: BackLiveDetailComponent },
    { path: 'live-room/:id', component: LiveRoomComponent },
]

@NgModule({
    imports: [
        CommonModule,
        NgMathPipesModule,
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
        BackLiveComponent,
        SearchComponent,
        BackLiveDetailComponent,
        LiveRoomComponent,
        TabsDirective,
        RankingTabsDirective,
        ShowRankDirective,
        BarrageSwitchDirective,
    ],
    providers: [
        LiveService
    ],
})
export class LiveModule { }
