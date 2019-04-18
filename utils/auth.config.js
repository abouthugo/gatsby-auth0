import auth0 from 'auth0-js'
import { navigate } from 'gatsby'
import {AUTH0_DOMAIN, AUTH0_CALLBACK, AUTH0_CLIENT_ID, AUTH0_DEV} from './auth.vars';

export default class Auth {

  auth0 = new auth0.WebAuth({
    domain: AUTH0_DOMAIN,
    clientID: AUTH0_CLIENT_ID,
    redirectUri: AUTH0_CALLBACK,
    responseType: 'token id_token',
    scope: 'openid profile'
  });

  login = () => {
    this.auth0.authorize();
  }

  logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('user');
    this.auth0.logout({
      returnTo: AUTH0_DEV
    });
  }

  handleAuthentication = () => {
    if(typeof window !== 'undefined'){
      this.auth0.parseHash( (err, authResult) => {
        if(authResult && authResult.accessToken && authResult.idToken){
          this.setSession(authResult);
        }else if(err){
          navigate('/404');
          console.log(err);
        }
      })
    }
  }

  isAuthenticated = () => {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }

  setSession = authResult => {
    const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken)
    localStorage.setItem('id_token', authResult.idToken)
    localStorage.setItem('expires_at', expiresAt)
    this.auth0.client.userInfo(authResult.accessToken, (err, user) => {
      localStorage.setItem('user', JSON.stringify(user));
    })
    navigate('/');
  }

  getUser = () => {
    if(localStorage.getItem('user')){
      return JSON.parse(localStorage.getItem('user'));
    }
  }

  getUserName = () => {
    if(this.getUser()){
      return this.getUser().nickname;
    }
  }

}