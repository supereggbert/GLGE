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
 * @name glge_filter_ao.js
 * @author me@paulbrunt.co.uk
 */
(function(GLGE){
 
/**
* @class Postprocessing Ambient Occlusion filter
* @augments GLGE.Filter2d
*/
GLGE.FilterAO=function(){
	this.setUniform("1f","cavitygamma",1/3);
	this.setUniform("1f","whiteMul",2);
	this.setUniform("1f","aogamma",1/3);
	this.setUniform("1f","maxDist",0.025);
	this.passes=[];
};
GLGE.augment(GLGE.Filter2d,GLGE.FilterAO);
GLGE.FilterAO.prototype.renderNormal=true;
GLGE.FilterAO.prototype.quality=1;
GLGE.FilterAO.prototype.range=80;
GLGE.FilterAO.prototype.samples=16;
GLGE.FilterAO.prototype.useRender=true;

GLGE.FilterAO.prototype.getNormalBufferHeight=function(){
	return (this.normalBufferHeight ? this.normalBufferHeight : (this.gl.canvas.height*this.quality|0));
}

GLGE.FilterAO.prototype.getNormalBufferWidth=function(){
	return (this.normalBufferWidth ? this.normalBufferWidth : (this.gl.canvas.width*this.quality|0));
}

GLGE.FilterAO.prototype.setUseRender=function(value){
	this.useRender=value;
	this.normalBuffers=null;
	this.passes=[];
	return this;
}

GLGE.FilterAO.prototype.setSamples=function(value){
	this.samples=value;
	this.normalBuffers=null;
	this.passes=[];
	return this;
}

GLGE.FilterAO.prototype.setQuality=function(value){
	this.quality=value;
	this.normalBuffers=null;
	this.passes=[];
	return this;
}

GLGE.FilterAO.prototype.setRange=function(value){
	this.range=value;
	if(this.gl){
		this.setUniform("1f","blurX",this.range/this.getNormalBufferWidth()*this.quality/this.samples);
		this.setUniform("1f","blurY",this.range/this.getNormalBufferHeight()/this.samples);
	}
	return this;
}

GLGE.FilterAO.prototype.setCavityGamma=function(value){
	this.setUniform("1f","cavitygamma",1/value);
	return this;
}
GLGE.FilterAO.prototype.setAmbientMultiplier=function(value){
	this.setUniform("1f","whiteMul",value);
	return this;
}
GLGE.FilterAO.prototype.setAmbientGamma=function(value){
	this.setUniform("1f","aogamma",1/value);
	return this;
}
GLGE.FilterAO.prototype.setMaximumDistance=function(value){
	this.setUniform("1f","maxDist",value);
	return this;
}

GLGE.FilterAO.prototype.GLRender=function(gl,buffer){
	this.gl=gl;
	if(this.passes.length==0){
		this.createPasses();
	}
	return GLGE.Filter2d.prototype.GLRender.call(this,gl,buffer)
}

GLGE.FilterAO.prototype.createPasses=function(){
	if(!this.gl) return;
	
	
	var width=this.getNormalBufferWidth();
	var height=this.getNormalBufferHeight();
	
	
	var size=(this.samples/4)|0;
	var weights=[];
	for(var i=-size,cnt=0; i<=size;i++,cnt++){
		var n=size-Math.abs(i)+1;
		weights[cnt]=n/(size*size+size);
	}
	weights[size]=0;
	
	this.setUniform("1f","blurX",this.range/width*this.quality/this.samples);
	this.setUniform("1f","blurY",this.range/height/this.samples);



	
	var pass1=[];
	pass1.push("precision highp float;");
	pass1.push("uniform sampler2D GLGE_NORMAL;");
	pass1.push("uniform float maxDist;");
	pass1.push("varying vec2 texCoord;");
	pass1.push("uniform float blurX;");
	pass1.push("float rand(vec2 co){");
	pass1.push("return (fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453)-0.5)*2.0;");
	pass1.push("}");
	pass1.push("void main(void){");
	pass1.push("vec4 n=texture2D(GLGE_NORMAL,texCoord.xy).rgba;");
	pass1.push("vec4 color=vec4(0.0,0.0,0.0,n.a);");
	pass1.push("float blurSize=blurX/(n.a*n.a+1.0);");
	pass1.push("float offset=rand(texCoord.xy)*blurSize+texCoord.x;");
	pass1.push("vec3 samp;");
	pass1.push("float delta;");
	for(var i=-size,cnt=0;i<=size;i++,cnt++){
		if(i==0) continue;
		pass1.push("samp = texture2D(GLGE_NORMAL, vec2("+i+".0*blurSize+offset, texCoord.y)).rga;");
		pass1.push("delta=abs(n.a-samp.b);");
		pass1.push("if(delta<maxDist){");
		pass1.push("delta/=maxDist;");
		pass1.push("color.b -= (samp.r-0.5) * "+weights[cnt]+" * "+((2*i)/Math.abs(i) | 0)+".0;");
		pass1.push("color.rg += samp.rg * "+weights[cnt]+" * (1.0-delta);");
		pass1.push("color.rg += n.rg  * "+weights[cnt]+" * delta;");
		pass1.push("}else{");
		pass1.push("color.rg +=n.rg * "+weights[cnt]+";");
		pass1.push("}");
	}
	pass1.push("color.b = (color.b+1.0)*0.5;");
	pass1.push("gl_FragColor = color;");
	pass1.push("}");
	
	var pass2=[];
	pass2.push("precision highp float;");
	pass2.push("uniform sampler2D GLGE_PASS0;");
	pass2.push("uniform sampler2D GLGE_RENDER;");
	pass2.push("uniform sampler2D GLGE_NORMAL;");
	pass2.push("varying vec2 texCoord;");
	pass2.push("uniform float blurY;");
	
	
	pass2.push("uniform float cavitygamma;");
	pass2.push("uniform float whiteMul;");
	pass2.push("uniform float aogamma;");
	pass2.push("uniform float maxDist;");
	
	
	pass2.push("float rand(vec2 co){");
	pass2.push("return (fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453)-0.5)*2.0;");
	pass2.push("}");
	pass2.push("void main(void){");
	pass2.push("vec4 color=vec4(0.0,0.0,0.0,1.0);");
	pass2.push("vec4 samp=vec4(0.0);");
	pass2.push("float random=rand(texCoord.xy);");
	if(this.quality<1){
		pass2.push("vec2 displace=vec2("+(0.5/width)+","+(0.5/height)+")*random;");
		pass2.push("vec4 n=texture2D(GLGE_PASS0, texCoord.xy+displace);");
	}else{
		pass2.push("vec4 n=texture2D(GLGE_PASS0, texCoord.xy);");
	}
	pass2.push("float delta;");
	pass2.push("float blurSize=blurY/(n.a*n.a+1.0);");
	pass2.push("float offset=random*blurSize+texCoord.y;");
	
	for(var i=-size,cnt=0;i<=size;i++,cnt++){
		if(i==0) continue;
		if(this.quality<1){
			pass2.push("samp = texture2D(GLGE_PASS0, vec2(texCoord.x, "+i+".0*blurSize + offset)+displace);");
		}else{
			pass2.push("samp = texture2D(GLGE_PASS0, vec2(texCoord.x, "+i+".0*blurSize + offset));");
		}
		pass2.push("delta=abs(n.a-samp.a);");
		pass2.push("if(delta<maxDist){");
		pass2.push("delta/=maxDist;");
		pass2.push("color.a -= (samp.g-0.5) * "+weights[cnt]+" * "+((i*2)/Math.abs(i) | 0)+".0;");
		pass2.push("color.rg += samp.rg  * "+weights[cnt]+" * (1.0-delta);");
		pass2.push("color.rg += n.rg * "+weights[cnt]+" * delta;");
		pass2.push("}else{");
		pass2.push("color.rg += n.rg * "+weights[cnt]+";");
		pass2.push("}");
	}
	pass2.push("color.a = (color.a+1.0)*n.b;");
	pass2.push("color.a = pow(color.a,cavitygamma);");
	if(this.quality<1){
		pass2.push("float dif =  length(color.rg-texture2D(GLGE_NORMAL, texCoord.xy+displace).rg);");
		pass2.push("samp =  texture2D(GLGE_NORMAL, texCoord.xy+displace+"+(1/this.gl.canvas.height)+").rgba;");
		pass2.push("if(abs(n.a-samp.a)<maxDist) dif =  max(length(color.rg-samp.rg),dif);");
		pass2.push("samp =  texture2D(GLGE_NORMAL, texCoord.xy+displace-"+(1/this.gl.canvas.height)+").rgba;");
		pass2.push("if(abs(n.a-samp.a)<maxDist) dif =  max(length(color.rg-samp.rg),dif);");
	}else{
		pass2.push("float dif =  length(color.rg-texture2D(GLGE_NORMAL, texCoord.xy).rg);");
	}
	
	pass2.push("float result = 1.0-((dif*(color.a-0.5)*2.0)+1.0)*0.5;");
	pass2.push("result = pow(min(result*whiteMul,1.0),aogamma);");
	pass2.push("gl_FragColor = vec4(vec3(result),1.0);");
	

	if(this.useRender) pass2.push("gl_FragColor = vec4(texture2D(GLGE_RENDER, texCoord.xy).rgb*gl_FragColor.r,1.0);");
	pass2.push("}");
	
	var pass3=[]
		pass3.push("precision highp float;");
		pass3.push("uniform sampler2D GLGE_PASS1;");
		pass3.push("varying vec2 texCoord;");
		pass3.push("vec2 inverse_buffer_size=vec2(1.0/"+this.gl.canvas.width.toFixed(1)+",1.0/"+this.gl.canvas.height.toFixed(1)+");");
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
		pass3.push("	if(length(rgbM)>10.0) gl_FragColor = vec4(rgbM,1.0);");
		pass3.push("}");
		
	this.passes=[];
	this.addPass(pass1.join(""),width,height);
	this.addPass(pass2.join(""));
	this.addPass(pass3.join("\n"));
}



})(GLGE);