import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService, private router: Router) { }

  login(user: any) {
    let token: any;
    this.apiService.post('auth', user)
      .subscribe(data => {
        token = data;
        localStorage.setItem("token", token.token);
        this.router.navigate(['/dashboard']);
      }, error => {
        console.log(error.error);
      })
  }

  isLoggedIn() { return !!localStorage.getItem('token') };
}
