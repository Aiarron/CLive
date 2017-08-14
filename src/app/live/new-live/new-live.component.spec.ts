import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewLiveComponent } from './new-live.component';

describe('NewLiveComponent', () => {
  let component: NewLiveComponent;
  let fixture: ComponentFixture<NewLiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewLiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewLiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
