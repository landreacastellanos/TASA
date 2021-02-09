import { TestBed } from '@angular/core/testing';

import { CalendarActivitiesService } from './calendar-activities.service';

describe('CalendarActivitiesService', () => {
  let service: CalendarActivitiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarActivitiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
