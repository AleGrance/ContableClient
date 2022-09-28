import { Component, OnInit } from '@angular/core';
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

  constructor(private apiService: ApiService) { }


  ngOnInit(): void {
  }

  login(){
    this.apiService.post('auth', this.user)
      .subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error.error);
      })

    //console.log(this.user);
  }

}
