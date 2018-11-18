import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  console.log(process.env);
  process.env.MONGO_URL='mongodb://xuwenjie410:Aa19940422~@ds211724.mlab.com:11724/keelademo';
});

Accounts.onCreateUser(function(options, user) {
  user.userName = options.userName;
  return user;
});
