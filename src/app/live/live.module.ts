import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from "@angular/common";

import { LiveComponent } from './live.component';
import { IndexShowDirective } from './directive/index-show.directive';

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
        RouterModule.forChild(router)
    ],
    exports: [
    ],
    declarations: [LiveComponent, IndexShowDirective],
    providers: [],
})
export class LiveModule { }
