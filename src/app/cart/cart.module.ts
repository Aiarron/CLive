import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from "@angular/common";
import { CartComponent } from './cart.component';
import { CartDetailComponent } from './cart-detail/cart-detail.component';

const router: Routes = [
  { path: '', redirectTo: 'carts', pathMatch: 'full' },
  { path: 'carts', component: CartComponent },
  { path: 'carts-detail', component: CartDetailComponent },
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CommonModule,
    RouterModule.forChild(router)
  ],
  declarations: [
    CartComponent,
    CartDetailComponent
  ]
})
export class CartModule { }
