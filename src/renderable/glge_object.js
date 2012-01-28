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
 * @name glge_object.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){

/**
* @name GLGE.Object#downloadComplete
* @event fires when all the assets for this class have finished loading
* @param {object} data
*/

/**
* @name GLGE.Object#willRender
* @event fires when all the assets will be rendered
* @param {object} data
*/

/**
* @name GLGE.Object#willRender
* @event fires when all the assets will culled
* @param {object} data
*/

/**
* @class An object that can be rendered in a scene
* @augments GLGE.Animatable
* @augments GLGE.Placeable
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.Object=function(uid){
	this.multimaterials=[];
	this.renderCaches=[];
    var that=this;
    this.downloadComplete=function(){
        if(that.isComplete()) that.fireEvent("downloadComplete");
    }
	GLGE.Assets.registerAsset(this,uid);
}
GLGE.augment(GLGE.Placeable,GLGE.Object);
GLGE.augment(GLGE.Animatable,GLGE.Object);
GLGE.augment(GLGE.QuickNotation,GLGE.Object);
GLGE.augment(GLGE.JSONLoader,GLGE.Object);
GLGE.Object.prototype.className="Object";
GLGE.Object.prototype.mesh=null;
GLGE.Object.prototype.skeleton=null;
GLGE.Object.prototype.scene=null;
GLGE.Object.prototype.transformMatrix=GLGE.identMatrix();
GLGE.Object.prototype.material=null;
GLGE.Object.prototype.gl=null;
GLGE.Object.prototype.multimaterials=null;
GLGE.Object.prototype.zTrans=false;
GLGE.Object.prototype.renderCaches=null;
GLGE.Object.prototype.id="";
GLGE.Object.prototype.pickable=true;
GLGE.Object.prototype.drawType=GLGE.DRAW_TRIS;
GLGE.Object.prototype.pointSize=1;
GLGE.Object.prototype.lineWidth=1;
GLGE.Object.prototype.cull=true;
GLGE.Object.prototype.culled=true;
GLGE.Object.prototype.visible=true;
GLGE.Object.prototype.depthTest=true;
GLGE.Object.prototype.meshFrame1=0;
GLGE.Object.prototype.meshFrame2=0;
GLGE.Object.prototype.meshBlendFactor=0;
GLGE.Object.prototype.noCastShadows=null;


//shadow fragment
var shfragStr=[];
shfragStr.push("#ifdef GL_ES\nprecision highp float;\n#endif\n");
shfragStr.push("uniform float distance;\n");
shfragStr.push("uniform bool shadowtype;\n");
shfragStr.push("varying vec3 eyevec;\n");
shfragStr.push("void main(void)\n  ");
shfragStr.push("{\n");
shfragStr.push("float depth = gl_FragCoord.z / gl_FragCoord.w;\n");
shfragStr.push("if(shadowtype) depth=length(eyevec);\n");
shfragStr.push("vec4 rgba=fract(depth/distance * vec4(16777216.0, 65536.0, 256.0, 1.0));\n");
shfragStr.push("gl_FragColor=rgba-rgba.rrgb*vec4(0.0,0.00390625,0.00390625,0.00390625);\n");
shfragStr.push("}\n");
GLGE.Object.prototype.shfragStr=shfragStr.join("");

//normal fragment
var nfragStr=[];
nfragStr.push("#ifdef GL_ES\nprecision highp float;\n#endif\n");
nfragStr.push("varying vec3 n;\n");
nfragStr.push("void main(void)\n");
nfragStr.push("{\n");
nfragStr.push("float depth = gl_FragCoord.z / gl_FragCoord.w;\n");
nfragStr.push("gl_FragColor=vec4(normalize(n)/2.0+0.5,depth/1000.0);\n");
nfragStr.push("}\n");
GLGE.Object.prototype.nfragStr=nfragStr.join("");


//picking fragment
var pkfragStr=[];
pkfragStr.push("#ifdef GL_ES\nprecision highp float;\n#endif\n");
pkfragStr.push("uniform float far;\n");
pkfragStr.push("uniform vec3 pickcolor;\n");
pkfragStr.push("varying vec3 n;\n");
pkfragStr.push("varying vec4 UVCoord;\n");
pkfragStr.push("void main(void)\n");
pkfragStr.push("{\n");
pkfragStr.push("float Xcoord = gl_FragCoord.x+0.5;\n");
pkfragStr.push("if(Xcoord>0.0) gl_FragColor = vec4(pickcolor,1.0);\n");
pkfragStr.push("if(Xcoord>1.0) gl_FragColor = vec4(n,1.0);\n");
pkfragStr.push("if(Xcoord>2.0){");	
pkfragStr.push("vec3 rgb=fract((gl_FragCoord.z/gl_FragCoord.w) * vec3(65536.0, 256.0, 1.0));\n");
pkfragStr.push("gl_FragColor=vec4(rgb-rgb.rrg*vec3(0.0,0.00390625,0.00390625),1.0);\n");
pkfragStr.push("}");
//x tex coord
pkfragStr.push("if(Xcoord>3.0){");	
pkfragStr.push("vec3 rgb=fract(UVCoord.x * vec3(65536.0, 256.0, 1.0));\n");
pkfragStr.push("gl_FragColor=vec4(rgb-rgb.rrg*vec3(0.0,0.00390625,0.00390625),1.0);\n");
pkfragStr.push("}");
//y tex coord
pkfragStr.push("if(Xcoord>4.0){");	
pkfragStr.push("vec3 rgb=fract(UVCoord.y * vec3(65536.0, 256.0, 1.0));\n");
pkfragStr.push("gl_FragColor=vec4(rgb-rgb.rrg*vec3(0.0,0.00390625,0.00390625),1.0);\n");
pkfragStr.push("}");
pkfragStr.push("}\n");
GLGE.Object.prototype.pkfragStr=pkfragStr.join("");


/**
* Sets the object visibility
* @param {boolean} visable flag to indicate the objects visibility
*/
GLGE.Object.prototype.setVisible=function(visible){
	this.visible=visible;
	return this;
}

/**
* Gets the object visibility
* @returns  flag to indicate the objects visibility
*/
GLGE.Object.prototype.getVisible=function(){
	return this.visible;
}

/**
* Sets the first mesh frame to use when using an animated mesh
* @param {boolean} frame the inital frame
*/
GLGE.Object.prototype.setMeshFrame1=function(frame){
	this.meshFrame1=frame;
	return this;
}
/**
* Sets the second mesh frame to use when using an animated mesh
* @param {boolean} frame the final frame
*/
GLGE.Object.prototype.setMeshFrame2=function(frame){
	this.meshFrame2=frame;
	return this;
}
/**
* blending between frames
* @param {boolean} frame value 0-1 morth between frame1 and frame2
*/
GLGE.Object.prototype.setMeshBlendFactor=function(factor){
	this.meshBlendFactor=factor;
	return this;
}
/**
* Gets blending between frames
* @returns blender factor
*/
GLGE.Object.prototype.getMeshBlendFactor=function(){
	return this.meshBlendFactor;
}

/**
* Gets the pickable flag for the object
*/
GLGE.Object.prototype.getPickable=function(){
	return this.pickable;
}
/**
* Sets the pickable flag for the object
* @param {boolean} value the culling flag
*/
GLGE.Object.prototype.setPickable=function(pickable){
	this.pickable=pickable;
	return this;
}


/**
* Gets the depth test flag for the object
*/
GLGE.Object.prototype.getDepthTest=function(){
    return this.depthTest;
}
/**
* Sets the depth test flag for the object
* @param {boolean} value the culling flag
*/
GLGE.Object.prototype.setDepthTest=function(test){
	this.depthTest=test;
	return this;
}


/**
* Gets the culling flag for the object
*/
GLGE.Object.prototype.getCull=function(){
	return this.cull;
}
/**
* Sets the culling flag for the object
* @param {boolean} value the culling flag
*/
GLGE.Object.prototype.setCull=function(cull){
	this.cull=cull;
	return this;
}

/**
* Gets the objects draw type
*/
GLGE.Object.prototype.getDrawType=function(){
	return this.drawType;
}
/**
* Sets the objects draw type
* @param {GLGE.number} value the draw type of this object
*/
GLGE.Object.prototype.setDrawType=function(value){
	this.drawType=value;
	return this;
}

/**
* Gets the objects draw point size
*/
GLGE.Object.prototype.getPointSize=function(){
	return this.pointSize;
}
/**
* Sets the objects draw points size
* @param {GLGE.number} value the point size to render
*/
GLGE.Object.prototype.setPointSize=function(value){
	this.pointSize=parseFloat(value);
	return this;
}

/**
* Gets the objects line width
*/
GLGE.Object.prototype.getLineWidth=function(){
    return this.lineWidth;
}
/**
* Sets the objects line width
* @param {GLGE.number} value the line width
*/
GLGE.Object.prototype.setLineWidth=function(value){
	this.lineWidth=parseFloat(value);
	return this;
}

/**
* Sets a custom usinform on this object
* @param {string} type the uniform type eg 1i, 3fv, Matrix4fv, etc
* @param {string} name the uniform name
* @param {array} value the value of the uniform
*/
GLGE.Object.prototype.setUniform=function(type,name,value){
    if(!this.uniforms) this.uniforms={};
	this.uniforms[name]={type:type,value:value};
}
/**
* Gets the value of a custom uniform
* @param {string} name the name of the uniform to return
* @returns {number} the value of the uniform
*/
GLGE.Object.prototype.getUniform=function(name){
	if(!this.uniforms) this.uniforms={};
	return this.uniforms[name].value
}
/**
* Gets the type of a custom uniform
* @param {string} name the name of the uniform to return
* @returns {number} the type of the uniform
*/
GLGE.Object.prototype.getUniformType=function(name){
	if(!this.uniforms) this.uniforms={};
	return this.uniforms[name].type;
}

/**
* Sets the code to inject into the vertex shader
* @param {string} shader the glsl code to inject into the vertex shader of this object GLGE will call the function GLGE_Position(vec4 position) to modify the position
*/
GLGE.Object.prototype.setVertexShaderInjection=function(shader){
    this.shaderVertexInjection=shader;
    this.updateProgram();
    return this;
}

/**
* Gets the glsl code injected into the vertex shader of this object
* @returns {string} shader the glsl code injected into the vertex shader of this object
*/
GLGE.Object.prototype.getVertexShaderInjection=function(shader){
    return this.shaderVertexInjection;
}


/**
* Gets the objects skeleton
* @returns GLGE.Group
*/
GLGE.Object.prototype.getSkeleton=function(){
	return this.skeleton;
}
/**
* Sets the objects skeleton
* @param {GLGE.Group} value the skeleton group to set
*/
GLGE.Object.prototype.setSkeleton=function(value){
	this.skeleton=value;
	this.bones=null;
	return this;
}

GLGE.Object.prototype.getBoundingVolume=function(local){
	if(!local) local=0;
	if(!this.boundingVolume) this.boundingVolume=[];
	if(!this.boundmatrix) this.boundmatrix=[];
	var matrix=this.getModelMatrix();
	if(matrix!=this.boundmatrix[local] || !this.boundingVolume[local]){
		var multimaterials=this.multimaterials;
		var boundingVolume;
		for(var i=0;i<multimaterials.length;i++){
			if(multimaterials[i].lods[0].mesh){
				if(!boundingVolume){
					boundingVolume=multimaterials[i].lods[0].mesh.getBoundingVolume().clone();
				}else{
					boundingVolume.addBoundingVolume(multimaterials[i].lods[0].mesh.getBoundingVolume());
				}
			}
		}
		if(!boundingVolume) boundingVolume=new GLGE.BoundingVolume(0,0,0,0,0,0);

		if(local){
			boundingVolume.applyMatrix(this.getLocalMatrix());
		}else{
			boundingVolume.applyMatrix(this.getModelMatrix());
		}
		this.boundingVolume[local]=boundingVolume;
	}
	this.boundmatrix[local]=matrix;
	return this.boundingVolume[local];
}


/**
* Sets the the show casting flag
* @param {boolean} value cast or not
*/
GLGE.Object.prototype.setCastShadows=function(value){
	this.noCastShadows=!value;
	return this;
}
/**
* Gets the the show casting flag
* @returns boolean
*/
GLGE.Object.prototype.getCastShadows=function(){
	return !this.noCastShadows;
}

/**
* Sets the Z Transparency of this object
* @param {boolean} value Does this object need blending?
*/
GLGE.Object.prototype.setZtransparent=function(value){
	this.zTrans=value;
	return this;
}
/**
* Gets the z transparency
* @returns boolean
*/
GLGE.Object.prototype.isZtransparent=function(){
	return this.zTrans;
}

/**
* Checks  if resources have finished downloading
* @returns {boolean}
*/
GLGE.Object.prototype.isComplete=function(){
    for(var i=0;i<this.multimaterials.length;i++){
        if(!this.multimaterials[i].isComplete()) return false;
    }
    return true;
}


/**
* Sets the material associated with the object
* @param GLGE.Material
*/
GLGE.Object.prototype.setMaterial=function(material,idx){
	if(typeof material=="string")  material=GLGE.Assets.get(material);
	if(!idx) idx=0;
	if(!this.multimaterials[idx]){
        this.multimaterials[idx]=new GLGE.MultiMaterial();
        this.multimaterials[idx].addEventListener("downloadComplete",this.downloadComplete);
	}
	if(this.multimaterials[idx].getMaterial()!=material){
		this.multimaterials[idx].setMaterial(material);
		this.updateProgram();
	}
	return this;
}
/**
* Gets the material associated with the object
* @returns GLGE.Material
*/
GLGE.Object.prototype.getMaterial=function(idx){
	if(!idx) idx=0;
	if(this.multimaterials[idx]) {
		return this.multimaterials[idx].getMaterial();
	}else{
		return false;
	}
}
/**
* Sets the mesh associated with the object
* @param GLGE.Mesh
*/
GLGE.Object.prototype.setMesh=function(mesh,idx){
	if(typeof mesh=="string")  mesh=GLGE.Assets.get(mesh);
	if(!idx) idx=0;
	if(!this.multimaterials[idx]){
		var object=this;
		this.multimaterials[idx]=new GLGE.MultiMaterial();
		this.multimaterials[idx].addEventListener("downloadComplete",this.downloadComplete);
		this.multimaterials[idx].addEventListener("boundupdate",function(){object.boundingVolume=null});
	}
	this.multimaterials[idx].setMesh(mesh);
	this.boundingVolume=null;
	return this;
}
/**
* Gets the mesh associated with the object
* @returns GLGE.Mesh
*/
GLGE.Object.prototype.getMesh=function(idx){
	if(!idx) idx=0;
	if(this.multimaterials[idx]) {
		return this.multimaterials[idx].getMesh();
	}else{
		return false;
	}
}
/**
* Initiallize all the GL stuff needed to render to screen
* @private
*/
GLGE.Object.prototype.GLInit=function(gl){
	this.gl=gl;
}
/**
* Cleans up all the GL stuff we sets
* @private
*/
GLGE.Object.prototype.GLDestory=function(gl){
}
/**
* Updates the GL shader program for the object
* @private
*/
GLGE.Object.prototype.updateProgram=function(){
	for(var i=0; i<this.multimaterials.length;i++){
		this.multimaterials[i].updateProgram();
	}
}
/**
* Adds another material to this object
* @returns GLGE.Material
*/
GLGE.Object.prototype.addMultiMaterial=function(multimaterial){
	if(typeof multimaterial=="string")  multimaterial=GLGE.Assets.get(multimaterial);
	this.multimaterials.push(multimaterial);
	multimaterial.addEventListener("downloadComplete",this.downloadComplete);
	var object=this;
	multimaterial.addEventListener("boundupdate",function(){object.boundingVolume=null});
	this.boundingVolume=null;
	return this;
}
/**
* gets all of the objects materials and meshes
* @returns array of GLGE.MultiMaterial objects
*/
GLGE.Object.prototype.getMultiMaterials=function(){
	return this.multimaterials;
}
/**
* Creates the shader program for the object
* @private
*/
GLGE.Object.prototype.GLGenerateShader=function(gl){
	//create the programs strings
	//Vertex Shader
	var colors=UV=joints1=joints2=false;
	var lights=gl.lights;
	var vertexStr=["#define GLGE_VERTEX\n"];
	var tangent=false;
	if(!this.mesh.normals) this.mesh.calcNormals();
	vertexStr.push("attribute vec3 position;\n");
	vertexStr.push("attribute vec3 normal;\n");
	for(var i=0;i<this.mesh.buffers.length;i++){
		if(this.mesh.buffers[i].name=="tangent0") tangent=true;
		if(this.mesh.buffers[i].exclude) continue;
		if(this.mesh.buffers[i].size>1){
			vertexStr.push("attribute vec"+this.mesh.buffers[i].size+" "+this.mesh.buffers[i].name+";\n");
		}else{
			vertexStr.push("attribute float "+this.mesh.buffers[i].name+";\n");
		}
		if(this.mesh.buffers[i].name=="UV") UV=true;
		if(this.mesh.buffers[i].name=="color") colors=true;
		if(this.mesh.buffers[i].name=="joints1") joints1=this.mesh.buffers[i];
		if(this.mesh.buffers[i].name=="joints2") joints2=this.mesh.buffers[i];
	}
	if(this.mesh.framePositions.length>1){
		var morph=true;
		vertexStr.push("attribute vec3 position2;\n");
		vertexStr.push("attribute vec3 normal2;\n");
		vertexStr.push("uniform float framesBlend;\n");
		if(tangent) vertexStr.push("attribute vec3 tangent2;\n");
	}
	if(tangent) vertexStr.push("attribute vec3 tangent;\n");
	vertexStr.push("uniform mat4 worldView;\n");
	vertexStr.push("uniform mat4 projection;\n");  
	vertexStr.push("uniform mat4 worldInverseTranspose;\n");
	vertexStr.push("uniform mat4 envMat;\n");
	//vertexStr.push("uniform vec3 cameraPos;\n");
	vertexStr.push("uniform float cascadeLevel;\n");

	for(var i=0; i<lights.length;i++){
			if(lights[i].type==GLGE.L_OFF) continue;
			vertexStr.push("uniform vec3 lightpos"+i+";\n");
			vertexStr.push("uniform vec3 lightdir"+i+";\n");
			
			if((lights[i].type==GLGE.L_SPOT || lights[i].type==GLGE.L_DIR) && lights[i].getCastShadows() ){
				vertexStr.push("uniform mat4 lightmat"+i+";\n");
				vertexStr.push("varying vec4 spotcoord"+i+";\n");
			}
	}
	
	vertexStr.push("varying vec3 eyevec;\n"); 
	for(var i=0; i<lights.length;i++){
			if(lights[i].type==GLGE.L_OFF) continue;
			vertexStr.push("varying vec3 lightvec"+i+";\n"); 
			vertexStr.push("varying float lightdist"+i+";\n"); 
	}
	
	if(this.mesh.joints && this.mesh.joints.length>0){
		vertexStr.push("uniform vec4 jointMat["+(3*this.mesh.joints.length)+"];\n"); 
	}
	
	if(this.material) vertexStr.push(this.material.getVertexVarying(vertexStr));
    
	vertexStr.push("varying vec3 n;\n");  
	vertexStr.push("varying vec3 t;\n");  
	if(colors) vertexStr.push("varying vec4 vcolor;\n");  
	vertexStr.push("varying vec4 UVCoord;\n");
	vertexStr.push("varying vec3 OBJCoord;\n");
	
    if(this.shaderVertexInjection){
        vertexStr.push(this.shaderVertexInjection);
    }
    
	vertexStr.push("void main(void)\n");
	vertexStr.push("{\n");
	if(colors) vertexStr.push("vcolor=color;\n");  
	if(UV) vertexStr.push("UVCoord=UV;\n");
		else vertexStr.push("UVCoord=vec4(0.0,0.0,0.0,0.0);\n");
	vertexStr.push("OBJCoord = position;\n");
	vertexStr.push("vec3 tang;\n");
	vertexStr.push("vec4 pos = vec4(0.0, 0.0, 0.0, 1.0);\n");
	vertexStr.push("vec4 norm = vec4(0.0, 0.0, 0.0, 1.0);\n");
	if(tangent) vertexStr.push("vec4 tang4 = vec4(0.0, 0.0, 0.0, 1.0);\n");
	
	if(joints1){
		if(joints1.size==1){
			vertexStr.push("pos += vec4(dot(jointMat[int(3.0*joints1)],vec4(position,1.0)),\n"+
				"              dot(jointMat[int(3.0*joints1+1.0)],vec4(position,1.0)),\n"+
				"              dot(jointMat[int(3.0*joints1+2.0)],vec4(position,1.0)),1.0)*weights1;\n");
			vertexStr.push("norm += vec4(dot(jointMat[int(3.0*joints1)].xyz,normal),\n"+
				"               dot(jointMat[int(3.0*joints1+1.0)].xyz,normal),\n"+
				"               dot(jointMat[int(3.0*joints1+2.0)].xyz,normal),1.0)*weights1;\n");
			if (tangent)
				vertexStr.push("tang4 += vec4(dot(jointMat[int(3.0*joints1)].xyz,tangent),\n"+
					"               dot(jointMat[int(3.0*joints1+1.0)].xyz,tangent),\n"+
					"               dot(jointMat[int(3.0*joints1+2.0)].xyz,tangent),1.0)*weights1;\n");
		}else{
			for(var i=0;i<joints1.size;i++){
				vertexStr.push("pos += vec4(dot(jointMat[int(3.0*joints1["+i+"])],vec4(position,1.0)),\n"+
					"              dot(jointMat[int(3.0*joints1["+i+"]+1.0)],vec4(position,1.0)),\n"+
					"              dot(jointMat[int(3.0*joints1["+i+"]+2.0)],vec4(position,1.0)),1.0)*weights1["+i+"];\n");
				vertexStr.push("norm += vec4(dot(jointMat[int(3.0*joints1["+i+"])].xyz,normal),\n"+
					"               dot(jointMat[int(3.0*joints1["+i+"]+1.0)].xyz,normal),\n"+
					"               dot(jointMat[int(3.0*joints1["+i+"]+2.0)].xyz,normal),1.0)*weights1["+i+"];\n");
				if (tangent)
					vertexStr.push("tang4 += vec4(dot(jointMat[int(3.0*joints1["+i+"])].xyz,tangent),\n"+
						"               dot(jointMat[int(3.0*joints1["+i+"]+1.0)].xyz,tangent),\n"+
						"               dot(jointMat[int(3.0*joints1["+i+"]+2.0)].xyz,tangent),1.0)*weights1["+i+"];\n");
			}
		}


		if(joints2){
		    if(joints2.size==1){
			    vertexStr.push("pos += vec4(dot(jointMat[int(3.0*joints2)],vec4(position,1.0)),\n"+
                               "              dot(jointMat[int(3.0*joints2+1.0)],vec4(position,1.0)),\n"+
                               "              dot(jointMat[int(3.0*joints2+2.0)],vec4(position,1.0)),1.0)*weights2;\n");
			    vertexStr.push("norm += vec4(dot(jointMat[int(3.0*joints2)].xyz,normal),\n"+
                               "               dot(jointMat[int(3.0*joints2+1.0)].xyz,normal),\n"+
                               "               dot(jointMat[int(3.0*joints2+2.0)].xyz,normal),1.0)*weights2;\n");
				if (tangent)
						vertexStr.push("tang4 += vec4(dot(jointMat[int(3.0*joints2)].xyz,tangent),\n"+
						   "               dot(jointMat[int(3.0*joints2+1.0)].xyz,tangent),\n"+
						   "               dot(jointMat[int(3.0*joints2+2.0)].xyz,tangent),1.0)*weights2;\n");
		    }else{
			    for(var i=0;i<joints2.size;i++){
			        vertexStr.push("pos += vec4(dot(jointMat[int(3.0*joints2["+i+"])],vec4(position,1.0)),\n"+
                                   "              dot(jointMat[int(3.0*joints2["+i+"]+1.0)],vec4(position,1.0)),\n"+
                                   "              dot(jointMat[int(3.0*joints2["+i+"]+2.0)],vec4(position,1.0)),1.0)*weights2["+i+"];\n");
			        vertexStr.push("norm += vec4(dot(jointMat[int(3.0*joints2["+i+"])].xyz,normal),\n"+
                                   "               dot(jointMat[int(3.0*joints2["+i+"]+1.0)].xyz,normal),\n"+
                                   "               dot(jointMat[int(3.0*joints2["+i+"]+2.0)].xyz,normal),1.0)*weights2["+i+"];\n");
				if (tangent)
					    vertexStr.push("tang4 += vec4(dot(jointMat[int(3.0*joints2["+i+"])].xyz,tangent),\n"+
					       "               dot(jointMat[int(3.0*joints2["+i+"]+1.0)].xyz,tangent),\n"+
					       "               dot(jointMat[int(3.0*joints2["+i+"]+2.0)].xyz,tangent),1.0)*weights2["+i+"];\n");
			    }
		    }
		}
		
		for(var i=0; i<lights.length;i++){
			if(lights[i].type==GLGE.L_OFF) continue;
			if((lights[i].type==GLGE.L_SPOT || lights[i].type==GLGE.L_DIR) && lights[i].getCastShadows() ){
				vertexStr.push("spotcoord"+i+"=lightmat"+i+"*vec4(pos.xyz,1.0);\n");
			}
		}        
		if(this.shaderVertexInjection && this.shaderVertexInjection.indexOf("GLGE_Position")>-1){
		    vertexStr.push("pos=GLGE_Position(vec4(pos.xyz, 1.0));\n");
		}
		vertexStr.push("pos = worldView * vec4(pos.xyz, 1.0);\n");
		vertexStr.push("norm = worldInverseTranspose * vec4(norm.xyz, 1.0);\n");
		if(tangent) vertexStr.push("tang = (worldInverseTranspose*vec4(tang4.xyz,1.0)).xyz;\n");
	}else{	
		if(morph){
			vertexStr.push("vec4 pos4=vec4(mix(position,position2,framesBlend),1.0);\n");
		}else{
			vertexStr.push("vec4 pos4=vec4(position,1.0);\n");
		}
		  
		  
		if(this.shaderVertexInjection && this.shaderVertexInjection.indexOf("GLGE_Position")>-1){
		    vertexStr.push("pos4=GLGE_Position(pos4);\n");
		}
		
		//vertexStr.push("pos4.xyz = (pos4.xyz-cameraPos.xyz)/(pow(length(pos4.xyz-cameraPos.xyz),0.5))+cameraPos.xyz;\n");
		for(var i=0; i<lights.length;i++){
			if(lights[i].type==GLGE.L_OFF) continue;
			if((lights[i].type==GLGE.L_SPOT || lights[i].type==GLGE.L_DIR) && lights[i].getCastShadows() ){
			vertexStr.push("spotcoord"+i+"=lightmat"+i+"*pos4;\n");
			//vertexStr.push("spotcoord"+i+".w/=2.0;\n");
			}
		}  
		
		vertexStr.push("pos = worldView * pos4;\n");
		if(morph){
			vertexStr.push("norm = worldInverseTranspose * vec4(mix(normal,normal2,framesBlend), 1.0);\n");  
			if(tangent) vertexStr.push("tang = (worldInverseTranspose*vec4(mix(tangent,tangent2,framesBlend),1.0)).xyz;\n");
		}else{
			vertexStr.push("norm = worldInverseTranspose * vec4(normal, 1.0);\n");  
			if(tangent) vertexStr.push("tang = (worldInverseTranspose*vec4(tangent,1.0)).xyz;\n");
		}
	}
    

	
	
	vertexStr.push("eyevec = -pos.xyz;\n");
	
	if(tangent) vertexStr.push("t = normalize(tang);");
		else  vertexStr.push("t = vec3(0.0,0.0,0.0);");
	vertexStr.push("n = normalize(norm.rgb);");

	
	for(var i=0; i<lights.length;i++){			
			if(lights[i].type==GLGE.L_OFF) continue;
			if(lights[i].getType()==GLGE.L_DIR){
				vertexStr.push("lightvec"+i+" = -lightdir"+i+";\n");
			}else{
				vertexStr.push("lightvec"+i+" = pos.xyz-lightpos"+i+";\n");
			}
			
			vertexStr.push("lightdist"+i+" = length(lightpos"+i+".xyz-pos.xyz);\n");
	}
	if(this.material) vertexStr.push(this.material.getLayerCoords(this.shaderVertexInjection));
	vertexStr.push("gl_Position = projection * pos;\n");
	vertexStr.push("gl_PointSize="+(this.pointSize.toFixed(5))+";\n");
	vertexStr.push("}\n");
	
	vertexStr=vertexStr.join("");

	//Fragment Shader
	fragStr=this.material.getFragmentShader(lights,colors,this.shaderVertexInjection);

	this.GLFragmentShaderNormal=GLGE.getGLShader(gl,gl.FRAGMENT_SHADER,this.nfragStr);
	this.GLFragmentShaderShadow=GLGE.getGLShader(gl,gl.FRAGMENT_SHADER,this.shfragStr);
	this.GLFragmentShaderPick=GLGE.getGLShader(gl,gl.FRAGMENT_SHADER,this.pkfragStr);
	this.GLFragmentShader=GLGE.getGLShader(gl,gl.FRAGMENT_SHADER,fragStr);
	this.GLVertexShader=GLGE.getGLShader(gl,gl.VERTEX_SHADER,vertexStr+"//default");
	this.GLVertexShaderShadow=GLGE.getGLShader(gl,gl.VERTEX_SHADER,vertexStr+"//shadow");
	this.GLVertexShaderPick=GLGE.getGLShader(gl,gl.VERTEX_SHADER,vertexStr+"//pick");
	this.GLVertexShaderNormal=GLGE.getGLShader(gl,gl.VERTEX_SHADER,vertexStr+"//normal");

	this.GLShaderProgramPick=GLGE.getGLProgram(gl,this.GLVertexShaderPick,this.GLFragmentShaderPick);
	this.GLShaderProgramNormal=GLGE.getGLProgram(gl,this.GLVertexShaderNormal,this.GLFragmentShaderNormal);
	this.GLShaderProgramShadow=GLGE.getGLProgram(gl,this.GLVertexShaderShadow,this.GLFragmentShaderShadow);
	this.GLShaderProgram=GLGE.getGLProgram(gl,this.GLVertexShaderShadow,this.GLFragmentShader);
	
	//if we failed then check for fallback option
	if (!gl.getProgramParameter(this.GLShaderProgram, gl.LINK_STATUS)) {
		if(this.material.fallback){
			this.material=this.material.fallback;
			this.multimaterial.material=this.material;
			this.GLGenerateShader(gl);
		}
	}

}
/**
* creates shader programs;
* @param multimaterial the multimaterial object to create the shader programs for
* @private
*/
GLGE.Object.prototype.createShaders=function(multimaterial){
	if(this.gl){
		this.mesh=multimaterial.mesh;
		this.material=multimaterial.material;
		this.multimaterial=multimaterial;
		this.GLGenerateShader(this.gl);
		multimaterial.GLShaderProgramPick=this.GLShaderProgramPick;
		multimaterial.GLShaderProgramShadow=this.GLShaderProgramShadow;
		multimaterial.GLShaderProgram=this.GLShaderProgram;
	}
}

/**
* Sets the shader program uniforms ready for rendering
* @private
*/
GLGE.Object.prototype.GLUniforms=function(gl,renderType,pickindex){
	var program;
	switch(renderType){
		case GLGE.RENDER_DEFAULT:
			program=this.GLShaderProgram;
			GLGE.setUniform(gl,"1i",GLGE.getUniformLocation(gl,program, "emitpass"), 0);
        	break;
		case GLGE.RENDER_EMIT:
			program=this.GLShaderProgram;
			GLGE.setUniform(gl,"1i",GLGE.getUniformLocation(gl,program, "emitpass"), 1);
		break;
		case GLGE.RENDER_SHADOW:
			program=this.GLShaderProgramShadow;
			GLGE.setUniform(gl,"1i",GLGE.getUniformLocation(gl,program, "shadowtype"), 1);
			break;
		case GLGE.RENDER_DEPTH:
			program=this.GLShaderProgramShadow;
			GLGE.setUniform(gl,"1f",GLGE.getUniformLocation(gl,program, "cascadeLevel"), 2);
			GLGE.setUniform(gl,"1i",GLGE.getUniformLocation(gl,program, "shadowtype"), 0);
			break;
		case GLGE.RENDER_NORMAL:
			program=this.GLShaderProgramNormal;
			break;
		case GLGE.RENDER_PICK:
			program=this.GLShaderProgramPick;
			var b = pickindex >> 16 & 0xFF; 
			var g = pickindex >> 8 & 0xFF; 
			var r = pickindex & 0xFF;
			GLGE.setUniform3(gl,"3f",GLGE.getUniformLocation(gl,program, "pickcolor"), r/255,g/255,b/255);
			break;
	}
    //set the line width
    gl.lineWidth(this.lineWidth);
    
    //set custom uinforms
    for(var key in this.uniforms){
    	var uniform=this.uniforms[key];
    	if(uniform.type=="Matrix4fv"){
    		GLGE.setUniformMatrix(gl,"Matrix4fv",GLGE.getUniformLocation(gl,program, key),false,uniform.value);
    	}else{
    		GLGE.setUniform(gl,uniform.type,GLGE.getUniformLocation(gl,program, key),uniform.value);
    	}
    }
	
	if(!program.caches) program.caches={};
	if(!program.glarrays) program.glarrays={};
	var pc=program.caches;
	var pgl=program.glarrays;
	var scene=gl.scene;
	var camera=scene.camera;

	if(pc.far!=camera.far){
		GLGE.setUniform(gl,"1i",GLGE.getUniformLocation(gl,program, "far"), camera.far);
		pc.far=camera.far;
	}
	if(renderType==GLGE.RENDER_DEFAULT || renderType==GLGE.RENDER_EMIT){
		if(pc.ambientColor!=scene.ambientColor){
			var ambientColor=scene.ambientColor;
			GLGE.setUniform3(gl,"3f",GLGE.getUniformLocation(gl,program, "amb"), ambientColor.r,ambientColor.g,ambientColor.b);
			pc.ambientColor=ambientColor;
		}
		if(pc.fogFar!=scene.fogFar){
			GLGE.setUniform(gl,"1f",GLGE.getUniformLocation(gl,program, "fogfar"), scene.fogFar);
			pc.fogFar=scene.fogFar;
		}
		if(pc.fogNear!=scene.fogNear){
			GLGE.setUniform(gl,"1f",GLGE.getUniformLocation(gl,program, "fognear"), scene.fogNear);
			pc.fogNear=scene.fogNear;
		}
		if(pc.fogType!=scene.fogType){
			GLGE.setUniform(gl,"1i",GLGE.getUniformLocation(gl,program, "fogtype"), scene.fogType);
			pc.fogType=scene.fogType;
		}
		if(pc.fogType!=scene.fogcolor){
			GLGE.setUniform3(gl,"3f",GLGE.getUniformLocation(gl,program, "fogcolor"), scene.fogColor.r,scene.fogColor.g,scene.fogColor.b);
			pc.fogcolor=scene.fogcolor;
		}
	}
	if(pc.meshBlendFactor!=this.meshBlendFactor){
		GLGE.setUniform(gl,"1f",GLGE.getUniformLocation(gl,program, "framesBlend"), this.meshBlendFactor);
		pc.meshBlendFactor=this.meshBlendFactor;
	}

			
	
	var cameraMatrix=camera.getViewMatrix();
	var objMatrix=modelMatrix=this.getModelMatrix();
	
	if(!pc.mvMatrix) pc.mvMatrix={cameraMatrix:null,modelMatrix:null};
	var mvCache=pc.mvMatrix;
	
	if(mvCache.cameraMatrix!=cameraMatrix || mvCache.modelMatrix!=modelMatrix){
		//generate and set the modelView matrix
		if(!this.caches.mvMatrix) this.caches.mvMatrix=GLGE.mulMat4(cameraMatrix,modelMatrix);
		mvMatrix=this.caches.mvMatrix;
		
		if(this.mesh.joints){
		mvMatrix=cameraMatrix;
		}

		//GLGE.setUniform3(gl,"3f",GLGE.getUniformLocation(gl,program, "cameraPos"),camera.location[0],camera.location[1],camera.location[2]);
	
		var mvUniform = GLGE.getUniformLocation(gl,program, "worldView");
		var M1=GLGE.transposeMat4(mvMatrix);
		if(!pgl.mvMatrix){
			pgl.mvMatrixT=new Float32Array(M1);
		}else{
			GLGE.mat4gl(M1,pgl.mvMatrixT);
		}
		//GLGE.reuseMatrix4(M1);
		pgl.mvMatrix=mvMatrix;
		GLGE.setUniformMatrix(gl,"Matrix4fv",mvUniform, false, program.glarrays.mvMatrixT);
	    
		//invCamera matrix
		var icUniform = GLGE.getUniformLocation(gl,program, "envMat");
		if(icUniform){
			if(!this.caches.envMat){
				var envMat = GLGE.inverseMat4(mvMatrix);
				envMat[3]=0;
				envMat[7]=0;
				envMat[11]=0;
				this.caches.envMat = envMat;
			}
			envMat=this.caches.envMat;
			M1=GLGE.transposeMat4(envMat);
			if(!program.glarrays.envMat){
				pgl.envMatT=new Float32Array(M1);
			}else{
				GLGE.mat4gl(M1,pgl.envMatT);	
			}
			//GLGE.reuseMatrix4(M1);
			pgl.envMat=envMat;
				
			GLGE.setUniformMatrix(gl,"Matrix4fv",icUniform, false, pgl.envMatT);
		}
		//normalising matrix
		if(!this.caches.normalMatrix){
			var normalMatrix = GLGE.inverseMat4(mvMatrix);
			this.caches.normalMatrix = normalMatrix;
		}
		normalMatrix=this.caches.normalMatrix;
		var nUniform = GLGE.getUniformLocation(gl,program, "worldInverseTranspose");
		
		if(!pgl.normalMatrix) pgl.normalMatrix=new Float32Array(normalMatrix);
			else GLGE.mat4gl(normalMatrix,pgl.normalMatrix);	
		GLGE.setUniformMatrix(gl,"Matrix4fv",nUniform, false, pgl.normalMatrix);
		
		var cUniform = GLGE.getUniformLocation(gl,program, "view");
		M1=GLGE.transposeMat4(cameraMatrix);
		if(!pgl.cameraMatrix){
			pgl.cameraMatrixT=new Float32Array(M1);
		}else{
			GLGE.mat4gl(M1,pgl.cameraMatrixT);	
		}
		//GLGE.reuseMatrix4(M1);
		pgl.cameraMatrix=cameraMatrix;
			
		GLGE.setUniformMatrix(gl,"Matrix4fv",cUniform, false, pgl.cameraMatrixT);
		
		mvCache.cameraMatrix=cameraMatrix;
		mvCache.modelMatrix=modelMatrix;
	}


	var pUniform = GLGE.getUniformLocation(gl,program, "projection");
	M1=GLGE.transposeMat4(camera.getProjectionMatrix());
	if(!pgl.pMatrix){
		pgl.pMatrixT=new Float32Array(M1);
	}else{
		GLGE.mat4gl(M1,pgl.pMatrixT);	
	}
	//GLGE.reuseMatrix4(M1);
	pgl.pMatrix=camera.getProjectionMatrix();
			
	GLGE.setUniformMatrix(gl,"Matrix4fv",pUniform, false, pgl.pMatrixT);

	

	
	//light
	//dont' need lighting for picking
	if(renderType==GLGE.RENDER_DEFAULT || renderType==GLGE.RENDER_SHADOW || renderType==GLGE.RENDER_DEPTH || renderType==GLGE.RENDER_EMIT){
		var pos,lpos;
		var lights=gl.lights
		if(!pc.lights) pc.lights=[];
		if(!pgl.lights) pgl.lights=[];
		if(!this.caches.lights) this.caches.lights=[];
		var lightCache=pc.lights;
		for(var i=0; i<lights.length;i++){
			if(lights[i].type==GLGE.L_OFF) continue;
			if(!lightCache[i]) lightCache[i]={modelMatrix:null,cameraMatrix:null};
			if(lightCache[i].modelMatrix!=modelMatrix || lightCache[i].cameraMatrix!=cameraMatrix){
				if(!this.caches.lights[i])this.caches.lights[i]={};
				
				if(!this.caches.lights[i].pos) this.caches.lights[i].pos=GLGE.mulMat4Vec4(GLGE.mulMat4(cameraMatrix,lights[i].getModelMatrix()),[0,0,0,1]);
				pos=this.caches.lights[i].pos;
				GLGE.setUniform3(gl,"3f",GLGE.getUniformLocation(gl,program, "lightpos"+i), pos[0],pos[1],pos[2]);		
				
				
				if(!this.caches.lights[i].lpos) this.caches.lights[i].lpos=GLGE.mulMat4Vec4(GLGE.mulMat4(cameraMatrix,lights[i].getModelMatrix()),[0,0,1,1]);
				lpos=this.caches.lights[i].lpos;
				GLGE.setUniform3(gl,"3f",GLGE.getUniformLocation(gl,program, "lightdir"+i),lpos[0]-pos[0],lpos[1]-pos[1],lpos[2]-pos[2]);
				
				if(lights[i].s_cache){
					var lightmat=GLGE.mulMat4(lights[i].s_cache.smatrix,modelMatrix);
					if(!pgl.lights[i]) pgl.lights[i]=new Float32Array(lightmat);
						else GLGE.mat4gl(lightmat,pgl.lights[i]);
					GLGE.setUniformMatrix(gl,"Matrix4fv",GLGE.getUniformLocation(gl,program, "lightmat"+i), true,pgl.lights[i]);
					GLGE.setUniform2(gl,"2f",GLGE.getUniformLocation(gl,program, "shadowoffset"+i), lights[i].s_cache.pmatrix[3],lights[i].s_cache.pmatrix[7]);
					lightCache[i].modelMatrix=modelMatrix;
					lightCache[i].cameraMatrix=cameraMatrix;
				}else{
					lightCache[i].modelMatrix=modelMatrix;
					lightCache[i].cameraMatrix=cameraMatrix;
				}
			}
		}
	}
	
	if(this.mesh.joints){
		if(!pc.joints) pc.joints=[];
		if(!pgl.joints) pgl.joints=[];
		if(!pgl.jointsT) pgl.jointsT=[];
		if(!pgl.jointsinv) pgl.jointsinv=[];
        if ((!pgl.jointsCombined)||pgl.jointsCombined.length!=this.mesh.joints.length*12) 
            pgl.jointsCombined = new Float32Array(this.mesh.joints.length*12);
		var jointCache=pc.joints;
		var ident=GLGE.identMatrix();
		for(i=0;i<this.mesh.joints.length;i++){
			if(!jointCache[i]) jointCache[i]={modelMatrix:null,invBind:null};
			if(typeof this.mesh.joints[i]=="string"){
				if(!this.bones) this.bones=this.skeleton.getNames();
				if(this.bones){
					var modelMatrix=this.bones[this.mesh.joints[i]].getModelMatrix();
				}
			}else{
				var modelMatrix=this.mesh.joints[i].getModelMatrix();
			}
			var invBind=this.mesh.invBind[i];
			if(jointCache[i].modelMatrix!=modelMatrix || jointCache[i].invBind!=invBind){
				var jointmat=GLGE.mulMat4(modelMatrix,invBind); 
				//jointmat=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];
				if(!pgl.joints[i]){
					pgl.jointsT[i]=new Float32Array(GLGE.transposeMat4(jointmat));
				}else{
					GLGE.mat4gl(GLGE.transposeMat4(jointmat),pgl.jointsT[i]);	
				}
				pgl.joints[i]=jointmat;
				if(!pgl.jointsinv[i]) pgl.jointsinv[i]=new Float32Array(GLGE.inverseMat4(jointmat));
				else GLGE.mat4gl(GLGE.inverseMat4(jointmat),pgl.jointsinv[i]);		
				var mat=pgl.jointsT[i];
				var combinedMat=pgl.jointsCombined;
				combinedMat[i*12]=mat[0];
				combinedMat[i*12+1]=mat[4];
				combinedMat[i*12+2]=mat[8];
				combinedMat[i*12+3]=mat[12];

				combinedMat[i*12+4]=mat[1];
				combinedMat[i*12+5]=mat[5];
				combinedMat[i*12+6]=mat[9];
				combinedMat[i*12+7]=mat[13];

				combinedMat[i*12+8]=mat[2];
				combinedMat[i*12+9]=mat[6];
				combinedMat[i*12+10]=mat[10];
				combinedMat[i*12+11]=mat[14];
                
				//GLGE.setUniform4(gl,"4f",GLGE.getUniformLocation(gl,program, "jointMat["+(i*3)+"]"), mat[0],mat[4],mat[8],mat[12]);
				//GLGE.setUniform4(gl,"4f",GLGE.getUniformLocation(gl,program, "jointMat["+(i*3+1)+"]"), mat[1],mat[5],mat[9],mat[13]);
				//GLGE.setUniform4(gl,"4f",GLGE.getUniformLocation(gl,program, "jointMat["+(i*3+2)+"]"), mat[2],mat[6],mat[10],mat[14]);
				jointCache[i].modelMatrix=modelMatrix;
				jointCache[i].invBind=invBind;
			}
		}
		gl.uniform4fv(GLGE.getUniformLocation(gl,program, "jointMat"),pgl.jointsCombined);
	}


	if(this.material && (renderType==GLGE.RENDER_DEFAULT || renderType==GLGE.RENDER_EMIT) && gl.scene.lastMaterial!=this.material){
		this.material.textureUniforms(gl,program,lights,this);
		gl.scene.lastMaterial=this.material;
	}
}
/**
* Renders the object to the screen
* @private
*/
GLGE.Object.prototype.GLRender=function(gl,renderType,pickindex,multiMaterial,distance){
	if(!gl) return;
	if(!this.gl) this.GLInit(gl);
	
	//if look at is set then look
	if(this.lookAt) this.Lookat(this.lookAt);
 
	//animate this object
	if(renderType==GLGE.RENDER_DEFAULT){
		if(this.animation) this.animate();
	}
	
	if(!this.renderCaches[renderType]) this.renderCaches[renderType]={};
	
	var cameraMatrix=gl.scene.camera.getViewMatrix();
	var modelMatrix=this.getModelMatrix();
	
	if(this.renderCaches[renderType].cameraMatrix!=cameraMatrix || this.renderCaches[renderType].modelMatrix!=modelMatrix){
		this.renderCaches[renderType]={};
		this.renderCaches[renderType].cameraMatrix=cameraMatrix;
		this.renderCaches[renderType].modelMatrix=modelMatrix;
	}
	
	this.caches=this.renderCaches[renderType];
	
	
	

	var pixelsize;
	
	if(multiMaterial==undefined){
		var start=0;
		var end=this.multimaterials.length;
	}else{
		var start=multiMaterial;
		var end=multiMaterial+1;
	}

	for(var i=start; i<end;i++){
		if(this.multimaterials[i].lods.length>1 && !pixelsize){
			var camerapos=gl.scene.camera.getPosition();
			var modelpos=this.getPosition();
			var dist=GLGE.lengthVec3([camerapos.x-modelpos.x,camerapos.y-modelpos.y,camerapos.z-modelpos.z]);
			dist=GLGE.mulMat4Vec4(gl.scene.camera.getProjectionMatrix(),[this.getBoundingVolume().getSphereRadius(),0,-dist,1]);
			pixelsize=dist[0]/dist[3]*gl.scene.renderer.canvas.width;
		}
	
		var lod=this.multimaterials[i].getLOD(pixelsize);

		if(lod.mesh && lod.mesh.loaded){
			if(renderType==GLGE.RENDER_NULL){
				if(lod.material) lod.material.registerPasses(gl,this);
				break;
			}
			if(!lod.GLShaderProgram){
				this.createShaders(lod);
			}else{
				this.GLShaderProgramPick=lod.GLShaderProgramPick;
				this.GLShaderProgramShadow=lod.GLShaderProgramShadow;
				this.GLShaderProgram=lod.GLShaderProgram;
			}
			this.mesh=lod.mesh;
			this.material=lod.material;
			
			var drawType;
			switch(this.drawType){
				case GLGE.DRAW_LINES:
					drawType=gl.LINES;
					break;
				case GLGE.DRAW_POINTS:
					drawType=gl.POINTS;
					break;
				case GLGE.DRAW_LINELOOPS:
					drawType=gl.LINE_LOOP;
					break;
				case GLGE.DRAW_LINESTRIPS:
					drawType=gl.LINE_STRIP;
					break;
				case GLGE.DRAW_TRIANGLESTRIP:
					drawType=gl.TRIANGLE_STRIP;
					break;
				default:
					drawType=gl.TRIANGLES;
					break;
			}

			switch(renderType){
				case  GLGE.RENDER_DEFAULT:
				case  GLGE.RENDER_EMIT:
					if(gl.program!=this.GLShaderProgram){
						gl.useProgram(this.GLShaderProgram);
						gl.program=this.GLShaderProgram;
					}
					this.mesh.GLAttributes(gl,this.GLShaderProgram,this.meshFrame1,this.meshFrame2);
					break;
				case  GLGE.RENDER_SHADOW:
				case GLGE.RENDER_DEPTH:
					if(gl.program!=this.GLShaderProgramShadow){
						gl.useProgram(this.GLShaderProgramShadow,this.meshFrame1,this.meshFrame2);
						gl.program=this.GLShaderProgramShadow;
					}
					if(!distance) distance=gl.scene.camera.getFar();
					GLGE.setUniform(gl,"1f",GLGE.getUniformLocation(gl,this.GLShaderProgramShadow, "distance"), distance);
					this.mesh.GLAttributes(gl,this.GLShaderProgramShadow,this.meshFrame1,this.meshFrame2);
					break;
				case  GLGE.RENDER_NORMAL:
					if(gl.program!=this.GLShaderProgramNormal){
						gl.useProgram(this.GLShaderProgramNormal);
						gl.program=this.GLShaderProgramNormal;
					}
					this.mesh.GLAttributes(gl,this.GLShaderProgramNormal,this.meshFrame1,this.meshFrame2);
					break;
				case  GLGE.RENDER_PICK:
					if(gl.program!=this.GLShaderProgramPick){
						gl.useProgram(this.GLShaderProgramPick);
						gl.program=this.GLShaderProgramPick;
					}
					this.mesh.GLAttributes(gl,this.GLShaderProgramPick,this.meshFrame1,this.meshFrame2);
					drawType=gl.TRIANGLES;
					break;
			}
			//render the object
			this.GLUniforms(gl,renderType,pickindex);
			switch (this.mesh.windingOrder) {
				case GLGE.Mesh.WINDING_ORDER_UNKNOWN:
					if (gl.scene.renderer.cullFaces)
						gl.enable(gl.CULL_FACE); 
					else
						gl.disable(gl.CULL_FACE); 
					break;
				case GLGE.Mesh.WINDING_ORDER_CLOCKWISE:
					gl.enable(gl.CULL_FACE);    
					break;
				case GLGE.Mesh.WINDING_ORDER_COUNTER:
					gl.cullFace(gl.FRONT);
					gl.enable(gl.CULL_FACE);    
				default:
					break;
			}
			if(this.mesh.GLfaces){
				gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.mesh.GLfaces);
				gl.drawElements(drawType, this.mesh.GLfaces.numItems, gl.UNSIGNED_SHORT, 0);
			}else{
				gl.drawArrays(drawType, 0, this.mesh.positions.length/3);
			}
			
			switch (this.mesh.windingOrder) {
				case GLGE.Mesh.WINDING_ORDER_UNKNOWN:
					if (gl.scene.renderer.cullFaces)
						gl.enable(gl.CULL_FACE);    
					break;
				case GLGE.Mesh.WINDING_ORDER_COUNTER:
					gl.cullFace(gl.BACK);
				default:
					break;
			}
			var matrix=this.matrix;
			var caches=this.caches;
			

			this.matrix=matrix;
			this.caches=caches;
		}
	}
}

})(GLGE);