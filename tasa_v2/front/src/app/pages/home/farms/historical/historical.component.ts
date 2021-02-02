import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import jsPDF from 'jspdf';
import { HistoricalDetail } from 'src/app/shared/models/Historic';
import { HistoricalService } from "./historical.service";


@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss'],
})
export class HistoricalComponent implements OnInit, AfterViewInit {
  @ViewChild('contentToConvert', { static: false })
  contentToConvert: ElementRef;

  public segmentsList: string[] = [
    '3. Tratamiento de semillas (0 a 3 días antes de siembra)',
    '4. Pre emergencia total (0 a 3 días después de siembra',
    '5. Post emergencia temprana (12 a 15 días antes de siembra)',
    '6. Pre emergencia tardía (18 a 22 días de días después de siembra)',
    '7. Control de enfermedades preventiva o inmediata (25 a 28 días después de siembra)',
    '8. Control de enfermedades preventiva (40 a 45 días después de siembra)',
    '10. Control de enfermedades embuchamiento (65 a 70 días después de siembra)',
    '14. Protección de espiga (85 a 90 días después de siembra)',
    '15. Fecha de cosecha (120 días después de siembra)',
  ];

  constructor( public historicalService: HistoricalService) {
 
  }
  report: HistoricalDetail;

  ngOnInit(): void {
    this.historicalService.getHistoricalById(23).then((report)=>{
      this.report = report;
    })
  }

  ngAfterViewInit() {
    /* this.downloadPDF(); */
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
    pdf.html(source, {
      callback: function (pdf) {
        pdf.save('Prueba pdf.pdf');
      },
    });
  }
}
