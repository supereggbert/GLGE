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
 * @name glge_physicsmesh.js
 * @author me@paulbrunt.co.uk
 */

(function(GLGE){

/**
* @class A wrapping class for jiglib triangle mesh
* @augments GLGE.PhysicsAbstract
*/
GLGE.PhysicsMesh=function(uid){
	this.jigLibObj=new jibLib.JTriangleMesh(this);
	this.dirty=true;
	this.addEventListsenter("matrixUpdate",this.makeDirty);
	this.addEventListsenter("childMatrixUpdate",this.makeDirty);
	this.addEventListsenter("childAdded",this.makeDirty);
	this.addEventListsenter("childRemoved",this.makeDirty);
	
	GLGE.PhysicsAbstract.call(this,uid);
}
GLGE.augment(GLGE.PhysicsAbstract,GLGE.PhysicsMesh);


GLGE.PhysicsMesh.prototype.className="PhysicsMesh";
/**
* flag to regenerate trimesh and redo octtree
* @private
*/
GLGE.PhysicsMesh.prototype.makeDirty=function(e){
	this.dirty=true;
}
/**
* called before a system intergrate
* @private
*/
GLGE.PhysicsMesh.prototype.preProcess=function(){
	//GLGE.PhysicsAbstract.prototype.preProcess.call(this); //we don't want to update physics position since that has already been accounted for
	//recreate mesh and build octree
	if(this.dirty){
		var tiangles=this.getTriangles();
		this.jigLibObj.createMesh(triangles.verts, triangles.faces);
		this.dirty=false;
	}
}
/**
* Creates the jiglib triangle arrays from the containing objects
* @private
*/
GLGE.PhysicsMesh.prototype.getTriangles=function(){
	var objs=this.getObjects();
	var verts=[];
	var faces=[];
	for(var i=0;i<objs.length;i++){
		if(objs.multimaterials){
			var matrix=objs[i].getModelMatrix();
			for(var j=0;j<objs[i].multimaterials.lengh;j++){
				var mesh=objs[i].multimaterials[j].getMesh();
				var vertcnt=verts.length;
				if(mesh){
					for(var k=0;k<mesh.positions.length;k=k+3){
						var vert=[mesh.positions[k],mesh.positions[k+1],mesh.positions[k+1],1];
						var v=GLGE.mulMatVec3(matrix,vert);
						verts.push([v[0],v[1],v[2]]);
					}
					var mfaces=mesh.faces
					if(mfaces){
						for(var k=0;k<mfaces.length;k=k+3){
							faces.push([mfaces[k]+vertcnt,mfaces[k+1]+vertcnt,mfaces[k+2]+vertcnt]);
						}
					}else{
						for(var k=0;k<mesh.positions.length/3;k=k+3){
							faces.push([k+vertcnt,k+1+vertcnt,k+2+vertcnt]);
						}
					}
				}
			}
		}
	}
	return {verts:verts,faces:faces};
}


})(GLGE);