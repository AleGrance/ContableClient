import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { catchError, map, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  public clientes: any;
  public clienteNuevo = {
    razon_social_cliente: 'Nombre',
    ruc_cliente: '12345',
  };
  public clienteForm: any;

  public clienteEditar = {
    razon_social_cliente: '',
    ruc_cliente: '',
  };
  public clienteEditarForm: any;

  constructor(public api: ApiService, private toastr: ToastrService) { }

  ngOnInit(): void {
    
    this.clienteForm = new FormGroup({
      razon: new FormControl(this.clienteNuevo.razon_social_cliente, [
        Validators.required,
        Validators.minLength(4)
      ]),
      ruc: new FormControl(this.clienteNuevo.ruc_cliente, [
        Validators.required,
        Validators.minLength(4)
      ])
    });

    this.clienteEditarForm = new FormGroup({
      razon: new FormControl(this.clienteEditar.razon_social_cliente, [
        Validators.required,
        Validators.minLength(4)
      ]),
      ruc: new FormControl(this.clienteEditar.ruc_cliente, [
        Validators.required,
        Validators.minLength(4)
      ])
    });

    // Trae datos del api
    this.api.get('cliente')
      .pipe(map(data => {
        this.clientes = data;
        console.log(this.clientes);
      }))
      .subscribe()

  }

  get razon() { return this.clienteForm.get('razon'); }
  get ruc() { return this.clienteForm.get('ruc'); }


  submit() {

    const razon = ((<HTMLInputElement>document.getElementById("razon")).value);
    const ruc = ((<HTMLInputElement>document.getElementById("ruc")).value);

    let newCliente = {
      razon_social_cliente: razon,
      ruc_cliente: ruc,
    }

    this.api.post('cliente', newCliente)
      .subscribe(result => {
        // Se actualiza la vista html si el result retorna un objeto, significa que inserto en la bd. De lo contrario muestra el mensaje de error que retorna el server
        if (typeof result === 'object') {
          this.toastr.success('Cliente registrado');
          // Llama a la funcion onInit que resetea el formulario
          this.ngOnInit();
        } else {
          console.log('result post: ', result);
          this.toastr.warning(result);
        }
      });
  }

  submitEdit() {

  }

  showEditModal(value: any) {

  }

  delete(value: any) {
    const id = value.id_cliente
    console.log(id);
    this.api.delete('cliente/' + id)
      .subscribe(result => {
        console.log('result delete: ', result);
        for (let u of this.clientes) {
          if (u.id_cliente === id) {
            this.clientes.splice(this.clientes.indexOf(u), 1);
          }
        }
      });
  }

}
