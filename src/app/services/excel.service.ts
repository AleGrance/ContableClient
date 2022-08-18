import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import * as moments from 'moment';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  mappedJson: any;

  public exportAsExcelFile(json: any[], excelFileName: string, contribuyenteData: any): void {
    /****************
    * Let's make some changes in our data
    */
    this.mappedJson = json.map(item => {
      return {
        "RUC del Informante": contribuyenteData.ruc_contribuyente,
        Ename: item.total_compra,
        EDate: item.fecha_factura_compra ? moments(item.fecha_factura_compra).format('DD-MM-YYYY') : 'N/A'
      }
    })

    /********************
    * We passed in our mappedJson after customizing it
    */
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.mappedJson);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
    /***********
    *YOUR EXCEL FILE'S NAME
    */
    FileSaver.saveAs(data, fileName + moments(Date.now()).format('DD_MM_YYYY') + EXCEL_EXTENSION);
  }

}
