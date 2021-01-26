import {LitElement, html, css} from 'lit-element';
import { setLocalStorageItem } from '../utils.js';

export class LoginPage extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        padding: 16px;
      }

      .main {
        width: 300px;
        margin: 0 auto;
        text-align: center;
      }

      .element {
        width: 250px;
        height: 25px;
        margin: 10px;
      }

      .error {
        border: solid 3px red;
        padding: 3px;
      }

      .button {
        height: 35px;
        background-color: lightblue;
      }
    `;
  }

  static get properties() {
    return {
      usersTable: {type: Array},
      error: {type: String},
    };
  }

  constructor() {
    super();
    this.usersTable = [];
    this.error = '';
  }

  render() {
    return html`
      <div class="main">
        <h1>Hello, make login</h1>
        <input id="email" placeholder="Email" class="element"></input>
        <input id="pass" type="password" placeholder="Password" class="element"></input>
        <button @click=${
          this._onLoginClick
        } part="button" class="element button">
          Login
        </button>
        <button @click=${
          this._onRegisterClick
        } part="button" class="element button">
          Register
        </button>
        ${this.error ? html`<p class="error">${this.error}</p>` : html``}
      </div>
    `;
  }

  // check if the email and pass inputs are set
  _checkInputs(email, pass) {
    let error = false;
    if (!email || !pass) {
      this.error = 'You have to fill all the inputs';
      error = true;
    }
    return !error;
  }

  // check if the credentials for the user are Ok and login is well made
  _checkLogin(email, pass) {
    if (
      this.usersTable.get(email) &&
      this.usersTable.get(email).pass === pass
    ) {
      return this.usersTable.get(email);
    } else {
      this.error = 'Access data is not correct. Try again';
      return false;
    }
  }

  // when user clicks on login submit button
  _onLoginClick() {
    this.error = '';
    const email = this.shadowRoot.getElementById('email').value;
    const pass = this.shadowRoot.getElementById('pass').value;
    if (this._checkInputs(email, pass)) {
      const user = this._checkLogin(email, pass);
      // if credentials are ok, the function returns the user information
      // and then the user is redirected to the main page
      if (user) {
        // the last login date of the user is updated because the user just logged in
        const dateModifiedUser = {...user};
        dateModifiedUser.lastLogin = Date.now();
        this.usersTable.set(email, dateModifiedUser);

        // the app updates the users table in the localStorage with the new updated user
        this._setLocalStorage();

        // the app sends and ecent to let the main know the user just logged in
        const event = new CustomEvent('login-ok', {
          detail: {
            'user': user,
          },
          bubbles: true,
          composed: true,
        });
        this.dispatchEvent(event);
      }
    }
  }

  // when user clicks on register button the app sends an event so the user is redirected to that page
  _onRegisterClick() {
    const event = new CustomEvent('redirect', {
      detail: {
        page: 'register',
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  // put the registered users table in the localstorage
  _setLocalStorage() {
    setLocalStorageItem(
      'usersTable',
      JSON.stringify(Array.from(this.usersTable.entries()))
    );
  }
}

window.customElements.define('login-page', LoginPage);
