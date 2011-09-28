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
 * @name glge_texturecanvas.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){




/**
* @class A canvase texture to be included in a material
* @param {string} uid the unique id for this texture
* @see GLGE.Material
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.TextureCanvas=function(uid){
	this.canvas=document.createElement("canvas");
	//temp canvas to force chrome to update FIX ME when bug sorted!
	this.t=document.createElement("canvas");
	this.t.width=1;
	this.t.height=1;
	GLGE.Assets.registerAsset(this,uid);
}
GLGE.augment(GLGE.QuickNotation,GLGE.TextureCanvas);
GLGE.augment(GLGE.JSONLoader,GLGE.TextureCanvas);
GLGE.augment(GLGE.Events,GLGE.TextureCanvas);
GLGE.TextureCanvas.prototype.className="TextureCanvas";
GLGE.TextureCanvas.prototype.glTexture=null;
GLGE.TextureCanvas.prototype.autoUpdate=true;
/**
* Gets the auto update flag
* @return {boolean} The auto update flag
*/
GLGE.TextureCanvas.prototype.getAutoUpdate=function(){
	return this.autoUpdate;
};
/**
* Sets the auto update flag
* @param {boolean} value The auto update flag
*/
GLGE.TextureCanvas.prototype.setAutoUpdate=function(value){
	this.autoUpdate=value;
	return this;
};
/**
* Gets the canvas used by the texture
* @return {canvas} The textures image url
*/
GLGE.TextureCanvas.prototype.getCanvas=function(){
	return this.canvas;
};
/**
* Sets the canvas used by the texture
* @param {canvas} canvas The canvas to use
*/
GLGE.TextureCanvas.prototype.setCanvas=function(canvas){
	this.canvas=canvas;
	return this;
};
/**
* Sets the canvas height
* @param {number} value The canvas height
*/
GLGE.TextureCanvas.prototype.setHeight=function(value){
	this.canvas.height=value;
	return this;
};
/**
* Sets the canvas width
* @param {number} value The canvas width
*/
GLGE.TextureCanvas.prototype.setWidth=function(value){
	this.canvas.width=value;
	return this;
};

/**
* gets the canvas height
* @returns {number} The canvas height
*/
GLGE.TextureCanvas.prototype.getHeight=function(){
	return this.canvas.height;
};
/**
* gets the canvas width
* @returns {number} The canvas width
*/
GLGE.TextureCanvas.prototype.getWidth=function(){
	return this.canvas.width;
};

/**
* does the canvas texture GL stuff
* @private
**/
GLGE.TextureCanvas.prototype.doTexture=function(gl){
	this.gl=gl;
	//create the texture if it's not already created
	if(!this.glTexture){
		this.glTexture=gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
		this.updateCanvas(gl);
	}else{
		gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
		if(this.autoUpdate || this.doUpdate) this.updateCanvas(gl);
	}
	this.doUpdate=false;

	
	return true;
}
/**
* Manually updates the canvas Texture
*/
GLGE.TextureCanvas.prototype.update=function(){
	this.doUpdate=true;
}
/**
* Updates the canvas texture
* @private
*/
GLGE.TextureCanvas.prototype.updateCanvas=function(gl){
	var canvas = this.canvas;
	gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
	
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.t); //force chrome to update remove when chrome bug fixed
	
	gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.generateMipmap(gl.TEXTURE_2D);
}


})(GLGE);