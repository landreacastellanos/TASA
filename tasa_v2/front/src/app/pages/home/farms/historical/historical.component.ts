import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import jsPDF from 'jspdf';
import { report } from 'process';
import { HistoricalDetail } from 'src/app/shared/models/Historic';
import { ConfigurationService } from '../../../../shared/services/configuration.service';
import { LandsService } from '../calendar/lands.service';
import { HistoricalService } from './historical.service';
import moment, { Moment } from 'moment';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss'],
})
export class HistoricalComponent implements OnInit, AfterViewInit {
  @ViewChild('contentToConvert', { static: false })
  contentToConvert: ElementRef;
  historicalId: string;
  formatDates = 'd-MMM-y';

  public segmentsList: string[] = [
    '1. Fecha de Siembra',
    '2. Quema para la siembra (5 a 8 días antes de la siembra)',
    '3. Tratamiento de semillas (0 a 3 días antes de la siembra)',
    '4. Premergencia total (0 a 3 días después de la siembra)',
    '5. Posemergencia temprana (12 a 15 días después de la siembra)',
    '6. Fertilización de siembra # 1 (13 a 16 días después de la siembra)',
    '7. Posemergencia tardía (20 a 25 días después de la siembra)',
    '8. Fertilización # 2 (22 a 25 días después de la siembra)',
    '9. Control de enfermedades (Intermedia 25 a 28 días después de la siembra)',
    '10. Fertilización # 3 (33 a 38 días después de la siembra)',
    '11. Control de enfermedades (Preventiva 40 a 45 días después de la siembra)',
    '12. Fertilización # 4 (48 a 50 días después de la siembra)',
    '13. Control de enfermedades (Embuchamiento 65 a 70 días después de la siembra)',
    '14. Protección de espiga (85 - 90 días después de la siembra)',
    '15. Fecha de cosecha (110 a 120 días después de la siembra)',
  ];

  displayedColumnsProducts = [
    'commercial_name',
    'ing_active',
    'provider',
    'dose_by_ha',
    'total',
  ];
  hectares: number;

  constructor(
    public configService: ConfigurationService,
    public historicalService: HistoricalService,
    private route: ActivatedRoute,
    public landsService: LandsService
  ) {
    console.log(report);

    this.landsService.idProperty = this.route.snapshot.paramMap.get(
      'idProperty'
    );
    this.landsService.idLand = this.route.snapshot.paramMap.get('idLand');
    this.historicalId = this.route.snapshot.paramMap.get('idHistorical');
    this.initApi();
  }
  report: HistoricalDetail;

  ngOnInit(): void {}

  initApi() {
    this.configService.setLoadingPage(true);
    return Promise.all([
      this.getReport(),
      this.landsService.getLandById(
        this.landsService.idProperty,
        this.landsService.idLand
      ),
    ])
      .then(() => {
        this.hectares = this.landsService.lands[
          this.landsService.landsSelectedIds
        ]
          ? this.landsService.lands[this.landsService.landsSelectedIds].batchs
              .hectares_number
          : 0;
      })
      .finally(() => {
        this.configService.setLoadingPage(false);
        setTimeout(() => {
          console.log('PDF');

          this.downloadPDF();
        }, 300);
      });
  }

  ngAfterViewInit() {
    // this.downloadPDF();
  }

  getReport() {
    return this.historicalService
      .getHistoricalById(this.historicalId)
      .then((report) => {
        // inmutable functional based
        report.segments = report.segments.map((item, index) => {
          return {
            ...item,
            title: this.segmentsList[index],
            productsDataSource: new MatTableDataSource(item.products),
          };
        });
        return report;
      })
      .then((report) => {
        this.report = report;
        console.log({ report, landService: this.landsService });
      });
  }

  downloadPDF() {
    let root = document.documentElement;
    let val = 1; // este valor cambia según el tamaño de pantalla que deseas, deben ajustarlo

    root.style.setProperty('--whidth', document.body.scrollWidth * val + 'px');
    root.style.setProperty(
      '--height',
      document.body.scrollWidth * 1.5 * val + 'px'
    );
    const source = this.contentToConvert.nativeElement;
    let pdf = new jsPDF('p', 'px', [
      document.body.scrollWidth * 1.4,
      document.body.scrollWidth,
    ]); // letter size page of PDF
    let specialElementHandlers = {
      // element with id of "bypass" - jQuery style selector
      '.no-print': function (element, renderer) {
        // true = "handled elsewhere, bypass text extraction"
        return true;
      },
    };
    pdf.html(source, {margin: [200,200,200,200],
      callback: (pdf) => {
        pdf.save(`${this.report.title}.pdf`);
      },
    });
  }
}

