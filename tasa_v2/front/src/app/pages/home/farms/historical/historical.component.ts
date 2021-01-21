import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-historical',
  templateUrl: './historical.component.html',
  styleUrls: ['./historical.component.scss']
})
export class HistoricalComponent implements OnInit, AfterViewInit {
  @ViewChild('contentToConvert', { static: false }) contentToConvert: ElementRef;

  constructor() { }

  ngOnInit(): void {
    
  }

  ngAfterViewInit() {
    this.downloadPDF();
  }

  downloadPDF() {
    let root = document.documentElement;
    let val = 1; // este valor cambia según el tamaño de pantalla que deseas, deben ajustarlo

    root.style.setProperty('--whidth', document.body.scrollWidth * val + "px");
    root.style.setProperty('--height', document.body.scrollWidth * 1.5 * val + "px");
    const source = this.contentToConvert.nativeElement
    let pdf = new jsPDF('p', 'px', [document.body.scrollWidth * 1.4, document.body.scrollWidth]); // letter size page of PDF
    let specialElementHandlers = {
      // element with id of "bypass" - jQuery style selector
      '.no-print': function (element, renderer) {
        // true = "handled elsewhere, bypass text extraction"
        return true
      }
    };
    pdf.html(
      source,
      {
        callback: function (pdf) {
          pdf.save('Prueba pdf.pdf');
        }
      }
    );
  }

}
