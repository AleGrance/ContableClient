import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
//import * as XLSX from 'xlsx';
//import * as FileSaver from 'file-saver';
import { ExcelService } from '../../services/excel.service';


@Component({
  selector: 'app-reporte-compra',
  templateUrl: './reporte-compra.component.html',
  styleUrls: ['./reporte-compra.component.css']
})
export class ReporteCompraComponent implements OnInit {
  // El contribuyente encontrado mediante el id que le pasa contribuyente_component, es para obtener los datos y mostrar en pantalla
  public contribuyenteEncontrado: any;
  // Se almacena el ID del contribuyente para enviar al grabar el registro
  public contribuyenteId: any;
  // Para almacenar la lista de todos los proveedores
  public proveedores: any;
  // Listado de las cabecera de compra segun el contribuyente seleccionado
  public cabecerasCompra: any;
  // Excel file
  public fileName = '';
  // Filtro
  public filtros = {
    id_proveedor: 1,
    condicion: "Contado",
    fecha_inicio: "2022-02-11",
    fecha_fin: "2022-02-11"
  };

  constructor(public api: ApiService, private route: ActivatedRoute, private toastr: ToastrService, private excelService: ExcelService) { }

  ngOnInit(): void {
    // Primero se obtiene el ID enviado a travez de la ruta
    const routeParams = this.route.snapshot.paramMap;
    this.contribuyenteId = Number(routeParams.get('id_contribuyente')); //Este parametro se configura en app-routes
    // Luego se busca el registro en la base de dato a travez del API para obtener los datos del contribuyente y mostrar en pantalla
    this.api.get('contribuyente/' + this.contribuyenteId)
      .pipe(map(data => {
        this.contribuyenteEncontrado = data;
        //console.log("El contribuyente es: ", this.contribuyenteEncontrado);
      }))
      .subscribe()

    // Consulta las cabeceras segun el id del contribuyente
    this.api.get('cabecera_compra/contribuyente/' + this.contribuyenteId)
      .pipe(map(data => {
        this.cabecerasCompra = data;
        console.log("Registros de compras: ", this.cabecerasCompra.length);
      }))
      .subscribe()
    // Trae todos los proveedores registrados
    this.api.get('proveedor')
      .pipe(map(data => {
        this.proveedores = data;
      }))
      .subscribe()
  }

  // Export to excel
  exportAsXLSX(): void {
    this.excelService.exportAsExcelFile(this.cabecerasCompra, 'Reporte de compras - ' + this.contribuyenteEncontrado.razon_social_contribuyente, this.contribuyenteEncontrado);
  }

  // Ejecuta el fltro
  filtro(event: any) {
    //console.log(event);

    this.api.post('cabecera_compra/contribuyente/' + this.contribuyenteId, this.filtros)
      .pipe(map(data => {
        this.cabecerasCompra = data;
      }))
      .subscribe()
  }
}
