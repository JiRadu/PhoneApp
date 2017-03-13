import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AuthService } from '../providers/auth-service';
import { RegisterPage } from '../pages/register/register';
import { SetLocation } from '../pages/setLocation/setLocation';
import { AddProductPage } from '../pages/addProduct/addProduct';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    SetLocation,
    AddProductPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    RegisterPage,
    SetLocation,
    AddProductPage
  ],
  providers: [Storage, AuthService]
})
export class AppModule {}
