import 'rxjs/add/operator/toPromise';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';


/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
   // Global var to save the token after login
   myStorage = window.localStorage;

  constructor(public api: Api) { }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    let seq = this.api.post('auth/login', accountInfo).share();

    seq.subscribe((res: any) => {
      // If the API returned a successful response, mark the user as logged in
      if (res.accessToken) {
        this._loggedIn(res);
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('auth/register', accountInfo).share();
    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this.myStorage.setItem('user', null);
    this.myStorage.setItem('token', null);
    this.myStorage.setItem('tokenType',null);
    // Just for sure
    this.myStorage.clear();
  }

  /**
   * Process a login response to store user data
   */
  _loggedIn(resp) {
    this.myStorage.setItem('user', resp.username);
    this.myStorage.setItem('token', resp.accessToken);
    this.myStorage.setItem('tokenType',resp.tokenType);


  }

  /**
   * Send a GET request to users endpoint with the header
   * authorization token to get all users
   */
  allUsers() {

    let reqOpts = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': this.myStorage.getItem("tokenType")+ ' ' +this.myStorage.getItem("token")
        },
       params: new HttpParams()
      };
    let seq = this.api.get('users', reqOpts).share();
    return seq;
  }

   /**
   * Send a GET request to users endpoint with the header
   * authorization token to get an user in specifict
   */
  findUser(name) {

    let reqOpts = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': this.myStorage.getItem("tokenType")+ ' ' +this.myStorage.getItem("token")
        },
       params: new HttpParams()
      };

    let values = "?q="+name;
    let seq = this.api.get('users', reqOpts, values).share();
    return seq;
  }

  /**
   * Send a DELETE request to users/{id} endpoint with the header
   * authorization token to delete an user
   */
  deleteUser(id) {
    let reqOpts = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': this.myStorage.getItem("tokenType")+ ' ' + this.myStorage.getItem("token")
        },
       params: new HttpParams()
      };
    let seq = this.api.delete('users/'+id, reqOpts).share();
    return seq;
  }



}
