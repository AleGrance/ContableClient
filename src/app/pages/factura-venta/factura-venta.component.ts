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

  // El total calculado
  public totalComprobante = 0;
  public totalIva = 0;
  public gravado10 = 0;
  public iva10 = 0;
  public gravado5 = 0;
  public iva5 = 0;
  public exento = 0;

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

  // Al escribir el numero de factura
  addHyphen(event: any) {
    let elemento = (document.getElementById(event.target.id) as HTMLInputElement).value;
  
    if (event.key != 'Backspace' && (elemento.length === 3 || elemento.length === 7)) {
      (document.getElementById(event.target.id) as HTMLInputElement).value += '-';
    }
  }

  // Al seleccionar la condicion
  onChangeCondicion(value: any) {
    this.condicion = value;
    console.log(this.condicion);
  }

  // Se calcula el IVA 10%
  onChange10() {
    this.gravado10 = parseInt((document.getElementById("gravado_10") as HTMLInputElement).value);
    this.iva10 = Math.round((this.gravado10 / 11) * 1e0) / 1e0;;

    // Se calcula el total comprobante y el total IVA
    this.totalComprobante = this.gravado10 + this.gravado5 + this.exento;
    this.totalIva = this.iva10 + this.iva5;
  }

  // Se calcula el IVA 5%
  onChange5() {
    this.gravado5 = parseInt((document.getElementById("gravado_5") as HTMLInputElement).value);
    this.iva5 = Math.round((this.gravado5 / 22) * 1e0) / 1e0;;

    // Se calcula el total comprobante y el total IVA
    this.totalComprobante = this.gravado10 + this.gravado5 + this.exento;
    this.totalIva = this.iva10 + this.iva5;
  }

  onChangeExento() {
    this.exento = parseInt((document.getElementById("exento") as HTMLInputElement).value);
    this.totalComprobante = this.gravado10 + this.gravado5 + this.exento;
  }

  // Guardar los cambios
  grabar() {
    // Datos para la cabecera
    const nrofactura = (document.getElementById("nro") as HTMLInputElement).value;
    const fecha = (document.getElementById("fecha") as HTMLInputElement).value;
    this.exento = parseInt((document.getElementById("exento") as HTMLInputElement).value);

    //Datos para el detalle
    const descripcion = (document.getElementById("descripcion") as HTMLInputElement).value;
    //const cantidad = (document.getElementById("cantidad") as HTMLInputElement).value;
    //const precio = (document.getElementById("precio") as HTMLInputElement).value;

    // Objeto cabecera
    const cabeceraVenta = {
      nro_factura_venta: nrofactura,
      condicion_venta_venta: this.condicion,
      fecha_factura_venta: fecha,
      total_venta: this.totalComprobante,
      monto_gravado_10: this.gravado10,
      iva_10: this.iva10,
      monto_gravado_5: this.gravado5,
      iva_5: this.iva5,
      exento: this.exento,
      // Campos relacionados
      ContribuyenteIdContribuyente: this.contribuyenteId,
      ClienteIdCliente: this.clienteId,
    }

    //Objeto detalle
    const detalleVenta = {
      descripcion_detalle_venta: descripcion,
      cant_item_detalle_venta: 1,
      subtotal_detalle_venta: this.totalComprobante,
      precio_detalle_venta: this.totalComprobante,
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
