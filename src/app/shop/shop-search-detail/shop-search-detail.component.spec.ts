import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopSearchDetailComponent } from './shop-search-detail.component';

describe('ShopSearchDetailComponent', () => {
  let component: ShopSearchDetailComponent;
  let fixture: ComponentFixture<ShopSearchDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopSearchDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopSearchDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
