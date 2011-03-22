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
 * @name glge_physicsext.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){


GLGE.Scene.prototype.physicsGravity=-9.8;

/**
* Integrate the phsyics system
* @param {number} dt the delta time to integrate for
*/
GLGE.Scene.prototype.physicsTick=function(dt){
	if(!this.physicsSystem){
		//create the physics system
		this.physicsSystem=jigLib.PhysicsSystem.getInstance();
		this.physicsSystem.setGravity(this.physicsGravity);
		var objects=this.getObjects();
		for(var i=0;i<objects.length;i++){
			if(objects[i].physicsObject) this.physicsSystem.addBody(objects[i].physicsObject);
		}
		var that=this;
		this.addEventListener("childAdded",function(data){
			if(data.obj.physicObject) that.physicsSystem.addBody(data.obj.phsysicObject);
		});
		this.addEventListener("childRemoved",function(data){
			if(data.obj.physicObject) that.physicsSystem.removeBody(data.obj.phsysicObject);
		});
	}
	this.physicsSystem.integrate(dt);
}

/**
* Sets the gravity of the physics system
* @param {number} gravity the gravity to apply to the physics system
*/
GLGE.Scene.prototype.setGravity=function(gravity){
	this.physicsGravity=gravity;
	if(this.physicsSystem){
		this.physicsSystem.setGravity(gravity);
	}
	return this;
}
/**
* Gets the gravity of the physics system
* @returns {number}
*/
GLGE.Scene.prototype.setGravity=function(gravity){
	return this.physicsSystem.getGravity(gravity);
}

})(GLGE);