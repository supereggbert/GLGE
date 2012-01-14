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
 * @name glge_text.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){





/**
* @class Text that can be rendered in a scene
* @augments GLGE.Animatable
* @augments GLGE.Placeable
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.Text=function(uid){
	this.canvas=document.createElement("canvas");
	this.scaleCanvas=document.createElement("canvas");
	this.color={r:1.0,g:1.0,b:1.0};
	GLGE.Assets.registerAsset(this,uid);
}
GLGE.augment(GLGE.Placeable,GLGE.Text);
GLGE.augment(GLGE.Animatable,GLGE.Text);
GLGE.augment(GLGE.QuickNotation,GLGE.Text);
GLGE.augment(GLGE.JSONLoader,GLGE.Text);
GLGE.Text.prototype.className="Text";
GLGE.Text.prototype.zTrans=true;
GLGE.Text.prototype.canvas=null;
GLGE.Text.prototype.aspect=1.0;
GLGE.Text.prototype.color=null;
GLGE.Text.prototype.text="";
GLGE.Text.prototype.font="Times";
GLGE.Text.prototype.size=100;
GLGE.Text.prototype.pickType=GLGE.TEXT_TEXTPICK;
GLGE.Text.prototype.pickable=true;
GLGE.Text.prototype.alpha=1;

/**
* Gets the pick type for this text
* @returns {string} the pick type
*/
GLGE.Text.prototype.getPickType=function(){
	return this.pickType;
};
/**
* Sets the pick type GLGE.TEXT_BOXPICK for picking based on bound box or GLGE.TEXT_TEXTPICK for pixel perfect text picking
* @param {Number} value the picking type
*/
GLGE.Text.prototype.setPickType=function(value){
	this.pickType=value;
	return this;
};
/**
* Gets the font of the text
* @returns {string} the font of the text
*/
GLGE.Text.prototype.getFont=function(){
	return this.size;
};
/**
* Sets the font of the text
* @param {Number} value the font of the text
*/
GLGE.Text.prototype.setFont=function(value){
	this.font=value;
	if(this.gl) this.updateCanvas(this.gl);
	return this;
};
/**
* Gets the size of the text
* @returns {string} the size of the text
*/
GLGE.Text.prototype.getSize=function(){
	return this.size;
};
/**
* Sets the size of the text
* @param {Number} value the size of the text
*/
GLGE.Text.prototype.setSize=function(value){
	this.size=value;
	if(this.gl) this.updateCanvas(this.gl);
	return this;
};
/**
* Gets the rendered text
* @returns {string} the text rendered
*/
GLGE.Text.prototype.getText=function(){
	return this.text;
};
/**
* Sets the text to be rendered
* @param {Number} value the text to render
*/
GLGE.Text.prototype.setText=function(value){
	this.text=value;
	if(this.gl) this.updateCanvas(this.gl);
	return this;
};
/**
* Sets the base colour of the text
* @param {string} color The colour of the material
*/
GLGE.Text.prototype.setColor=function(color){
	color=GLGE.colorParse(color);
	this.color={r:color.r,g:color.g,b:color.b};
	return this;
};
/**
* Sets the red base colour of the text
* @param {Number} r The new red level 0-1
*/
GLGE.Text.prototype.setColorR=function(value){
	this.color.r=value;
	return this;
};
/**
* Sets the green base colour of the text
* @param {Number} g The new green level 0-1
*/
GLGE.Text.prototype.setColorG=function(value){
	this.color.g=value;
	return this;
};
/**
* Sets the blue base colour of the text
* @param {Number} b The new blue level 0-1
*/
GLGE.Text.prototype.setColorB=function(value){
	this.color.b=value;
	return this;
};
/**
* Gets the current base color of the text
* @return {[r,g,b]} The current base color
*/
GLGE.Text.prototype.getColor=function(){
	return this.color;
	return this;
};

/**
* Sets the alpha
* @param {Number} b The new alpha level 0-1
*/
GLGE.Text.prototype.setAlpha=function(value){
	this.alpha=value;
	return this;
};

/**
* Gets the alpha
* @returns The alpha level
*/
GLGE.Text.prototype.getAlpha=function(){
	return this.alpha;
};

/**
* Sets the Z Transparency of this text
* @param {boolean} value Does this object need blending?
*/
GLGE.Text.prototype.setZtransparent=function(value){
	this.zTrans=value;
	return this;
}
/**
* Gets the z transparency
* @returns boolean
*/
GLGE.Text.prototype.isZtransparent=function(){
	return this.zTrans;
}
/**
* Creates the shader program for the object
* @private
*/
GLGE.Text.prototype.GLGenerateShader=function(gl){
	if(this.GLShaderProgram) gl.deleteProgram(this.GLShaderProgram);

	//Vertex Shader
	var vertexStr="";
	vertexStr+="attribute vec3 position;\n";
	vertexStr+="attribute vec2 uvcoord;\n";
	vertexStr+="varying vec2 texcoord;\n";
	vertexStr+="uniform mat4 Matrix;\n";
	vertexStr+="uniform mat4 PMatrix;\n";
	vertexStr+="varying vec4 pos;\n";
	
	vertexStr+="void main(void){\n";
	vertexStr+="texcoord=uvcoord;\n";    
	vertexStr+="pos = Matrix * vec4(position,1.0);\n";
	vertexStr+="gl_Position = PMatrix * pos;\n";
	vertexStr+="}\n";
	
	//Fragment Shader
	var fragStr="#ifdef GL_ES\nprecision highp float;\n#endif\n";
	fragStr=fragStr+"uniform sampler2D TEXTURE;\n";
	fragStr=fragStr+"varying vec2 texcoord;\n";
	fragStr=fragStr+"uniform mat4 Matrix;\n";
	fragStr=fragStr+"varying vec4 pos;\n";
	fragStr=fragStr+"uniform float far;\n";
	fragStr=fragStr+"uniform bool depthrender;\n";
	fragStr=fragStr+"uniform float distance;\n";
	fragStr=fragStr+"uniform int picktype;\n";
	fragStr=fragStr+"uniform vec3 pickcolor;\n";
	fragStr=fragStr+"uniform vec3 color;\n";
	fragStr=fragStr+"uniform float alpha;\n";
	fragStr=fragStr+"void main(void){\n";
	fragStr=fragStr+"float ob=pow(min(1.0,abs(dot(normalize(Matrix[2].rgb),vec3(0.0,0.0,1.0)))*2.0),1.5);\n";
	fragStr=fragStr+"float a=texture2D(TEXTURE,texcoord).a*alpha*ob;\n";
	fragStr=fragStr+"if(picktype=="+GLGE.TEXT_BOXPICK+"){gl_FragColor = vec4(pickcolor,1.0);}"
	fragStr=fragStr+"else if(picktype=="+GLGE.TEXT_TEXTPICK+"){if(alpha<1.0) discard; gl_FragColor = vec4(pickcolor,alpha);}"
	fragStr=fragStr+"else{gl_FragColor = vec4(color.rgb,a);};\n";
	fragStr=fragStr+"if (depthrender) { if(a<0.5) discard; float depth = gl_FragCoord.z / gl_FragCoord.w;\n";
	fragStr=fragStr+"vec4 rgba=fract(depth/distance * vec4(16777216.0, 65536.0, 256.0, 1.0));\n";
	fragStr=fragStr+"gl_FragColor=rgba-rgba.rrgb*vec4(0.0,0.00390625,0.00390625,0.00390625);}\n";
	fragStr=fragStr+"}\n";
	
	this.GLFragmentShader=gl.createShader(gl.FRAGMENT_SHADER);
	this.GLVertexShader=gl.createShader(gl.VERTEX_SHADER);


	gl.shaderSource(this.GLFragmentShader, fragStr);
	gl.compileShader(this.GLFragmentShader);
	if (!gl.getShaderParameter(this.GLFragmentShader, gl.COMPILE_STATUS)) {
	      GLGE.error(gl.getShaderInfoLog(this.GLFragmentShader));
	      return;
	}
	
	//set and compile the vertex shader
	//need to set str
	gl.shaderSource(this.GLVertexShader, vertexStr);
	gl.compileShader(this.GLVertexShader);
	if (!gl.getShaderParameter(this.GLVertexShader, gl.COMPILE_STATUS)) {
		GLGE.error(gl.getShaderInfoLog(this.GLVertexShader));
		return;
	}
	
	this.GLShaderProgram = gl.createProgram();
	gl.attachShader(this.GLShaderProgram, this.GLVertexShader);
	gl.attachShader(this.GLShaderProgram, this.GLFragmentShader);
	gl.linkProgram(this.GLShaderProgram);	
}
/**
* Initiallize all the GL stuff needed to render to screen
* @private
*/
GLGE.Text.prototype.GLInit=function(gl){
	this.gl=gl;
	this.createPlane(gl);
	this.GLGenerateShader(gl);
	
	this.glTexture=gl.createTexture();
	this.updateCanvas(gl);
}
/**
* Updates the canvas texture
* @private
*/
GLGE.Text.prototype.updateCanvas=function(gl){
	var canvas = this.canvas;
	canvas.width=1;
	canvas.height=this.size*1.2;
	var ctx = canvas.getContext("2d");
	ctx.font = this.size+"px "+this.font;
	canvas.width=ctx.measureText(this.text).width;
	canvas.height=this.size*1.2;
	 ctx = canvas.getContext("2d");
	ctx.textBaseline="top";
	ctx.font = (this.extra||"") + " " + this.size+"px "+this.font;
	this.aspect=canvas.width/canvas.height;
	ctx.fillText(this.text, 0, 0);   
	
	var height=Math.pow(2,Math.ceil(Math.log(canvas.height))/(Math.log(2)));
	var width=Math.pow(2,Math.ceil(Math.log(canvas.width))/(Math.log(2)));

	this.scaleCanvas.height=height;
	this.scaleCanvas.width=width;

	this.scaleContext=this.scaleCanvas.getContext("2d");
	this.scaleContext.clearRect(0,0,width,height);
	this.scaleContext.drawImage(canvas, 0, 0, width, height);
	
	gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
	//TODO: fix this when minefield is upto spec
	try{gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.scaleCanvas);}
	catch(e){gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, this.scaleCanvas,null);}
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR_MIPMAP_LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
	gl.generateMipmap(gl.TEXTURE_2D);
	
	gl.bindTexture(gl.TEXTURE_2D, null);
}

/**
* Renders the text to the render buffer
* @private
*/
GLGE.Text.prototype.GLRender=function(gl,renderType,pickindex){
	if(!this.gl){
		this.GLInit(gl);
	}	
	if(renderType==GLGE.RENDER_DEFAULT || renderType==GLGE.RENDER_PICK || renderType==GLGE.RENDER_SHADOW){
		//if look at is set then look
		if(this.lookAt) this.Lookat(this.lookAt);
		
		if(gl.program!=this.GLShaderProgram){
			gl.useProgram(this.GLShaderProgram);
			gl.program=this.GLShaderProgram;
		}
					
		var attribslot;
		//disable all the attribute initially arrays - do I really need this?
		for(var i=0; i<8; i++) gl.disableVertexAttribArray(i);
		attribslot=GLGE.getAttribLocation(gl,this.GLShaderProgram, "position");

		gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuffer);
		gl.enableVertexAttribArray(attribslot);
		gl.vertexAttribPointer(attribslot, this.posBuffer.itemSize, gl.FLOAT, false, 0, 0);
		
		attribslot=GLGE.getAttribLocation(gl,this.GLShaderProgram, "uvcoord");
		gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
		gl.enableVertexAttribArray(attribslot);
		gl.vertexAttribPointer(attribslot, this.uvBuffer.itemSize, gl.FLOAT, false, 0, 0);
		
		gl.activeTexture(gl["TEXTURE0"]);
		gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
		GLGE.setUniform(gl,"1i",GLGE.getUniformLocation(gl,this.GLShaderProgram, "TEXTURE"),0);
		
		if(!pickindex) pickindex=0;
		var b = pickindex >> 16 & 0xFF; 
		var g = pickindex >> 8 & 0xFF; 
		var r = pickindex & 0xFF;
		GLGE.setUniform3(gl,"3f",GLGE.getUniformLocation(gl,this.GLShaderProgram, "pickcolor"),r/255,g/255,b/255);
		
		if(renderType==GLGE.RENDER_PICK){
			GLGE.setUniform(gl,"1i",GLGE.getUniformLocation(gl,this.GLShaderProgram, "picktype"), this.pickType);	
		}else{
			GLGE.setUniform(gl,"1i",GLGE.getUniformLocation(gl,this.GLShaderProgram, "picktype"), 0);	
		}
		var distance=gl.scene.camera.getFar();
		GLGE.setUniform(gl,"1f",GLGE.getUniformLocation(gl,this.GLShaderProgram, "distance"), distance);
		if(renderType==GLGE.RENDER_SHADOW){
			GLGE.setUniform(gl,"1i",GLGE.getUniformLocation(gl,this.GLShaderProgram, "depthrender"), 1);
		}else{
			GLGE.setUniform(gl,"1i",GLGE.getUniformLocation(gl,this.GLShaderProgram, "depthrender"), 0);
		}
		
		
		if(!this.GLShaderProgram.glarrays) this.GLShaderProgram.glarrays={};

		
		//generate and set the modelView matrix
		var scalefactor=this.size/100;
		var mMatrix=GLGE.mulMat4(gl.scene.camera.getViewMatrix(),GLGE.mulMat4(this.getModelMatrix(),GLGE.scaleMatrix(this.aspect*scalefactor,scalefactor,scalefactor)));
		var mUniform = GLGE.getUniformLocation(gl,this.GLShaderProgram, "Matrix");
		if(!this.GLShaderProgram.glarrays.mMatrix) this.GLShaderProgram.glarrays.mMatrix=new Float32Array(mMatrix);
			else GLGE.mat4gl(mMatrix,this.GLShaderProgram.glarrays.mMatrix);
		GLGE.setUniformMatrix(gl,"Matrix4fv",mUniform, true, this.GLShaderProgram.glarrays.mMatrix);
		
		var mUniform = GLGE.getUniformLocation(gl,this.GLShaderProgram, "PMatrix");

		if(!this.GLShaderProgram.glarrays.pMatrix) this.GLShaderProgram.glarrays.pMatrix=new Float32Array(gl.scene.camera.getProjectionMatrix());
			else GLGE.mat4gl(gl.scene.camera.getProjectionMatrix(),this.GLShaderProgram.glarrays.pMatrix);
		GLGE.setUniformMatrix(gl,"Matrix4fv",mUniform, true, this.GLShaderProgram.glarrays.pMatrix);
				
		var farUniform = GLGE.getUniformLocation(gl,this.GLShaderProgram, "far");
		GLGE.setUniform(gl,"1f",farUniform, gl.scene.camera.getFar());
			
		var alphaUniform = GLGE.getUniformLocation(gl,this.GLShaderProgram, "alpha");
		GLGE.setUniform(gl,"1f",alphaUniform, this.alpha);
		
		//set the color
		GLGE.setUniform3(gl,"3f",GLGE.getUniformLocation(gl,this.GLShaderProgram, "color"), this.color.r,this.color.g,this.color.b);
		
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.GLfaces);
		gl.drawElements(gl.TRIANGLES, this.GLfaces.numItems, gl.UNSIGNED_SHORT, 0);
		gl.scene.lastMaterial=null;
	}
}
/**
* creates the plane mesh to draw
* @private
*/
GLGE.Text.prototype.createPlane=function(gl){
	//create the vertex positions
	if(!this.posBuffer) this.posBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1,1,0,-1,1,0,-1,-1,0,1,-1,0]), gl.STATIC_DRAW);
	this.posBuffer.itemSize = 3;
	this.posBuffer.numItems = 4;
	//create the vertex uv coords
	if(!this.uvBuffer) this.uvBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0,0,1,0,1,1,0,1]), gl.STATIC_DRAW);
	this.uvBuffer.itemSize = 2;
	this.uvBuffer.numItems = 4;
	//create the faces
	if(!this.GLfaces) this.GLfaces = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.GLfaces);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([2,1,0,0,3,2]), gl.STATIC_DRAW);
	this.GLfaces.itemSize = 1;
	this.GLfaces.numItems = 6;
}


})(GLGE);