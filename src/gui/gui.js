/*
Copyright (c) 2011 Martin Ruenz

Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
*/

/**
 * @fileOverview
 * @name widget.js
 * @author seamonkey@uni-koblenz.de
 */

(function(GLGE){
if(typeof(GLGE.GUI) == "undefined"){
	/**
	* @namespace Holds the functionality of the GUI
	*/
	GLGE.GUI = {};
}
(function(GUI){




/**
 * Replace as much gui-objects as possible, with those provided by the library
 */
GUI.useLibrary = function(library){
	if((library == "jQuery") && jQuery) {  
	
		// progressbar
		GUI.Progressbar.prototype.setValue = function(value){$(this.domRoot).progressbar({'value': value });}
		GUI.Progressbar.prototype.init = function(){ $(this.domRoot).progressbar({value: 0 }); }	
	}
	// TODO: Support for more libraries and widgets
}


/**
 * @class Widget	Widgets are gui objects like progressbars or sliders
 */
GUI.Widget = function(){
	this.domRoot = document.createElement('div');
	this.domRoot.setAttribute('class','glge-gui-widget-root');
	
	this.init();
}
GUI.Widget.prototype.domRoot = null;

GUI.Widget.prototype.init = function(){};


/**
 * @class Progressbar	A progressbar widget
 */
GUI.Progressbar = function(){
	// call super constructor
	this.baseclass.call(this);
	
	this.domRoot.className += ' glge-gui-progressbar';
}
GUI.Progressbar.prototype.value = 0;

/**
 * Set the progress value
 * @param {number} value	progress value
 */
GUI.Progressbar.prototype.setValue = function(value){
	this.value = value;
}

GLGE.augment(GUI.Widget,GUI.Progressbar);


})(GLGE.GUI);})(GLGE);
