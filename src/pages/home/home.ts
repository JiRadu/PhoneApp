import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Storage]
})
export class HomePage {
  username = '';
  email = '';
  private storage: Storage;

  constructor(private nav: NavController, private auth: AuthService, storage: Storage) {
    let info = this.auth.getUserInfo();
    this.username = info.name;
    this.email = info.email;
    this.storage = storage;
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
        this.storage.set('User',{loggedIn: false, name: '', email: ''});
        this.nav.setRoot(LoginPage)
    });
  }
}