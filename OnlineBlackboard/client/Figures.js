
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
		this.type = FiguresEnum.CircleFigure;
    }
}

export class Ellipse extends Figure {
  constructor(strokeWidth, strokeColor, fillColor, top, left, radiusX, radiusY) {
		super(strokeWidth, strokeColor, fillColor, top, left);
		this.radiusX = radiusX;
		this.radiusY = radiusY;
		this.originX = 'center';
		this.originY = 'center';
		this.type = FiguresEnum.EllipseFigure;
    }
}

export class Square extends Figure {
  constructor(strokeWidth, strokeColor, fillColor, top, left, width) {
		super(strokeWidth, strokeColor, fillColor, top, left);
		this.width = width;
		this.originX = 'left';
		this.originY = 'top';
		this.type = FiguresEnum.SquareFigure;
    }
}

export class Rect extends Square {
  constructor(strokeWidth, strokeColor, fillColor, top, left, width, height) {
		super(strokeWidth, strokeColor, fillColor, top, left, width);
		this.width = width;
		this.height = height;
		this.originX = 'left';
		this.originY = 'top';
		this.type = FiguresEnum.RectFigure;
    }
}
export class Triangle extends Figure {
  constructor(strokeWidth, strokeColor, fillColor, top, left, width, height) {
		super(strokeWidth, strokeColor, fillColor, top, left);
		this.width = width;
		this.height = height;
		this.originX = 'left';
		this.originY = 'top';
		this.type = FiguresEnum.TriangleFigure;
    }
}

export class Polygon extends Figure {
  constructor(strokeWidth, strokeColor, fillColor, top, left, numberOfSides, polygonRadius) {
		super(strokeWidth, strokeColor, fillColor, top, left);
		this.originX = 'left';
		this.originY = 'top';
		this.numberOfSides = numberOfSides;
		this.polygonRadius = polygonRadius;
		this.type = FiguresEnum.PolygonFigure;
    }
}

export class Text extends Figure {
  constructor(strokeWidth, strokeColor, fillColor, top, left, width, height, text) {
		super(strokeWidth, strokeColor, fillColor, top, left);
		this.originX = 'left';
		this.originY = 'top';
		this.width = width;
		this.height = height;
		this.text = text;
		this.type = FiguresEnum.TextFigure;
    }
}