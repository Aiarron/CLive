import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackLiveComponent } from './back-live.component';

describe('BackLiveComponent', () => {
  let component: BackLiveComponent;
  let fixture: ComponentFixture<BackLiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackLiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
