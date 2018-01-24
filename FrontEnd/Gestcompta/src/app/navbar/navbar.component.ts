import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor(private api: ApiService,
    private router: Router) { }

    ngOnInit() {
        }

    onLogoutClick(){
        this.api.logout();
        alert('Vous êtes déconnecté !');
        this.router.navigate(['login']);
        return false;
    }

}
