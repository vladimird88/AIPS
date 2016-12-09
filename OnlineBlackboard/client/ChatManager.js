
var messagesArray;

export class ChatManager
{	
	static initializeChat()
	{
		messagesArray = [];
		const streamer = new Meteor.Streamer('chat');

		sendMessage = function(message) {
			streamer.emit('message', message);
			console.log('me: ' + message);
		  };
		  

		streamer.on('message', function(message) {
			var messageDict = {
			  name: "sender",
			  message: message
			};
			messagesArray.push(messageDict);
			Session.set("MyMessage",messagesArray);
		});
	}
	
	static sendSingleMessage(singleMessage)
	{
		sendMessage(singleMessage);
		var messageDict = {
			name: "sender",
			message: message.value
		};
		messagesArray.push(messageDict);
		Session.set("MyMessage",messagesArray);
	}
	
	static getChatMesssages()
	{
		return Session.get("MyMessage");
	}
}