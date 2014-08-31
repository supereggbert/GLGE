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
 * @name glge_light.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){



/**
* @class Creates a new light source to be added to a scene
* @property {Boolean} diffuse Dose this light source effect diffuse shading
* @property {Boolean} specular Dose this light source effect specular shading
* @augments GLGE.Animatable
* @augments GLGE.Placeable
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.Light=function(uid){
  this.color={r:1,g:1,b:1};
  GLGE.Assets.registerAsset(this,uid);
}
GLGE.augment(GLGE.Placeable,GLGE.Light);
GLGE.augment(GLGE.Animatable,GLGE.Light);
GLGE.augment(GLGE.QuickNotation,GLGE.Light);
GLGE.augment(GLGE.JSONLoader,GLGE.Light);
GLGE.Light.prototype.className="Light";

/**
 * @name GLGE.Light#shaderupdate
 * @event fires when a light has changed resulting in need to recompile shaders
 * @param {object} data
 */

/**
* @constant
* @description Enumeration for an point light source
*/
GLGE.L_POINT=1;
/**
* @constant
* @description Enumeration for an directional light source
*/
GLGE.L_DIR=2;
/**
* @constant
* @description Enumeration for an spot light source
*/
GLGE.L_SPOT=3;
/**
* @constant
* @description Enumeration a light that is disabled
*/
GLGE.L_OFF=4;

GLGE.Light.prototype.constantAttenuation=1;
GLGE.Light.prototype.linearAttenuation=0.002;
GLGE.Light.prototype.quadraticAttenuation=0.0008;
GLGE.Light.prototype.spotCosCutOff=0.95;
GLGE.Light.prototype.spotCutOff=true;
GLGE.Light.prototype.spotPMatrix=null;
GLGE.Light.prototype.spotExponent=10;
GLGE.Light.prototype.color=null; 
GLGE.Light.prototype.diffuse=true; 
GLGE.Light.prototype.specular=true; 
GLGE.Light.prototype.type=GLGE.L_POINT;
GLGE.Light.prototype.frameBuffer=null;
GLGE.Light.prototype.renderBuffer=null;
GLGE.Light.prototype.texture=null;
GLGE.Light.prototype.bufferHeight=512;
GLGE.Light.prototype.bufferWidth=512;
GLGE.Light.prototype.shadowBias=0.0005;
GLGE.Light.prototype.varianceMin=0.00000005;
GLGE.Light.prototype.bleedCutoff=0.3;
GLGE.Light.prototype.dirNear=1;
GLGE.Light.prototype.distance=1000;
GLGE.Light.prototype.spotSoftness=0;
GLGE.Light.prototype.spotSoftnessDistance=0.3;
GLGE.Light.prototype.sceneAABB=[-1000,-1000,-1000,1000,1000,1000];


/**
* Sets the scene AABB minimum X value, used in LiSPSM shadows
* @param {number} value the lower X bound of the scene
*/

GLGE.Light.prototype.setSceneMinX=function(value){
	this.sceneAABB[0]=parseFloat(value);
	return this;
}
/**
* Gets the scene AABB minimum X value, used in LiSPSM shadows
* @returns {number} value  the lower X bound of the scene
*/
GLGE.Light.prototype.getSceneMinX=function(){
	return this.sceneAABB[0];
}

/**
* Sets the scene AABB maximum X value, used in LiSPSM shadows
* @param {number} value the upper X bound of the scene
*/
GLGE.Light.prototype.setSceneMaxX=function(value){
	this.sceneAABB[3]=parseFloat(value);
	return this;
}
/**
* Gets the scene AABB maximum X value, used in LiSPSM shadows
* @returns {number} value  the upper X bound of the scene
*/
GLGE.Light.prototype.getSceneMaxX=function(){
	return this.sceneAABB[3];
}


/**
* Sets the scene AABB minimum Y value, used in LiSPSM shadows
* @param {number} value the lower Y bound of the scene
*/
GLGE.Light.prototype.setSceneMinY=function(value){
	this.sceneAABB[1]=parseFloat(value);
	return this;
}
/**
* Gets the scene AABB minimum Y value, used in LiSPSM shadows
* @returns {number} value  the lower Y bound of the scene
*/
GLGE.Light.prototype.getSceneMinY=function(){
	return this.sceneAABB[1];
}

/**
* Sets the scene AABB maximum Y value, used in LiSPSM shadows
* @param {number} value the upper Y bound of the scene
*/
GLGE.Light.prototype.setSceneMaxY=function(value){
	this.sceneAABB[4]=parseFloat(value);
	return this;
}
/**
* Gets the scene AABB maximum Y value, used in LiSPSM shadows
* @returns {number} value  the upper Y bound of the scene
*/
GLGE.Light.prototype.getSceneMaxY=function(){
	return this.sceneAABB[4];
}


/**
* Sets the scene AABB minimum Z value, used in LiSPSM shadows
* @param {number} value the lower Z bound of the scene
*/
GLGE.Light.prototype.setSceneMinZ=function(value){
	this.sceneAABB[2]=parseFloat(value);
	return this;
}
/**
* Gets the scene AABB minimum Z value, used in LiSPSM shadows
* @returns {number} value  the lower Z bound of the scene
*/
GLGE.Light.prototype.getSceneMinZ=function(){
	return this.sceneAABB[2];
}


/**
* Sets the scene AABB maximum Z value, used in LiSPSM shadows
* @param {number} value the upper Z bound of the scene
*/
GLGE.Light.prototype.setSceneMaxY=function(value){
	this.sceneAABB[5]=parseFloat(value);
	return this;
}
/**
* Gets the scene AABB maximum Z value, used in LiSPSM shadows
* @returns {number} value  the upper Z bound of the scene
*/
GLGE.Light.prototype.getSceneMaxZ=function(){
	return this.sceneAABB[5];
}


/**
* Sets shadow near bias how much bias to nearer objects, good range between 0.01 and 100
* @param {number} value the near shadow bias
*/

GLGE.Light.prototype.setNearShadowBias=function(value){
	this.dirNear=value;
	return this;
}
/**
* Gets the near shadow bias
* @returns {number} value the near shadow bias
*/
GLGE.Light.prototype.getNearShadowBias=function(){
	return this.dirNear;
}


/**
* Sets the minium light bleed cutoff on directional shadows
* @param {number} value higher numbers prevent bleed at shadow edges
*/

GLGE.Light.prototype.setBleedCutoff=function(value){
	this.bleedCutoff=value;
	this.fireEvent("shaderupdate",{});
	return this;
}
/**
* Gets the minium light bleed cutoff on directional shadows
* @returns {number} value higher numbers prevent bleed at shadow edges
*/
GLGE.Light.prototype.getBleedCutoff=function(){
	return this.bleedCutoff;
}

/**
* Sets the minimum variance for filtering directional lighting
* @param {number} value small number cut off to prevent precision errors 
*/
GLGE.Light.prototype.setVarianceMin=function(value){
	this.varianceMin=value;
	this.fireEvent("shaderupdate",{});
	return this;
}
/**
* Sets the minimum variance for directional lighting
* @returns {number} value small number cut off to prevent precision errors 
*/
GLGE.Light.prototype.getVarianceMin=function(){
	return this.varianceMin;
}

/**
* Gets the spot lights projection matrix
* @returns the lights spot projection matrix
* @private
*/
GLGE.Light.prototype.getPMatrix=function(cvp,invlight,projectedDistance,distance,camera){
	if(!this.spotPMatrix){
		var far;
		if(this.scene && this.scene.camera) far=this.scene.camera.far;
			else far=1000;
		if(this.type==GLGE.L_SPOT){
			this.spotPMatrix=GLGE.makePerspective(Math.acos(this.spotCosCutOff)/3.14159*360, 1.0, 0.1, far);
		}
	}
	 if(this.type==GLGE.L_DIR){
		var lm=this.getModelMatrix();
		this.spotPMatrix=this.calcDirMatrix(camera,[lm[2],lm[6],lm[10]],this,invlight);
	}

	return this.spotPMatrix;
}


/**
* Caclulates eye direction as direction to center of point cloud
* @private
*/
GLGE.Light.prototype.calcDir=function(points, eyePos) {
	var dir=[0,0,0];
	for(var i = 0; i <points.length; i++) {
		dir=GLGE.addVec3(dir,GLGE.subVec3(points[i],eyePos));
	}
	return GLGE.toUnitVec3(dir);
};

/**
* Finds the aabb for a point cloud
* @private
*/
GLGE.Light.prototype.findBound=function(min, max, v) {
	for(var i = 0; i < 3; i++) {
		if(v[i]<min[i]) {
			min[i] = v[i];
		}else if(v[i] > max[i]) {
			max[i] = v[i];
		}
	}
}
/**
* creates a look at matrix for directional lights
* @private
*/
GLGE.Light.prototype.lightLook=function(pos, dir, up) {
	var lftN=GLGE.toUnitVec3(GLGE.crossVec3(dir,up));

	var upN=GLGE.toUnitVec3(GLGE.crossVec3(lftN,dir));
	var dirN=GLGE.toUnitVec3(dir);
	var m=[];
	m[0] = lftN[0]; m[4] = upN[0]; m[8] = -dirN[0]; m[12] = 0.0;
	m[1] = lftN[1]; m[5] = upN[1]; m[9] = -dirN[1]; m[13] = 0.0;
	m[2] = lftN[2]; m[6] = upN[2]; m[10] = -dirN[2]; m[14] = 0.0;
	m[3] = -GLGE.dotVec3(lftN,pos);
	m[7] = -GLGE.dotVec3(upN,pos);
	m[11] = GLGE.dotVec3(dirN,pos);
	m[15] = 1.0;
	
	return m;
}
/**
* transforms points by matrix mat
* @private
*/
GLGE.Light.prototype.transformPoints=function(points,mat){
	var transformed=[];
	for(var i=0;i<points.length;i++){
		var v=GLGE.mulMat4Vec4(mat,[points[i][0],points[i][1],points[i][2],1]);
		v[0]/=v[3];
		v[1]/=v[3];
		v[2]/=v[3];
		v[3]/=v[3];
		transformed.push(v);
	}
	return transformed;
}
/**
* scales and translates matrix to fit in unit cube
* @private
*/
GLGE.Light.prototype.scaleTranslateToFit=function(vMin, vMax) {
	var m=[];
	m[ 0] = 2/(vMax[0]-vMin[0]);
	m[ 1] = 0;
	m[ 2] = 0;
	m[ 3] = -(vMax[0]+vMin[0])/(vMax[0]-vMin[0]);

	m[ 4] = 0;
	m[ 5] = 2/(vMax[1]-vMin[1]);
	m[ 6] = 0;
	m[ 7] = -(vMax[1]+vMin[1])/(vMax[1]-vMin[1]);

	m[ 8] = 0;
	m[ 9] = 0;
	m[10] = 2/(vMax[2]-vMin[2]);
	m[11] = -(vMax[2]+vMin[2])/(vMax[2]-vMin[2]);

	m[12] = 0;
	m[13] = 0;
	m[14] = 0;
	m[15] = 1;
	return m;
};
/**
* find the aabb
* @private
*/
GLGE.Light.prototype.calcBounds=function(min, max, points) {
	min[0]=points[0][0];
	min[1]=points[0][1];
	min[2]=points[0][2];
	max[0]=points[0][0];
	max[1]=points[0][1];
	max[2]=points[0][2];
	for(var i=1; i<points.length; i++) {
		this.findBound(min,max,points[i]);
	}
}
/**
* add and scales
* @private
*/
GLGE.Light.prototype.linComb=function(pos, dir,  t) {
	return [pos[0]+t*dir[0],
			pos[1]+t*dir[1],
			pos[2]+t*dir[2]];
}
/**
* Gets frustum point edges and planes
* @private
*/
GLGE.Light.prototype.getEdgePlanesFromView=function(view){
	var iv=GLGE.inverseMat4(view);
	var points=[
		[-1,-1,-1,  1], //0
		[-1,-1,1,  1],//1
		[-1,1,-1,  1],//2
		[-1,1,1,  1],//3
		[1,-1,-1,  1],//4
		[1,-1,1,  1],//5
		[1,1,-1,  1],//6
		[1,1,1,  1]//7
	];
	var tPoint=this.transformPoints(points,iv);

	var P1=GLGE.toUnitVec3(GLGE.crossVec3(GLGE.subVec3( tPoint[1], tPoint[0]),GLGE.subVec3( tPoint[2], tPoint[0])));
	P1[3]=GLGE.dotVec3(P1,tPoint[0]);
	
	var P2=GLGE.toUnitVec3(GLGE.crossVec3(GLGE.subVec3( tPoint[6], tPoint[4]),GLGE.subVec3( tPoint[5], tPoint[4])));
	P2[3]=GLGE.dotVec3(P2,tPoint[4]);
	
	var P3=GLGE.toUnitVec3(GLGE.crossVec3(GLGE.subVec3( tPoint[7], tPoint[5]),GLGE.subVec3( tPoint[1], tPoint[5])));
	P3[3]=GLGE.dotVec3(P3,tPoint[5]);
	
	var P4=GLGE.toUnitVec3(GLGE.crossVec3(GLGE.subVec3( tPoint[2], tPoint[0]),GLGE.subVec3( tPoint[4], tPoint[0])));
	P4[3]=GLGE.dotVec3(P4,tPoint[0]);
	
	var P5=GLGE.toUnitVec3(GLGE.crossVec3(GLGE.subVec3( tPoint[3], tPoint[2]),GLGE.subVec3( tPoint[6], tPoint[2])));
	P5[3]=GLGE.dotVec3(P5,tPoint[2]);
	
	var P6=GLGE.toUnitVec3(GLGE.crossVec3(GLGE.subVec3( tPoint[4], tPoint[0]),GLGE.subVec3( tPoint[1], tPoint[0])));
	P6[3]=GLGE.dotVec3(P6,tPoint[0]);
	
	var edges=[
		[tPoint[0],tPoint[4]],
		[tPoint[4],tPoint[6]],
		[tPoint[6],tPoint[2]],
		[tPoint[2],tPoint[0]],
		[tPoint[1],tPoint[5]],
		[tPoint[5],tPoint[7]],
		[tPoint[7],tPoint[3]],
		[tPoint[3],tPoint[1]],
		[tPoint[0],tPoint[1]],
		[tPoint[3],tPoint[2]],
		[tPoint[7],tPoint[6]],
		[tPoint[5],tPoint[4]]
	];
		
	return {edges:edges, planes: [P1,P2,P3,P4,P5,P6], points: tPoint}
};
/**
* Gets aabb point edges and planes
* @private
*/
GLGE.Light.prototype.getEdgePlanesFromAABB=function(minx,miny,minz,maxx,maxy,maxz){	
	var planes=[
		[1,0,0,minx],
		[-1,0,0,-maxx],
		[0,1,0,miny],
		[0,-1,0,-maxy],
		[0,0,1,minz],
		[0,0,-1,-maxz]
	];
	
	var points=[
		[minx,miny,minz],
		[minx,miny,maxz],
		[minx,maxy,minz],
		[minx,maxy,maxz],
		[maxx,miny,minz],
		[maxx,miny,maxz],
		[maxx,maxy,minz],
		[maxx,maxy,maxz]	
	];
	var edges=[
		[points[0],points[4]],
		[points[4],points[6]],
		[points[6],points[2]],
		[points[2],points[0]],
		[points[1],points[5]],
		[points[5],points[7]],
		[points[7],points[3]],
		[points[3],points[1]],
		[points[0],points[1]],
		[points[3],points[2]],
		[points[7],points[6]],
		[points[5],points[4]]
	];
	return {edges:edges, planes:planes, points: points};
}
/**
* calcs point and edge intersects a plane
* @private
*/
GLGE.Light.prototype.planeEdgeIntersect=function(edge,plane){
	var d1=GLGE.dotVec3(edge[0],plane)-plane[3];
	var d2=GLGE.dotVec3(edge[1],plane)-plane[3];
	if((d1>0 && d2>0) || (d1<0 && d2<0)){
		return false;
	}else{
		var D=GLGE.subVec3(edge[1],edge[0]);
		D=GLGE.scaleVec3(D,-d1/(d2-d1));
		return GLGE.addVec3(edge[0],D);
	}
};
/**
* is point contained within planes
* @private
*/
GLGE.Light.prototype.pointInPlanes=function(point,planes){
	var tiny=-0.001;
	for(var i=0;i<planes.length;i++){
		if(GLGE.dotVec3(point,planes[i])-planes[i][3]<tiny) return false;
	}
	return true;
}
/**
* Gets point cloud for directional light
* @private
*/
GLGE.Light.prototype.getViewPoints=function(view){
	var viewPlaneEdges=this.getEdgePlanesFromView(view);
	
	var scenePlaneEdges=this.getEdgePlanesFromAABB(this.sceneAABB[0],this.sceneAABB[1],this.sceneAABB[2],this.sceneAABB[3],this.sceneAABB[4],this.sceneAABB[5]);
	
	var planes1=viewPlaneEdges.planes;
	var planes2=scenePlaneEdges.planes;
	var edges1=viewPlaneEdges.edges;
	var edges2=scenePlaneEdges.edges;
	var points=[];
	var planes=[];	
	
	for(var i=0;i<planes1.length;i++){
		for(var j=0;j<edges2.length;j++){
			var p=this.planeEdgeIntersect(edges2[j],planes1[i]);
			if(p) points.push(p);
		}
		planes.push(planes1[i]);
	}
	
	for(var i=0;i<planes2.length;i++){
		for(var j=0;j<edges1.length;j++){
			var p=this.planeEdgeIntersect(edges1[j],planes2[i]);
			if(p) points.push(p);
		}
		planes.push(planes2[i]);
	}
	
	var enclosedPoints=[];
	for(var i=0;i<points.length;i++){
		if(this.pointInPlanes(points[i],planes)){
			enclosedPoints.push(points[i]);
		}
	}
	
	for(var i=0;i<viewPlaneEdges.points.length;i++){
		if(this.pointInPlanes(viewPlaneEdges.points[i],planes)){
			enclosedPoints.push(viewPlaneEdges.points[i]);
		}
	}
	
	for(var i=0;i<scenePlaneEdges.points.length;i++){
		if(this.pointInPlanes(scenePlaneEdges.points[i],planes)){
			enclosedPoints.push(scenePlaneEdges.points[i]);
		}
	}
	
	return enclosedPoints;
};
/**
* Caclulates the LiSPSM matrix for directional light
* @private
*/
GLGE.Light.prototype.calcDirMatrix=function(camera, lightDir,light, invlight) {
	var vm=camera.matrix;
	var invm=GLGE.inverseMat4(vm);
	var mm=camera.getModelMatrix();
	var pm=camera.getProjectionMatrix();
	var cvp=camera.getViewProjection();
	
	var points=this.getViewPoints(cvp);
	
	//extend into light dir
	var add=GLGE.scaleVec3(lightDir,camera.far);
	var len=points.length;
	for(var i=0;i<len;i++){
		points.push(GLGE.addVec3(add,points[i]));
	}
	
	if(points.length==0) return [1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1];

	var viewDir=[mm[8],mm[9],mm[10]];
	var eyePos=[invm[3],invm[7],invm[11]];

	var min=[], max=[];
	var lispMtx;

	var nearDist=this.dirNear;
	var newDir=this.calcDir(points,eyePos);	
	
	var left=GLGE.crossVec3(lightDir,newDir);
	var up=GLGE.crossVec3(left,lightDir);
	up=GLGE.toUnitVec3(up);
	
	var dotProd = GLGE.dotVec3(newDir,lightDir);

	var sinGamma = Math.sqrt(1.0-dotProd*dotProd);


	var lightView=this.lightLook(eyePos,lightDir,up);

	var tPoints=this.transformPoints(points,lightView);

	this.calcBounds(min,max,tPoints);

	var factor = 1.0/sinGamma;
	var z_n = factor*nearDist; 
	var d = Math.abs(max[1]-min[1]);
	var z_f = z_n + d*sinGamma;
	var n = (z_n+Math.sqrt(z_f*z_n))/sinGamma;
	var f = n+d;
	var pos;

	var pos=this.linComb(eyePos,up,-(n-nearDist));

	lightView=this.lightLook(pos,lightDir,up);

	var lispMtx=GLGE.identMatrix();
	lispMtx[ 5] = (f+n)/(f-n);	
	lispMtx[ 7] = -2*f*n/(f-n);	
	lispMtx[13] = 1;
	lispMtx[15] = 0;

	var lightProj=GLGE.mulMat4(lispMtx,lightView);

	tPoints=this.transformPoints(points,lightProj);

	this.calcBounds(min,max,tPoints);

	lightProj=this.scaleTranslateToFit(min,max);

	lightProj=GLGE.mulMat4(lightProj,lispMtx); 
	lightProj=GLGE.mulMat4(lightProj,GLGE.mulMat4(lightView,GLGE.inverseMat4(invlight)));
	
	return lightProj;	
	
}

/**
* Sets the shadow casting flag
* @param {number} distance
*/
GLGE.Light.prototype.setDistance=function(value){
  this.distance=value;
  this.fireEvent("shaderupdate",{});
  return this;
}
/**
* Gets the shadow casting distance
* @returns {number} distance
*/
GLGE.Light.prototype.getDistance=function(){
  return this.distance;
}

/**
* Sets negative shadow flag
* @param {boolean} negative shadow
*/
GLGE.Light.prototype.setNegativeShadow=function(value){
  this.negativeShadow=value;
  this.fireEvent("shaderupdate",{});
  return this;
}
/**
* Gets negative shadow flag
* @param {boolean} negative shadow
*/
GLGE.Light.prototype.getNegative=function(){
  return this.negativeShadow;
}

/**
* Sets the shadow casting flag
* @param {number} value should cast shadows?
*/
GLGE.Light.prototype.setCastShadows=function(value){
  this.castShadows=value;
  this.fireEvent("shaderupdate",{});
  return this;
}
/**
* Gets the shadow casting flag
* @returns {number} true if casts shadows
*/
GLGE.Light.prototype.getCastShadows=function(){
  return this.castShadows;
  return this;
}
/**
* Sets the shadow bias
* @param {number} value The shadow bias
*/
GLGE.Light.prototype.setShadowBias=function(value){
  this.shadowBias=value;
  return this;
}
/**
* Gets the shadow bias
* @returns {number} The shadow buffer bias
*/
GLGE.Light.prototype.getShadowBias=function(){
  return this.shadowBias;
}

/**
* Sets the shadow buffer width
* @param {number} value The shadow buffer width
*/
GLGE.Light.prototype.setBufferWidth=function(value){
  this.bufferWidth=value;
  return this;
}
/**
* Gets the shadow buffer width
* @returns {number} The shadow buffer width
*/
GLGE.Light.prototype.getBufferHeight=function(){
  return this.bufferHeight;
}
/**
* Sets the shadow buffer width
* @param {number} value The shadow buffer width
*/
GLGE.Light.prototype.setBufferHeight=function(value){
  this.bufferHeight=value;
  return this;
}
/**
* Gets the shadow buffer width
* @returns {number} The shadow buffer width
*/
GLGE.Light.prototype.getBufferWidth=function(){
  return this.bufferWidth;
}
/**
* Sets the spot light cut off
* @param {number} value The cos of the angle to limit
*/
GLGE.Light.prototype.setSpotCosCutOff=function(value){
  this.spotPMatrix=null;
  this.spotCosCutOff=value;
  return this;
}
/**
* Gets the spot light cut off
* @returns {number} The cos of the limiting angle
*/
GLGE.Light.prototype.getSpotCosCutOff=function(){
  return this.spotCosCutOff;
}

/**
* Sets the spot light cut off true results in circle spot light otherwise square
* @param {number} value The spot cutoff flag
*/
GLGE.Light.prototype.setSpotCutOff=function(value){
  this.spotCutOff=value;
  this.fireEvent("shaderupdate",{});
  return this;
}
/**
* Gets the spot light cut off flag
* @returns {number} The spot cutoff flag
*/
GLGE.Light.prototype.getSpotCutOff=function(){
  return this.spotCutOff;
}

/**
* Sets the spot light exponent
* @param {number} value The spot lights exponent
*/
GLGE.Light.prototype.setSpotExponent=function(value){
  this.spotExponent=value;
  return this;
}
/**
* Gets the spot light exponent
* @returns {number} The exponent of the spot light
*/
GLGE.Light.prototype.getSpotExponent=function(){
  return this.spotExponent;
}
/**
* Sets the light sources Attenuation
* @returns {Object} The components of the light sources attenuation
*/
GLGE.Light.prototype.getAttenuation=function(constant,linear,quadratic){
  var attenuation={};
  attenuation.constant=this.constantAttenuation;
  attenuation.linear=this.linearAttenuation;
  attenuation.quadratic=this.quadraticAttenuation;
  return attenuation;
}
/**
* Sets the light sources Attenuation
* @param {Number} constant The constant part of the attenuation
* @param {Number} linear The linear part of the attenuation
* @param {Number} quadratic The quadratic part of the attenuation
*/
GLGE.Light.prototype.setAttenuation=function(constant,linear,quadratic){
  this.constantAttenuation=constant;
  this.linearAttenuation=linear;
  this.quadraticAttenuation=quadratic;
  return this;
}
/**
* Sets the light sources constant attenuation
* @param {Number} value The constant part of the attenuation
*/
GLGE.Light.prototype.setAttenuationConstant=function(value){
  this.constantAttenuation=value;
  return this;
}
/**
* Sets the light sources linear attenuation
* @param {Number} value The linear part of the attenuation
*/
GLGE.Light.prototype.setAttenuationLinear=function(value){
  this.linearAttenuation=value;
  return this;
}
/**
* Sets the light sources quadratic attenuation
* @param {Number} value The quadratic part of the attenuation
*/
GLGE.Light.prototype.setAttenuationQuadratic=function(value){
  this.quadraticAttenuation=value;
  return this;
}

/**
* Sets the color of the light source
* @param {string} color The color of the light
*/
GLGE.Light.prototype.setColor=function(color){
  color=GLGE.colorParse(color);
  this.color={r:color.r,g:color.g,b:color.b};
  return this;
}
/**
* Sets the red color of the light source
* @param {Number} value The new red level 0-1
*/
GLGE.Light.prototype.setColorR=function(value){
  this.color.r=value;
  return this;
}
/**
* Sets the green color of the light source
* @param {Number} value The new green level 0-1
*/
GLGE.Light.prototype.setColorG=function(value){
  this.color.g=value;
  return this;
}
/**
* Sets the blue color of the light source
* @param {Number} value The new blue level 0-1
*/
GLGE.Light.prototype.setColorB=function(value){
  this.color.b=value;
  return this;
}
/**
* Gets the current color of the light source
* @return {[r,g,b]} The current position
*/
GLGE.Light.prototype.getColor=function(){
  return this.color;
}
/**
* Gets the red color of the light source
* @param {Number} value The new red level 0-1
*/
GLGE.Light.prototype.getColorR=function(value){
  return this.color.r;
}
/**
* Gets the green color of the light source
* @param {Number} value The new green level 0-1
*/
GLGE.Light.prototype.getColorG=function(value){
  return this.color.g;
}
/**
* Gets the blue color of the light source
* @param {Number} value The new blue level 0-1
*/
GLGE.Light.prototype.getColorB=function(value){
  return this.color.b;
}
/**
* Gets the type of the light
* @return {Number} The type of the light source eg GLGE.L_POINT
*/
GLGE.Light.prototype.getType=function(){
  return this.type;
}
/**
* Sets the type of the light
* @param {Number} type The type of the light source eg GLGE.L_POINT
*/
GLGE.Light.prototype.setType=function(type){
  this.type=type;
  this.fireEvent("shaderupdate",{});
  return this;
}

/**
* Gets the softness of the spot shadow
* @return {Number} The type of the light source eg GLGE.L_POINT
*/
GLGE.Light.prototype.getSpotSoftness=function(){
  return this.spotSoftness;
}
/**
* Sets the softness of the spot shadow
* @param {Number} spotSoftness The type of the light source eg GLGE.L_POINT
*/
GLGE.Light.prototype.setSpotSoftness=function(spotSoftness){
  this.spotSoftness=+spotSoftness;
  if(this.gl) this.createSoftPrograms(this.gl);
  this.fireEvent("shaderupdate",{});
  return this;
}

/**
* Gets the spotlights blur distance in pixels
* @return {Number} The blur distance for spot lights
*/
GLGE.Light.prototype.getSpotSoftDistance=function(){
  return this.spotSoftnessDistance;
}
/**
* Sets the spotlights variance cutoff used to reduce light bleed
* @param {Number} spotSoftnessDistance the spotlights variance cutoff
*/
GLGE.Light.prototype.setSpotSoftDistance=function(spotSoftnessDistance){
  this.spotSoftnessDistance=+spotSoftnessDistance;
  this.fireEvent("shaderupdate",{});
  return this;
}


GLGE.Light.prototype.enableLight=function(){
    if (this.type == GLGE.L_OFF && this.old_type !== undefined) {
        this.setType(this.old_type);
        delete this.old_type;
    }
};

GLGE.Light.prototype.disableLight=function(){
    if (this.type != GLGE.L_OFF) {
        this.old_type=this.type;
        this.setType(GLGE.L_OFF);
    }
};

/**
* init for the rendering
* @private
*/
GLGE.Light.prototype.GLInit=function(gl){
  this.gl=gl;
  if((this.type==GLGE.L_SPOT || this.type==GLGE.L_DIR) && !this.texture){
    this.createSpotBuffer(gl);
    this.createSoftBuffer(gl);
    this.createSoftPrograms(gl);
  }
}
/**
* Sets up the WebGL needed to render the depth map for this light source. Only used for spot lights which produce shadows
* @private
*/
GLGE.Light.prototype.createSpotBuffer=function(gl){
    this.frameBuffer = gl.createFramebuffer();
    this.renderBuffer = gl.createRenderbuffer();
    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);

    try {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.bufferWidth, this.bufferHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    } catch (e) {
        GLGE.error("incompatible texture creation method");
        var width=parseFloat(this.bufferWidth);
        var height=parseFloat(this.bufferHeight);
        var tex = new Uint8Array(width * height * 4);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, tex);
    }

    gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.bufferWidth, this.bufferHeight);

    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderBuffer);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, null);
}

/**
* Sets up the buffers needed for the gaussian blured shadow buffer
* @private
*/
GLGE.Light.prototype.createSoftBuffer=function(gl){
    this.frameBufferSf = gl.createFramebuffer();
    this.renderBufferSf = gl.createRenderbuffer();
    this.textureSf = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.textureSf);

    try {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.bufferWidth, this.bufferHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    } catch (e) {
        GLGE.error("incompatible texture creation method");
        var width=parseFloat(this.bufferWidth);
        var height=parseFloat(this.bufferHeight);
        var tex = new Uint8Array(width * height * 4);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, tex);
    }

    gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBufferSf);
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderBufferSf);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, this.bufferWidth, this.bufferHeight);

    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.textureSf, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderBufferSf);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, null);

    //create the vertex positions
  if(!this.posBuffer) this.posBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1,1,0,-1,1,0,-1,-1,0,1,-1,0]), gl.STATIC_DRAW);
  this.posBuffer.itemSize = 3;
  this.posBuffer.numItems = 4;
  //create the vertex uv coords
  if(!this.uvBuffer) this.uvBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1,1,0,1,0,0,1,0]), gl.STATIC_DRAW);
  this.uvBuffer.itemSize = 2;
  this.uvBuffer.numItems = 4;
  //create the faces
  if(!this.GLfaces) this.GLfaces = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.GLfaces);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0,1,2,2,3,0]), gl.STATIC_DRAW);
  this.GLfaces.itemSize = 1;
  this.GLfaces.numItems = 6;
}

/**
* Sets up the programs require to do the soft shadows
* @private
*/
GLGE.Light.prototype.createSoftPrograms=function(gl){
  if(this.GLShaderProgram) gl.deleteProgram(this.GLShaderProgram);

  var vertexStr="";
  vertexStr+="attribute vec3 position;\n";
  vertexStr+="attribute vec2 uvcoord;\n";
  vertexStr+="varying vec2 texCoord;\n";
  vertexStr+="void main(void){\n";
  vertexStr+="texCoord=uvcoord;\n";
  vertexStr+="gl_Position = vec4(position,1.0);\n";
  vertexStr+="}\n";

  var SAMPLES=this.spotSoftness;
  var fragStr="precision highp float;\n";
  fragStr=fragStr+"uniform sampler2D TEXTURE;\n";
  fragStr=fragStr+"varying vec2 texCoord;\n";
  fragStr=fragStr+"uniform bool xpass;\n";
  fragStr=fragStr+"float blurSize = "+(1/this.bufferWidth).toFixed(10)+";\n";
  fragStr=fragStr+"float unpack(sampler2D TEX, vec2 co){;";
  fragStr=fragStr+"float value = dot(texture2D(TEX, co), vec4(0.000000059604644775390625,0.0000152587890625,0.00390625,1.0));";
  fragStr=fragStr+"return value;";
  fragStr=fragStr+"}";
  fragStr=fragStr+"vec2 unpack2(sampler2D TEX, vec2 co){;";
  fragStr=fragStr+"vec4 color = texture2D(TEX, co);";
  fragStr=fragStr+"float value1 = dot(color.rg, vec2(0.00390625,1.0));";
  fragStr=fragStr+"float value2 = dot(color.ba, vec2(0.00390625,1.0));";
  fragStr=fragStr+"return vec2(value1,value2);";
  fragStr=fragStr+"}";
  fragStr=fragStr+"vec4 pack(float value){;";
  fragStr=fragStr+"vec4 rgba=fract(value * vec4(16777216.0, 65536.0, 256.0, 1.0));\n";
  fragStr=fragStr+"return rgba-rgba.rrgb*vec4(0.0,0.00390625,0.00390625,0.00390625);";
  fragStr=fragStr+"}";
  fragStr=fragStr+"vec2 pack2(float value){;";
  fragStr=fragStr+"vec2 rg=fract(value * vec2(256.0, 1.0));\n";
  fragStr=fragStr+"return rg-rg.rr*vec2(0.0,0.00390625);";
  fragStr=fragStr+"}";
  fragStr=fragStr+"void main(void){\n";
  fragStr=fragStr+"float value = 0.0;";
  fragStr=fragStr+"vec2 value2;";
  fragStr=fragStr+"float mean = 0.0;";
  fragStr=fragStr+"float mean2 = 0.0;";
  fragStr=fragStr+"float color = 0.0;";
  fragStr=fragStr+"if(xpass){";
  for(var i=-SAMPLES;i<SAMPLES;i++){
    fragStr=fragStr+"value = unpack(TEXTURE, vec2(texCoord.x - "+(i+0.5).toFixed(1)+"*blurSize, texCoord.y));";
    fragStr=fragStr+"mean += value;";
    fragStr=fragStr+"mean2 += value*value;";
  }
  fragStr=fragStr+"gl_FragColor = vec4(pack2(pow(mean2/"+(SAMPLES*2).toFixed(2)+",0.5)),pack2(mean/"+(SAMPLES*2).toFixed(2)+"));\n";
  fragStr=fragStr+"}else{";
  for(var i=-SAMPLES;i<SAMPLES;i++){
    fragStr=fragStr+"value2 = unpack2(TEXTURE, vec2(texCoord.x, texCoord.y - "+(i+0.5).toFixed(1)+"*blurSize));";
    fragStr=fragStr+"mean += value2.g;";
    fragStr=fragStr+"mean2 += pow(value2.r,2.0);";
  }
  fragStr=fragStr+"gl_FragColor = vec4(pack2(pow(mean2/"+(SAMPLES*2).toFixed(2)+",0.5)),pack2(mean/"+(SAMPLES*2).toFixed(2)+"));\n";
  fragStr=fragStr+"}";

  fragStr=fragStr+"}\n";

  this.GLFragmentShader=gl.createShader(gl.FRAGMENT_SHADER);
  this.GLVertexShader=gl.createShader(gl.VERTEX_SHADER);

  gl.shaderSource(this.GLFragmentShader, fragStr);
  gl.compileShader(this.GLFragmentShader);
  if (!gl.getShaderParameter(this.GLFragmentShader, gl.COMPILE_STATUS)) {
        GLGE.error(gl.getShaderInfoLog(this.GLFragmentShader));
        return;
  }

  gl.shaderSource(this.GLVertexShader, vertexStr);
  gl.compileShader(this.GLVertexShader);
  if (!gl.getShaderParameter(this.GLVertexShader, gl.COMPILE_STATUS)) {
    GLGE.error(gl.getShaderInfoLog(this.GLVertexShader));
    return;
  }

  this.GLShaderProgram = gl.createProgram();
  gl.attachShader(this.GLShaderProgram, this.GLVertexShader);
  gl.attachShader(this.GLShaderProgram, this.GLFragmentShader);
  gl.linkProgram(this.GLShaderProgram);
}

/**
* Renders the blured shadow
* @private
*/
GLGE.Light.prototype.GLRenderSoft=function(gl){
  if(this.spotSoftness==0) return;

  if(!this.gl){
    this.GLInit(gl);
  }

  gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBufferSf);

  if(gl.program!=this.GLShaderProgram){
    gl.useProgram(this.GLShaderProgram);
    gl.program=this.GLShaderProgram;
  }
  var attribslot;
  for(var i=0; i<8; i++) gl.disableVertexAttribArray(i);
  attribslot=GLGE.getAttribLocation(gl,this.GLShaderProgram, "position");

  gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuffer);
  gl.enableVertexAttribArray(attribslot);
  gl.vertexAttribPointer(attribslot, this.posBuffer.itemSize, gl.FLOAT, false, 0, 0);

  attribslot=GLGE.getAttribLocation(gl,this.GLShaderProgram, "uvcoord");
  gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
  gl.enableVertexAttribArray(attribslot);
  gl.vertexAttribPointer(attribslot, this.uvBuffer.itemSize, gl.FLOAT, false, 0, 0);

  gl.activeTexture(gl["TEXTURE0"]);
  gl.bindTexture(gl.TEXTURE_2D, this.texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  GLGE.setUniform(gl,"1i",GLGE.getUniformLocation(gl,this.GLShaderProgram, "TEXTURE"),0);
  GLGE.setUniform(gl,"1i",GLGE.getUniformLocation(gl,this.GLShaderProgram, "xpass"),1);

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.GLfaces);

  gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
  gl.drawElements(gl.TRIANGLES, this.GLfaces.numItems, gl.UNSIGNED_SHORT, 0);

  //gl.disable(gl.BLEND);
  gl.activeTexture(gl["TEXTURE0"]);
  gl.bindTexture(gl.TEXTURE_2D, this.textureSf);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  GLGE.setUniform(gl,"1i",GLGE.getUniformLocation(gl,this.GLShaderProgram, "TEXTURE"),0);
  GLGE.setUniform(gl,"1i",GLGE.getUniformLocation(gl,this.GLShaderProgram, "xpass"),0);

  gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
  gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.GLfaces);
  gl.drawElements(gl.TRIANGLES, this.GLfaces.numItems, gl.UNSIGNED_SHORT, 0);


  gl.bindTexture(gl.TEXTURE_2D, null);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);
}


})(GLGE);
