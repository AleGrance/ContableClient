import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-factura-compra',
  templateUrl: './factura-compra.component.html',
  styleUrls: ['./factura-compra.component.css']
})
export class FacturaCompraComponent implements OnInit {
  // El cliente encontrado mediante el id que le pasa cliente_component
  public clienteEncontrado: any;
  // El listado de contribuyentes
  public contribuyentes: any;
  // El listado de proveedores
  public proveedores: any;
  public proveedorId: any;

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


  constructor(public api: ApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // First get the product id from the current route.
    const routeParams = this.route.snapshot.paramMap;
    const clienteIdFromRoute = Number(routeParams.get('id_cliente'));
    // Find the product that correspond with the id provided in route.
    this.api.get('cliente/' + clienteIdFromRoute)
    .pipe(map(data => {
      this.clienteEncontrado = data;
      console.log("El cliente es: ", this.clienteEncontrado);
    }))
    .subscribe()
    
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
    this.proveedorId = parseInt(id);
    console.log(this.proveedorId);
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

  cargarClienteSeleccionado(value: any) {
    console.log("Datos recibidos de cliente component: ", value);
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
