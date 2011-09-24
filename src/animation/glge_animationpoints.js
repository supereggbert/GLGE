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
 * @name glge_animationpoints.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){





/**
* @class A bezier class to add points to the Animation Curve 
* @param {string} uid a unique string to identify this object
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.BezTriple=function(uid){
	GLGE.Assets.registerAsset(this,uid);
};
GLGE.augment(GLGE.QuickNotation,GLGE.BezTriple);
GLGE.augment(GLGE.JSONLoader,GLGE.BezTriple);

GLGE.BezTriple.prototype.className="BezTriple";
/**
* set the x1-coord
* @param {number} x x1-coord control point
*/
GLGE.BezTriple.prototype.setX1=function(x){
	this.x1=parseFloat(x);
	return this;
};
/**
* set the y1-coord
* @param {number} y y1-coord control point
*/
GLGE.BezTriple.prototype.setY1=function(y){
	this.y1=parseFloat(y);
	return this;
};
/**
* set the x2-coord
* @param {number} x x2-coord control point
*/
GLGE.BezTriple.prototype.setX2=function(x){
	this.x=parseFloat(x);
	return this;
};
/**
* set the y2-coord
* @param {number} y y2-coord control point
*/
GLGE.BezTriple.prototype.setY2=function(y){
	this.y=parseFloat(y);
	return this;
};
/**
* set the x3-coord
* @param {number} x x3-coord control point
*/
GLGE.BezTriple.prototype.setX3=function(x){
	this.x3=parseFloat(x);
	return this;
};
/**
* set the y3-coord
* @param {number} y y3-coord control point
*/
GLGE.BezTriple.prototype.setY3=function(y){
	this.y3=parseFloat(y);
	return this;
};


/**
* @class A LinearPoint class to add points to the Animation Curve 
* @param {string} uid unique string for this class
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.LinearPoint=function(uid){
	//GLGE.Assets.registerAsset(this,uid);
};
GLGE.augment(GLGE.QuickNotation,GLGE.LinearPoint);
GLGE.augment(GLGE.JSONLoader,GLGE.LinearPoint);
GLGE.LinearPoint.prototype.className="LinearPoint";
GLGE.LinearPoint.prototype.x=0;
GLGE.LinearPoint.prototype.y=0;
/**
* set the x-coord
* @param {number} x x-coord control point
*/
GLGE.LinearPoint.prototype.setX=function(x){
	this.x=parseFloat(x);
	return this;
};
/**
* set the y-coord
* @param {number} y y-coord control point
*/
GLGE.LinearPoint.prototype.setY=function(y){
	this.y=parseFloat(y);
	return this;
};


/**
* @class A StepPoint class to add points to the Animation Curve 
* @param {number} x x-coord control point
* @param {object} value value of control point
*/
GLGE.StepPoint=function(x,value){
	this.x=parseFloat(x);
	this.y=value;
};

})(GLGE);
