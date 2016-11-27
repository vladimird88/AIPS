import { Meteor } from 'meteor/meteor';

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


Meteor.startup(() => {
  // code to run on server at startup
	Meteor.publish('figures', function tasksPublication() {
		return Figures.find();
	});
	Meteor.methods({
	
		saveCircleInDB: function (circleFigure) {
			Figures.insert(circleFigure,function(err,docsInserted)
				{
					if(!err)
					{
						//curentObjectId = docsInserted;
					}
				});
		},
		saveEllipseInDB: function (xPosition, yPosition, xRadius, yRadius, strokeWidth, strokeColor, fillColor) {
			Figures.insert({
					type: 5,
					top: yPosition,
					left: xPosition,
					xRadius: xRadius,
					yRadius: yRadius,
					strokeColor: strokeColor,
					fillColor: fillColor,
					stroke: strokeWidth,
					time: Date.now()
				},function(err,docsInserted)
				{
					if(!err)
					{
						//curentObjectId = docsInserted;
					}
				});
		},saveRectInDB: function (xPosition, yPosition, width, height, strokeWidth, strokeColor, fillColor) {
			Figures.insert({
					type: 1,
					top: yPosition,
					left: xPosition,
					width: width,
					strokeColor: strokeColor,
					fillColor: fillColor,
					height: height,
					stroke: strokeWidth,
					time: Date.now()
				},function(err,docsInserted)
				{
					if(!err)
					{
						//curentObjectId = docsInserted;
					}
				});
		},
		saveTriangleInDB: function (xPosition, yPosition, width, height, strokeWidth, strokeColor, fillColor) {
			Figures.insert({
					type: 3,
					top: yPosition,
					left: xPosition,
					width: width,
					strokeColor: strokeColor,
					fillColor: fillColor,
					height: height,
					stroke: strokeWidth,
					time: Date.now()
				},function(err,docsInserted)
				{
					if(!err)
					{
						//curentObjectId = docsInserted;
					}
				});
		}
	});
});
