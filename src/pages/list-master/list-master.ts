import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, ToastController, AlertController  } from 'ionic-angular';
import { User } from '../../providers';
import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentUsers: any;

  constructor(public navCtrl: NavController, 
    public modalCtrl: ModalController, 
    public user: User, 
    public toastCtrl: ToastController,
    private alertCtrl: AlertController,) {
  }

  /**
   * The view loaded, let's query our users for the list
   */
  ionViewDidLoad() {
    this.user.allUsers().subscribe((resp) => {
      this.currentUsers = resp;

    }, (err) => {
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: "En estos momentos no podemos procesar los usuarios. Intente mas tarde",
        duration: 5000,
        position: 'top'
      });
      toast.present();
    });
  }


  /**
   * Delete an user from the list of users.
   */
  deleteUser(user) {
    this.user.deleteUser(user).subscribe((resp) => {
      this.user.allUsers().subscribe((resp) => {this.currentUsers = resp;}, (err) => {});
      let toast = this.toastCtrl.create({
        message: "Usuario eliminado exitosamente",
        duration: 3000,
        position: 'top'
      });
      toast.present();



    }, (err) => {
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: "Error al eliminar usuario. Intente nuevamente",
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
  

   /**
   * Modal to confirm delete an user
   */
  deleteAlert(user) {
    let alert = this.alertCtrl.create(
      {
        title: `Está a punto de eliminar el usuario ${user.username}`,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            cssClass: 'cancelButton',
            handler: data => {
            }
          },
          {
            text: 'Aceptar',
            cssClass: 'okButton',
            handler: data => {
              this.deleteUser(user._id);

            }
          }
        ]
      }
    );

    alert.present();
  }

}
