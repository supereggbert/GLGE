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
 * @name glge_multimaterial.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){

/**
* @name GLGE.MultiMaterial#downloadComplete
* @event fires when all the assets for this class have finished loading
* @param {object} data
*/

/**
* @class Creates a new mesh/material to add to an object
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
* @augments GLGE.Events
*/
GLGE.MultiMaterial=function(uid){
    var multiMaterial=this;
    this.downloadComplete=function(){
        if(multiMaterial.isComplete()) multiMaterial.fireEvent("downloadComplete");
    }
    this.boundUpdate=function(){
        multiMaterial.fireEvent("boundupdate");
    }
	this.lods=[new GLGE.ObjectLod];
    this.lods[0].addEventListener("downloadComplete",this.downloadComplete);
    this.lods[0].addEventListener("boundupdate",this.boundUpdate);
	GLGE.Assets.registerAsset(this,uid);
}
GLGE.augment(GLGE.QuickNotation,GLGE.MultiMaterial);
GLGE.augment(GLGE.JSONLoader,GLGE.MultiMaterial);
GLGE.augment(GLGE.Events,GLGE.MultiMaterial);
GLGE.MultiMaterial.prototype.className="MultiMaterial";
GLGE.MultiMaterial.prototype.oneLod=true;


/**
* Checks  if resources have finished downloading
* @returns {boolean}
*/
GLGE.MultiMaterial.prototype.isComplete=function(){
    for(var i=0;i<this.lods.length;i++){
        if(!this.lods[i].isComplete()) return false;
    }
    return true;
}

/**
* sets the mesh
* @param {GLGE.Mesh} mesh 
*/
GLGE.MultiMaterial.prototype.setMesh=function(mesh){
	this.lods[0].setMesh(mesh);
	return this;
}
/**
* gets the mesh
* @returns {GLGE.Mesh}
*/
GLGE.MultiMaterial.prototype.getMesh=function(){
	return this.lods[0].getMesh();
}
/**
* sets the material
* @param {GLGE.Material} material 
*/
GLGE.MultiMaterial.prototype.setMaterial=function(material){
	this.lods[0].setMaterial(material);
	return this;
}
/**
* gets the material
* @returns {GLGE.Material}
*/
GLGE.MultiMaterial.prototype.getMaterial=function(){
	return this.lods[0].getMaterial();
}

/**
* returns the load for a given pixel size
* @param {number} pixelsize the current pixel size of the object
* @returns {GLGE.ObjectLod}
*/
GLGE.MultiMaterial.prototype.getLOD=function(pixelsize){
	var currentSize=0;
	var currentLOD=this.lods[0];
	if(this.lods.length>1){
		for(var i=1; i<this.lods.length;i++){
			var size=this.lods[i].pixelSize;
			if(size>currentSize && size<pixelsize && this.lods[i].mesh && this.lods[i].mesh.loaded){
				currentSize=size;
				currentLOD=this.lods[i];
			}
		}
	}
	return currentLOD;
}

/**
* adds a lod to this multimaterial
* @param {GLGE.ObjectLod} lod the lod to add
*/
GLGE.MultiMaterial.prototype.addObjectLod=function(lod){
	if(this.oneLod){
		this.oneLod=false;
		this.lods=[];
	}
	this.lods.push(lod);
    lod.addEventListener("downloadComplete",this.downloadComplete);
	return this;
}

/**
* Updates the GL shader program for the object
* @private
*/
GLGE.MultiMaterial.prototype.updateProgram=function(){
	for(var i=0; i<this.lods.length;i++){
		this.lods[i].GLShaderProgram=null;
	}
	return this;
}


/**
* removes a lod to this multimaterial
* @param {GLGE.ObjectLod} lod the lod to remove
*/
GLGE.MultiMaterial.prototype.removeObjectLod=function(lod){
	var idx=this.lods.indexOf(lod);
    lods[idx].removeEventListener("downloadComplete",this.downloadComplete);
	if(idx) this.lods.splice(idx,1);
	return this;
}



})(GLGE);