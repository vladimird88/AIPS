import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Figure } from './Figures.js';
import { Rect } from './Figures.js';
import { Ellipse } from './Figures.js';
import { Circle } from './Figures.js';
import { Triangle } from './Figures.js';
import { Square } from './Figures.js';
import { Polygon } from './Figures.js';
import { Text } from './Figures.js';
import { FiguresEnum } from './Figures.js';

import { PageManager } from './PageManager.js';
import { DrawingManager } from './DrawingManager.js';
import { ChatManager } from './ChatManager.js';

import './main.html';

var messagesArray = [];

// import momentjs so we can return a formatted version of the creation date.
import moment from './moment.js';
// import the singularity model class so we can extend it
import { Model } from 'meteor/patrickml:singularity';

export class Project extends Model {
  constructor(doc) {
    super(doc);
    return this;
  }

  // formats the creation data to `MM/DD/YYYY' format
  formattedDate() {
    return moment(this.createdAt).format('MM/DD/YYYY');
  }
}

Template.messages.onCreated(function onContentCreated(event)
{
	ChatManager.initializeChat();
});

Template.messages.helpers({
	messages: function()
	{
		return ChatManager.getChatMesssages();
	}
});

	Template.input.events = {
	  'keydown input#message' : function (event) {
		if (event.which == 13) { // 13 is the enter key event
			var message = document.getElementById('message');
			if(message.value != '')
			{
				ChatManager.sendSingleMessage(message.value);
				message.value = '';
			}
		}
	  }
	}

Template.Content.onCreated(function onContentCreated(event)
{
	PageManager.openHomePage();
});

Template.Content.helpers({
	SelectedContent: function () 
	{
		return PageManager.getSelectedPage();
	}
});

Template.Navigation.events = 
{
	'click #HomeLink' : function (event) 
	{
        PageManager.openHomePage();
	},
	'click #NewCourseLink' : function (event) 
	{
        PageManager.openDrawingPage();
	},
	'click #AllCoursesLink' : function (event) 
	{
        PageManager.openAllCoursesPage();
	}
};

Template.NewCourse.onCreated(function onContentCreated(event)
{
	DrawingManager.initializeDrawing();
});


Template.NewCourse.events = 
{
	'click #deleteAll' : function (event)
	{
		DrawingManager.clearTable();
	},
	'click #deleteSelected' : function (event)
	{
		DrawingManager.deleteSelected();
	},
	'click #enableAll' : function (event) 
	{
		DrawingManager.setAllFiguresSelectable(true);
	},
	'click #disableAll' : function (event) 
	{
		DrawingManager.setAllFiguresSelectable(false);
	},
	'click #rectSelected' : function (event) 
	{
		var k = new Project();
        DrawingManager.selectFigure(FiguresEnum.RectFigure);
	},
	'click #circleSelected' : function (event) 
	{
        DrawingManager.selectFigure(FiguresEnum.CircleFigure);
	},
	'click #squareSelected' : function (event) 
	{
        DrawingManager.selectFigure(FiguresEnum.SquareFigure);
	},
	'click #triangleSelected' : function (event) 
	{
        DrawingManager.selectFigure(FiguresEnum.TriangleFigure);
	},
	'click #lineSelected' : function (event) 
	{
        DrawingManager.selectFigure(FiguresEnum.LineFigure);
	},
	'click #polygonSelected' : function (event) 
	{
        DrawingManager.selectFigure(FiguresEnum.PolygonFigure);
	},
	'click #textSelected' : function (event) 
	{
        DrawingManager.selectFigure(FiguresEnum.TextFigure);
	},
	'click #ellipseSelected' : function (event) 
	{
        DrawingManager.selectFigure(FiguresEnum.EllipseFigure);
	},
	'change #colorPickerStroke' : function (event) 
	{
		var selectedStrokeColor = $(event.target).val().replace("#","");
		DrawingManager.setStrokeColor(selectedStrokeColor);
	},
	'change #strokeAlpha' : function (event) 
	{
		var selectedStrokeAlpha = $(event.target).val()*0.01;
		DrawingManager.setStrokeAlpha(selectedStrokeAlpha);
	},
	'change #colorPickerFill' : function (event) 
	{
		var selectedFillColor = $(event.target).val().replace("#","");
		DrawingManager.setFillColor(selectedFillColor);
	},
	'change #fillAlpha' : function (event) 
	{
		var selectedFillAlpha = $(event.target).val()*0.01;
		DrawingManager.setFillAlpha(selectedFillAlpha);
	},
	'change #strokeWidth': function(event) {
		var selectedStrokeWidth = $(event.target).val();
		DrawingManager.setStrokeWidth(selectedStrokeWidth);
	}
};
