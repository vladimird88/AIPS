import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

Template.Content.onCreated(function onContentCreated(event)
{
	Session.set('step', 0);
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
			canvas.selection = false;
			drawOnCanvas(canvas);
		}, 0);
	},
	'click #AllCoursesLink' : function (event) 
	{
        Session.set('step', 2);
	}
};

function drawOnCanvas(canvas)
{	
	var circle, rect, isDown, origX, origY;

	canvas.on('mouse:down', function(o)
	{
		var drawingMode = Session.get('DrawingMode');
		if(drawingMode != 0)
		{
			isDown = true;
			var pointer = canvas.getPointer(o.e);
			origX = pointer.x;
			origY = pointer.y;
		}
		switch(drawingMode)
		{
			case 2:		//circle
			{
				circle = new fabric.Circle({
					left: pointer.x,
					top: pointer.y,
					radius: 1,
					strokeWidth: 5,
					stroke: 'red',
					selectable: true,
					fill: 'rgba(0,0,0,0)',
					originX: 'center', originY: 'center'
				});
				canvas.add(circle);
				break;
			}
			case 1:		//rect
			{
				rect = new fabric.Rect({
					left: pointer.x,
					top: pointer.y,
					width:0,
					height:0,
					radius: 1,
					strokeWidth: 5,
					stroke: 'red',
					selectable: true,
					fill: 'rgba(0,0,0,0)',
					originX: 'left', originY: 'top'
				});
				canvas.add(rect);
				break;
			}
		}
	});

	canvas.on('mouse:move', function(o)
	{
		var drawingMode = Session.get('DrawingMode');
		switch(drawingMode)
		{
			case 2:		//circle
			{
				if (!isDown) return;
				var pointer = canvas.getPointer(o.e);
				circle.set({ radius: Math.abs(origX - pointer.x) });
				canvas.renderAll();
				break;
			}
			case 1:		//rect
			{
				if (!isDown) return;
				var pointer = canvas.getPointer(o.e);
				rect.set({ width: Math.abs(origX - pointer.x), height: Math.abs(origY - pointer.y) });
				canvas.renderAll();
				break;
			}
			case 0:		//No mode;
			{
				if (!isDown) return;
			}
		}
	});

	canvas.on('mouse:up', function(o)
	{
		isDown = false;
	});
}

Template.NewCourse.onCreated(function onContentCreated(event)
{
	Session.set('DrawingMode', 0);
});


Template.NewCourse.events = 
{
	'click #clearSelection' : function (event) 
	{
        Session.set('DrawingMode', 0);
	},
	'click #rectSelected' : function (event) 
	{
        Session.set('DrawingMode', 1);
	},
	'click #circleSelected' : function (event) 
	{
        Session.set('DrawingMode', 2);
	},
	'click #lineSelected' : function (event) 
	{
        Session.set('DrawingMode', 3);
	}
};
