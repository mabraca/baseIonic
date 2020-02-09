import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { User } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // Json for login to server
  account: { username: string, password: string } = {
    username: '',
    password: ''
  };


  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController) {

  
  }

  doLogin() {
    if(this.account.username.length < 3 || this.account.password.length < 3){
      // Unable to login
      let toast = this.toastCtrl.create({
        message: "Debe ingresar un usuario/password correcto. Mínimo de 3 dígitos. ",
        duration: 5000,
        position: 'bottom'
      });
      toast.present();
    }else{
      this.user.login(this.account).subscribe((resp) => {
        // Success Login
        this.navCtrl.setRoot('TabsPage', {}, {
          animate: true,
          direction: 'forward'
        });
      }, (err) => {
        // Unable to log in
        let toast = this.toastCtrl.create({
          message: "Error al iniciar sesion. Datos incorrectos",
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      });

    }
    
  }
}
