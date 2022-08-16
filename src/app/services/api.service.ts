import { HttpClient } from '@angular/common/http'; //se importa el servicio y se inyecta en la clase como una dependencia a travez del constructor 
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //url: string = 'http://localhost:3000';
  // AWS server
  //url: string = 'https://54.163.242.1:3000';
  url: string = 'http://54.163.242.1:3000';
  
  //prueba = 'prueba';

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
