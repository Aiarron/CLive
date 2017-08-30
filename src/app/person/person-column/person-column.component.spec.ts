import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonColumnComponent } from './person-column.component';

describe('PersonColumnComponent', () => {
  let component: PersonColumnComponent;
  let fixture: ComponentFixture<PersonColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
