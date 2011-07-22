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
	this.children=[];
}
GLGE.augment(GLGE.Group,GLGE.PhysicsAbstract);

/**
* Enumeration for copy of rotation and location
**/
GLGE.PHYSICS_ALL=1;
/**
* Enumeration for copy of location
**/
GLGE.PHYSICS_LOC=2;
	
GLGE.PhysicsAbstract.prototype.physicsType=GLGE.PHYSICS_ALL;
GLGE.PhysicsAbstract.prototype.sync=true;


/**
* Sets the physics type either GLGE.PHYSICS_ALL or GLGE.PHYSICS_LOC
* @param {number} value the enumerations for physics type
**/
GLGE.PhysicsAbstract.prototype.setType=function(value){
	this.physicsType=value;
	return this;
}

/**
* Gets the physics type either GLGE.PHYSICS_ALL or GLGE.PHYSICS_LOC
**/
GLGE.PhysicsAbstract.prototype.getType=function(value){
	return this.physicsType;
}

/**
* function run before proceeding with the physics sim
*/
GLGE.PhysicsAbstract.prototype.preProcess=function(dt){
	if(this.sync){
		//update the oriantation and position within jiglib
		var matrix=this.getModelMatrix();
		this.jigLibObj.moveTo([matrix[3],matrix[7],matrix[11],0]);
		if(this.physicsType==1){
			var sx=Math.sqrt(matrix[0]*matrix[0]+matrix[1]*matrix[1]+matrix[2]*matrix[2]);
			var sy=Math.sqrt(matrix[4]*matrix[4]+matrix[5]*matrix[5]+matrix[6]*matrix[6]);
			var sz=Math.sqrt(matrix[8]*matrix[8]+matrix[9]*matrix[9]+matrix[10]*matrix[10]);
			this.jigLibObj.setOrientation(new jigLib.Matrix3D([matrix[0]/sx,matrix[1]/sx,matrix[2]/sx,0,matrix[4]/sy,matrix[5]/sy,matrix[6]/sy,0,matrix[8]/sz,matrix[9]/sz,matrix[10]/sz,0,0,0,0,1]));
		}
		this.sync=false;
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
	this.globalMatrix=null;
	this.sync=true;
	GLGE.Placeable.prototype.updateMatrix.call(this);
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
	value=value.glmatrix;
	var matrix=[value[0],value[1],value[2],value[3],value[4],value[5],value[6],value[7],value[8],value[9],value[10],value[11],value[12],value[13],value[14],value[15]];
	this.locX=value[3];
	this.locY=value[7];
	this.locZ=value[11];
	matrix=GLGE.mulMat4(matrix,this.getScaleMatrix());
	if(this.physicsType!=1){
		var M=this.getModelMatrix();
		matrix[0]=M[0];
		matrix[1]=M[1];
		matrix[2]=M[2];
		matrix[4]=M[4];
		matrix[5]=M[5];
		matrix[6]=M[6];
		matrix[8]=M[8];
		matrix[9]=M[9];
		matrix[10]=M[10];
	}
	this.globalMatrix=matrix;
	if(this.children){
		for(var i=0;i<this.children.length;i++){
			this.children[i].updateMatrix();
		}
	}
	return this;
}

/**
* Sets the velocity of the physics body
* @param {array} value The velocity to set
*/
GLGE.PhysicsAbstract.prototype.setVelocity=function(value,local){
	if(!this.getMovable()) GLGE.error("Cannot set velocity on static object");
	this.jigLibObj.setVelocity(value,local);
	return this;
}
/**
* Sets the x velocity of the physics body
* @param {number} value The x velocity to set
*/
GLGE.PhysicsAbstract.prototype.setVelocityX=function(value){
	if(!this.getMovable()) GLGE.error("Cannot set velocity on static object");
	var vel=this.jigLibObj.getVelocity([0,0,0]);
	vel[0]=+value;
	this.jigLibObj.setVelocity(vel);
	return this;
}
/**
* Sets the y velocity of the physics body
* @param {number} value The y velocity to set
*/
GLGE.PhysicsAbstract.prototype.setVelocityY=function(value){
	if(!this.getMovable()) GLGE.error("Cannot set velocity on static object");
	var vel=this.jigLibObj.getVelocity([0,0,0]);
	vel[1]=+value;
	this.jigLibObj.setVelocity(vel);
	return this;
}
/**
* Sets the z velocity of the physics body
* @param {number} value The z velocity to set
*/
GLGE.PhysicsAbstract.prototype.setVelocityZ=function(value){
	if(!this.getMovable()) GLGE.error("Cannot set velocity on static object");
	var vel=this.jigLibObj.getVelocity([0,0,0]);
	vel[2]=+value;
	this.jigLibObj.setVelocity(vel);
	return this;
}
/**
* Gets the velocity of the physics body
* @returns {array} The velocity to set
*/
GLGE.PhysicsAbstract.prototype.getVelocity=function(){
	return this.jigLibObj.getVelocity([0,0,0]);
}
/**
* Gets the x velocity of the physics body
* @returns {number} The x velocity to set
*/
GLGE.PhysicsAbstract.prototype.getVelocityX=function(){
	return this.jigLibObj.getVelocity([0,0,0])[0];
}
/**
* Gets the y velocity of the physics body
* @returns {number} The y velocity to set
*/
GLGE.PhysicsAbstract.prototype.getVelocityY=function(){
	return this.jigLibObj.getVelocity([0,0,0])[1];
}
/**
* Gets the z velocity of the physics body
* @returns {number} The z velocity to set
*/
GLGE.PhysicsAbstract.prototype.getVelocityZ=function(){
	return this.jigLibObj.getVelocity([0,0,0])[2];
}

/**
* Sets the angular velocity of the physics body
* @param {array} value The velocity to set
*/
GLGE.PhysicsAbstract.prototype.setAngularVelocity=function(value){
	if(!this.getMovable()) GLGE.error("Cannot set velocity on static object");
	this.jigLibObj.setAngVel(value);
	return this;
}
/**
* Sets the x-axis angular velocity of the physics body
* @param {number} value The x velocity to set
*/
GLGE.PhysicsAbstract.prototype.setAngularVelocityX=function(value){
	if(!this.getMovable()) GLGE.error("Cannot set velocity on static object");
	var vel=this.jigLibObj.getAngVel();
	vel[0]=+value;
	this.jigLibObj.setAngVel(vel);
	return this;
}
/**
* Sets the y-axis angular velocity of the physics body
* @param {number} value The y velocity to set
*/
GLGE.PhysicsAbstract.prototype.setAngularVelocityY=function(value){
	if(!this.getMovable()) GLGE.error("Cannot set velocity on static object");
	var vel=this.jigLibObj.getAngVel();
	vel[1]=+value;
	this.jigLibObj.setAngVel(vel);
	return this;
}
/**
* Sets the z-axis angular velocity of the physics body
* @param {number} value The z velocity to set
*/
GLGE.PhysicsAbstract.prototype.setAngularVelocityZ=function(value){
	if(!this.getMovable()) GLGE.error("Cannot set velocity on static object");
	var vel=this.jigLibObj.getAngVel();
	vel[2]=+value;
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
GLGE.PhysicsAbstract.prototype.setMovable=function(value){
	this.jigLibObj.set_movable(value);
	return this;
}
/**
* Gets the movable flag for the object
* @returns {boolean} The movable flag
*/
GLGE.PhysicsAbstract.prototype.getMovable=function(){
	return this.jigLibObj.get_movable();
}

/**
* Sets the friction for the object
* @param {number} value The friction 0-1
*/
GLGE.PhysicsAbstract.prototype.setFriction=function(value){
	this.jigLibObj.set_friction(value);
	return this;
}
/**
* Gets the friction for the object
* @returns {number} The friction 
*/
GLGE.PhysicsAbstract.prototype.getFriction=function(){
	return this.jigLibObj.get_friction();
}


/**
* Sets the mass for the object
* @param {number} value The mass
*/
GLGE.PhysicsAbstract.prototype.setMass=function(value){
	this.jigLibObj.set_mass(value);
	return this;
}

/**
* Gets the mass for the object
* @returns {number} The mass 
*/
GLGE.PhysicsAbstract.prototype.getMass=function(){
	return this.jigLibObj.get_mass();
}


/**
* Sets the restitution for the object
* @param {number} value The restitution 0-1
*/
GLGE.PhysicsAbstract.prototype.setRestitution=function(value){
	this.jigLibObj.set_restitution(value);
	return this;
}
/**
* Gets the restitution for the object
* @returns {number} The restitution 
*/
GLGE.PhysicsAbstract.prototype.getRestitution=function(){
	return this.jigLibObj.get_restitution();
}

/**
* Add forces in the body coordinate frame
* @param {array} f force expressed as a 3D vector
* @param {array} p position of origin of the force expressed as a 3D vector 
**/
GLGE.PhysicsAbstract.prototype.addBodyForce=function(f, p){
	this.jigLibObj.addBodyForce(f,p);
	return this;
}

/**
* Add forces in the world coordinate frame
* @param {array} f force expressed as a 3D vector
* @param {array} p position of origin of the force expressed as a 3D vector 
**/
GLGE.PhysicsAbstract.prototype.addWorldForce=function(f, p){
	this.jigLibObj.addWorldForce(f,p);
	return this;
}

/**
* Add torque in the world coordinate frame
* @param {array} t torque expressed as a 3D vector 
**/
GLGE.PhysicsAbstract.prototype.addWorldTorque=function(t){
	this.jigLibObj.addWorldTorque(t);
	return this;
}

/**
* Add torque in the body coordinate frame
* @param {array} t torque expressed as a 3D vector 
**/
GLGE.PhysicsAbstract.prototype.addBodyTorque=function(t){
	this.jigLibObj.addBodyTorque(t);
	return this;
}
/**
* Sets the linear velocity damping
* @param {array} damping 3D vector for linear damping
**/
GLGE.PhysicsAbstract.prototype.setLinearVelocityDamping=function(v){
	this.jigLibObj.set_linVelocityDamping(v);
	return this;
}

/**
* Gets the rotational velocity Damping
* @returns 3D vector for rotational damping
**/
GLGE.PhysicsAbstract.prototype.getRotationalVelocityDamping=function(v){
	return this.jigLibObj.get_rotVelocityDamping();
}

/**
* Gets the linear velocity damping
* @returns 3D vector for linear damping
**/
GLGE.PhysicsAbstract.prototype.getLinearVelocityDamping=function(v){
	return this.jigLibObj.get_linVelocityDamping();
}

/**
* Sets the rotational velocity Damping
* @param {array} damping 3D vector for rotational damping
**/
GLGE.PhysicsAbstract.prototype.setRotationalVelocityDamping=function(v){
	this.jigLibObj.set_rotVelocityDamping(v);
	return this;
}


/**
* Remove active force and torque
**/
GLGE.PhysicsAbstract.prototype.clearForces=function(){
	this.jigLibObj.clearForces();
	return this;
}




})(GLGE);