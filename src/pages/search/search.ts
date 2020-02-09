import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { User } from '../../providers';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  currentUsers: any = [];
  result: any = [];
  search : string;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public user: User, 
    public toastCtrl: ToastController ) { }


  ionViewDidEnter(){
  // In the first instance I have to obtain all users from server and save
  // for later
    this.user.allUsers().subscribe((resp) => {
      this.currentUsers = resp;
      this.result= resp;

    }, (err) => {
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: "En estos momentos no podemos procesar ninguna busqueda. Intente mas tarde",
        duration: 5000,
        position: 'top'
      });
      toast.present();
    });
}


  getSearch(ev) {
    // When user write over input search calls this function 
    // Filter of users by username
    this.search = ev.target.value;

    if(this.search == ""){
      // If the input is empty, then I return all users
      this.result = this.currentUsers;

    }else{
      // If not empty, then I iterate over all users to find a similiar user
      this.result = [];
      for(let i = 0; i< this.currentUsers.length ; i ++) {

        let user = this.currentUsers[i];

        if(user.username.startsWith(this.search)) {

          this.result.push(user);
        }
      }
    }

    if(this.result.length == 0){
      this.result = [{"username": "No se encontro ningun usuario", "_id": "0"}];
    }
  }

  // getSearch(ev){
  //   this.search = ev.target.value;
  //   console.log(this.search);
  //   this.user.findUser(this.search).subscribe((resp) => {
  //     this.currentUsers = resp;
  //   }, (err) => {
  //     // Unable to log in
  //     let toast = this.toastCtrl.create({
  //       message: "En estos momentos no podemos procesar ninguna busqueda. Intente mas tarde",
  //       duration: 5000,
  //       position: 'top'
  //     });
  //     toast.present();
  //   });
  // }

}
