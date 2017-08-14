import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotLiveComponent } from './hot-live.component';

describe('HotLiveComponent', () => {
  let component: HotLiveComponent;
  let fixture: ComponentFixture<HotLiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotLiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
