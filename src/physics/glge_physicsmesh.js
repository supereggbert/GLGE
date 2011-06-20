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
	this.jigLibObj=new jigLib.JTriangleMesh(null, 100, 0.1);
	this.jigLibObj.GLGE=this;
	this.jigLibObj.addEventListener(jigLib.JCollisionEvent.COLLISION, function(event){this.GLGE.fireEvent("collision",{obj:event.collisionBody.GLGE,impulse:event.collisionImpulse})});
	this.dirty=true;
	this.addEventListener("matrixUpdate",this.makeDirty);
	this.addEventListener("childMatrixUpdate",this.makeDirty);
	this.addEventListener("childAdded",this.makeDirty);
	this.addEventListener("childRemoved",this.makeDirty);
	
	GLGE.PhysicsAbstract.call(this,uid);
}
GLGE.augment(GLGE.PhysicsAbstract,GLGE.PhysicsMesh);


GLGE.PhysicsMesh.prototype.className="PhysicsMesh";
/**
* Forces and update of the triangle mesh
*/
GLGE.PhysicsMesh.prototype.forceUpdate=function(){
	this.dirty=true;
	return this;
}

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
	//recreate mesh and build octree
	if(this.dirty){
		var triangles=this.getTriangles();
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
		if(objs[i].multimaterials){
			var matrix=objs[i].getModelMatrix();
			for(var j=0;j<objs[i].multimaterials.length;j++){
				var mesh=objs[i].multimaterials[j].getMesh();
				var vertcnt=verts.length;
				if(mesh){
					for(var k=0;k<mesh.positions.length;k=k+3){
						var vert=[mesh.positions[k],mesh.positions[k+1],mesh.positions[k+2],1];
						var v=GLGE.mulMat4Vec4(matrix,vert);
						verts.push([v[0],v[1],v[2],1]);
					}
					var mfaces=mesh.faces.data
					if(mfaces){
						var len=mfaces.length;
						len=((len/3)|0)*3;
						for(var k=0;k<len;k=k+3){
							faces.push([+mfaces[k]+vertcnt,+mfaces[k+1]+vertcnt,+mfaces[k+2]+vertcnt]);
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