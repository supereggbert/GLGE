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
 * @name glge_actionchannel.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){


/**
* @class Class defining a channel of animation for an action
* @param {string} uid a unique reference string for this object
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.ActionChannel=function(uid){
	GLGE.Assets.registerAsset(this,uid);
}
GLGE.augment(GLGE.QuickNotation,GLGE.ActionChannel);
GLGE.augment(GLGE.JSONLoader,GLGE.ActionChannel);
/**
* Sets the name/object of the bone channel
* @param {string} name the name of the bone channel
*/
GLGE.ActionChannel.prototype.setTarget=function(object){
	this.target=object;
};
/**
* Sets the animation for this channel
* @param {GLGE.AnimationVector} animation the animation vector for this channel
*/
GLGE.ActionChannel.prototype.setAnimation=function(animation){
	this.animation=animation;
};
/**
* Gets the name/object of the bone channel
* @returns {string} the name of the bone channel
*/
GLGE.ActionChannel.prototype.getTarget=function(){
	return this.target;
};
/**
* Gets the animation vector for this channel
* @returns {GLGE.AnimationVector} the animation vector for this channel
*/
GLGE.ActionChannel.prototype.getAnimation=function(){
	return this.animation;
};

})(GLGE);
