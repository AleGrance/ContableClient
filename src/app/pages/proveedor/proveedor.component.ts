import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit {

  public proveedores: any;
  public proveedorNuevo = {
    nom_proveedor: 'Nombre',
    ruc_proveedor: 'nombre@gmail.com',
    timbrado_proveedor: '12345',
  };
  public proveedorForm: any;

  constructor(public api: ApiService) { }

  ngOnInit(): void {

    this.proveedorForm = new FormGroup({
      nombre: new FormControl(this.proveedorNuevo.nom_proveedor, [
        Validators.required,
        Validators.minLength(4)
      ]),
      ruc: new FormControl(this.proveedorNuevo.ruc_proveedor, [
        Validators.required,
        Validators.minLength(4)
      ]),
      timbrado: new FormControl(this.proveedorNuevo.timbrado_proveedor, [
        Validators.required,
        Validators.minLength(5)
      ])
    });

    // Trae datos del api
    this.api.get('proveedor')
      .pipe(map(data => {
        this.proveedores = data;
      }))
      .subscribe()
  }

  get nombre() { return this.proveedorForm.get('nombre'); }
  get ruc() { return this.proveedorForm.get('ruc'); }
  get timbrado() { return this.proveedorForm.get('timbrado'); }

  submit() {

    const nombre = ((<HTMLInputElement>document.getElementById("nombre")).value);
    const ruc = ((<HTMLInputElement>document.getElementById("ruc")).value);
    const timbrado = ((<HTMLInputElement>document.getElementById("timbrado")).value);

    let newProveedor = {
      nom_proveedor: nombre,
      ruc_proveedor: ruc,
      timbrado_proveedor: timbrado,
    }

    this.api.post('proveedor', newProveedor)
      .subscribe(result => {
        this.proveedores.push(result);
        console.log('result post: ', result);
      });

    console.log(nombre, ruc, timbrado);

  }

  print(value: any) {
    console.log(value);
  }

  postear() {
    this.api.post('proveedor', this.proveedorForm)
      .subscribe();
  }

  putear() {
    this.api.put('proveedor/8', this.proveedorForm)
      .subscribe();
  }

  delete(value: any) {
    const id = value.id_proveedor
    console.log(id);
    this.api.delete('proveedor/' + id)
      .subscribe(result => {
        console.log('result delete: ', result);
        for (let u of this.proveedores) {
          if (u.id_proveedor === id) {
            this.proveedores.splice(this.proveedores.indexOf(u), 1);
          }
        }
      });
  }

}
