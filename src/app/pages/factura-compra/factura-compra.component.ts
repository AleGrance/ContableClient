import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-factura-compra',
  templateUrl: './factura-compra.component.html',
  styleUrls: ['./factura-compra.component.css']
})
export class FacturaCompraComponent implements OnInit {

  // El listado de contribuyentes
  public contribuyentes: any;
  // El listado de proveedores
  public proveedores: any;
  public ruc_proveedor: any;
  public timbrado_proveedor: any;

  // El subtotal calculado
  public subtotal = 0;

  // Para este caso no se usa
  /*public invoice = {
    items: [{
      name: 'item',
      description: 'item description',
      qty: 5,
      price: 5.5
    }]
  }*/


  constructor(public api: ApiService) { }

  ngOnInit(): void {
    // Trae datos del api
    this.api.get('contribuyente')
      .pipe(map(data => {
        this.contribuyentes = data;
        //console.log(this.contribuyentes);
      }))
      .subscribe()


    // Trae datos del api
    this.api.get('proveedor')
      .pipe(map(data => {
        this.proveedores = data;
        console.log(this.proveedores);
      }))
      .subscribe()
  }

  // Al seleccionar el proveedor
  onChangeProveedor(id: any) {
    console.log(id);
  }

  // Calcula el subtotal
  onChange() {
    const cantidad = parseInt((document.getElementById("cantidad") as HTMLInputElement).value);
    const precio = parseInt((document.getElementById("precio") as HTMLInputElement).value);

    this.subtotal = cantidad * precio;

    console.log(cantidad, precio);
  }

  // Guardar los cambios
  grabar() {

  }

  // Agregar item // Para este caso no se va usar
  /*add() {
    this.invoice.items.push({
      name: '',
      description: '',
      qty: 1,
      price: 0
    })

    console.log(this.invoice.items);
  }*/

  // Eliminar item
  /*remove(index: any) {
    console.log(index);
    this.invoice.items.splice(index, 1);
    console.log(this.invoice.items);
  }*/

}
