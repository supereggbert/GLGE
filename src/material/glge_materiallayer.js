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
 * @name glge_materiallayer.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){




/**
* @class The material layer describes how to apply this layer to the material
* @see GLGE.Material
* @augments GLGE.Animatable
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
* @augments GLGE.Events
*/
GLGE.MaterialLayer=function(uid){
	this.blendMode=GLGE.BL_MIX;
	GLGE.Assets.registerAsset(this,uid);
};
GLGE.augment(GLGE.Animatable,GLGE.MaterialLayer);
GLGE.augment(GLGE.QuickNotation,GLGE.MaterialLayer);
GLGE.augment(GLGE.JSONLoader,GLGE.MaterialLayer);
GLGE.augment(GLGE.Events,GLGE.MaterialLayer);
/**
 * @name GLGE.MaterialLayer#shaderupdated
 * @event Fires when a change will result in a change to the GLSL shader
 * @param {object} data
 */
 
GLGE.MaterialLayer.prototype.className="MaterialLayer";
GLGE.MaterialLayer.prototype.texture=null;
GLGE.MaterialLayer.prototype.blendMode=null;
GLGE.MaterialLayer.prototype.mapto=GLGE.M_COLOR;
GLGE.MaterialLayer.prototype.mapinput=GLGE.UV1;
GLGE.MaterialLayer.prototype.scaleX=1;
GLGE.MaterialLayer.prototype.offsetX=0;
GLGE.MaterialLayer.prototype.rotX=0;
GLGE.MaterialLayer.prototype.scaleY=1;
GLGE.MaterialLayer.prototype.offsetY=0;
GLGE.MaterialLayer.prototype.rotY=0;
GLGE.MaterialLayer.prototype.scaleZ=1;
GLGE.MaterialLayer.prototype.offsetZ=0;
GLGE.MaterialLayer.prototype.rotZ=0;
GLGE.MaterialLayer.prototype.dScaleX=0;
GLGE.MaterialLayer.prototype.dOffsetX=0;
GLGE.MaterialLayer.prototype.dRotX=0;
GLGE.MaterialLayer.prototype.dScaleY=0;
GLGE.MaterialLayer.prototype.dOffsetY=0;
GLGE.MaterialLayer.prototype.dRotY=0;
GLGE.MaterialLayer.prototype.dScaleZ=0;
GLGE.MaterialLayer.prototype.dOffsetZ=0;
GLGE.MaterialLayer.prototype.dRotZ=0;
GLGE.MaterialLayer.prototype.alpha=1;
GLGE.MaterialLayer.prototype.height=0.05;
GLGE.MaterialLayer.prototype.matrix=null;

/**
* Gets the textures used by the layer
* @return {GLGE.Texture} The current shininess of the material
*/
GLGE.MaterialLayer.prototype.getMatrix=function(){
	if(!this.matrix){
		var offset=this.getOffset();
		var scale=this.getScale();
		var rotation=this.getRotation();
		this.matrix=GLGE.mulMat4(GLGE.mulMat4(GLGE.translateMatrix(offset.x,offset.y,offset.z),GLGE.scaleMatrix(scale.x,scale.y,scale.z)),GLGE.rotateMatrix(rotation.x,rotation.y,rotation.z));
	}
	return this.matrix;
};
/**
* Sets the height for this layer, currently only used for parallax mapping
* @param {number} the height of this layer
*/
GLGE.MaterialLayer.prototype.setHeight=function(value){
	this.height=value;
	return this;
};
/**
* Gets the height for this layer, currently only used for parallax mapping
* @return {number} the height of this layer
*/
GLGE.MaterialLayer.prototype.getHeight=function(){
	return this.height;
};

/**
* Sets the textures alpha blending value
* @param {number} the alpha for this layer
*/
GLGE.MaterialLayer.prototype.setAlpha=function(value){
	this.alpha=value;
	return this;
};
/**
* Gets the textures alpha blending value
* @return {number} the alpha for this layer
*/
GLGE.MaterialLayer.prototype.getAlpha=function(){
	return this.alpha;
};

/**
* Sets the textures used by the layer
* @param {GLGE.Texture} value the teture to associate with this layer
*/
GLGE.MaterialLayer.prototype.setTexture=function(value){
	if(typeof value=="string")  value=GLGE.Assets.get(value);
	this.texture=value;
	this.fireEvent("shaderupdate",{});
	return this;
};
/**
* Gets the textures used by the layer
* @return {GLGE.Texture} The current shininess of the material
*/
GLGE.MaterialLayer.prototype.getTexture=function(){
	return this.texture;
};
/**
* Sets the flag for how this layer maps to the material
* @param {Number} value the flags to set for this layer
*/
GLGE.MaterialLayer.prototype.setMapto=function(value){
	this.mapto=value;
	this.fireEvent("shaderupdate",{});
	return this;
};
/**
* Gets the flag representing the way the layer maps to the material
* @return {Number} The flags currently set for this layer
*/
GLGE.MaterialLayer.prototype.getMapto=function(){
	return this.mapto;
};
/**
* Sets the texture coordinate system
* @param {Number} value the mapping to use
*/
GLGE.MaterialLayer.prototype.setMapinput=function(value){
	this.mapinput=value;
	this.fireEvent("shaderupdate",{});
	return this;
};
/**
* Gets the texture coordinate system
* @return {Number} The current mapping
*/
GLGE.MaterialLayer.prototype.getMapinput=function(){
	return this.mapinput;
};

/**
* Gets the layers texture offset
* @return {object} the current offset
*/
GLGE.MaterialLayer.prototype.getOffset=function(){
	var offset={};
	offset.x=parseFloat(this.getOffsetX())+parseFloat(this.getDOffsetX());
	offset.y=parseFloat(this.getOffsetY())+parseFloat(this.getDOffsetY());
	offset.z=parseFloat(this.getOffsetZ())+parseFloat(this.getDOffsetZ());
	return offset;
};

/**
* Gets the layers texture rotation
* @return {object} the current rotation
*/
GLGE.MaterialLayer.prototype.getRotation=function(){
	var rotation={};
	rotation.x=parseFloat(this.getRotX())+parseFloat(this.getDRotX());
	rotation.y=parseFloat(this.getRotY())+parseFloat(this.getDRotY());
	rotation.z=parseFloat(this.getRotZ())+parseFloat(this.getDRotZ());
	return rotation;
};

/**
* Gets the layers texture scale
* @return {object} the current scale
*/
GLGE.MaterialLayer.prototype.getScale=function(){
	var scale={};
	scale.x=parseFloat(this.getScaleX())+parseFloat(this.getDScaleX());
	scale.y=parseFloat(this.getScaleY())+parseFloat(this.getDScaleY());
	scale.z=parseFloat(this.getScaleZ())+parseFloat(this.getDScaleZ());
	return scale;
};

/**
* Sets the layers texture X offset
* @param {Number} value the amount to offset the texture
*/
GLGE.MaterialLayer.prototype.setOffsetX=function(value){
	this.matrix=null;
	this.offsetX=value;
	return this;
};
/**
* Gets the layers texture X offset
* @return {Number} the current offset
*/
GLGE.MaterialLayer.prototype.getOffsetX=function(){
	return this.offsetX;
};
/**
* Sets the layers texture Y offset
* @param {Number} value the amount to offset the texture
*/
GLGE.MaterialLayer.prototype.setOffsetY=function(value){
	this.matrix=null;
	this.offsetY=value;
	return this;
};
/**
* Gets the layers texture Y offset
* @return {Number} the current offset
*/
GLGE.MaterialLayer.prototype.getOffsetY=function(){
	return this.offsetY;
};
/**
* Sets the layers texture Z offset
* @param {Number} value the amount to offset the texture
*/
GLGE.MaterialLayer.prototype.setOffsetZ=function(value){
	this.matrix=null;
	this.offsetZ=value;
	return this;
};
/**
* Gets the layers texture Z offset
* @return {Number} the current offset
*/
GLGE.MaterialLayer.prototype.getOffsetZ=function(){
	return this.offsetZ;
};
/**
* Sets the layers texture X displacment offset, useful for animation
* @param {Number} value the amount to offset the texture
*/
GLGE.MaterialLayer.prototype.setDOffsetX=function(value){
	this.matrix=null;
	this.dOffsetX=value;
	return this;
};
/**
* Gets the layers texture X displacment offset, useful for animation
* @return {Number} the current offset
*/
GLGE.MaterialLayer.prototype.getDOffsetX=function(){
	return this.dOffsetX;
};
/**
* Sets the layers texture Y displacment offset, useful for animation
* @param {Number} value the amount to offset the texture
*/
GLGE.MaterialLayer.prototype.setDOffsetY=function(value){
	this.matrix=null;
	this.dOffsetY=value;
	return this;
};
/**
* Gets the layers texture Y displacment offset, useful for animation
* @return {Number} the current offset
*/
GLGE.MaterialLayer.prototype.getDOffsetY=function(){
	return this.dOffsetY;
};
/**
* Sets the layers texture Z displacment offset, useful for animation
* @param {Number} value the amount to offset the texture
*/
GLGE.MaterialLayer.prototype.setDOffsetZ=function(value){
	this.matrix=null;
	this.dOffsetZ=value;
	return this;
};
/**
* Gets the layers texture X displacment offset, useful for animation
* @return {Number} the current offset
*/
GLGE.MaterialLayer.prototype.getDOffsetZ=function(){
	return this.dOffsetZ;
};
/**
* Sets the layers texture X scale
* @param {Number} value the amount to scale the texture
*/
GLGE.MaterialLayer.prototype.setScaleX=function(value){
	this.matrix=null;
	this.scaleX=value;
	return this;
};
/**
* Gets the layers texture X scale
* @return {Number} the current scale
*/
GLGE.MaterialLayer.prototype.getScaleX=function(){
	return this.scaleX;
};
/**
* Sets the layers texture Y scale
* @param {Number} value the amount to scale the texture
*/
GLGE.MaterialLayer.prototype.setScaleY=function(value){
	this.matrix=null;
	this.scaleY=value;
	return this;
};
/**
* Gets the layers texture Y scale
* @return {Number} the current scale
*/
GLGE.MaterialLayer.prototype.getScaleY=function(){
	return this.scaleY;
};
/**
* Sets the layers texture Z scale
* @param {Number} value the amount to scale the texture
*/
GLGE.MaterialLayer.prototype.setScaleZ=function(value){
	this.matrix=null;
	this.scaleZ=value;
	return this;
};
/**
* Gets the layers texture Z offset
* @return {Number} the current offset
*/
GLGE.MaterialLayer.prototype.getScaleZ=function(){
	return this.scaleZ;
};
/**
* Sets the layers texture X displacment scale, useful for animation
* @param {Number} value the amount to scale the texture
*/
GLGE.MaterialLayer.prototype.setDScaleX=function(value){
	this.matrix=null;
	this.dScaleX=value;
	return this;
};
/**
* Gets the layers texture X displacment scale, useful for animation
* @return {Number} the current scale
*/
GLGE.MaterialLayer.prototype.getDScaleX=function(){
	return this.dScaleX;
};
/**
* Sets the layers texture Y displacment scale, useful for animation
* @param {Number} value the amount to scale the texture
*/
GLGE.MaterialLayer.prototype.setDScaleY=function(value){
	this.matrix=null;
	this.dScaleY=value;
	return this;
};
/**
* Gets the layers texture Y displacment scale, useful for animation
* @return {Number} the current scale
*/
GLGE.MaterialLayer.prototype.getDScaleY=function(){
	return this.dScaleY;
};
/**
* Sets the layers texture Z displacment scale, useful for animation
* @param {Number} value the amount to scale the texture
*/
GLGE.MaterialLayer.prototype.setDScaleZ=function(value){
	this.matrix=null;
	this.dScaleZ=value;
	return this;
};
/**
* Gets the layers texture X displacment scale, useful for animation
* @return {Number} the current scale
*/
GLGE.MaterialLayer.prototype.getDScaleZ=function(){
	return this.dScaleZ;
};


/**
* Sets the layers texture X Rotation
* @param {Number} value the amount to roate the texture
*/
GLGE.MaterialLayer.prototype.setRotX=function(value){
	this.matrix=null;
	this.rotX=value;
	return this;
};
/**
* Gets the layers texture X rotate
* @return {Number} the current rotate
*/
GLGE.MaterialLayer.prototype.getRotX=function(){
	return this.rotX;
};
/**
* Sets the layers texture Y rotate
* @param {Number} value the amount to rotate the texture
*/
GLGE.MaterialLayer.prototype.setRotY=function(value){
	this.matrix=null;
	this.rotY=value;
	return this;
};
/**
* Gets the layers texture Y rotate
* @return {Number} the current rotate
*/
GLGE.MaterialLayer.prototype.getRotY=function(){
	return this.rotY;
};
/**
* Sets the layers texture Z rotate
* @param {Number} value the amount to rotate the texture
*/
GLGE.MaterialLayer.prototype.setRotZ=function(value){
	this.matrix=null;
	this.rotZ=value;
	return this;
};
/**
* Gets the layers texture Z rotate
* @return {Number} the current rotate
*/
GLGE.MaterialLayer.prototype.getRotZ=function(){
	return this.rotZ;
};
/**
* Sets the layers texture X displacment rotation, useful for animation
* @param {Number} value the amount to rotation the texture
*/
GLGE.MaterialLayer.prototype.setDRotX=function(value){
	this.matrix=null;
	this.dRotX=value;
	return this;
};
/**
* Gets the layers texture X displacment rotation, useful for animation
* @return {Number} the current rotation
*/
GLGE.MaterialLayer.prototype.getDRotX=function(){
	return this.dRotX;
};
/**
* Sets the layers texture Y displacment rotation, useful for animation
* @param {Number} value the amount to rotaion the texture
*/
GLGE.MaterialLayer.prototype.setDRotY=function(value){
	this.matrix=null;
	this.dRotY=value;
	return this;
};
/**
* Gets the layers texture Y displacment rotation, useful for animation
* @return {Number} the current rotation
*/
GLGE.MaterialLayer.prototype.getDRotY=function(){
	return this.dRotY;
};
/**
* Sets the layers texture Z displacment rotation, useful for animation
* @param {Number} value the amount to rotation the texture
*/
GLGE.MaterialLayer.prototype.setDRotZ=function(value){
	this.matrix=null;
	this.dRotZ=value;
	return this;
};
/**
* Gets the layers texture X displacment rotation, useful for animation
* @return {Number} the current rotation
*/
GLGE.MaterialLayer.prototype.getDRotZ=function(){
	return this.dRotZ;
};

/**
* Sets the layers blending mode
* @param {Number} value the blend mode for the layer
*/
GLGE.MaterialLayer.prototype.setBlendMode=function(value){
	this.blendMode=value;
	this.fireEvent("shaderupdate",{});
	return this;
};
/**
* Gets the layers tblending mode
* @return {Number} the blend mode for the layer
*/
GLGE.MaterialLayer.prototype.getBlendMode=function(){
	return this.blendMode;
};



})(GLGE);