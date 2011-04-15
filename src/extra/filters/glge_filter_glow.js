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
 * @name glge_filter_glow.js
 * @author me@paulbrunt.co.uk
 */
(function(GLGE){
 
/**
* @class Postprocessing glow filter
* @augments GLGE.Filter2d
*/
GLGE.FilterGlow=function(){
	this.setEmitBufferWidth(256);
	this.setEmitBufferHeight(256);
};
GLGE.augment(GLGE.Filter2d,GLGE.FilterGlow);
GLGE.FilterGlow.prototype.renderEmit=true;
GLGE.FilterGlow.prototype.blur=1.2;
GLGE.FilterGlow.prototype.intensity=3;

GLGE.FilterGlow.prototype.setEmitBufferWidth=function(value){
	GLGE.Filter2d.prototype.setEmitBufferWidth.call(this,value);
	this.createPasses();
	return this;
}
GLGE.FilterGlow.prototype.setEmitBufferHeight=function(value){
	GLGE.Filter2d.prototype.setEmitBufferHeight.call(this,value);
	this.createPasses();
	return this;
}
GLGE.FilterGlow.prototype.setBlur=function(blur){
	this.blur=blur;
	this.createPasses();
	return this;
}
GLGE.FilterGlow.prototype.setIntensity=function(intensity){
	this.intensity=intensity;
	this.createPasses();
	return this;
}
GLGE.FilterGlow.prototype.createPasses=function(){
	var pass1=[];
	pass1.push("precision highp float;");
	pass1.push("uniform sampler2D GLGE_EMIT;");
	pass1.push("varying vec2 texCoord;");
	pass1.push("float blurSize="+(1/this.emitBufferWidth*this.blur).toFixed(10)+";");
	pass1.push("float rand(vec2 co){;");
	pass1.push("return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);");
	pass1.push("}");
	pass1.push("void main(void){");
	pass1.push("vec4 color=vec4(0.0,0.0,0.0,0.0);");
	pass1.push("float rnd=1.0-rand(texCoord.xy)*4.0*blurSize;");
	pass1.push("color += texture2D(GLGE_EMIT, vec2(texCoord.x - 4.0*blurSize, texCoord.y)) * 0.05 * rnd;");
	pass1.push("color += texture2D(GLGE_EMIT, vec2(texCoord.x - 3.0*blurSize, texCoord.y)) * 0.09 * rnd;");
	pass1.push("color += texture2D(GLGE_EMIT, vec2(texCoord.x - 2.0*blurSize, texCoord.y)) * 0.12 * rnd;");
	pass1.push("color += texture2D(GLGE_EMIT, vec2(texCoord.x - blurSize, texCoord.y)) * 0.15 * rnd;");
	pass1.push("color += texture2D(GLGE_EMIT, vec2(texCoord.x, texCoord.y)) * 0.46 * rnd;");
	pass1.push("color += texture2D(GLGE_EMIT, vec2(texCoord.x + blurSize, texCoord.y)) * 0.15 * rnd;");
	pass1.push("color += texture2D(GLGE_EMIT, vec2(texCoord.x + 2.0*blurSize, texCoord.y)) * 0.12 * rnd;");
	pass1.push("color += texture2D(GLGE_EMIT, vec2(texCoord.x + 3.0*blurSize, texCoord.y)) * 0.09 * rnd;");
	pass1.push("color += texture2D(GLGE_EMIT, vec2(texCoord.x + 4.0*blurSize, texCoord.y)) * 0.05 * rnd;");
	pass1.push("gl_FragColor = vec4(color.rgb,1.0);");
	pass1.push("}");
	
	var pass2=[];
	pass2.push("precision highp float;");
	pass2.push("uniform sampler2D GLGE_PASS0;");
	pass2.push("uniform sampler2D GLGE_RENDER;");
	pass2.push("varying vec2 texCoord;");
	pass2.push("float blurSize="+(1/this.emitBufferHeight*this.blur).toFixed(10)+";");
	pass2.push("float rand(vec2 co){;");
	pass2.push("return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);");
	pass2.push("}");
	pass2.push("void main(void){");
	pass2.push("vec4 color=vec4(0.0,0.0,0.0,0.0);");
	pass2.push("float rnd=1.0-rand(texCoord.xy)*4.0*blurSize;");
	pass2.push("color += texture2D(GLGE_PASS0, vec2(texCoord.x, texCoord.y - 4.0*blurSize)) * 0.05 * rnd;");
	pass2.push("color += texture2D(GLGE_PASS0, vec2(texCoord.x, texCoord.y - 3.0*blurSize)) * 0.09 * rnd;");
	pass2.push("color += texture2D(GLGE_PASS0, vec2(texCoord.x, texCoord.y - 2.0*blurSize)) * 0.12 * rnd;");
	pass2.push("color += texture2D(GLGE_PASS0, vec2(texCoord.x, texCoord.y - blurSize)) * 0.15 * rnd;");
	pass2.push("color += texture2D(GLGE_PASS0, vec2(texCoord.x, texCoord.y)) * 0.46 * rnd;");
	pass2.push("color += texture2D(GLGE_PASS0, vec2(texCoord.x, texCoord.y + blurSize)) * 0.15 * rnd;");
	pass2.push("color += texture2D(GLGE_PASS0, vec2(texCoord.x, texCoord.y + 2.0*blurSize)) * 0.12 * rnd;");
	pass2.push("color += texture2D(GLGE_PASS0, vec2(texCoord.x, texCoord.y + 3.0*blurSize)) * 0.09 * rnd;");
	pass2.push("color += texture2D(GLGE_PASS0, vec2(texCoord.x, texCoord.y + 4.0*blurSize)) * 0.05 * rnd;");
	pass2.push("gl_FragColor = vec4(color.rgb*"+(this.intensity.toFixed(5))+"+texture2D(GLGE_RENDER,texCoord).rgb,1.0);");
	pass2.push("}");
	
	this.passes=[];
	this.addPass(pass1.join(""));
	this.addPass(pass2.join(""));
}



})(GLGE);