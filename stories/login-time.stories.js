import { html } from 'lit-html';
import '../src/login-time.js';

export default {
  title: 'LoginTime',
  component: 'login-time',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template() {
  return html`
    <login-time>
    </login-time>
  `;
}

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
