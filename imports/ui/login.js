import { Template } from 'meteor/templating';
import "./login.html";

//router for login page
Router.route('/', {
    template: 'login'
});
Router.route('/login');

//handler for the rememberMe button
Template.login.onCreated(function(){
    Template.login.helpers({
        remember:localStorage.getItem('remember'),
        email:localStorage.getItem('email'),
        password:localStorage.getItem('password')    
    });
});

//handler for login submit
Template.login.events({
    'submit .js-validation-login':function(event){
      event.preventDefault();
      var email = $('#login-username').val();
      var password = $('#login-password').val();
      var rememberMe = $('#login-remember-me')[0].checked;
      if(rememberMe){
        localStorage.setItem('remember', 'checked');
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
      }else {
        localStorage.clear();
      }
      Meteor.loginWithPassword(email,password,function(error){
        //console.log("try to login...");
        if(error){
          alert(error.reason);
        }else {
          Router.go('home');
        }

      });

    }
});

//jquery validation for the login form
Template.login.onRendered(function(){
    jQuery('.js-validation-login').validate({
        errorClass: 'help-block text-right animated fadeInDown',
        errorElement: 'div',
        errorPlacement: function(error, e) {
            jQuery(e).parents('.form-group > div').append(error);
        },
        highlight: function(e) {
            jQuery(e).closest('.form-group').removeClass('has-error').addClass('has-error');
            jQuery(e).closest('.help-block').remove();
        },
        success: function(e) {
            jQuery(e).closest('.form-group').removeClass('has-error');
            jQuery(e).closest('.help-block').remove();
        },
        rules: {
            'login-username': {
                required: true,
                minlength: 3
            },
            'login-password': {
                required: true,
                minlength: 5
            }
        },
        messages: {
            'login-username': {
                required: 'Please enter a username',
                minlength: 'Your username must consist of at least 3 characters'
            },
            'login-password': {
                required: 'Please provide a password',
                minlength: 'Your password must be at least 5 characters long'
            }
        }
    });

    jQuery('.form-material.floating > .form-control').each(function(){
        var $input  = jQuery(this);
        var $parent = $input.parent('.form-material');

        if ($input.val()) {
            $parent.addClass('open');
        }

        $input.on('change', function(){
            if ($input.val()) {
                $parent.addClass('open');
            } else {
                $parent.removeClass('open');
            }
        });
    });
});

