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

/**
* @class A wrapping class for jiglib spheres
* @augments GLGE.PhysicsAbstract
*/
GLGE.PhysicsSphere=function(uid){
	this.jigLibObj=new jigLib.JSphere(this,this.radius);
	this.jigLibObj.GLGE=this;
	this.jigLibObj.addEventListener(jigLib.JCollisionEvent.COLLISION, function(event){this.GLGE.fireEvent("collision",{obj:event.collisionBody.GLGE,impulse:event.collisionImpulse})});
	GLGE.PhysicsAbstract.call(this,uid);
}
GLGE.augment(GLGE.PhysicsAbstract,GLGE.PhysicsSphere);

GLGE.PhysicsSphere.prototype.radius=1;

GLGE.PhysicsSphere.prototype.className="PhysicsSphere";
/**
* Sets the radius of the sphere
* @param {number} value The radius to set
*/
GLGE.PhysicsSphere.prototype.setRadius=function(value){
	this.physicsRadius=+value;
	this.jigLibObj.set_radius(+value);
	return this;
}

/**
* Gets the radius of the sphere
* @returns {number} The radius to set
*/
GLGE.PhysicsSphere.prototype.getRadius=function(value){
	return this.jigLibObj.get_radius();
}

})(GLGE);