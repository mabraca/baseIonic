import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import { User } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})
export class SignupPage {
  // Json for signup to server
  account: { username: string, password: string } = {
    username: '',
    password: ''
  };

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController) {

  }

  doSignup() {
    // Verify if the username and password have min 3 char.
    if(this.account.username.length < 3 || this.account.password.length < 3){
       let toast = this.toastCtrl.create({
        message: "Debe ingresar un usuario/password correcto. Mínimo de 3 dígitos. ",
        duration: 5000,
        position: 'bottom'
      });
      toast.present();
    }else{
      this.user.signup(this.account).subscribe((resp) => {
        //Success signup
        this.navCtrl.setRoot('WelcomePage', {}, {
          animate: true,
          direction: 'forward'
        });
        let toast = this.toastCtrl.create({
          message: "Registro Exitoso. Puede iniciar sesión con sus datos",
          duration: 5000,
          position: 'bottom'
        });
        toast.present();
      }, (err) => {
        // Unable to sign up
        let toast = this.toastCtrl.create({
          message: "Error al registrar. Intente nuevamente",
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      });
    }
  }
}
