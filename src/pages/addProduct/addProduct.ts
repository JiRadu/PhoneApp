import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'add-product',
  templateUrl: 'addProduct.html',
  providers: [Storage]
})

export class AddProductPage {
  name = '';
  email = '';
  Products = [{
    nume: '',
    cost: ''
  }];
  authForm = new FormGroup({
       nume: new FormControl(),
       cost: new FormControl()
    });

  constructor(private nav: NavController, private auth: AuthService, public storage: Storage) {

    let info = this.auth.getUserInfo();
    this.name = info.name;
    this.email = info.email;
    this.storage = storage;
    this.storage.get('productList').then((response)=>{
      if(response === null){
        this.Products = [];
      } else {
        this.Products = response;
      }
    });
  }

  public setData(key,value){
    this.storage.set(key,value);
  }

  public getData(){
    this.storage.get('myData').then((data)=>{
      console.log(data);
    });

  }
  public logout() {

    this.auth.logout().subscribe(succ => {
        this.auth.logout();
        this.storage.set('User',{loggedIn: false, name: '', email: ''});
        this.nav.setRoot(LoginPage);
    });
  }

  public deleteProduct(product){
    let storage = this.storage;
     let index = this.Products.indexOf(product);

    storage.get('productList').then((response)=>{

      if (index >-1){
        this.Products.splice(index, 1);
        response.splice(index,1);
      }

      storage.set('productList',response);
    });
  }

  public submitForm(Product){
    let storage = this.storage;

    this.Products.push(Product);
    storage.get('productList').then((response)=>{
      if(response === null){
        response = [];
      }
      response.push(Product);
      storage.set('productList',response);
    });
  }

}
