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
 * @name glge_renderer.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){





/**
* @class Sets the scene to render
* @param {object} canvas The canvas element to render to
* @augments GLGE.QuickNotation
*/
GLGE.Renderer=function(canvas,error,props){
	this.viewport=[];
	this.canvas=canvas;
	if(!props) props={alpha:true,depth:true,stencil:true,antialias:true,premultipliedAlpha:true};
	try {
		this.gl = canvas.getContext("experimental-webgl",props);
	} catch(e) {}
	try {
		if(!this.gl) this.gl = canvas.getContext("webgl",props);
	} catch(e) {}
	if(!this.gl) {
        console.log("GLGE err:", typeof(globalNoWebGLError)=="undefined")
		if( (!error) && (typeof(globalNoWebGLError)=="undefined")){
			var div=document.createElement("div");
			div.setAttribute("style","position: absolute; top: 10px; left: 10px; font-family: sans-serif; font-size: 14px; padding: 10px;background-color: #fcffcb;color: #800; width: 200px; border:2px solid #f00");
			div.innerHTML="WebGL compatible Browser Required(Firefox 4 or Chrome 9 and up) or you may need to update your graphics card driver.";
			document.getElementsByTagName("body")[0].appendChild(div);
			throw "cannot create webgl context";
		}else{
			error();
			throw "cannot create webgl context";
		}
	}
	//firefox is doing something here?
	try{
	this.gl.canvas=canvas;
	}catch(e){};
	//this.gl = WebGLDebugUtils.makeDebugContext(this.gl);
	//this.gl.setTracing(true);

	//chome compatibility
	//TODO: Remove this when chome is right
	if (!this.gl.getProgramParameter)
	{
		this.gl.getProgramParameter = this.gl.getProgrami
	}
	if (!this.gl.getShaderParameter)
	{
		this.gl.getShaderParameter = this.gl.getShaderi
	}
	// End of Chrome compatibility code
	
	this.gl.uniformMatrix4fvX=this.gl.uniformMatrix4fv
	this.gl.uniformMatrix4fv=function(uniform,transpose,array){
		if(!transpose){
			this.uniformMatrix4fvX(uniform,false,array);
		}else{
			GLGE.mat4gl(GLGE.transposeMat4(array),array);
			this.uniformMatrix4fvX(uniform,false,array);
		}
	}
	var gl=this.gl;
	
	/*this.gl.texImage2Dx=this.gl.texImage2D;
	this.gl.texImage2D=function(){
		if(arguments.length==9){
			gl.texImage2Dx(arguments[0], arguments[1], arguments[2],arguments[3],arguments[4],arguments[5],arguments[6],arguments[7],arguments[8]);
		}else{
			gl.texImage2Dx(arguments[0], arguments[1], arguments[5],false,false);
		}
	}*/

	
	//set up defaults
	this.gl.clearDepth(1.0);
	this.gl.clearStencil(0);
	this.gl.enable(this.gl.DEPTH_TEST);
    
    
	this.gl.depthFunc(this.gl.LEQUAL);
	this.gl.blendFuncSeparate(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA,this.gl.ZERO,this.gl.ONE);	
};
GLGE.augment(GLGE.QuickNotation,GLGE.Renderer);
GLGE.Renderer.prototype.gl=null;
GLGE.Renderer.prototype.scene=null;
GLGE.C_STENCIL=1;
GLGE.C_DEPTH=2;
GLGE.C_COLOR=4;
GLGE.C_ALL=7;

GLGE.Renderer.prototype.clearType=GLGE.C_ALL;

/**
* Sets the width of the viewport to render
* @param width the width of the viewport to render
*/
GLGE.Renderer.prototype.setViewportWidth=function(width){
	this.viewport[0]=width;
	return this;
};
/**
* Sets the height of the viewport to render
* @param height the height of the viewport to render
*/
GLGE.Renderer.prototype.setViewportHeight=function(height){
	this.viewport[1]=height;
	return this;
};
/**
* Sets the left offset of the viewport to render
* @param left the left offset of the viewport to render
*/
GLGE.Renderer.prototype.setViewportOffsetX=function(left){
	this.viewport[2]=left;
	return this;
};
/**
* Sets the top offset of the viewport to render
* @param top the top offset of the viewport to render
*/
GLGE.Renderer.prototype.setViewportOffsetY=function(top){
	this.viewport[3]=top;
	return this;
};
/**
* Clears all viewport data and defaults back to canvas size
*/
GLGE.Renderer.prototype.clearViewport=function(){
	this.viewport=[];
};
/**
* Gets the width of the viewport to render
* @returns the viewport width
*/
GLGE.Renderer.prototype.getViewportWidth=function(){
	if(this.viewport.length>0){
		return this.viewport[0];
	}else{
		return this.canvas.width;
	}
};
/**
* Gets the height of the viewport to render
* @returns the viewport height
*/
GLGE.Renderer.prototype.getViewportHeight=function(){
	if(this.viewport.length>0){
		return this.viewport[1];
	}else{
		return this.canvas.height;
	}
};
/**
* Gets the left offset of the viewport to render
* @returns the left viewport offset
*/
GLGE.Renderer.prototype.getViewportOffsetX=function(){
	if(this.viewport.length>0){
		return this.viewport[2];
	}else{
		return 0;
	}
};
/**
* Gets the top offset of the viewport to render
* @returns the top viewport offset
*/
GLGE.Renderer.prototype.getViewportOffsetY=function(){
	if(this.viewport.length>0){
		return this.viewport[3];
	}else{
		return 0;
	}
};

/**
* Sets the clear type for rendering GLGE.C_ALL, GLGE.C_STENCIL, GLGE.C_DEPTH, GLGE.C_COLOR
* @param type how to clear the viewport for the next render
*/
GLGE.Renderer.prototype.setClearType=function(type){
	this.clearType=type;
	return this;
};
/**
* Gets the clear type for rendering GLGE.C_ALL, GLGE.C_STENCIL, GLGE.C_DEPTH, GLGE.C_COLOR
* @returns how to clear the viewport for the next render
*/
GLGE.Renderer.prototype.getClearType=function(){
	return this.clearType;
};
/**
* Clears the viewport
* @private
*/
GLGE.Renderer.prototype.GLClear=function(){
	var gl=this.gl;
	var clearType=this.clearType;
	var clear=0;
	if((clearType & GLGE.C_COLOR) ==  GLGE.C_COLOR){
		clear=clear | gl.COLOR_BUFFER_BIT;
	}
	if((clearType & GLGE.C_DEPTH) == GLGE.C_DEPTH){
		clear=clear | gl.DEPTH_BUFFER_BIT;
	}
	if((clearType & GLGE.C_STENCIL) == GLGE.C_STENCIL){
		clear=clear | gl.STENCIL_BUFFER_BIT;
	}
	gl.clear(clear);
};
/**
* Gets the scene which is set to be rendered
* @returns the current render scene
*/
GLGE.Renderer.prototype.getScene=function(){
	return this.scene;
};
/**
* Sets the scene to render
* @param {GLGE.Scene} scene The scene to be rendered
*/
GLGE.Renderer.prototype.setScene=function(scene){
	scene.renderer=this;
	this.scene=scene;
	if(!scene.gl) scene.GLInit(this.gl);
	//this.render();
	scene.camera.updateMatrix(); //reset camera matrix to force cache update
	return this;
};
/**
* Renders the current scene to the canvas
*/
GLGE.Renderer.prototype.render=function(){
	if(this.transitonFilter){
		var now=+new Date;
		if(now<this.transStarted+this.transDuration) {
			this.GLRenderTransition((now-this.transStarted)/this.transDuration);
			return;
		}
	}
	if(this.cullFaces) this.gl.enable(this.gl.CULL_FACE);
	if (this.scene)	this.scene.render(this.gl);
	//if this is the first ever pass then render twice to fill shadow buffers
	if(!this.rendered&&this.scene){
		this.scene.render(this.gl);
		this.rendered=true;
	}
};

/**
* Uses the transitions filter to transition to the new scene
* @param {GLGE.Scene} scene The scene to transition to
* @param {Number} duration The transiton time in ms
*/
GLGE.Renderer.prototype.transitionTo=function(scene,duration){
	if(this.transitonFilter){
		this.transitonFilter.clearPersist(this.gl);
		this.oldScene=this.scene;
		this.transStarted=+new Date;
		this.transDuration=duration;
	}
	this.setScene(scene);
};

/**
* Creates the buffers needed for transitions
* @private
*/
GLGE.Renderer.prototype.createTransitionBuffers=function(){
	var gl=this.gl;
	//Transition source buffer
	this.frameBufferTS = gl.createFramebuffer();
	this.renderBufferTS = gl.createRenderbuffer();
	this.textureTS = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, this.textureTS);
	this.widthTS=this.getViewportWidth();
	this.heightTS=this.getViewportHeight();
	
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.widthTS,this.heightTS, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	
	gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBufferTS);
	gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderBufferTS);
	gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.widthTS, this.heightTS);
    
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.textureTS, 0);
	gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderBufferTS);
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	gl.bindRenderbuffer(gl.RENDERBUFFER, null);
	gl.bindTexture(gl.TEXTURE_2D, null);
	
	//Transition destination buffer
	this.frameBufferTD = gl.createFramebuffer();
	this.renderBufferTD = gl.createRenderbuffer();
	this.textureTD = gl.createTexture();
	gl.bindTexture(gl.TEXTURE_2D, this.textureTD);
	this.widthTD=this.getViewportWidth();
	this.heightTD=this.getViewportHeight();
	
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.widthTD,this.heightTD, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
	
	gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBufferTD);
	gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderBufferTD);
	gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.widthTD, this.heightTD);
    
	gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.textureTD, 0);
	gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderBufferTD);
	gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	gl.bindRenderbuffer(gl.RENDERBUFFER, null);
	gl.bindTexture(gl.TEXTURE_2D, null);
	
};

/**
* Sets the filter to use for the transition
* @param {GLGE.Filter2d} filter2d the 2d filter to use for transitions
*/
GLGE.Renderer.prototype.setTransitionFilter=function(filter2d){
	this.transitonFilter=filter2d;
	var renderer=this;
	filter2d.textures=[
		{
			name: "GLGE_SOURCE",
			doTexture: function(gl){
				gl.bindTexture(gl.TEXTURE_2D, renderer.textureTS);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			}
		},
		{
			name: "GLGE_DEST",
			doTexture: function(gl){
				gl.bindTexture(gl.TEXTURE_2D, renderer.textureTD);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
				gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			}
		}
	];
	return this;
}


/**
* Renders the transition effect
* @private
*/
GLGE.Renderer.prototype.GLRenderTransition=function(time){
	this.transitonFilter.setUniform("1f","time",time);
	
	if(!this.frameBufferTS){
		this.createTransitionBuffers();
		this.transitonFilter.getFrameBuffer(this.gl);
	}
	this.scene.transbuffer=this.frameBufferTS;
	this.scene.render(this.gl);	
	this.scene.transbuffer=null;
	
	this.oldScene.transbuffer=this.frameBufferTD;
	this.oldScene.render(this.gl);	
	this.oldScene.transbuffer=null;
	
	this.transitonFilter.GLRender(this.gl);
}


})(GLGE);