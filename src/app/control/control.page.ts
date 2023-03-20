import { Component, OnInit } from '@angular/core';

import 'firebase/compat/database';
import { RealtimeDatabaseService } from '../services/realtime-database.service';

@Component({
  selector: 'app-control',
  templateUrl: './control.page.html',
  styleUrls: ['./control.page.scss'],
})

export class ControlPage implements OnInit {
  public toggleValue: boolean = false;


  data: any;
  data1 : any;
  data4: any;
 /*  public isChecked: boolean = false; */


constructor(private dataService: RealtimeDatabaseService) { }

handleToggleClick() {
  this.enviardatos();
}

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      this.data = data;
      console.log(this.data)
    });
    this.dataService.leerDatos('/Comedero/ControlTotal').subscribe((data4) => {
      this.data4= data4;
      this.toggleValue = this.data4;
    });
  }
  enviardatos() {
    if (this.data4 == false) {
      const ruta = '/Comedero/ControlTotal';
      const datos = true;
      this.dataService.control(ruta, datos);
      this.data1 = "Ultrasonicos prendidos";
    }else if(this.data4 == true) {
      const ruta = '/Comedero/ControlTotal';
      const datos = false;
      this.dataService.control(ruta, datos);
      this.data1 = "Ultrasonicos apagados";
    }
  }

}
