/**
 * @license
 * Copyright (c) 2019 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at
 * http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at
 * http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at
 * http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at
 * http://polymer.github.io/PATENTS.txt
 */

import {LitElement, html, css} from 'lit-element';

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class RegisterPage extends LitElement {
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
      user: {type: Object},
      usersTable: {type: Map},
      error: {type: String},
    };
  }

  constructor() {
    super();
    this.usersTable = new Map();
    this.error = '';
  }

  render() {
    return html`

      <div class="main">
        <h1>Hello, you can register</h1>

        <input id="name" placeholder="Name" class="element"></input> 
        <input id="email" placeholder="Email" class="element"></input>
        <input id="pass1" type="password" placeholder="Password" class="element"></input>
        <input id="pass2" type="password" placeholder="Password again" class="element"></input>
        <button @click=${
          this._onRegisterClick
        } part="button" class="element button">
          Register
        </button>
        <button @click=${
          this._onLoginClick
        } part="button" class="element button">
          I have an account, go to login
        </button>
        ${this.error ? html`<p class="error">${this.error}</p>` : html``}
      </div>
    `;
  }

  // check if the email, name and pass inputs are set
  _checkInputs(email, name, pass1, pass2) {
    let error = false;
    this.error = '';
    if (!email || !name || !pass1 || !pass2) {
      this.error = 'You have to fill all the inputs';
      error = true;
    }
    // check if the 2 pass inputs have the same information
    else if (pass1 !== pass2) {
      this.error = 'The passwords are not the same';
      error = true;
    }

    // check if the email is already registered
    else if (this.usersTable.has(email)) {
      this.error = 'This email is already registered';
      error = true;
    }
    return !error;
  }

  // when user clicks on register submit button
  _onRegisterClick() {
    const email = this.shadowRoot.getElementById('email').value;
    const name = this.shadowRoot.getElementById('name').value;
    const pass1 = this.shadowRoot.getElementById('pass1').value;
    const pass2 = this.shadowRoot.getElementById('pass2').value;

    // check the inputs the user has filled
    if (this._checkInputs(email, name, pass1, pass2)) {
      // sends an event to register the user and store it in the users table
      const event = new CustomEvent('register-ok', {
        detail: {
          'user': new Map().set(email, {name: name, pass: pass1, lastLogin: -1}),
        },
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    }
  }

  // when user clicks on login button the app sends an event so the user is redirected to that page
  _onLoginClick() {
    const event = new CustomEvent('redirect', {
      detail: {
        page: 'login',
      },
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}

window.customElements.define('register-page', RegisterPage);
