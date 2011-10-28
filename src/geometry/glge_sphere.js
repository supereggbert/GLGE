/*
GLGE WebGL Graphics Engine
Copyright (c) 2011, Paul Brunt
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
 * @name glge_sphere.js
 * @author me@paulbrunt.co.uk
 */
 
(function(GLGE){
/**
* @class Used to generate a basic sphere mesh
* @augments GLGE.Mesh
*/
GLGE.Sphere=function(uid){
	this.vertical=10;
	this.horizontal=10;
	this.radius=1;
	this.dirtySphere=false;
	GLGE.Mesh.apply(this,arguments);
	this.generateMeshData();
}
GLGE.augment(GLGE.Mesh,GLGE.Sphere);
/**
* @private
*/
GLGE.Sphere.prototype.generateMeshData=function(){
	var vertical=this.vertical;
	var horizontal=this.horizontal;
	var radius=this.radius;
	var t1,y,r1,i,j,x,y,t2;
	var verts=[];
	var normals=[];
	var faces=[];
	for(i=0;i<=vertical;i++){
		t1=i/vertical*Math.PI;
		y=Math.cos(t1)*radius;
		r1=Math.sin(t1)*radius;
		for(j=0;j<horizontal;j++){
			t2=j/horizontal*2*Math.PI;
			x=Math.sin(t2)*r1;
			z=Math.cos(t2)*r1;
			verts.push(x,y,z);
			var n=GLGE.toUnitVec3([x,y,z]);
			normals.push(n[0],n[1],n[2]);
		}
		if(i>0){
			for(j=0;j<horizontal;j++){
				var v1=i*horizontal+j;
				var v2=(i-1)*horizontal+j;
				var v3=i*horizontal+(j+1)%horizontal;
				var v4=(i-1)*horizontal+(j+1)%horizontal;
				faces.push(v1,v3,v4,v1,v4,v2)
			}
		}
	}
	this.setPositions(verts);
	this.setNormals(normals);
	this.setFaces(faces);
	this.dirtySphere=false;
}

/**
* Sets the sphere radius
* @param {number} radius the sphere radius
*/
GLGE.Sphere.prototype.setRadius=function(radius){
	this.radius=radius;
	this.dirtySphere=true;
	return this;
}
/**
* Gets the sphere radius
* @returns the radius
*/
GLGE.Sphere.prototype.getRadius=function(){
	return this.radius;
}

/**
* Sets the sphere vertical divisions
* @param {number} radius the sphere radius
*/
GLGE.Sphere.prototype.setVertical=function(vertical){
	this.vertical=vertical;
	this.dirtySphere=true;
	return this;
}
/**
* Gets the sphere vertical divisions
* @returns the radius
*/
GLGE.Sphere.prototype.getRadius=function(){
	return this.vertical;
}

/**
* Sets the sphere horizontal divisions
* @param {number} radius the sphere radius
*/
GLGE.Sphere.prototype.setHorizontal=function(horizontal){
	this.horizontal=horizontal;
	this.dirtySphere=true;
	return this;
}
/**
* Gets the sphere horizontal divisions
* @returns the radius
*/
GLGE.Sphere.prototype.getRadius=function(){
	return this.horizontal;
}

/**
* @private
*/
GLGE.Sphere.prototype.GLAttributes=function(){
	if(this.dirtySphere) this.generateMeshData();
	GLGE.Mesh.prototype.GLAttributes.apply(this,arguments);
};

})(GLGE);