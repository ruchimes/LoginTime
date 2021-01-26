import { html, fixture, expect } from '@open-wc/testing';

import '../src/login-time.js';

describe('LoginTime', () => {
  let element;
  let loginComp;
  let regisComp;
  let counterComp;

  before(async () => {
    element = await fixture(html`<login-time></login-time>`);
    loginComp = element.shadowRoot.querySelector('login-page');
  });

  it('renders login page', () => {
    expect(element).to.exist;
    expect(loginComp).to.be.not.undefined;
  });

  it('when clicking without filling the login inputs, gets an error', () => {
    
    loginComp._onLoginClick();

    window.setTimeout(() => {
      expect(loginComp.error).to.be.not.empty;
    }, 100);
  });

  it('when user is not registered, gets an error', () => {
    loginComp.shadowRoot.querySelector('#email').value = 'prueba@test.com';
    loginComp.shadowRoot.querySelector('#pass').value = 'test';

    loginComp._onLoginClick();

    window.setTimeout(() => {
      expect(loginComp.error).to.be.not.empty;
    }, 100);
  });

  before(async () => {
    loginComp._onRegisterClick();
  });

  it('when clicking register button it renders register page', () => {
    regisComp = element.shadowRoot.querySelector('register-page');
    expect(regisComp).to.be.not.undefined;
  });

  it('Error when trying to register without filling inputs', () => {
    window.setTimeout(() => {
      regisComp._onRegisterClick();
      expect(regisComp.error).to.be.not.empty;
    }, 200);
  });

  it('registering an user', () => {
    regisComp.shadowRoot.querySelector('#email').value = 'prueba@test.com';
    regisComp.shadowRoot.querySelector('#name').value = 'Prueba';
    regisComp.shadowRoot.querySelector('#pass1').value = 'test';
    regisComp.shadowRoot.querySelector('#pass2').value = 'test';

    regisComp._onRegisterClick();
    
    window.setTimeout(() => {
      expect(regisComp.error).to.be.empty;
    }, 200);
  });

  it('registering the same user', () => {
    regisComp.shadowRoot.querySelector('#email').value = 'prueba@test.com';
    regisComp.shadowRoot.querySelector('#name').value = 'Prueba';
    regisComp.shadowRoot.querySelector('#pass1').value = 'test';
    regisComp.shadowRoot.querySelector('#pass2').value = 'test';

    regisComp._onRegisterClick();
    
    window.setTimeout(() => {
      expect(regisComp.error).to.be.not.empty;
    }, 200);
  });

  it('now that the user is registered there is no error', () => {
    loginComp.shadowRoot.querySelector('#email').value = 'prueba@test.com';
    loginComp.shadowRoot.querySelector('#pass').value = 'test';

    loginComp._onLoginClick();

    window.setTimeout(() => {
      expect(loginComp.error).to.be.empty;
    }, 100);
  });

});
