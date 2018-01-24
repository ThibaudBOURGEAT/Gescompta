import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ApiService {

    private options: RequestOptions = null;

    private headers = new Headers({'Content-Type': 'application/json; charset=utf-8'});

    constructor(private http: Http){}

    createAuthorizationHeader(): RequestOptions {
      if (!this.options) {
        const headers = new Headers();
        headers.append('Authorization','Bearer ' + this.loadToken());
        this.options = new RequestOptions({headers: headers});
      }
      return this.options;
   }

    authenticate(user) {
      return this.http.post('http://localhost:3000/api/auth/signIn', user, {headers: this.headers})
      .map(res => res.json());
    }

    storeUserData(token){
      localStorage.setItem('token', token);
    }

    getProducts(){
        this.loadToken()
        return this.http.get('http://localhost:3000/api/product/getAll', this.createAuthorizationHeader())
        .map(res => res.json());
    }

    getProduct(id){
        this.loadToken()
        return this.http.get('http://localhost:3000/api/product/getProduct/' + id, this.createAuthorizationHeader())
        .map(res => res.json());
    }

    addProduct(id){
        this.loadToken()
        return this.http.post('http://localhost:3000/api/command/addProduct', {id: id}, this.createAuthorizationHeader())
        .map(res => res.json());
    }

    getCommand(){
        this.loadToken()
        return this.http.get('http://localhost:3000/api/command/getProducts', this.createAuthorizationHeader())
        .map(res => res.json());
    }

    removeProduct(id){
        this.loadToken()
        return this.http.post('http://localhost:3000/api/command/removeProduct', {id: id}, this.createAuthorizationHeader())
        .map(res => res.json());
    }

    logout(){
      localStorage.clear();
    }

    loadToken(){
        return localStorage.getItem('token');
    }

    loggedIn(){
        return tokenNotExpired();
    }

}
