import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams, AlertController, App } from 'ionic-angular';
import { User } from '../../providers';
import { Settings } from '../../providers';

/**
 * The Settings page is a simple form that syncs with a Settings provider
 * to enable the user to clogout the app.
 *
 */
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  profileSettings = {
    page: 'profile',
    pageTitleKey: 'SETTINGS_PAGE_PROFILE'
  };

  pageTitle: string;

  constructor(public navCtrl: NavController,
    public settings: Settings,
    public navParams: NavParams,
    public translate: TranslateService,
    public user: User,
    private alertCtrl: AlertController,
    public appCtrl: App) {
  }


  ionViewWillEnter() {
    // Title page
    this.pageTitle = "Ajustes";
  }

  logout(){
    // Do logout. Clear data and go to Welcome page
    this.user.logout();
    this.appCtrl.getRootNav().setRoot('WelcomePage', {}, {
        animate: true,
        direction: 'forward'
      });
    this.navCtrl.popToRoot();
  }

   /**
   * Modal to confirm logout
   */
  logoutAlert() {
    let alert = this.alertCtrl.create(
      {
        title: `¿Estas seguro de cerrar sesión?`,
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
              this.logout();

            }
          }
        ]
      }
    );

    alert.present();
  }
}
