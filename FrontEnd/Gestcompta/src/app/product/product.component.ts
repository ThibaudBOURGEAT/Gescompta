import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

    product: Object;

    constructor(private api: ApiService,
    private router: Router,
    private route: ActivatedRoute) {
            this.showProduct();
        }

  ngOnInit() {

  }

  showProduct(){
      const id = this.route.snapshot.params.id;
         this.api.getProduct(id).subscribe(data =>{
             this.product = data;
         });
  }

  addProductToCommand(){
      const id = this.route.snapshot.params.id;
         this.api.addProduct(id).subscribe(data =>{
             alert(data.message);
         });
  }
}
