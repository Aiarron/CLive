import { TestBed, inject } from '@angular/core/testing';

import { liveService } from './live.service';

describe('liveService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [liveService]
    });
  });

  it('should be created', inject([liveService], (service: liveService) => {
    expect(service).toBeTruthy();
  }));
});
