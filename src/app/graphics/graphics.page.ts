import { Component, OnInit } from '@angular/core';
import 'firebase/compat/database';
import { RealtimeDatabaseService } from '../services/realtime-database.service';

@Component({
  selector: 'app-graphics',
  templateUrl: './graphics.page.html',
  styleUrls: ['./graphics.page.scss'],
})


export class GraphicsPage implements OnInit {
  public toggleValue: boolean = false;


  registro: any;
  registro1: any;
  registro2: any;
  registro3: any;



constructor(private DBSERVICE: RealtimeDatabaseService) { }

/* guardamos en variables los datos de la DB  */
  ngOnInit() {
    this.DBSERVICE.getData().subscribe(registro => {
      this.registro = registro;
      console.log(this.registro)
    });
    this.DBSERVICE.DB('/Comedero/Almacen').subscribe((registro1) => {
      this.registro1 = registro1;
    });
    this.DBSERVICE.DB('/Comedero/Recipiente').subscribe((registro2) => {
      this.registro2 = registro2;
    });
    this.DBSERVICE.DB('/Comedero/Fotos').subscribe((registro3) => {
      this.registro3 = registro3;
    });
  }
}