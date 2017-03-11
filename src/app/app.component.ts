import { Component } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { LoginPage } from '../pages/login/login';
@Component({
  templateUrl: 'app.html',
})
export class MyApp {
  rootPage = LoginPage;

  constructor(platform: Platform, menu: MenuController) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }
}