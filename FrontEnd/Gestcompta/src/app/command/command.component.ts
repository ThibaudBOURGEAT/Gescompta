import { Component, OnInit } from '@angular/core';
import {ApiService} from '../services/api.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.css']
})
export class CommandComponent implements OnInit {

    products: Object;
    total: Number = 0;

    constructor(private api: ApiService,
    private router: Router) { }

    ngOnInit() {
        this.showProducts();
    }

    showProducts(){
        this.api.getCommand().subscribe(data=>{
            this.products = data;
            this.products.forEach(product=>{
                this.total = this.total + product.price;
            });
        });
    }

    removeProductToCommand(id){
        this.api.removeProduct(id).subscribe(data=>{
            alert(data.message);
            window.location.reload();
        });
    }

}
