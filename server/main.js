import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
});

Accounts.onCreateUser(function(options, user) {
  user.userName = options.userName;
  return user;
});
