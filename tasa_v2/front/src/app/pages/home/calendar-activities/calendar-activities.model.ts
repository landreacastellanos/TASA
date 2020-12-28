import { addDays, setHours } from 'date-fns';
import moment, { Moment } from 'moment';

export interface Activity {
  title: string;
  id: number;
  date: Moment;
  land: string;
  property: string;
}

export function getRandomDate() {
  const random = Math.floor(Math.random() * 10) -5;
  const activity: Activity = {
    date: moment(addDays(setHours(new Date(), 12 + random), random)),
    id: random,
    title: 'Reccoger semillas en la finca',
    land: 'Puerto Rico',
    property: 'El JuanSanero'
  };
  return {
    start: activity.date.toDate(),
    end: activity.date.toDate(),
    title: `${activity.date.format('LT')} ${activity.title} ${activity.land}`,
    allDay: true,
    meta: activity,
  };
}

export function getRandomListDate() {
  return new Array(50).fill(0).map((item) => getRandomDate());
}
