import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.Content.onCreated(function onContentCreated(event)
{
	if(Meteor.isClient) 
	{
		Session.set('step', 0);
	}
});

Template.Content.helpers({
	SelectedContent: function () 
	{
		var step = Session.get('step');
		switch (step) 
		{
			case 0 :
				return Template.ContentMain;
				break;
			case 1 :
				return Template.NewCourse;
				break;
			case 2 :
				return Template.AllCourses;
				break;
		}
	}
});

Template.Navigation.events = 
{
	'click #HomeLink' : function (event) 
	{
        Session.set('step', 0);
	},
	'click #NewCourseLink' : function (event) 
	{
        Session.set('step', 1);
		setTimeout(function() 
		{ 
			var canvas = new fabric.Canvas('canvas');
			canvas.add(new fabric.Circle({ radius: 30, fill: '#f55', top: 100, left: 100 }));
			canvas.selectionColor = 'rgba(0,255,0,0.3)';
			canvas.selectionBorderColor = 'red';
			canvas.selectionLineWidth = 5;
		}, 0);
	},
	'click #AllCoursesLink' : function (event) 
	{
        Session.set('step', 2);
	}
};