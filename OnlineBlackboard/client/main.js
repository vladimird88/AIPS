import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Figure } from './classfile.js';
import { Rect } from './classfile.js';
import { Ellipse } from './classfile.js';
import { Circle } from './classfile.js';
import { Triangle } from './classfile.js';
import { DrawingManager } from './classfile.js';

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
			DrawingManager.setupDrawingOnCanvas(canvas);
		}, 0);
	},
	'click #AllCoursesLink' : function (event) 
	{
        Session.set('step', 2);
	}
};

Template.NewCourse.onCreated(function onContentCreated(event)
{
	Session.set('DrawingMode', 0);
	Session.set('SelectedStrokeWidth', 1);
	Session.set('SelectedColor', 'ffffff');
	Session.set('SelectedFillColor', '3c78b4');
	Session.set('SelectedStrokeColorWithAlpha', 'rgba(255,255,255,1)');
	Session.set('SelectedFillColorWithAlpha', 'rgba(60,120,180,1)');
	Session.set('SelectedStrokeAlpha', 1);
	Session.set('SelectedFillAlpha', 1);
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
	'click #triangleSelected' : function (event) 
	{
        Session.set('DrawingMode', 3);
	},
	'click #lineSelected' : function (event) 
	{
        Session.set('DrawingMode', 4);
	},
	'click #ellipseSelected' : function (event) 
	{
        Session.set('DrawingMode', 5);
	},
	'change #colorPickerStroke' : function (event) 
	{
		var selectedStrokeColor = $(event.target).val().replace("#","");
		var selectedStrokeAlpha = Session.get('SelectedStrokeAlpha');
		var bigint = parseInt(selectedStrokeColor, 16);
		var r = (bigint >> 16) & 255;
		var g = (bigint >> 8) & 255;
		var b = bigint & 255;
		var selectedStrokeColorWithAlpha = 'rgba('+r+','+g+','+b+','+selectedStrokeAlpha+')';
		Session.set('SelectedStrokeColorWithAlpha', selectedStrokeColorWithAlpha);
		document.getElementById("strokePreview").style.backgroundColor=selectedStrokeColorWithAlpha;
		Session.set('SelectedColor', selectedStrokeColor);
	},
	'change #strokeAlpha' : function (event) 
	{
		var selectedStrokeAlpha = $(event.target).val()*0.01;
		var selectedStrokeColor = Session.get('SelectedColor');;
		var bigint = parseInt(selectedStrokeColor, 16);
		var r = (bigint >> 16) & 255;
		var g = (bigint >> 8) & 255;
		var b = bigint & 255;
		var selectedStrokeColorWithAlpha = 'rgba('+r+','+g+','+b+','+selectedStrokeAlpha+')';
		Session.set('SelectedStrokeAlpha', selectedStrokeAlpha);
		document.getElementById("strokePreview").style.backgroundColor=selectedStrokeColorWithAlpha;
		Session.set('SelectedStrokeColorWithAlpha',selectedStrokeColorWithAlpha);
	},
	'change #colorPickerFill' : function (event) 
	{
		var selectedFillColor = $(event.target).val().replace("#","");
		var selectedFillAlpha = Session.get('SelectedFillAlpha');
		var bigint = parseInt(selectedFillColor, 16);
		var r = (bigint >> 16) & 255;
		var g = (bigint >> 8) & 255;
		var b = bigint & 255;
		var selectedFillColorWithAlpha = 'rgba('+r+','+g+','+b+','+selectedFillAlpha+')';
		document.getElementById("fillPreview").style.backgroundColor=selectedFillColorWithAlpha;
		Session.set('SelectedFillColor', selectedFillColor);
		Session.set('SelectedFillColorWithAlpha',selectedFillColorWithAlpha);
	},
	'change #fillAlpha' : function (event) 
	{
		var selectedFillAlpha = $(event.target).val()*0.01;
		var selectedFillColor = Session.get('SelectedFillColor');;
		var bigint = parseInt(selectedFillColor, 16);
		var r = (bigint >> 16) & 255;
		var g = (bigint >> 8) & 255;
		var b = bigint & 255;
		var selectedFillColorWithAlpha = 'rgba('+r+','+g+','+b+','+selectedFillAlpha+')';
		Session.set('SelectedFillAlpha', selectedFillAlpha);
		document.getElementById("fillPreview").style.backgroundColor=selectedFillColorWithAlpha;
		Session.set('SelectedFillColorWithAlpha',selectedFillColorWithAlpha);
	},
	'change #strokeWidth': function(event) {
		var selectedStrokeWidth = $(event.target).val();
		Session.set('SelectedStrokeWidth', parseInt(selectedStrokeWidth));
	}
};
