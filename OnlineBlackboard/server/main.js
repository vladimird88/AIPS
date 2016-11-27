import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
	Meteor.publish('figures', function tasksPublication() {
		return Figures.find();
	});
	Meteor.methods({
		
		saveFigureInDB: function (singleFigure) {
			Figures.insert(singleFigure,function(err,docsInserted)
				{
					if(!err)
					{
						//curentObjectId = docsInserted;
					}
				});
		}
	});
});
