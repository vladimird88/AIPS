import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
export class Figure {
  constructor(strokeWidth, strokeColor, fillColor, top, left) {
        this.strokeWidth = strokeWidth;
        this.strokeColor = strokeColor;
		this.fillColor = fillColor;
		this.top = top;
		this.left = left;
		this.time = Date.now();
    }
}

export class Circle extends Figure {
  constructor(strokeWidth, strokeColor, fillColor, top, left, radius) {
		super(strokeWidth, strokeColor, fillColor, top, left);
		this.radius = radius;
		this.originX = 'center';
		this.originY = 'center';
		this.type = 2;
    }
}

export class Ellipse extends Figure {
  constructor(strokeWidth, strokeColor, fillColor, top, left, radiusX, radiusY) {
		super(strokeWidth, strokeColor, fillColor, top, left);
		this.radiusX = radiusX;
		this.radiusY = radiusY;
		this.originX = 'center';
		this.originY = 'center';
		this.type = 5;
    }
}

export class Rect extends Figure {
  constructor(strokeWidth, strokeColor, fillColor, top, left, width, height) {
		super(strokeWidth, strokeColor, fillColor, top, left);
		this.width = width;
		this.height = height;
		this.originX = 'left';
		this.originY = 'top';
		this.type = 1;
    }
}
export class Triangle extends Figure {
  constructor(strokeWidth, strokeColor, fillColor, top, left, width, height) {
		super(strokeWidth, strokeColor, fillColor, top, left);
		this.width = width;
		this.height = height;
		this.originX = 'left';
		this.originY = 'top';
		this.type = 3;
    }
}


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

//FIXME: Pozeljno je da se iskljuci autopublis, i da se rad sa bazom prebaci na server. Ako je iskljucen autopublish, a rad sa bazom je na klijentu, onda ne radi ucitavanje iz baze i sl.
//TODO: Obavezno koristi Publish i Subscribe
function drawFromDatabase(canvas)
{
	Meteor.subscribe('figures');
	Tracker.autorun(function(){
		
		canvas.clear();
		var figuresCursors = Figures.find({});
		//var figures = figuresCursors.fetch();
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
						strokeWidth: singleFigure.stroke,
						stroke: singleFigure.strokeColor,
						fill:singleFigure.fillColor,
						selectable: false,
						originX: 'left', originY: 'top'
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
						strokeWidth: singleFigure.stroke,
						stroke: singleFigure.strokeColor,
						fill:singleFigure.fillColor,
						selectable: false,
						originX: 'center', originY: 'center'
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
						strokeWidth: singleFigure.stroke,
						stroke: singleFigure.strokeColor,
						fill:singleFigure.fillColor,
						selectable: false,
						originX: 'left', originY: 'top'
					});
					canvas.add(triangleFromDB);
					break;
				}
				case 5:
				{
					var ellipseFromDB = new fabric.Ellipse({
						left: singleFigure.left,
						top: singleFigure.top,
						rx:singleFigure.xRadius,
						ry:singleFigure.yRadius,
						strokeWidth: singleFigure.stroke,
						stroke: singleFigure.strokeColor,
						fill:singleFigure.fillColor,
						selectable: false,
						originX: 'center', originY: 'center'
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
				Meteor.call('saveRectInDB', leftRect, topRect, widthRect, heightRect, selectedStrokeWidth, strokeColor, fillColor, function (error, result) 
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
				break;
			}
			case 2:		//circle
			{
				var circleRadius = Math.sqrt(Math.pow(origX - pointer.x, 2) + Math.pow(origY - pointer.y, 2));
				var circleToSave = new Circle(selectedStrokeWidth, strokeColor, fillColor, origY, origX, circleRadius);
				Meteor.call('saveCircleInDB', circleToSave, function (error, result) 
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
				break;
			}
			case 3:		//triangle
			{
				var leftTriangle = Math.min(origX,pointer.x);
				var topTriangle = Math.min(origY,pointer.y);
				var widthTriangle = Math.abs(origX - pointer.x);
				var heightTriangle = Math.abs(origY - pointer.y);
				Meteor.call('saveTriangleInDB', leftTriangle, topTriangle, widthTriangle, heightTriangle, selectedStrokeWidth, strokeColor, fillColor, function (error, result) 
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
				break;
			}
			case 5:		//ellipse
			{
				var xRadius = Math.abs(origX - pointer.x);
				var yRadius = Math.abs(origY - pointer.y);
				Meteor.call('saveEllipseInDB', origX,origY, xRadius, yRadius, selectedStrokeWidth, strokeColor, fillColor, function (error, result) 
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
				break;
			}
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
