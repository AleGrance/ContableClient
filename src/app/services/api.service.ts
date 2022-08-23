import { HttpClient } from '@angular/common/http'; //se importa el servicio y se inyecta en la clase como una dependencia a travez del constructor 
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // Local
  //url: string = 'http://localhost:3000';
  // AWS server
  //url: string = 'http://54.163.242.1:3000';
  url: string = 'https://contableag.site';

  // Free APIs
  //url: string = 'https://pokeapi.co/api/v2';
  //url: string = 'https://swapi.dev/api'; // desde el client pasar: people, planets, vehicles, starships
  //url: string = 'https://parallelum.com.br/fipe/api/v1'; // desde el client cambiar "carros" para "motos" ou "caminhoes"
  //url: string = 'https://inshorts.deta.dev/news?category'; // Usar = en lugar de / ... desde el client completar con tecnology o world

  constructor(public http: HttpClient) { }

  get(path: any) {
    return this.http.get(this.url + '/' + path);
  };

  post(path: string, body: any) {
    return this.http.post(this.url + '/' + path, body);
  };

  put(path: string, body: any) {
    return this.http.put(this.url + '/' + path, body);
  };

  delete(path: string) {
    return this.http.delete(this.url + '/' + path);
  };
}
