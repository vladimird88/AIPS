import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
	Meteor.publish('figures', function findFigures() {
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
		},
		updateFigureInDB: function (figureId,updateDict) {
			Figures.update({_id : figureId},{$set:updateDict},function(err)
				{
					if(!err)
					{
						//curentObjectId = docsInserted;
					}
				});
		}
	});
});
