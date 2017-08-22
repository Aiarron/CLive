import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarrageScrollComponent } from './barrage-scroll.component';

describe('BarrageScrollComponent', () => {
  let component: BarrageScrollComponent;
  let fixture: ComponentFixture<BarrageScrollComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarrageScrollComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarrageScrollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
