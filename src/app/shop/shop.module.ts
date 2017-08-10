import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { ShopComponent } from './shop.component';

const router: Routes = [
    {
        path: '',
        redirectTo: 'shops',
        pathMatch: 'full'
    },
    {
        path: 'shops',
        component: ShopComponent
    }
]

@NgModule({
    imports: [
        RouterModule.forChild(router)
    ],
    exports: [],
    declarations: [
        ShopComponent
    ],
    providers: [],
})
export class ShopModule { }
