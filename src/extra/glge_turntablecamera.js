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
 * @name glge_turntablecamera.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){


GLGE.TurntableCamera=function(uid){
	this.lastTime=+new Date;
	var that=this;
	requestAnimationFrame(function(){that.animate()});
	var drag;
	this.mousedown=function(e){
		if(e.button==0){
			drag=[e.clientX,e.clientY,that.targetLongitude,that.targetLatitude];
		}
		e.preventDefault();
	}
	this.mouseup=function(e){
		drag=false;
	}
	this.mousemove=function(e){
		if(drag){
			camera.setLongitude(drag[2]-(e.clientX-drag[0])/that.canvas.offsetWidth*4.0);
			camera.setLatitude(drag[3]-(e.clientY-drag[1])/that.canvas.offsetHeight*4.0);
		}
	}
	this.mousewheel=function(e){
		var wheelData = e.detail ? e.detail/10 : e.wheelDelta/-300;
		that.addOffset(wheelData*2);
	}
	GLGE.Camera.call(this,uid);
	
}	
GLGE.augment(GLGE.Camera,GLGE.TurntableCamera);
GLGE.TurntableCamera.prototype.targetOffset=0;
GLGE.TurntableCamera.prototype.targetLatitude=0;
GLGE.TurntableCamera.prototype.targetLongitude=0;
GLGE.TurntableCamera.prototype.offset=10;
GLGE.TurntableCamera.prototype.latitude=0;
GLGE.TurntableCamera.prototype.longitude=0;
GLGE.TurntableCamera.prototype.speed=0.9;

GLGE.TurntableCamera.prototype.setCanvas=function(canvas){
	this.canvas=canvas;
	canvas.addEventListener('DOMMouseScroll', this.mousewheel, false);
	canvas.onmousewheel=this.mousewheel;
	canvas.addEventListener('mousemove', this.mousemove, false);
	canvas.addEventListener('mousedown', this.mousedown, false);
	canvas.addEventListener('mouseup', this.mouseup, false);
	return this;
}

GLGE.TurntableCamera.prototype.setOffset=function(value){
	this.targetOffset=+value;
	this.matrix=null;
	return this;
}
GLGE.TurntableCamera.prototype.setSpeed=function(value){
	this.speed=+value;
	return this;
}
GLGE.TurntableCamera.prototype.addOffset=function(value){
	this.targetOffset+=+value;
	this.matrix=null;
	return this;
}
GLGE.TurntableCamera.prototype.setInitialLatitude=function(value){
	this.lastTime=+new Date;
	this.laditude=+value;
	this.matrix=null;
	return this;
}
GLGE.TurntableCamera.prototype.setInitialLongitude=function(value){
	this.lastTime=+new Date;
	this.longitude=+value;
	this.matrix=null;
	return this;
}
GLGE.TurntableCamera.prototype.setInitialOffset=function(value){
	this.lastTime=+new Date;
	this.offset=+value;
	this.matrix=null;
	return this;
}
GLGE.TurntableCamera.prototype.setLatitude=function(value){
	this.targetLatitude=+value;
	if(this.latitudeMin!=undefined && value<this.latitudeMin) this.targetLatitude=this.latitudeMin;
	if(this.latitudeMax!=undefined && value>this.latitudeMax) this.targetLatitude=this.latitudeMax;
	this.matrix=null;
	return this;
}
GLGE.TurntableCamera.prototype.setLongitude=function(value){
	this.targetLongitude=+value;
	if(this.longitudeMin!=undefined && value<this.longitudeMin) this.targetLongitude=this.longitude;
	if(this.longitudeMax!=undefined && value>this.longitudeMax) this.targetLongitude=this.longitude;
	this.matrix=null;
	return this;
}
GLGE.TurntableCamera.prototype.setLongitudeMin=function(value){
	this.longitudeMin=+value;
	this.matrix=null;
	return this;
}
GLGE.TurntableCamera.prototype.setLongitudeMax=function(value){
	this.longitudeMax=+value;
	this.matrix=null;
	return this;
}
GLGE.TurntableCamera.prototype.setLatitudeMin=function(value){
	this.latitudeMin=+value;
	this.matrix=null;
	return this;
}
GLGE.TurntableCamera.prototype.setLatitudeMax=function(value){
	this.latitudeMax=+value;
	this.matrix=null;
	return this;
}

GLGE.TurntableCamera.prototype.updateMatrix=function(){
	this.matrix=GLGE.inverseMat4(GLGE.mulMat4(GLGE.translateMatrix(this.locX,this.locY,this.locZ),GLGE.mulMat4(GLGE.rotateMatrix(this.latitude,this.longitude,0,GLGE.ROT_YXZ),GLGE.translateMatrix(0,0,this.offset))));
	return this;
}
GLGE.TurntableCamera.prototype.animate=function(){
	var now=+new Date;
	var dt=(now-this.lastTime)*0.01;
	this.lastTime=now;
	this.latitude+=(this.targetLatitude-this.latitude)*this.speed*dt;
	this.longitude+=(this.targetLongitude-this.longitude)*this.speed*dt;
	this.offset+=(this.targetOffset-this.offset)*this.speed*dt;
	
	var that=this;
	requestAnimationFrame(function(){that.animate()});
}
GLGE.TurntableCamera.prototype.getViewMatrix=function(){
	if(!this.matrix) this.updateMatrix();
	return this.matrix;
};


})(GLGE);