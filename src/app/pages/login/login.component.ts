import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

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

  constructor(private apiService: ApiService, private router: Router) { }


  ngOnInit(): void {
  }

  login(){
    let token: any;
    this.apiService.post('auth', this.user)
      .subscribe(data => {
        console.log(data);
        token = data;
        localStorage.setItem("token", token.token);
        this.router.navigate(['/dashboard']);
      }, error => {
        console.log(error.error);
      })

    //console.log(this.user);
  }

}
