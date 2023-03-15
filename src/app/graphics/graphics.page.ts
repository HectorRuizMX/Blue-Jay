import { Component, OnInit } from '@angular/core';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { RealtimeDatabaseService } from '../services/realtime-database.service';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.page.html',
  styleUrls: ['./graphics.page.scss'],
})
export class GraphicsPage implements OnInit {

  data1: any;
  data: any;
  data2: any;

  constructor(private dataService: RealtimeDatabaseService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      this.data = data;
      console.log(this.data);
    });
    this.dataService.leerDatos('Comedero/Almacen').subscribe(data1 => {
      this.data1 = data1;
      console.log(this.data1);
    });
    this.dataService.leerDatos('Comedero/Fotos').subscribe(data2 => {
      this.data2 = data2;
      console.log(this.data2);
    });
  }

}
