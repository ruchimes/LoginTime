import { LitElement, html, css } from 'lit-element';
import { getLocalStorageItem, setLocalStorageItem } from './utils.js';
import './pages/register-page.js';
import './pages/login-page.js';
import './pages/main-page.js';

export class LoginTime extends LitElement {
  static get styles() {
    return css``;
  }

  static get properties() {
    return {
      usersTable: {type: Map},
      showingPage: {type: String},
      user: {type: Object},
    };
  }

  constructor() {
    super();
    this.usersTable = new Map();

    // get the registered users table from the localstorage
    if (getLocalStorageItem('usersTable')) {
      this.usersTable = new Map(JSON.parse(getLocalStorageItem('usersTable')));
    }
    // if there is no registered users table in the localstorage, the app sets it
    else {
      this._setLocalStorage();
    }
    this._redirect('login');

    // listeners to the events the pages send
    this.addEventListener('redirect', this._redirectEvent);
    this.addEventListener('register-ok', this._registerOk);
    this.addEventListener('login-ok', this._loginOk);
    this.addEventListener('log-out', this._logOut);
  }

  render() {
    return html`
      ${this.showingPage === 'register'
        ? html`<register-page .usersTable=${this.usersTable}></register-page>`
        : html``}
      ${this.showingPage === 'login'
        ? html`<login-page .usersTable=${this.usersTable}></login-page>`
        : html``}
      ${this.showingPage === 'main'
        ? html`<main-page .user=${this.user}></main-page>`
        : html``}
    `;
  }

  // user is redirected to main page
  _loginOk(e) {
    this.user = e.detail.user;
    this._redirect('main');
  }

  // user is redirected to login page
  _logOut() {
    this.user = {};
    this._redirect('login');
  }

  _redirectEvent(e) {
    this._redirect(e.detail.page);
  }

  // change the page the users is right now
  _redirect(page) {
    this.showingPage = page;
  }

  // put the new user registered in the register table
  _registerOk(e) {
    this.usersTable = new Map([...this.usersTable, ...e.detail.user]);
    this._setLocalStorage();
    this._redirect('login');
  }

  // put the registered users table in the localstorage
  _setLocalStorage() {
    setLocalStorageItem(
      'usersTable',
      JSON.stringify(Array.from(this.usersTable.entries())));
  }
}
