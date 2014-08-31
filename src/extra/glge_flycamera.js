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
 * @name glge_FlyCamera.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){


GLGE.FlyCamera=function(uid){
	this.lastTime=+new Date;
	var that=this;
	requestAnimationFrame(function(){that.animate()});
	var drag;
	
	this.keysDown=[];
	this.keydown=function(e){
		that.keysDown[e.keyCode]=true;
	}
	this.keyup=function(e){
		that.keysDown[e.keyCode]=false;
	}
	
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
			if(!that.keysDown[16]){
				that.setLongitude(drag[2]-(e.clientX-drag[0])/that.canvas.offsetWidth*4.0);
				that.setLatitude(drag[3]-(e.clientY-drag[1])/that.canvas.offsetHeight*4.0);
			}else{
				var mat=that.getViewMatrix();
				var deltaX=(e.clientX-drag[0]);
				that.flyVelocity[0]=mat[0]*deltaX*0.003;
				that.flyVelocity[1]=mat[1]*deltaX*0.003;
				that.flyVelocity[2]=mat[2]*deltaX*0.003;
				var deltaY=-(e.clientY-drag[1]);
				that.flyVelocity[0]+=mat[4]*deltaY*0.003;
				that.flyVelocity[1]+=mat[5]*deltaY*0.003;
				that.flyVelocity[2]+=mat[6]*deltaY*0.003;
			}
		}
	}
	this.mousewheel=function(e){
		var wheelData = e.detail ? e.detail/10 : e.wheelDelta/-300;
		that.addOffset(wheelData*2);
	}
	GLGE.Camera.call(this,uid);
	
}	
GLGE.augment(GLGE.Camera,GLGE.FlyCamera);
GLGE.FlyCamera.prototype.targetOffset=0;
GLGE.FlyCamera.prototype.targetLatitude=0;
GLGE.FlyCamera.prototype.targetLongitude=0;
GLGE.FlyCamera.prototype.offset=0.1;
GLGE.FlyCamera.prototype.latitude=0;
GLGE.FlyCamera.prototype.longitude=0;
GLGE.FlyCamera.prototype.speed=0.9;
GLGE.FlyCamera.prototype.flyVelocity=[0,0,0];
GLGE.FlyCamera.prototype.maxVelocity=1;
GLGE.FlyCamera.prototype.velocityDamping=0.95;

GLGE.FlyCamera.prototype.setCanvas=function(canvas){
	this.canvas=canvas;
	canvas.addEventListener('DOMMouseScroll', this.mousewheel, false);
	canvas.onmousewheel=this.mousewheel;
	canvas.addEventListener('mousemove', this.mousemove, false);
	canvas.addEventListener('mousedown', this.mousedown, false);
	canvas.addEventListener('mouseup', this.mouseup, false);
	document.addEventListener('keydown', this.keydown, false);
	document.addEventListener('keyup', this.keyup, false);
	return this;
}

GLGE.FlyCamera.prototype.setOffset=function(value){
	this.targetOffset=+value;
	this.matrix=null;
	return this;
}
GLGE.FlyCamera.prototype.setSpeed=function(value){
	this.speed=+value;
	return this;
}
GLGE.FlyCamera.prototype.addOffset=function(value){
	this.targetOffset+=+value;
	this.matrix=null;
	return this;
}
GLGE.FlyCamera.prototype.setInitialLatitude=function(value){
	this.lastTime=+new Date;
	this.laditude=+value;
	this.matrix=null;
	return this;
}
GLGE.FlyCamera.prototype.setInitialLongitude=function(value){
	this.lastTime=+new Date;
	this.longitude=+value;
	this.matrix=null;
	return this;
}
GLGE.FlyCamera.prototype.setInitialOffset=function(value){
	this.lastTime=+new Date;
	this.offset=+value;
	this.matrix=null;
	return this;
}
GLGE.FlyCamera.prototype.setLatitude=function(value){
	this.targetLatitude=+value;
	if(this.latitudeMin!=undefined && value<this.latitudeMin) this.targetLatitude=this.latitudeMin;
	if(this.latitudeMax!=undefined && value>this.latitudeMax) this.targetLatitude=this.latitudeMax;
	this.matrix=null;
	return this;
}
GLGE.FlyCamera.prototype.setLongitude=function(value){
	this.targetLongitude=+value;
	if(this.longitudeMin!=undefined && value<this.longitudeMin) this.targetLongitude=this.longitude;
	if(this.longitudeMax!=undefined && value>this.longitudeMax) this.targetLongitude=this.longitude;
	this.matrix=null;
	return this;
}
GLGE.FlyCamera.prototype.setLongitudeMin=function(value){
	this.longitudeMin=+value;
	this.matrix=null;
	return this;
}
GLGE.FlyCamera.prototype.setLongitudeMax=function(value){
	this.longitudeMax=+value;
	this.matrix=null;
	return this;
}
GLGE.FlyCamera.prototype.setLatitudeMin=function(value){
	this.latitudeMin=+value;
	this.matrix=null;
	return this;
}
GLGE.FlyCamera.prototype.setLatitudeMax=function(value){
	this.latitudeMax=+value;
	this.matrix=null;
	return this;
}

GLGE.FlyCamera.prototype.updateMatrix=function(){
	this.matrix=GLGE.inverseMat4(GLGE.mulMat4(GLGE.translateMatrix(this.locX,this.locY,this.locZ),GLGE.mulMat4(GLGE.rotateMatrix(this.latitude,this.longitude,0,GLGE.ROT_YXZ),GLGE.translateMatrix(0,0,this.offset))));
	return this;
}
GLGE.FlyCamera.prototype.animate=function(){
	var now=+new Date;
	var dt=(now-this.lastTime)*0.01;
	this.lastTime=now;
	
	this.updateMatrix();
	if(this.keysDown[87]){
		this.flyVelocity[0]+=-this.matrix[8]*0.1;
		this.flyVelocity[1]+=-this.matrix[9]*0.1;
		this.flyVelocity[2]+=-this.matrix[10]*0.1;
	}
	if(this.keysDown[83]){
		this.flyVelocity[0]-=-this.matrix[8]*0.1;
		this.flyVelocity[1]-=-this.matrix[9]*0.1;
		this.flyVelocity[2]-=-this.matrix[10]*0.1;
	}
	if(this.keysDown[65]){
		this.flyVelocity[0]+=-this.matrix[0]*0.1;
		this.flyVelocity[1]+=-this.matrix[1]*0.1;
		this.flyVelocity[2]+=-this.matrix[2]*0.1;
	}
	
	if(this.keysDown[68]){
		this.flyVelocity[0]-=-this.matrix[0]*0.1;
		this.flyVelocity[1]-=-this.matrix[1]*0.1;
		this.flyVelocity[2]-=-this.matrix[2]*0.1;
	}
	
	this.flyVelocity[0]*=this.velocityDamping;
	this.flyVelocity[1]*=this.velocityDamping;
	this.flyVelocity[2]*=this.velocityDamping;
	
	this.latitude+=(this.targetLatitude-this.latitude)*this.speed*dt;
	this.longitude+=(this.targetLongitude-this.longitude)*this.speed*dt;
	this.offset+=(this.targetOffset-this.offset)*this.speed*dt;
	this.locX=parseFloat(this.locX)+this.flyVelocity[0]*dt;
	this.locY=parseFloat(this.locY)+this.flyVelocity[1]*dt;
	this.locZ=parseFloat(this.locZ)+this.flyVelocity[2]*dt;
	this.matrix = false;
	var that=this;
	requestAnimationFrame(function(){that.animate()});
}
GLGE.FlyCamera.prototype.getViewMatrix=function(){
	if(!this.matrix) this.updateMatrix();
	return this.matrix;
};


})(GLGE);