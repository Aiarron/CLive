import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";

import { PaginatorModule } from 'primeng/primeng';

import { ShopComponent } from './shop.component';
import { ShopDetailComponent } from './shop-detail/shop-detail.component';
import { ShopSearchDetailComponent } from './shop-search-detail/shop-search-detail.component';

const router: Routes = [
    { path: '', redirectTo: 'shops', pathMatch: 'full' },
    { path: 'shops', component: ShopComponent },
    { path: 'shop-detail/:id', component: ShopDetailComponent },
    { path: 'shop-search-detail/:text/:searchParams', component: ShopSearchDetailComponent },
]

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PaginatorModule,
        RouterModule.forChild(router)
    ],
    exports: [],
    declarations: [
        ShopComponent,
        ShopDetailComponent,
        ShopSearchDetailComponent
    ],
    providers: [],
})
export class ShopModule { }
