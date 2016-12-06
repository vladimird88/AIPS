import { Figure } from './Figures.js';
import { Rect } from './Figures.js';
import { Ellipse } from './Figures.js';
import { Circle } from './Figures.js';
import { Triangle } from './Figures.js';
import { Square } from './Figures.js';
import { Polygon } from './Figures.js';
import { Text } from './Figures.js';
import { FiguresEnum } from './Figures.js';

export class FiguresFactory
{
	static startDrawingFigure(pointer)
	{
		var drawingFigure;
		var drawingMode = Session.get('DrawingMode');
		var selectedStrokeWidth = Session.get('SelectedStrokeWidth');
		var selectedStrokeColorWithAlpha = Session.get('SelectedStrokeColorWithAlpha');
		var selectedFillColorWithAlpha = Session.get('SelectedFillColorWithAlpha');
		switch(drawingMode)
		{
			case FiguresEnum.RectFigure:	
			{
				drawingFigure = new fabric.Rect({
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
				canvas.add(drawingFigure);
				break;
			}
			case FiguresEnum.CircleFigure:	
			{
				drawingFigure = new fabric.Circle({
					left: pointer.x,
					top: pointer.y,
					radius: 1,
					strokeWidth: selectedStrokeWidth,
					stroke: selectedStrokeColorWithAlpha,
					selectable: false,
					fill: selectedFillColorWithAlpha,
					originX: 'center', originY: 'center'
				});
				canvas.add(drawingFigure);
				break;
			}
			case FiguresEnum.TriangleFigure:
			{
				drawingFigure = new fabric.Triangle({
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
				canvas.add(drawingFigure);
				break;
			}
			/*case FiguresEnum.LineFigure:			//line, spaja 2 tacke
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
			}*/
			case FiguresEnum.EllipseFigure:
			{
				drawingFigure = new fabric.Ellipse({
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
				canvas.add(drawingFigure);
				break;
			}
			case FiguresEnum.SquareFigure:
			{
				drawingFigure = new fabric.Rect({
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
				canvas.add(drawingFigure);
				break;
			}
			case FiguresEnum.PolygonFigure:	
			{
				var points = FiguresFactory.regularPolygonPoints(8,1);	
				drawingFigure = new fabric.Polygon(
					points, {
						left: pointer.x,
						top: pointer.y,
						angle: 0,
						fill: selectedFillColorWithAlpha,
						stroke: selectedStrokeColorWithAlpha,
						selectable: false,
						originX: 'left', originY: 'top'
					  }
					);
				canvas.add(drawingFigure);											
				break;
			}
			case FiguresEnum.TextFigure:
			{
				drawingFigure = new fabric.IText('Hello world', {
					left: pointer.x,
					top: pointer.y,
					width:400,
					height:400,
					strokeWidth: selectedStrokeWidth,
					stroke: selectedStrokeColorWithAlpha,
					selectable: false,
					fill: selectedFillColorWithAlpha,
					originX: 'left', originY: 'top'
				});
				canvas.add(drawingFigure);
				//objectsList.push(square);
				break;
			}
		}
		return drawingFigure;
	}
	
	//adapter / fabric
	static createFigure(singleFigure)
	{
		var figureToDraw;
		switch(singleFigure.type)
		{
			case FiguresEnum.RectFigure:	
			{
				figureToDraw = new fabric.Rect({
						left: singleFigure.left,
						top: singleFigure.top,
						width:singleFigure.width,
						height:singleFigure.height,
						strokeWidth: singleFigure.strokeWidth,
						stroke: singleFigure.strokeColor,
						fill:singleFigure.fillColor,
						selectable: false,
						originX: singleFigure.originX, 
						originY: singleFigure.originY,
						angle: singleFigure.angle,
						scaleX: singleFigure.scaleX,
						scaleY: singleFigure.scaleY
					});
				break;
			}
			case FiguresEnum.CircleFigure:	
			{
				figureToDraw = new fabric.Circle({
					left: singleFigure.left,
					top: singleFigure.top,
					radius: singleFigure.radius,
					strokeWidth: singleFigure.strokeWidth,
					stroke: singleFigure.strokeColor,
					fill:singleFigure.fillColor,
					selectable: false,
					originX: singleFigure.originX, 
					originY: singleFigure.originY,
					angle: singleFigure.angle,
					scaleX: singleFigure.scaleX,
					scaleY: singleFigure.scaleY
				});
				break;
			}
			case FiguresEnum.TriangleFigure:	
			{
				figureToDraw = new fabric.Triangle({
					left: singleFigure.left,
					top: singleFigure.top,
					width:singleFigure.width,
					height:singleFigure.height,
					strokeWidth: singleFigure.strokeWidth,
					stroke: singleFigure.strokeColor,
					fill:singleFigure.fillColor,
					selectable: false,
					originX: singleFigure.originX, 
					originY: singleFigure.originY,
					angle: singleFigure.angle,
					scaleX: singleFigure.scaleX,
					scaleY: singleFigure.scaleY
				});
				break;
			}
			case FiguresEnum.EllipseFigure:	
			{
				figureToDraw = new fabric.Ellipse({
					left: singleFigure.left,
					top: singleFigure.top,
					rx:singleFigure.radiusX,
					ry:singleFigure.radiusY,
					strokeWidth: singleFigure.strokeWidth,
					stroke: singleFigure.strokeColor,
					fill:singleFigure.fillColor,
					selectable: false,
					originX: singleFigure.originX, 
					originY: singleFigure.originY,
					angle: singleFigure.angle,
					scaleX: singleFigure.scaleX,
					scaleY: singleFigure.scaleY
				});
				break;
			}
			case FiguresEnum.SquareFigure:	
			{
				figureToDraw = new fabric.Rect({
						left: singleFigure.left,
						top: singleFigure.top,
						width:singleFigure.width,
						height:singleFigure.width,
						strokeWidth: singleFigure.strokeWidth,
						stroke: singleFigure.strokeColor,
						fill:singleFigure.fillColor,
						selectable: false,
						originX: singleFigure.originX, 
						originY: singleFigure.originY,
						angle: singleFigure.angle,
						scaleX: singleFigure.scaleX,
						scaleY: singleFigure.scaleY
					});
				break;
			}
			case FiguresEnum.PolygonFigure:	
			{
				var points = FiguresFactory.regularPolygonPoints(singleFigure.numberOfSides,singleFigure.polygonRadius);	
				figureToDraw = new fabric.Polygon(
						points, {
						left: singleFigure.left,
						top: singleFigure.top,
						angle: 0,
						fill: singleFigure.fillColor,
						stroke: singleFigure.strokeColor,
						strokeWidth: singleFigure.strokeWidth,
						selectable: false,
						originX: singleFigure.originX, 
						originY: singleFigure.originY,
						angle: singleFigure.angle,
						scaleX: singleFigure.scaleX,
						scaleY: singleFigure.scaleY
					  });
				break;
			}
			case FiguresEnum.TextFigure:	
			{
				figureToDraw = new fabric.IText(singleFigure.text, {
						left: singleFigure.left,
						top: singleFigure.top,
						width:singleFigure.width,
						height:singleFigure.height,
						fill: singleFigure.fillColor,
						stroke: singleFigure.strokeColor,
						strokeWidth: singleFigure.strokeWidth,
						selectable: false,
						originX: singleFigure.originX, 
						originY: singleFigure.originY,
						angle: singleFigure.angle,
						scaleX: singleFigure.scaleX,
						scaleY: singleFigure.scaleY
					});
				break;
			}
		}
		return figureToDraw;
	}
	
	static updateDrawingFigure(drawingFigure, pointer, origX, origY)
	{
		var drawingMode = Session.get('DrawingMode');
		switch(drawingMode)
		{
			case FiguresEnum.EnableAll:
			{
				break;
			}
			case FiguresEnum.DisableAll:
			{
				break;
			}
			case FiguresEnum.RectFigure:
			{
				var leftRect = Math.min(origX,pointer.x);
				var topRect = Math.min(origY,pointer.y);
				var widthRect = Math.abs(origX - pointer.x);
				var heightRect = Math.abs(origY - pointer.y);
				drawingFigure.set({ left: leftRect, top: topRect, width: widthRect, height: heightRect });
				canvas.renderAll();
				break;
			}
			case FiguresEnum.CircleFigure:
			{
				drawingFigure.set({ radius: Math.sqrt(Math.pow(origX - pointer.x, 2) + Math.pow(origY - pointer.y, 2)) });
				break;
			}
			case FiguresEnum.TriangleFigure:
			{
				var leftTriangle = Math.min(origX,pointer.x);
				var topTriangle = Math.min(origY,pointer.y);
				var widthTriangle = Math.abs(origX - pointer.x);
				var heightTriangle = Math.abs(origY - pointer.y);
				drawingFigure.set({ left: leftTriangle, top: topTriangle, width: widthTriangle, height: heightTriangle });
				break;
			}
			case FiguresEnum.EllipseFigure:
			{
				drawingFigure.set({ rx: Math.abs(origX - pointer.x), ry: Math.abs(origY - pointer.y)});
				break;
			}
			case FiguresEnum.SquareFigure:
			{
				var widthSquare = Math.min(Math.abs(origX - pointer.x), Math.abs(origY - pointer.y));
				var leftSquare = pointer.x > origX ? origX : Math.max(pointer.x,origX-widthSquare);
				var topSquare = pointer.y > origY ? origY : Math.max(pointer.y,origY-widthSquare);
				drawingFigure.set({ left: leftSquare, top: topSquare, width: widthSquare, height: widthSquare });
				break;
			}
			case FiguresEnum.PolygonFigure:	
			{
				var polygonRadius = Math.sqrt(Math.pow(origX - pointer.x, 2) + Math.pow(origY - pointer.y, 2));
				var points = FiguresFactory.regularPolygonPoints(8,polygonRadius);	
				drawingFigure.set('points',points);
				drawingFigure.set({ left: origX-polygonRadius, top: origY-polygonRadius});										
				break;
			}
			case FiguresEnum.TextFigure:
			{
				drawingFigure.set({ left: pointer.x, top: pointer.y});										
				break;
			}
		}
	}
	
	static saveDrawingFigureInDb(drawingFigure, pointer, origX, origY)
	{
		var drawingMode = Session.get('DrawingMode');
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
				figureToSave = new Text(0, 1, 1, selectedStrokeWidth, strokeColor, fillColor, pointer.y, pointer.x, 400, 400, 'Hello world');										
				break;
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
	}
	
	
	static updateExistingFigureInDB(selectedFigureForEditing, figureToEdit, pointer, origX, origY)
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
				figureToEdit = new Polygon(selectedFigureForEditing.target.angle, selectedFigureForEditing.target.scaleX, selectedFigureForEditing.target.scaleY, selectedFigureForEditing.target.strokeWidth, selectedFigureForEditing.target.stroke, selectedFigureForEditing.target.fill, selectedFigureForEditing.target.top, selectedFigureForEditing.target.left, 8, selectedFigureForEditing.target.width * 0.5);										
				break;
			}
			case FiguresEnum.TextFigure:
			{
				figureToEdit = new Text(selectedFigureForEditing.target.angle, selectedFigureForEditing.target.scaleX, selectedFigureForEditing.target.scaleY, selectedFigureForEditing.target.strokeWidth, selectedFigureForEditing.target.stroke, selectedFigureForEditing.target.fill, selectedFigureForEditing.target.top, selectedFigureForEditing.target.left, 400, 400, 'Hello world');										
				break;
			}
		}
		var drawingMode = Session.get('DrawingMode');
		if(drawingMode == FiguresEnum.EnableAll && selectedFigureForEditing != null)
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
	}
	
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
}