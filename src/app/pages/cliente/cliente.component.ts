import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { catchError, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  public clientes: any;

  constructor(public api: ApiService) { }

  ngOnInit(): void {
    this.api.get('tasks')
      .pipe(map(data => {
        this.clientes = data;
        console.log(this.clientes);
      }))
      .subscribe();
  }

}
