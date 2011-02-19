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
 * @name glge_quicknote.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){




/**
* @class Creates a new light source to be added to a scene
* @property {Boolean} diffuse Dose this light source effect diffuse shading
* @property {Boolean} specular Dose this light source effect specular shading
* @augments GLGE.Animatable
* @augments GLGE.Placeable

* * @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.Light=function(uid){
	GLGE.Assets.registerAsset(this,uid);
	this.color={r:1,g:1,b:1};
}
GLGE.augment(GLGE.Placeable,GLGE.Light);
GLGE.augment(GLGE.Animatable,GLGE.Light);
GLGE.augment(GLGE.QuickNotation,GLGE.Light);
GLGE.augment(GLGE.JSONLoader,GLGE.Light);
GLGE.Light.prototype.className="Light";

/**
 * @name GLGE.Light#shaderupdate
 * @event fires when a light has changed resulting in need to recompile shaders
 * @param {object} data
 */

/**
* @constant 
* @description Enumeration for an point light source
*/
GLGE.L_POINT=1;
/**
* @constant 
* @description Enumeration for an directional light source
*/
GLGE.L_DIR=2;
/**
* @constant 
* @description Enumeration for an spot light source
*/
GLGE.L_SPOT=3;
/**
* @constant 
* @description Enumeration a light that is disabled
*/
GLGE.L_OFF=4;

GLGE.Light.prototype.constantAttenuation=1;
GLGE.Light.prototype.linearAttenuation=0.002;
GLGE.Light.prototype.quadraticAttenuation=0.0008;
GLGE.Light.prototype.spotCosCutOff=0.95;
GLGE.Light.prototype.spotPMatrix=null;
GLGE.Light.prototype.spotExponent=10;
GLGE.Light.prototype.color=null; 
GLGE.Light.prototype.diffuse=true; 
GLGE.Light.prototype.specular=true; 
GLGE.Light.prototype.samples=0; 
GLGE.Light.prototype.softness=0.01; 
GLGE.Light.prototype.type=GLGE.L_POINT;
GLGE.Light.prototype.frameBuffer=null;
GLGE.Light.prototype.renderBuffer=null;
GLGE.Light.prototype.texture=null;
GLGE.Light.prototype.bufferHeight=256;
GLGE.Light.prototype.bufferWidth=256;
GLGE.Light.prototype.shadowBias=2.0;
GLGE.Light.prototype.distance=100.0;
GLGE.Light.prototype.castShadows=false;

/**
* Gets the spot lights projection matrix
* @returns the lights spot projection matrix
* @private
*/
GLGE.Light.prototype.getPMatrix=function(){
	if(!this.spotPMatrix){
		var far;
		if(this.scene && this.scene.camera) far=this.scene.camera.far;
			else far=1000;
		this.spotPMatrix=GLGE.makePerspective(Math.acos(this.spotCosCutOff)/3.14159*360, 1.0, 0.1, far);
	}
	return this.spotPMatrix;
}



/**
* Sets the shadow casting flag
* @param {number} distance
*/
GLGE.Light.prototype.setDistance=function(value){
	this.distance=value;
	return this;
}
/**
* Gets the shadow casting distance
* @returns {number} distance
*/
GLGE.Light.prototype.getDistance=function(){
	return this.distance;
}

/**
* Sets negative shadow flag
* @param {boolean} negative shadow
*/
GLGE.Light.prototype.setNegativeShadow=function(value){
	this.negativeShadow=value;
	this.fireEvent("shaderupdate",{});
	return this;
}
/**
* Gets negative shadow flag
* @param {boolean} negative shadow
*/
GLGE.Light.prototype.getNegative=function(){
	return this.negativeShadow;
}

/**
* Sets the shadow casting flag
* @param {number} value should cast shadows?
*/
GLGE.Light.prototype.setCastShadows=function(value){
	this.castShadows=value;
	this.fireEvent("shaderupdate",{});
	return this;
}
/**
* Gets the shadow casting flag
* @returns {number} true if casts shadows
*/
GLGE.Light.prototype.getCastShadows=function(){
	return this.castShadows;
	return this;
}
/**
* Sets the shadow bias
* @param {number} value The shadow bias
*/
GLGE.Light.prototype.setShadowBias=function(value){
	this.shadowBias=value;
	return this;
}
/**
* Gets the shadow bias
* @returns {number} The shadow buffer bias
*/
GLGE.Light.prototype.getShadowBias=function(){
	return this.shadowBias;
}

/**
* Sets the number of samples for this shadow
* @param {number} value The number of samples to perform
*/
GLGE.Light.prototype.setShadowSamples=function(value){
	this.samples=value;
	this.fireEvent("shaderupdate",{});
	return this;
}
/**
* Gets the number of samples for this shadow
* @returns {number} The number of samples
*/
GLGE.Light.prototype.getShadowSamples=function(){
	return this.samples;
}
/**
* Sets the shadow softness
* @param {number} value The number of samples to perform
*/
GLGE.Light.prototype.setShadowSoftness=function(value){
	this.softness=value;
	this.fireEvent("shaderupdate",{});
	return this;
}
/**
* Gets the shadow softness
* @returns {number} The softness of the shadows
*/
GLGE.Light.prototype.getShadowSamples=function(){
	return this.softness;
}
/**
* Sets the shadow buffer width
* @param {number} value The shadow buffer width
*/
GLGE.Light.prototype.setBufferWidth=function(value){
	this.bufferWidth=value;
	return this;
}
/**
* Gets the shadow buffer width
* @returns {number} The shadow buffer width
*/
GLGE.Light.prototype.getBufferHeight=function(){
	return this.bufferHeight;
}
/**
* Sets the shadow buffer width
* @param {number} value The shadow buffer width
*/
GLGE.Light.prototype.setBufferHeight=function(value){
	this.bufferHeight=value;
	return this;
}
/**
* Gets the shadow buffer width
* @returns {number} The shadow buffer width
*/
GLGE.Light.prototype.getBufferWidth=function(){
	return this.bufferWidth;
}
/**
* Sets the spot light cut off
* @param {number} value The cos of the angle to limit
*/
GLGE.Light.prototype.setSpotCosCutOff=function(value){
	this.spotPMatrix=null;
	this.spotCosCutOff=value;
	return this;
}
/**
* Gets the spot light cut off
* @returns {number} The cos of the limiting angle 
*/
GLGE.Light.prototype.getSpotCosCutOff=function(){
	return this.spotCosCutOff;
}
/**
* Sets the spot light exponent
* @param {number} value The spot lights exponent
*/
GLGE.Light.prototype.setSpotExponent=function(value){
	this.spotExponent=value;
	return this;
}
/**
* Gets the spot light exponent
* @returns {number} The exponent of the spot light
*/
GLGE.Light.prototype.getSpotExponent=function(){
	return this.spotExponent;
}
/**
* Sets the light sources Attenuation
* @returns {Object} The components of the light sources attenuation
*/
GLGE.Light.prototype.getAttenuation=function(constant,linear,quadratic){
	var attenuation={};
	attenuation.constant=this.constantAttenuation;
	attenuation.linear=this.linearAttenuation;
	attenuation.quadratic=this.quadraticAttenuation;
	return attenuation;
}
/**
* Sets the light sources Attenuation
* @param {Number} constant The constant part of the attenuation
* @param {Number} linear The linear part of the attenuation
* @param {Number} quadratic The quadratic part of the attenuation
*/
GLGE.Light.prototype.setAttenuation=function(constant,linear,quadratic){
	this.constantAttenuation=constant;
	this.linearAttenuation=linear;
	this.quadraticAttenuation=quadratic;
	return this;
}
/**
* Sets the light sources constant attenuation
* @param {Number} value The constant part of the attenuation
*/
GLGE.Light.prototype.setAttenuationConstant=function(value){
	this.constantAttenuation=value;
	return this;
}
/**
* Sets the light sources linear attenuation
* @param {Number} value The linear part of the attenuation
*/
GLGE.Light.prototype.setAttenuationLinear=function(value){
	this.linearAttenuation=value;
	return this;
}
/**
* Sets the light sources quadratic attenuation
* @param {Number} value The quadratic part of the attenuation
*/
GLGE.Light.prototype.setAttenuationQuadratic=function(value){
	this.quadraticAttenuation=value;
	return this;
}

/**
* Sets the color of the light source
* @param {string} color The color of the light
*/
GLGE.Light.prototype.setColor=function(color){
	color=GLGE.colorParse(color);
	this.color={r:color.r,g:color.g,b:color.b};
	return this;
}
/**
* Sets the red color of the light source
* @param {Number} value The new red level 0-1
*/
GLGE.Light.prototype.setColorR=function(value){
	this.color.r=value;
	return this;
}
/**
* Sets the green color of the light source
* @param {Number} value The new green level 0-1
*/
GLGE.Light.prototype.setColorG=function(value){
	this.color.g=value;
	return this;
}
/**
* Sets the blue color of the light source
* @param {Number} value The new blue level 0-1
*/
GLGE.Light.prototype.setColorB=function(value){
	this.color.b=value;
	return this;
}
/**
* Gets the current color of the light source
* @return {[r,g,b]} The current position
*/
GLGE.Light.prototype.getColor=function(){
	return this.color;
}
/**
* Gets the type of the light
* @return {Number} The type of the light source eg GLGE.L_POINT
*/
GLGE.Light.prototype.getType=function(){
	return this.type;
}
/**
* Sets the type of the light
* @param {Number} type The type of the light source eg GLGE.L_POINT
*/
GLGE.Light.prototype.setType=function(type){
	this.type=type;
	this.fireEvent("shaderupdate",{});
	return this;
}

GLGE.Light.prototype.enableLight=function(){
    if (this.type == GLGE.L_OFF && this.old_type !== undefined) {
        this.setType(this.old_type);
        delete this.old_type;
    }
};

GLGE.Light.prototype.disableLight=function(){
    if (this.type != GLGE.L_OFF) {
        this.old_type=this.type;
        this.setType(GLGE.L_OFF);
    }
};

/**
* init for the rendering
* @private
*/
GLGE.Light.prototype.GLInit=function(gl){	
	this.gl=gl;
	if(this.type==GLGE.L_SPOT && !this.texture){
		this.createSpotBuffer(gl);
	}
}
/**
* Sets up the WebGL needed to render the depth map for this light source. Only used for spot lights which produce shadows
* @private
*/
GLGE.Light.prototype.createSpotBuffer=function(gl){
    this.frameBuffer = gl.createFramebuffer();
    this.renderBuffer = gl.createRenderbuffer();
    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);

    try {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.bufferWidth, this.bufferHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    } catch (e) {
        GLGE.error("incompatible texture creation method");
        var width=parseFloat(this.bufferWidth);
        var height=parseFloat(this.bufferHeight);
        var tex = new Uint8Array(width * height * 4);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, tex);
    }
    
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.bufferWidth, this.bufferHeight);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderBuffer);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
}


})(GLGE);