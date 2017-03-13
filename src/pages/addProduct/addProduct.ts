import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'add-product',
  templateUrl: 'addProduct.html',
  providers: [Storage]
})
export class AddProductPage {
  name = '';
  email = '';
  productCredentials = {};
  Product = {
    nume: '',
    cost: ''
  };
  Products = [this.Product];
  authForm = new FormGroup({
       nume: new FormControl(),
       cost: new FormControl()
    });




  constructor(private nav: NavController, private auth: AuthService, public storage: Storage) {

    //TODO:Figure out if we need verification is user is not auth here
    let info = this.auth.getUserInfo();
    this.name = info.name;
    this.email = info.email;
    this.storage = storage;
    this.storage.get('productList').then((response)=>{
      this.Products = response;
    });
  }
  public testAddProduct(){
  //   let storage = this.storage;
  //   storage.get('productList').then(function(response){
  //     if(response == null){
  //       response = [];
  //     }
  //     response.push({nume:"pizza",cost:3});
  //     console.log(storage);
  //     storage.set('productList',response);
  //     console.log(response);
  //   });
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
    this.Products.splice(this.Products.indexOf(product));
    storage.get('productList').then((response)=>{
      response.splice(response.indexOf(product));
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
