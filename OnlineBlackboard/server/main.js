import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
	Meteor.publish('figures', function tasksPublication() {
		return Figures.find();
	});
	Meteor.methods({
	
		saveCircleInDB: function (xPosition, yPosition, radius) {
			Figures.insert({
					Type: 2,
					Top: yPosition,
					Left: xPosition,
					Radius: radius,
					time: Date.now()
				},function(err,docsInserted)
				{
					if(!err)
					{
						//curentObjectId = docsInserted;
					}
				});
		},

		method2: function (arg) {
         var result = arg + 10;
         return result;
		}
	});
});
