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
 * @name glge_texturecameracube.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){






/**
* @class A reflection texture will reflect in a plane for a specified transform
* @param {string} uid the unique id for this texture
* @see GLGE.Material
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.TextureCameraCube=function(uid){
	GLGE.Assets.registerAsset(this,uid);
	this.cubeBuffers=[];
}
GLGE.augment(GLGE.QuickNotation,GLGE.TextureCameraCube);
GLGE.augment(GLGE.JSONLoader,GLGE.TextureCameraCube);
GLGE.augment(GLGE.Events,GLGE.TextureCameraCube);
GLGE.TextureCameraCube.prototype.className="TextureCube";
GLGE.TextureCameraCube.prototype.texture=null;
GLGE.TextureCameraCube.prototype.glTexture=null;
GLGE.TextureCameraCube.prototype.object=null;
GLGE.TextureCameraCube.prototype.autoUpdate=false;
GLGE.TextureCameraCube.prototype.rendered=false;
GLGE.TextureCameraCube.prototype.bufferHeight=512;
GLGE.TextureCameraCube.prototype.bufferWidth=512;
GLGE.TextureCameraCube.prototype.offsetX=0;
GLGE.TextureCameraCube.prototype.offsetY=0;
GLGE.TextureCameraCube.prototype.offsetZ=0;

GLGE.TextureCameraCube.prototype.cameraMatries=[
						[0,0,-1,0,
						0,1,0,0,
						-1,0,0,0,
						0,0,0,1], 
						[0,0,1,0,
						0,1,0,0,
						1,0,0,0,
						0,0,0,1], 
						
						[-1,0,0,0,
						0,0,1,0,
						0,-1,0,0,
						0,0,0,1], 
						[-1,0,0,0,
						0,0,-1,0,
						0,1,0,0,
						0,0,0,1],
						
						[1,0,0,0,
						0,1,0,0,
						0,0,-1,0,
						0,0,0,1], 
						[-1,0,0,0,
						0,1,0,0,
						0,0,1,0,
						0,0,0,1]
];

GLGE.TextureCameraCube.prototype.pMatrix=GLGE.makePerspective(90, 1, 0.0001, 1000);

/**
* Forces an update of the cube map texture
**/
GLGE.TextureCameraCube.prototype.render=function(){
	this.rendered=false;
	return this;
}


/**
* set the X center offset
* @param {number} offset X offset for cube
**/
GLGE.TextureCameraCube.prototype.setOffsetX=function(offset){
	this.offsetX=offset
	return this;
}
/**
* Gets the X center offset
* @returns the X offset
**/
GLGE.TextureCameraCube.prototype.getOffsetX=function(){
	return this.offsetX;
}

/**
* set the Y center offset
* @param {number} offset Y offset for cube
**/
GLGE.TextureCameraCube.prototype.setOffsetY=function(offset){
	this.offsetY=offset
	return this;
}
/**
* Gets the Y center offset
* @returns the Y offset
**/
GLGE.TextureCameraCube.prototype.getOffsetY=function(){
	return this.offsetY;
}

/**
* set the Z center offset
* @param {number} offset Z offset for cube
**/
GLGE.TextureCameraCube.prototype.setOffsetZ=function(offset){
	this.offsetZ=offset
	return this;
}
/**
* Gets the X center offset
* @returns the X offset
**/
GLGE.TextureCameraCube.prototype.getOffsetZ=function(){
	return this.offsetZ;
}

/**
* set the auto update flag
* @param {number} buffer width
**/
GLGE.TextureCameraCube.prototype.setAutoUpdate=function(auto){
	this.autoUpdate=auto
	return this;
}
/**
* gets the auto update flag
* @returns the width
**/
GLGE.TextureCameraCube.prototype.getAutoUpdate=function(){
	return this.autoUpdate;
}

/**
* sets the RTT  render buffer width
* @param {number} buffer width
**/
GLGE.TextureCameraCube.prototype.setBufferWidth=function(width){
	this.bufferWidth=width;
	this.update=true;
	return this;
}
/**
* gets the RTT  render buffer width
* @returns the width
**/
GLGE.TextureCameraCube.prototype.getBufferWidth=function(){
	return this.bufferWidth;
}

/**
* sets the RTT  render buffer height
* @param {number} buffer height
**/
GLGE.TextureCameraCube.prototype.setBufferHeight=function(height){
	this.bufferHeight=height;
	this.update=true;
	return this;
}
/**
* gets the RTT  render buffer height
* @returns the height
**/
GLGE.TextureCameraCube.prototype.getBufferHeight=function(){
	return this.bufferHeight;
}


/**
* registers the render passes
* @private
**/
GLGE.TextureCameraCube.prototype.doTexture=function(gl,object){

	this.gl=gl;
	var objMatrix=object.getModelMatrix();
	
	var height=this.bufferHeight;
	var width=this.bufferWidth;

	if(!this.cubeBuffers.length || this.update){
		this.createFrameBuffers(gl);
		this.update=false;
		return false;
	}

	gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.glTexture);
	if(!this.rendered || this.autoUpdate){
		for(var i=0;i<6;i++){
			var matrix=this.cameraMatries[i].slice(0);
			var m=GLGE.mulMat4(matrix,objMatrix);
			var v=GLGE.mulMat4Vec3(m,[this.offsetX,this.offsetY,this.offsetZ,1]);
			matrix[3]=-v[0];
			matrix[7]=-v[1];
			matrix[11]=-v[2];
			gl.scene.addRenderPass(this.cubeBuffers[i],matrix, this.pMatrix,width,height,object,true);
		}
		this.rendered=true;
	}
	return true;


}
GLGE.TextureCameraCube.prototype.registerPasses=GLGE.TextureCameraCube.prototype.doTexture;

/**
* Creates the frame buffer and texture
* @private
*/
GLGE.TextureCameraCube.prototype.createFrameBuffers=function(gl){
	var height=this.bufferHeight;
	var width=this.bufferWidth;
	
	
	var renderBuffer = gl.createRenderbuffer();
	this.glTexture=gl.createTexture();
	gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.glTexture);
	gl.bindRenderbuffer(gl.RENDERBUFFER, renderBuffer);
	gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16,width, height);

	gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, width,height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, width,height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, width,height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, width,height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, width,height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, width,height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);	
    
	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	
	var frameBuffer
	frameBuffer = gl.createFramebuffer();
	gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
	gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderBuffer);
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_CUBE_MAP_NEGATIVE_X, this.glTexture, 0);	
	this.cubeBuffers.push(frameBuffer);	
	
	frameBuffer = gl.createFramebuffer();
	gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
	gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderBuffer);
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_CUBE_MAP_POSITIVE_X, this.glTexture, 0);	
	this.cubeBuffers.push(frameBuffer);	
		
	frameBuffer = gl.createFramebuffer();
	gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
	gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderBuffer);
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, this.glTexture, 0);	
	this.cubeBuffers.push(frameBuffer);
		
	frameBuffer = gl.createFramebuffer();
	gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
	gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderBuffer);
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_CUBE_MAP_POSITIVE_Y, this.glTexture, 0);	
	this.cubeBuffers.push(frameBuffer);

	frameBuffer = gl.createFramebuffer();
	gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
	gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderBuffer);
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, this.glTexture, 0);	
	this.cubeBuffers.push(frameBuffer);

	frameBuffer = gl.createFramebuffer();
	gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
	gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderBuffer);
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_CUBE_MAP_POSITIVE_Z, this.glTexture, 0);	
	this.cubeBuffers.push(frameBuffer);
		
	
		
	

	

	
	gl.bindRenderbuffer(gl.RENDERBUFFER, null);
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
}



})(GLGE);