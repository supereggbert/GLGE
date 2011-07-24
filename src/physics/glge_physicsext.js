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


GLGE.Scene.prototype.physicsGravity=[0,0,-9.8,0];

/**
* retrives the phsyics assets from the scene
* @returns {array} the physics assets
*/
GLGE.Scene.prototype.getPhysicsNodes=function(ret){
	if(!ret) ret=[];
	if(this.jigLibObj) ret.push(this);
	if(this.children){
		for(var i=0;i<this.children.length;i++){
			GLGE.Scene.prototype.getPhysicsNodes.call(this.children[i],ret);
		}
	}
	return ret;
}

/**
* Picks within the physics system
* @param {number} x screen x coord
* @param {number} y screen y coord
* @param {object} self optionally don't pick self
* @returns picking result
*/
GLGE.Scene.prototype.physicsPick=function(x,y,self){
	if(!this.physicsSystem) this.physicsTick(0,true); //make sure the physics is set up
	var ray=this.makeRay(x,y);
	if(!ray) return;
	
	var cs=this.physicsSystem.getCollisionSystem();
	var seg=new jigLib.JSegment(ray.origin,GLGE.scaleVec3(ray.coord,-1000));
	var out={};
	if(cs.segmentIntersect(out, seg, self ? self.jigLibObj : null)){
		return {object:out.rigidBody.GLGE,normal:out.normal,distance:out.frac*1000,position:out.position};
	}else{
		return false;
	}
}

/**
* Picks a single objectwithin the physics system
* @param {number} x screen x coord
* @param {number} y screen y coord
* @param {object} self  the object to perform the pick on
* @returns picking result
*/
GLGE.Scene.prototype.physicsPickObject=function(x,y,self){
	if(!this.physicsSystem) this.physicsTick(0,true); //make sure the physics is set up
	var ray=this.makeRay(x,y);
	if(!ray) return;
	
	var cs=self.jigLibObj;
	var seg=new jigLib.JSegment(ray.origin,GLGE.scaleVec3(ray.coord,-1000));
	var out={};
	if(cs.segmentIntersect(out, seg)){
		return {normal:out.normal,distance:out.frac*1000,position:out.position};
	}else{
		return false;
	}
}

/**
* Does and intesection test on a given segment
* @param {array} start starting position of segment
* @param {array} delta the segment delta
* @returns segment test result object {object,normal,distance,position}
*/
GLGE.Scene.prototype.segmentTest=function(start, delta,self){
	if(!this.physicsSystem || !this.physicsSystem._collisionSystem) return false;
	
	var seg=new jigLib.JSegment(start,delta);
	var out={};
	
	if(this.physicsSystem._collisionSystem.segmentIntersect(out,seg, self ? self.jigLibObj : null)){
		var length=Math.sqrt(delta[0]*delta[0]+delta[1]*delta[1]+delta[2]*delta[2]);
		return {object:out.rigidBody.GLGE,normal:out.normal,distance:out.frac*length,position:out.position};
	}
	return false
	
}


/**
* Integrate the phsyics system
* @param {number} dt the delta time to integrate for
*/
GLGE.Scene.prototype.physicsTick=function(dt,noIntegrate){
	var objects=this.getPhysicsNodes();
	if(!this.physicsSystem){
		//create the physics system
		this.physicsSystem=jigLib.PhysicsSystem.getInstance();
		//this.physicsSystem.setCollisionSystem(true,-1000,-1000,-1000,2000,1000,2000,1,1,1);
		this.physicsSystem.setGravity(this.physicsGravity);
		for(var i=0;i<objects.length;i++){
			if(objects[i].jigLibObj) this.physicsSystem.addBody(objects[i].jigLibObj);
		}
		var that=this;
		this.addEventListener("childAdded",function(data){
			if(data.obj.jigLibObj) that.physicsSystem.addBody(data.obj.jigLibObj);
		});
		this.addEventListener("childRemoved",function(data){
			if(data.obj.jigLibObj) that.physicsSystem.removeBody(data.obj.jigLibObj);
		});
	}
	for(var i=0;i<objects.length;i++){
		if(objects[i].jigLibObj) {
			objects[i].preProcess(dt);
		}
	}
	if(!noIntegrate) this.physicsSystem.integrate(dt);
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
GLGE.Scene.prototype.getGravity=function(gravity){
	return this.physicsSystem.getGravity(gravity);
}

GLGE.Group.prototype.addPhysicsPlane=GLGE.Group.prototype.addChild;
GLGE.Group.prototype.addPhysicsBox=GLGE.Group.prototype.addChild;
GLGE.Group.prototype.addPhysicsSphere=GLGE.Group.prototype.addChild;
GLGE.Group.prototype.addPhysicsMesh=GLGE.Group.prototype.addChild;
GLGE.Scene.prototype.addPhysicsPlane=GLGE.Group.prototype.addChild;
GLGE.Scene.prototype.addPhysicsBox=GLGE.Group.prototype.addChild;
GLGE.Scene.prototype.addPhysicsSphere=GLGE.Group.prototype.addChild;
GLGE.Scene.prototype.addPhysicsMesh=GLGE.Group.prototype.addChild;

})(GLGE);