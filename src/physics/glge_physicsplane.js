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
 * @name glge_physicssphere.js
 * @author me@paulbrunt.co.uk
 */

(function(GLGE){

GLGE.PHYSICS_XAXIS=[1,0,0,0];
GLGE.PHYSICS_YAXIS=[0,1,0,0];
GLGE.PHYSICS_ZAXIS=[0,0,1,0];
GLGE.PHYSICS_NEGXAXIS=[-1,0,0,0];
GLGE.PHYSICS_NEGYAXIS=[0,-1,0,0];
GLGE.PHYSICS_NEGZAXIS=[0,0,-1,0];
/**
* @class A wrapping class for jiglib spheres
* @augments GLGE.PhysicsAbstract
*/
GLGE.PhysicsPlane=function(uid){
	this.jigLibObj=new jigLib.JPlane(this,this.normal,this.distance);
	this.jigLibObj.GLGE=this;
	this.jigLibObj.addEventListener(jigLib.JCollisionEvent.COLLISION, function(event){this.GLGE.fireEvent("collision",{obj:event.collisionBody.GLGE,impulse:event.collisionImpulse})});
	GLGE.PhysicsAbstract.call(this,uid);
}
GLGE.augment(GLGE.PhysicsAbstract,GLGE.PhysicsPlane);

GLGE.PhysicsPlane.prototype.normal=[0,0,1,0];
GLGE.PhysicsPlane.prototype.distance=0;

GLGE.PhysicsPlane.prototype.className="PhysicsPlane";
/**
* Sets the normal of the plane
* @param {number} value The normal to set
*/
GLGE.PhysicsPlane.prototype.setNormal=function(value){
	this.normal=value;
	this.jigLibObj.set_normal(value);
	return this;
}
/**
* Sets the distance of the plane
* @param {number} value The distance to set
*/
GLGE.PhysicsPlane.prototype.setDistance=function(value){
	this.distance=value;
	this.jigLibObj.set_distance(value);
	return this;
}

/**
* Gets the normal of the plane
* @returns {number} The current normal
*/
GLGE.PhysicsPlane.prototype.getNormal=function(){
	return this.jigLibObj.get_normal();
}

/**
* Gets the distance of the plane
* @returns {number} The current distance
*/
GLGE.PhysicsPlane.prototype.getDistance=function(){
	return this.jigLibObj.get_distance();
}

})(GLGE);