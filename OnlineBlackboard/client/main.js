import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Figure } from './Figures.js';
import { Rect } from './Figures.js';
import { Ellipse } from './Figures.js';
import { Circle } from './Figures.js';
import { Triangle } from './Figures.js';
import { Square } from './Figures.js';
import { Polygon } from './Figures.js';
import { Text } from './Figures.js';
import { FiguresEnum } from './Figures.js';

import { PageManager } from './PageManager.js';
import { DrawingManager } from './DrawingManager.js';

import './main.html';

window.onload = function()
{
	chat();
}

function chat()
{
	const streamer = new Meteor.Streamer('chat');

	sendMessage = function(message) {
		streamer.emit('message', message);
		console.log('me: ' + message);
	  };
	  

	streamer.on('message', function(message) {
		console.log('user: ' + message);
	});
	
	//Now you can open 2 browser tabs/windows and chat using sendMessage("text") at your browser's console Every message will travel from your client to server and retransmited to all other clients.
}

Template.Content.onCreated(function onContentCreated(event)
{
	PageManager.openHomePage();
});

Template.Content.helpers({
	SelectedContent: function () 
	{
		return PageManager.getSelectedPage();
	}
});

Template.Navigation.events = 
{
	'click #HomeLink' : function (event) 
	{
        PageManager.openHomePage();
	},
	'click #NewCourseLink' : function (event) 
	{
        PageManager.openDrawingPage();
	},
	'click #AllCoursesLink' : function (event) 
	{
        PageManager.openAllCoursesPage();
	}
};

Template.NewCourse.onCreated(function onContentCreated(event)
{
	DrawingManager.initializeDrawing();
});


Template.NewCourse.events = 
{
	'click #deleteAll' : function (event)
	{
		DrawingManager.clearTable();
	},
	'click #deleteSelected' : function (event)
	{
		DrawingManager.deleteSelected();
	},
	'click #enableAll' : function (event) 
	{
		DrawingManager.setAllFiguresSelectable(true);
	},
	'click #disableAll' : function (event) 
	{
		DrawingManager.setAllFiguresSelectable(false);
	},
	'click #rectSelected' : function (event) 
	{
        DrawingManager.selectFigure(FiguresEnum.RectFigure);
	},
	'click #circleSelected' : function (event) 
	{
        DrawingManager.selectFigure(FiguresEnum.CircleFigure);
	},
	'click #squareSelected' : function (event) 
	{
        DrawingManager.selectFigure(FiguresEnum.SquareFigure);
	},
	'click #triangleSelected' : function (event) 
	{
        DrawingManager.selectFigure(FiguresEnum.TriangleFigure);
	},
	'click #lineSelected' : function (event) 
	{
        DrawingManager.selectFigure(FiguresEnum.LineFigure);
	},
	'click #polygonSelected' : function (event) 
	{
        DrawingManager.selectFigure(FiguresEnum.PolygonFigure);
	},
	'click #textSelected' : function (event) 
	{
        DrawingManager.selectFigure(FiguresEnum.TextFigure);
	},
	'click #ellipseSelected' : function (event) 
	{
        DrawingManager.selectFigure(FiguresEnum.EllipseFigure);
	},
	'change #colorPickerStroke' : function (event) 
	{
		var selectedStrokeColor = $(event.target).val().replace("#","");
		DrawingManager.setStrokeColor(selectedStrokeColor);
	},
	'change #strokeAlpha' : function (event) 
	{
		var selectedStrokeAlpha = $(event.target).val()*0.01;
		DrawingManager.setStrokeAlpha(selectedStrokeAlpha);
	},
	'change #colorPickerFill' : function (event) 
	{
		var selectedFillColor = $(event.target).val().replace("#","");
		DrawingManager.setFillColor(selectedFillColor);
	},
	'change #fillAlpha' : function (event) 
	{
		var selectedFillAlpha = $(event.target).val()*0.01;
		DrawingManager.setFillAlpha(selectedFillAlpha);
	},
	'change #strokeWidth': function(event) {
		var selectedStrokeWidth = $(event.target).val();
		DrawingManager.setStrokeWidth(selectedStrokeWidth);
	}
};
