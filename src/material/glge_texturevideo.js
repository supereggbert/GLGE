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
 * @name glge_texturevideo.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){




/**
* @class A video texture to be included in a material
* @param {string} uid the unique id for this texture
* @see GLGE.Material
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.TextureVideo=function(uid){
	this.video=document.createElement("video");
	this.video.style.display="none";
	this.video.setAttribute("loop","loop");
	this.video.autoplay=true;
	//looping isn't working in firefox so quick fix!
	this.video.addEventListener("ended", function() { this.play(); }, true); 
	//video needs to be part of page to work for some reason :-s
	document.getElementsByTagName("body")[0].appendChild(this.video);
	//used to get webkit working
	this.canvas=document.createElement("canvas");
	this.ctx=this.canvas.getContext("2d");
	GLGE.Assets.registerAsset(this,uid);
	
}
GLGE.augment(GLGE.QuickNotation,GLGE.TextureVideo);
GLGE.augment(GLGE.JSONLoader,GLGE.TextureVideo);
GLGE.augment(GLGE.Events,GLGE.TextureVideo);
GLGE.TextureVideo.prototype.className="TextureVideo";
GLGE.TextureVideo.prototype.glTexture=null;
/**
* Gets the canvas used by the texture
* @return {video} The textures image url
*/
GLGE.TextureVideo.prototype.getVideo=function(){
	return this.video;
};
/**
* Sets the video used by the texture
* @param {video} canvas The canvas to use
*/
GLGE.TextureVideo.prototype.setVideo=function(video){
	this.video=video;
	return this;
};

/**
* Sets the source used for the video
* @param {string} src The URL of the video
*/
GLGE.TextureVideo.prototype.setSrc=function(src){
	this.video.src=src;
	return this;
};
/**
* gets the source used for the video
* @returns {string} The URL of the video
*/
GLGE.TextureVideo.prototype.getSrc=function(src){
	return this.video.src;
};

/**
* does the canvas texture GL stuff
* @private
**/
GLGE.TextureVideo.prototype.doTexture=function(gl){
	this.gl=gl;
	//create the texture if it's not already created
	if(!this.glTexture){
		this.glTexture=gl.createTexture();
		gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
		this.updateTexture(gl);
	}else{
		gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
		this.updateTexture(gl);
	}

	
	return true;
}
/**
* Updates the canvas texture
* @private
*/
GLGE.TextureVideo.prototype.updateTexture=function(gl){
	var video = this.video;
	gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
	//TODO: fix this when minefield is upto spec
	if(video.readyState>0){
	if(video.height<=0){
		video.style.display="";
		video.height=video.offsetHeight;
		video.width=video.offsetWidth;
		video.style.display="none";
	}
	this.canvas.height=video.height;
	this.canvas.width=video.width;
	this.ctx.drawImage(video, 0, 0);
	try{gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.canvas);}
	catch(e){gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.canvas,null);}
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.generateMipmap(gl.TEXTURE_2D);
	
	/*
	use when video is working in webkit
	try{gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video);}
	catch(e){gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, video,null);}
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.generateMipmap(gl.TEXTURE_2D);
	*/
	}
}

})(GLGE);