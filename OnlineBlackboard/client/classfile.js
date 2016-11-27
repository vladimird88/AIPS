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

export class DrawingManager
{
	
	static setupDrawingOnCanvas(canvas)
	{
		canvas.selection = false;
		Meteor.subscribe('figures');
		Tracker.autorun(function(){
			
			canvas.clear();
			var figuresCursors = Figures.find({});
			figuresCursors.forEach(function(singleFigure)
			{
				DrawingManager.drawFigure(canvas,singleFigure);
			});
		});

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
	
	
	static drawFigure(canvas,singleFigure)
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
	}
}