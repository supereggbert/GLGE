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
 * @name glge_lod.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){

/**
* @name GLGE.ObjectLod#downloadComplete
* @event fires when all the assets for this LOD have finished loading
* @param {object} data
*/

/**
* @class Creates a new load for a multimaterial
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
* @augments GLGE.Events
*/
GLGE.ObjectLod=function(uid){
    this.setMaterial(GLGE.DEFAULT_MATERIAL);
	GLGE.Assets.registerAsset(this,uid);
}
GLGE.augment(GLGE.QuickNotation,GLGE.ObjectLod);
GLGE.augment(GLGE.JSONLoader,GLGE.ObjectLod);
GLGE.augment(GLGE.Events,GLGE.ObjectLod);
GLGE.ObjectLod.prototype.mesh=null;
GLGE.ObjectLod.prototype.className="ObjectLod";
GLGE.ObjectLod.prototype.material=null;
GLGE.ObjectLod.prototype.program=null;
GLGE.ObjectLod.prototype.GLShaderProgramPick=null;
GLGE.ObjectLod.prototype.GLShaderProgramShadow=null;
GLGE.ObjectLod.prototype.GLShaderProgram=null;
GLGE.ObjectLod.prototype.pixelSize=0;

/**
* sets the mesh
* @param {GLGE.Mesh} mesh 
*/
GLGE.ObjectLod.prototype.setMesh=function(mesh){
	if(typeof mesh=="string")  mesh=GLGE.Assets.get(mesh);
	
	//remove event listener from current material
	if(this.mesh){
		this.mesh.removeEventListener("shaderupdate",this.meshupdated);
		this.mesh.removeEventListener("boundupdate",this.boundupdated);
	}
	var multiMaterial=this;
	this.meshupdated=function(event){
		multiMaterial.GLShaderProgram=null;
	};
	
	this.boundupdated=function(event){
		multiMaterial.fireEvent("boundupdate",{});
	};
	//set event listener for new material
	mesh.addEventListener("shaderupdate",this.meshupdated);
	mesh.addEventListener("boundupdate",this.boundupdated);
	
	this.GLShaderProgram=null;
	this.mesh=mesh;
	return this;
}

/**
* Checks  if resources have finished downloading
* @returns {boolean}
*/
GLGE.ObjectLod.prototype.isComplete=function(){
    return this.material.isComplete();
}
/**
* gets the mesh
* @returns {GLGE.Mesh}
*/
GLGE.ObjectLod.prototype.getMesh=function(){
	return this.mesh;
}
/**
* sets the material
* @param {GLGE.Material} material 
*/
GLGE.ObjectLod.prototype.setMaterial=function(material){
	if(typeof material=="string")  material=GLGE.Assets.get(material);
	
	//remove event listener from current material
	if(this.material){
        this.material.removeEventListener("shaderupdate",this.materialupdated);
        this.material.removeEventListener("downloadComplete",this.downloadComplete);
	}
	var ObjectLOD=this;
	this.materialupdated=function(event){
		ObjectLOD.GLShaderProgram=null;
	};
	//set event listener for new material
	material.addEventListener("shaderupdate",this.materialupdated);
    
    this.downloadComplete=function(){
        ObjectLOD.fireEvent("downloadComplete");
    };
    material.addEventListener("downloadComplete",this.downloadComplete); 
    
	
	this.GLShaderProgram=null;
	this.material=material;
	return this;
}
/**
* gets the material
* @returns {GLGE.Material}
*/
GLGE.ObjectLod.prototype.getMaterial=function(){
	return this.material;
}

/**
* gets the pixelsize limit for this lod
* @returns {number}
*/
GLGE.ObjectLod.prototype.getPixelSize=function(){
	return this.pixelSize;
}
/**
* sets the pixelsize limit for this lod
* @returns {number}
*/
GLGE.ObjectLod.prototype.setPixelSize=function(value){
	this.pixelSize=parseFloat(value);
}

})(GLGE);