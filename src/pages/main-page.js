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
export class MainPage extends LitElement {
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

      .button {
        height: 35px;
        background-color: lightblue;
      }
    `;
  }

  static get properties() {
    return {
      user: {type: Object},
      timeLastLogin: {type: Object},
      intervalId: {type: Object},
    };
  }

  constructor() {
    super();
    this.user = {};
    this.timeLastLogin = {};
    this.intervalId = 0;
  }

  connectedCallback() {
    super.connectedCallback();
    if (!this.user) {
      this._onLogoutClick();
    }

    // if this is the user first login after registration I set the time to the actual time
    if (this.user.lastLogin === -1) {
      this.user.lastLogin = Date.now();
    }

    // first time update before starting the loop
    this._calculateTime();

    // starts the loop that updates the time from last login each second
    this._calculateTimeLoop();
  }

  render() {
    return html`
      <div class="main">
        <h1>Hello, ${this.user.name}</h1>
        <h4>The last time you accessed was:</h4>
        <h1>${this.timeLastLogin.days} days</h1>
        <h1>${this.timeLastLogin.hours} hours</h1>
        <h1>${this.timeLastLogin.minutes} minutes</h1>
        <h1>${this.timeLastLogin.seconds} seconds</h1>
        <button
          @click=${this._onLogoutClick}
          part="button"
          class="element button"
        >
          Log Out
        </button>
      </div>
    `;
  }

  // when user clicks on log out button the app sends an event so the user is redirected to login page
  _onLogoutClick() {
    clearInterval(this.intervalId);
    const event = new CustomEvent('log-out', {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  _calculateTime() {
    const {lastLogin} = this.user;
    const now = Date.now();

    // difference between the user last login and the actual time
    let difference = now - lastLogin;

    // calculate the days, hours, minutes and seconds from the difference
    const days = Math.floor(difference / 1000 / 60 / 60 / 24);
    difference -= days * 1000 * 60 * 60 * 24;

    const hours = Math.floor(difference / 1000 / 60 / 60);
    difference -= hours * 1000 * 60 * 60;

    const minutes = Math.floor(difference / 1000 / 60);
    difference -= minutes * 1000 * 60;

    const seconds = Math.floor(difference / 1000);

    // sets the times to show in the page
    this.timeLastLogin = {
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds,
    };
  }

  // the loop that updates the timer in he page each second
  _calculateTimeLoop() {
    this.intervalId = window.setInterval(() => {
      this._calculateTime();
    }, 1000);
  }
}

window.customElements.define('main-page', MainPage);
