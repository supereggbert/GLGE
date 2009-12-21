/*
GLGE WebGL Graphics Engine
Copyright (C)2009  Paul Brunt

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA
*/

/**
 * @fileOverview
 * @name glge.js
 * @author me@paulbrunt.co.uk
 */

// Start of compatibility code
  try
  {
    WebGLFloatArray;
  }
  catch (e)
  {
    try
    {
      WebGLFloatArray = CanvasFloatArray;
      WebGLUnsignedShortArray = CanvasUnsignedShortArray;
    }
    catch (e)
    {
      alert("Could not find any WebGL array types.");
    }
  }
  // End of compatibility code

 
/**
* @namespace Holds the functionality of the library
*/
var GLGE={};

(function(GLGE){



/**
* @constant 
* @description Enumeration for TRUE
*/
GLGE.TRUE=1;
/**
* @constant 
* @description Enumeration for FALSE
*/
GLGE.FALSE=0;

/**
* @class Document class to load scene, object, mesh etc from an external XML file 
* @param {string} url URL of the resource to load
*/
GLGE.Document=function(url){
	this.listeners=[];
	this.documents=[];
	this.rootURL=url;
	this.loadDocument(url,null);
}
GLGE.Document.prototype.listeners=null;
GLGE.Document.prototype.documents=null;
GLGE.Document.prototype.rootURL=null;
GLGE.Document.prototype.loadCount=0;
/**
* Gets the absolute path given an import path and the path it's relative to
* @param {string} path the path to get the absolute path for
* @param {string} relativeto the path the supplied path is relativeto
* @returns {string} absolute path
* @private
*/
GLGE.Document.prototype.getAbsolutePath=function(path,relativeto){
	if(path.substr(0,7)=="http://"){
		return path;
	}
	else
	{
		if(!relativeto){
			relativeto=window.location.href;
		}
		//find the path compoents
		var bits=relativeto.split("/");
		var domain=bits[2];
		var initpath=[];
		for(var i=3;i<bits.length-1;i++){
			initpath.push(bits[i]);
		}
		//relative to domain
		if(path.substr(0,1)=="/"){
			initpath=[];
		}
		var locpath=path.split("/");
		for(i=0;i<locpath.length;i++){
			if(locpath[i]=="..") initpath.pop();
				else if(locpath[i]!="") initpath.push(locpath[i]);
		}
		return "http://"+domain+"/"+initpath.join("/");
	}
}
/**
* Loads an additional documents into the collection
* @param {string} url URL of the resource to load
* @param {string} relativeto the path the URL is relative to, null for default
*/
GLGE.Document.prototype.loadDocument=function(url,relativeto){
	this.loadCount++;
	url=this.getAbsolutePath(url,relativeto);
	var req = new XMLHttpRequest();
	if(req) {
		req.docurl=url;
		req.docObj=this;
		req.onreadystatechange = function() {
			if(this.readyState  == 4)
			{
				if(this.status  == 200){
					this.docObj.loaded(this.docurl,this.responseXML);
				}else{ 
					GLGE.error("Error loading Document: "+this.docurl);
				}
			}
		};
		req.open("GET", url, true);
		req.send("");
	}	
}
/**
* Trigered when a document has finished loading
* @param {string} url the absolute url of the document that has loaded
* @param {XMLDoc} responceXML the xml document that has finished loading
* @private
*/
GLGE.Document.prototype.loaded=function(url,responceXML){
	this.loadCount--;
	this.documents[url]={xml:responceXML};
	var imports=responceXML.getElementsByTagName("import");
	for(var i=0; i<imports.length;i++){
		if(!this.documents[this.getAbsolutePath(imports[i].getAttribute("url"),url)]){
			this.documents[this.getAbsolutePath(imports[i].getAttribute("url"),url)]={};
			this.loadDocument(imports[i].getAttribute("url"),url);
		}
	}
	if(this.loadCount==0){
		this.finishedLoading();
	}
}
/**
* Called when all documents have finished loading
* @private
*/
GLGE.Document.prototype.finishedLoading=function(){
	for(var i=0; i<this.listeners.length;i++){
		this.listeners[i](this.listeners.rootURL);
	}
	this.onLoad();
}
/**
* Called when all documents have finished loading
* @event
*/
GLGE.Document.prototype.onLoad=function(){};
/**
* Converts and attribute name into a class name
* @param {string} name attribute name to convert
* @private
*/
GLGE.Document.prototype.classString=function(name){
	if(!name) return false;
	var names=name.split("_");
	var converted="";
	for(var i=0;i<names.length;i++){
		converted=converted+names[i][0].toUpperCase()+names[i].substr(1);
	}
	return converted;
}
/**
* Sets the properties of an object based on the attributes of the corresponding dom element
* @param {object} Obj the DOM element to apply the attributes of
* @private
*/
GLGE.Document.prototype.setProperties=function(Obj){
	var set_method;
	var attribute_name;
	var value;
	for(var i=0; i<Obj.attributes.length; i++){
		set_method="set"+this.classString(Obj.attributes[i].nodeName);
		if(Obj.attributes[i].value[0]=="#"){
			value=this.getElement(Obj.attributes[i].value.substr(1));
		}
		else
		{
			//if this is a GLGE contsant then set the constant value otherwise just literal
			if(typeof(GLGE[Obj.attributes[i].value]) != "undefined"){
				value=GLGE[Obj.attributes[i].value];
			}
			else
			{
				value=Obj.attributes[i].value;
			}
		}
		if(Obj.object[set_method]) Obj.object[set_method](value);
	}
}
/**
* Adds child objects 
* @param {object} Obj the DOM element to apply the children of
* @private
*/
GLGE.Document.prototype.addChildren=function(Obj){
	//loop though and add the children
	var add_method;
	var child=Obj.firstChild;
	while(child){
		add_method="add"+this.classString(child.tagName);
		if(Obj.object[add_method]) Obj.object[add_method](this.getElement(child));
		child=child.nextSibling;
	}
}
/**
* Gets an object from the XML document based on the dom element 
* @param {string|domelement} ele the id of the element to get or the dom node
*/
GLGE.Document.prototype.getElement=function(ele){
	var docele,doc;
	if(typeof(ele)=="string"){
		for(doc in this.documents){
			if(this.documents[doc].xml){
				docele=this.documents[doc].xml.getElementById(ele);
				if(docele){
					ele=docele;
					break;
				}
			}
		}
	}
	if(typeof(ele)=="string"){
		//if element is still a string at this point there there is an issue
		GLGE.error("Element "+ele+" not found in document");
		return false;
	}
	else
	{
		if(this["get"+this.classString(ele.tagName)]){
			return this["get"+this.classString(ele.tagName)](ele);
		}
		else
		{
			return this.getDefault(ele);
		}
	}
}
/**
* Parses the dom element and creates any objects that are required
* @param {domelement} ele the element to create the objects from
* @private
*/
GLGE.Document.prototype.getDefault=function(ele){
	if(!ele.object){
		if(GLGE[this.classString(ele.tagName)]){
			ele.object=new GLGE[this.classString(ele.tagName)]();
			this.setProperties(ele);
			this.addChildren(ele);
		}
		else
		{
			GLGE.error("XML Parse Error: GLGE Object not found"); 
		}
	}
	return ele.object;
}
/**
* Parses the dom element and creates a texture
* @param {domelement} ele the element to create the objects from
* @private
*/
GLGE.Document.prototype.getTexture=function(ele){
	if(!ele.object){
		var rel=this.getAbsolutePath(this.rootURL,null);
		ele.object=new GLGE.Texture(this.getAbsolutePath(ele.getAttribute("src"),rel));
	}
	return ele.object;
}
/**
* Parses a document node into an array
* @param {node} the node to parse
* @private
*/
GLGE.Document.prototype.parseArray=function(node){
	var child=node.firstChild;
	var prev="";
	var output=[];
	var currentArray;
	while(child){
		currentArray=(prev+child.nodeValue).split(",");
		child=child.nextSibling;
		if(currentArray[0]=="") currentArray.unshift();
		if(child) prev=currentArray.pop();
		output=output.concat(currentArray);
	}
	return output;
}
/**
* Parses the skeleton to create the object
* @param {domelement} ele the element to create the skeleton
* @private
*/
GLGE.Document.prototype.getSkeleton=function(ele){
	if(!ele.object){
		ele.object=new GLGE.Skeleton();
		this.setProperties(ele);
		var child=ele.firstChild;
		while(child){
			switch(child.tagName){
				case "bone":
					ele.object.addBone(new GLGE.Bone(child.getAttribute("channel"),child.getAttribute("x"),child.getAttribute("y"),child.getAttribute("z")),child.getAttribute("parent"));
					break;
			}
			child=child.nextSibling;
		}
	}
	return ele.object;
}
/**
* Parses the skeletal animation to create the object
* @param {domelement} ele the element to create the skeletal animation from
* @private
*/
GLGE.Document.prototype.getSkeletalAction=function(ele){
	if(!ele.object){
		ele.object=new GLGE.SkeletalAction(ele.getAttribute("frames"));
		this.setProperties(ele);
		var child=ele.firstChild;
		while(child){
			switch(child.tagName){
				case "animation":
					ele.object.addAnimationVector(child.getAttribute("channel"),this.getElement(child.getAttribute("vector").substr(1)));
					break;
			}
			child=child.nextSibling;
		}
	}
	return ele.object;
}
/**
* Parses the mesh dom to create the mesh object
* @param {domelement} ele the element to create the mesh from
* @private
*/
GLGE.Document.prototype.getMesh=function(ele){
	if(!ele.object){
		ele.object=new GLGE.Mesh();
		this.setProperties(ele);
		child=ele.firstChild;
		while(child){
			switch(child.tagName){
				case "positions":
					ele.object.setPositions(this.parseArray(child));
					break;
				case "normals":
					ele.object.setNormals(this.parseArray(child));
					break;				
				case "uv1":
					ele.object.setUV(this.parseArray(child));
					break;
				case "faces":
					ele.object.setFaces(this.parseArray(child));
					break;
				case "weights":
					ele.object.addBoneWeights(child.getAttribute("channel"),this.parseArray(child));
					break;
			}
			child=child.nextSibling;
		}
	}
	return ele.object;
}
/**
* Parese the animation vector dom to create the mesh object
* @param {domelement} ele the element to create the animation vector from
* @private
*/
GLGE.Document.prototype.getAnimationVector=function(ele){
	if(!ele.object){
		ele.object=new GLGE.AnimationVector();
		this.setProperties(ele);
		child=ele.firstChild;
		var point;
		var curve;
		while(child){
			switch(child.tagName){
				case "animation_curve":
					curve=new GLGE.AnimationCurve();
					bezs=child.getElementsByTagName("bez_point");
					for(var i=0; i<bezs.length;i++){
						point=bezs[i].firstChild.nodeValue.split(",");
						curve.addPoint(new GLGE.BezTriple(point[0],point[1],point[2],point[3],point[4],point[5],point[6]));
					}
					ele.object.addCurve(child.getAttribute("channel"),curve);
					
					break;
			}
			child=child.nextSibling;
		}
	}
	return ele.object;
}

/**
* Adds a listener to be called when all documents have finished loading
* @param {function} listener the function to call when all loading in complete
*/
GLGE.Document.prototype.addLoadListener=function(listener){
	this.listeners.append(listener);
}
/**
* Removes a load listener
* @param {function} listener Listener to remove
*/
GLGE.Document.prototype.removeLoadListener=function(listener){
	for(var i=0; i<this.listeners.length; i++){
		if(this.listeners[i]===listener) this.listeners.splice(i,1);
	}
}




/**
* @class Abstract class to agument objects that requires position, rotation and scale.
*/
GLGE.Placeable=function(){
	this.matrix=$M.I(4);
}
GLGE.Placeable.prototype.locX=0;
GLGE.Placeable.prototype.locY=0;
GLGE.Placeable.prototype.locZ=0;
GLGE.Placeable.prototype.dLocX=0;
GLGE.Placeable.prototype.dLocY=0;
GLGE.Placeable.prototype.dLocZ=0;
GLGE.Placeable.prototype.rotX=0;
GLGE.Placeable.prototype.rotY=0;
GLGE.Placeable.prototype.rotZ=0;
GLGE.Placeable.prototype.dRotX=0;
GLGE.Placeable.prototype.dRotY=0;
GLGE.Placeable.prototype.dRotZ=0;
GLGE.Placeable.prototype.scaleX=1;
GLGE.Placeable.prototype.scaleY=1;
GLGE.Placeable.prototype.scaleZ=1;
GLGE.Placeable.prototype.dScaleX=0;
GLGE.Placeable.prototype.dScaleY=0;
GLGE.Placeable.prototype.dScaleZ=0;
GLGE.Placeable.prototype.matrix=null;
/**
* Gets the rotaion matrix 
* @returns {matrix} the objects rotation matrix
*/
GLGE.Placeable.prototype.getRotMatrix=function(){
	return $M([
		[this.matrix.e(1,1),this.matrix.e(1,2),this.matrix.e(1,3)],
		[this.matrix.e(2,1),this.matrix.e(2,2),this.matrix.e(2,3)],
		[this.matrix.e(3,1),this.matrix.e(3,2),this.matrix.e(3,3)]]);
}
/**
* Sets the x location of the object
* @param {number} value The value to assign to the x position
*/
GLGE.Placeable.prototype.setLocX=function(value){this.locX=value; this.updateMatrix();}
/**
* Sets the y location of the object
* @param {number} value The value to assign to the y position
*/
GLGE.Placeable.prototype.setLocY=function(value){this.locY=value;this.updateMatrix();}
/**
* Sets the z location of the object
* @param {number} value The value to assign to the z position
*/
GLGE.Placeable.prototype.setLocZ=function(value){this.locZ=value;this.updateMatrix();}
/**
* Sets the location of the object
* @param {number} x The value to assign to the x position
* @param {number} y The value to assign to the y position
* @param {number} z The value to assign to the z position
*/
GLGE.Placeable.prototype.setLoc=function(x,y,z){this.locX=x;this.locY=y;this.locZ=z;this.updateMatrix();}
/**
* Sets the x location displacement of the object, usefull for animation
* @param {number} value The value to assign to the x displacement
*/
GLGE.Placeable.prototype.setDLocX=function(value){this.dLocX=value;this.updateMatrix();}
/**
* Sets the y location displacement of the object, usefull for animation
* @param {number} value The value to assign to the y displacement
*/
GLGE.Placeable.prototype.setDLocY=function(value){this.dLocY=value;this.updateMatrix();}
/**
* Sets the z location displacement of the object, usefull for animation
* @param {number} value The value to assign to the z displacement
*/
GLGE.Placeable.prototype.setDLocZ=function(value){this.dLocZ=value;this.updateMatrix();}
/**
* Sets the location displacement of the object, useful for animation
* @param {number} x The value to assign to the x position
* @param {number} y The value to assign to the y position
* @param {number} z The value to assign to the z position
*/
GLGE.Placeable.prototype.setDLoc=function(x,y,z){this.dLocX=x;this.dLocY=y;this.dLocZ=z;this.updateMatrix();}
/**
* Sets the x rotation of the object
* @param {number} value The value to assign to the x rotation
*/
GLGE.Placeable.prototype.setRotX=function(value){this.rotX=value;this.updateMatrix();}
/**
* Sets the y rotation of the object
* @param {number} value The value to assign to the y rotation
*/
GLGE.Placeable.prototype.setRotY=function(value){this.rotY=value;this.updateMatrix();}
/**
* Sets the z rotation of the object
* @param {number} value The value to assign to the z rotation
*/
GLGE.Placeable.prototype.setRotZ=function(value){this.rotZ=value;this.updateMatrix();}
/**
* Sets the rotation of the object
* @param {number} x The value to assign to the x rotation
* @param {number} y The value to assign to the y rotation
* @param {number} z The value to assign to the z rotation
*/
GLGE.Placeable.prototype.setRot=function(x,y,z){this.rotX=x;this.rotY=y;this.rotZ=z;this.updateMatrix();}
/**
* Sets the x rotation displacement of the object, usefull for animation
* @param {number} value The value to assign to the x displacement
*/
GLGE.Placeable.prototype.setDRotX=function(value){this.dRotX=value;this.updateMatrix();}
/**
* Sets the y rotation displacement of the object, usefull for animation
* @param {number} value The value to assign to the y displacement
*/
GLGE.Placeable.prototype.setDRotY=function(value){this.dRotY=value;this.updateMatrix();}
/**
* Sets the z rotation displacement of the object, usefull for animation
* @param {number} value The value to assign to the z displacement
*/
GLGE.Placeable.prototype.setDRotZ=function(value){this.dRotZ=value;this.updateMatrix();}
/**
* Sets the rotation displacement of the object, useful for animation
* @param {number} x The value to assign to the x rotation
* @param {number} y The value to assign to the y rotation
* @param {number} z The value to assign to the z rotation
*/
GLGE.Placeable.prototype.setDRot=function(x,y,z){this.dRotX=x;this.dRotY=y;this.dRotZ=z;this.updateMatrix();}
/**
* Sets the x scale of the object
* @param {number} value The value to assign to the x scale
*/
GLGE.Placeable.prototype.setScaleX=function(value){this.scaleX=value;this.updateMatrix();}
/**
* Sets the y scale of the object
* @param {number} value The value to assign to the y scale
*/
GLGE.Placeable.prototype.setScaleY=function(value){this.scaleY=value;this.updateMatrix();}
/**
* Sets the z scale of the object
* @param {number} value The value to assign to the z scale
*/
GLGE.Placeable.prototype.setScaleZ=function(value){this.scaleZ=value;this.updateMatrix();}
/**
* Sets the scale of the object
* @param {number} x The value to assign to the x scale
* @param {number} y The value to assign to the y scale
* @param {number} z The value to assign to the z scale
*/
GLGE.Placeable.prototype.setScale=function(x,y,z){this.scaleX=x;this.scaleY=y;this.scaleZ=z;this.updateMatrix();}
/**
* Sets the x scale displacement of the object, usefull for animation
* @param {number} value The value to assign to the x displacement
*/
GLGE.Placeable.prototype.setDScaleX=function(value){this.dScaleX=value;this.updateMatrix();}
/**
* Sets the y scale displacement of the object, usefull for animation
* @param {number} value The value to assign to the y displacement
*/
GLGE.Placeable.prototype.setDScaleY=function(value){this.dScaleY=value;this.updateMatrix();}
/**
* Sets the z scale displacement of the object, usefull for animation
* @param {number} value The value to assign to the z displacement
*/
GLGE.Placeable.prototype.setDScaleZ=function(value){this.dScaleZ=value;this.updateMatrix();}
/**
* Sets the scale displacement of the object, useful for animation
* @param {number} x The value to assign to the x scale
* @param {number} y The value to assign to the y scale
* @param {number} z The value to assign to the z scale
*/
GLGE.Placeable.prototype.setDScale=function(x,y,z){this.dScaleX=x;this.dScaleY=y;this.dScaleZ=z;this.updateMatrix();}
/**
* Gets the x location of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getLocX=function(){return this.locX;}
/**
* Gets the y location of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getLocY=function(){return this.locY;}
/**
* Gets the z location of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getLocZ=function(){return this.locZ;}
/**
* Gets the x location displacement of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getDLocX=function(){return this.dLocX;}
/**
* Gets the y location displacement of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getDLocY=function(){return this.dLocY;}
/**
* Gets the z location displacement of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getDLocZ=function(){return this.dLocZ;}
/**
* Gets the x rotation of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getRotX=function(){return this.rotX;}
/**
* Gets the y rotation of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getRotY=function(){return this.rotY;}
/**
* Gets the z rotation of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getRotZ=function(){return this.rotZ;}
/**
* Gets the x rotaional displacement of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getDRotX=function(){return this.dRotX;}
/**
* Gets the y rotaional displacement of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getDRotY=function(){return this.dRotY;}
/**
* Gets the z rotaional displacement of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getDRotZ=function(){return this.dRotZ;}
/**
* Gets the x scale of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getScaleX=function(){return this.scaleX;}
/**
* Gets the y scale of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getSacleY=function(){return this.scaleY;}
/**
* Gets the z scale of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getScaleZ=function(){return this.scaleZ;}
/**
* Gets the x scale displacement of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getDScaleX=function(){return this.dScaleX;}
/**
* Gets the y scale displacement of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getDScaleY=function(){return this.dScaleY;}
/**
* Gets the z scale displacement of the object
* @returns {number}
*/
GLGE.Placeable.prototype.getDScaleZ=function(){return this.dScaleZ;}
/**
* Gets the position of the object
* @returns {object}
*/
GLGE.Placeable.prototype.getPosition=function(){
	var position={};
	position.x=parseFloat(this.locX)+parseFloat(this.dLocX);
	position.y=parseFloat(this.locY)+parseFloat(this.dLocY);
	position.z=parseFloat(this.locZ)+parseFloat(this.dLocZ);
	return position;
}
/**
* Gets the rotation of the object
* @returns {object}
*/
GLGE.Placeable.prototype.getRotation=function(){
	var rotation={};
	rotation.x=parseFloat(this.rotX)+parseFloat(this.dRotX);
	rotation.y=parseFloat(this.rotY)+parseFloat(this.dRotY);
	rotation.z=parseFloat(this.rotZ)+parseFloat(this.dRotZ);
	return rotation;
}
/**
* Gets the scale of the object
* @returns {object}
*/
GLGE.Placeable.prototype.getScale=function(){
	var scale={};
	scale.x=parseFloat(this.scaleX)+parseFloat(this.dScaleX);
	scale.y=parseFloat(this.scaleY)+parseFloat(this.dScaleY);
	scale.z=parseFloat(this.scaleZ)+parseFloat(this.dScaleZ);
	return scale;
}
/**
* Updates the model matrix
* @private
*/
GLGE.Placeable.prototype.updateMatrix=function(){
	this.matrix=null;
}
/**
* Gets the model matrix to transform the model within the world
*/
GLGE.Placeable.prototype.getModelMatrix=function(){
	if(!this.matrix){
		var position=this.getPosition();
		var rotation=this.getRotation();
		var scale=this.getScale();
		this.matrix=Matrix.transMat(position.x,position.y,position.z).x(Matrix.scaleMat(scale.x,scale.y,scale.z).x(Matrix.rotMat(rotation.x,rotation.y,rotation.z)));
	}
	return this.matrix;
}

/**
* @class Animation class to agument animatiable objects 
*/
GLGE.Animatable=function(){
}
GLGE.Animatable.prototype.animationStart=null;
GLGE.Animatable.prototype.animation=null;
GLGE.Animatable.prototype.lastFrame=null;
GLGE.Animatable.prototype.frameRate=25;
/**
* update animated properties on this object
*/
GLGE.Animatable.prototype.animate=function(){
	var now=parseInt(new Date().getTime());
	if(this.animation.frames>1){
		frame=((now-this.animationStart)/1000*this.frameRate)%(this.animation.frames-1)+1; 
	}else{
		frame=1;
	}
	if(frame!=this.lastFrame){
		this.lastFrame=frame;
		for(property in this.animation.curves){
			if(this["set"+property]) this["set"+property](this.animation.curves[property].getValue(frame));
		}
	}
}
/**
* Sets the animation vector of this object
* @param {GLGE.AnimationVector} animationVector the animation to apply to this object
*/
GLGE.Animatable.prototype.setAnimation=function(animationVector){
	this.animationStart=parseInt(new Date().getTime());
	this.animation=animationVector;
}
/**
* Gets the animation vector of this object
* @returns {AnimationVector}
*/
GLGE.Animatable.prototype.getAnimation=function(){
	return this.animation;
}
/**
* Sets the frame rate of the animation
* @param  {number} value the frame rate to set
*/
GLGE.Animatable.prototype.setFrameRate=function(value){
	this.frameRate=value;
}
/**
* Gets the frame rate of the animation
* @return {number} the current frame rate
*/
GLGE.Animatable.prototype.getFrameRate=function(){
	return this.frameRate;
}

/**
* @class A bezier class to add points to the Animation Curve 
* @param {number} x1 x-coord of the first control point
* @param {number} y1 y-coord of the first control point
* @param {number} x2 x-coord of the second control point
* @param {number} y2 y-coord of the second control point
* @param {number} x3 x-coord of the third control point
* @param {number} y3 y-coord of the third control point
*/
GLGE.BezTriple=function(x1,y1,x2,y2,x3,y3){
	this.x1=parseFloat(x1);
	this.y1=parseFloat(y1);
	this.x2=parseFloat(x2);
	this.y2=parseFloat(y2);
	this.x3=parseFloat(x3);
	this.y3=parseFloat(y3);
};

/**
* @class A curve which interpolates between control points
*/
GLGE.AnimationCurve=function(){
    this.keyFrames=[];
    this.solutions={};
};
GLGE.AnimationCurve.prototype.keyFrames=null;
/**
* Adds a point to the curve
* @param {BezPoint} bezPoint The bezier point to add
* @returns {Number} Index of the newly added point
*/
GLGE.AnimationCurve.prototype.addPoint=function(bezPoint){
	this.keyFrames.push(bezPoint);
	return this.keyFrames.length-1;
};
/**
* Get the value of the curve at any point
* @param {Number} frame The frame(x-coord) to return the value for
* @returns {Number} The value of the curve at the given point
*/
GLGE.AnimationCurve.prototype.coord=function(x,y){
	return {x:x,y:y}
}
GLGE.AnimationCurve.prototype.getValue=function(frame){
	var startKey=0;
	var endKey=0;
	//find the key frame bounds
	for(var i=0; i<this.keyFrames.length;i++){
		if(this.keyFrames[i].x2<frame && (this.keyFrames[i].x2>this.keyFrames[startKey].x2 || this.keyFrames[startKey].x2>frame)) startKey=i;
		if(this.keyFrames[i].x2>frame && (this.keyFrames[i].x2<this.keyFrames[endKey].x2 || this.keyFrames[endKey].x2<frame)) endKey=i;
	}
	var C1=this.coord(this.keyFrames[startKey].x2,this.keyFrames[startKey].y2);
	var C2=this.coord(this.keyFrames[startKey].x3,this.keyFrames[startKey].y3);
	var C3=this.coord(this.keyFrames[endKey].x1,this.keyFrames[endKey].y1);
	var C4=this.coord(this.keyFrames[endKey].x2,this.keyFrames[endKey].y2);
	return this.atX(frame,C1,C2,C3,C4).y;
};
/**
* Function used to calculate bezier curve
* @private
*/
GLGE.AnimationCurve.prototype.B1=function(t) { return t*t*t };
/**
* Function used to calculate bezier curve
* @private
*/
GLGE.AnimationCurve.prototype.B2=function(t) { return 3*t*t*(1-t) };
/**
* Function used to calculate bezier curve
* @private
*/
GLGE.AnimationCurve.prototype.B3=function(t) { return 3*t*(1-t)*(1-t) };
/**
* Function used to calculate bezier curve
* @private
*/
GLGE.AnimationCurve.prototype.B4=function(t) { return (1-t)*(1-t)*(1-t) };
/**
* Gets the value of a bezier curve at a given point
* @private
*/
GLGE.AnimationCurve.prototype.getBezier=function(t,C1,C2,C3,C4) {
	var pos = {};
	pos.x = C1.x*this.B1(t) + C2.x*this.B2(t) + C3.x*this.B3(t) + C4.x*this.B4(t);
	pos.y = C1.y*this.B1(t) + C2.y*this.B2(t) + C3.y*this.B3(t) + C4.y*this.B4(t);
	return pos;
};
/**
* Solves cubic equation to get the parametic value of the curve at a specified point
* @private
*/
GLGE.AnimationCurve.prototype.Quad3Solve=function(a,b,c,d){
	ref=a+"-"+b+"-"+"-"+c+"-"+d;
	if(this.solutions[ref]){
		return this.solutions[ref];
	}
	else
	{
		b /= a;c /= a;d /= a;
		var q, r, d1, s, t, t1, r13;
		q = (3.0*c - (b*b))/9.0;
		r = -(27.0*d) + b*(9.0*c - 2.0*(b*b));
		r /= 54.0;
		t1 = (b/3.0);
		discrim = q*q*q + r*r;
		result=[];
				
		if (discrim > 0) { 
		// one real, two complex
		 s = r + Math.sqrt(discrim);
		 s = ((s < 0) ? -Math.pow(-s, (1.0/3.0)) : Math.pow(s, (1.0/3.0)));
		 t = r - Math.sqrt(discrim);
		 t = ((t < 0) ? -Math.pow(-t, (1.0/3.0)) : Math.pow(t, (1.0/3.0)));
		 result[0] = -t1 + s + t;
		 t1 = t1 + (s + t)/2.0;
		 result[1] = result[2] = -t1;
		 t1 = Math.sqrt(3.0)*(-t + s)/2;
		} 
		else if (discrim == 0){ 
		// All roots real
		 r13 = ((r < 0) ? -Math.pow(-r,(1.0/3.0)) : Math.pow(r,(1.0/3.0)));
		 result[1] = -t1 + 2.0*r13;
		 result[1] = result[2]  = -(r13 + t1);
		} 
		else
		{
			q = -q;
			d1 = q*q*q;
			d1 = Math.acos(r/Math.sqrt(1));
			r13 = 2.0*Math.sqrt(q);


			result[0] = -t1 + r13*Math.cos(d1/3.0);
			result[1] = -t1 + r13*Math.cos((d1 + 2.0*Math.PI)/3.0);
			result[2] = -t1 + r13*Math.cos((d1 + 4.0*Math.PI)/3.0);
		}
		var toreturn=false;
		//determine which is the correct result
		if(result[0]>=0 && result[0]<=1) toreturn=result[0];
		if(!toreturn && result[1]>=0 && result[1]<=1) toreturn=result[1];
		if(!toreturn && result[2]>=0 && result[2]<=1) toreturn=result[2];
		//cache result for next time
		this.solutions[ref]=toreturn;
		
		return toreturn;
	}
};
/**
* Get the value of the a single bezier curve 
* @param {Number} x xcoord of point to get
* @param {Number} C1 First bezier control point
* @param {Number} C2 Second bezier control point
* @param {Number} C3 Third bezier control point
* @param {Number} C4 Forth bezier control point
* @returns {Number} The value of the curve at the given x
*/
GLGE.AnimationCurve.prototype.atX=function(x,C1,C2,C3,C4){
	a=C1.x-C2.x*3+C3.x*3-C4.x;
	b=C2.x*3-C3.x*6+C4.x*3;
	c=C3.x*3-C4.x*3;
	d=C4.x-x;
	return this.getBezier(this.Quad3Solve(a,b,c,d),C1,C2,C3,C4);
};

/**
* @class The AnimationVectors class allows you to specify the 2D Animation curves that define specific channels of animation within the engine. 
*/
GLGE.AnimationVector=function(){
    this.curves=[];
}
GLGE.AnimationVector.prototype.curves=[];
GLGE.AnimationVector.prototype.frames=250;
/**
* Adds an Animation Curve to a channel 
* @param {String} channel The name of the curve to be added
* @param {GLGE.AnimationCurve} curve The animation curve to add
*/
GLGE.AnimationVector.prototype.addCurve=function(name,curve){
	this.curves[name]=curve;
}
/**
* Removes an Animation Curve form a channel
* @param {String} channel The name of the curve to be removed
*/
GLGE.AnimationVector.prototype.removeCurve=function(name){
	delete(this.curves[name]);
}
/**
* Sets the number of frames in the animation
* @param {number} value The number of frames in the animation
*/
GLGE.AnimationVector.prototype.setFrames=function(value){
	this.frames=value;
}
/**
* Sets the number of frames in the animation
* @returns {number} The number of frames in the animation
*/
GLGE.AnimationVector.prototype.getFrames=function(){
	return this.frames;
}


/**
* Function to augment one object with another
* @param {object} obj1 Source Object
* @param {object} obj2 Destination Object
*/
GLGE.augment=function(obj1,obj2){
	for(proto in obj1.prototype){
		obj2.prototype[proto]=obj1.prototype[proto];
	}
}


/**
* @class Class defining a bones name and position in a skeleton
* @param {string} name the name of the bone
* @param {number} x the x co-ordinate of the bone
* @param {number} y the y co-ordinate of the bone
* @param {number} z the z co-ordinate of the bone
*/
GLGE.Bone=function(name,x,y,z){
	this.name=name;
	this.x=x;
	this.y=y;
	this.z=z;
}

GLGE.error=function(message){
	alert(message)
}

/**
* @class Class specifing bones,locations and relationships
*/
GLGE.Skeleton=function(){
    this.bones=[];
};
GLGE.Skeleton.prototype.bones=[];
/**
* Adds a bone to the skeleton
* @param {GLGE.Bone} bone the bone to add
* NOTE  why don't I just add the parent into the bone object????
*/
GLGE.Skeleton.prototype.addBone=function(bone,parent){
	if(parent) bone.parent=parent;
	this.bones.push(bone);
}
/**
* Gets the transform of a bone for a given action at a specified frame
* @param {string} bone the bone to get the matrix for
* @param {GLGE.SkeletalAction} action the action to the the matrix for
* @param {number} frame The frame number to get the matrix for
* @returns Matrix
*/
GLGE.Skeleton.prototype.getBoneTransforms=function(bone,action,frame){
	var TRANS1=Matrix.transMat(bone.x*-1,bone.y*-1,bone.z*-1);
	var TRANS2=Matrix.transMat(bone.x,bone.y,bone.z);

	var result=Matrix.I(4);
	if(action && action.cache[frame][bone.name]) result=TRANS2.x(action.cache[frame][bone.name]).x(TRANS1);
	return result;
}
/**
* Gets the bone object from it's name
* @param {string} name the name of the bone to get
* @returns GLGE.Bone
*/
GLGE.Skeleton.prototype.boneFromName=function(name){
    for(var i=0; i<this.bones.length;i++){
        if(this.bones[i].name==name){
            return i;
            break;
        }
    }
    return false;
}
/**
* Gets and array containing the transforms of each of the bones
* @param {GLGE.SkeletalAction} action the action to get the transforms for
* @param {number} frame the frame number
* @returns Matrix[]
*/
GLGE.Skeleton.prototype.getTransforms=function(action,frame){
	if(!action) alert(frame);
	var transforms={}
	for(var i=0; i<this.bones.length;i++){
            bone=this.bones[i];
            base=this.getBoneTransforms(bone,action,frame);
            while(bone.parent){
		if(!bone.parentIdx) bone.parentIdx=this.boneFromName(bone.parent);
                bone=this.bones[bone.parentIdx];
                base=this.getBoneTransforms(bone,action,frame).x(base);
            }
            transforms[this.bones[i].name]=({name:this.bones[i].name,matrix:base});
        }
	return transforms;
}




/**
* @class Class to perform an action on a skeleton
*/
GLGE.SkeletalAction=function(frames){
	this.frames=frames;
	this.AnimationVectors=[];
}
GLGE.SkeletalAction.prototype.frames=0;
GLGE.SkeletalAction.prototype.frameRate=60;
GLGE.SkeletalAction.prototype.cache=null;
GLGE.SkeletalAction.prototype.AnimationVectors=null;
/**
* Adds an animation to one of the bone
* @param {string} boneName The name of the bone
* @param {GLGE.AnimationVector} AnimationVector The animation to associate with the bone
*/
GLGE.SkeletalAction.prototype.addAnimationVector=function(boneName,AnimationVector){
	this.AnimationVectors[boneName]=AnimationVector;
}
/**
* Removed an animation for a bone
* @param {string} boneName The name of the bone
*/
GLGE.SkeletalAction.prototype.removeCurve=function(boneName){
	delete(this.AnimationVectors[boneName]);
}
/**
* Get the values of the animation vector for a given bone on a given channel at a given frame
* @param {string} boneName The name of the bone
* @param {string} channel The animation vector channel
* @param {number} frame The frame to get the value for
* @returns {object}
*/
GLGE.SkeletalAction.prototype.boneValue=function(boneName,channel,frame){
	var result;
	var result=0;
	if(channel=="ScaleX" || channel=="ScaleY" || channel=="ScaleZ") result=1;
	if(this.AnimationVectors[boneName] && this.AnimationVectors[boneName].curves[channel]){
		result=this.AnimationVectors[boneName].curves[channel].getValue(frame);
	}
	return result;
}
/**
* Get the transformation matrix for the bone at a given frame
* @param {string} boneName The name of the bone
* @param {number} frame The frame to get the value for
* @returns {Matrix}
*/
GLGE.SkeletalAction.prototype.getBoneTransform=function(boneName,frame){
	var LOCX=this.boneValue(boneName,"LocX",frame);
	var LOCY=this.boneValue(boneName,"LocY",frame);
	var LOCZ=this.boneValue(boneName,"LocZ",frame);
	var SCALEX=this.boneValue(boneName,"ScaleX",frame);
	var SCALEY=this.boneValue(boneName,"ScaleY",frame);
	var SCALEZ=this.boneValue(boneName,"ScaleZ",frame);
	var QUATX=this.boneValue(boneName,"QuatX",frame);
	var QUATY=this.boneValue(boneName,"QuatY",frame);
	var QUATZ=this.boneValue(boneName,"QuatZ",frame);
	var QUATW=this.boneValue(boneName,"QuatW",frame);
	

	var QUAT=Matrix.quat2rot(QUATX,QUATY,QUATZ,QUATW);
	var LOC=Matrix.transMat(LOCX,LOCY,LOCZ);
	var SCALE=Matrix.scaleMat(SCALEX,SCALEY,SCALEZ);
	return LOC.x(QUAT).x(SCALE);
}
/**
* Cache all the transforms for this action
*/
GLGE.SkeletalAction.prototype.cacheTransforms=function(){
	this.cache=[];
	var transforms;
	for(var frame=1; frame<=this.frames;frame++){
		transforms={};
		for(bone in this.AnimationVectors){
			if(this.AnimationVectors[bone] instanceof GLGE.AnimationVector){
				transforms[bone]=this.getBoneTransform(bone,frame+0.5);
			}
		}
		this.cache[frame]=transforms;
	}
}


/**
* @class An object that can be rendered in a scene
* @augments GLGE.Animatable
* @augments GLGE.Placeable
*/
GLGE.Object=function(){
}
GLGE.augment(GLGE.Placeable,GLGE.Object);
GLGE.augment(GLGE.Animatable,GLGE.Object);
GLGE.Object.prototype.action=null;
GLGE.Object.prototype.mesh=null;
GLGE.Object.prototype.skeleton=null;
GLGE.Object.prototype.scene=null;
GLGE.Object.prototype.transformMatrix=Matrix.I(4);
GLGE.Object.prototype.material=null;
GLGE.Object.prototype.gl=null;
GLGE.Object.prototype.actionStart=null;
GLGE.Object.prototype.blendState=null;
GLGE.Object.prototype.actionCache=null;
GLGE.Object.prototype.zTrans=false;
/**
* Blend from current skeletal action to another
* @param {GLGE.SkeletalAction} action The action to be blended to
* @param {Number} duration Number of millisecons the blend should last for
*/
GLGE.Object.prototype.blendAction=function(action,duration){
    this.blendState=this.getBoneTransforms();
    this.setAction(action);
    this.blendDuration=duration;
    this.actionCache=[];
}
/**
* Sets the skeletal action of this object
* @param {GLGE.SkeletalAction} action The action to be blended to
*/
GLGE.Object.prototype.setAction=function(action){
    this.action=action;
    this.actionCache=[];
    if(!this.action.cache) this.action.cacheTransforms();
    this.actionStart=parseInt(new Date().getTime());
}
/**
* Gets the current skeletal action of this object
* @returns GLGE.SkeletalAction
*/
GLGE.Object.prototype.getAction=function(){
	return this.action
}
/**
* Gets the current transfroms for each of the bones
* @returns Matrix[]
* @private
*/
GLGE.Object.prototype.getBoneTransforms=function(){
	var now=parseInt(new Date().getTime());
	var frame;
	if(this.action.frames>1){
		frame=((now-this.actionStart)/1000*this.action.frameRate)%(this.action.frames-1)+1; 
	}else{
		frame=1;
	}
	frame=Math.round(frame);
	if(this.actionCache[frame]){
		var transforms=this.actionCache[frame];
	}
	else
	{
		var transforms=this.skeleton.getTransforms(this.action,frame);
		if(this.blendState){
			var blendframe;
			var blendpoint=(now-this.actionStart)/this.blendDuration;
			if(blendpoint>=1){
				this.blendState=null;
				this.actionCache=[];
			}
			else
			{
			    //combine the two sets of transforms
			    var newtransforms={};
			    for(bone in transforms){
				if(transforms[bone].matrix){
					newtransforms[bone]={matrix:this.blendState[bone].matrix.x(1-blendpoint).add(transforms[bone].matrix.x(blendpoint))};
				}
			    }
			    transforms=newtransforms;            
			}
		}
		else
		{
			this.actionCache[frame]=transforms;
		}
	}
	return transforms;
}
/**
* Sets the Z Transparency of this object
* @param {boolean} value Does this object need blending?
*/
GLGE.Object.prototype.setZtransparent=function(value){
	this.zTrans=value;
}
/**
* Gets the z transparency
* @returns boolean
*/
GLGE.Object.prototype.isZtransparent=function(){
	return this.zTrans;
}

/**
* Sets the skeletal action of this object
* @param {GLGE.SkeletalAction} action The action to be blended to
*/
GLGE.Object.prototype.setSkeleton=function(skeleton){
	this.skeleton=skeleton;
}
/**
* Gets the current skeletal action of this object
* @returns GLGE.SkeletalAction
*/
GLGE.Object.prototype.getSkeleton=function(){
	return this.skeleton;
}
/**
* Sets the material associated with the object
* @param GLGE.Material
*/
GLGE.Object.prototype.setMaterial=function(material){
    this.material=material;
}
/**
* Gets the material associated with the object
* @returns GLGE.Material
*/
GLGE.Object.prototype.getMaterial=function(){
    return this.material;
}
GLGE.Object.prototype.setScene=function(scene){
    this.scene=scene;
}
GLGE.Object.prototype.getScene=function(){
    return this.scene;
}
/**
* Sets the mesh associated with the object
* @param GLGE.Mesh
*/
GLGE.Object.prototype.setMesh=function(mesh){
	if(this.mesh) this.mesh.removeObject(this);
	this.mesh=mesh;
	mesh.addObject(this);
}
/**
* Gets the mesh associated with the object
* @returns GLGE.Mesh
*/
GLGE.Object.prototype.getMesh=function(){
	return this.mesh;
}
/**
* Initiallize all the GL stuff needed to render to screen
* @private
*/
GLGE.Object.prototype.GLInit=function(gl){
	this.gl=gl;
	this.GLGenerateShader(gl);
}
/**
* Cleans up all the GL stuff we sets
* @private
*/
GLGE.Object.prototype.GLDestory=function(gl){
}
/**
* Updates the GL shader program for the object
* @private
*/
GLGE.Object.prototype.updateProgram=function(){
	if(this.gl) this.GLGenerateShader(this.gl);
}
/**
* Creates the shader program for the object
* @private
*/
GLGE.Object.prototype.GLGenerateShader=function(gl){
	if(this.GLShaderProgram) gl.deleteProgram(this.GLShaderProgram);
	//create the programs strings
	//Vertex Shader
	var vertexStr="";
	for(var i=0;i<this.mesh.buffers.length;i++){
        if(this.mesh.buffers[i].size>1)
	        vertexStr=vertexStr+"attribute vec"+this.mesh.buffers[i].size+" "+this.mesh.buffers[i].name+";\n";
        else
	        vertexStr=vertexStr+"attribute float "+this.mesh.buffers[i].name+";\n";
	}
	
	vertexStr=vertexStr+"uniform mat4 MVMatrix;\n";
	vertexStr=vertexStr+"uniform mat4 PMatrix;\n";  
	//normals needed for lighting
	vertexStr=vertexStr+"uniform mat4 uNMatrix;\n"; 

	for(var i=0; i<this.scene.lights.length;i++){
			vertexStr=vertexStr+"uniform vec3 lightpos"+i+";\n";
			vertexStr=vertexStr+"uniform vec3 lightdir"+i+";\n";
	}
  
	for(var i=0; i<this.mesh.boneWeights.length; i++){
		vertexStr=vertexStr+"uniform mat4 "+this.mesh.boneWeights[i].boneName+"Matrix;\n";  
		vertexStr=vertexStr+"uniform mat4 "+this.mesh.boneWeights[i].boneName+"nMatrix;\n";  
	}
	
	vertexStr=vertexStr+"varying vec3 eyevec;\n"; 
	for(var i=0; i<this.scene.lights.length;i++){
			vertexStr=vertexStr+"varying vec3 lightvec"+i+";\n"; 
			vertexStr=vertexStr+"varying float lightdist"+i+";\n"; 
	}
    
	vertexStr=vertexStr+"varying vec3 n;\n";  
	vertexStr=vertexStr+"varying vec4 UVCoord;\n";
	
	vertexStr=vertexStr+"void main(void)\n";
	vertexStr=vertexStr+"{\n";
	vertexStr=vertexStr+"UVCoord=UV;\n";
	vertexStr=vertexStr+"vec4 pos = vec4(0.0, 0.0, 0.0, 1.0);\n";
	vertexStr=vertexStr+"vec4 norm = vec4(0.0, 0.0, 0.0, 1.0);\n";
	var cnt=0;
	//calculate the total bone weight
	var totalWeight=0;
	vertexStr=vertexStr+"float totalWeight=0.0";
	for(var i=0; i<this.mesh.boneWeights.length; i=i+4){
		if(!this.mesh.boneWeights[i+1]){
			vertexStr=vertexStr+"+bones"+cnt;
		}else{
			vertexStr=vertexStr+"+bones"+cnt+"["+(i%4)+"]";
		}
		if(this.mesh.boneWeights[i+1]) vertexStr=vertexStr+"+bones"+cnt+"["+(i%4+1)+"]";
		if(this.mesh.boneWeights[i+2]) vertexStr=vertexStr+"+bones"+cnt+"["+(i%4+2)+"]";
		if(this.mesh.boneWeights[i+3]) vertexStr=vertexStr+"+bones"+cnt+"["+(i%4+3)+"]";
		cnt++;
	}
	vertexStr=vertexStr+";\n";
	vertexStr=vertexStr+"if(totalWeight>0.0){\n";
	cnt=0;
	for(var i=0; i<this.mesh.boneWeights.length; i=i+4){
		if(!this.mesh.boneWeights[i+1]){
		    vertexStr=vertexStr+"pos += ("+this.mesh.boneWeights[i].boneName+"Matrix * vec4(position, 1.0))*(bones"+cnt+"/totalWeight);\n";
		    vertexStr=vertexStr+"norm += ("+this.mesh.boneWeights[i].boneName+"nMatrix * vec4(normal, 1.0))*(bones"+cnt+"/totalWeight);\n";
		    }else{
		    vertexStr=vertexStr+"pos += ("+this.mesh.boneWeights[i].boneName+"Matrix * vec4(position, 1.0))*(bones"+cnt+"["+(i%4)+"]/totalWeight);\n";
		    vertexStr=vertexStr+"norm += ("+this.mesh.boneWeights[i].boneName+"nMatrix * vec4(normal, 1.0))*(bones"+cnt+"["+(i%4)+"]/totalWeight);\n";
		}
		if(this.mesh.boneWeights[i+1]) vertexStr=vertexStr+"pos += ("+this.mesh.boneWeights[i+1].boneName+"Matrix * vec4(position, 1.0))*(bones"+cnt+"["+(i%4+1)+"]/totalWeight);\n";
		if(this.mesh.boneWeights[i+2]) vertexStr=vertexStr+"pos += ("+this.mesh.boneWeights[i+2].boneName+"Matrix * vec4(position, 1.0))*(bones"+cnt+"["+(i%4+2)+"]/totalWeight);\n";
		if(this.mesh.boneWeights[i+3]) vertexStr=vertexStr+"pos += ("+this.mesh.boneWeights[i+3].boneName+"Matrix * vec4(position, 1.0))*(bones"+cnt+"["+(i%4+3)+"]/totalWeight);\n";
		if(this.mesh.boneWeights[i+1]) vertexStr=vertexStr+"norm += ("+this.mesh.boneWeights[i+1].boneName+"nMatrix * vec4(normal, 1.0))*(bones"+cnt+"["+(i%4+1)+"]/totalWeight);\n";
		if(this.mesh.boneWeights[i+2]) vertexStr=vertexStr+"norm += ("+this.mesh.boneWeights[i+2].boneName+"nMatrix * vec4(normal, 1.0))*(bones"+cnt+"["+(i%4+2)+"]/totalWeight);\n";
		if(this.mesh.boneWeights[i+3]) vertexStr=vertexStr+"norm += ("+this.mesh.boneWeights[i+3].boneName+"nMatrix * vec4(normal, 1.0))*(bones"+cnt+"["+(i%4+3)+"]/totalWeight);\n";
		cnt++;
	}
	vertexStr=vertexStr+"pos = MVMatrix * vec4(pos.xyz, 1.0);\n";
	vertexStr=vertexStr+"norm = uNMatrix * vec4(norm.xyz, 1.0);\n";
	vertexStr=vertexStr+"}else{\n";
	vertexStr=vertexStr+"pos = MVMatrix * vec4(position, 1.0);\n";
	vertexStr=vertexStr+"norm = uNMatrix * vec4(normal, 1.0);\n";
	vertexStr=vertexStr+"}\n";
   
    
	vertexStr=vertexStr+"gl_Position = PMatrix * pos;\n";
	vertexStr=vertexStr+"eyevec = -pos.xyz;\n";
	for(var i=0; i<this.scene.lights.length;i++){
			vertexStr=vertexStr+"lightvec"+i+" = (lightpos"+i+"-pos.xyz);\n";
			vertexStr=vertexStr+"lightdist"+i+" = length(lightpos"+i+".xyz-pos.xyz);\n";
	}
	vertexStr=vertexStr+"n = norm.rgb;\n";
	vertexStr=vertexStr+"}\n";
	
	//Fragment Shader
	if(!this.material){
		var fragStr="";
		fragStr=fragStr+"void main(void)\n";
		fragStr=fragStr+"{\n";
		fragStr=fragStr+"gl_FragColor = vec4(1.0,1.0,1.0,1);\n";
		fragStr=fragStr+"}\n";
	}
	else
	{
		fragStr=this.material.getFragmentShader(this.scene.lights);
	}

	if(!this.GLFragmentShader) this.GLFragmentShader=gl.createShader(gl.FRAGMENT_SHADER);
	if(!this.GLVertexShader) this.GLVertexShader=gl.createShader(gl.VERTEX_SHADER);

	//set and compile the fragment shader
	//need to set str
	gl.shaderSource(this.GLFragmentShader, fragStr);
	gl.compileShader(this.GLFragmentShader);
	
	/* temp remove for webkit
	if (!gl.getShaderi(this.GLFragmentShader, gl.COMPILE_STATUS))
	{
		GLGE.error(gl.getShaderInfoLog(this.GLFragmentShader));
		return null;
	}*/
	//set and compile the vertex shader
	//need to set str
	gl.shaderSource(this.GLVertexShader, vertexStr);
	gl.compileShader(this.GLVertexShader);
	/* temp remove for webkit
	if (!gl.getShaderi(this.GLVertexShader, gl.COMPILE_STATUS))
	{
		GLGE.error(gl.getShaderInfoLog(this.GLVertexShader));
		return null;
	}
	*/
	
	if(!this.GLShaderProgram) this.GLShaderProgram = gl.createProgram();
	gl.attachShader(this.GLShaderProgram, this.GLVertexShader);
	gl.attachShader(this.GLShaderProgram, this.GLFragmentShader);
	gl.linkProgram(this.GLShaderProgram);	
}
/**
* Sets the shader program uniforms ready for rendering
* @private
*/
GLGE.Object.prototype.GLUniforms=function(gl){
	var camMat=this.scene.camera.getViewMatrix();
	//generate and set the modelView matrix
	mvMatrix=camMat.x(this.getModelMatrix());
	
	var mvUniform = gl.getUniformLocation(this.GLShaderProgram, "MVMatrix");
	gl.uniformMatrix4fv(mvUniform, false, new WebGLFloatArray(mvMatrix.flatten()));
	
	var pUniform = gl.getUniformLocation(this.GLShaderProgram, "PMatrix");
	gl.uniformMatrix4fv(pUniform, false, new WebGLFloatArray(this.scene.camera.pMatrix.flatten()));
    
	//normalising matrix
	var normalMatrix = mvMatrix.inverse();
	normalMatrix = normalMatrix.transpose();
	var nUniform = gl.getUniformLocation(this.GLShaderProgram, "uNMatrix");
	gl.uniformMatrix4fv(nUniform, false, new WebGLFloatArray(normalMatrix.flatten()));
    
	//light
	var pos,lpos;
	for(var i=0; i<this.scene.lights.length;i++){
		pos=camMat.x(this.scene.lights[i].getModelMatrix()).x($V([0,0,0,1])).flatten();
		lpos=camMat.x(this.scene.lights[i].getModelMatrix()).x($V([0,0,-1,1])).flatten();
		gl.uniform3f(gl.getUniformLocation(this.GLShaderProgram, "lightpos"+i), pos[0],pos[1],pos[2]);
		gl.uniform3f(gl.getUniformLocation(this.GLShaderProgram, "lightdir"+i),lpos[0]-pos[0],lpos[1]-pos[1],lpos[2]-pos[2]);
	}
       
	//set bone transforms
	var boneUniform;
	var transforms={};
	if(this.action && this.skeleton){
		transforms=this.getBoneTransforms();
	}
	for(var i=0; i<this.mesh.boneWeights.length; i++){
		if(!transforms[this.mesh.boneWeights[i].boneName]) transforms[this.mesh.boneWeights[i].boneName]={matrix:Matrix.I(4)};
		
		boneUniform = gl.getUniformLocation(this.GLShaderProgram, this.mesh.boneWeights[i].boneName+"Matrix");
		gl.uniformMatrix4fv(boneUniform, false, new WebGLFloatArray(transforms[this.mesh.boneWeights[i].boneName].matrix.flatten()));
        
		boneUniform = gl.getUniformLocation(this.GLShaderProgram, this.mesh.boneWeights[i].boneName+"nMatrix");
		gl.uniformMatrix4fv(boneUniform, false, new WebGLFloatArray(transforms[this.mesh.boneWeights[i].boneName].matrix.inverse().transpose().flatten()));
	}
    
	if(this.material) this.material.textureUniforms(gl,this.GLShaderProgram,this.scene.lights);
}
/**
* Renders the object to the screen
* @private
*/
GLGE.Object.prototype.GLRender=function(gl){
	//animate this object
	if(this.animation) this.animate();
	
	var attribslot;
	gl.useProgram(this.GLShaderProgram);
	
	this.mesh.GLAttributes(gl,this.GLShaderProgram);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.mesh.GLfaces);

	this.GLUniforms(gl);
	//gl.drawArrays(gl.LINE_LOOP, 0, this.GLbuffers["position"].numItems);
	gl.drawElements(gl.TRIANGLES, this.mesh.GLfaces.numItems, gl.UNSIGNED_SHORT, 0);
}



/**
* @class Creates a new mesh to associate with a mesh
* @see GLGE.Object
*/
GLGE.Mesh=function(){
	this.GLbuffers=[];
	this.buffers=[];
	this.UV=[];
	this.boneWeights=[];
	this.setBuffers=[];
	this.faces={};
	this.objects=[];
}
GLGE.Mesh.prototype.gl=null;
GLGE.Mesh.prototype.GLbuffers=null;
GLGE.Mesh.prototype.buffers=null;
GLGE.Mesh.prototype.setBuffers=null;
GLGE.Mesh.prototype.GLfaces=null;
GLGE.Mesh.prototype.faces=null;
GLGE.Mesh.prototype.boneWeights=null;
GLGE.Mesh.prototype.UV=null;
GLGE.Mesh.prototype.objects=null;
/**
* Set the UV coord for the first UV layer
* @param {Number[]} jsArray the UV coords in a 1 dimentional array
*/
GLGE.Mesh.prototype.setUV=function(jsArray){
	var idx=0;
	for(var i=0; i<jsArray.length;i=i+2){
		this.UV[idx]=jsArray[i];
		this.UV[idx+1]=jsArray[i+1];
		if(!this.UV[idx+2]) this.UV[idx+2]=0;
		if(!this.UV[idx+3]) this.UV[idx+3]=0;
		idx=idx+4;
	}
	this.setBuffer("UV",this.UV,4);
}
/**
* Set the UV coord for the second UV layer
* @param {Number[]} jsArray the UV coords in a 1 dimentional array
*/
GLGE.Mesh.prototype.setUV2=function(jsArray){
	var idx=0;
	for(var i=0; i<jsArray.length;i=i+2){
		if(!this.UV[idx]) this.UV[idx]=0;
		if(!this.UV[idx+1]) this.UV[idx+1]=0;
		this.UV[idx+2]=jsArray[i];
		this.UV[idx+3]=jsArray[i+1];
		idx=idx+4;
	}
	this.setBuffer("UV",this.UV,4);
}
/**
* Sets the bone weights for a perticular bone
* @param {String} boneName The name of the bone
* @param {Number[]} jsArray The 1 dimentional array of weights
*/
GLGE.Mesh.prototype.addBoneWeights=function(boneName,jsArray){
	var bone={};
	bone.boneName=boneName;
	bone.weights=jsArray;
	this.boneWeights.push(bone);
    
	var weights;
	var cnt=0;
	for(var i=0; i<this.boneWeights.length; i=i+4){
		weights=[];
		size=1;
		for(var n=0; n<this.boneWeights[i].weights.length;n++){
			weights.push(this.boneWeights[i].weights[n]);
			if(this.boneWeights[i+1]){
				size=2;
				weights.push(this.boneWeights[i+1].weights[n]);
			}
			if(this.boneWeights[i+2]){
				size=3;
				weights.push(this.boneWeights[i+2].weights[n]);
			}
			if(this.boneWeights[i+3]){
				size=4;
				weights.push(this.boneWeights[i+3].weights[n]);
			}
		}
		this.setBuffer("bones"+cnt,weights,size);
		cnt++;
	}
}
/**
* Sets the positions of the verticies
* @param {Number[]} jsArray The 1 dimentional array of positions
*/
GLGE.Mesh.prototype.setPositions=function(jsArray){
	this.setBuffer("position",jsArray,3);
}
/**
* Sets the normals of the verticies
* @param {Number[]} jsArray The 1 dimentional array of normals
*/
GLGE.Mesh.prototype.setNormals=function(jsArray){
	this.setBuffer("normal",jsArray,3);
}
/**
* Sets a buffer for the
* @param {String} boneName The name of the bone
* @param {Number[]} jsArray The 1 dimentional array of weights
* @private
*/
GLGE.Mesh.prototype.setBuffer=function(bufferName,jsArray,size){
	var buffer;
	for(var i=0;i<this.buffers.length;i++){
		if(this.buffers[i].name==bufferName) buffer=i;
	}
	if(!buffer){
		this.buffers.push({name:bufferName,data:jsArray,size:size,GL:false});
		this.updatePrograms();
	}
        else 
	{
		this.buffers[buffer]={name:bufferName,data:jsArray,size:size,GL:false};
	}
}
/**
* Sets the faces for this mesh
* @param {Number[]} jsArray The 1 dimentional array of normals
*/
GLGE.Mesh.prototype.setFaces=function(jsArray){
	this.faces={data:jsArray,GL:false};

}
/**
* Sets the faces for this mesh
* @param {Number[]} jsArray The 1 dimentional array of normals
* @private
*/
GLGE.Mesh.prototype.GLSetFaceBuffer=function(gl){
	if(!this.GLfaces) this.GLfaces = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.GLfaces);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new WebGLUnsignedShortArray(this.faces.data), gl.STATIC_DRAW);
	this.GLfaces.itemSize = 1;
	this.GLfaces.numItems = this.faces.data.length;
}
/**
* Sets up a GL Buffer
* @param {WebGLContext} gl The context being drawn on
* @param {String} bufferName The name of the buffer to create
* @param {Number[]}  jsArray The data to add to the buffer
* @param {Number}  size Size of a single element within the array
* @private
*/
GLGE.Mesh.prototype.GLSetBuffer=function(gl,bufferName,jsArray,size){
	if(!this.GLbuffers[bufferName]) this.GLbuffers[bufferName] = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.GLbuffers[bufferName]);
	gl.bufferData(gl.ARRAY_BUFFER, new WebGLFloatArray(jsArray), gl.STATIC_DRAW);
	this.GLbuffers[bufferName].itemSize = size;
	this.GLbuffers[bufferName].numItems = jsArray.length/size;
}
/**
* Sets the Attributes for this mesh
* @param {WebGLContext} gl The context being drawn on
* @private
*/
GLGE.Mesh.prototype.GLAttributes=function(gl,shaderProgram){
	//disable all the attribute initially arrays - do I really need this?
	for(var i=0; i<8; i++) gl.disableVertexAttribArray(i);
	//check if the faces have been updated
	if(!this.faces.GL){
		this.GLSetFaceBuffer(gl);
		this.faces.GL=true;
	}
	//loop though the buffers
	for(i=0; i<this.buffers.length;i++){
		if(!this.buffers[i].GL){
			this.GLSetBuffer(gl,this.buffers[i].name,this.buffers[i].data,this.buffers[i].size);
			this.buffers[i].GL=true;
		}
		attribslot=gl.getAttribLocation(shaderProgram, this.buffers[i].name);
		if(attribslot>-1){
			gl.bindBuffer(gl.ARRAY_BUFFER, this.GLbuffers[this.buffers[i].name]);
			gl.enableVertexAttribArray(attribslot);
			gl.vertexAttribPointer(attribslot, this.GLbuffers[this.buffers[i].name].itemSize, gl.FLOAT, false, 0, 0);
		}
	}
}
/**
* updates the programs for the objects when buffers are added/removed
* @private
*/
GLGE.Mesh.prototype.updatePrograms=function(){
	for(var i=0;i<this.objects.length;i++){
		this.objects[i].updateProgram();
	}
}
/**
* Adds a object to this mesh to be notified when a buffer is added/removed
* @param {GLGE.Object} object the object this mesh has been added to
* @private
*/
GLGE.Mesh.prototype.addObject=function(object){
	this.objects.push(object);
}
/**
* Removes the association with an object
* @param {GLGE.Object} object the object this mesh has been added to
* @private
*/
GLGE.Mesh.prototype.removeObject=function(object){
	//TODO: add remove code
}


/**
* @class Creates a new light source to be added to a scene
* @property {Boolean} diffuse Dose this light source effect diffuse shading
* @property {Boolean} specular Dose this light source effect specular shading
* @augments GLGE.Animatable
* @augments GLGE.Placeable
*/
GLGE.Light=function(type){
	this.color={r:1,g:1,b:1};
	this.type=type;
}
GLGE.augment(GLGE.Placeable,GLGE.Light);
GLGE.augment(GLGE.Animatable,GLGE.Light);
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

GLGE.Light.prototype.constantAttenuation=1;
GLGE.Light.prototype.linearAttenuation=0.002;
GLGE.Light.prototype.quadraticAttenuation=0.0008;
GLGE.Light.prototype.spotCosCutOff=0.95;
GLGE.Light.prototype.spotExponent=10;
GLGE.Light.prototype.color=null; 
GLGE.Light.prototype.diffuse=true; 
GLGE.Light.prototype.specular=true; 
GLGE.Light.type=GLGE.L_POINT;
/**
* Sets the spot light cut off
* @param {number} value The cos of the angle to limit
*/
GLGE.Light.prototype.setSpotCosCutOff=function(value){
	this.spotCosCutOff=value;
}
/**
* Gets the spot light cut off
* @returns {number} The cos of the limiting angle 
*/
GLGE.Light.prototype.getSpotCosCutOff=function(){
	return this.spotCosCutOff=value;
}
/**
* Sets the spot light exponent
* @param {number} value The spot lights exponent
*/
GLGE.Light.prototype.setSpotExponent=function(value){
	this.spotExponent=value;
}
/**
* Gets the spot light exponent
* @returns {number} The exponent of the spot light
*/
GLGE.Light.prototype.getSpotExponent=function(){
	return this.spotExponentf=value;
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
}
/**
* Sets the light sources constant attenuation
* @param {Number} value The constant part of the attenuation
*/
GLGE.Light.prototype.setAttenuationConstant=function(value){
	this.constantAttenuation=value;
}
/**
* Sets the light sources linear attenuation
* @param {Number} value The linear part of the attenuation
*/
GLGE.Light.prototype.setAttenuationLinear=function(value){
	this.linearAttenuation=value;
}
/**
* Sets the light sources quadratic attenuation
* @param {Number} value The quadratic part of the attenuation
*/
GLGE.Light.prototype.setAttenuationQuadratic=function(value){
	this.quadraticAttenuation=value;
}

/**
* Sets the color of the light source
* @param {Number} r The new red level 0-1
* @param {Number} g The new green level 0-1
* @param {Number} b The new blue level 0-1
*/
GLGE.Light.prototype.setColor=function(r,g,b){
	this.color={r:r,g:g,b:b};
}
/**
* Sets the red color of the light source
* @param {Number} value The new red level 0-1
*/
GLGE.Light.prototype.setColorR=function(value){
	this.color.r=value
}
/**
* Sets the green color of the light source
* @param {Number} value The new green level 0-1
*/
GLGE.Light.prototype.setColorG=function(value){
	this.color.g=value
}
/**
* Sets the blue color of the light source
* @param {Number} value The new blue level 0-1
*/
GLGE.Light.prototype.setColorB=function(value){
	this.color.b=value
}
/**
* Gets the current color of the light source
* @return {[r,g,b]} The current position
*/
GLGE.Light.prototype.getColor=function(){
	return this.color;
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
}


/**
* @class Creates a new camera object
* @augments GLGE.Animatable
* @augments GLGE.Placeable
*/
GLGE.Camera=function(){
        this.pMatrix=makePerspective(45, 1.0, 0.1, 300.0);
};
GLGE.augment(GLGE.Placeable,GLGE.Camera);
GLGE.augment(GLGE.Animatable,GLGE.Camera);
GLGE.Camera.prototype.pMatrix=null;
/**
* Method gets the current projection matrix of this camera
* @return {Matrix} Returns the camera projection matrix
*/
GLGE.Camera.prototype.getProjectionMatrix=function(){
	return this.pMatrix;
};
/**
* Method generates the projection matrix based on the 
* camera paramaters
* @param {Matrix} projection The new projection matrix
*/
GLGE.Camera.prototype.setProjectionMatrix=function(projection){
	this.pMatrix=projection;
};
/**
* Method generates the cameras view matrix
* @return Returns the view matrix based on this camera
* @type Matrix
*/
GLGE.Camera.prototype.updateMatrix=function(){
	var position=this.getPosition();
	var rotation=this.getRotation();
	var vMatrix=Matrix.transMat(position.x,position.y,position.z);
	vMatrix=vMatrix.x(Matrix.rotMat(rotation.x,rotation.y,rotation.z));
	this.matrix=vMatrix.inverse();
};
/**
* Method generates the cameras view matrix
* @return Returns the view matrix based on this camera
* @type Matrix
*/
GLGE.Camera.prototype.getViewMatrix=function(){
	return this.matrix;
};

/**
* @class Scene class containing the camera, lights and objects
*/
GLGE.Scene=function(){
	this.objects=[];
	this.lights=[];
	this.camera=new GLGE.Camera();
	this.backgroundColor={r:1,g:1,b:1};
	this.ambientColor={r:0,g:0,b:0};
}
GLGE.Scene.prototype.camera=null;
GLGE.Scene.prototype.objects=null;
GLGE.Scene.prototype.lights=null;
GLGE.Scene.prototype.renderer=null;
GLGE.Scene.prototype.backgroundColor=null;
GLGE.Scene.prototype.ambientColor=null;
/**
* Gets the scenes background color
* @returns {object} An assoiative array r,g,b
*/
GLGE.Scene.prototype.getBackgroundColor=function(){	
	return this.backgroundColor;
}
/**
* Sets the scenes background color
* @param {number} r the red componenent of the background color 0-1
* @param {number} g the green componenent of the background color 0-1
* @param {number} b the blue componenent of the background color 0-1
*/
GLGE.Scene.prototype.setBackgroundColor=function(r,g,b){	
	this.backgroundColor={r:r,g:g,b:b};
	if(this.renderer){
		this.renderer.gl.clearColor(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, 1.0);
	}
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
* @param {number} r the red componenent of the ambient light 0-1
* @param {number} g the green componenent of the ambient light 0-1
* @param {number} b the blue componenent of the ambient light 0-1
*/
GLGE.Scene.prototype.setAmbientColor=function(r,g,b){	
	this.ambientColor={r:r,g:g,b:b};
	if(this.renderer){
		this.renderer.gl.clearColor(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, 1.0);
	}
}
/**
* Sets the scenes ambient light
* @param {number} value the red componenent of the ambient light 0-1
*/
GLGE.Scene.prototype.setAmbientColorR=function(value){	
	this.ambientColor.r=value;
}
/**
* Sets the scenes ambient light
* @param {number} value the green componenent of the ambient light 0-1
*/
GLGE.Scene.prototype.setAmbientColorG=function(value){	
	this.ambientColor.g=value;
}
/**
* Sets the scenes ambient light
* @param {number} value the blue componenent of the ambient light 0-1
*/
GLGE.Scene.prototype.setAmbientColorB=function(value){	
	this.ambientColor.b=value;
}

/**
* Gets an array of all the object in the scene
* @returns {GLGE.Object[]} An array of objects
*/
GLGE.Scene.prototype.getObjects=function(){	
	return this.objects;
}
/**
* Gets an array of all the light sources in the scene
* @returns {GLGE.Lights[]} An array of lights
*/
GLGE.Scene.prototype.getLights=function(){	
	return this.lights;
}
/**
* Sets the active camera for this scene
* @property {GLGE.Camera} object The object to be added
*/
GLGE.Scene.prototype.setCamera=function(camera){	
	this.camera=camera;
}
/**
* Gets the scenes active camera
* @returns {GLGE.Camera} The current camera
*/
GLGE.Scene.prototype.getCamera=function(){	
	return this.camera;
}
/**
* Adds an object to the scene
* @property {GLGE.Object} object The object to be added
* @returns {Number} The index of the added object
*/
GLGE.Scene.prototype.addObject=function(object){	
	object.scene=this;
	this.objects.push(object);
	if(this.renderer) object.GLInit(this.renderer.gl);
	return this.objects.length-1;
}
/**
* Adds a light source to the scene
* @property {GLGE.Light} light The light to be added
* @returns {Number} The index of the added light
*/
GLGE.Scene.prototype.addLight=function(light){	
	light.scene=this;
	this.lights.push(light);
}
/**
* used to initialize all the WebGL buffers etc need for this scene
* @private
*/
GLGE.Scene.prototype.init=function(){
    this.renderer.gl.clearColor(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, 1.0);
    for(var i=0;i<this.objects.length;i++){
        this.objects[i].GLInit(this.renderer.gl);
    }
}
/**
* used to clean up all the WebGL buffers etc need for this scene
* @private
*/
GLGE.Scene.prototype.destory=function(gl){
}
/**
* renders the scene
* @private
*/
GLGE.Scene.prototype.render=function(gl){
	if(this.camera.animation) this.camera.animate();
	for(var i=0;i<this.lights.length;i++){
		if(this.lights[i].animation) this.lights[i].animate();
	}
	this.renderer.gl.disable(this.renderer.gl.BLEND);
	for(var i=0; i<this.objects.length;i++){
		if(!this.objects[i].zTrans) this.objects[i].GLRender(this.renderer.gl);
	}
	this.renderer.gl.enable(this.renderer.gl.BLEND);
	for(var i=0; i<this.objects.length;i++){
		if(this.objects[i].zTrans) this.objects[i].GLRender(this.renderer.gl);
	}
}

/**
* @class Sets the scene to render
* @param {GLGE.Scene} scene The scene to be rendered
*/
GLGE.Renderer=function(canvas){
	try{
	      this.gl = canvas.getContext("webkit-3d");
	    }catch(e){}
	if (!this.gl){
	      try
	      {
		this.gl = canvas.getContext("moz-webgl");
	      }catch(e){}
	}
	if (!this.gl)
	{
	alert("What, What Whaaat? No WebGL!");
	return false;
	}
	//set up defaults
	this.gl.clearDepth(1.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	//this.gl.enable(this.gl.SAMPLE_ALPHA_TO_COVERAGE);
    
	this.gl.depthFunc(this.gl.LEQUAL);
	this.gl.blendFuncSeparate(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA,this.gl.ZERO,this.gl.ONE);
	
	this.gl.enable(this.gl.CULL_FACE);
	
};
GLGE.Renderer.prototype.gl=null;
GLGE.Renderer.prototype.scene=null;
/**
* Gets the scene which is set to be rendered
* @returns the current render scene
*/
GLGE.Renderer.prototype.getScene=function(gcene){
	return this.scene;
};
/**
* Sets the scene to render
* @param {GLGE.Scene} scene The scene to be rendered
*/
GLGE.Renderer.prototype.setScene=function(scene){
	scene.renderer=this;
	this.scene=scene;
	scene.init();
};
/**
* Renders the current scene to the canvas
*/
GLGE.Renderer.prototype.render=function(){
	this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
	this.scene.render();
};


/**
* @class A texture to be included in a material
* @param {string} url the url of the image to use as the texture
* @see GLGE.Material
*/
GLGE.Texture=function(url){
	this.image=new Image();
	this.image.texture=this;
	this.image.onload = function(){
		this.texture.state=1;
	}	
	this.image.src=url;	
	this.state=0;
	this.glTexture=null;
}
GLGE.Texture.prototype.image=null;
GLGE.Texture.prototype.texture=null;
GLGE.Texture.prototype.glTexture=null;


/**
* @class The material layer describes how to apply this layer to the material
* @param {number} texture the texture index to apply to the layer
* @param {number} mapto how to map this layer on to the material see M_XXXXX constants
* @param {number} mapinput the UV layer to map to, UV1 or UV2
* @param {Object} scale how much scaling the texture eg {x: 10, y:10, z:1}
* @param {Object} offset how much to offset the texture eg {x: 10, y:10, z:1}
* @see GLGE.Material
* @augments GLGE.Animatable
*/
GLGE.MaterialLayer=function(texture,mapto,mapinput,scale,offset){
	this.texture=texture;
	this.mapinput=mapinput;
	this.uv=mapinput;
	this.mapto=mapto;
	if(scale){
		this.setScaleX(scale.x);
		this.setScaleY(scale.y);
		this.setScaleZ(scale.z);
	}
	if(offset){
		this.setOffsetX(offset.x);
		this.setOffsetY(offset.y);
		this.setOffsetZ(offset.z);
	}
	this.scale=scale;
	this.offset=offset;
};
GLGE.augment(GLGE.Animatable,GLGE.MaterialLayer);
GLGE.MaterialLayer.prototype.texture=null;
GLGE.MaterialLayer.prototype.mapto=GLGE.M_COLOR;
GLGE.MaterialLayer.prototype.mapinput=GLGE.UV1;
GLGE.MaterialLayer.prototype.scaleX=1;
GLGE.MaterialLayer.prototype.offsetX=0;
GLGE.MaterialLayer.prototype.scaleY=1;
GLGE.MaterialLayer.prototype.offsetY=0;
GLGE.MaterialLayer.prototype.scaleZ=1;
GLGE.MaterialLayer.prototype.offsetZ=0;
GLGE.MaterialLayer.prototype.dScaleX=0;
GLGE.MaterialLayer.prototype.dOffsetX=0;
GLGE.MaterialLayer.prototype.dScaleY=0;
GLGE.MaterialLayer.prototype.dOffsetY=0;
GLGE.MaterialLayer.prototype.dScaleZ=0;
GLGE.MaterialLayer.prototype.dOffsetZ=0;

/**
* Sets the textures used by the layer
* @param {GLGE.Texture} value the teture to associate with this layer
*/
GLGE.MaterialLayer.prototype.setTexture=function(value){
	this.texture=value;
};
/**
* Gets the textures used by the layer
* @return {GLGE.Texture} The current shininess of the material
*/
GLGE.MaterialLayer.prototype.getTexture=function(){
	return this.texture;
};
/**
* Sets the flag for how this layer maps to the material
* @param {Number} value the flags to set for this layer
*/
GLGE.MaterialLayer.prototype.setMapto=function(value){
	this.mapto=value;
};
/**
* Gets the flag representing the way the layer maps to the material
* @return {Number} The flags currently set for this layer
*/
GLGE.MaterialLayer.prototype.getMapto=function(){
	return this.mapto;
};
/**
* Sets the texture coordinate system
* @param {Number} value the mapping to use
*/
GLGE.MaterialLayer.prototype.setMapinput=function(value){
	this.mapinput=value;
};
/**
* Gets the texture coordinate system
* @return {Number} The current mapping
*/
GLGE.MaterialLayer.prototype.getMapinput=function(){
	return this.mapinput;
};

/**
* Gets the layers texture offset
* @return {object} the current offset
*/
GLGE.MaterialLayer.prototype.getOffset=function(){
	var offset={};
	offset.x=parseFloat(this.getOffsetX())+parseFloat(this.getDOffsetX());
	offset.y=parseFloat(this.getOffsetY())+parseFloat(this.getDOffsetY());
	offset.z=parseFloat(this.getOffsetZ())+parseFloat(this.getDOffsetZ());
	return offset;
};

/**
* Gets the layers texture scale
* @return {object} the current scale
*/
GLGE.MaterialLayer.prototype.getScale=function(){
	var scale={};
	scale.x=parseFloat(this.getScaleX())+parseFloat(this.getDScaleX());
	scale.y=parseFloat(this.getScaleY())+parseFloat(this.getDScaleY());
	scale.z=parseFloat(this.getScaleZ())+parseFloat(this.getDScaleZ());
	return scale;
};

/**
* Sets the layers texture X offset
* @param {Number} value the amount to offset the texture
*/
GLGE.MaterialLayer.prototype.setOffsetX=function(value){
	this.offsetX=value;
};
/**
* Gets the layers texture X offset
* @return {Number} the current offset
*/
GLGE.MaterialLayer.prototype.getOffsetX=function(){
	return this.offsetX;
};
/**
* Sets the layers texture Y offset
* @param {Number} value the amount to offset the texture
*/
GLGE.MaterialLayer.prototype.setOffsetY=function(value){
	this.offsetY=value;
};
/**
* Gets the layers texture Y offset
* @return {Number} the current offset
*/
GLGE.MaterialLayer.prototype.getOffsetY=function(){
	return this.offsetY;
};
/**
* Sets the layers texture Z offset
* @param {Number} value the amount to offset the texture
*/
GLGE.MaterialLayer.prototype.setOffsetZ=function(value){
	this.offsetZ=value;
};
/**
* Gets the layers texture Z offset
* @return {Number} the current offset
*/
GLGE.MaterialLayer.prototype.getOffsetZ=function(){
	return this.offsetZ;
};
/**
* Sets the layers texture X displacment offset, useful for animation
* @param {Number} value the amount to offset the texture
*/
GLGE.MaterialLayer.prototype.setDOffsetX=function(value){
	this.dOffsetX=value;
};
/**
* Gets the layers texture X displacment offset, useful for animation
* @return {Number} the current offset
*/
GLGE.MaterialLayer.prototype.getDOffsetX=function(){
	return this.dOffsetX;
};
/**
* Sets the layers texture Y displacment offset, useful for animation
* @param {Number} value the amount to offset the texture
*/
GLGE.MaterialLayer.prototype.setDOffsetY=function(value){
	this.dOffsetY=value;
};
/**
* Gets the layers texture Y displacment offset, useful for animation
* @return {Number} the current offset
*/
GLGE.MaterialLayer.prototype.getDOffsetY=function(){
	return this.dOffsetY;
};
/**
* Sets the layers texture Z displacment offset, useful for animation
* @param {Number} value the amount to offset the texture
*/
GLGE.MaterialLayer.prototype.setDOffsetZ=function(value){
	this.dOffsetZ=value;
};
/**
* Gets the layers texture X displacment offset, useful for animation
* @return {Number} the current offset
*/
GLGE.MaterialLayer.prototype.getDOffsetZ=function(){
	return this.dOffsetZ;
};
/**
* Sets the layers texture X scale
* @param {Number} value the amount to scale the texture
*/
GLGE.MaterialLayer.prototype.setScaleX=function(value){
	this.scaleX=value;
};
/**
* Gets the layers texture X scale
* @return {Number} the current scale
*/
GLGE.MaterialLayer.prototype.getScaleX=function(){
	return this.scaleX;
};
/**
* Sets the layers texture Y scale
* @param {Number} value the amount to scale the texture
*/
GLGE.MaterialLayer.prototype.setScaleY=function(value){
	this.scaleY=value;
};
/**
* Gets the layers texture Y scale
* @return {Number} the current scale
*/
GLGE.MaterialLayer.prototype.getScaleY=function(){
	return this.scaleY;
};
/**
* Sets the layers texture Z scale
* @param {Number} value the amount to scale the texture
*/
GLGE.MaterialLayer.prototype.setScaleZ=function(value){
	this.scaleZ=value;
};
/**
* Gets the layers texture Z offset
* @return {Number} the current offset
*/
GLGE.MaterialLayer.prototype.getScaleZ=function(){
	return this.scaleZ;
};
/**
* Sets the layers texture X displacment scale, useful for animation
* @param {Number} value the amount to scale the texture
*/
GLGE.MaterialLayer.prototype.setDScaleX=function(value){
	this.dScaleX=value;
};
/**
* Gets the layers texture X displacment scale, useful for animation
* @return {Number} the current scale
*/
GLGE.MaterialLayer.prototype.getDScaleX=function(){
	return this.dScaleX;
};
/**
* Sets the layers texture Y displacment scale, useful for animation
* @param {Number} value the amount to scale the texture
*/
GLGE.MaterialLayer.prototype.setDScaleY=function(value){
	this.dScaleY=value;
};
/**
* Gets the layers texture Y displacment scale, useful for animation
* @return {Number} the current scale
*/
GLGE.MaterialLayer.prototype.getDScaleY=function(){
	return this.dScaleY;
};
/**
* Sets the layers texture Z displacment scale, useful for animation
* @param {Number} value the amount to scale the texture
*/
GLGE.MaterialLayer.prototype.setDScaleZ=function(value){
	this.dScaleZ=value;
};
/**
* Gets the layers texture X displacment scale, useful for animation
* @return {Number} the current scale
*/
GLGE.MaterialLayer.prototype.getDScaleZ=function(){
	return this.dScaleZ;
};



/**
* @class The Material class creates materials to be applied to objects in the graphics engine
* @see GLGE.Object
* @augments GLGE.Animatable
*/
GLGE.Material=function(){
	this.layers=[];
	this.textures=[];
	this.lights=[];
	this.color={r:1,g:1,b:1,a:1};
	this.specColor={r:1,g:1,b:1};
	this.reflect=0.8;
	this.shine=50;
	this.specular=1;
	this.emit=0;
	this.alpha=1;
};
GLGE.augment(GLGE.Animatable,GLGE.Material);
/**
* @constant 
* @description Flag for material colour
*/
GLGE.M_COLOR=1; 
/**
* @constant 
* @description Flag for material normal
*/
GLGE.M_NOR=2;
/**
* @constant 
* @description Flag for material alpha
*/
GLGE.M_ALPHA=4; 
/**
* @constant 
* @description Flag for material specular color
*/
GLGE.M_SPECCOLOR=8; 
/**
* @constant 
* @description Flag for material specular cvalue
*/
GLGE.M_SPECULAR=16;
/**
* @constant 
* @description Flag for material shineiness
*/
GLGE.M_SHINE=32; 
/**
* @constant 
* @description Flag for material reflectivity
*/
GLGE.M_REFLECT=64;
/**
* @constant 
* @description Flag for material emision
*/
GLGE.M_EMIT=128;
/**
* @constant 
* @description Flag for material alpha
*/
GLGE.M_ALPHA=256;
/**
* @constant 
* @description Flag for masking with textures red value
*/
GLGE.M_MSKR=512;
/**
* @constant 
* @description Flag for masking with textures green value
*/
GLGE.M_MSKG=1024;
/**
* @constant 
* @description Flag for masking with textures blue value
*/
GLGE.M_MSKB=2048;
/**
* @constant 
* @description Flag for masking with textures alpha value
*/
GLGE.M_MSKA=4096;

/**
* @constant 
* @description Enumeration for first UV layer
*/
GLGE.UV1=0;
/**
* @constant 
* @description Enumeration for second UV layer
*/
GLGE.UV2=1;
	
GLGE.Material.prototype.layers=null;
GLGE.Material.prototype.textures=null;
GLGE.Material.prototype.color=null;
GLGE.Material.prototype.specColor=null;
GLGE.Material.prototype.specular=null;
GLGE.Material.prototype.emit=null;
GLGE.Material.prototype.shine=null;
GLGE.Material.prototype.reflect=null;
GLGE.Material.prototype.lights=null;
GLGE.Material.prototype.alpha=null;

/**
* Sets the base colour of the material
* @param {Number} r The new red level 0-1
* @param {Number} g The new green level 0-1
* @param {Number} b The new blue level 0-1
*/
GLGE.Material.prototype.setColor=function(r,g,b){
	this.color={r:r,g:g,b:b};
};
/**
* Gets the current base color of the material
* @return {[r,g,b]} The current base color
*/
GLGE.Material.prototype.getColor=function(){
	return this.color;
};
/**
* Sets the base specular colour of the material
* @param {Number} r The new red level 0-1
* @param {Number} g The new green level 0-1
* @param {Number} b The new blue level 0-1
*/
GLGE.Material.prototype.setSpecularColor=function(r,g,b){
	this.specColor={r:r,g:g,b:b};
};
/**
* Gets the current base specular color of the material
* @return {[r,g,b]} The current base specular color
*/
GLGE.Material.prototype.getSpecularColor=function(){
	return this.specColor;
};
/**
* Sets the alpha of the material
* @param {Number} value how much alpha
*/
GLGE.Material.prototype.setAlpha=function(value){
	this.alpha=value;
};
/**
* Gets the alpha of the material
* @return {Number} The current alpha of the material
*/
GLGE.Material.prototype.getAlpha=function(){
	return this.alpha;
};
/**
* Sets the specular of the material
* @param {Number} value how much specular
*/
GLGE.Material.prototype.setSpecular=function(value){
	this.specular=value;
};
/**
* Gets the specular of the material
* @return {Number} The current specular of the material
*/
GLGE.Material.prototype.getSpecular=function(){
	return this.specular;
};
/**
* Sets the shininess of the material
* @param {Number} value how much shine
*/
GLGE.Material.prototype.setShininess=function(value){
	this.shine=value;
};
/**
* Gets the shininess of the material
* @return {Number} The current shininess of the material
*/
GLGE.Material.prototype.getShininess=function(){
	return this.shine;
};
/**
* Sets how much the material should emit
* @param {Number} value how much to emit (0-1)
*/
GLGE.Material.prototype.setEmit=function(value){
	this.emit=value;
};
/**
* Gets the amount this material emits
* @return {Number} The emit value for the material
*/
GLGE.Material.prototype.getEmit=function(){
	return this.emit;
};
/**
* Sets reflectivity of the material
* @param {Number} value how much to reflect (0-1)
*/
GLGE.Material.prototype.setReflectivity=function(value){
	this.reflect=value;
};
/**
* Gets the materials reflectivity
* @return {Number} The reflectivity of the material
*/
GLGE.Material.prototype.getReflectivity=function(){
	return this.reflect;
};

/**
* Add a new layer to the material
* @param {MaterialLayer} layer The material layer to add to the material
* @returns {Number} index of the added layer
*/
GLGE.Material.prototype.addMaterialLayer=function(layer){
	this.layers.push(layer);
	return this.layers.length-1;
};
/**
* Gets all the materials layers
* @returns {GLGE.MaterialLayer[]} all of the layers contained within this material
*/
GLGE.Material.prototype.getLayers=function(){
	return this.layers;
};
/**
* Generate the fragment shader program for this material
* @private
*/
GLGE.Material.prototype.getFragmentShader=function(lights,ambiantColor){
	var shader="";
	
	for(var i=0; i<lights.length;i++){
		if(lights[i].type==GLGE.L_POINT || lights[i].type==GLGE.L_SPOT || lights[i].type==GLGE.L_DIR){
			shader=shader+"varying vec3 lightvec"+i+";\n"; 
			shader=shader+"varying float lightdist"+i+";\n";  
		}
	}
	shader=shader+"varying vec3 n;\n";  
	shader=shader+"varying vec4 UVCoord;\n";
	shader=shader+"varying vec3 eyevec;\n"; 

	//texture uniforms
	for(var i=0; i<this.textures.length;i++){
		shader=shader+"uniform sampler2D TEXTURE"+i+";\n";
	}
	for(var i=0; i<lights.length;i++){
			shader=shader+"uniform vec3 lightcolor"+i+";\n";  
			shader=shader+"uniform vec3 lightAttenuation"+i+";\n";  
			shader=shader+"uniform float spotCosCutOff"+i+";\n";  
			shader=shader+"uniform float spotExp"+i+";\n";  
			shader=shader+"uniform vec3 lightdir"+i+";\n";  
	}
	for(i=0; i<this.layers.length;i++){
		shader=shader+"uniform vec3 layer"+i+"Scale;\n";  
		shader=shader+"uniform vec3 layer"+i+"Offset;\n";  
	}
	
	shader=shader+"uniform vec4 baseColor;\n";
	shader=shader+"uniform vec3 specColor;\n";
	shader=shader+"uniform float shine;\n";
	shader=shader+"uniform float specular;\n";
	shader=shader+"uniform float reflect;\n";
	shader=shader+"uniform float emit;\n";
	shader=shader+"uniform float alpha;\n";
    
	shader=shader+"void main(void)\n";
	shader=shader+"{\n";
	shader=shader+"float att;\n"; 
	shader=shader+"int texture;\n"; 
	shader=shader+"float mask=1.0;\n";
	shader=shader+"float spec=specular;\n"; 
	shader=shader+"vec3 specC=specColor;\n"; 
	shader=shader+"float ref=reflect;\n";
	shader=shader+"float sh=shine;\n"; 
	shader=shader+"float em=emit;\n"; 
	shader=shader+"float al=alpha;\n"; 
	shader=shader+"vec4 normalmap=vec4(0.5,0.5,0.5,0.5);\n"
	shader=shader+"vec4 color = baseColor;"; //set the initial color
	for(i=0; i<this.layers.length;i++){
		if((this.layers[i].mapto & GLGE.M_COLOR) == GLGE.M_COLOR){
			shader=shader+"color = color*(1.0-mask) + texture2D(TEXTURE"+this.layers[i].texture.idx+", vec2((UVCoord["+(this.layers[i].mapinput*2)+"]+layer"+i+"Offset[0])*layer"+i+"Scale[0],(1.0-UVCoord["+(this.layers[i].mapinput*2+1)+"]+layer"+i+"Offset[1])*layer"+i+"Scale[1]))*mask;\n";
		}        
		if((this.layers[i].mapto & GLGE.M_SPECCOLOR) == GLGE.M_SPECCOLOR){
			shader=shader+"specC = specC*(1.0-mask) + texture2D(TEXTURE"+this.layers[i].texture.idx+", vec2((UVCoord["+(this.layers[i].mapinput*2)+"]+layer"+i+"Offset[0])*layer"+i+"Scale[0],(1.0-UVCoord["+(this.layers[i].mapinput*2+1)+"]+layer"+i+"Offset[1])*layer"+i+"Scale[1])).rgb*mask;\n";
		}
		if((this.layers[i].mapto & GLGE.M_MSKR) == GLGE.M_MSKR){
			shader=shader+"mask = texture2D(TEXTURE"+this.layers[i].texture.idx+", vec2((UVCoord["+(this.layers[i].mapinput*2)+"]+layer"+i+"Offset[0])*layer"+i+"Scale[0],(1.0-UVCoord["+(this.layers[i].mapinput*2+1)+"]+layer"+i+"Offset[1])*layer"+i+"Scale[1])).r;\n";
		}
		if((this.layers[i].mapto & GLGE.M_MSKG) == GLGE.M_MSKG){
			shader=shader+"mask = texture2D(TEXTURE"+this.layers[i].texture.idx+", vec2((UVCoord["+(this.layers[i].mapinput*2)+"]+layer"+i+"Offset[0])*layer"+i+"Scale[0],(1.0-UVCoord["+(this.layers[i].mapinput*2+1)+"]+layer"+i+"Offset[1])*layer"+i+"Scale[1])).g;\n";
		}
		if((this.layers[i].mapto & GLGE.M_MSKG) == GLGE.M_MSKB){
			shader=shader+"mask = texture2D(TEXTURE"+this.layers[i].texture.idx+", vec2((UVCoord["+(this.layers[i].mapinput*2)+"]+layer"+i+"Offset[0])*layer"+i+"Scale[0],(1.0-UVCoord["+(this.layers[i].mapinput*2+1)+"]+layer"+i+"Offset[1])*layer"+i+"Scale[1])).b;\n";
		}
		if((this.layers[i].mapto & GLGE.M_MSKG) == GLGE.M_MSKA){
			shader=shader+"mask = texture2D(TEXTURE"+this.layers[i].texture.idx+", vec2((UVCoord["+(this.layers[i].mapinput*2)+"]+layer"+i+"Offset[0])*layer"+i+"Scale[0],(1.0-UVCoord["+(this.layers[i].mapinput*2+1)+"]+layer"+i+"Offset[1])*layer"+i+"Scale[1])).a;\n";
		}
		if((this.layers[i].mapto & GLGE.M_SPECULAR) == GLGE.M_SPECULAR){
			shader=shader+"spec = spec*(1.0-mask) + texture2D(TEXTURE"+this.layers[i].texture.idx+", vec2((UVCoord["+(this.layers[i].mapinput*2)+"]+layer"+i+"Offset[0])*layer"+i+"Scale[0],(1.0-UVCoord["+(this.layers[i].mapinput*2+1)+"]+layer"+i+"Offset[1])*layer"+i+"Scale[1])).r*mask*10.0;\n";
		}
		if((this.layers[i].mapto & GLGE.M_REFLECT) == GLGE.M_REFLECT){
			shader=shader+"ref = ref*(1.0-mask) + texture2D(TEXTURE"+this.layers[i].texture.idx+", vec2((UVCoord["+(this.layers[i].mapinput*2)+"]+layer"+i+"Offset[0])*layer"+i+"Scale[0],(1.0-UVCoord["+(this.layers[i].mapinput*2+1)+"]+layer"+i+"Offset[1])*layer"+i+"Scale[1])).g*mask;\n";
		}
		if((this.layers[i].mapto & GLGE.M_SHINE) == GLGE.M_SHINE){
			shader=shader+"sh = sh*(1.0-mask) + texture2D(TEXTURE"+this.layers[i].texture.idx+", vec2((UVCoord["+(this.layers[i].mapinput*2)+"]+layer"+i+"Offset[0])*layer"+i+"Scale[0],(1.0-UVCoord["+(this.layers[i].mapinput*2+1)+"]+layer"+i+"Offset[1])*layer"+i+"Scale[1])).b*mask*512.0;\n";
		}
		if((this.layers[i].mapto & GLGE.M_EMIT) == GLGE.M_EMIT){
			shader=shader+"em = em*(1.0-mask) + texture2D(TEXTURE"+this.layers[i].texture.idx+", vec2((UVCoord["+(this.layers[i].mapinput*2)+"]+layer"+i+"Offset[0])*layer"+i+"Scale[0],(1.0-UVCoord["+(this.layers[i].mapinput*2+1)+"]+layer"+i+"Offset[1])*layer"+i+"Scale[1])).r*mask;\n";
		}
		if((this.layers[i].mapto & GLGE.M_NOR) == GLGE.M_NOR){
			shader=shader+"normalmap = normalmap*(1.0-mask) + texture2D(TEXTURE"+this.layers[i].texture.idx+", vec2((UVCoord["+(this.layers[i].mapinput*2)+"]+layer"+i+"Offset[0])*layer"+i+"Scale[0],(1.0-UVCoord["+(this.layers[i].mapinput*2+1)+"]+layer"+i+"Offset[1])*layer"+i+"Scale[1]))*mask;\n";
		}
		if((this.layers[i].mapto & GLGE.M_ALPHA) == GLGE.M_ALPHA){
			shader=shader+"al = al*(1.0-mask) + texture2D(TEXTURE"+this.layers[i].texture.idx+", vec2((UVCoord["+(this.layers[i].mapinput*2)+"]+layer"+i+"Offset[0])*layer"+i+"Scale[0],(1.0-UVCoord["+(this.layers[i].mapinput*2+1)+"]+layer"+i+"Offset[1])*layer"+i+"Scale[1])).a*mask;\n";
		}
	}
	shader=shader+"normalmap=(normalmap-vec4(0.5,0.5,0.5,0.5))*vec4(2.0,2.0,0.0,0.0);\n";
	shader=shader+"vec3 normal = normalize(n+normalmap.rgb);\n";
	shader=shader+"vec3 lightvalue=vec3(0.0,0.0,0.0);\n"; 
	shader=shader+"vec3 specvalue=vec3(0.0,0.0,0.0);\n"; 
	shader=shader+"float dotN,spotEffect;";
	for(var i=0; i<lights.length;i++){
		if(lights[i].type==GLGE.L_POINT){
			shader=shader+"dotN=max(dot(normal,normalize(lightvec"+i+")),0.0);\n";       
			//shader=shader+"if(dotN>0.0){\n";
			shader=shader+"att = 1 / (lightAttenuation"+i+"[0] + lightAttenuation"+i+"[1] * lightdist"+i+" + lightAttenuation"+i+"[2] * lightdist"+i+" * lightdist"+i+");\n";
			if(lights[i].diffuse){
				shader=shader+"lightvalue += att * dotN * lightcolor"+i+";\n";
			}
			if(lights[i].specular){
				shader=shader+"specvalue += att * specC * lightcolor"+i+" * spec  * pow(max(dot(normal,normalize(eyevec)),0.0), sh);\n";
			}
			//shader=shader+"}\n";
		}
		shader=shader+"spotEffect = 0.0;\n";
		if(lights[i].type==GLGE.L_SPOT){
			shader=shader+"spotEffect = dot(normalize(lightdir"+i+"), normalize(-lightvec"+i+"));";
			shader=shader+"if (spotEffect > spotCosCutOff"+i+") {\n";
			shader=shader+"spotEffect = pow(spotEffect, spotExp"+i+");";
			shader=shader+"dotN=max(dot(normal,normalize(lightvec"+i+")),0.0);\n";       
			shader=shader+"if(dotN>0.0){\n";
			shader=shader+"att = spotEffect / (lightAttenuation"+i+"[0] + lightAttenuation"+i+"[1] * lightdist"+i+" + lightAttenuation"+i+"[2] * lightdist"+i+" * lightdist"+i+");\n";
			if(lights[i].diffuse){
				shader=shader+"lightvalue += att * dotN * lightcolor"+i+";\n";
			}
			if(lights[i].specular){
				shader=shader+"specvalue += att * specC * lightcolor"+i+" * spec  * pow(max(dot(normal,normalize(eyevec)),0.0), sh);\n";
			}
			shader=shader+"}\n}\n";
		}
		if(lights[i].type==GLGE.L_DIR){
			shader=shader+"dotN=max(dot(normal,normalize(-lightdir"+i+")),0.0);\n";       
			if(lights[i].diffuse){
				shader=shader+"lightvalue += dotN * lightcolor"+i+";\n";
			}
			if(lights[i].specular){
				shader=shader+"specvalue += specC * lightcolor"+i+" * spec  * pow(max(dot(normal,normalize(eyevec)),0.0), sh);\n";
			}
		}
	}
		
	shader=shader+"lightvalue *= ref;\n"
	shader=shader+"gl_FragColor = vec4(specvalue,0.0)+vec4(color.r*em+(color.r*lightvalue.r*(1.0-em)),color.g*em+(color.g*lightvalue.g*(1.0-em)),color.b*em+(color.b*lightvalue.b*(1.0-em)),al);\n";
	//shader=shader+"gl_FragColor = vec4(normal,al);\n";
	shader=shader+"}\n";
	return shader;
};
/**
* Set the uniforms needed to render this material
* @private
*/
GLGE.Material.prototype.textureUniforms=function(gl,shaderProgram,lights){
	if(this.animation) this.animate();
	gl.uniform4f(gl.getUniformLocation(shaderProgram, "baseColor"), this.color.r,this.color.g,this.color.b,this.color.a);
	gl.uniform3f(gl.getUniformLocation(shaderProgram, "specColor"), this.specColor.r,this.specColor.g,this.specColor.b);
	gl.uniform1f(gl.getUniformLocation(shaderProgram, "specular"), this.specular);
	gl.uniform1f(gl.getUniformLocation(shaderProgram, "shine"), this.shine);
	gl.uniform1f(gl.getUniformLocation(shaderProgram, "reflect"), this.reflect);
	gl.uniform1f(gl.getUniformLocation(shaderProgram, "emit"), this.emit);
	gl.uniform1f(gl.getUniformLocation(shaderProgram, "alpha"), this.alpha);
	for(var i=0; i<lights.length;i++){
		    gl.uniform3f(gl.getUniformLocation(shaderProgram, "lightcolor"+i), lights[i].color.r,lights[i].color.g,lights[i].color.b);
		    gl.uniform3f(gl.getUniformLocation(shaderProgram, "lightAttenuation"+i), lights[i].constantAttenuation,lights[i].linearAttenuation,lights[i].quadraticAttenuation);
		    gl.uniform1f(gl.getUniformLocation(shaderProgram, "spotCosCutOff"+i), lights[i].spotCosCutOff);
		    gl.uniform1f(gl.getUniformLocation(shaderProgram, "spotExp"+i), lights[i].spotExponent);
	}
	
	var scale,offset;
	for(i=0; i<this.layers.length;i++){
		if(this.layers[i].animation) this.layers[i].animate();
		scale=this.layers[i].getScale();
		offset=this.layers[i].getOffset();
		gl.uniform3f(gl.getUniformLocation(shaderProgram, "layer"+i+"Scale"), scale.x,scale.y,scale.z);
		gl.uniform3f(gl.getUniformLocation(shaderProgram, "layer"+i+"Offset"), offset.x,offset.y,offset.z);
	}
    
	for(var i=0; i<this.textures.length;i++){
		gl.activeTexture(gl["TEXTURE"+i]);
		//create the texture if it's not already created
		if(!this.textures[i].glTexture) this.textures[i].glTexture=gl.createTexture();
		//if the image is loaded then set in the texture data
		if(this.textures[i].state==1){
			gl.bindTexture(gl.TEXTURE_2D, this.textures[i].glTexture);
			gl.texImage2D(gl.TEXTURE_2D, 0, this.textures[i].image);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
			gl.generateMipmap(gl.TEXTURE_2D);
			gl.bindTexture(gl.TEXTURE_2D, null);
			this.textures[i].state=2;
		}
		gl.bindTexture(gl.TEXTURE_2D, this.textures[i].glTexture);
		gl.uniform1i(gl.getUniformLocation(shaderProgram, "TEXTURE"+i), i);
	}
};
/**
* Adds a new texture to this material
* @param {String} image URL of the image to be used by the texture
* @return {Number} index of the new texture
*/
GLGE.Material.prototype.addTexture=function(texture){	
	this.textures.push(texture);
	texture.idx=this.textures.length-1;
	return texture;
};
})(GLGE);


