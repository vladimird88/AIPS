import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

/*window.onload = function()
{
	draw();
	chat();
}*/

function chat()
{
	const streamer = new Meteor.Streamer('chat');

	if(Meteor.isClient) {
	  sendMessage = function(message) {
		streamer.emit('message', message);
		console.log('me: ' + message);
	  };

	  streamer.on('message', function(message) {
		console.log('user: ' + message);
	  });
	}
	
	//Now you can open 2 browser tabs/windows and chat using sendMessage("text") at your browser's console Every message will travel from your client to server and retransmited to all other clients.
}

Template.hello.onCreated(function helloOnCreated() {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

//FIXME: Ovaj chat treba koristiti kad podaci treba da se cuvaju u bazi. U suprotnom, bolje je koristiti rocket chat za klasican chat
//Ovaj chat ne radi kad je iskljucen autopublish. Zato bi ovo, ako se koristi, trebalo da se prebaci na server
/*Template.messages.helpers({
		messages: function() {
			return Poruke.find({}, { sort: { time: -1}});
		}
	});

	Template.input.events = {
	  'keydown input#message' : function (event) {
		if (event.which == 13) { // 13 is the enter key event
			var name = 'Anonymous';
		  var message = document.getElementById('message');
		  if (message.value != '') {
			Poruke.insert({
			  name: name,
			  message: message.value,
			  time: Date.now(),
			});

			document.getElementById('message').value = '';
			message.value = '';
		  }
		}
	  }
	}
*/
function draw()	//Koristimo jeremy:snapsvg
{
	// First lets create our drawing surface out of existing SVG element
	// If you want to create new surface just provide dimensions
	// like s = Snap(800, 600);
	var s = Snap("#svg");
	// Lets create big circle in the middle:
	var bigCircle = s.circle(150, 150, 100);
	// By default its black, lets change its attributes
	bigCircle.attr({
		fill: "#bada55",
		stroke: "#000",
		strokeWidth: 5
	});
	// Now lets create another small circle:
	var smallCircle = s.circle(100, 150, 70);
	// Lets put this small circle and another one into a group:
	var discs = s.group(smallCircle, s.circle(200, 150, 70));
	// Now we can change attributes for the whole group
	discs.attr({
		fill: "#fff"
	});
	// Now more interesting stuff
	// Lets assign this group as a mask for our big circle
	bigCircle.attr({
		mask: discs
	});
	// Despite our small circle now is a part of a group
	// and a part of a mask we could still access it:
	smallCircle.animate({r: 50}, 1000);
	// We don’t have reference for second small circle,
	// but we could easily grab it with CSS selectors:
	discs.select("circle:nth-child(2)").animate({r: 50}, 1000);
	// Now lets create pattern
	var p = s.path("M10-5-10,15M15,0,0,15M0-5-20,15").attr({
			fill: "none",
			stroke: "#bada55",
			strokeWidth: 5
		});
	// To create pattern,
	// just specify dimensions in pattern method:
	p = p.pattern(0, 0, 10, 10);
	// Then use it as a fill on big circle
	bigCircle.attr({
		fill: p
	});
	// We could also grab pattern from SVG
	// already embedded into our page
	discs.attr({
		fill: Snap("#pattern")
	});
	// Lets change fill of circles to gradient
	// This string means relative radial gradient
	// from white to black
	discs.attr({fill: "r()#fff-#000"});
	// Note that you have two gradients for each circle
	// If we want them to share one gradient,
	// we need to use absolute gradient with capital R
	discs.attr({fill: "R(150, 150, 100)#fff-#000"});
	// Of course we could animate color as well
	p.select("path").animate({stroke: "#f00"}, 1000);
}

/*Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click button'(event, instance) {
    // increment the counter when button is clicked
    instance.counter.set(instance.counter.get() + 1);
  },
});
*/