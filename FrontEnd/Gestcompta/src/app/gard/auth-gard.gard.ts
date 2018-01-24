import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate } from '@angular/router';
import { ApiService } from '../services/api.service';

@Injectable()
export class AuthGardService implements CanActivate{

  constructor(private api: ApiService,
  private router: Router) { }

  canActivate() {
    if(this.api.loggedIn()) {
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }
}
