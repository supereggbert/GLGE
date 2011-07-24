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
 * @name glge_physicscar.js
 * @author me@paulbrunt.co.uk
 */
 (function(GLGE){
 
/**
* @class Physics Car class
* @augments GLGE.PhysicsBox
* @see GLGE.PhysicsWheel
*/
GLGE.PhysicsCar=function(uid){
	GLGE.PhysicsBox.call(this,uid);
	this.wheels=[];
	this.setRotationalVelocityDamping([0.1,0.6,0.1]);
	this.setLinearVelocityDamping([0.996,0.92,0.996]);
	return this;
}
GLGE.augment(GLGE.PhysicsBox,GLGE.PhysicsCar);
GLGE.PhysicsCar.prototype.className="PhysicsCar";
GLGE.Group.prototype.addPhysicsCar=GLGE.Group.prototype.addChild;
GLGE.Scene.prototype.addPhysicsCar=GLGE.Group.prototype.addChild;
/**
* Applies a driving force to the car
* @param {number} force the item driving force to apply to each powered wheel
*/
GLGE.PhysicsCar.prototype.drive=function(force){
	for(var i=0;i<this.wheels.length;i++){
		var wheel=this.wheels[i];
		if(wheel.powered) wheel.drive(force);
	}
	return this;
}
/**
* Applies a brake to the car
* @param {number} brake the level of braking
*/
GLGE.PhysicsCar.prototype.brake=function(brake){
	for(var i=0;i<this.wheels.length;i++){
		if(this.wheels[i].powered) this.wheels[i].brake(brake);
	}
	return this;
}
/**
* Adds a wheel to the car
* @param {GLGE.PhysicsWheel} wheel a wheel to add to the car
*/
GLGE.PhysicsCar.prototype.addPhysicsWheel=function(wheel){
	this.wheels.push(wheel);
	return GLGE.PhysicsBox.prototype.addChild.call(this,wheel);
}
/**
* Removes a wheel from the car
* @param {GLGE.PhysicsWheel} wheel a wheel to remove
*/
GLGE.PhysicsCar.prototype.removeWheel=function(wheel){
	var idx=this.wheels.indexOf(wheel);
	if(idx>-1) this.wheels.splice(idx,1);
	return GLGE.PhsyicsBox.prototype.addChild.call(this,wheel);
}
/**
* does the physics stuff
* @private
*/
GLGE.PhysicsCar.prototype.getScene=function(){
	var child=this;
	while(child.parent) child=child.parent;
	return child;
}
/**
* does the physics stuff
* @private
*/
GLGE.PhysicsCar.prototype.preProcess=function(dt){
	var scene=this.getScene();
	var velocity=this.getVelocity();
	var carMass=this.getMass();
	var wheels=this.wheels
	for(var i=0;i<wheels.length;i++){
		var wheel=wheels[i];
		var mat=wheel.getModelMatrix();
		var tangent=GLGE.toUnitVec3([mat[2],mat[6],mat[10]]);
		var up=GLGE.toUnitVec3([mat[1],mat[5],mat[9]]);
		var forward=GLGE.toUnitVec3([mat[0],mat[4],mat[8]]);
		var position=[mat[3],mat[7],mat[11]];
			
		var wheelRadius=wheel.radius;
		var travel=wheel.travel;
		var spring=wheel.spring;
		var sideFriction=wheel.sideFriction;
		var frontFriction=wheel.frontFriction;
			
		var springForce=0;
		var result=scene.segmentTest(position,GLGE.scaleVec3(up,-travel-wheelRadius),this);
		if(result){
			var distanceToFloor=result.distance-wheelRadius;
			if(distanceToFloor<travel){
				springForce=(travel-distanceToFloor)/travel*spring; 
				this.addWorldForce(GLGE.scaleVec3(up,springForce),position);
				wheel.innerGroup.setLocY(wheelRadius-result.distance);
			}
			//turning force
			//var sideForce=springForce*sideFriction; //although correct having a varible side force makes things very difficult to control
			var sideForce=sideFriction;
			var dot=GLGE.scaleVec3(tangent,-GLGE.dotVec3(tangent,velocity)*sideForce);
			this.addWorldForce(dot,position);
		}else{
			wheel.innerGroup.setLocY(-travel);
		}

		var maxForwardForce=springForce*frontFriction; //frictional force
		var maxdw=(maxForwardForce*dt*dt)/wheelRadius;
		var dw=0;
			
		//do the wheel turn
		if(wheel.oldPos){
			var delta=GLGE.dotVec3(GLGE.subVec3(position,wheel.oldPos),forward)/wheelRadius;
			var dw=delta/dt-wheel.angVel;
			if(dw<-maxdw) dw=-maxdw;
			if(dw>maxdw) dw=maxdw;
		}
		if(wheel.driveForce){
			var drive=wheel.driveForce*(1-wheel.braking);
			if(drive<-maxForwardForce) drive=maxForwardForce;
			if(drive>maxForwardForce) drive=maxForwardForce;
			this.addWorldForce(GLGE.scaleVec3(forward,drive),position);
			dw+=(wheel.driveForce/carMass*dt)/wheelRadius;
		}
		if(wheel.braking){
			var frontVel=GLGE.dotVec3(velocity,forward);
			var braking=-wheel.braking*frontVel/dt
			if(braking<-maxForwardForce) braking=-maxForwardForce;
			if(braking>maxForwardForce) braking=maxForwardForce;
			this.addWorldForce(GLGE.scaleVec3(forward,braking),position);
		}
			
		wheel.angVel+=dw;
		if(wheel.brake) wheel.angVel*=(1-wheel.braking);
		wheel.innerGroup.setRotZ(wheel.innerGroup.getRotZ()-wheel.angVel*dt);
		wheel.angVel*=0.995;
		wheel.oldPos=position;
			
	}
	
	GLGE.PhysicsBox.prototype.preProcess.call(this,dt);

}


/**
* @class physics wheel class used with PhysicsCar class 
* @augments GLGE.Group
* @see GLGE.PhysicsBox
*/
GLGE.PhysicsWheel=function(uid){
	GLGE.Group.call(this,uid);
	this.innerGroup=new GLGE.Group;
	GLGE.Group.prototype.addChild.call(this,this.innerGroup);
	return this;
}
GLGE.augment(GLGE.Group,GLGE.PhysicsWheel);
GLGE.PhysicsWheel.prototype.radius=1;
GLGE.PhysicsWheel.prototype.travel=0.75;
GLGE.PhysicsWheel.prototype.angVel=0;
GLGE.PhysicsWheel.prototype.spring=90;
GLGE.PhysicsWheel.prototype.braking=0;
GLGE.PhysicsWheel.prototype.driveForce=0;
GLGE.PhysicsWheel.prototype.powered=false;
GLGE.PhysicsWheel.prototype.sideFriction=3; //sideways friction co-efficient
GLGE.PhysicsWheel.prototype.frontFriction=3; //front friction force
GLGE.PhysicsWheel.prototype.className="PhysicsWheel";

/**
* Adds a child to the wheel container
* @param {object} child a GLGE object to represent the wheel
*/
GLGE.PhysicsWheel.prototype.addChild=function(child){
	return this.innerGroup.addChild(child);
}
/**
* Removes a child to the wheel container
* @param {object} child a GLGE object to represent the wheel
*/
GLGE.PhysicsWheel.prototype.removeChild=function(child){
	return this.innerGroup.removeChild(child);
}
GLGE.PhysicsWheel.prototype.addGroup=GLGE.PhysicsWheel.prototype.addChild;
GLGE.PhysicsWheel.prototype.addCollada=GLGE.PhysicsWheel.prototype.addChild;
GLGE.PhysicsWheel.prototype.addObject=GLGE.PhysicsWheel.prototype.addChild;
GLGE.PhysicsWheel.prototype.addMD2=GLGE.PhysicsWheel.prototype.addChild;
GLGE.PhysicsWheel.prototype.addMD3=GLGE.PhysicsWheel.prototype.addChild;
GLGE.PhysicsWheel.prototype.addWavefront=GLGE.PhysicsWheel.prototype.addChild;


/**
* Sets the wheel to be a powered wheel
* @param {boolean} powered flag indicateding if wheel is powered
*/
GLGE.PhysicsWheel.prototype.setPowered=function(powered){
	this.powered=powered;
	return this;
}

/**
* Sets the wheel Radius
* @param {number} radius the wheel radius
*/
GLGE.PhysicsWheel.prototype.setRadius=function(radius){
	this.radius=radius;
	return this;
}
/**
* Sets the  suspension spring distance
* @param {number} radius the wheel radius
*/
GLGE.PhysicsWheel.prototype.setSpring=function(spring){
	this.spring=spring;
	return this;
}
/**
* Sets the suspension travel distance
* @param {number} travel the suspension travel
*/
GLGE.PhysicsWheel.prototype.setTravel=function(travel){
	this.travel=travel;
	return this;
}
/**
* Sets the front friction coefficient
* @param {number} friction the front fricition coefficient
*/
GLGE.PhysicsWheel.prototype.setFrontFriction=function(friction){
	this.frontFriction=friction;
	return this;
}
/**
* Sets the side friction coefficient
* @param {number} friction the side fricition coefficient
*/
GLGE.PhysicsWheel.prototype.setSideFriction=function(friction){
	this.sideFriction=friction;
	return this;
}
/**
* Sets the wheel Rotation
* @param {number} rotation the rotation of the wheel
*/
GLGE.PhysicsWheel.prototype.setWheelRotation=function(rotation){
	this.setRotY(rotation);
	return this;
}
/**
* Gets the wheel Rotation
* @returns the wheel roation in radians
*/
GLGE.PhysicsWheel.prototype.getWheelRotation=function(rotation){
	return this.getRotY();
}
/**
* Gets the wheel Radius
* @returns the wheel radius
*/
GLGE.PhysicsWheel.prototype.getRadius=function(){
	return this.radius;
}
/**
* Gets the suspension spring
* @returns the wheel radius
*/
GLGE.PhysicsWheel.prototype.getSpring=function(){
	return this.spring;
}
/**
* Gets the suspension travel distance
* @returns the suspension travel
*/
GLGE.PhysicsWheel.prototype.getTravel=function(){
	return this.travel;
}
/**
* Gets the front friction coefficient
* @returns the front fricition coefficient
*/
GLGE.PhysicsWheel.prototype.getFrontFriction=function(){
	return this.frontFriction;
}
/**
* Gets the side friction coefficient
* @returns the side fricition coefficient
*/
GLGE.PhysicsWheel.prototype.getSideFriction=function(){
	return this.sideFriction;
}

/**
* Sets a driving force for the wheel
* @param {number} force the driving force in N
*/
GLGE.PhysicsWheel.prototype.drive=function(force){
	this.driveForce=force;
	return this;
}
/**
* Sets the braking level
* @param {number} brake 0-1 value indicating the level of braking
*/
GLGE.PhysicsWheel.prototype.brake=function(brake){
	this.braking=brake;
	return this;
}

})(GLGE);