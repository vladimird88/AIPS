import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
	Meteor.publish('figures', function tasksPublication() {
		return Figures.find();
	});
	Meteor.methods({
	
		saveCircleInDB: function (xPosition, yPosition, radius, strokeWidth, color) {
			Figures.insert({
					type: 2,
					top: yPosition,
					left: xPosition,
					radius: radius,
					color: color,
					stroke: strokeWidth,
					time: Date.now()
				},function(err,docsInserted)
				{
					if(!err)
					{
						//curentObjectId = docsInserted;
					}
				});
		},
		saveRectInDB: function (xPosition, yPosition, width, height, strokeWidth, color) {
			Figures.insert({
					type: 1,
					top: yPosition,
					left: xPosition,
					width: width,
					color: color,
					height: height,
					stroke: strokeWidth,
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
