import { TestBed, inject } from '@angular/core/testing';

import { BackLiveDetailService } from './back-live-detail.service';

describe('BackLiveDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BackLiveDetailService]
    });
  });

  it('should be created', inject([BackLiveDetailService], (service: BackLiveDetailService) => {
    expect(service).toBeTruthy();
  }));
});
