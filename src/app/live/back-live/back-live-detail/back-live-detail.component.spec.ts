import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BackLiveDetailComponent } from './back-live-detail.component';

describe('BackLiveDetailComponent', () => {
  let component: BackLiveDetailComponent;
  let fixture: ComponentFixture<BackLiveDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BackLiveDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BackLiveDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
