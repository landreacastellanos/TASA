import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { LoadingService } from '../../../../shared/services/loading.service';
import { HistoryService } from '../history.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import moment from 'moment';
import 'moment/locale/es';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements AfterViewInit {
  constructor(
    public dialog: MatDialog,
    private loadingService: LoadingService,
    private droneService: HistoryService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  years: number[] = [];
  selectedYear: number;
  historyData: any = null;
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = [];
  columnTranslations: { [key: string]: string } = {};

  ngAfterViewInit(): void {
    const currentYear = new Date().getFullYear();
    for (let year = 2023; year <= currentYear; year++) {
      this.years.push(year);
    }
  }

  ngOnInit(): void {}

  fetchHistory(year: number): void {
    this.loadingService.setloading(true);
    this.selectedYear = year;
    this.droneService
      .getHistoryYear(year)
      .then((data) => {
        this.historyData = data;
        // this.historyData = {
        //   report: [
        //     {
        //       "batch": "Lote 2",
        //       "batch_id": 329,
        //       "date": "2024-06-13T05:00:00.000Z",
        //       "drones": [
        //         {
        //           "dead": "01:33:00",
        //           "dron": "drone 101",
        //           "ha": 23,
        //           "id": 3,
        //           "live": "05:05:00"
        //         },
        //         {
        //           "dead": "01:33:00",
        //           "dron": "drone 4",
        //           "ha": 23,
        //           "id": 4,
        //           "live": "05:05:00"
        //         },
        //         {
        //           "dead": "01:33:00",
        //           "dron": "Drone 1 test",
        //           "ha": 23,
        //           "id": 1,
        //           "live": "05:05:00"
        //         }
        //       ],
        //       "property": "Finca 1",
        //       "stage": "Quema para siembra",
        //       "stage_id": 3
        //     },
        //     {
        //       "batch": "Lote 3",
        //       "batch_id": 330,
        //       "date": "2024-07-13T05:00:00.000Z",
        //       "drones": [
        //         {
        //           "dead": "02:33:00",
        //           "dron": "drone 102",
        //           "ha": 25,
        //           "id": 5,
        //           "live": "06:05:00"
        //         },
        //         {
        //           "dead": "01:33:00",
        //           "dron": "drone 4",
        //           "ha": 23,
        //           "id": 4,
        //           "live": "05:05:00"
        //         }
        //       ],
        //       "property": "Finca 2",
        //       "stage": "Siembra",
        //       "stage_id": 4
        //     }
        //   ],
        //   total: {},
        // };

        const outputArray = this.historyData.report.map((item) => {
          const transformedItem = {
            batch: item.batch,
            date:  moment(item.date).locale('es').format('DD-MMMM-YYYY'),
            property: item.property,
            stage: item.stage,
          };

          item.drones.forEach((drone) => {
            const droneKeyBase = drone.dron.replace(/\s+/g, '-');
            transformedItem[`${droneKeyBase}-name`] = drone.dron;
            transformedItem[`${droneKeyBase}-dead`] = drone.dead;
            transformedItem[`${droneKeyBase}-ha`] = drone.ha;
            transformedItem[`${droneKeyBase}-live`] = drone.live;
          });

          return transformedItem;
        });

        let keysSet = new Set();
        let droneKeys = new Set();
        this.historyData.report.forEach(item => {
          keysSet.add("property");
          keysSet.add("batch");
          keysSet.add("stage");
          keysSet.add("date");

          item.drones.forEach(drone => {
            const droneKeyBase = drone.dron.replace(/\s+/g, '-');
            droneKeys.add(`${droneKeyBase}-ha`);
            droneKeys.add(`${droneKeyBase}-live`);
            droneKeys.add(`${droneKeyBase}-dead`);
          });
        });

        const keysArray = ["property", "batch", "stage", "date"];
        droneKeys.forEach((droneKey: any) => {
          const baseKey = droneKey.replace(/-(ha|live|dead)$/, '');
          if (!keysArray.includes(`${baseKey}-ha`)) keysArray.push(`${baseKey}-ha`);
          if (!keysArray.includes(`${baseKey}-live`)) keysArray.push(`${baseKey}-live`);
          if (!keysArray.includes(`${baseKey}-dead`)) keysArray.push(`${baseKey}-dead`);
        });
        this.displayedColumns = keysArray;

        this.columnTranslations = {
          property: 'Finca',
          batch: 'Lote',
          stage: 'Segmento',
          date: 'Fecha'
        };

        keysArray.forEach((key: string) => {
          if (key.includes('-ha')) {
            const droneName = key.replace('-ha', '').replace('-', ' ');
            this.columnTranslations[key] = `Ha ${droneName}`;
          } else if (key.includes('-live')) {
            const droneName = key.replace('-live', '').replace('-', ' ');;
            this.columnTranslations[key] = `Horas vivo ${droneName}`;
          } else if (key.includes('-dead')) {
            const droneName = key.replace('-dead', '').replace('-', ' ');;
            this.columnTranslations[key] = `Horas muerto ${droneName}`;
          }
        });

        const totals = {};
        this.displayedColumns.forEach(column => {
          if (column.includes('-ha')) {
            totals[column] = outputArray.reduce((sum, item) => sum + (parseFloat(item[column]) || 0), 0);
          } else if (column.includes('-live') || column.includes('-dead')) {
            totals[column] = this.calculateTotalTime(outputArray.map(item => item[column]));
          } else {
            totals[column] = '';
          }
        });
        totals['property']= 'Total';
        outputArray.push(totals);

        this.dataSource = new MatTableDataSource(outputArray);
      })
      .finally(() => this.loadingService.setloading(false));
  }

  calculateTotalTime(times: string[]): string {
    let totalMinutes = 0;
    times.forEach(time => {
      if(time){
        const [hours, minutes] = time.split(':').map(Number);
        totalMinutes += (hours * 60) + minutes;
      }
    });

    const totalHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    return `${totalHours}:${remainingMinutes.toString().padStart(2, '0')}`;
  }

  downloadHistory(year: number): void {
    this.droneService.downloadHistoryYear(year).then((blob: Blob) => {
      console.log('blob: ', blob)
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `history_${year}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
    }).catch((error) => {
      console.error('Download error:', error);
      // Maneja el error adecuadamente, muestra una notificación al usuario, etc.
    });
  }

  resetView(): void {
    this.historyData = null;
  }
}
