import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import 'firebase/compat/database';
import { RealtimeDatabaseService } from '../services/realtime-database.service';



@Component({
  selector: 'app-control',
  templateUrl: './control.page.html',
  styleUrls: ['./control.page.scss'],
})

export class ControlPage implements OnInit {
  public UDT: boolean = false;


  registros: any;
  registros1 : any;
  registros2: any;



constructor(private DBSERVICE: RealtimeDatabaseService, private  alertController: AlertController) { }

btn() {
  this.boton();
  this.btn1();
}
  /* Guardamos en la variable el dato de la base de datos */
  ngOnInit() {
    this.DBSERVICE.getData().subscribe(registros => {
      this.registros = registros;
      console.log(this.registros)
    });
    this.DBSERVICE.DB('/Comedero/ControlTotal').subscribe((registros2) => {
      this.registros2= registros2;
      this.UDT = this.registros2;
    });
  }
  /* Boton para apgar y prender el ultrasonico */
  boton() {
    if (this.registros2 == false) {
      const ruta = '/Comedero/ControlTotal';
      const datos = true;
      this.DBSERVICE.control(ruta, datos);
      this.registros1 = "Ultrasonicos prendidos";
    }else if(this.registros2 == true) {
      const ruta = '/Comedero/ControlTotal';
      const datos = false;
      this.DBSERVICE.control(ruta, datos);
      this.registros1 = "Ultrasonicos apagados";
    }
  }
    async btn1() {
      if (this.registros2){
        const alert = await this.alertController.create({
          header: 'Alerta',
          subHeader: 'Ultrasonicos',
          message: 'Esta Apagado',
          buttons: ['OK'],
        })
        await alert.present();
      };
    }
  }