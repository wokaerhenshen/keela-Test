import { Template } from 'meteor/templating';
import { Meteor} from 'meteor/meteor';

// import css files
import "../imports/css/bootstrap.min.css";
import "../imports/css/oneui.css";

//import js files
import "../imports/js/jquery.min.js";
import "../imports/js/bootstrap.min.js";
import "../imports/js/jquery.validate.min.js";

//import template files
import "../imports/ui/home.html";
import "../imports/ui/login.html";
import "../imports/ui/register.html";


import './main.html';
import { Accounts } from 'meteor/accounts-base';

Router.route('/', {
  template: 'login'
});

Router.route('/register');
Router.route('/login');
Router.route('/home',{
  name:'home',
  template:'home',
  onBeforeAction:function(){
  var currentUser = Meteor.userId();
  if(currentUser){
    //logged-in
    if(Meteor.user()){
      console.log(Meteor.user());
      var email = Meteor.user().emails[0].address;
      this.render('home',{data:{name:email}});
    }else {
      this.next();
    }
  }else {
    //not logged
    this.render('login');
  }
}
});

if(Meteor.isClient){

  Template.register.events({
    'submit .js-validation-register':function(event){
      event.preventDefault();
      //alert('hi');
      console.log('hello');
      var userName = $('#register-username').val();
      var email = $('#register-email').val();
      var password = $('#register-password').val();
      Accounts.createUser({
        email:email,
        password:password,
        userName:userName
      },function(error){
        if(error){
          alert(error.reason);
        }else{
          Router.go('home');
        }
      });
      
    }  
  });

  Template.home.events({
    'click .logout':function(event){
      event.preventDefault();
      Meteor.logout();
      Router.go('login');
    }
  });

  Template.login.events({
    'submit .js-validation-login':function(event){
      event.preventDefault();
      var email = $('#login-username').val();
      var password = $('#login-password').val();
      Meteor.loginWithPassword(email,password,function(error){
        console.log("try to login...");
        if(error){
          alert(error.reason);
        }else {
          Router.go('home');
        }

      });

    }
  })


}
