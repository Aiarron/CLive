import { TestBed, inject } from '@angular/core/testing';

import { ShopDetailService } from './shop-detail.service';

describe('ShopDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopDetailService]
    });
  });

  it('should be created', inject([ShopDetailService], (service: ShopDetailService) => {
    expect(service).toBeTruthy();
  }));
});
