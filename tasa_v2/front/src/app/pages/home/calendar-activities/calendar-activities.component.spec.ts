import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarActivitiesComponent } from './calendar-activities.component';

describe('CalendarActivitiesComponent', () => {
  let component: CalendarActivitiesComponent;
  let fixture: ComponentFixture<CalendarActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarActivitiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
