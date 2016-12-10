import { Figure } from './Figures.js';
import { Rect } from './Figures.js';
import { Ellipse } from './Figures.js';
import { Circle } from './Figures.js';
import { Triangle } from './Figures.js';
import { Square } from './Figures.js';
import { Polygon } from './Figures.js';
import { Text } from './Figures.js';
import { FiguresEnum } from './Figures.js';
import { FiguresFactory } from './FiguresFactory.js';

var canvas;
var selectedFigureForEditing;
var selectedFigureId;
var figureToEdit;
var liveDrawingFigure;

export class DrawingManager
{
	static drawFromDB()
	{
		Meteor.subscribe('figures');
		Tracker.autorun(function(){
			liveDrawingFigure = null;
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
		
		const streamer2 = new Meteor.Streamer('drawing');

		sendFigure = function(singleFigure) {
			streamer2.emit('figure', singleFigure);
			console.log('me: ' + "" + singleFigure.left + "," + singleFigure.top);
		  };
		  
		streamer2.on('figure', function(singleFigure) {
			if(liveDrawingFigure != null)
			{
				canvas.remove(liveDrawingFigure);
			}
			liveDrawingFigure = DrawingManager.drawFigure(singleFigure);
		});
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
				drawingFigure = FiguresFactory.startDrawingFigure(pointer);
			}
		});

		canvas.on('mouse:move', function(o)
		{
			if (!isDown) return;
			var pointer = canvas.getPointer(o.e);
			FiguresFactory.updateDrawingFigure(drawingFigure, pointer, origX, origY);
			FiguresFactory.sendDrawingFigureToOtherUsers(drawingFigure, pointer, origX, origY);
			canvas.renderAll();
		});

		canvas.on('mouse:up', function(o)
		{
			var figureToSave;
			isDown = false;
			var pointer = canvas.getPointer(o.e);
			if(selectedFigureForEditing == null)
			{
				FiguresFactory.saveDrawingFigureInDb(drawingFigure, pointer, origX, origY)
			}
			else
			{
				FiguresFactory.updateExistingFigureInDB(selectedFigureForEditing, pointer, origX, origY);
			}
		});
	}
	
	static drawFigure(singleFigure)
	{
		var figureToDraw = FiguresFactory.createFigure(singleFigure);
		canvas.add(figureToDraw);
		figureToDraw._id = singleFigure._id;
		if(figureToDraw._id == selectedFigureId)
		{
			canvas.setActiveObject(figureToDraw);
		}
		figureToDraw.figureType = singleFigure.type;
		return figureToDraw;
	}
}