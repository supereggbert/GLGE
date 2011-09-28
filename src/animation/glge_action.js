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
 * @name glge_action.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){



/**
* @class Class to describe and action on a skeleton
* @param {string} uid a unique reference string for this object
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.Action=function(uid){
	this.channels=[];
	GLGE.Assets.registerAsset(this,uid);
};
GLGE.augment(GLGE.QuickNotation,GLGE.Action);
GLGE.augment(GLGE.JSONLoader,GLGE.Action);
/**
 * @name Action#animFinished
 * @event
 * @param {object} data
 */
GLGE.augment(GLGE.Events,GLGE.Action);

/**
* Starts playing the action
*/
GLGE.Action.prototype.start=function(blendTime,loop,names){
	if(!loop) loop=false;
	if(!blendTime) blendTime=0;
	var channels=this.channels;
	var start=(new Date()).getTime();
	this.animFinished=false;
	
	for(var i=0;i<channels.length;i++){
		var animation=channels[i].getAnimation();
		var action=this;
		var channel=channels[i];
		var target=channel.getTarget();
		if(typeof target=="string"){
			if(names && names[target]){
				target=names[target];
			}
		}
		var closure={};
		closure.finishEvent=function(data){
			target.removeEventListener("animFinished",closure.finishEvent);
			if(!action.animFinished && target.animation==animation){
				action.fireEvent("animFinished",{});
				action.animFinished=true;
			}
		}
		target.addEventListener("animFinished",closure.finishEvent);
		
		target.setAnimation(animation,blendTime,start);
		target.setLoop(loop);

	}
};
/**
* Sets the start frame for all animations
* @param {number} startFrame the starting frame for the animation
*/
GLGE.Action.prototype.setStartFrame=function(startFrame){
	for(var i=0;i<this.channels.length;i++){
		this.channels[i].getAnimation().setStartFrame(startFrame);
	}
	return this;
};
/**
* Sets the number of frames to play
* @param {number} frame the number of frames to play
*/
GLGE.Action.prototype.setFrames=function(frames){
	for(var i=0;i<this.channels.length;i++){
		this.channels[i].getAnimation().setFrames(frames);
	}
	return this;
};


/**
* Adds and action channel to this action
* @param {GLGE.ActionChannel} channel the channel to be added
*/
GLGE.Action.prototype.addActionChannel=function(channel){
	this.channels.push(channel);
	return this;
};
/**
* Removes and action channel to this action
* @param {GLGE.ActionChannel} channel the channel to be removed
*/
GLGE.Action.prototype.removeActionChannel=function(channel){
	for(var i=0;i<this.channels.length;i++){
		if(this.channels[i]==channels){
			this.channels.splice(i,1);
			break;
		}
	}
};


})(GLGE);
