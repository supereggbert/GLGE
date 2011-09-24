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
 * @name gadget.js
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
 * @class Gadget	Gadgets are more complex widgets. One could think of them as windows. They may contain widgets.
 */
GUI.Gadget=function(){

	// setup new DOM-Object
	
	// root
	this.domGadgetRoot = document.createElement('div');
	this.domGadgetRoot.setAttribute('class','glge-gui-gadget-root');
	this.domGadgetRoot.style.position = 'absolute';
	this.domGadgetRoot.style.top = '0px';

	// Outer Wrapper
	this.domGadgetOuterWrapper = document.createElement('div');
	this.domGadgetOuterWrapper.setAttribute('class','glge-gui-gadget-OuterWrapper');
	this.domGadgetOuterWrapper.style.position = 'relative';
	this.domGadgetRoot.appendChild(this.domGadgetOuterWrapper);
	
	// Inner Wrapper
	this.domGadgetInnerWrapper = document.createElement('div');
	this.domGadgetInnerWrapper.setAttribute('class','glge-gui-gadget-InnerWrapper');
	this.domGadgetInnerWrapper.style.position = 'relative';	
	this.domGadgetOuterWrapper.appendChild(this.domGadgetInnerWrapper);
	
	// object	
	this.domGadgetObject = document.createElement('div');
	this.domGadgetObject.setAttribute('class','glge-gui-gadget');
	this.domGadgetObject.style.position = 'relative';
	this.domGadgetInnerWrapper.appendChild(this.domGadgetObject);
	
	// footer
	this.domGadgetFooter = document.createElement('div');
	this.domGadgetFooter.setAttribute('class','glge-gui-gadget-footer');
	this.domGadgetFooter.style.clear = 'both';
	this.domGadgetRoot.appendChild(this.domGadgetFooter);
	
	// variables

	this.position = {};
	this.position.x = 'middle';
	this.position.y = 'middle';
	
	this.updatePosition();
}


GUI.Gadget.prototype.domGadgetRoot = null; // div: attached to dom
GUI.Gadget.prototype.domGadgetOuterWrapper = null; // div: wrapper for css (vertical align)
GUI.Gadget.prototype.domGadgetInnerWrapper = null; // div: wrapper for css (horizontal align)
GUI.Gadget.prototype.domGadgetObject = null; // div: actual gadget
GUI.Gadget.prototype.domGadgetFooter = null; // div: footer
GUI.Gadget.prototype.domGadgetParent = null; // parent object, already in dom
GUI.Gadget.prototype.position = null; // position.x, position.y

/**
 * This function sets the position of the gadget
 * @param {object} position	position.x, possible values: "left", "middle", "right", number<br /> 
 *				position.y, possible values: "top", "middle", "bottom", number
 */
GUI.Gadget.prototype.setPosition = function(position){
	if(position){
		if(position.x)
			this.position.x = position.x;
		if(position.y)
			this.position.y = position.y;
	}
	this.updatePosition();
}

/**
 * This function changes css attributes in order to position the gadget
 * @param {object} position	position.x, possible values: "left", "middle", "right"<br /> 
 *				position.y, possible values: "top", "middle", "bottom"
 */
 // TODO: Possibility to set the position absolute (e.g. x= 15, y=20)
GUI.Gadget.prototype.updatePosition = function(){

	if(!this.domGadgetParent) return;
	
	var parentPosition = '';
	if(document.defaultView && document.defaultView.getComputedStyle)
		parentPosition = document.defaultView.getComputedStyle(this.domGadgetParent,null).getPropertyValue('position');
	else if (this.domGadgetParent.currentStyle)
		parentPosition = this.domGadgetParent.currentStyle['position'];

	if(parentPosition == 'absolute'){
	
		this.domGadgetRoot.style.width = '100%';
		this.domGadgetRoot.style.height = '100%';
		this.domGadgetRoot.style.display = 'table';
		
		this.domGadgetOuterWrapper.style.display = 'table-cell';
	
		if(this.position.y == "top"){
			this.domGadgetOuterWrapper.style.verticalAlign = 'top';
		}
		else if(this.position.y == "middle"){
			this.domGadgetOuterWrapper.style.verticalAlign = 'middle';
		}
		else if(this.position.y == "bottom"){
			this.domGadgetOuterWrapper.style.verticalAlign = 'bottom';
		}
	
		if(this.position.x == "left"){
	
			this.domGadgetInnerWrapper.style.cssFloat = 'left';
			this.domGadgetInnerWrapper.style.left = '0px';
		
			this.domGadgetObject.style.cssFloat = 'left';
			this.domGadgetObject.style.left = '0px';
		}
		else if(this.position.x == "middle"){
	
			this.domGadgetInnerWrapper.style.cssFloat = 'right';
			this.domGadgetInnerWrapper.style.right = '50%';
		
			this.domGadgetObject.style.cssFloat = 'left';
			this.domGadgetObject.style.right = '-50%';
		}
		else if(this.position.x == "right"){
	
			this.domGadgetInnerWrapper.style.cssFloat = 'right';
			this.domGadgetInnerWrapper.style.right = '0px';
		
			this.domGadgetObject.style.cssFloat = 'right';
			this.domGadgetObject.style.right = '0px';
		}
	}else{ // TODO: css would be much better!

		if(this.position.y == "top"){
			this.domGadgetRoot.style.top = this.domGadgetParent.offsetTop;
		}
		else if(this.position.y == "middle"){
			this.domGadgetRoot.style.top = this.domGadgetParent.offsetTop + this.domGadgetParent.offsetHeight / 2 - this.domGadgetRoot.offsetHeight / 2;
		}
		else if(this.position.y == "bottom"){
			this.domGadgetRoot.style.top = this.domGadgetParent.offsetTop + this.domGadgetParent.offsetHeight - this.domGadgetRoot.offsetHeight;
		}
	
		if(this.position.x == "left"){
			this.domGadgetRoot.style.left = this.domGadgetParent.offsetLeft;
		}
		else if(this.position.x == "middle"){
			this.domGadgetRoot.style.left = this.domGadgetParent.offsetLeft + this.domGadgetParent.offsetWidth / 2 - this.domGadgetRoot.offsetWidth / 2;
		}
		else if(this.position.x == "right"){
			this.domGadgetRoot.style.left = this.domGadgetParent.offsetLeft + this.domGadgetParent.offsetWidth - this.domGadgetRoot.offsetWidth;
		}
	}
}

/**
 * Add Gadget to DOM
 * @param {object} element	Parent element of the gadget
 * @param {object} [position]	position.x, possible values: "left", "middle", "right"<br /> 
 *				position.y, possible values: "top", "middle", "bottom"
 */
GUI.Gadget.prototype.addToDOM = function(element, position){

	this.domGadgetParent = element;
	
	// add gadget to the document
	this.domGadgetParent.appendChild(this.domGadgetRoot);	
	
	this.setPosition(position);
}


})(GLGE.GUI);})(GLGE);
