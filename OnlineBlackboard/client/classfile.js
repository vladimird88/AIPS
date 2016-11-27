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
