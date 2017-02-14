import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [Storage]
})
export class LoginPage {
  loading: Loading;
  registerCredentials = {email: '', password: ''};
  private storage: Storage;

  constructor(private nav: NavController, private auth: AuthService, private alertCtrl: AlertController, private loadingCtrl: LoadingController, storage: Storage) {
    this.storage = storage;
    this.storage.get('User').then((User)=>{
      if(User && User.loggedIn){
        setTimeout(() => {
          this.auth.setUser(User);
          this.nav.setRoot(HomePage);
        });
      }
    });
  }

  public createAccount() {
    this.nav.push(RegisterPage);
  }

  public login() {
    this.showLoading()
    this.auth.login(this.registerCredentials).subscribe(allowed => {
      if (allowed) {
        setTimeout(() => {
          this.loading.dismiss();
          let User = {
            loggedIn: true,
            name: 'asd',
            email: 'asd'
          };
          this.storage.set('User', User).then(response => {
            this.auth.setUser(User);
            this.nav.setRoot(HomePage);
          });
        });
      } else {
        this.showError("Access Denied");
      }
    },
    error => {
      this.showError(error);
    });
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }
}