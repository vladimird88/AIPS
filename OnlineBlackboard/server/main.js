import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
	Meteor.publish('figures', function tasksPublication() {
		return Figures.find();
	});
	Meteor.methods({
	
		saveCircleInDB: function (xPosition, yPosition, radius, strokeWidth, strokeColor, fillColor) {
			Figures.insert({
					type: 2,
					top: yPosition,
					left: xPosition,
					radius: radius,
					strokeColor: strokeColor,
					fillColor: fillColor,
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
		saveRectInDB: function (xPosition, yPosition, width, height, strokeWidth, strokeColor, fillColor) {
			Figures.insert({
					type: 1,
					top: yPosition,
					left: xPosition,
					width: width,
					strokeColor: strokeColor,
					fillColor: fillColor,
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
