import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
  // code to run on server at startup
  
	//Chat server
	const streamer = new Meteor.Streamer('chat');
	streamer.allowRead('all');
	streamer.allowWrite('all');
	
	const streamer2 = new Meteor.Streamer('drawing');
	streamer2.allowRead('all');
	streamer2.allowWrite('all');
	
	
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
		},
		deleteFigureInDB: function (figureId) {
			Figures.remove(figureId,function(err)
				{
					if(!err)
					{
						//curentObjectId = docsInserted;
					}
				});
		},
		deleteAllFiguresInDB: function () {
			Figures.remove({},function(err)
				{
					if(!err)
					{
						//curentObjectId = docsInserted;
					}
				});
		}
	});
});
