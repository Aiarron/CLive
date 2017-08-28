import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  goCartDetail() {
    console.log(123123);
    this.router.navigate(['/cart/carts-detail']);
  }

}
