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
 * @name glge_filter_Scanlines.js
 * @author me@paulbrunt.co.uk
 */
(function(GLGE){
 
/**
* @class Postprocessing glow filter
* @augments GLGE.Filter2d
*/
GLGE.FilterScanlines=function(){
};
GLGE.augment(GLGE.Filter2d,GLGE.FilterScanlines);
GLGE.FilterScanlines.prototype.intensity=0.95;

GLGE.FilterScanlines.prototype.setIntensity=function(intensity){
	this.intensity=intensity;
	this.createPasses();
	return this;
}
GLGE.FilterScanlines.prototype.GLRender=function(gl,buffer){
	if(!this.gl){
		this.gl=gl;
		this.createPasses();
	}
	return GLGE.Filter2d.prototype.GLRender.call(this,gl,buffer);
}

GLGE.FilterScanlines.prototype.createPasses=function(){
	if(!this.gl) return;
	var canvasHeight=this.gl.canvas.height;
	var pass1=[];
	pass1.push("precision highp float;");
	pass1.push("uniform sampler2D GLGE_RENDER;");
	pass1.push("varying vec2 texCoord;");
	pass1.push("void main(void){");
	pass1.push("vec4 color=texture2D(GLGE_RENDER, texCoord.xy);");
	pass1.push("if(mod(texCoord.y,"+(2/canvasHeight)+")>"+(1/canvasHeight)+") color.rgb*="+this.intensity+";");
	pass1.push("color.rgb*=pow(1.0-length(texCoord.xy-0.5),1.3);");
	pass1.push("color.rgb*=vec3(0.93,1.0,0.93);");
	pass1.push("gl_FragColor = vec4(color.rgb,1.0);");
	pass1.push("}");
	
	this.passes=[];
	this.addPass(pass1.join(""));
}
})(GLGE);