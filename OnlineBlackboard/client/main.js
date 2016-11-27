import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Figure } from './classfile.js';
import { Rect } from './classfile.js';
import { Ellipse } from './classfile.js';
import { Circle } from './classfile.js';
import { Triangle } from './classfile.js';

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

function drawFromDatabase(canvas)
{
	Meteor.subscribe('figures');
	Tracker.autorun(function(){
		
		canvas.clear();
		var figuresCursors = Figures.find({});
		figuresCursors.forEach(function(singleFigure)
		{
			switch(singleFigure.type)
			{
				case 1:
				{
					var rectFromDB = new fabric.Rect({
						left: singleFigure.left,
						top: singleFigure.top,
						width:singleFigure.width,
						height:singleFigure.height,
						strokeWidth: singleFigure.strokeWidth,
						stroke: singleFigure.strokeColor,
						fill:singleFigure.fillColor,
						selectable: false,
						originX: singleFigure.originX, 
						originY: singleFigure.originY
					});
					canvas.add(rectFromDB);
					break;
				}
				case 2:
				{
					var circleFromDB = new fabric.Circle({
						left: singleFigure.left,
						top: singleFigure.top,
						radius: singleFigure.radius,
						strokeWidth: singleFigure.strokeWidth,
						stroke: singleFigure.strokeColor,
						fill:singleFigure.fillColor,
						selectable: false,
						originX: singleFigure.originX, 
						originY: singleFigure.originY
					});
					canvas.add(circleFromDB);
					break;
				}
				case 3:
				{
					var triangleFromDB = new fabric.Triangle({
						left: singleFigure.left,
						top: singleFigure.top,
						width:singleFigure.width,
						height:singleFigure.height,
						strokeWidth: singleFigure.strokeWidth,
						stroke: singleFigure.strokeColor,
						fill:singleFigure.fillColor,
						selectable: false,
						originX: singleFigure.originX, 
						originY: singleFigure.originY
					});
					canvas.add(triangleFromDB);
					break;
				}
				case 5:
				{
					var ellipseFromDB = new fabric.Ellipse({
						left: singleFigure.left,
						top: singleFigure.top,
						rx:singleFigure.radiusX,
						ry:singleFigure.radiusY,
						strokeWidth: singleFigure.strokeWidth,
						stroke: singleFigure.strokeColor,
						fill:singleFigure.fillColor,
						selectable: false,
						originX: singleFigure.originX, 
						originY: singleFigure.originY
					});
					canvas.add(ellipseFromDB);
					break;
				}
			}
		});
	});
	 
}

function drawOnCanvas(canvas)
{	
	drawFromDatabase(canvas);

	var circle, triangle, rect, ellipse, line, point1, isDown, origX, origY;
	var objectsList = [];

	canvas.on('mouse:down', function(o)
	{
		var drawingMode = Session.get('DrawingMode');
		var selectedStrokeWidth = Session.get('SelectedStrokeWidth');
		var selectedStrokeColorWithAlpha = Session.get('SelectedStrokeColorWithAlpha');
		var selectedFillColorWithAlpha = Session.get('SelectedFillColorWithAlpha');
		if(drawingMode != 0)
		{
			isDown = true;
			var pointer = canvas.getPointer(o.e);
			origX = pointer.x;
			origY = pointer.y;
		}
		switch(drawingMode)
		{
			case 1:		//rect
			{
				rect = new fabric.Rect({
					left: pointer.x,
					top: pointer.y,
					width:1,
					height:1,
					strokeWidth: selectedStrokeWidth,
					stroke: selectedStrokeColorWithAlpha,
					selectable: false,
					fill: selectedFillColorWithAlpha,
					originX: 'left', originY: 'top'
				});
				canvas.add(rect);
				break;
			}
			case 2:		//circle
			{
				circle = new fabric.Circle({
					left: pointer.x,
					top: pointer.y,
					radius: 1,
					strokeWidth: selectedStrokeWidth,
					stroke: selectedStrokeColorWithAlpha,
					selectable: false,
					fill: selectedFillColorWithAlpha,
					originX: 'center', originY: 'center'
				});
				objectsList.push(circle);
				canvas.add(circle);
				break;
			}
			case 3:		//triangle
			{
				triangle = new fabric.Triangle({
					left: pointer.x,
					top: pointer.y,
					width:1,
					height:1,
					strokeWidth: selectedStrokeWidth,
					stroke: selectedStrokeColorWithAlpha,
					selectable: false,
					fill: selectedFillColorWithAlpha,
					originX: 'left', originY: 'top'
				});
				objectsList.push(triangle);
				canvas.add(triangle);
				break;
			}
			case 4:		//line, spaja 2 tacke
			{
				if (point1 === undefined) 
				{
					point1 = new fabric.Point(origX, origY)
				} 
				else 
				{
					canvas.add(new fabric.Line([point1.x, point1.y, origX, origY], {
						stroke: selectedStrokeColorWithAlpha,
						hasControls: false,
						strokeWidth: selectedStrokeWidth,
						hasBorders: false,
						lockMovementX: true,
						lockMovementY: true,
						hoverCursor: 'default'
					}))
					point1 = undefined;
				}
				break;
			}
			case 5:		//ellipse
			{
				ellipse = new fabric.Ellipse({
					left: pointer.x,
					top: pointer.y,
					rx: 1,
					ry: 1,
					strokeWidth: selectedStrokeWidth,
					stroke: selectedStrokeColorWithAlpha,
					selectable: false,
					fill: selectedFillColorWithAlpha,
					originX: 'center', originY: 'center'
				});
				objectsList.push(ellipse);
				canvas.add(ellipse);
				break;
			}
		}
	});

	canvas.on('mouse:move', function(o)
	{
		if (!isDown) return;
		var drawingMode = Session.get('DrawingMode');
		switch(drawingMode)
		{
			case 0:		//No mode;
			{
				break;
			}
			case 1:		//rect
			{
				if (!isDown) return;
				var pointer = canvas.getPointer(o.e);
				var leftRect = Math.min(origX,pointer.x);
				var topRect = Math.min(origY,pointer.y);
				var widthRect = Math.abs(origX - pointer.x);
				var heightRect = Math.abs(origY - pointer.y);
				rect.set({ left: leftRect, top: topRect, width: widthRect, height: heightRect });
				canvas.renderAll();
				break;
			}
			case 2:		//circle
			{
				if (!isDown) return;
				var pointer = canvas.getPointer(o.e);
				circle.set({ radius: Math.sqrt(Math.pow(origX - pointer.x, 2) + Math.pow(origY - pointer.y, 2)) });
				canvas.renderAll();
				break;
			}
			case 3:		//triangle
			{
				if (!isDown) return;
				var pointer = canvas.getPointer(o.e);
				var leftTriangle = Math.min(origX,pointer.x);
				var topTriangle = Math.min(origY,pointer.y);
				var widthTriangle = Math.abs(origX - pointer.x);
				var heightTriangle = Math.abs(origY - pointer.y);
				triangle.set({ left: leftTriangle, top: topTriangle, width: widthTriangle, height: heightTriangle });
				canvas.renderAll();
				break;
			}
			case 5:		//ellipse
			{
				if (!isDown) return;
				var pointer = canvas.getPointer(o.e);
				ellipse.set({ rx: Math.abs(origX - pointer.x), ry: Math.abs(origY - pointer.y)});
				canvas.renderAll();
				break;
			}
		}
	});

	canvas.on('mouse:up', function(o)
	{
		isDown = false;
		var pointer = canvas.getPointer(o.e);
		var drawingMode = Session.get('DrawingMode');
		var strokeColor = Session.get('SelectedStrokeColorWithAlpha');
		var fillColor = Session.get('SelectedFillColorWithAlpha');
		var selectedStrokeWidth = Session.get('SelectedStrokeWidth');
		var figureToSave;
		switch(drawingMode)
		{
			case 0:		//No mode;
			{
				if (!isDown) return;
				break;
			}
			case 1:		//rect
			{
				var leftRect = Math.min(origX,pointer.x);
				var topRect = Math.min(origY,pointer.y);
				var widthRect = Math.abs(origX - pointer.x);
				var heightRect = Math.abs(origY - pointer.y);
				figureToSave = new Rect(selectedStrokeWidth, strokeColor, fillColor, topRect, leftRect, widthRect, heightRect);
				break;
			}
			case 2:		//circle
			{
				var circleRadius = Math.sqrt(Math.pow(origX - pointer.x, 2) + Math.pow(origY - pointer.y, 2));
				figureToSave = new Circle(selectedStrokeWidth, strokeColor, fillColor, origY, origX, circleRadius);
				break;
			}
			case 3:		//triangle
			{
				var leftTriangle = Math.min(origX,pointer.x);
				var topTriangle = Math.min(origY,pointer.y);
				var widthTriangle = Math.abs(origX - pointer.x);
				var heightTriangle = Math.abs(origY - pointer.y);
				figureToSave = new Triangle(selectedStrokeWidth, strokeColor, fillColor, topTriangle, leftTriangle, widthTriangle, heightTriangle);
				break;
			}
			case 5:		//ellipse
			{
				var xRadius = Math.abs(origX - pointer.x);
				var yRadius = Math.abs(origY - pointer.y);
				figureToSave = new Ellipse(selectedStrokeWidth, strokeColor, fillColor, origY, origX, xRadius, yRadius);
				break;
			}
		}
		if(drawingMode != 0)
		{
			Meteor.call('saveFigureInDB', figureToSave, function (error, result) 
				{
					if (error) 
					{
						console.log(error);
					}
					else 
					{
						console.log('success');
					}
				});
		}
	});
}

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
