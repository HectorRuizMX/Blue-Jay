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
  public toggleValue: boolean = false;


  data: any;
  data1: any;
  data2: any;
  data3: any;
 /*  public isChecked: boolean = false; */


constructor(private dataService: RealtimeDatabaseService) { }


  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      this.data = data;
      console.log(this.data)
    });
    this.dataService.leerDatos('/Comedero/Almacen').subscribe((data1) => {
      this.data1 = data1;
    });
    this.dataService.leerDatos('/Comedero/Recipiente').subscribe((data2) => {
      this.data2 = data2;
    });
    this.dataService.leerDatos('/Comedero/Fotos').subscribe((data3) => {
      this.data3 = data3;
    });
  }
}