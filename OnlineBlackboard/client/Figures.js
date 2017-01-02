
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
  constructor(angle, scaleX, scaleY, strokeWidth, strokeColor, fillColor, top, left, figureText) {
		this.angle = angle;
		this.scaleX = scaleX;
		this.scaleY = scaleY;
		this.strokeWidth = strokeWidth;
        this.strokeColor = strokeColor;
		this.fillColor = fillColor;
		this.top = top;
		this.left = left;
		this.time = Date.now();
		this.figureText = figureText;
    }
}

export class Circle extends Figure {
  constructor(angle, scaleX, scaleY, strokeWidth, strokeColor, fillColor, top, left, radius, figureText) {
		super(angle, scaleX, scaleY, strokeWidth, strokeColor, fillColor, top, left, figureText);
		this.radius = radius;
		this.originX = 'center';
		this.originY = 'center';
		this.type = FiguresEnum.CircleFigure;
    }
}

export class Ellipse extends Figure {
  constructor(angle, scaleX, scaleY, strokeWidth, strokeColor, fillColor, top, left, radiusX, radiusY, figureText) {
		super(angle, scaleX, scaleY, strokeWidth, strokeColor, fillColor, top, left, figureText);
		this.radiusX = radiusX;
		this.radiusY = radiusY;
		this.originX = 'center';
		this.originY = 'center';
		this.type = FiguresEnum.EllipseFigure;
    }
}

export class Square extends Figure {
  constructor(angle, scaleX, scaleY, strokeWidth, strokeColor, fillColor, top, left, width, figureText) {
		super(angle, scaleX, scaleY, strokeWidth, strokeColor, fillColor, top, left, figureText);
		this.width = width;
		this.originX = 'left';
		this.originY = 'top';
		this.type = FiguresEnum.SquareFigure;
    }
}

export class Rect extends Square {
  constructor(angle, scaleX, scaleY, strokeWidth, strokeColor, fillColor, top, left, width, height, figureText) {
		super(angle, scaleX, scaleY, strokeWidth, strokeColor, fillColor, top, left, width, figureText);
		this.width = width;
		this.height = height;
		this.originX = 'left';
		this.originY = 'top';
		this.type = FiguresEnum.RectFigure;
    }
}
export class Triangle extends Figure {
  constructor(angle, scaleX, scaleY, strokeWidth, strokeColor, fillColor, top, left, width, height, figureText) {
		super(angle, scaleX, scaleY, strokeWidth, strokeColor, fillColor, top, left, figureText);
		this.width = width;
		this.height = height;
		this.originX = 'left';
		this.originY = 'top';
		this.type = FiguresEnum.TriangleFigure;
    }
}

export class Polygon extends Figure {
  constructor(angle, scaleX, scaleY, strokeWidth, strokeColor, fillColor, top, left, numberOfSides, polygonRadius, figureText) {
		super(angle, scaleX, scaleY, strokeWidth, strokeColor, fillColor, top, left, figureText);
		this.originX = 'left';
		this.originY = 'top';
		this.numberOfSides = numberOfSides;
		this.polygonRadius = polygonRadius;
		this.type = FiguresEnum.PolygonFigure;
    }
}

export class Text extends Figure {
  constructor(angle, scaleX, scaleY, strokeWidth, strokeColor, fillColor, top, left, width, height, figureText) {
		super(angle, scaleX, scaleY, strokeWidth, strokeColor, fillColor, top, left, figureText);
		this.originX = 'left';
		this.originY = 'top';
		this.width = width;
		this.height = height;
		this.figureText = figureText;
		this.type = FiguresEnum.TextFigure;
    }
}