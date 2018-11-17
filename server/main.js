import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  //"start": "MONGO_URL=mongodb://username:password@host_url:portnumber/dbname meteor run"
});

Accounts.onCreateUser(function(options, user) {
  user.userName = options.userName;
  return user;
});
