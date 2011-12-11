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
GLGE.FilterGlow=function(uid){
	this.setEmitBufferWidth(256);
	this.setEmitBufferHeight(256);
	GLGE.Assets.registerAsset(this,uid);
};
GLGE.augment(GLGE.Filter2d,GLGE.FilterGlow);
GLGE.FilterGlow.prototype.renderEmit=true;
GLGE.FilterGlow.prototype.blur=1.2;
GLGE.FilterGlow.prototype.intensity=3;
GLGE.FilterGlow.prototype.fxaacutoff=2;
GLGE.FilterGlow.prototype.fxaastartintensity=0;

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
GLGE.FilterGlow.prototype.setFXAA=function(value){
	this.useFXAA=value;
	this.createPasses();
	return this;
}
GLGE.FilterGlow.prototype.setFXAACutoff=function(value){
	this.fxaacutoff=value;
	this.createPasses();
	return this;
}
GLGE.FilterGlow.prototype.setFXAAStartIntensity=function(value){
	this.fxaastartintensity=value;
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
	pass1.push("color += texture2D(GLGE_EMIT, vec2(texCoord.x, texCoord.y)) * 0.18 * rnd;");
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
	pass2.push("uniform sampler2D GLGE_EMIT;");
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
	pass2.push("color += texture2D(GLGE_PASS0, vec2(texCoord.x, texCoord.y)) * 0.18 * rnd;");
	pass2.push("color += texture2D(GLGE_PASS0, vec2(texCoord.x, texCoord.y + blurSize)) * 0.15 * rnd;");
	pass2.push("color += texture2D(GLGE_PASS0, vec2(texCoord.x, texCoord.y + 2.0*blurSize)) * 0.12 * rnd;");
	pass2.push("color += texture2D(GLGE_PASS0, vec2(texCoord.x, texCoord.y + 3.0*blurSize)) * 0.09 * rnd;");
	pass2.push("color += texture2D(GLGE_PASS0, vec2(texCoord.x, texCoord.y + 4.0*blurSize)) * 0.05 * rnd;");
	pass2.push("gl_FragColor = vec4(color.rgb*"+(this.intensity.toFixed(5))+"+texture2D(GLGE_RENDER,texCoord).rgb,1.0);");
	pass2.push("}");
	
	
	this.passes=[];
	this.addPass(pass1.join(""));
	this.addPass(pass2.join(""));
	
	if(this.useFXAA){
		var pass3=[]
		pass3.push("precision highp float;");
		pass3.push("uniform sampler2D GLGE_PASS1;");
		pass3.push("varying vec2 texCoord;");
		pass3.push("vec2 inverse_buffer_size=vec2(1.0/1280.0,1.0/720.0);");
		pass3.push("#define FXAA_REDUCE_MIN   (1.0/128.0)");
		pass3.push("#define FXAA_REDUCE_MUL   (1.0/16.0)");
		pass3.push("#define FXAA_SPAN_MAX     8.0");
		pass3.push("void  main(){");
		pass3.push("	vec3 rgbNW = texture2D(GLGE_PASS1,  (gl_FragCoord.xy + vec2(-1.0,-1.0)) * inverse_buffer_size).xyz;");
		pass3.push("	vec3 rgbNE = texture2D(GLGE_PASS1,  (gl_FragCoord.xy + vec2(1.0,-1.0)) * inverse_buffer_size).xyz;");
		pass3.push("	vec3 rgbSW = texture2D(GLGE_PASS1,  (gl_FragCoord.xy + vec2(-1.0,1.0)) * inverse_buffer_size).xyz;");
		pass3.push("	vec3 rgbSE = texture2D(GLGE_PASS1,  (gl_FragCoord.xy + vec2(1.0,1.0)) * inverse_buffer_size).xyz;");
		pass3.push("	vec3 rgbM  = texture2D(GLGE_PASS1,  gl_FragCoord.xy  * inverse_buffer_size).xyz;");
		pass3.push("	vec3 luma = vec3(0.299, 0.587, 0.114);");
		pass3.push("	float lumaNW = dot(rgbNW, luma);");
		pass3.push("	float lumaNE = dot(rgbNE, luma);");
		pass3.push("	float lumaSW = dot(rgbSW, luma);");
		pass3.push("	float lumaSE = dot(rgbSE, luma);");
		pass3.push("	float lumaM  = dot(rgbM,  luma);");
		pass3.push("	float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));");
		pass3.push("	float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));");
			
		pass3.push("	vec2 dir;");
		pass3.push("	dir.x = -((lumaNW + lumaNE) - (lumaSW + lumaSE));");
		pass3.push("	dir.y =  ((lumaNW + lumaSW) - (lumaNE + lumaSE));");
			
		pass3.push("	float dirReduce = max(");
		pass3.push("	(lumaNW + lumaNE + lumaSW + lumaSE) * (0.25 * FXAA_REDUCE_MUL),");
		pass3.push("	FXAA_REDUCE_MIN);");
			
		pass3.push("	float rcpDirMin = 1.0/(min(abs(dir.x), abs(dir.y)) + dirReduce);");
		pass3.push("	dir = min(vec2( FXAA_SPAN_MAX,  FXAA_SPAN_MAX),");
		pass3.push("	max(vec2(-FXAA_SPAN_MAX, -FXAA_SPAN_MAX),");
		pass3.push("	dir * rcpDirMin)) * inverse_buffer_size;");
			  
		pass3.push("	vec3 rgbA = 0.5 * (");
		pass3.push("	texture2D(GLGE_PASS1,   gl_FragCoord.xy  * inverse_buffer_size + dir * (1.0/3.0 - 0.5)).xyz +");
		pass3.push("	texture2D(GLGE_PASS1,   gl_FragCoord.xy  * inverse_buffer_size + dir * (2.0/3.0 - 0.5)).xyz);");
			
		pass3.push("	vec3 rgbB = rgbA * 0.5 + 0.25 * (");
		pass3.push("	texture2D(GLGE_PASS1,  gl_FragCoord.xy  * inverse_buffer_size + dir *  - 0.5).xyz +");
		pass3.push("	texture2D(GLGE_PASS1,  gl_FragCoord.xy  * inverse_buffer_size + dir * 0.5).xyz);");
		pass3.push("	float lumaB = dot(rgbB, luma);");
		pass3.push("	if((lumaB < lumaMin) || (lumaB > lumaMax)) gl_FragColor = vec4(rgbA,1.0);");
		pass3.push("	    else gl_FragColor = vec4(rgbB,1.0);");
		pass3.push("	if(length(rgbM)>"+this.fxaacutoff.toFixed(2)+") gl_FragColor = vec4(rgbM,1.0);");
		pass3.push("	if(length(rgbM)<"+this.fxaastartintensity.toFixed(2)+") gl_FragColor = vec4(rgbM,1.0);");
		pass3.push("}");
		this.addPass(pass3.join("\n"));
	}
	
}



})(GLGE);