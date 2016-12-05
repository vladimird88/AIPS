import { Figure } from './Figures.js';
import { Rect } from './Figures.js';
import { Ellipse } from './Figures.js';
import { Circle } from './Figures.js';
import { Triangle } from './Figures.js';
import { Square } from './Figures.js';
import { Polygon } from './Figures.js';
import { Text } from './Figures.js';
import { FiguresEnum } from './Figures.js';

var canvas;
var selectedFigureForEditing;
var selectedFigureId;
var figureToEdit;

export class DrawingManager
{
	static drawFromDB()
	{
		Meteor.subscribe('figures');
		Tracker.autorun(function(){
			
			canvas.clear();
			var figuresCursors = Figures.find({});
			figuresCursors.forEach(function(singleFigure)
			{
				DrawingManager.drawFigure(singleFigure);
			});
			DrawingManager.setAllFiguresInCanvasSelectable();
		});
	}
	
	static clearTable()
	{
		Meteor.call('deleteAllFiguresInDB', function (error) 
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
	
	static deleteSelected()
	{
		if(selectedFigureForEditing != null)
		{
			Meteor.call('deleteFigureInDB', selectedFigureForEditing.target._id, function (error) 
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
		
	}
	
	static setAllFiguresInCanvasSelectable()
	{
		var objs = canvas.getObjects().map(function(o) 
			{
				return o.set('selectable', true) && o.set('hoverCursor', 'move');
			});
	}
	
	static setAllFiguresInCanvasNonSelectable()
	{
		var objs = canvas.getObjects().map(function(o) 
			{
				return o.set('selectable', false) && o.set('hoverCursor', 'default');
			});
	}
	
	static setAllFiguresSelectable(selectable)
	{
		if(selectable)
		{
			Session.set('DrawingMode', FiguresEnum.EnableAll);
			DrawingManager.setAllFiguresInCanvasSelectable();
		}
		else
		{
			Session.set('DrawingMode', FiguresEnum.DisableAll);
			DrawingManager.setAllFiguresInCanvasNonSelectable();
		}
		selectedFigureForEditing = null;
		selectedFigureId = null;
	}
	
	static initializeDrawing()
	{
		Session.set('DrawingMode', FiguresEnum.EnableAll);
		Session.set('SelectedStrokeWidth', 1);
		Session.set('SelectedColor', 'ffffff');
		Session.set('SelectedFillColor', '3c78b4');
		Session.set('SelectedStrokeColorWithAlpha', 'rgba(255,255,255,1)');
		Session.set('SelectedFillColorWithAlpha', 'rgba(60,120,180,1)');
		Session.set('SelectedStrokeAlpha', 1);
		Session.set('SelectedFillAlpha', 1);
	}
	
	static setStrokeWidth(selectedStrokeWidth)
	{
		Session.set('SelectedStrokeWidth', parseInt(selectedStrokeWidth));
	}
	
	static setStrokeColor(selectedStrokeColor)
	{
		var selectedStrokeAlpha = Session.get('SelectedStrokeAlpha');
		var bigint = parseInt(selectedStrokeColor, 16);
		var r = (bigint >> 16) & 255;
		var g = (bigint >> 8) & 255;
		var b = bigint & 255;
		var selectedStrokeColorWithAlpha = 'rgba('+r+','+g+','+b+','+selectedStrokeAlpha+')';
		Session.set('SelectedStrokeColorWithAlpha', selectedStrokeColorWithAlpha);
		document.getElementById("strokePreview").style.backgroundColor=selectedStrokeColorWithAlpha;
		Session.set('SelectedColor', selectedStrokeColor);
		if(selectedFigureForEditing != null)
		{
			selectedFigureForEditing.target.set('stroke', selectedStrokeColorWithAlpha);
			Meteor.call('updateFigureInDB', selectedFigureForEditing.target._id, {'strokeColor': selectedStrokeColorWithAlpha}, function (error) 
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
	}
	
	static setStrokeAlpha(selectedStrokeAlpha)
	{
		var selectedStrokeColor = Session.get('SelectedColor');;
		var bigint = parseInt(selectedStrokeColor, 16);
		var r = (bigint >> 16) & 255;
		var g = (bigint >> 8) & 255;
		var b = bigint & 255;
		var selectedStrokeColorWithAlpha = 'rgba('+r+','+g+','+b+','+selectedStrokeAlpha+')';
		Session.set('SelectedStrokeAlpha', selectedStrokeAlpha);
		document.getElementById("strokePreview").style.backgroundColor=selectedStrokeColorWithAlpha;
		Session.set('SelectedStrokeColorWithAlpha',selectedStrokeColorWithAlpha);
		if(selectedFigureForEditing != null)
		{
			selectedFigureForEditing.target.set('stroke', selectedStrokeColorWithAlpha);
			Meteor.call('updateFigureInDB', selectedFigureForEditing.target._id, {'strokeColor': selectedStrokeColorWithAlpha}, function (error) 
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
	}
	
	static setFillAlpha(selectedFillAlpha)
	{
		var selectedFillColor = Session.get('SelectedFillColor');;
		var bigint = parseInt(selectedFillColor, 16);
		var r = (bigint >> 16) & 255;
		var g = (bigint >> 8) & 255;
		var b = bigint & 255;
		var selectedFillColorWithAlpha = 'rgba('+r+','+g+','+b+','+selectedFillAlpha+')';
		Session.set('SelectedFillAlpha', selectedFillAlpha);
		document.getElementById("fillPreview").style.backgroundColor=selectedFillColorWithAlpha;
		Session.set('SelectedFillColorWithAlpha',selectedFillColorWithAlpha);
		if(selectedFigureForEditing != null)
		{
			selectedFigureForEditing.target.set('fillColor', selectedFillColorWithAlpha);
			Meteor.call('updateFigureInDB', selectedFigureForEditing.target._id, {'fillColor': selectedFillColorWithAlpha}, function (error) 
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
	}
	
	static selectFigure(selectedFigure)
	{
		selectedFigureForEditing = null;
		selectedFigureId = null;
		Session.set('DrawingMode', selectedFigure);
		DrawingManager.setAllFiguresInCanvasNonSelectable();
	}
	
	static setFillColor(selectedFillColor)
	{
		var selectedFillAlpha = Session.get('SelectedFillAlpha');
		var bigint = parseInt(selectedFillColor, 16);
		var r = (bigint >> 16) & 255;
		var g = (bigint >> 8) & 255;
		var b = bigint & 255;
		var selectedFillColorWithAlpha = 'rgba('+r+','+g+','+b+','+selectedFillAlpha+')';
		document.getElementById("fillPreview").style.backgroundColor=selectedFillColorWithAlpha;
		Session.set('SelectedFillColor', selectedFillColor);
		Session.set('SelectedFillColorWithAlpha',selectedFillColorWithAlpha);
		if(selectedFigureForEditing != null)
		{
			selectedFigureForEditing.target.set('fill', selectedFillColorWithAlpha);
			Meteor.call('updateFigureInDB', selectedFigureForEditing.target._id, {'fillColor': selectedFillColorWithAlpha}, function (error) 
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
	}
	
	static onObjectSelected(e) 
	{
		selectedFigureForEditing = e;
		selectedFigureId = e.target._id;
		Session.set('DrawingMode', FiguresEnum.EnableAll);
		DrawingManager.setAllFiguresInCanvasSelectable();
	}

	
	static setupDrawingOnCanvas(mainCanvas)
	{
		canvas = mainCanvas;
		canvas.selection = false;
		
		canvas.on('object:selected', DrawingManager.onObjectSelected);
		
		DrawingManager.drawFromDB();
		
		var drawingFigure, point1, isDown, origX, origY;
		var objectsList = [];

		canvas.on('mouse:down', function(o)
		{
			var drawingMode = Session.get('DrawingMode');
			if(drawingMode != FiguresEnum.EnableAll && drawingMode != FiguresEnum.DisableAll)
			{
				isDown = true;
				var pointer = canvas.getPointer(o.e);
				origX = pointer.x;
				origY = pointer.y;
				canvas.deactivateAll();
				drawingFigure = Figure.startDrawingFigure(pointer);
			}
		});

		canvas.on('mouse:move', function(o)
		{
			if (!isDown) return;
			var pointer = canvas.getPointer(o.e);
			Figure.updateDrawingFigure(drawingFigure, pointer, origX, origY);
			canvas.renderAll();
		});

		canvas.on('mouse:up', function(o)
		{
			var figureToSave;
			isDown = false;
			var drawingMode = Session.get('DrawingMode');
			if(selectedFigureForEditing == null)
			{
				var pointer = canvas.getPointer(o.e);
				var strokeColor = Session.get('SelectedStrokeColorWithAlpha');
				var fillColor = Session.get('SelectedFillColorWithAlpha');
				var selectedStrokeWidth = Session.get('SelectedStrokeWidth');
				switch(drawingMode)
				{
					case FiguresEnum.RectFigure:
					{
						var leftRect = Math.min(origX,pointer.x);
						var topRect = Math.min(origY,pointer.y);
						var widthRect = Math.abs(origX - pointer.x);
						var heightRect = Math.abs(origY - pointer.y);
						figureToSave = new Rect(0, 1, 1, selectedStrokeWidth, strokeColor, fillColor, topRect, leftRect, widthRect, heightRect);
						break;
					}
					case FiguresEnum.CircleFigure:
					{
						var circleRadius = Math.sqrt(Math.pow(origX - pointer.x, 2) + Math.pow(origY - pointer.y, 2));
						figureToSave = new Circle(0, 1, 1, selectedStrokeWidth, strokeColor, fillColor, origY, origX, circleRadius);
						break;
					}
					case FiguresEnum.TriangleFigure:
					{
						var leftTriangle = Math.min(origX,pointer.x);
						var topTriangle = Math.min(origY,pointer.y);
						var widthTriangle = Math.abs(origX - pointer.x);
						var heightTriangle = Math.abs(origY - pointer.y);
						figureToSave = new Triangle(0, 1, 1, selectedStrokeWidth, strokeColor, fillColor, topTriangle, leftTriangle, widthTriangle, heightTriangle);
						break;
					}
					case FiguresEnum.EllipseFigure:	
					{
						var xRadius = Math.abs(origX - pointer.x);
						var yRadius = Math.abs(origY - pointer.y);
						figureToSave = new Ellipse(0, 1, 1, selectedStrokeWidth, strokeColor, fillColor, origY, origX, xRadius, yRadius);
						break;
					}
					case FiguresEnum.SquareFigure:
					{
						var leftSquare= Math.min(origX,pointer.x);
						var topSquare = Math.min(origY,pointer.y);
						var widthSquare = Math.min(Math.abs(origX - pointer.x), Math.abs(origY - pointer.y));
						figureToSave = new Square(0, 1, 1, selectedStrokeWidth, strokeColor, fillColor, topSquare, leftSquare, widthSquare);
						break;
					}
					case FiguresEnum.PolygonFigure:	
					{
						var polygonRadius = Math.sqrt(Math.pow(origX - pointer.x, 2) + Math.pow(origY - pointer.y, 2));
						var leftPolygon = origX-polygonRadius;
						var	topPolygon = origY-polygonRadius;
						figureToSave = new Polygon(0, 1, 1, selectedStrokeWidth, strokeColor, fillColor, topPolygon, leftPolygon, 8, polygonRadius);										
						break;
					}
					case FiguresEnum.TextFigure:
					{
						var pointer = canvas.getPointer(o.e);
						figureToSave = new Text(0, 1, 1, selectedStrokeWidth, strokeColor, fillColor, pointer.y, pointer.x, 400, 400, 'Hello world');										
						break;
					}
				}
			}
			else
			{
				switch(selectedFigureForEditing.target.figureType)
				{
					case FiguresEnum.RectFigure:
					{
						figureToEdit = new Rect(selectedFigureForEditing.target.angle, selectedFigureForEditing.target.scaleX, selectedFigureForEditing.target.scaleY, selectedFigureForEditing.target.strokeWidth, selectedFigureForEditing.target.stroke, selectedFigureForEditing.target.fill, selectedFigureForEditing.target.top, selectedFigureForEditing.target.left, selectedFigureForEditing.target.width, selectedFigureForEditing.target.height);
						break;
					}
					case FiguresEnum.CircleFigure:
					{
						figureToEdit = new Circle(selectedFigureForEditing.target.angle, selectedFigureForEditing.target.scaleX, selectedFigureForEditing.target.scaleY, selectedFigureForEditing.target.strokeWidth, selectedFigureForEditing.target.stroke, selectedFigureForEditing.target.fill, selectedFigureForEditing.target.top, selectedFigureForEditing.target.left, selectedFigureForEditing.target.width * 0.5);
						break;
					}
					case FiguresEnum.TriangleFigure:
					{
						figureToEdit = new Triangle(selectedFigureForEditing.target.angle, selectedFigureForEditing.target.scaleX, selectedFigureForEditing.target.scaleY, selectedFigureForEditing.target.strokeWidth, selectedFigureForEditing.target.stroke, selectedFigureForEditing.target.fill, selectedFigureForEditing.target.top, selectedFigureForEditing.target.left, selectedFigureForEditing.target.width, selectedFigureForEditing.target.height);
						break;
					}
					case FiguresEnum.EllipseFigure:	
					{
						figureToEdit = new Ellipse(selectedFigureForEditing.target.angle, selectedFigureForEditing.target.scaleX, selectedFigureForEditing.target.scaleY, selectedFigureForEditing.target.strokeWidth, selectedFigureForEditing.target.stroke, selectedFigureForEditing.target.fill, selectedFigureForEditing.target.top, selectedFigureForEditing.target.left, selectedFigureForEditing.target.rx, selectedFigureForEditing.target.ry);
						break;
					}
					case FiguresEnum.SquareFigure:
					{
						figureToEdit = new Square(selectedFigureForEditing.target.angle, selectedFigureForEditing.target.scaleX, selectedFigureForEditing.target.scaleY, selectedFigureForEditing.target.strokeWidth, selectedFigureForEditing.target.stroke, selectedFigureForEditing.target.fill, selectedFigureForEditing.target.top, selectedFigureForEditing.target.left, selectedFigureForEditing.target.width);
						break;
					}
					case FiguresEnum.PolygonFigure:	
					{
						var polygonRadius = Math.sqrt(Math.pow(origX - pointer.x, 2) + Math.pow(origY - pointer.y, 2));
						var leftPolygon = origX-polygonRadius;
						var	topPolygon = origY-polygonRadius;
						figureToEdit = new Polygon(selectedFigureForEditing.target.angle, selectedFigureForEditing.target.scaleX, selectedFigureForEditing.target.scaleY, selectedStrokeWidth, strokeColor, fillColor, topPolygon, leftPolygon, 8, polygonRadius);										
						break;
					}
					case FiguresEnum.TextFigure:
					{
						var pointer = canvas.getPointer(o.e);
						figureToEdit = new Text(selectedFigureForEditing.target.angle, selectedFigureForEditing.target.scaleX, selectedFigureForEditing.target.scaleY, selectedStrokeWidth, strokeColor, fillColor, pointer.y, pointer.x, 400, 400, 'Hello world');										
						break;
					}
				}
			}
			if(drawingMode != FiguresEnum.EnableAll && drawingMode != FiguresEnum.DisableAll)
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
			else if(drawingMode == FiguresEnum.EnableAll && selectedFigureForEditing != null)
			{
				Meteor.call('updateFigureInDB', selectedFigureForEditing.target._id, figureToEdit, function (error) 
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
	
	//Duplirano / ukloni 
	static regularPolygonPoints(sideCount,radius)
	{
		var sweep=Math.PI*2/sideCount;
		var cx=radius;
		var cy=radius;
		var points=[];
		for(var i=0;i<sideCount;i++){
			var x=cx+radius*Math.cos(i*sweep);
			var y=cy+radius*Math.sin(i*sweep);
			points.push({x:x,y:y});
		}
		return(points);
	}
	
	
	static drawFigure(singleFigure)
	{
		var figureToDraw = Figure.createFigure(singleFigure);
		canvas.add(figureToDraw);
		figureToDraw._id = singleFigure._id;
		if(figureToDraw._id == selectedFigureId)
		{
			canvas.setActiveObject(figureToDraw);
		}
		figureToDraw.figureType = singleFigure.type;
	}
}

//test