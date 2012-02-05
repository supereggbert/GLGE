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
 * @name glge_scene.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){




/**
* @constant 
* @description Enumeration for no fog
*/
GLGE.FOG_NONE=1;
/**
* @constant 
* @description Enumeration for linear fall off fog
*/
GLGE.FOG_LINEAR=2;
/**
* @constant 
* @description Enumeration for exponential fall off fog
*/
GLGE.FOG_QUADRATIC=3;

/**
* @constant 
* @description Enumeration for linear fall off fog fading to sky
*/
GLGE.FOG_SKYLINEAR=4;
/**
* @constant 
* @description Enumeration for exponential fall off fog fading to sky
*/
GLGE.FOG_SKYQUADRATIC=5;

/**
* @class Scene class containing the camera, lights and objects
* @augments GLGE.Group
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.Scene=function(uid){
    GLGE.Group.call(this);
	this.children=[];
	this.camera=new GLGE.Camera();
	this.backgroundColor={r:1,g:1,b:1,a:1};
	this.ambientColor={r:0,g:0,b:0};
	this.fogColor={r:0.5,g:0.5,b:0.5};
	this.passes=[];
	GLGE.Assets.registerAsset(this,uid);
}
GLGE.augment(GLGE.Group,GLGE.Scene);
GLGE.Scene.prototype.camera=null;
GLGE.Scene.prototype.className="Scene";
GLGE.Scene.prototype.renderer=null;
GLGE.Scene.prototype.backgroundColor=null;
GLGE.Scene.prototype.filter=null;
GLGE.Scene.prototype.fogColor=null;
GLGE.Scene.prototype.ambientColor=null;
GLGE.Scene.prototype.fogNear=10;
GLGE.Scene.prototype.fogFar=80;
GLGE.Scene.prototype.fogType=GLGE.FOG_NONE;
GLGE.Scene.prototype.passes=null;
GLGE.Scene.prototype.transbuffer=null;
GLGE.Scene.prototype.culling=true;


/**
* Gets the fog falloff type
* @returns {number} the far falloff type
*/
GLGE.Scene.prototype.getFogType=function(){	
	return this.fogType;
}
/**
* Sets the scenes fog falloff type
* @param {number} type The fog falloff type FOG_NONE,FOG_LINEAR,FOG_QUADRATIC
*/
GLGE.Scene.prototype.setFogType=function(type){	
	this.fogType=type;
	return this;
}

/**
* Gets the far fog distance
* @returns {number} the far distance of the fog
*/
GLGE.Scene.prototype.getFogFar=function(){	
	return this.fogFar;
}
/**
* Sets the scenes fog far distance
* @param {number} dist The fog far distance
*/
GLGE.Scene.prototype.setFogFar=function(dist){	
	this.fogFar=dist;
	return this;
}

/**
* Gets the near fog distance
* @returns {number} the near distance of the fog
*/
GLGE.Scene.prototype.getFogNear=function(){	
	return this.fogNear;
}
/**
* Sets the scenes fog near distance
* @param {number} dist The fog near distance
*/
GLGE.Scene.prototype.setFogNear=function(dist){	
	this.fogNear=dist;
	return this;
}

/**
* Gets the fog color
* @returns {object} An assoiative array r,g,b
*/
GLGE.Scene.prototype.getFogColor=function(){	
	return this.fogColor;
}
/**
* Sets the scenes fog color
* @param {string} color The fog color
*/
GLGE.Scene.prototype.setFogColor=function(color){	
	color=GLGE.colorParse(color);
	this.fogColor={r:color.r,g:color.g,b:color.b};
	return this;
}

/**
* Gets the scenes background color
* @returns {object} An assoiative array r,g,b
*/
GLGE.Scene.prototype.getBackgroundColor=function(){	
	return this.backgroundColor;
}
/**
* Sets the scenes background color
* @param {string} color The backgorund color
*/
GLGE.Scene.prototype.setBackgroundColor=function(color){	
	color=GLGE.colorParse(color);
	this.backgroundColor={r:color.r,g:color.g,b:color.b,a:color.a};
	return this;
}
/**
* Gets the scenes ambient light
* @returns {object} An assoiative array r,g,b
*/
GLGE.Scene.prototype.getAmbientColor=function(){	
	return this.ambientColor;
}

/**
* Sets the scenes ambient light
* @param {string} color The ambient light color
*/
GLGE.Scene.prototype.setAmbientColor=function(color){	
	color=GLGE.colorParse(color);
	this.ambientColor={r:color.r,g:color.g,b:color.b};
	if(this.renderer){
		this.renderer.gl.clearColor(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, 1.0);
	}
	return this;
}
/**
* Sets the scenes ambient light
* @param {number} value the red componenent of the ambient light 0-1
*/
GLGE.Scene.prototype.setAmbientColorR=function(value){	
	this.ambientColor.r=value;
	return this;
}
/**
* Sets the scenes ambient light
* @param {number} value the green componenent of the ambient light 0-1
*/
GLGE.Scene.prototype.setAmbientColorG=function(value){	
	this.ambientColor.g=value;
	return this;
}
/**
* Sets the scenes ambient light
* @param {number} value the blue componenent of the ambient light 0-1
*/
GLGE.Scene.prototype.setAmbientColorB=function(value){	
	this.ambientColor.b=value;
	return this;
}

/**
* Sets the active camera for this scene
* @property {GLGE.Camera} object The object to be added
*/
GLGE.Scene.prototype.setCamera=function(camera){	
	if(typeof camera=="string")  camera=GLGE.Assets.get(camera);
	this.camera=camera;
	return this;
}
/**
* Gets the scenes active camera
* @returns {GLGE.Camera} The current camera
*/
GLGE.Scene.prototype.getCamera=function(){	
	return this.camera;
}


/**
* Sets the Culling Flag
*/
GLGE.Scene.prototype.setCull=function(cull){	
	this.culling=cull;
	return this;
}
/**
* Gets the Culling Flag
*/
GLGE.Scene.prototype.getCull=function(){	
	return this.culling;
}

/**
* used to initialize all the WebGL buffers etc need for this scene
* @private
*/
GLGE.Scene.prototype.GLInit=function(gl){
	this.gl=gl;
	gl.lights=this.getLights();
	//sets the camera aspect to same aspect as the canvas
	this.camera.setAspect(this.renderer.canvas.width/this.renderer.canvas.height);

	//this.createPickBuffer(gl);
	this.renderer.gl.clearColor(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, 1.0);
	
	for(var i=0;i<this.children;i++){
		if(this.children[i].GLInit) children[i].GLInit(gl);
	}
}
/**
* used to clean up all the WebGL buffers etc need for this scene
* @private
*/
GLGE.Scene.prototype.GLDestroy=function(gl){
}
/**
* sort function
*/
GLGE.Scene.sortFunc=function(a,b){
	return a.zdepth-b.zdepth;
}

/**
* z sorts the objects
* @private
*/
GLGE.Scene.prototype.zSort=function(gl,objects){
	var cameraMatrix=gl.scene.camera.getViewMatrix();
	var transMatrix;
	for(var i=0;i<objects.length;i++){
		if(objects[i].object.getBoundingVolume){
			var center=objects[i].object.getBoundingVolume().getCenter();
		}else{
			var matrix=objects[i].object.getModelMatrix();
			var center=[matrix[3],matrix[7],matrix[11]];
		}
		objects[i].zdepth=center[0]*cameraMatrix[8]+center[1]*cameraMatrix[9]+center[2]*cameraMatrix[10]+cameraMatrix[11];
		if(objects[i].object.zDepth) {objects[i].zdepth=objects[i].object.zDepth;}
	}
	objects.sort(GLGE.Scene.sortFunc);
	return objects;
}
/**
* sets the 2d filter to apply
* @param {GLGE.Filter2d} filter the filter to apply when rendering the scene
*/
GLGE.Scene.prototype.setFilter2d=function(value){
	this.filter=value;
	return this;
}
/**
* gets the 2d filter being applied apply
* @returns {GLGE.Filter2d}
*/
GLGE.Scene.prototype.getFilter2d=function(filter){
	return this.filter;
}

/**
* sets the sky filter to apply
* @param {GLGE.Filter2d} filter tthe filter used to render the sky
*/
GLGE.Scene.prototype.setSkyFilter=function(value){
	this.skyfilter=value;
	return this;
}
/**
* gets the sky filter
* @returns {GLGE.Filter2d}
*/
GLGE.Scene.prototype.getSkyFilter=function(filter){
	return this.skyfilter;
}
/**
* gets the scenes frame buffer
* @private
*/
GLGE.Scene.prototype.getFrameBuffer=function(gl){
	if(this.filter) return this.filter.getFrameBuffer(gl);
	return null;
}
/**
* culls objects from the scene
* @private
*/
GLGE.Scene.prototype.objectsInViewFrustum=function(renderObjects,cvp){
	var obj;
	var returnObjects=[];
	var planes=GLGE.cameraViewProjectionToPlanes(cvp);
	for(var i=0;i<renderObjects.length;i++){
		obj=renderObjects[i];
		if(obj.getBoundingVolume && obj.cull){
			var boundingVolume=obj.getBoundingVolume();
			var center=boundingVolume.getCenter();
			var radius=boundingVolume.getSphereRadius();
			if(GLGE.sphereInFrustumPlanes([center[0],center[1],center[2],radius],planes)){
				var points=boundingVolume.getCornerPoints();
				if(GLGE.pointsInFrustumPlanes(points,planes)){
					returnObjects.push(obj);
					if(obj.culled) obj.fireEvent("willRender",{});
					obj.culled=false;
				}else{
					if(!obj.culled) obj.fireEvent("willCull",{});
					obj.culled=true;
				}
			}else{
				if(!obj.culled) obj.fireEvent("willCull",{});
				obj.culled=true;
			}
		}else{
			returnObjects.push(obj);
		}
	}
	return returnObjects;	
}
/**
* Extracts all of the scene elements that need rendering
* @private
*/
GLGE.Scene.prototype.unfoldRenderObject=function(renderObjects){
	var returnObjects=[];
	for(var i=0;i<renderObjects.length;i++){
		var renderObject=renderObjects[i];
		if(renderObject.getMultiMaterials){
			var multiMaterials=renderObject.getMultiMaterials();
			for(var j=0;j<multiMaterials.length;j++){
				var mat=multiMaterials[j].getMaterial();
				var mesh=multiMaterials[j].getMesh();
				if(!mat.meshIdx) mat.matIdx=j;
				if(!mat.meshIdx) mat.meshIdx=j;
				returnObjects.push({object:renderObject, multiMaterial:j});
			}
		}else{
			returnObjects.push({object:renderObject, multiMaterial:0});
		}
	}
	return returnObjects;
}

/**
* State sorting function
* @private
*/
GLGE.Scene.prototype.stateSort=function(a,b){
	if(!a.object.GLShaderProgram) return 1;
	if(!b.object.GLShaderProgram) return -1;
	var aidx=a.object.GLShaderProgram.progIdx;
	var bidx=b.object.GLShaderProgram.progIdx;
	if(aidx>bidx){
		return 1;
	}else if(aidx<bidx){
		return -1;
	}else{
		if(!a.object.multimaterials || !b.object.multimaterials) return -1;
		var aidx=a.object.multimaterials[a.multiMaterial].getMaterial().matIdx;
		var bidx=b.object.multimaterials[b.multiMaterial].getMaterial().matIdx;
		if(aidx>bidx){
			return 1;
		}else if(aidx<bidx){
			return -1;
		}else{
			var amesh=a.object.multimaterials[a.multiMaterial].getMesh();
			var bmesh=a.object.multimaterials[a.multiMaterial].getMesh();
			if(!amesh) return -1;
			if(!bmesh) return 1;
			var aidx=amesh.meshIdx;
			var bidx=bmesh.meshIdx;
			if(aidx>bidx){
				return 1;
			}else if(aidx<bidx){
				return -1;
			}else{
				return 0;
			}
		}
	}
}

/**
* Sets up the WebGL needed to render the sky for use in sky fog
* @private
*/
GLGE.Scene.prototype.createSkyBuffer=function(gl){
    this.skyTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.skyTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, this.renderer.canvas.width,this.renderer.canvas.height, 0, gl.RGB, gl.UNSIGNED_BYTE, null);
}


/**
* renders the scene
* @private
*/
GLGE.Scene.prototype.render=function(gl){
	this.animate();
	//if look at is set then look
	if(this.camera.lookAt) this.camera.Lookat(this.camera.lookAt);	

	gl.lights=this.getLights();
	
	var lights=gl.lights;
	gl.scene=this;
	this.lastMaterial=null;
	
	gl.disable(gl.BLEND);
	
	this.framebuffer=this.getFrameBuffer(gl);
	

	var renderObjects=this.getObjects();
	var cvp=this.camera.getViewProjection();
	
	if(this.culling){
		var cvp=this.camera.getViewProjection();
		renderObjects=this.objectsInViewFrustum(renderObjects,cvp);
	}
	renderObjects=this.unfoldRenderObject(renderObjects);
	renderObjects=renderObjects.sort(this.stateSort);

	
	//shadow stuff
	for(var i=0; i<lights.length;i++){
		if(lights[i].castShadows){
			if(!lights[i].gl) lights[i].GLInit(gl);
			var cameraMatrix=this.camera.matrix;
			var cameraPMatrix=this.camera.getProjectionMatrix();
			var projectedDistance=0;
			if(lights[i].getType()==GLGE.L_DIR){
				var mat=lights[i].getModelMatrix();
				var cmat=GLGE.inverseMat4(cameraMatrix);
				mat[3]=(mat[2])*lights[i].distance/2+cmat[3];
				mat[7]=(mat[6])*lights[i].distance/2+cmat[7];
				mat[11]=(mat[10])*lights[i].distance/2+cmat[11];
				lights[i].matrix=mat;
				var tvec=GLGE.mulMat4Vec4(cameraPMatrix,[0,0,lights[i].distance,1]);
				projectedDistance=tvec[3]/tvec[2]; //this is wrong?
			}
			
				gl.bindFramebuffer(gl.FRAMEBUFFER, lights[i].frameBuffer);

				if(!lights[i].s_cache) lights[i].s_cache={};
				lights[i].s_cache.imvmatrix=GLGE.inverseMat4(lights[i].getModelMatrix());
				lights[i].s_cache.mvmatrix=lights[i].getModelMatrix();
				lights[i].s_cache.pmatrix=lights[i].getPMatrix(cvp,lights[i].s_cache.imvmatrix,projectedDistance,this.camera.far/2);
				lights[i].s_cache.smatrix=GLGE.mulMat4(lights[i].s_cache.pmatrix,lights[i].s_cache.imvmatrix);
				lights[i].shadowRendered=false;
				
				if(lights[i].getType()==GLGE.L_DIR){
					var levels=lights[i].getCascadeLevels();
				}else{
					levels=1;
				}
				
				
				gl.viewport(0,0,parseFloat(lights[i].bufferWidth),parseFloat(lights[i].bufferHeight));
				gl.clearDepth(1.0);
				gl.clearColor(1, 1, 1, 1);
				gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
					
				var height=(parseFloat(lights[i].bufferHeight)/levels)|0;
				var width=parseFloat(lights[i].bufferWidth);
				

				for(var l=0;l<levels;l++){
					gl.viewport(0,l*height,width,height);						

					this.camera.setProjectionMatrix(lights[i].s_cache.pmatrix);
					this.camera.matrix=lights[i].s_cache.imvmatrix;
					//draw shadows
					for(var n=0; n<renderObjects.length;n++){
						if(renderObjects[n].object.getCastShadows && !renderObjects[n].object.getCastShadows()) continue;
						if(renderObjects[n].object.className=="ParticleSystem") {continue;}
						if(lights[i].getType()==GLGE.L_SPOT){
							renderObjects[n].object.GLRender(gl, GLGE.RENDER_SHADOW,n,renderObjects[n].multiMaterial,lights[i].distance);
						}else{
							renderObjects[n].object.GLRender(gl, GLGE.RENDER_DEPTH,n,renderObjects[n].multiMaterial,lights[i].distance);
						}
					}
					lights[i].s_cache.pmatrix[0]*=2;
					lights[i].s_cache.pmatrix[5]*=2;
				}
				lights[i].s_cache.pmatrix[0]/=2;
				lights[i].s_cache.pmatrix[5]/=2;
				
				lights[i].s_cache.smatrix=GLGE.mulMat4(lights[i].s_cache.pmatrix,lights[i].s_cache.imvmatrix);
			
				lights[i].GLRenderSoft(gl);
						
			this.camera.matrix=null;
			this.camera.setProjectionMatrix(cameraPMatrix);
		}
	}
	
	if(this.culling){
		var cvp=this.camera.getViewProjection();
		renderObjects=this.objectsInViewFrustum(renderObjects,cvp);
	}
	
	gl.bindFramebuffer(gl.FRAMEBUFFER, this.framebuffer);

	
	if(this.camera.animation) this.camera.animate();
	
	//null render pass to findout what else needs rendering
	this.getPasses(gl,renderObjects);	
	
	//first off render the passes
	var cameraMatrix=this.camera.matrix;
	var cameraPMatrix=this.camera.getProjectionMatrix();
	this.allowPasses=false;
	while(this.passes.length>0){
		var pass=this.passes.pop();
		gl.bindFramebuffer(gl.FRAMEBUFFER, pass.frameBuffer);
		this.camera.matrix=pass.cameraMatrix;
		this.camera.setProjectionMatrix(pass.projectionMatrix);
		this.renderPass(gl,renderObjects,0,0,pass.width,pass.height,GLGE.RENDER_DEFAULT,pass.self);
	}
	
	this.camera.matrix=cameraMatrix;
	this.camera.setProjectionMatrix(cameraPMatrix);
	
	gl.bindFramebuffer(gl.FRAMEBUFFER, this.filter ? this.framebuffer : this.transbuffer);
	this.renderPass(gl,renderObjects,this.renderer.getViewportOffsetX(),this.renderer.getViewportOffsetY(),this.renderer.getViewportWidth(),this.renderer.getViewportHeight());	

	
	this.applyFilter(gl,renderObjects, this.transbuffer);
	
	this.allowPasses=true;
	
}
/**
* gets the passes needed to render this scene
* @private
*/
GLGE.Scene.prototype.getPasses=function(gl,renderObjects){
	for(var i=0; i<renderObjects.length;i++){
		renderObjects[i].object.GLRender(gl,GLGE.RENDER_NULL,0,renderObjects[i].multiMaterial);
	}
}

/**
* renders the scene
* @private
*/
GLGE.Scene.prototype.renderPass=function(gl,renderObjects,offsetx,offsety,width,height,type,self){
	gl.clearDepth(1.0);
	gl.depthFunc(gl.LEQUAL);
	gl.viewport(offsetx,offsety,width,height);
	
	gl.clearColor(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, this.backgroundColor.a);
	if(!type) {
		gl.scissor(offsetx,offsety,width,height);
		gl.enable(gl.SCISSOR_TEST);
		this.renderer.GLClear();
		gl.disable(gl.SCISSOR_TEST);
	}else{
		gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
	}
	if(!type) type=GLGE.RENDER_DEFAULT;
	
	if(this.skyfilter && type==GLGE.RENDER_DEFAULT){
		this.skyfilter.GLRender(gl);
		gl.clear(gl.DEPTH_BUFFER_BIT);
		if(this.skyfilter && this.fogType==GLGE.FOG_SKYQUADRATIC || this.fogType==GLGE.FOG_SKYLINEAR){
			if(!this.skyTexture) this.createSkyBuffer(gl);
			gl.bindTexture(gl.TEXTURE_2D, this.skyTexture);
			gl.copyTexImage2D(gl.TEXTURE_2D, 0, gl.RGB, 0, 0, width, height, 0);
		}
	}
	
	var transObjects=[];
	gl.disable(gl.BLEND);
	for(var i=0; i<renderObjects.length;i++){
		if((!renderObjects[i].object.zTrans ||  type!=GLGE.RENDER_DEFAULT) && renderObjects[i].object!=self) renderObjects[i].object.GLRender(gl,type,0,renderObjects[i].multiMaterial);
			else if(renderObjects[i].object!=self) transObjects.push(renderObjects[i]);
	}

	gl.enable(gl.BLEND);
	transObjects=this.zSort(gl,transObjects);
	for(var i=0; i<transObjects.length;i++){
		if(transObjects[i].object.blending){
			if(transObjects[i].object.blending.length=4){
				gl.blendFuncSeparate(gl[transObjects[i].object.blending[0]],gl[transObjects[i].object.blending[1]],gl[transObjects[i].object.blending[2]],gl[transObjects[i].object.blending[3]]);
			}else{
				gl.blendFunc(gl[transObjects[i].object.blending[0]],gl[transObjects[i].object.blending[1]]);
			}
		}
		if(transObjects[i].object.depthTest===false){
			gl.disable(this.gl.DEPTH_TEST);   
		}else{
			gl.enable(this.gl.DEPTH_TEST);   
		}
		if(renderObjects[i]!=self) transObjects[i].object.GLRender(gl, type,0,transObjects[i].multiMaterial);
	}

}

GLGE.Scene.prototype.applyFilter=function(gl,renderObject,framebuffer){
    
    if(this.filter && this.filter.renderDepth){    
    	gl.clearDepth(1.0);
    	gl.depthFunc(gl.LEQUAL);
    	gl.bindFramebuffer(gl.FRAMEBUFFER, this.filter.getDepthBuffer(gl));
    	this.renderPass(gl,renderObject,0,0,this.filter.getDepthBufferWidth(), this.filter.getDepthBufferHeight(),GLGE.RENDER_SHADOW);	
    }
    
    if(this.filter && this.filter.renderEmit){    
        gl.clearDepth(1.0);
    	gl.depthFunc(gl.LEQUAL);
    	gl.bindFramebuffer(gl.FRAMEBUFFER, this.filter.getEmitBuffer(gl));
    	this.renderPass(gl,renderObject,0,0,this.filter.getEmitBufferWidth(),this.filter.getEmitBufferHeight(),GLGE.RENDER_EMIT);	
    }
	
	if(this.filter && this.filter.renderNormal){	
		gl.clearDepth(1.0);
		gl.depthFunc(gl.LEQUAL);
		gl.bindFramebuffer(gl.FRAMEBUFFER, this.filter.getNormalBuffer(gl));
		this.renderPass(gl,renderObject,0,0,this.filter.getNormalBufferWidth(),this.filter.getNormalBufferHeight(),GLGE.RENDER_NORMAL);	
	}
    

    

	
	if(this.filter) this.filter.GLRender(gl,framebuffer);
}

/**
* Adds and additional render pass to the scene for RTT, reflections and refractions
* @private
*/
GLGE.Scene.prototype.addRenderPass=function(frameBuffer,cameraMatrix,projectionMatrix,width,height,self){
	if(this.allowPasses)	this.passes.push({frameBuffer:frameBuffer, cameraMatrix:cameraMatrix, projectionMatrix:projectionMatrix, height:height, width:width,self:self});
	return this;
}
/**
* Sets up the WebGL needed create a picking frame and render buffer
* @private
*/
/*GLGE.Scene.prototype.createPickBuffer=function(gl){
    this.framePickBuffer = gl.createFramebuffer();
    this.renderPickBufferD = gl.createRenderbuffer();
    this.renderPickBufferC = gl.createRenderbuffer();
    //this.pickTexture = gl.createTexture();
    //gl.bindTexture(gl.TEXTURE_2D, this.pickTexture);

    //TODO update when null is accepted
   /* try {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 4, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
    } catch (e) {
        var tex = new WebGLUnsignedByteArray(4*1*4);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 4,1, 0, gl.RGBA, gl.UNSIGNED_BYTE, tex);
    }
    
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framePickBuffer);
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderPickBufferD);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16,4, 1);
    //gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.pickTexture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderPickBufferD);
    
    
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderPickBufferC);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.RGBA,4, 1);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.RENDERBUFFER, this.renderPickBufferC);
    
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.bindTexture(gl.TEXTURE_2D, null);
}*/

/**
* ray query from origin in the given direction
* @param origin the source of the ray
* @param direction the direction of the ray
*/
GLGE.Scene.prototype.ray=function(origin,direction){

		var gl=this.renderer.gl;
		var origmatrix=this.camera.matrix;	
		var origpmatrix=this.camera.pMatrix;
		
		this.camera.matrix=GLGE.inverseMat4(GLGE.Mat4([direction[2], direction[1], direction[0], origin[0],
									direction[0], direction[2], direction[1], origin[1],
									direction[1], direction[0], direction[2], origin[2],
									0, 0, 0, 1]));

		if(!this.pickPMatrix)	this.pickPMatrix=GLGE.makeOrtho(-0.0001,0.0001,-0.0001,0.0001,this.camera.near,this.camera.far);
		this.camera.pMatrix=this.pickPMatrix;
		gl.viewport(0,0,8,1);
		gl.clear(gl.DEPTH_BUFFER_BIT);
		gl.disable(gl.BLEND);
		gl.scene=this;
		var objects=this.getObjects();
		/*if(this.culling){
			var cvp=this.camera.getViewProjection();
			objects=this.objectsInViewFrustum(objects,cvp);
		}*/
		for(var i=0; i<objects.length;i++){
			if(objects[i].pickable) objects[i].GLRender(gl,GLGE.RENDER_PICK,i+1);
		}
		//gl.flush();

		var data = new Uint8Array(8 * 1 * 4);
		gl.readPixels(0, 0, 8, 1, gl.RGBA,gl.UNSIGNED_BYTE, data);
		
		var norm=[data[4]/255,data[5]/255,data[6]/255];
		var normalsize=Math.sqrt(norm[0]*norm[0]+norm[1]*norm[1]+norm[2]*norm[2])*0.5;
		norm=[norm[0]/normalsize-1,norm[1]/normalsize-1,norm[2]/normalsize-1];
		var obj=objects[data[0]+data[1]*256+data[2]*65536-1];

		var dist=(data[10]/255+0.00390625*data[9]/255+0.0000152587890625*data[8]/255)*this.camera.far;
		var tex=[];
		tex[0]=(data[14]/255+0.00390625*data[13]/255+0.0000152587890625*data[12]/255);
		tex[1]=(data[18]/255+0.00390625*data[17]/255+0.0000152587890625*data[16]/255);
		
				
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		gl.viewport(0,0,this.renderer.canvas.width,this.renderer.canvas.height);
		
		//revert the view matrix
		this.camera.matrix=origmatrix;	
		this.camera.pMatrix=origpmatrix;
		if (obj) {
			return {object:obj,distance:dist,coord:[origin[0]-direction[0]*dist,origin[1]-direction[1]*dist,origin[2]-direction[2]*dist],normal:norm,texture:tex};
		}
		return null;
}

/**
* Picks and object from canvas coords
* @param x the canvas x coord to pick
* @param y the canvas y coord to pick
*/

GLGE.Scene.prototype.pick=function(x,y){
	var ray = this.makeRay(x,y);
	if (!ray) {
		return null;
	}
	return this.ray(ray.origin,ray.coord);
};


/**
* Returns an object containing origin and coord, starting from the camera and pointing towards (x,y)
* @param x the canvas x coord to pick
* @param y the canvas y coord to pick
*/

GLGE.Scene.prototype.makeRay=function(x,y){
	if(!this.camera){
		GLGE.error("No camera set for picking");
		return null;
	}else if(this.camera.matrix && this.camera.pMatrix){
		//correct xy account for canvas scaling
		var canvas=this.renderer.canvas;
		x=x/canvas.offsetWidth*canvas.width;
		y=y/canvas.offsetHeight*canvas.height;
		
		var height=this.renderer.getViewportHeight();
		var width=this.renderer.getViewportWidth();
		var offsetx=this.renderer.getViewportOffsetX();
		var offsety=this.renderer.getViewportHeight()-this.renderer.canvas.height+this.renderer.getViewportOffsetY();
		var xcoord =  ((x-offsetx)/width-0.5)*2;
		var ycoord = -((y+offsety)/height-0.5)*2;
		var invViewProj=GLGE.mulMat4(GLGE.inverseMat4(this.camera.matrix),GLGE.inverseMat4(this.camera.pMatrix));
		var origin =GLGE.mulMat4Vec4(invViewProj,[xcoord,ycoord,-1,1]);
		origin=[origin[0]/origin[3],origin[1]/origin[3],origin[2]/origin[3]];
		var coord =GLGE.mulMat4Vec4(invViewProj,[xcoord,ycoord,1,1]);
		coord=[-(coord[0]/coord[3]-origin[0]),-(coord[1]/coord[3]-origin[1]),-(coord[2]/coord[3]-origin[2])];
		coord=GLGE.toUnitVec3(coord);
		return {origin: origin, coord: coord};
		
	}else{
		return null;
	}
	
};


})(GLGE);
