
export const FiguresEnum = {
	DisableAll : 0, 
	EnableAll : 1,
	RectFigure : 2, 
	CircleFigure : 3, 
	TriangleFigure : 4, 
	LineFigure : 5, 
	EllipseFigure : 6, 
	SquareFigure : 7, 
	PolygonFigure : 8,
	TextFigure : 9
	};

export class Figure {
  constructor(angle, scaleX, scaleY, strokeWidth, strokeColor, fillColor, top, left) {
		this.angle = angle;
		this.scaleX = scaleX;
		this.scaleY = scaleY;
		this.strokeWidth = strokeWidth;
        this.strokeColor = strokeColor;
		this.fillColor = fillColor;
		this.top = top;
		this.left = left;
		this.time = Date.now();
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
				var points = Figure.regularPolygonPoints(singleFigure.numberOfSides,singleFigure.polygonRadius);	
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

export class Circle extends Figure {
  constructor(angle, scaleX, scaleY, strokeWidth, strokeColor, fillColor, top, left, radius) {
		super(angle, scaleX, scaleY, strokeWidth, strokeColor, fillColor, top, left);
		this.radius = radius;
		this.originX = 'center';
		this.originY = 'center';
		this.type = FiguresEnum.CircleFigure;
    }
}

export class Ellipse extends Figure {
  constructor(angle, scaleX, scaleY, strokeWidth, strokeColor, fillColor, top, left, radiusX, radiusY) {
		super(angle, scaleX, scaleY, strokeWidth, strokeColor, fillColor, top, left);
		this.radiusX = radiusX;
		this.radiusY = radiusY;
		this.originX = 'center';
		this.originY = 'center';
		this.type = FiguresEnum.EllipseFigure;
    }
}

export class Square extends Figure {
  constructor(angle, scaleX, scaleY, strokeWidth, strokeColor, fillColor, top, left, width) {
		super(angle, scaleX, scaleY, strokeWidth, strokeColor, fillColor, top, left);
		this.width = width;
		this.originX = 'left';
		this.originY = 'top';
		this.type = FiguresEnum.SquareFigure;
    }
}

export class Rect extends Square {
  constructor(angle, scaleX, scaleY, strokeWidth, strokeColor, fillColor, top, left, width, height) {
		super(angle, scaleX, scaleY, strokeWidth, strokeColor, fillColor, top, left, width);
		this.width = width;
		this.height = height;
		this.originX = 'left';
		this.originY = 'top';
		this.type = FiguresEnum.RectFigure;
    }
}
export class Triangle extends Figure {
  constructor(angle, scaleX, scaleY, strokeWidth, strokeColor, fillColor, top, left, width, height) {
		super(angle, scaleX, scaleY, strokeWidth, strokeColor, fillColor, top, left);
		this.width = width;
		this.height = height;
		this.originX = 'left';
		this.originY = 'top';
		this.type = FiguresEnum.TriangleFigure;
    }
}

export class Polygon extends Figure {
  constructor(angle, scaleX, scaleY, strokeWidth, strokeColor, fillColor, top, left, numberOfSides, polygonRadius) {
		super(angle, scaleX, scaleY, strokeWidth, strokeColor, fillColor, top, left);
		this.originX = 'left';
		this.originY = 'top';
		this.numberOfSides = numberOfSides;
		this.polygonRadius = polygonRadius;
		this.type = FiguresEnum.PolygonFigure;
    }
}

export class Text extends Figure {
  constructor(angle, scaleX, scaleY, strokeWidth, strokeColor, fillColor, top, left, width, height, text) {
		super(angle, scaleX, scaleY, strokeWidth, strokeColor, fillColor, top, left);
		this.originX = 'left';
		this.originY = 'top';
		this.width = width;
		this.height = height;
		this.text = text;
		this.type = FiguresEnum.TextFigure;
    }
}