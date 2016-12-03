
import { DrawingManager } from './DrawingManager.js';

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
			canvas = new fabric.Canvas('canvas');
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