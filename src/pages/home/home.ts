import { Component } from '@angular/core';
import { NavController, AlertController, reorderArray } from 'ionic-angular';
import { TareasProvider } from '../../providers/tareas/tareas';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tareas = [];
  habilitarOrden = false;

  constructor(
    public navCtrl: NavController,
    private alertController: AlertController,
    private servicioTareas: TareasProvider
  ) {
    this.tareas = this.servicioTareas.obtenerTareas();
  }
  toogleOrdenar(){
    this.habilitarOrden = !this.habilitarOrden;
  }

  ordenarLista(evento){
    reorderArray(this.tareas,evento);
    // console.log(evento);
  }

  agregarTarea(){
    let alerta = this.alertController.create({
      title: "Agregar tarea",
      inputs: [
        {
          name: "tareaInput",
          placeholder: "Agregar tarea"
        }
      ],
      buttons:[
        {
          text: "Cancelar"
        },
        {
          text: "Agregar",
          handler: datos => {
            // this.tareas.push(datos.tareaInput);
            this.servicioTareas.agregarTarea(datos.tareaInput);
            console.log(this.tareas);
          }
        }
      ]
    });
    alerta.present();
  }

}
