import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";

import { LiveComponent } from './live.component';
import { IndexShowDirective } from './directive/index-show.directive';

import { LiveService } from "./service/live.service";

import { NgMathPipesModule } from 'angular-pipes';
import { IndexGotoRoomShowDirective } from './directive/index-goto-room-show.directive';


const router: Routes = [
    {
        path: '',
        redirectTo: 'lives',
        pathMatch: 'full'
    },
    {
        path: 'lives',
        component: LiveComponent
    }
]

@NgModule({
    imports: [
        CommonModule,
        NgMathPipesModule,
        RouterModule.forChild(router)
    ],
    exports: [
    ],
    declarations: [
        LiveComponent,
        IndexShowDirective,
        IndexGotoRoomShowDirective,
    ],
    providers: [
        LiveService
    ],
})
export class LiveModule { }
