import { TestBed, inject } from '@angular/core/testing';

import { ShopSearchDetailService } from './shop-search-detail.service';

describe('ShopSearchDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ShopSearchDetailService]
    });
  });

  it('should be created', inject([ShopSearchDetailService], (service: ShopSearchDetailService) => {
    expect(service).toBeTruthy();
  }));
});
