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
 * @name glge_texture.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){



/**
* @name GLGE.Texture#downloadComplete
* @event fires when all the assets for this texture have finished loading
* @param {object} data
*/



/**
* @class A texture to be included in a material
* @param {string} uid the unique id for this texture
* @see GLGE.Material
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
* @augments GLGE.Events
*/
GLGE.Texture=function(uid){
	GLGE.Assets.registerAsset(this,uid);
}
GLGE.augment(GLGE.QuickNotation,GLGE.Texture);
GLGE.augment(GLGE.JSONLoader,GLGE.Texture);
GLGE.augment(GLGE.Events,GLGE.Texture);
GLGE.Texture.prototype.className="Texture";
GLGE.Texture.prototype.image=null;
GLGE.Texture.prototype.glTexture=null;
GLGE.Texture.prototype.url=null;
GLGE.Texture.prototype.state=0;
/**
* Gets the textures used by the layer
* @return {string} The textures image url
*/
GLGE.Texture.prototype.getSrc=function(){
	return this.url;
};

/**
* Sets the textures image location
* @param {string} url the texture image url
*/
GLGE.Texture.prototype.setSrc=function(url){
	this.url=url;
	this.state=0;
	this.image=new Image();
	var texture=this;
	this.image.onload = function(){
		texture.state=1;
    	texture.fireEvent("downloadComplete");
	}	
	this.image.src=url;	
	if(this.glTexture && this.gl){
		this.gl.deleteTexture(this.glTexture);
		this.glTexture=null;
	}
	return this;
};

/**
* Sets the textures image location
* @private
**/
GLGE.Texture.prototype.doTexture=function(gl){
	this.gl=gl;
	if(!gl.urlTextures) gl.urlTextures={};
	if(gl.urlTextures[this.url]){
		this.glTexture=gl.urlTextures[this.url];
		this.state=2;
	}
	//create the texture if it's not already created
	if(!this.image) this.setSrc(this.url);
	if(!this.glTexture) this.glTexture=gl.createTexture();
	//if the image is loaded then set in the texture data
	if(this.state==1){
		gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
		//START... FRANCISCO REIS: to accept Non Power of Two Images
		var w = Math.pow( 2, Math.round( Math.log( this.image.width ) / Math.log( 2 ) ) );
		var h = Math.pow( 2, Math.round( Math.log( this.image.height ) / Math.log( 2 ) ) );

		var imageOrCanvas;
		if(w == this.image.width && h == this.image.height)
			imageOrCanvas = this.image;
		else
		{
			imageOrCanvas = document.createElement("canvas");
			imageOrCanvas.width=w;
			imageOrCanvas.height=h;
			var context = imageOrCanvas.getContext("2d");
			context.drawImage(this.image,0,0,w,h);
		}

		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,imageOrCanvas);//this line was replaced from ",this.image)" to ",imageOrCanvas)"
		//...END FRANCISCO REIS: to accept Non Power of Two Images
		gl.urlTextures[this.url]=this.glTexture;
		gl.generateMipmap(gl.TEXTURE_2D);
		gl.bindTexture(gl.TEXTURE_2D, null);
		this.state=2;
	}
	gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
	
	if(this.state==2) return true;
		else return false;
}


/**
* Determin if the image resource has been downloaded
**/
GLGE.Texture.prototype.isComplete=function(){
    return this.state>0;
}

})(GLGE);