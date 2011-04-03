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
 * @name glge_constraintpoint.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){

/**
* @class A wrapping class for jiglib constraint point
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.PhysicsConstraintPoint=function(){
}
GLGE.augment(GLGE.QuickNotation,GLGE.PhysicsConstraintPoint);
GLGE.augment(GLGE.JSONLoader,GLGE.PhysicsConstraintPoint);

GLGE.PhysicsConstraintPoint.constraint=null;
GLGE.PhysicsConstraintPoint.prototype.className="PhysicsConstraintPoint";


/**
* Sets the first body to use with this constraint
* @param {GLGE.PhysicsAbstract} body1 The first body
*/
GLGE.PhysicsConstraintPoint.prototype.setBody1=function(body1){
	this.body1=body1;
	this.updateConstraint();
	return this;
}
/**
* Sets the second body to use with this constraint
* @param {GLGE.PhysicsAbstract} body2 The second body
*/
GLGE.PhysicsConstraintPoint.prototype.setBody2=function(body2){
	this.body2=body2;
	this.updateConstraint();
	return this;
}
/**
* Sets the constraing point on the first body
* @param {array} bodypos1 The first body constraint point
*/
GLGE.PhysicsConstraintPoint.prototype.setBodyPos1=function(bodypos1){
	if(typeof(bodypos1)=="string") bodypos1=bodypos1.split(",");
	this.bodypos1=[parseFloat(bodypos1[0]),parseFloat(bodypos1[1]),parseFloat(bodypos1[2])];
	this.updateConstraint();
	return this;
}
/**
* Sets the constraing point on the second body
* @param {array} bodypos2 The second body constraint point
*/
GLGE.PhysicsConstraintPoint.prototype.setBodyPos2=function(bodypos2){
	if(typeof(bodypos2)=="string") bodypos2=bodypos2.split(",");
	this.bodypos2=[parseFloat(bodypos2[0]),parseFloat(bodypos2[1]),parseFloat(bodypos2[2])];
	this.updateConstraint();
	return this;
}

/**
* Updates the jiglib constraint
* @private
*/
GLGE.PhysicsConstraintPoint.prototype.updateConstraint=function(){
	if(this.body1 && this.body2 && this.bodypos1 && this.bodypos2){
		if(this.constraint){
			if(this.parent && this.parent.physicsSystem) this.parent.physicsSystem.removeConstraint(this.constraint);
			this.body1.removeConstraint(this.constraint);
			this.body2.removeConstraint(this.constraint);
		}
		this.constraint=new jigLib.JConstraintPoint(this.body1.jigLibObj,this.bodypos1,this.body2.jigLibObj,this.bodypos2);
		if(this.parent && this.parent.physicsSystem) this.parent.physicsSystem.addConstraint(this.constraint);
	}
}

/**
* Add a new physics constraint to the scene
* @param {GLGE.PhysicsConstraintPoint} constraint The constraint to add to the scene
*/
GLGE.Scene.prototype.addPhysicsConstraintPoint=function(constraint){
	if(!this.constraints) this.constraints=[];
	this.constraints.push(constraint);
	if(this.physicsSystem) this.physicsSystem.addConstraint(constraint.constraint);
	return this;
}

/**
* Removes a physics constraint to the scene
* @param {GLGE.PhysicsConstraintPoint} constraint The constraint to remove from the scene
*/
GLGE.Scene.prototype.removePhysicsConstraintPoint=function(constraint){
	if(!this.constraints) this.constraints=[];
	if(this.constraints.indexOf(constraint)>-1){
		this.constraints.push(constraint);
		if(this.physicsSystem) this.physicsSystem.removeConstraint(constraint.constraint);
	}
	return this;
}


})(GLGE);