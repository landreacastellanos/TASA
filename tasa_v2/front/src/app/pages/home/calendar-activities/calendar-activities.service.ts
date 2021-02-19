import { Injectable } from '@angular/core';
import { DataApiService } from 'src/app/shared/services/data-api.service';
import { Activity } from './calendar-activities.model';
import moment, { Moment } from 'moment';
import { CalendarEvent } from 'calendar-utils';

@Injectable({
  providedIn: 'root'
})
export class CalendarActivitiesService {

  constructor(
    private dataApiService: DataApiService
  ) { }

  getActivities(): Promise<Activity[]> {
    return this.dataApiService.getAll('get_calendar').then((data) => {
      data.date = moment(data.date);
      return data
    });
  }

  getDate(activities: Activity[]): CalendarEvent<Activity>[] {
    const activity = activities.map((data) =>{
      return {
        start: moment(data.date).toDate(),
        end: moment(data.date).toDate(),
        title: `${data.stage_name}/${data.property_name}/${data.land_name}`,
        allDay: true,
        meta: data,
      };
    })
    return activity
  }
}
