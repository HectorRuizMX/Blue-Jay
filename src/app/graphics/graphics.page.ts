import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import 'firebase/compat/database';
import { RealtimeDatabaseService } from '../services/realtime-database.service';
import { Chart } from 'chart.js/auto';


@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.page.html',
  styleUrls: ['./graphics.page.scss'],
})
export class GraphicsPage implements OnInit {

  @ViewChild('doughnutCanvas') private doughnutCanvas!: ElementRef;
  @ViewChild('lineCanvas') private lineCanvas!: ElementRef;

  doughnutChart: any;
  data1: any;
  data: any;
  data2: any;
  private chart: Chart;

  constructor(private dataService: RealtimeDatabaseService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
    this.dataService.leerDatos('Comedero/Almacen').subscribe(data1 => {
      this.data1 = data1;
      console.log(this.data1);
      this.doughnutChartMethod();
    });
    this.dataService.leerDatos('Comedero/Fotos').subscribe(data2 => {
      this.data2 = data2;
      console.log(this.data2);
    });
    
  }

  doughnutChartMethod() {
    if (this.doughnutChart) {
      console.log('algo-|', this.chart)
      this.doughnutChart.destroy(); // Elimina la instancia anterior
    }
    let datos = this.data.Almacen;
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        labels: Object.keys(datos.Almacen),
        datasets: [{
          label: datos.tittle,
          data: Object.values(datos.Almacen),
          backgroundColor: [
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)'
          ],
          hoverBackgroundColor: [
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384'
          ]
        }]
      }
    });
  }

}
