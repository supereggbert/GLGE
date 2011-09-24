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
 * @name glge_animatable.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){



/**
* @class Animation class to agument animatiable objects 
* @augments GLGE.Events
*/
GLGE.Animatable=function(){
}
/**
 * @name GLGE.Animatable#animFinished
 * @event
 * @param {object} data
 */
GLGE.augment(GLGE.Events,GLGE.Animatable);

GLGE.Animatable.prototype.animationStart=null;
GLGE.Animatable.prototype.animation=null;
GLGE.Animatable.prototype.blendStart=0;
GLGE.Animatable.prototype.blendTime=0;
GLGE.Animatable.prototype.lastFrame=null;
GLGE.Animatable.prototype.frameRate=30;
GLGE.Animatable.prototype.loop=GLGE.TRUE;
GLGE.Animatable.prototype.paused=GLGE.FALSE;
GLGE.Animatable.prototype.pausedTime=null;
GLGE.Animatable.prototype.blendFunction=GLGE.LINEAR_BLEND;

/**
* Creates and sets an animation to blend to the properties. Useful for blending to a specific location for example:
* blendto({LocX:10,LocY:5,LocZ:10},2000);
* @param {object} properties The properties to blend
* @param {number} duration the duration of the blend
* @param {function} blendFunction[optional] the function used for blending defaults to GLGE.LINEAR_BLEND
*/
GLGE.Animatable.prototype.blendTo=function(properties,duration,blendFunction){
	if(!blendFunction) blendFunction=GLGE.LINEAR_BLEND;
	var animation=new GLGE.AnimationVector();
	var curve;
	var point;
	for(var prop in properties){
		curve=new GLGE.AnimationCurve();
		curve.setChannel(prop);
		point=new GLGE.LinearPoint();
		point.setX(1);
		point.setY(properties[prop]);
		curve.addPoint(point);
		animation.addAnimationCurve(curve);
	}
	this.setBlendFunction(blendFunction);
	this.setAnimation(animation,duration);
	return this;
}
/**
* Sets the animation blending function
* @param {function} value The blending function
*/
GLGE.Animatable.prototype.setBlendFunction=function(value){
	this.blendFunction=value;
	return this;
}
/**
* Gets the animation blending function
* @returns {function} the blending function
*/
GLGE.Animatable.prototype.getBlendFunction=function(){
	return this.blendFunction;
}

/**
* Sets the name of this object used for skinning
* @param {String} value The name to set
*/
GLGE.Animatable.prototype.setName=function(value){
	this.name=value;
	return this;
}
/**
* Gets the name of this object used for skinning
* @returns {String} the name
*/
GLGE.Animatable.prototype.getName=function(){
	return this.name;
}
/**
* gets the frame at the specified time
* @param {number} now the current time
*/
 GLGE.Animatable.prototype.getFrameNumber=function(now){
	if(!this.startFrame) this.startFrame=this.animation.startFrame;
	if(!this.animFrames) this.animFrames=this.animation.frames;
	var frame;
	if(!now) now=parseInt(new Date().getTime());
	if(this.animFrames>1){
		if(this.loop){
			frame=((parseFloat(now)-parseFloat(this.animationStart))/1000*this.frameRate)%(this.animFrames-1)+1+this.startFrame; 
		}else{
			frame=((parseFloat(now)-parseFloat(this.animationStart))/1000*this.frameRate)+1+this.startFrame; 
			if(frame>=(this.animFrames+this.startFrame)){
				frame=this.animFrames;
			}
		}
	}else{
		frame=1;
	}

	return Math.round(frame);
}
 
/**
* Sets the start frame for the animation overriding the animation default
* @param {number} startFrame the start frame
*/
 GLGE.Animatable.prototype.setStartFrame=function(startFrame,blendTime,loop){
	this.loop=loop;
	var starttime=parseInt(new Date().getTime());
	if(!blendTime) blendTime=0;
	if(blendTime>0){
		if(this.animation){
			this.blendInitValues=this.getInitialValues(this.animation,starttime);
			this.blendTime=blendTime;
		}
	}
	this.animationStart=starttime;
	this.lastFrame=null;
	this.animFinished=false;
	this.startFrame=startFrame;
	if(this.children){
		for(var i=0;i<this.children.length;i++){
			if(this.children[i].setStartFrame){
				this.children[i].setStartFrame(startFrame,blendTime,loop);
			}
		}
	}
	return this;
 }
 /**
* Sets the number of frames to play overriding the animation default
* @param {number} frames the number of frames
* @private
*/
 GLGE.Animatable.prototype.setFrames=function(frames){
	this.animFrames=frames;
	if(this.children){
		for(var i=0;i<this.children.length;i++){
			if(this.children[i].setFrames){
				this.children[i].setFrames(frames);
			}
		}
	}
	return this;l
 }
 
 /**
* gets the initial values for the animation vector for blending
* @param {GLGE.AnimationVector} animation The animation
* @private
*/
 GLGE.Animatable.prototype.getInitialValues=function(animation,time){
	var initValues={};
	
	if(this.animation){
		this.lastFrame=null;
		this.animate(time,true);
	}
	
	for(var property in animation.curves){
		if(this["get"+property]){
			initValues[property]=this["get"+property]();
		}
	}
	
	return initValues;
}
 
/**
* update animated properties on this object
*/
GLGE.Animatable.prototype.animate=function(now,nocache){
	if(!this.paused && this.animation){
		if(!now) now=parseInt(new Date().getTime());
		var frame=this.getFrameNumber(now);
		
		if(!this.animation.animationCache) this.animation.animationCache={};
		if(frame!=this.lastFrame || this.blendTime!=0){
			this.lastFrame=frame;
			if(this.blendTime==0){
				if(!this.animation.animationCache[frame] || nocache){
					this.animation.animationCache[frame]=[];
					if(this.animation.curves["LocX"] && this.animation.curves["LocY"] && this.animation.curves["LocZ"]
						&& this.animation.curves["ScaleX"] && this.animation.curves["ScaleY"] && this.animation.curves["ScaleZ"]
						&& this.animation.curves["QuatX"] && this.animation.curves["QuatY"] && this.animation.curves["QuatZ"] && this.animation.curves["QuatW"]){
						//just set matrix
						for(var property in this.animation.curves){
							if(this["set"+property]){
								var value=this.animation.curves[property].getValue(parseFloat(frame));
								switch(property){
									case "QuatX":
									case "QuatY":
									case "QuatZ":
									case "QuatW":
									case "LocX":
									case "LocY":
									case "LocZ":
									case "ScaleX":
									case "ScaleY":
									case "ScaleZ":
										break;
									default:
										this.animation.animationCache[frame].push({property:property,value:value});
										break;
								}
								this["set"+property](value);
							}	
						}
						this.animation.animationCache[frame].push({property:"StaticMatrix",value:this.getLocalMatrix()});
					}else{
						for(property in this.animation.curves){
							if(this["set"+property]){
								var value=this.animation.curves[property].getValue(parseFloat(frame));
								switch(property){
									case "QuatX":
									case "QuatY":
									case "QuatZ":
									case "QuatW":
									case "RotX":
									case "RotY":
									case "RotZ":
											var rot=true;
										break;
									default:
										this.animation.animationCache[frame].push({property:property,value:value});
										break;
								}
								this["set"+property](value);
							}	
						}
						if(rot){
							value=this.getRotMatrix();
							this.animation.animationCache[frame].push({property:"RotMatrix",value:value});
						}
					}
				}else{
					var cache=this.animation.animationCache[frame];
					for(var i=0;i<cache.length;i++){
						if(this["set"+cache[i].property]) this["set"+cache[i].property](cache[i].value);
					}
				}
			}else{
				var time=now-this.animationStart;
				if(time<this.blendTime){
					var blendfactor=time/this.blendTime;
					blendfactor=this.blendFunction(blendfactor);
					for(property in this.animation.curves){
						if(this["set"+property]){
							var value=this.animation.curves[property].getValue(parseFloat(frame));
							value=value*blendfactor+this.blendInitValues[property]*(1-blendfactor);
							this["set"+property](value);
						}	
					}
				}else{
					this.blendTime=0;
				}
			}
		}
	}
	if(this.children){
		for(var i=0; i<this.children.length;i++){
			if(this.children[i].animate){
				this.children[i].animate(now,nocache);
			}
		}
	}
	if(this.animation && !this.animFinished && this.blendTime==0 && this.animation.frames==frame && !nocache){
		this.animFinished=true;
		this.fireEvent("animFinished",{});
	}
}
/**
* Sets the animation vector of this object
* @param {GLGE.AnimationVector} animationVector the animation to apply to this object
* @param {number} blendDuration [Optional] the time in milliseconds to blend into this animation
* @param {number} starttime [Optional] the starting time of the animation
*/
GLGE.Animatable.prototype.setAnimation=function(animationVector,blendDuration,starttime){
	if(starttime==null) starttime=parseInt(new Date().getTime());
	if(!blendDuration) blendDuration=0;
	if(blendDuration>0){
		this.blendInitValues=this.getInitialValues(animationVector,starttime);
		this.blendTime=blendDuration;
	}
	this.animFrames=null;
	this.startFrame=null;
	this.animationStart=starttime;
	this.lastFrame=null;
	this.animation=animationVector;
	this.animFinished=false;
	return this;
}
/**
* Gets the animation vector of this object
* @returns {AnimationVector}
*/
GLGE.Animatable.prototype.getAnimation=function(){
	return this.animation;
}
/**
* Sets the frame rate of the animation
* @param  {number} value the frame rate to set
*/
GLGE.Animatable.prototype.setFrameRate=function(value){
	this.frameRate=value;
	if (this.children) {
		for (var i = 0; i < this.children.length; i++) {
			if (this.children[i].setFrameRate) {
				this.children[i].setFrameRate(value);
			}
		}
	}
	return this;
}
/**
* Gets the frame rate of the animation
* @return {number} the current frame rate
*/
GLGE.Animatable.prototype.getFrameRate=function(){
	return this.frameRate;
}
/**
* Sets the loop flag to GLGE.TRUE or GLGE.FALSE
* @param  {boolean} value 
*/
GLGE.Animatable.prototype.setLoop=function(value){
	this.loop=value;
	return this;
}
/**
* Gets the loop flag
* @return {boolean}
*/
GLGE.Animatable.prototype.getLoop=function(){
	return this.loop;
}
/**
* @function is looping? @see GLGE.Animatable#getLoop
*/
GLGE.Animatable.prototype.isLooping=GLGE.Animatable.prototype.getLoop;
 
/**
* Sets the paused flag to GLGE.TRUE or GLGE.FALSE
* @param  {boolean} value 
*/
GLGE.Animatable.prototype.setPaused=function(value){
	if(value) this.pauseTime=parseInt(new Date().getTime());
		else this.animationStart=this.animationStart+(parseInt(new Date().getTime())-this.pauseTime);
	this.paused=value;
	return this;
}
/**
* Gets the paused flag
* @return {boolean}
*/
GLGE.Animatable.prototype.getPaused=function(){
	return this.paused;
}
/**
* Toggles the paused flag
* @return {boolean} returns the resulting flag state
*/
GLGE.Animatable.prototype.togglePaused=function(){
	this.setPaused(!this.getPaused());
	return this.paused;
}

})(GLGE);
