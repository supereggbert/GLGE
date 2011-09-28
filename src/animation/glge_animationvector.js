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
 * @name glge_animationvector.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){



/**
* @class The AnimationVectors class allows you to specify the 2D Animation curves that define specific channels of animation within the engine. 
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.AnimationVector=function(uid){
    this.curves={};
    GLGE.Assets.registerAsset(this,uid);
}
GLGE.augment(GLGE.QuickNotation,GLGE.AnimationVector);
GLGE.augment(GLGE.JSONLoader,GLGE.AnimationVector);
GLGE.AnimationVector.prototype.curves={};
GLGE.AnimationVector.prototype.frames=250;
GLGE.AnimationVector.prototype.startFrame=0;

/**
* Adds an Animation Curve to a channel 
* @param {String} channel The name of the curve to be added
* @param {GLGE.AnimationCurve} curve The animation curve to add
*/
GLGE.AnimationVector.prototype.addAnimationCurve=function(curve){
	this.curves[curve.channel]=curve;
	return this;
}
/**
* Removes an Animation Curve form a channel
* @param {String} channel The name of the curve to be removed
*/
GLGE.AnimationVector.prototype.removeAnimationCurve=function(name){
	delete(this.curves[name]);
}
/**
* Sets the number of frames in the animation
* @param {number} value The number of frames in the animation
*/
GLGE.AnimationVector.prototype.setFrames=function(value){
	this.frames=value;
	return this;
}
/**
* Sets the number of frames in the animation
* @returns {number} The number of frames in the animation
*/
GLGE.AnimationVector.prototype.getFrames=function(){
	return this.frames;
}

/**
* Sets the start frame
* @param {number} value The starting frame for the animation
*/
GLGE.AnimationVector.prototype.setStartFrame=function(value){
	this.startFrame=value;
	return this;
}
/**
* Gets the start fames
* @returns {number} The starting frame for the animation
*/
GLGE.AnimationVector.prototype.getStartFrame=function(){
	return this.startFrame;
}

})(GLGE);
