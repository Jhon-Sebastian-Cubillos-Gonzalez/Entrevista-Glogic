import { Component, NgModule, OnInit } from '@angular/core';
import { Registro } from '../app/classes/registro.class';
import { InformacionServiceService } from '../app/services/informacion-service.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [InformacionServiceService]
})
export class AppComponent implements OnInit {
  private registros: any;
  public data: Registro[];
  public edit: boolean = false;
  public info:Registro = new Registro();
  public Busqueda: string = '';
  
  constructor (private infoService: InformacionServiceService) {
    this.infoService.get_info().then(res => {
      debugger
      this.registros = res;
      this.data = this.registros.rows;
    });
  }

  ngOnInit(): void {
    
  }

  editarregistro(reg){
    this.edit = !this.edit;
    this.info = reg;
  }

  eliminarregistro(reg){
    this.registros.rows.splice(this.registros.rows.indexOf(reg),1);
    this.data = this.registros.rows;
    this.infoService.post_info(this.registros);
  }

  Filtardata(){
    if(this.Busqueda.length == 0){
      this.data = this.registros.rows;
    }else{
      this.data = this.data.filter(obj => {        
        let match = new Array();
        Object.keys(obj).forEach(tag => {
          match.push((obj[tag].toLowerCase().includes(this.Busqueda.toLowerCase()))? true: false);
        })
        return match.some(d => d == true)
      })
    }
  }

  Subir_Actualizar_Registro(){
    if(this.edit){
      this.registros.rows[this.registros.rows.indexOf(this.info)] = this.info;
    }else{
      this.registros.rows.push(this.info);
    }
    this.info = new Registro();
    this.data = this.registros.rows;
    this.infoService.post_info(this.registros);
    this.edit = false;
  }
}
