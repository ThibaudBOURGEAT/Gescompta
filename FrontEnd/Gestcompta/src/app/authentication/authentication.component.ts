import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

    login: String;
    password: String;

    constructor(private api: ApiService,
    private router: Router) { }

    ngOnInit() {
    }

    loginSubmit(){
          const user = {
            password: this.password,
            login: this.login
          };

          this.api.authenticate(user).subscribe(data => {
            if (data.success) {
              this.api.storeUserData(data.token);
              alert(data.message);
              this.router.navigate(['showcase']);
            } else {
              alert(data.message);
              this.router.navigate(['login']);
            }
        });
    }
}
