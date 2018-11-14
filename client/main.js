import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Router.route('/', {
  template: 'register'
});

Router.route('/register');
Router.route('/login');
