import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-factura-venta',
  templateUrl: './factura-venta.component.html',
  styleUrls: ['./factura-venta.component.css']
})
export class FacturaVentaComponent implements OnInit {
  // El contribuyente encontrado mediante el id que le pasa contribuyente_component, es para obtener los datos y mostrar en pantalla
  public contribuyenteEncontrado: any;
  // Se almacena el ID del contribuyente para enviar al grabar el registro
  public contribuyenteId: any;

  // El listado de clientes
  public clientes: any;
  public clienteId: any;

  // La condicion en una variable
  public condicion: any;

  // El subtotal calculado
  public subtotal = 0;

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

      // Trae datos del api
    this.api.get('cliente')
    .pipe(map(data => {
      this.clientes = data;
      //console.log(this.proveedores);
    }))
    .subscribe()
  }

  // Al seleccionar el cliente se guarda el ID en una variable para enviar a la base de datos
  onChangeCliente(id: any) {
    this.clienteId = parseInt(id);
  }

  // Al seleccionar la condicion
  onChangeCondicion(value: any) {
    this.condicion = value;
    console.log(this.condicion);
  }

  // Calcula el subtotal al modificar el monto o el precio
  onChangeCantidad() {
    const cantidad = parseInt((document.getElementById("cantidad") as HTMLInputElement).value);
    const precio = parseInt((document.getElementById("precio") as HTMLInputElement).value);

    this.subtotal = cantidad * precio;
  }

  // Guardar los cambios
  grabar() {
    // Datos para la cabecera
    const nrofactura = (document.getElementById("nro") as HTMLInputElement).value;
    const fecha = (document.getElementById("fecha") as HTMLInputElement).value;

    //Datos para el detalle
    const descripcion = (document.getElementById("descripcion") as HTMLInputElement).value;
    const cantidad = (document.getElementById("cantidad") as HTMLInputElement).value;
    const precio = (document.getElementById("precio") as HTMLInputElement).value;

    // Objeto cabecera
    const cabeceraVenta = {
      nro_factura_venta: nrofactura,
      condicion_venta_venta: this.condicion,
      fecha_factura_venta: fecha,
      total_venta: this.subtotal,
      // Campos relacionados
      ContribuyenteIdContribuyente: this.contribuyenteId,
      ClienteIdCliente: this.clienteId,
    }

    //Objeto detalle
    const detalleVenta = {
      descripcion_detalle_venta: descripcion,
      cant_item_detalle_venta: cantidad,
      subtotal_detalle_venta: this.subtotal,
      precio_detalle_venta: precio,
      nro_factura_venta: nrofactura
    }

    console.log(cabeceraVenta);
    console.log(detalleVenta);


    this.api.post('cabecera_venta', cabeceraVenta)
      .subscribe(result => {
        // Se actualiza la vista html si el result retorna un objeto, significa que inserto en la bd. De lo contrario muestra el mensaje de error que retorna el server
        if (typeof result === 'object') {
          this.toastr.success('Factura de venta registrada');
          // Solo si cumple la condicion se registra el detalle
          this.api.post('detalle_venta', detalleVenta)
            .subscribe(result => {
            }, error => {
              console.log('Si hay error en el post: ', error);
            });

          // Llama a la funcion onInit que resetea el formulario
          this.ngOnInit();
        } else {
          console.log('result post: ', result);
          this.toastr.warning(result);
        }
      }, error => {
        console.log('Si hay error en el post: ', error);
      });



  }

}