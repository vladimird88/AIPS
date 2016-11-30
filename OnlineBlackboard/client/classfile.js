

export const FiguresEnum = { NoSelection : 0, RectFigure : 1, CircleFigure : 2, TriangleFigure : 3, LineFigure : 4, EllipseFigure : 5, SquareFigure : 6, PolygonFigure : 7 };

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

export class Square extends Figure {
  constructor(strokeWidth, strokeColor, fillColor, top, left, width) {
		super(strokeWidth, strokeColor, fillColor, top, left);
		this.width = width;
		this.originX = 'left';
		this.originY = 'top';
		this.type = 6;
    }
}

export class Rect extends Square {
  constructor(strokeWidth, strokeColor, fillColor, top, left, width, height) {
		super(strokeWidth, strokeColor, fillColor, top, left, width);
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

export class PageManager
{
	static openHomePage()
	{
		Session.set('selectedPage', 0);
	}
	
	static openDrawingPage()
	{
		Session.set('selectedPage', 1);
		setTimeout(function() 
		{ 
			var canvas = new fabric.Canvas('canvas');
			DrawingManager.setupDrawingOnCanvas(canvas);
		}, 0);
	}
	
	static openAllCoursesPage()
	{
		Session.set('selectedPage', 2);
	}
	
	static getSelectedPage()
	{
		var selectedPage = Session.get('selectedPage');
		switch (selectedPage) 
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
}

export class DrawingManager
{
	static drawFromDB(canvas)
	{
		Meteor.subscribe('figures');
		Tracker.autorun(function(){
			
			canvas.clear();
			var figuresCursors = Figures.find({});
			figuresCursors.forEach(function(singleFigure)
			{
				DrawingManager.drawFigure(canvas,singleFigure);
			});
		});
	}
	
	static initializeDrawing()
	{
		Session.set('DrawingMode', 0);
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
	}
	
	static setupDrawingOnCanvas(canvas)
	{
		canvas.selection = false;
		
		DrawingManager.drawFromDB(canvas);
		
		var circle, triangle, rect, ellipse, square, line, point1, isDown, origX, origY;
		var objectsList = [];

		canvas.on('mouse:down', function(o)
		{
			var drawingMode = Session.get('DrawingMode');
			var selectedStrokeWidth = Session.get('SelectedStrokeWidth');
			var selectedStrokeColorWithAlpha = Session.get('SelectedStrokeColorWithAlpha');
			var selectedFillColorWithAlpha = Session.get('SelectedFillColorWithAlpha');
			if(drawingMode != FiguresEnum.NoSelection)
			{
				isDown = true;
				var pointer = canvas.getPointer(o.e);
				origX = pointer.x;
				origY = pointer.y;
			}
			switch(drawingMode)
			{
				case FiguresEnum.RectFigure:	
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
					//objectsList.push(rect);
					canvas.add(rect);
					break;
				}
				case FiguresEnum.CircleFigure:	
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
					//objectsList.push(circle);
					canvas.add(circle);
					break;
				}
				case FiguresEnum.TriangleFigure:			//triangle
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
					//objectsList.push(triangle);
					canvas.add(triangle);
					break;
				}
				case FiguresEnum.LineFigure:			//line, spaja 2 tacke
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
				case FiguresEnum.EllipseFigure:
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
					//objectsList.push(ellipse);
					canvas.add(ellipse);
					break;
				}
				case FiguresEnum.SquareFigure:
				{
					square = new fabric.Rect({
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
					canvas.add(square);
					//objectsList.push(square);
					break;
				}
				case FiguresEnum.PolygonFigure:	
				{
					// get the vertices of a hexagon with a radius of 30
					var points = DrawingManager.regularPolygonPoints(8,10);	
					var polygon = new fabric.Polygon(points, {
													left: 250,
													top: 150,
													angle: 0,
													fill: 'green'
												  }
												);
					canvas.add(polygon);											
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
				case FiguresEnum.NoSelection:
				{
					break;
				}
				case FiguresEnum.RectFigure:
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
				case FiguresEnum.CircleFigure:
				{
					if (!isDown) return;
					var pointer = canvas.getPointer(o.e);
					circle.set({ radius: Math.sqrt(Math.pow(origX - pointer.x, 2) + Math.pow(origY - pointer.y, 2)) });
					canvas.renderAll();
					break;
				}
				case FiguresEnum.TriangleFigure:
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
				case FiguresEnum.EllipseFigure:
				{
					if (!isDown) return;
					var pointer = canvas.getPointer(o.e);
					ellipse.set({ rx: Math.abs(origX - pointer.x), ry: Math.abs(origY - pointer.y)});
					canvas.renderAll();
					break;
				}
				case FiguresEnum.SquareFigure:
				{
					if (!isDown) return;
					var pointer = canvas.getPointer(o.e);
					var widthSquare = Math.min(Math.abs(origX - pointer.x), Math.abs(origY - pointer.y));
					var leftSquare = pointer.x > origX ? origX : Math.max(pointer.x,origX-widthSquare);
					var topSquare = pointer.y > origY ? origY : Math.max(pointer.y,origY-widthSquare);
					square.set({ left: leftSquare, top: topSquare, width: widthSquare, height: widthSquare });
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
				case FiguresEnum.NoSelection:
				{
					if (!isDown) return;
					break;
				}
				case FiguresEnum.RectFigure:
				{
					var leftRect = Math.min(origX,pointer.x);
					var topRect = Math.min(origY,pointer.y);
					var widthRect = Math.abs(origX - pointer.x);
					var heightRect = Math.abs(origY - pointer.y);
					figureToSave = new Rect(selectedStrokeWidth, strokeColor, fillColor, topRect, leftRect, widthRect, heightRect);
					break;
				}
				case FiguresEnum.CircleFigure:
				{
					var circleRadius = Math.sqrt(Math.pow(origX - pointer.x, 2) + Math.pow(origY - pointer.y, 2));
					figureToSave = new Circle(selectedStrokeWidth, strokeColor, fillColor, origY, origX, circleRadius);
					break;
				}
				case FiguresEnum.TriangleFigure:
				{
					var leftTriangle = Math.min(origX,pointer.x);
					var topTriangle = Math.min(origY,pointer.y);
					var widthTriangle = Math.abs(origX - pointer.x);
					var heightTriangle = Math.abs(origY - pointer.y);
					figureToSave = new Triangle(selectedStrokeWidth, strokeColor, fillColor, topTriangle, leftTriangle, widthTriangle, heightTriangle);
					break;
				}
				case FiguresEnum.EllipseFigure:	
				{
					var xRadius = Math.abs(origX - pointer.x);
					var yRadius = Math.abs(origY - pointer.y);
					figureToSave = new Ellipse(selectedStrokeWidth, strokeColor, fillColor, origY, origX, xRadius, yRadius);
					break;
				}
				case FiguresEnum.SquareFigure:
				{
					var leftSquare= Math.min(origX,pointer.x);
					var topSquare = Math.min(origY,pointer.y);
					var widthSquare = Math.min(Math.abs(origX - pointer.x), Math.abs(origY - pointer.y));
					figureToSave = new Square(selectedStrokeWidth, strokeColor, fillColor, topSquare, leftSquare, widthSquare);
					break;
				}
			}
			if(drawingMode != FiguresEnum.NoSelection)
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
	
	
	static drawFigure(canvas,singleFigure)
	{
		switch(singleFigure.type)
		{
			case FiguresEnum.RectFigure:	
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
			case FiguresEnum.CircleFigure:	
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
			case FiguresEnum.TriangleFigure:	
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
			case FiguresEnum.EllipseFigure:	
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
			case FiguresEnum.SquareFigure:	
			{
				var squareFromDB = new fabric.Rect({
						left: singleFigure.left,
						top: singleFigure.top,
						width:singleFigure.width,
						height:singleFigure.width,
						strokeWidth: singleFigure.strokeWidth,
						stroke: singleFigure.strokeColor,
						fill:singleFigure.fillColor,
						selectable: false,
						originX: singleFigure.originX, 
						originY: singleFigure.originY
					});
				canvas.add(squareFromDB);
				break;
			}
		}
	}
}