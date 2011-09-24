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
 * @name glge_texturecube.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){




/**
* @class A texture to be included in a material
* @param {string} uid the unique id for this texture
* @see GLGE.Material
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.TextureCube=function(uid){
	GLGE.Assets.registerAsset(this,uid);
}
GLGE.augment(GLGE.QuickNotation,GLGE.TextureCube);
GLGE.augment(GLGE.JSONLoader,GLGE.TextureCube);
GLGE.augment(GLGE.Events,GLGE.TextureCube);
GLGE.TextureCube.prototype.className="TextureCube";
GLGE.TextureCube.prototype.posX=null;
GLGE.TextureCube.prototype.negX=null;
GLGE.TextureCube.prototype.posY=null;
GLGE.TextureCube.prototype.negY=null;
GLGE.TextureCube.prototype.posZ=null;
GLGE.TextureCube.prototype.negZ=null;
GLGE.TextureCube.prototype.texture=null;
GLGE.TextureCube.prototype.glTexture=null;
GLGE.TextureCube.prototype.loadState=0;
/**
* Sets the url for a given image
* @param {string} url the texture image url
* @param {string} image the image element to load
*/
GLGE.TextureCube.prototype.setSrc=function(url,image,mask){
	this.url=url;
	this.state=0;
	this[image]=new Image();
	var texture=this;
	this[image].onload = function(){
		texture.loadState+=mask;
	}	
	this[image].src=url;	
	if(this.glTexture && this.gl) {
		this.gl.deleteTexture(this.glTexture);
		this.glTexture=null;
	}
	return this;
}

/**
* Sets the positive X cube image
* @param {string} url the texture image url
*/
GLGE.TextureCube.prototype.setSrcPosX=function(url){
	this.setSrc(url,"posX",1);
	return this;
};
/**
* Sets the negative X cube image
* @param {string} url the texture image url
*/
GLGE.TextureCube.prototype.setSrcNegX=function(url){
	this.setSrc(url,"negX",2);
	return this;
};
/**
* Sets the positive Y cube image
* @param {string} url the texture image url
*/
GLGE.TextureCube.prototype.setSrcPosY=function(url){
	this.setSrc(url,"posY",4);
	return this;
};
/**
* Sets the negative Y cube image
* @param {string} url the texture image url
*/
GLGE.TextureCube.prototype.setSrcNegY=function(url){
	if(typeof url!="string"){
		this.negY=url;
		this.loadState+=8;
	}else{
		this.setSrc(url,"negY",8);
	}
	return this;
};
/**
* Sets the positive Z cube image
* @param {string} url the texture image url
*/
GLGE.TextureCube.prototype.setSrcPosZ=function(url){
	this.setSrc(url,"posZ",16);
	return this;
};
/**
* Sets the negative Z cube image
* @param {string} url the texture image url
*/
GLGE.TextureCube.prototype.setSrcNegZ=function(url){
	this.setSrc(url,"negZ",32);
	return this;
};

/**
* Sets the textures image location
* @private
**/
GLGE.TextureCube.prototype.doTexture=function(gl,object){
	this.gl=gl;
	//create the texture if it's not already created
	if(!this.glTexture) this.glTexture=gl.createTexture();
	//if the image is loaded then set in the texture data
	gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.glTexture);
	if(this.loadState==63 && this.state==0){
		gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.posX);
		gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.negX);
		gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.posY);
		gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.negY);
		gl.texImage2D(gl.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.posZ);
		gl.texImage2D(gl.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.negZ);
		
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
		gl.texParameteri(gl.TEXTURE_CUBE_MAP, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
		gl.generateMipmap(gl.TEXTURE_CUBE_MAP);
		gl.bindTexture(gl.TEXTURE_CUBE_MAP, null);
		this.state=1;
	}
	gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.glTexture);
	if(this.state==1) return true;
		else return false;
}

})(GLGE);