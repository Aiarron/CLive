import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LiveRoomComponent } from './live-room.component';

describe('LiveRoomComponent', () => {
  let component: LiveRoomComponent;
  let fixture: ComponentFixture<LiveRoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LiveRoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LiveRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
