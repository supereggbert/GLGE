/*
GLGE WebGL Graphics Engine
Copyright (c) 2010, Paul Brunt
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
    * Neither the name of GLGE nor the
      names of its contributors may be used to endorse or promote products
      derived from this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL PAUL BRUNT BE LIABLE FOR ANY
DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
(INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/**
 * @fileOverview
 * @name glge_input.js
 * @author me@paulbrunt.co.uk
 */


 if(!GLGE){
	/**
	* @namespace Holds the functionality of the library
	*/
	var GLGE={};
}

(function(GLGE){
	/**
	* @class Creates a heightmap for a region of the world based on an image. Originally created as a quick and easy collision detection. At least until we have a better physics implementation.
	* @deprecated not intended as a permanent addition
	* @param {string} imageURL The url of the image to generate the hightmap for
	* @param {number} imageWidth The width of the image
	* @param {number} imageHeight The height of the image
	* @param {number} x1 The lower X bound of the height map in world coords
	* @param {number} x2 The upper X bound of the height map in world coords
	* @param {number} y1 The lower Y bound of the height map in world coords
	* @param {number} y2 The upper Y bound of the height map in world coords
	* @param {number} z1 The lower Z bound of the height map in world coords
	* @param {number} z2 The upper Z bound of the height map in world coords
	*/
	GLGE.HeightMap = function(imageURL, imageWidth, imageHeight, x1, x2, y1, y2, z1, z2){
		this.canvas = document.createElement("canvas");
		this.context = this.canvas.getContext('2d');
		this.canvas.width = imageWidth;
		this.canvas.height = imageHeight;
		this.minX = x1;
		this.maxX = x2;
		this.minY = y1;
		this.maxY = y2;
		this.minZ = z1;
		this.maxZ = z2;

		var image = new Image();
		image.heightmap = this;
		image.onload = function(e){
			this.heightmap.context.drawImage(this, 0, 0);
			this.heightmap.data = this.heightmap.context.getImageData(0, 0, this.heightmap.canvas.width, this.heightmap.canvas.height).data;
			this.heightmap.minImgValue = this.heightmap.data[0];
			this.heightmap.maxImgValue = this.heightmap.data[0];
			for (i = 0; i < this.heightmap.data.length; i += 4) {
				if (this.heightmap.data[i] < this.heightmap.minImgValue) {
					this.heightmap.minImgValue = this.heightmap.data[i];
				}
				if (this.heightmap.data[i] > this.heightmap.maxImgValue) {
			  		this.heightmap.maxImgValue = this.heightmap.data[i];
				}
			}
		};
		image.src = imageURL;
	}
	GLGE.HeightMap.prototype.canvas = null;
	GLGE.HeightMap.prototype.context = null;
	GLGE.HeightMap.prototype.minZ = null;
	GLGE.HeightMap.prototype.maxZ = null;
	GLGE.HeightMap.prototype.minY = null;
	GLGE.HeightMap.prototype.maxY = null;
	GLGE.HeightMap.prototype.minX = null;
	GLGE.HeightMap.prototype.maxX = null;
	GLGE.HeightMap.prototype.data = null;
	/**
	* Gets the pixel height at the specified image coords
	* @param {number} x the x image coord
	* @param {number} y the y image coord
	* @private
	*/
	GLGE.HeightMap.prototype.getPixelAt = function(x, y){
		if (this.data) {
			return (((this.data[(this.canvas.width * y + x) * 4]) - this.minImgValue) / (this.maxImgValue - this.minImgValue)) * (this.maxZ - this.minZ) + this.minZ;
		}
		else {
			return 0;
		}
	}
	/**
	* Function to get he height as specified x, y world coords
	* @param {number} x the x world coord
	* @param {number} y the y world coord
	* @returns {number} the height of the level in world units
	*/
	GLGE.HeightMap.prototype.getHeightAt = function(x, y){
		var retValue;
		if (this.lastx != undefined && x == this.lastx && y == this.lasty) {
			retValue = this.lastValue;
		}
		else {
			var imgX = Math.round((x - this.minX) / (this.maxX - this.minX) * this.canvas.width);
			var imgY = Math.round((y - this.minY) / (this.maxY - this.minY) * this.canvas.height);
			retValue = this.getPixelAt(imgX, imgY);
			this.lastValue = retValue;
		}
		this.lastx = x;
		this.lasty = y;
		return retValue;
	}
	/**
	* @class Monitors keyboard input for use in render loops
	*/
	GLGE.KeyInput=function(){
		if(!document.keyStates) document.keyStates=[];
		document.addEventListener("keydown",this.onKeyDown,false);
		document.addEventListener("keyup",this.onKeyUp,false);
	}
	/**
	* Tests if a key is pressed
	* @param {number} the keycode to check
	* @returns {boolean} key returns true if the key is being pressed
	*/
	GLGE.KeyInput.prototype.isKeyPressed=function(key){
		if(document.keyStates[key]) return true;
			else return false;
	};
	var skiptimmer=null;
	/**
	* document keydown event used to monitor the key states
	* @param {event} e the event being fired
	* @private
	*/
	GLGE.KeyInput.prototype.onKeyDown=function(e){
		document.keyStates[e.keyCode]=true;
	};
	/**
	* Document keyup event used to monitor the key states
	* @param {event} e the event being fired
	* @private
	*/
	GLGE.KeyInput.prototype.onKeyUp=function(e){
		document.keyStates[e.keyCode]=false;
	};
	/**
	* @class Monitors mouse input for use in render loops
	*/
	GLGE.MouseInput=function(element){
		this.element=element;
		this.element.mouseX=0;
		this.element.mouseY=0;
		if(!this.element.buttonState) this.element.buttonState=[];
		element.addEventListener("mousemove",this.onMouseMove,false);
		element.addEventListener("mousedown",this.onMouseDown,false);
		element.addEventListener("mouseup",this.onMouseUp,false);
	}
	GLGE.MouseInput.prototype.element=null;
	/**
	* Elements mousemove event used to monitor the mouse states
	* @param {event} e the event being fired
	* @private
	*/
	GLGE.MouseInput.prototype.onMouseMove=function(e){
		this.mouseX=e.clientX;
		this.mouseY=e.clientY;
	}
	/**
	* Elements mousedown event used to monitor the mouse states
	* @param {event} e the event being fired
	* @private
	*/
	GLGE.MouseInput.prototype.onMouseDown=function(e){
		this.buttonState[e.button]=true;
	}
	/**
	* Elements mouseup event used to monitor the mouse states
	* @param {event} e the event being fired
	* @private
	*/
	GLGE.MouseInput.prototype.onMouseUp=function(e){
		this.buttonState[e.button]=false;
	}
	/**
	* Tests if a mouse button is pressed
	* @param {number} button the button to check
	* @returns {boolean} returns true if the button is being pressed
	*/
	GLGE.MouseInput.prototype.isButtonDown=function(button){
		if(this.element.buttonState[button]) return true;
			else return false;
	}
	/**
	* Gets the mouse coords
	* @returns {object} the current mouse coors
	*/
	GLGE.MouseInput.prototype.getMousePosition=function(){
		return {x:this.element.mouseX,y:this.element.mouseY}
	}

	/**
	* @constant 
	* @description Enumeration for the left mouse button
	*/
	GLGE.MI_LEFT=0;
	/**
	* @constant 
	* @description Enumeration for the middle mouse button
	*/
	GLGE.MI_MIDDLE=1;
	/**
	* @constant 
	* @description Enumeration for the right mouse button
	*/
	GLGE.MI_RIGHT=2;

	/**
	* @constant 
	* @description Enumeration for the backspace key
	*/
	GLGE.KI_BACKSPACE=8;
	/**
	* @constant 
	* @description Enumeration for the tab key
	*/
	GLGE.KI_TAB=9;
	/**
	* @constant 
	* @description Enumeration for the enter key
	*/
	GLGE.KI_ENTER=13;
	/**
	* @constant 
	* @description Enumeration for the shift key
	*/
	GLGE.KI_SHIFT=16;
	/**
	* @constant 
	* @description Enumeration for the ctrl key
	*/
	GLGE.KI_CTRL=17;
	/**
	* @constant 
	* @description Enumeration for the alt key
	*/
	GLGE.KI_ALT=18;
	/**
	* @constant 
	* @description Enumeration for the pause/break key
	*/
	GLGE.KI_PAUSE_BREAK=19;
	/**
	* @constant 
	* @description Enumeration for the caps lock key
	*/
	GLGE.KI_CAPS_LOCK=20;
	/**
	* @constant 
	* @description Enumeration for the escape key
	*/
	GLGE.KI_ESCAPE=27;
	/**
	* @constant 
	* @description Enumeration for the page up key
	*/
	GLGE.KI_PAGE_UP=33;
	/**
	* @constant 
	* @description Enumeration for the page down key
	*/
	GLGE.KI_PAGE_DOWN=34;
	/**
	* @constant 
	* @description Enumeration for the end key
	*/
	GLGE.KI_END=35;
	/**
	* @constant 
	* @description Enumeration for the home key
	*/
	GLGE.KI_HOME=36;
	/**
	* @constant 
	* @description Enumeration for the left arrow key
	*/
	GLGE.KI_LEFT_ARROW=37;
	/**
	* @constant 
	* @description Enumeration for the up arrow key
	*/
	GLGE.KI_UP_ARROW=38;
	/**
	* @constant 
	* @description Enumeration for the right arrow key
	*/
	GLGE.KI_RIGHT_ARROW=39;
	/**
	* @constant 
	* @description Enumeration for the down arrow key
	*/
	GLGE.KI_DOWN_ARROW=40;
	/**
	* @constant 
	* @description Enumeration for the insert key
	*/
	GLGE.KI_INSERT=45;
	/**
	* @constant 
	* @description Enumeration for the delete key
	*/
	GLGE.KI_DELETE=46;
	/**
	* @constant 
	* @description Enumeration for the 0 key
	*/
	GLGE.KI_0=48;
	/**
	* @constant 
	* @description Enumeration for the 1 key
	*/
	GLGE.KI_1=49;
	/**
	* @constant 
	* @description Enumeration for the 2 key
	*/
	GLGE.KI_2=50;
	/**
	* @constant 
	* @description Enumeration for the 3 key
	*/
	GLGE.KI_3=51;
	/**
	* @constant 
	* @description Enumeration for the 4 key
	*/
	GLGE.KI_4=52;
	/**
	* @constant 
	* @description Enumeration for the 5 key
	*/
	GLGE.KI_5=53;
	/**
	* @constant 
	* @description Enumeration for the 6 key
	*/
	GLGE.KI_6=54;
	/**
	* @constant 
	* @description Enumeration for the 7 key
	*/
	GLGE.KI_7=55;
	/**
	* @constant 
	* @description Enumeration for the 8 key
	*/
	GLGE.KI_8=56;
	/**
	* @constant 
	* @description Enumeration for the 9 key
	*/
	GLGE.KI_9=57;
	/**
	* @constant 
	* @description Enumeration for the a key
	*/
	GLGE.KI_A=65;
	/**
	* @constant 
	* @description Enumeration for the b key
	*/
	GLGE.KI_B=66;
	/**
	* @constant 
	* @description Enumeration for the c key
	*/
	GLGE.KI_C=67;
	/**
	* @constant 
	* @description Enumeration for the d key
	*/
	GLGE.KI_D=68;
	/**
	* @constant 
	* @description Enumeration for the e key
	*/
	GLGE.KI_E=69;
	/**
	* @constant 
	* @description Enumeration for the f key
	*/
	GLGE.KI_F=70;
	/**
	* @constant 
	* @description Enumeration for the g key
	*/
	GLGE.KI_G=71;
	/**
	* @constant 
	* @description Enumeration for the h key
	*/
	GLGE.KI_H=72;
	/**
	* @constant 
	* @description Enumeration for the i key
	*/
	GLGE.KI_I=73;
	/**
	* @constant 
	* @description Enumeration for the j key
	*/
	GLGE.KI_J=74;
	/**
	* @constant 
	* @description Enumeration for the k key
	*/
	GLGE.KI_K=75;
	/**
	* @constant 
	* @description Enumeration for the l key
	*/
	GLGE.KI_L=76;
	/**
	* @constant 
	* @description Enumeration for the m key
	*/
	GLGE.KI_M=77;
	/**
	* @constant 
	* @description Enumeration for the n key
	*/
	GLGE.KI_N=78;
	/**
	* @constant 
	* @description Enumeration for the o key
	*/
	GLGE.KI_O=79;
	/**
	* @constant 
	* @description Enumeration for the p key
	*/
	GLGE.KI_P=80;
	/**
	* @constant 
	* @description Enumeration for the q key
	*/
	GLGE.KI_Q=81;
	/**
	* @constant 
	* @description Enumeration for the r key
	*/
	GLGE.KI_R=82;
	/**
	* @constant 
	* @description Enumeration for the s key
	*/
	GLGE.KI_S=83;
	/**
	* @constant 
	* @description Enumeration for the t key
	*/
	GLGE.KI_T=84;
	/**
	* @constant 
	* @description Enumeration for the u key
	*/
	GLGE.KI_U=85;
	/**
	* @constant 
	* @description Enumeration for the v key
	*/
	GLGE.KI_V=86;
	/**
	* @constant 
	* @description Enumeration for the w key
	*/
	GLGE.KI_W=87;
	/**
	* @constant 
	* @description Enumeration for the x key
	*/
	GLGE.KI_X=88;
	/**
	* @constant 
	* @description Enumeration for the y key
	*/
	GLGE.KI_Y=89;
	/**
	* @constant 
	* @description Enumeration for the z key
	*/
	GLGE.KI_Z=90;
	/**
	* @constant 
	* @description Enumeration for the left window key key
	*/
	GLGE.KI_LEFT_WINDOW_KEY=91;
	/**
	* @constant 
	* @description Enumeration for the right window key key
	*/
	GLGE.KI_RIGHT_WINDOW_KEY=92;
	/**
	* @constant 
	* @description Enumeration for the select key key
	*/
	GLGE.KI_SELECT_KEY=93;
	/**
	* @constant 
	* @description Enumeration for the numpad 0 key
	*/
	GLGE.KI_NUMPAD_0=96;
	/**
	* @constant 
	* @description Enumeration for the numpad 1 key
	*/
	GLGE.KI_NUMPAD_1=97;
	/**
	* @constant 
	* @description Enumeration for the numpad 2 key
	*/
	GLGE.KI_NUMPAD_2=98;
	/**
	* @constant 
	* @description Enumeration for the numpad 3 key
	*/
	GLGE.KI_NUMPAD_3=99;
	/**
	* @constant 
	* @description Enumeration for the numpad 4 key
	*/
	GLGE.KI_NUMPAD_4=100;
	/**
	* @constant 
	* @description Enumeration for the numpad 5 key
	*/
	GLGE.KI_NUMPAD_5=101;
	/**
	* @constant 
	* @description Enumeration for the numpad 6 key
	*/
	GLGE.KI_NUMPAD_6=102;
	/**
	* @constant 
	* @description Enumeration for the numpad 7 key
	*/
	GLGE.KI_NUMPAD_7=103;
	/**
	* @constant 
	* @description Enumeration for the numpad 8 key
	*/
	GLGE.KI_NUMPAD_8=104;
	/**
	* @constant 
	* @description Enumeration for the numpad 9 key
	*/
	GLGE.KI_NUMPAD_9=105;
	/**
	* @constant 
	* @description Enumeration for the multiply key
	*/
	GLGE.KI_MULTIPLY=106;
	/**
	* @constant 
	* @description Enumeration for the add key
	*/
	GLGE.KI_ADD=107;
	/**
	* @constant 
	* @description Enumeration for the subtract key
	*/
	GLGE.KI_SUBTRACT=109;
	/**
	* @constant 
	* @description Enumeration for the decimal point key
	*/
	GLGE.KI_DECIMAL_POINT=110;
	/**
	* @constant 
	* @description Enumeration for the divide key
	*/
	GLGE.KI_DIVIDE=111;
	/**
	* @constant 
	* @description Enumeration for the f1 key
	*/
	GLGE.KI_F1=112;
	/**
	* @constant 
	* @description Enumeration for the f2 key
	*/
	GLGE.KI_F2=113;
	/**
	* @constant 
	* @description Enumeration for the f3 key
	*/
	GLGE.KI_F3=114;
	/**
	* @constant 
	* @description Enumeration for the f4 key
	*/
	GLGE.KI_F4=115;
	/**
	* @constant 
	* @description Enumeration for the f5 key
	*/
	GLGE.KI_F5=116;
	/**
	* @constant 
	* @description Enumeration for the f6 key
	*/
	GLGE.KI_F6=117;
	/**
	* @constant 
	* @description Enumeration for the f7 key
	*/
	GLGE.KI_F7=118;
	/**
	* @constant 
	* @description Enumeration for the f8 key
	*/
	GLGE.KI_F8=119;
	/**
	* @constant 
	* @description Enumeration for the f9 key
	*/
	GLGE.KI_F9=120;
	/**
	* @constant 
	* @description Enumeration for the f10 key
	*/
	GLGE.KI_F10=121;
	/**
	* @constant 
	* @description Enumeration for the f11 key
	*/
	GLGE.KI_F11=122;
	/**
	* @constant 
	* @description Enumeration for the f12 key
	*/
	GLGE.KI_F12=123;
	/**
	* @constant 
	* @description Enumeration for the num lock key
	*/
	GLGE.KI_NUM_LOCK=144;
	/**
	* @constant 
	* @description Enumeration for the scroll lock key
	*/
	GLGE.KI_SCROLL_LOCK=145;
	/**
	* @constant 
	* @description Enumeration for the semi-colon key
	*/
	GLGE.KI_SEMI_COLON=186;
	/**
	* @constant 
	* @description Enumeration for the equal sign key
	*/
	GLGE.KI_EQUAL_SIGN=187;
	/**
	* @constant 
	* @description Enumeration for the comma key
	*/
	GLGE.KI_COMMA=188;
	/**
	* @constant 
	* @description Enumeration for the dash key
	*/
	GLGE.KI_DASH=189;
	/**
	* @constant 
	* @description Enumeration for the period key
	*/
	GLGE.KI_PERIOD=190;
	/**
	* @constant 
	* @description Enumeration for the forward slash key
	*/
	GLGE.KI_FORWARD_SLASH=191;
	/**
	* @constant 
	* @description Enumeration for the grave accent key
	*/
	GLGE.KI_GRAVE_ACCENT=192;
	/**
	* @constant 
	* @description Enumeration for the open bracket key
	*/
	GLGE.KI_OPEN_BRACKET=219;
	/**
	* @constant 
	* @description Enumeration for the back slash key
	*/
	GLGE.KI_BACK_SLASH=220;
	/**
	* @constant 
	* @description Enumeration for the close braket key
	*/
	GLGE.KI_CLOSE_BRAKET=221;
	/**
	* @constant 
	* @description Enumeration for the single quote key
	*/
	GLGE.KI_SINGLE_QUOTE=222;
	/**
	* @constant 
	* @description Enumeration for the space key
	*/
	GLGE.KI_SPACE=32;
	
	
	//code by @paul_irish
	if ( !window.requestAnimationFrame ) {

		window.requestAnimationFrame = ( function() {

			return window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element ) {

				window.setTimeout( callback, 1000 / 60 );

			};

		} )();

	}
	
})(GLGE);



