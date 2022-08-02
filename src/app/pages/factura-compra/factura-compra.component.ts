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

  constructor(public api: ApiService) { }

  ngOnInit(): void {
    // Trae datos del api
    this.api.get('contribuyente')
      .pipe(map(data => {
        this.contribuyentes = data;
        console.log(this.contribuyentes);
      }))
      .subscribe()
  }

}
