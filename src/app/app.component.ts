import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../providers/auth-service';
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html',
  providers: [Storage]
})
export class MyApp {
  rootPage;

  constructor(platform: Platform, menu: MenuController, auth: AuthService, public storage: Storage) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
      storage.get('User').then((User)=>{
        if(User && User.loggedIn){
          setTimeout(() => {
            auth.setUser(User);
            this.rootPage = HomePage;
          });
        } else {
          this.rootPage = LoginPage;
        }
      });
    });
  }
}