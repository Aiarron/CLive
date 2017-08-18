import { TestBed, inject } from '@angular/core/testing';

import { LiveRoomService } from './live-room.service';

describe('LiveRoomService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LiveRoomService]
    });
  });

  it('should be created', inject([LiveRoomService], (service: LiveRoomService) => {
    expect(service).toBeTruthy();
  }));
});
