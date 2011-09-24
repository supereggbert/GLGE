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
 * @name glge_texturecamera.js
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
GLGE.TextureCamera=function(uid){
	GLGE.Assets.registerAsset(this,uid);
}
GLGE.augment(GLGE.QuickNotation,GLGE.TextureCamera);
GLGE.augment(GLGE.JSONLoader,GLGE.TextureCamera);
GLGE.augment(GLGE.Events,GLGE.TextureCamera);
GLGE.TextureCamera.prototype.className="Texture";
GLGE.TextureCamera.prototype.texture=null;
GLGE.TextureCamera.prototype.glTexture=null;
GLGE.TextureCamera.prototype.object=null;
GLGE.TextureCamera.prototype.camera=null;
GLGE.TextureCamera.prototype.bufferHeight=0;
GLGE.TextureCamera.prototype.bufferWidth=0;
GLGE.TextureCamera.prototype.planeOffset=0;
GLGE.TextureCamera.prototype.mirrorAxis=GLGE.NONE;
GLGE.TextureCamera.prototype.clipAxis=GLGE.NONE;


/**
* sets the RTT  render clipping plane offset
* @param {number} buffer width
**/
GLGE.TextureCamera.prototype.setPlaneOffset=function(planeoffset){
	this.planeOffset=planeoffset;
	return this;
}
/**
* gets the RTT  render clipping plane offset
* @returns the width
**/
GLGE.TextureCamera.prototype.getPlaneOffset=function(){
	return this.planeOffset;
}


/**
* sets the RTT  render buffer width
* @param {number} buffer width
**/
GLGE.TextureCamera.prototype.setBufferWidth=function(width){
	this.bufferWidth=width;
	this.update=true;
	return this;
}
/**
* gets the RTT  render buffer width
* @returns the width
**/
GLGE.TextureCamera.prototype.getBufferWidth=function(){
	return this.bufferWidth;
}

/**
* sets the RTT  render buffer height
* @param {number} buffer height
**/
GLGE.TextureCamera.prototype.setBufferHeight=function(height){
	this.bufferHeight=height;
	this.update=true;
	return this;
}
/**
* gets the RTT  render buffer height
* @returns the height
**/
GLGE.TextureCamera.prototype.getBufferHeight=function(){
	return this.bufferHeight;
}

/**
* sets the RTT  clip axis
* @param {number} the axis
**/
GLGE.TextureCamera.prototype.setClipAxis=function(camera){
	this.clipAxis=camera;
	return this;
}
/**
* gets the RTT clip axis
* @returns the axis
**/
GLGE.TextureCamera.prototype.getClipAxis=function(){
	return this.clipAxis;
}

/**
* sets the RTT  mirror axis
* @param {number} the axis
**/
GLGE.TextureCamera.prototype.setMirrorAxis=function(camera){
	this.mirrorAxis=camera;
	return this;
}
/**
* gets the RTT mirror axis
* @returns the axis
**/
GLGE.TextureCamera.prototype.getMirrorAxis=function(){
	return this.mirrorAxis;
}

/**
* sets the RTT camera to use
* @param {GLGE.Camera} the source camera
**/
GLGE.TextureCamera.prototype.setCamera=function(camera){
	this.camera=camera;
	return this;
}
/**
* gets the RTT source camera
* @returns {GLGE.Camera} the source camera
**/
GLGE.TextureCamera.prototype.getCamera=function(){
	return this.camera;
}

/**
* does what is needed to get the texture
* @private
**/
GLGE.TextureCamera.prototype.doTexture=function(gl,object){
	if(this.camera){
		this.gl=gl;
		var modelmatrix=object.getModelMatrix();
		var pmatrix=gl.scene.camera.getProjectionMatrix();
		var cameramatrix=this.camera.getViewMatrix();
		var matrix;
		
		if(this.mirrorAxis){
			switch(this.mirrorAxis){
				case GLGE.XAXIS:
					matrix=GLGE.mulMat4(GLGE.mulMat4(GLGE.mulMat4(cameramatrix,modelmatrix),GLGE.scaleMatrix(-1,1,1)),GLGE.inverseMat4(modelmatrix));
				break;
				case GLGE.YAXIS:
					matrix=GLGE.mulMat4(GLGE.mulMat4(GLGE.mulMat4(cameramatrix,modelmatrix),GLGE.scaleMatrix(1,-1,1)),GLGE.inverseMat4(modelmatrix));
				break;
				case GLGE.ZAXIS:
					matrix=GLGE.mulMat4(GLGE.mulMat4(GLGE.mulMat4(cameramatrix,modelmatrix),GLGE.scaleMatrix(1,1,-1)),GLGE.inverseMat4(modelmatrix));
				break;
			}
		}else{
			matrix=cameramatrix;
		}
		
		if(this.clipAxis){
			var clipplane
			switch(this.clipAxis){
				case GLGE.NEG_XAXIS:
					var dirnorm=GLGE.toUnitVec3([-modelmatrix[0],-modelmatrix[4],-modelmatrix[8]]);
					clipplane=[dirnorm[0],dirnorm[1],dirnorm[2],-GLGE.dotVec3([modelmatrix[3],modelmatrix[7],modelmatrix[11]],dirnorm)-this.planeOffset];
					break;
				case GLGE.POS_XAXIS:
					var dirnorm=GLGE.toUnitVec3([modelmatrix[0],modelmatrix[4],modelmatrix[8]]);
					clipplane=[dirnorm[0],dirnorm[1],dirnorm[2],-GLGE.dotVec3([modelmatrix[3],modelmatrix[7],modelmatrix[11]],dirnorm)-this.planeOffset];
					break;
				case GLGE.NEG_YAXIS:
					var dirnorm=GLGE.toUnitVec3([-modelmatrix[1],-modelmatrix[5],-modelmatrix[9]]);
					clipplane=[dirnorm[0],dirnorm[1],dirnorm[2],-GLGE.dotVec3([modelmatrix[3],modelmatrix[7],modelmatrix[11]],dirnorm)-this.planeOffset];
					break;
				case GLGE.POS_YAXIS:
					var dirnorm=GLGE.toUnitVec3([modelmatrix[1],modelmatrix[5],modelmatrix[9]]);
					clipplane=[dirnorm[0],dirnorm[1],dirnorm[2],-GLGE.dotVec3([modelmatrix[3],modelmatrix[7],modelmatrix[11]],dirnorm)-this.planeOffset];
					break;
				case GLGE.NEG_ZAXIS:
					var dirnorm=GLGE.toUnitVec3([-modelmatrix[2],-modelmatrix[6],-modelmatrix[10]]);
					clipplane=[dirnorm[0],dirnorm[1],dirnorm[2],-GLGE.dotVec3([modelmatrix[3],modelmatrix[7],modelmatrix[11]],dirnorm)-this.planeOffset];
					break;
				case GLGE.POS_ZAXIS:
					var dirnorm=GLGE.toUnitVec3([modelmatrix[2],modelmatrix[6],modelmatrix[10]]);
					clipplane=[dirnorm[0],dirnorm[1],dirnorm[2],-GLGE.dotVec3([modelmatrix[3],modelmatrix[7],modelmatrix[11]],dirnorm)-this.planeOffset];
					break;
			}
			
			
			
			var itmvp=GLGE.transposeMat4(GLGE.inverseMat4(GLGE.mulMat4(pmatrix,matrix)));

			clipplane=GLGE.mulMat4Vec4(itmvp,clipplane);
			clipplane=GLGE.scaleVec4(clipplane,pmatrix[10]);
			clipplane[3] -= 1;
			if(clipplane[2]<0) GLGE.scaleVec4(clipplane,-1);
			var suffix=[ 1,0,0,0,
					0,1,0,0,
					clipplane[0],clipplane[1],clipplane[2],clipplane[3],
					0,0,0,1];
			pmatrix=GLGE.mulMat4(suffix,pmatrix);
			
		}
		var height=(!this.bufferHeight ? gl.scene.renderer.canvas.height : this.bufferHeight);
		var width=(!this.bufferWidth ? gl.scene.renderer.canvas.width : this.bufferWidth);

		//create the texture if it's not already created
		if(!this.glTexture || this.update){
			this.createFrameBuffer(gl);
			gl.scene.addRenderPass(this.frameBuffer,matrix, gl.scene.camera.getProjectionMatrix(),width,height,object);
			gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
			this.update=false;
			return false;
		}else{	
			gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.scene.addRenderPass(this.frameBuffer,matrix, pmatrix,width,height,object);
			return true;
		}
	}else{
		return false;
	}
}
GLGE.TextureCamera.prototype.registerPasses=GLGE.TextureCamera.prototype.doTexture;
/**
* Creates the frame buffer for our texture
* @private
*/
GLGE.TextureCamera.prototype.createFrameBuffer=function(gl){
	var height=(!this.bufferHeight ? gl.scene.renderer.canvas.height : this.bufferHeight);
	var width=(!this.bufferWidth ? gl.scene.renderer.canvas.width : this.bufferWidth);
	
	if(!this.frameBuffer) this.frameBuffer = gl.createFramebuffer();
	if(!this.renderBuffer) this.renderBuffer = gl.createRenderbuffer();
	if(!this.glTexture) this.glTexture=gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, this.glTexture);

	var tex = new Uint8Array(width*height*4);
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width,height, 0, gl.RGBA, gl.UNSIGNED_BYTE, tex);
    
	gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
    
	gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderBuffer);
	//dpeth stencil doesn't seem to work in either webkit or mozilla so don't use for now - reflected particles will be messed up!
	//gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_STENCIL,width, height);
	//gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_STENCIL_ATTACHMENT, gl.RENDERBUFFER, this.renderBuffer);
	gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16,width, height);
	gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderBuffer);
    
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.glTexture, 0);	
    
	gl.bindRenderbuffer(gl.RENDERBUFFER, null);
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	gl.bindTexture(gl.TEXTURE_2D, null);
}



})(GLGE);