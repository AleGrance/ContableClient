import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx'; 

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
  public fileName= 'ExcelSheet.xlsx';

  constructor(public api: ApiService, private route: ActivatedRoute, private toastr: ToastrService) { }

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
  exportexcel() {
    console.log('Hola');

    {
      /* table id is passed over here */   
      let element = document.getElementById('excel-table'); 
      const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

      /* save to file */
      XLSX.writeFile(wb, this.fileName);
     
   }
  }

}
