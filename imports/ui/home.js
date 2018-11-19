import { Template } from 'meteor/templating';
import "./home.html";

//router for the home page
Router.route('/home',{
    name:'home',
    template:'home',
    onBeforeAction:function(){
    var currentUser = Meteor.userId();
    if(currentUser){
      //logged-in
      if(Meteor.user()){
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

//handler for the home logout
Template.home.events({
    'click .logout':function(event){
      event.preventDefault();
      Meteor.logout();
      Router.go('login');
    }
  });