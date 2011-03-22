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
 * @name glge_physicsabstract.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){



/**
* @class An abstract class used when constructing jiglib rigidbodies
* @augments GLGE.Group
*/
GLGE.PhysicsAbstract=function(uid){
}
GLGE.augment(GLGE.Group,GLGE.PhysicsAbstract);

/**
* Enumeration for a rigid body
**/
GLGE.PHYSICS_RIGID=1;
/**
* Enumeration for a dynamic body
**/
GLGE.PHYSICS_DYNAMIC=2;
	
GLGE.PhysicsAbstract.prototype.physicsType=GLGE.PHYSICS_RIGID;


/**
* function run before proceeding with the physics sim
*/
GLGE.PhysicsAbstract.prototype.preProcess=function(){
	if(this.sync){
		//update the oriantation and position within jiglib
	}
}

/**
* get_transform gets the transform matrix
* @type jigLib.Matrix3D
* @private
**/
GLGE.PhysicsAbstract.prototype.get_transform=function(){
	return new jigLib.Matrix3D(this.getModelMatrix());
}

/**
* Updates the model matrix and flag physics system to sync
* @private
*/
GLGE.PhysicsAbstract.prototype.updateMatrix=function(){
	GLGE.Placeable.prototype.updateMatrix.call(this);
	this.globalMatrix=null;
	this.jigLibObj.sync=true;
}

/**
* Gets the model matrix to transform the model within the world
*/
GLGE.PhysicsAbstract.prototype.getModelMatrix=function(){
	if(this.globalMatrix) return this.globalMatrix;
	return GLGE.Placeable.prototype.getModelMatrix.call(this);
}
	
/**
* set_transform sets the transform matrix
* @param {Matrix3D} value
* @private
**/
GLGE.PhysicsAbstract.prototype.set_transform=function(value){
	var matrix=[value[0],value[1],value[2],value[3],value[4],value[5],value[6],value[7],value[8],value[9],value[10],value[11],value[12],value[13],value[14],value[15]];
	this.locX=value[3];
	this.locY=value[7];
	this.locZ=value[11];
	this.globalMatrix=matrix;
	return this;
}

/**
* Sets the velocity of the physics body
* @param {array} value The velocity to set
*/
GLGE.PhysicsAbstract.prototype.setVelocity=function(value){
	if(!this.getMoveable()) GLGE.error("Cannot set velocity on static object");
	this.jigLibObj.setVelocity(value);
	return this;
}
/**
* Sets the x velocity of the physics body
* @param {number} value The x velocity to set
*/
GLGE.PhysicsAbstract.prototype.setVelocityX=function(value){
	if(!this.getMoveable()) GLGE.error("Cannot set velocity on static object");
	var vel=this.jigLibObj.getVelocity();
	vel[0]=value;
	this.jigLibObj.setVelocity(vel);
	return this;
}
/**
* Sets the y velocity of the physics body
* @param {number} value The y velocity to set
*/
GLGE.PhysicsAbstract.prototype.setVelocityY=function(value){
	if(!this.getMoveable()) GLGE.error("Cannot set velocity on static object");
	var vel=this.jigLibObj.getVelocity();
	vel[1]=value;
	this.jigLibObj.setVelocity(vel);
	return this;
}
/**
* Sets the z velocity of the physics body
* @param {number} value The z velocity to set
*/
GLGE.PhysicsAbstract.prototype.setVelocityZ=function(value){
	if(!this.getMoveable()) GLGE.error("Cannot set velocity on static object");
	var vel=this.jigLibObj.getVelocity();
	vel[2]=value;
	this.jigLibObj.setVelocity(vel);
	return this;
}
/**
* Gets the velocity of the physics body
* @returns {array} The velocity to set
*/
GLGE.PhysicsAbstract.prototype.getVelocity=function(){
	return this.jigLibObj.getVelocity();
}
/**
* Gets the x velocity of the physics body
* @returns {number} The x velocity to set
*/
GLGE.PhysicsAbstract.prototype.getVelocityX=function(){
	return this.jigLibObj.getVelocity()[0];
}
/**
* Gets the y velocity of the physics body
* @returns {number} The y velocity to set
*/
GLGE.PhysicsAbstract.prototype.getVelocityY=function(){
	return this.jigLibObj.getVelocity()[1];
}
/**
* Gets the z velocity of the physics body
* @returns {number} The z velocity to set
*/
GLGE.PhysicsAbstract.prototype.getVelocityZ=function(){
	return this.jigLibObj.getVelocity()[2];
}

/**
* Sets the angular velocity of the physics body
* @param {array} value The velocity to set
*/
GLGE.PhysicsAbstract.prototype.setAngularVelocity=function(value){
	if(!this.getMoveable()) GLGE.error("Cannot set velocity on static object");
	this.jigLibObj.setAngVel(value);
	return this;
}
/**
* Sets the x-axis angular velocity of the physics body
* @param {number} value The x velocity to set
*/
GLGE.PhysicsAbstract.prototype.setAngularVelocityX=function(value){
	if(!this.getMoveable()) GLGE.error("Cannot set velocity on static object");
	var vel=this.jigLibObj.getAngVel();
	vel[0]=value;
	this.jigLibObj.setAngVel(vel);
	return this;
}
/**
* Sets the y-axis angular velocity of the physics body
* @param {number} value The y velocity to set
*/
GLGE.PhysicsAbstract.prototype.setAngularVelocityY=function(value){
	if(!this.getMoveable()) GLGE.error("Cannot set velocity on static object");
	var vel=this.jigLibObj.getAngVel();
	vel[1]=value;
	this.jigLibObj.setAngVel(vel);
	return this;
}
/**
* Sets the z-axis angular velocity of the physics body
* @param {number} value The z velocity to set
*/
GLGE.PhysicsAbstract.prototype.setAngularVelocityZ=function(value){
	if(!this.getMoveable()) GLGE.error("Cannot set velocity on static object");
	var vel=this.jigLibObj.getAngVel();
	vel[2]=value;
	this.jigLibObj.setAngVel(vel);
	return this;
}
/**
* Gets the angular velocity of the physics body
* @returns {array} The velocity to set
*/
GLGE.PhysicsAbstract.prototype.getAngularVelocity=function(){
	return this.jigLibObj.getAngVel();
}
/**
* Gets the x-axis angular velocity of the physics body
* @returns {number} The x velocity to set
*/
GLGE.PhysicsAbstract.prototype.getAngularVelocityX=function(){
	return this.jigLibObj.getAngVel()[0];
}
/**
* Gets the y-axis angular velocity of the physics body
* @returns {number} The y velocity to set
*/
GLGE.PhysicsAbstract.prototype.getAngularVelocityY=function(){
	return this.jigLibObj.getAngVel()[1];
}
/**
* Gets the z-axis angular velocity of the physics body
* @returns {number} The z velocity to set
*/
GLGE.PhysicsAbstract.prototype.getAngularVelocityZ=function(){
	return this.jigLibObj.getAngVel()[2];
}
/**
* Sets the movable flag for the object
* @param {boolean} value The movable flag
*/
GLGE.PhysicsAbstract.prototype.setMoveable=function(value){
	this.jigLibObj.set_movable(value);
	return this;
}
/**
* Gets the movable flag for the object
* @returns {boolean} The movable flag
*/
GLGE.PhysicsAbstract.prototype.getMoveable=function(){
	return this.jigLibObj.get_movable();
}


})(GLGE);