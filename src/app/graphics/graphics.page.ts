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
  lineChart: any;
  data: any;
  title: any;

  private chart: Chart;

  constructor(private dataService: RealtimeDatabaseService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      this.data = data;
      this.doughnutChartMethod();
      // this.lineCharMethod();
      console.log(this.data);
    });
  }

  doughnutChartMethod() {
    if (this.doughnutChart) {
      console.log('algo-|', this.chart)
      this.doughnutChart.destroy(); // Elimina la instancia anterior
    }
    let datos = this.data.historialFotos;
    this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: Object.keys(datos.historico),
        datasets: [{
          label: datos.tittle,
          data: Object.values(datos.historico),
          backgroundColor: [
            'rgba(255, 159, 64, 0.7)',
            'rgba(255, 99, 132, 0.7)',
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)'
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
