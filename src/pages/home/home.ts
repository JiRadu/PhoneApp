import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
import { SetLocation } from '../setLocation/setLocation';
import { AddProductPage } from '../addProduct/addProduct';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Storage]
})
export class HomePage {
  name = '';
  email = '';
  private storage: Storage;

  constructor(private nav: NavController, private auth: AuthService, storage: Storage) {
    let info = this.auth.getUserInfo();
    this.name = info.name;
    this.email = info.email;
    this.storage = storage;
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
        this.auth.logout();
        this.storage.set('User',{loggedIn: false, name: '', email: ''});
        this.nav.setRoot(LoginPage);
    });
  }
  public setLocation(){
    this.nav.push(SetLocation);
  }
  public addProduct(){
    this.nav.push(AddProductPage);
  }
}
