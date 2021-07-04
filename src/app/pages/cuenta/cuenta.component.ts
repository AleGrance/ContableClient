import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {

  public cuentas: any;
  public cuentaNueva = {
    nombre_cuenta_madre: 'Nombre',
  };
  public cuentaForm: any;

  constructor(public api: ApiService) { }

  ngOnInit(): void {

    this.cuentaForm = new FormGroup({
      nombre: new FormControl(this.cuentaNueva.nombre_cuenta_madre, [
        Validators.required,
        Validators.minLength(4)
      ]),
    });

    // Trae datos del api
    this.api.get('cuenta_madre')
      .pipe(map(data => {
        this.cuentas = data;
        console.log(this.cuentas);
      }))
      .subscribe()

  }

  get nombre() { return this.cuentaForm.get('nombre'); }

  submit() {

    const nombre = ((<HTMLInputElement>document.getElementById("nombre")).value);

    let newCuenta = {
      nombre_cuenta_madre: nombre
    }

    this.api.post('cuenta_madre', newCuenta)
      .subscribe(result => {
        this.cuentas.push(result);
        console.log('result post: ', result);
      });
  }

}
