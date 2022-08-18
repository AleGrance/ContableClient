import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
//import * as XLSX from 'xlsx';
//import * as FileSaver from 'file-saver';
import {ExcelService} from '../../services/excel.service';


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

  // Listado de las cabecera de compra segun el contribuyente seleccionado
  public cabecerasCompra: any;

  // Excel file
  public fileName = '';

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
        //console.log("El contribuyente es: ", this.cabecerasCompra);
      }))
      .subscribe()
  }

  // Export to excel
  exportAsXLSX(): void {
   this.excelService.exportAsExcelFile(this.cabecerasCompra, 'Reporte de compras - ' + this.contribuyenteEncontrado.razon_social_contribuyente, this.contribuyenteEncontrado);
  }

  // Export to excel - NO FUNCIONA BIEN, LE CAMBIA EL FORMATO A LAS FECHAS Y AL NRO DE FACTURA === Date pipe can only be used to format data within the DOM so it won't work for the excel file when download
  /*exportExcel() {
    this.fileName = 'Reporte de compras ' + this.contribuyenteEncontrado.razon_social_contribuyente + '.xlsx';

    // table id is passed over here
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    // generate workbook and add the worksheet
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    // save to file
    XLSX.writeFile(wb, this.fileName);
  }*/

  /*exportExcel() {
    if (this.cabecerasCompra.length > 0) {
      import("xlsx").then(xlsx => {
        const worksheet = xlsx.utils.json_to_sheet(this.cabecerasCompra);
        const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "ExportExcel");
      });
    }
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }*/

}
