import { Template } from 'meteor/templating';
import "./register.html";

//router for the register page
Router.route('/register');

//handler for the register submit
Template.register.events({
    'submit .js-validation-register':function(event){
      event.preventDefault();
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

//jquery validation for the register form
Template.register.onRendered(function(){
    jQuery('.js-validation-register').validate({
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
            'register-username': {
                required: true,
                minlength: 3
            },
            'register-email': {
                required: true,
                email: true
            },
            'register-password': {
                required: true,
                minlength: 5
            },
            'register-password2': {
                required: true,
                equalTo: '#register-password'
            },
            'register-terms': {
                required: true
            }
        },
        messages: {
            'register-username': {
                required: 'Please enter a username',
                minlength: 'Your username must consist of at least 3 characters'
            },
            'register-email': 'Please enter a valid email address',
            'register-password': {
                required: 'Please provide a password',
                minlength: 'Your password must be at least 5 characters long'
            },
            'register-password2': {
                required: 'Please provide a password',
                minlength: 'Your password must be at least 5 characters long',
                equalTo: 'Please enter the same password as above'
            },
            'register-terms': 'You must agree to the service terms!'
        }
    });
});