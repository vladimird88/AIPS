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
		saveEllipseInDB: function (xPosition, yPosition, xRadius, yRadius, strokeWidth, strokeColor, fillColor) {
			Figures.insert({
					type: 5,
					top: yPosition,
					left: xPosition,
					xRadius: xRadius,
					yRadius: yRadius,
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
		},saveRectInDB: function (xPosition, yPosition, width, height, strokeWidth, strokeColor, fillColor) {
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
		saveTriangleInDB: function (xPosition, yPosition, width, height, strokeWidth, strokeColor, fillColor) {
			Figures.insert({
					type: 3,
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
		}
	});
});
