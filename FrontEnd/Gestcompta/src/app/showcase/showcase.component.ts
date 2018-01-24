import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-showcase',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})
export class ShowcaseComponent implements OnInit {

    products: Object;

    constructor(private api: ApiService,
    private router: Router) {
    }

    ngOnInit(){
        this.showProducts()
    }

    showProducts(){
        this.api.getProducts().subscribe(data=>{
            this.products = data;
        });
    }
}
