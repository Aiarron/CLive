import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

const router: Routes = [
    { path: '', redirectTo: 'live', pathMatch: 'full' },
    { path: 'live', loadChildren: './live/live.module#LiveModule' },
    { path: 'shop', loadChildren: './shop/shop.module#ShopModule' },
    { path: 'cart', loadChildren: './cart/cart.module#CartModule' },
    { path: 'person', loadChildren: './person/person.module#PersonModule' },
    { path: '**', loadChildren: './live/live.module#LiveModule' }
]

@NgModule({
    imports: [
        RouterModule.forRoot(router, { useHash: true })
    ],
    exports: [
        RouterModule
    ],
    providers: [],
})
export class RoutingModule { }
