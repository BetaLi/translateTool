import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DayLifeComponent } from './day-life.component';

describe('DayLifeComponent', () => {
  let component: DayLifeComponent;
  let fixture: ComponentFixture<DayLifeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DayLifeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DayLifeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
