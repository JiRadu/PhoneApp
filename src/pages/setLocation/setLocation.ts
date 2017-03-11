import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { LoginPage } from '../login/login';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'set-location',
  templateUrl: 'setLocation.html',
  providers: [Storage]
})
export class SetLocation {
  name = '';
  email = '';
  private storage: Storage;

  constructor(private nav: NavController, private auth: AuthService, storage: Storage) {
    //TODO:Figure out if we need verification is user is not auth here
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
  public go(){
    this.nav.pop();
  }
}
