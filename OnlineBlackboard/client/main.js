import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Figure } from './classfile.js';
import { Rect } from './classfile.js';
import { Ellipse } from './classfile.js';
import { Circle } from './classfile.js';
import { Triangle } from './classfile.js';
import { Square } from './classfile.js';
import { DrawingManager } from './classfile.js';
import { PageManager } from './classfile.js';

import { FiguresEnum } from './classfile.js';

import './main.html';



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
	'click #clearSelection' : function (event) 
	{
        Session.set('DrawingMode', FiguresEnum.NoSelection);
	},
	'click #rectSelected' : function (event) 
	{
        Session.set('DrawingMode', FiguresEnum.RectFigure);
	},
	'click #circleSelected' : function (event) 
	{
        Session.set('DrawingMode', FiguresEnum.CircleFigure);
	},
	'click #squareSelected' : function (event) 
	{
        Session.set('DrawingMode', FiguresEnum.SquareFigure);
	},
	'click #triangleSelected' : function (event) 
	{
        Session.set('DrawingMode', FiguresEnum.TriangleFigure);
	},
	'click #lineSelected' : function (event) 
	{
        Session.set('DrawingMode', FiguresEnum.LineFigure);
	},
	'click #polygonSelected' : function (event) 
	{
        Session.set('DrawingMode', FiguresEnum.PolygonFigure);
	},
	'click #ellipseSelected' : function (event) 
	{
        Session.set('DrawingMode', FiguresEnum.EllipseFigure);
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
