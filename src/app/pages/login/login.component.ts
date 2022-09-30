import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  public user = {
    user_name: "",
    user_password: "",
  };

  constructor(private authService: AuthService) { }


  ngOnInit(): void {
  }

  login() {
    this.authService.login(this.user)
  }

}
