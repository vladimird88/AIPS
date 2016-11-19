import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  const streamer = new Meteor.Streamer('chat');
  if (Meteor.isServer) {
	  streamer.allowRead('all');
	  streamer.allowWrite('all');
	}
});
