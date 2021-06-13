import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map } from 'rxjs/operators';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-contribuyente',
  templateUrl: './contribuyente.component.html',
  styleUrls: ['./contribuyente.component.css']
})
export class ContribuyenteComponent implements OnInit {

  public contribuyentes: any;
  public contribuyenteNuevo = {
    razon_social_contribuyente: 'Nombre',
    ruc_contribuyente: '4555888-5',
    timbrado: '12345',
    dir_contribuyente: 'Local',
    tel_contribuyente: '0981222888',
    email_contribuyente: 'con@gmail.com',
  };
  public contribuyenteForm: any;

  constructor(public api: ApiService) { }

  ngOnInit(): void {

    this.contribuyenteForm = new FormGroup({
      razon: new FormControl(this.contribuyenteNuevo.razon_social_contribuyente, [
        Validators.required,
        Validators.minLength(4)
      ]),
      ruc: new FormControl(this.contribuyenteNuevo.ruc_contribuyente, [
        Validators.required,
        Validators.minLength(4)
      ]),
      timbrado: new FormControl(this.contribuyenteNuevo.timbrado, [
        Validators.required,
        Validators.minLength(4)
      ]),
      direccion: new FormControl(this.contribuyenteNuevo.dir_contribuyente, [
        Validators.required,
        Validators.minLength(5)
      ]),
      tel: new FormControl(this.contribuyenteNuevo.tel_contribuyente, [
        Validators.required,
        Validators.minLength(5)
      ]),
      email: new FormControl(this.contribuyenteNuevo.email_contribuyente, [
        Validators.required,
        Validators.minLength(5)
      ])
    });

    // Trae datos del api
    this.api.get('contribuyente')
      .pipe(map(data => {
        this.contribuyentes = data;
        console.log(this.contribuyentes);
      }))
      .subscribe()
  }

  get razon() { return this.contribuyenteForm.get('razon'); }
  get ruc() { return this.contribuyenteForm.get('ruc'); }
  get timbrado() { return this.contribuyenteForm.get('timbrado'); }
  get direccion() { return this.contribuyenteForm.get('direccion'); }
  get tel() { return this.contribuyenteForm.get('tel'); }
  get email() { return this.contribuyenteForm.get('email'); }


  submit() {

    const razon = ((<HTMLInputElement>document.getElementById("razon")).value);
    const ruc = ((<HTMLInputElement>document.getElementById("ruc")).value);
    const timbrado = ((<HTMLInputElement>document.getElementById("timbrado")).value);
    const direccion = ((<HTMLInputElement>document.getElementById("direccion")).value);
    const tel = ((<HTMLInputElement>document.getElementById("tel")).value);
    const email = ((<HTMLInputElement>document.getElementById("email")).value);

    let newContribuyente = {
      razon_social_contribuyente: razon,
      ruc_contribuyente: ruc,
      timbrado: timbrado,
      dir_contribuyente: direccion,
      tel_contribuyente: tel,
      email_contribuyente: email,
    }

    this.api.post('contribuyente', newContribuyente)
      .subscribe(result => {
        this.contribuyentes.push(result);
        console.log('result post: ', result);
      });

    console.log(razon, ruc, timbrado);

  }

  delete(value: any) {
    const id = value.id_contribuyente
    console.log(id);
    this.api.delete('contribuyente/' + id)
      .subscribe(result => {
        console.log('result delete: ', result);
        for (let u of this.contribuyentes) {
          if (u.id_contribuyente === id) {
            this.contribuyentes.splice(this.contribuyentes.indexOf(u), 1);
          }
        }
      });
  }


}
