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



 if(!GLGE){
	/**
	* @namespace Holds the functionality of the library
	*/
	var GLGE={};
}

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
* @constant 
* @description Enumeration for rendering using default shader
*/
GLGE.RENDER_DEFAULT=0;

/**
* @constant 
* @description Enumeration for rendering using shadow shader
*/
GLGE.RENDER_SHADOW=1;

/**
* @constant 
* @description Enumeration for rendering using pick shader
*/
GLGE.RENDER_PICK=2;

/**
* @constant 
* @description Enumeration for box bound text picking
*/
GLGE.TEXT_BOXPICK=1;
/**
* @constant 
* @description Enumeration for text bound text picking
*/
GLGE.TEXT_TEXTPICK=1;

/**
* @constant 
* @description Enumeration for euler rotaions mode
*/
GLGE.P_EULER=1;

/**
* @constant 
* @description Enumeration for quaternions mode
*/
GLGE.P_QUAT=2;

/**
* @constant 
* @description Enumeration for matrix rotation mode
*/
GLGE.P_MATRIX=3;


/**
* @namespace Holds the global asset store
*/
GLGE.Assets={};
GLGE.Assets.assets={};
 
GLGE.Assets.createUUID=function(){
	var data=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F"];
	var data2=["8","9","A","B"];
	uuid="";
	for(var i=0;i<38;i++){
		switch(i){
			case 8:uuid=uuid+"-";break;
			case 13:uuid=uuid+"-";break;
			case 18:uuid=uuid+"-";break;
			case 14:uuid=uuid+"4";break;
			case 19:uuid=uuid+data2[Math.round(Math.random()*3)];break;
			default:uuid=uuid+data[Math.round(Math.random()*15)];break;
		}
	}
	return uuid;
}
/**
* @function registers a new asset
*/
GLGE.Assets.registerAsset=function(obj,uid){
	if(!uid){
		uid=GLGE.Assets.createUUID();
	};
	obj.uid=uid;
	GLGE.Assets.assets[uid]=obj;
}
/**
* @function removes an asset
*/
GLGE.Assets.unregisterAsset=function(uid){
	delete GLGE.Assets.assets[uid];
}
/**
* @function finds an asset by uid
*/
GLGE.Assets.get=function(uuid){
	var value=GLGE.Assets.assets[uid];
	if(value){
		return value;
	}else{
		return false;
	}
}

/**
* function to cache the uniform locations
* @param {glcontext} the gl context of the program
* @param {program} the shader program
* @param {string} the uniform name
* @private
*/
GLGE.getUniformLocation=function(gl,program, uniform){
	if(!program.uniformCache) program.uniformCache={};
	if(!program.uniformCache[uniform]){
		program.uniformCache[uniform]=gl.getUniformLocation(program, uniform);
	}
	return program.uniformCache[uniform];
};
/**
* function to cache the attribute locations
* @param {glcontext} the gl context of the program
* @param {program} the shader program
* @param {string} the attribe name
* @private
*/
GLGE.getAttribLocation=function(gl,program, attrib){
	if(!program.attribCache) program.attribCache={};
	if(!program.attribCache[attrib]){
		program.attribCache[attrib]=gl.getAttribLocation(program, attrib);
	}
	return program.attribCache[attrib];
}

/**
* function to parse a colour input into RGB eg #ff00ff, red, rgb(100,100,100)
* @param {string} color the color to parse
*/
GLGE.colorParse=function(color){
	var red,green,blue;
	//defines the color names
	var color_names = {
		aliceblue: 'f0f8ff',		antiquewhite: 'faebd7',	aqua: '00ffff',
		aquamarine: '7fffd4',	azure: 'f0ffff',		beige: 'f5f5dc',
		bisque: 'ffe4c4',		black: '000000',		blanchedalmond: 'ffebcd',
		blue: '0000ff',			blueviolet: '8a2be2',	brown: 'a52a2a',
		burlywood: 'deb887',	cadetblue: '5f9ea0',		chartreuse: '7fff00',
		chocolate: 'd2691e',		coral: 'ff7f50',		cornflowerblue: '6495ed',
		cornsilk: 'fff8dc',		crimson: 'dc143c',		cyan: '00ffff',
		darkblue: '00008b',		darkcyan: '008b8b',		darkgoldenrod: 'b8860b',
		darkgray: 'a9a9a9',		darkgreen: '006400',	darkkhaki: 'bdb76b',
		darkmagenta: '8b008b',	darkolivegreen: '556b2f',	darkorange: 'ff8c00',
		darkorchid: '9932cc',	darkred: '8b0000',		darksalmon: 'e9967a',
		darkseagreen: '8fbc8f',	darkslateblue: '483d8b',	darkslategray: '2f4f4f',
		darkturquoise: '00ced1',	darkviolet: '9400d3',	deeppink: 'ff1493',
		deepskyblue: '00bfff',	dimgray: '696969',		dodgerblue: '1e90ff',
		feldspar: 'd19275',		firebrick: 'b22222',		floralwhite: 'fffaf0',
		forestgreen: '228b22',	fuchsia: 'ff00ff',		gainsboro: 'dcdcdc',
		ghostwhite: 'f8f8ff',		gold: 'ffd700',			goldenrod: 'daa520',
		gray: '808080',		green: '008000',		greenyellow: 'adff2f',
		honeydew: 'f0fff0',		hotpink: 'ff69b4',		indianred : 'cd5c5c',
		indigo : '4b0082',		ivory: 'fffff0',		khaki: 'f0e68c',
		lavender: 'e6e6fa',		lavenderblush: 'fff0f5',	lawngreen: '7cfc00',
		lemonchiffon: 'fffacd',	lightblue: 'add8e6',		lightcoral: 'f08080',
		lightcyan: 'e0ffff',		lightgoldenrodyellow: 'fafad2',	lightgrey: 'd3d3d3',
		lightgreen: '90ee90',	lightpink: 'ffb6c1',		lightsalmon: 'ffa07a',
		lightseagreen: '20b2aa',	lightskyblue: '87cefa',	lightslateblue: '8470ff',
		lightslategray: '778899',	lightsteelblue: 'b0c4de',	lightyellow: 'ffffe0',
		lime: '00ff00',			limegreen: '32cd32',	linen: 'faf0e6',
		magenta: 'ff00ff',		maroon: '800000',		mediumaquamarine: '66cdaa',
		mediumblue: '0000cd',	mediumorchid: 'ba55d3',	mediumpurple: '9370d8',
		mediumseagreen: '3cb371',	mediumslateblue: '7b68ee',	mediumspringgreen: '00fa9a',
		mediumturquoise: '48d1cc',	mediumvioletred: 'c71585',	midnightblue: '191970',
		mintcream: 'f5fffa',	mistyrose: 'ffe4e1',		moccasin: 'ffe4b5',
		navajowhite: 'ffdead',	navy: '000080',		oldlace: 'fdf5e6',
		olive: '808000',		olivedrab: '6b8e23',		orange: 'ffa500',
		orangered: 'ff4500',	orchid: 'da70d6',		palegoldenrod: 'eee8aa',
		palegreen: '98fb98',		paleturquoise: 'afeeee',	palevioletred: 'd87093',
		papayawhip: 'ffefd5',	peachpuff: 'ffdab9',		peru: 'cd853f',
		pink: 'ffc0cb',		plum: 'dda0dd',		powderblue: 'b0e0e6',
		purple: '800080',		red: 'ff0000',		rosybrown: 'bc8f8f',
		royalblue: '4169e1',		saddlebrown: '8b4513',	salmon: 'fa8072',
		sandybrown: 'f4a460',	seagreen: '2e8b57',		seashell: 'fff5ee',
		sienna: 'a0522d',		silver: 'c0c0c0',		skyblue: '87ceeb',
		slateblue: '6a5acd',		slategray: '708090',	snow: 'fffafa',
		springgreen: '00ff7f',	steelblue: '4682b4',		tan: 'd2b48c',
		teal: '008080',		thistle: 'd8bfd8',		tomato: 'ff6347',
		turquoise: '40e0d0',		violet: 'ee82ee',		violetred: 'd02090',
		wheat: 'f5deb3',		white: 'ffffff',		whitesmoke: 'f5f5f5',
		yellow: 'ffff00',		yellowgreen: '9acd32'
	};
	if(color_names[color]) color="#"+color_names[color];
	if(color.substr && color.substr(0,1)=="#"){
		color=color.substr(1);
		if(color.length==6){
			red=parseInt("0x"+color.substr(0,2))/255;
			green=parseInt("0x"+color.substr(2,2))/255;
			blue=parseInt("0x"+color.substr(4,2))/255;
		}
		else if(color.length==3){
			red=parseInt("0x"+color.substr(0,1))/15;
			green=parseInt("0x"+color.substr(1,1))/15;
			blue=parseInt("0x"+color.substr(2,1))/15;
		}
	}else if(color.substr && color.substr(0,4)=="rgb("){
		var colors=color.substr(4).split(",");
		red=parseInt(colors[0])/255;
		green=parseInt(colors[1])/255;
		blue=parseInt(colors[2])/255;
	}
	else
	{
		red=0;
		green=0;
		blue=0;
	}
	return {r:red,g:green,b:blue};
}


/**
* @class Document class to load scene, object, mesh etc from an external XML file 
* @param {string} url URL of the resource to load
*/
GLGE.Document=function(){
	this.listeners=[];
	this.documents=[];
}
GLGE.Document.prototype.listeners=null;
GLGE.Document.prototype.documents=null;
GLGE.Document.prototype.rootURL=null;
GLGE.Document.prototype.loadCount=0;
/**
* This is just a fix for a bug in webkit
* @param {string} id the id name to get
* @returns {object} node with teh specified id
* @private
*/
GLGE.Document.prototype.getElementById=function(id){
	var tags=this.getElementsByTagName("*");
	for(var i=0; i<tags.length;i++){
		if(tags[i].getAttribute("id")==id){
			return tags[i];
			break;
		}
	}
	return null;
}
/**
* Gets the absolute path given an import path and the path it's relative to
* @param {string} path the path to get the absolute path for
* @param {string} relativeto the path the supplied path is relativeto
* @returns {string} absolute path
* @private
*/
GLGE.Document.prototype.getAbsolutePath=function(path,relativeto){
	if(path.substr(0,7)=="http://" || path.substr(0,7)=="file://"  || path.substr(0,7)=="https://"){
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
		var proto=bits[0];
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
		return proto+"//"+domain+"/"+initpath.join("/");
	}
}
/**
* Loads the root document
* @param {string} url URL of the resource to load
*/
GLGE.Document.prototype.load=function(url){
	this.documents=[];
	this.rootURL=url;
	this.loadDocument(url,null);
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
				if(this.status  == 200 || this.status==0){
					this.responseXML.getElementById=this.docObj.getElementById;
					this.docObj.loaded(this.docurl,this.responseXML);
				}else{ 
					GLGE.error("Error loading Document: "+this.docurl+" status "+this.status);
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
		value=false;
		set_method="set"+this.classString(Obj.attributes[i].nodeName);
		if(Obj.attributes[i].value[0]=="#"){
			value=this.getElement(Obj.attributes[i].value.substr(1),true);
		}
		if(!value){
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
GLGE.Document.prototype.getElement=function(ele,noerrors){
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
		if(!noerrors) GLGE.error("Element "+ele+" not found in document");
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
	var i;
	while(child){
		currentArray=(prev+child.nodeValue).split(",");
		child=child.nextSibling;
		if(currentArray[0]=="") currentArray.unshift();
		if(child) prev=currentArray.pop();
		for(i=0;i<currentArray.length;i++) output.push(currentArray[i]);
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
				case "uv2":
					ele.object.setUV2(this.parseArray(child));
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
					linears=child.getElementsByTagName("linear_point");
					for(var i=0; i<linears.length;i++){
						point=linears[i].firstChild.nodeValue.split(",");
						curve.addPoint(new GLGE.LinearPoint(point[0],point[1]));
					}
					linears=child.getElementsByTagName("step_point");
					for(var i=0; i<linears.length;i++){
						point=linears[i].firstChild.nodeValue.split(",");
						//replace with objects 
						if(point[1][0]=="#"){
							point[1]=this.getElement(point[1].substr(1),true);
						}
						curve.addPoint(new GLGE.StepPoint(point[0],point[1]));
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
GLGE.Placeable.prototype.quatX=0;
GLGE.Placeable.prototype.quatY=0;
GLGE.Placeable.prototype.quatZ=0;
GLGE.Placeable.prototype.quatW=0;
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
GLGE.Placeable.prototype.rotOrder=GLGE.ROT_XYZ;
GLGE.Placeable.prototype.lookAt=null;
GLGE.Placeable.prototype.mode=GLGE.P_EULER;
/**
* Gets the root node object
* @returns {object}
*/
GLGE.Placeable.prototype.getRoot=function(){
	if(this.type==GLGE.G_ROOT){
		return this;
	}else if(this.parent){
		var value=this.parent.getRoot();
		if(!value) return this;
			else return value;
	}else{
		return this;
	}
}
/**
* Gets the id string of this text
* @returns {string}
*/
GLGE.Placeable.prototype.getRef=function(){
	if(this.id){
		return this.id;
	}else if(this.parent){
		return this.parent.getRef();
	}else{
		return null;
	}
}
/**
* Sets the id string
* @param {string} id The id string 
*/
GLGE.Placeable.prototype.setId=function(id){
    this.id=id;
}
/**
* Gets the id string of this text
* @returns {string}
*/
GLGE.Placeable.prototype.getId=function(){
	return this.id
}
/**
* gets the object or poisition being looking at
* @param {array|object} value the location/object
*/
GLGE.Placeable.prototype.getLookat=function(){
	return this.lookAt;
}
/**
* sets the look at for this object, will be updated every frame
* @param {array|object} value the location/objec to look at
*/
GLGE.Placeable.prototype.setLookat=function(value){
	this.lookAt=value;
}
/**
* Points the object in the direction of the coords or placeable value
* @param {array|object} value the location/objec to look at
*/
GLGE.Placeable.prototype.Lookat=function(value){
	var objpos;
	var pos=this.getPosition();
	if(value.getPosition){
		objpos=value.getPosition();
	}else{
		objpos={x:value[0],y:value[1],z:value[2]};
	}
	
	var coord=new GLGE.Vec([pos.x-objpos.x,pos.y-objpos.y,pos.z-objpos.z]);
	var zvec=coord.toUnitVector();
	var xvec=(new GLGE.Vec([0,0,1])).cross(zvec).toUnitVector();
	var yvec=zvec.cross(xvec).toUnitVector();		
	this.setRotMatrix(new GLGE.Mat([xvec.e(1), yvec.e(1), zvec.e(1), 0,
					xvec.e(2), yvec.e(2), zvec.e(2), 0,
					xvec.e(3), yvec.e(3), zvec.e(3), 0,
					0, 0, 0, 1]));
}
/**
* Gets the euler rotation order
* @returns {number} the objects rotation matrix
*/
GLGE.Placeable.prototype.getRotOrder=function(){
	return this.rotOrder;
}
/**
* Sets the euler rotation order
* @param {number} value the order to rotate GLGE.ROT_XYZ,GLGE.ROT_XZY,etc..
*/
GLGE.Placeable.prototype.setRotOrder=function(value){
	this.rotOrder=value;
	this.matrix=null;
	this.rotmatrix=null;
}
/**
* Gets the rotaion matrix 
* @returns {matrix} the objects rotation matrix
*/
GLGE.Placeable.prototype.getRotMatrix=function(){
	if(!this.rotmatrix){
		var rotation=this.getRotation();
		if(this.mode==GLGE.P_EULER) this.rotmatrix=GLGE.rotateMatrix(rotation.x,rotation.y,rotation.z,this.rotOrder);
		if(this.mode==GLGE.P_QUAT) this.rotmatrix=GLGE.quatRotation(rotation.x,rotation.y,rotation.z,rotation.w);
	}
	return this.rotmatrix;
}
/**
* Sets the rotation matrix 
* @param {matrix} the objects rotation matrix
*/
GLGE.Placeable.prototype.setRotMatrix=function(matrix){
	this.mode=GLGE.P_MATRIX;
	this.matrix=null;
	this.rotmatrix=matrix;
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
* Sets the x quat value
* @param {number} value the x quat value
*/
GLGE.Placeable.prototype.setQuatX=function(value){this.mode=GLGE.P_QUAT;this.quatX=value;this.updateMatrix();this.rotmatrix=null;}
/**
* Sets the y quat value
* @param {number} value the y quat value
*/
GLGE.Placeable.prototype.setQuatY=function(value){this.mode=GLGE.P_QUAT;this.quatY=value;this.updateMatrix();this.rotmatrix=null;}
/**
* Sets the z quat value
* @param {number} value the z quat value
*/
GLGE.Placeable.prototype.setQuatZ=function(value){this.mode=GLGE.P_QUAT;this.quatZ=value;this.updateMatrix();this.rotmatrix=null;}
/**
* Sets the w quat value
* @param {number} value the w quat value
*/
GLGE.Placeable.prototype.setQuatW=function(value){this.mode=GLGE.P_QUAT;this.quatW=value;this.updateMatrix();this.rotmatrix=null;}
/**
* Sets the quaternions
* @param {number} x The value to assign to the x 
* @param {number} y The value to assign to the y 
* @param {number} z The value to assign to the z 
* @param {number} w The value to assign to the w
*/
GLGE.Placeable.prototype.setQuat=function(x,y,z,w){this.mode=GLGE.P_QUAT;this.quatX=x;this.quatY=y;this.quatZ=z;this.quatW=w;this.updateMatrix();this.rotmatrix=null;}

/**
* Sets the x rotation of the object
* @param {number} value The value to assign to the x rotation
*/
GLGE.Placeable.prototype.setRotX=function(value){this.mode=GLGE.P_EULER;this.rotX=value;this.updateMatrix();this.rotmatrix=null;}
/**
* Sets the y rotation of the object
* @param {number} value The value to assign to the y rotation
*/
GLGE.Placeable.prototype.setRotY=function(value){this.mode=GLGE.P_EULER;this.rotY=value;this.updateMatrix();this.rotmatrix=null;}
/**
* Sets the z rotation of the object
* @param {number} value The value to assign to the z rotation
*/
GLGE.Placeable.prototype.setRotZ=function(value){this.mode=GLGE.P_EULER;this.rotZ=value;this.updateMatrix();this.rotmatrix=null;}
/**
* Sets the rotation of the object
* @param {number} x The value to assign to the x rotation
* @param {number} y The value to assign to the y rotation
* @param {number} z The value to assign to the z rotation
*/
GLGE.Placeable.prototype.setRot=function(x,y,z){this.mode=GLGE.P_EULER;this.rotX=x;this.rotY=y;this.rotZ=z;this.updateMatrix();this.rotmatrix=null;}
/**
* Sets the x rotation displacement of the object, usefull for animation
* @param {number} value The value to assign to the x displacement
*/
GLGE.Placeable.prototype.setDRotX=function(value){this.mode=GLGE.P_EULER;this.dRotX=value;this.updateMatrix();this.rotmatrix=null;}
/**
* Sets the y rotation displacement of the object, usefull for animation
* @param {number} value The value to assign to the y displacement
*/
GLGE.Placeable.prototype.setDRotY=function(value){this.mode=GLGE.P_EULER;this.dRotY=value;this.updateMatrix();this.rotmatrix=null;}
/**
* Sets the z rotation displacement of the object, usefull for animation
* @param {number} value The value to assign to the z displacement
*/
GLGE.Placeable.prototype.setDRotZ=function(value){this.mode=GLGE.P_EULER;this.dRotZ=value;this.updateMatrix();this.rotmatrix=null;}
/**
* Sets the rotation displacement of the object, useful for animation
* @param {number} x The value to assign to the x rotation
* @param {number} y The value to assign to the y rotation
* @param {number} z The value to assign to the z rotation
*/
GLGE.Placeable.prototype.setDRot=function(x,y,z){this.mode=GLGE.P_EULER;this.dRotX=x;this.dRotY=y;this.dRotZ=z;this.updateMatrix();this.rotmatrix=null;}
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
GLGE.Placeable.prototype.setScale=function(x,y,z){if(!y){y=x;z=x}; this.scaleX=x;this.scaleY=y;this.scaleZ=z;this.updateMatrix();}
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
* Gets the x quat of the rotation
* @returns {number}
*/
GLGE.Placeable.prototype.getQuatX=function(){return this.quatX;}
/**
* Gets the y quat of the rotation
* @returns {number}
*/
GLGE.Placeable.prototype.getQuatY=function(){return this.quatY;}
/**
* Gets the z quat of the rotation
* @returns {number}
*/
GLGE.Placeable.prototype.getQuatZ=function(){return this.quatZ;}
/**
* Gets the w quat of the rotation
* @returns {number}
*/
GLGE.Placeable.prototype.getQuatW=function(){return this.quatW;}
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
GLGE.Placeable.prototype.getScaleY=function(){return this.scaleY;}
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
	if(this.mode==GLGE.P_EULER){
		rotation.x=parseFloat(this.rotX)+parseFloat(this.dRotX);
		rotation.y=parseFloat(this.rotY)+parseFloat(this.dRotY);
		rotation.z=parseFloat(this.rotZ)+parseFloat(this.dRotZ);
	}
	if(this.mode==GLGE.P_QUAT){
		rotation.x=parseFloat(this.quatX);
		rotation.y=parseFloat(this.quatY);
		rotation.z=parseFloat(this.quatZ);
		rotation.w=parseFloat(this.quatW);
	}
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
		var scale=this.getScale();
		this.matrix=GLGE.translateMatrix(position.x,position.y,position.z).x(this.getRotMatrix().x(GLGE.scaleMatrix(scale.x,scale.y,scale.z)));
	}
	var matrix=this.matrix;
	if(this.parent) matrix=this.parent.getModelMatrix().x(matrix);
	return matrix;
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
GLGE.Animatable.prototype.loop=GLGE.TRUE;
GLGE.Animatable.prototype.paused=GLGE.FALSE;
GLGE.Animatable.prototype.pausedTime=null;
/**
* update animated properties on this object
*/
GLGE.Animatable.prototype.animate=function(){
	if(!this.paused){
		var now=parseInt(new Date().getTime());
		if(this.animation.frames>1){
			if(this.loop){
				frame=((parseFloat(now)-parseFloat(this.animationStart))/1000*this.frameRate)%(this.animation.frames-1)+1; 
			}else{
				frame=((parseFloat(now)-parseFloat(this.animationStart))/1000*this.frameRate)+1; 
				if(frame>this.animation.frames) frame=this.animation.frames;
			}
		}else{
			frame=1;
		}
		if(frame!=this.lastFrame){
			this.lastFrame=frame;
			for(property in this.animation.curves){
				if(this["set"+property]) this["set"+property](this.animation.curves[property].getValue(parseFloat(frame)));
			}
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
* Sets the loop flag to GLGE.TRUE or GLGE.FALSE
* @param  {boolean} value 
*/
GLGE.Animatable.prototype.setLoop=function(value){
	this.loop=value;
}
/**
* Gets the loop flag
* @return {boolean}
*/
GLGE.Animatable.prototype.getLoop=function(){
	return this.loop;
}
/**
* @function is looping? @see GLGE.Animatable#getLoop
*/
GLGE.Animatable.prototype.isLooping=GLGE.Animatable.prototype.getLoop;

/**
* Sets the paused flag to GLGE.TRUE or GLGE.FALSE
* @param  {boolean} value 
*/
GLGE.Animatable.prototype.setPaused=function(value){
	if(value) this.pauseTime=parseInt(new Date().getTime());
		else this.animationStart=this.animationStart+(parseInt(new Date().getTime())-this.pauseTime);
	this.paused=value;
}
/**
* Gets the paused flag
* @return {boolean}
*/
GLGE.Animatable.prototype.getPaused=function(){
	return this.paused;
}
/**
* Toggles the paused flag
* @return {boolean} returns the resulting flag state
*/
GLGE.Animatable.prototype.togglePaused=function(){
	this.setPaused(!this.getPaused());
	return this.paused;
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
	this.x=parseFloat(x2);
	this.y=parseFloat(y2);
	this.x3=parseFloat(x3);
	this.y3=parseFloat(y3);
};

/**
* @class A LinearPoint class to add points to the Animation Curve 
* @param {number} x x-coord control point
* @param {number} y y-coord control point
*/
GLGE.LinearPoint=function(x,y){
	this.x=parseFloat(x);
	this.y=parseFloat(y);
};

/**
* @class A StepPoint class to add points to the Animation Curve 
* @param {number} x x-coord control point
* @param {object} value value of control point
*/
GLGE.StepPoint=function(x,value){
	this.x=parseFloat(x);
	this.y=value;
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
* @param {object} point The point to add
* @returns {Number} Index of the newly added point
*/
GLGE.AnimationCurve.prototype.addPoint=function(point){
	this.keyFrames.push(point);
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
	var startKey;
	var endKey;
	var preStartKey;
	var preEndKey;
 
	for(var i=0; i<this.keyFrames.length;i++){
		if(this.keyFrames[i].x<=frame && (startKey==undefined || this.keyFrames[i].x>this.keyFrames[startKey].x)){
			preStartKey=startKey;
			startKey=i;
		}else if(this.keyFrames[i].x<=frame && (preStartKey==undefined || this.keyFrames[i].x>this.keyFrames[preStartKey].x)){
			preStartKey=i;
		}
		if(this.keyFrames[i].x>frame && (endKey==undefined || this.keyFrames[i].x<this.keyFrames[endKey].x)){
			preEndKey=endKey;
			endKey=i;
		}else if(this.keyFrames[i].x>frame && (preEndKey==undefined || this.keyFrames[i].x<this.keyFrames[preEndKey].x)){
			preEndKey=i;
		}
	}
	if(startKey==undefined){
		startKey=endKey;
		endKey=preEndKey;
	}
	if(endKey==undefined){
		endKey=startKey;
		startKey=preStartKey;
	}
	if(this.keyFrames[startKey] instanceof GLGE.BezTriple && this.keyFrames[endKey] instanceof GLGE.BezTriple){
		var C1=this.coord(this.keyFrames[startKey].x,this.keyFrames[startKey].y);
		var C2=this.coord(this.keyFrames[startKey].x3,this.keyFrames[startKey].y3);
		var C3=this.coord(this.keyFrames[endKey].x1,this.keyFrames[endKey].y1);
		var C4=this.coord(this.keyFrames[endKey].x,this.keyFrames[endKey].y);
		return this.atX(frame,C1,C2,C3,C4).y;
	}
	if(this.keyFrames[startKey] instanceof GLGE.LinearPoint && this.keyFrames[endKey] instanceof GLGE.BezTriple){
		var C1=this.coord(this.keyFrames[startKey].x,this.keyFrames[startKey].y);
		var C2=this.coord(this.keyFrames[endKey].x1,this.keyFrames[endKey].y1);
		var C3=this.coord(this.keyFrames[endKey].x1,this.keyFrames[endKey].y1);
		var C4=this.coord(this.keyFrames[endKey].x,this.keyFrames[endKey].y);
		return this.atX(frame,C1,C2,C3,C4).y;
	}
	if(this.keyFrames[startKey] instanceof GLGE.BezTriple && this.keyFrames[endKey] instanceof GLGE.LinearPoint){
		var C1=this.coord(this.keyFrames[startKey].x,this.keyFrames[startKey].y);
		var C2=this.coord(this.keyFrames[startKey].x3,this.keyFrames[startKey].y3);
		var C3=this.coord(this.keyFrames[startKey].x3,this.keyFrames[startKey].y3);
		var C4=this.coord(this.keyFrames[endKey].x,this.keyFrames[endKey].y);
		return this.atX(frame,C1,C2,C3,C4).y;
	}
	if(this.keyFrames[startKey] instanceof GLGE.LinearPoint && this.keyFrames[endKey] instanceof GLGE.LinearPoint){
		var value=(frame-this.keyFrames[startKey].x)*(this.keyFrames[endKey].y-this.keyFrames[startKey].y)/(this.keyFrames[endKey].x-this.keyFrames[startKey].x)+this.keyFrames[startKey].y;
		return value;
	}
	if(this.keyFrames[startKey] instanceof GLGE.StepPoint){
		return this.keyFrames[startKey].y
	}
	return this.keyFrames.preStartKey;
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
	var TRANS1=GLGE.translateMatrix(bone.x*-1,bone.y*-1,bone.z*-1);
	var TRANS2=GLGE.translateMatrix(bone.x,bone.y,bone.z);

	var result=GLGE.identMatrix();
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
	

	var QUAT=GLGE.quatRotation(QUATX,QUATY,QUATZ,QUATW);
	var LOC=GLGE.translateMatrix(LOCX,LOCY,LOCZ);
	var SCALE=GLGE.scaleMatrix(SCALEX,SCALEY,SCALEZ);
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
* @constant 
* @description Enumeration for node group type
*/
GLGE.G_NODE=1;
/**
* @constant 
* @description Enumeration for root group type
*/
GLGE.G_ROOT=2;
/**
* @class Group class to allow object transform hierarchies 
* @augments GLGE.Animatable
* @augments GLGE.Placeable
*/
GLGE.Group=function(uid){
	GLGE.Assets.registerAsset(this,uid);
	this.objects=[];
}
GLGE.augment(GLGE.Placeable,GLGE.Group);
GLGE.augment(GLGE.Animatable,GLGE.Group);
GLGE.Group.prototype.objects=null;
GLGE.Group.prototype.type=GLGE.G_NODE;
/**
* sets the scene this group is in
* @param {GLGE.Scene} scene the scene
* @private
*/
GLGE.Group.prototype.setScene=function(scene){
	this.scene=scene;
    	for(var i=0;i<this.objects.length;i++){
		this.objects[i].setScene(this.scene);
	}
}
/**
* sets the scene this group is in
* @returns {GLGE.Scene}
* @private
*/
GLGE.Group.prototype.getScene=function(){
    return this.scene;
}
/**
* Adds a new object to this group
* @param {object} object the object to add to this group
*/
GLGE.Group.prototype.addObject=function(object){
	if(object.parent) object.parent.remove(object);
	if(this.scene){
		if(object instanceof GLGE.Object){
			this.scene.addObject(object);
		}
		else
		{
			this.scene.addGroup(object);
		}
		object.setScene(this.scene);
	}
	object.parent=this;
	this.objects.push(object);
}
/**
* @method Adds a new sub group to this group
* @param {object} object the sub group to add to this group
*/
GLGE.Group.prototype.addGroup=GLGE.Group.prototype.addObject;
/**
* Removes an object or sub group from this group
* @param {object} object the item to remove
*/
GLGE.Group.prototype.remove=function(object){
	for(var i=0;i<this.objects.length;i++){
		if(this.objects[i]==object){
			this.objects.splice(i, 1);
			if(this.scene) this.scene.removeObject(object);
			break;
		}
	}
}
/**
* Gets an array of all objects in this group and all it's subgroups
*/
GLGE.Group.prototype.getObjects=function(){
	var subs,j;
	var returnObjects=[];
	for(var i=0;i<this.objects.length;i++){
		if(this.objects[i] instanceof GLGE.Object){
			returnObjects.push(this.objects[i]);
		}
		if(this.objects[i] instanceof GLGE.Group){
			subs=this.objects[i].getObjects();
			for(j=0;j<subs.length;j++){
				returnObjects.push(subs[j]);
			}
		}
	}
	return returnObjects;
}

/**
* @class Text that can be rendered in a scene
* @augments GLGE.Animatable
* @augments GLGE.Placeable
*/
GLGE.Text=function(uid){
	GLGE.Assets.registerAsset(this,uid);
	this.canvas=document.createElement("canvas");
	this.color={r:1.0,g:1.0,b:1.0};
}
GLGE.augment(GLGE.Placeable,GLGE.Text);
GLGE.augment(GLGE.Animatable,GLGE.Text);
GLGE.Text.prototype.zTrans=true;
GLGE.Text.prototype.canvas=null;
GLGE.Text.prototype.aspect=1.0;
GLGE.Text.prototype.color=null;
GLGE.Text.prototype.text="";
GLGE.Text.prototype.font="Times";
GLGE.Text.prototype.size=100;
GLGE.Text.prototype.pickType=GLGE.TEXT_TEXTPICK;

/**
* Gets the pick type for this text
* @returns {string} the pick type
*/
GLGE.Text.prototype.getPickType=function(){
	return this.pickType;
};
/**
* Sets the pick type GLGE.TEXT_BOXPICK for picking based on bound box or GLGE.TEXT_TEXTPICK for pixel perfect text picking
* @param {Number} value the picking type
*/
GLGE.Text.prototype.setPickType=function(value){
	this.pickType=value;
};
/**
* Gets the font of the text
* @returns {string} the font of the text
*/
GLGE.Text.prototype.getFont=function(){
	return this.size;
};
/**
* Sets the font of the text
* @param {Number} value the font of the text
*/
GLGE.Text.prototype.setFont=function(value){
	this.font=value;
	if(this.gl) this.updateCanvas(this.gl);
};
/**
* Gets the size of the text
* @returns {string} the size of the text
*/
GLGE.Text.prototype.getSize=function(){
	return this.size;
};
/**
* Sets the size of the text
* @param {Number} value the size of the text
*/
GLGE.Text.prototype.setSize=function(value){
	this.size=value;
	if(this.gl) this.updateCanvas(this.gl);
};
/**
* Gets the rendered text
* @returns {string} the text rendered
*/
GLGE.Text.prototype.getText=function(){
	return this.text;
};
/**
* Sets the text to be rendered
* @param {Number} value the text to render
*/
GLGE.Text.prototype.setText=function(value){
	this.text=value;
	if(this.gl) this.updateCanvas(this.gl);
};
/**
* Sets the base colour of the text
* @param {string} color The colour of the material
*/
GLGE.Text.prototype.setColor=function(color){
	color=GLGE.colorParse(color);
	this.color={r:color.r,g:color.g,b:color.b};
};
/**
* Sets the red base colour of the text
* @param {Number} r The new red level 0-1
*/
GLGE.Text.prototype.setColorR=function(value){
	this.color.r=value;
};
/**
* Sets the green base colour of the text
* @param {Number} g The new green level 0-1
*/
GLGE.Text.prototype.setColorG=function(value){
	this.color.g=value;
};
/**
* Sets the blue base colour of the text
* @param {Number} b The new blue level 0-1
*/
GLGE.Text.prototype.setColorB=function(value){
	this.color.b=value;
};
/**
* Gets the current base color of the text
* @return {[r,g,b]} The current base color
*/
GLGE.Text.prototype.getColor=function(){
	return this.color;
};

/**
* Sets the Z Transparency of this text
* @param {boolean} value Does this object need blending?
*/
GLGE.Text.prototype.setZtransparent=function(value){
	this.zTrans=value;
}
/**
* Gets the z transparency
* @returns boolean
*/
GLGE.Text.prototype.isZtransparent=function(){
	return this.zTrans;
}
/**
* Creates the shader program for the object
* @private
*/
GLGE.Text.prototype.GLGenerateShader=function(gl){
	if(this.GLShaderProgram) gl.deleteProgram(this.GLShaderProgram);

	//Vertex Shader
	var vertexStr="";
	vertexStr=vertexStr+"attribute vec3 position;\n";
	vertexStr=vertexStr+"attribute vec2 uvcoord;\n";
	vertexStr=vertexStr+"varying vec2 texcoord;\n";
	vertexStr=vertexStr+"uniform mat4 Matrix;\n";
	vertexStr=vertexStr+"uniform mat4 PMatrix;\n";
	vertexStr=vertexStr+"varying vec4 pos;\n";
	
	vertexStr=vertexStr+"void main(void){\n";
	vertexStr=vertexStr+"texcoord=uvcoord;\n";    
	vertexStr=vertexStr+"pos = Matrix * vec4(position,1.0);\n";
	vertexStr=vertexStr+"gl_Position = PMatrix * pos;\n";
	vertexStr=vertexStr+"}\n";
	
	//Fragment Shader
	var fragStr="";
	fragStr=fragStr+"uniform sampler2D TEXTURE;\n";
	fragStr=fragStr+"varying vec2 texcoord;\n";
	fragStr=fragStr+"varying vec4 pos;\n";
	fragStr=fragStr+"uniform float far;\n";
	fragStr=fragStr+"uniform int picktype;\n";
	fragStr=fragStr+"uniform vec3 color;\n";
	fragStr=fragStr+"void main(void){\n";
	var g=parseFloat(Math.round((this.sceneIndex+1)/256)/256);
	var r=parseFloat((this.sceneIndex-g*256+1)/256);
	fragStr=fragStr+"float alpha=texture2D(TEXTURE,texcoord).a;\n";
	fragStr=fragStr+"if(picktype=="+GLGE.TEXT_BOXPICK+"){gl_FragColor = vec4("+(r.toFixed(17))+", "+(g.toFixed(17))+",1.0,1.0);}"
	fragStr=fragStr+"else if(picktype=="+GLGE.TEXT_TEXTPICK+"){gl_FragColor = vec4("+(r.toFixed(17))+", "+(g.toFixed(17))+",1.0,alpha);}"
	fragStr=fragStr+"else{gl_FragColor = vec4(color.rgb*alpha,alpha);};\n";
	fragStr=fragStr+"}\n";
	
	this.GLFragmentShader=gl.createShader(gl.FRAGMENT_SHADER);
	this.GLVertexShader=gl.createShader(gl.VERTEX_SHADER);


	gl.shaderSource(this.GLFragmentShader, fragStr);
	gl.compileShader(this.GLFragmentShader);
	if (!gl.getShaderParameter(this.GLFragmentShader, gl.COMPILE_STATUS)) {
	      GLGE.error(gl.getShaderInfoLog(this.GLFragmentShader));
	      return;
	}
	
	//set and compile the vertex shader
	//need to set str
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
* Initiallize all the GL stuff needed to render to screen
* @private
*/
GLGE.Text.prototype.GLInit=function(gl){
	this.gl=gl;
	this.createPlane(gl);
	this.GLGenerateShader(gl);
	
	this.glTexture=gl.createTexture();
	this.updateCanvas(gl);
}
/**
* Updates the canvas texture
* @private
*/
GLGE.Text.prototype.updateCanvas=function(gl){
	var canvas = this.canvas;
	canvas.width=1;
	canvas.height=this.size*1.2;
	var ctx = canvas.getContext("2d");
	ctx.font = this.size+"px "+this.font;
	canvas.width=ctx.measureText(this.text).width;
	canvas.height=this.size*1.2;
	 ctx = canvas.getContext("2d");
	ctx.textBaseline="top";
	ctx.font = this.size+"px "+this.font;
	this.aspect=canvas.width/canvas.height;
	ctx.fillText(this.text, 0, 0);   
	
	gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
	//TODO: fix this when minefield is upto spec
	try{gl.texImage2D(gl.TEXTURE_2D, 0, canvas,false,true);}
	catch(e){gl.texImage2D(gl.TEXTURE_2D, 0, canvas,null);}
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
	gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
	gl.generateMipmap(gl.TEXTURE_2D);
	gl.bindTexture(gl.TEXTURE_2D, null);
}

/**
* Renders the text to the render buffer
* @private
*/
GLGE.Text.prototype.GLRender=function(gl,renderType){
	if(renderType==GLGE.RENDER_DEFAULT || renderType==GLGE.RENDER_PICK){	
		//if look at is set then look
		if(this.lookAt) this.Lookat(this.lookAt);
		//animate this object
		if(this.animation) this.animate();
		
		gl.useProgram(this.GLShaderProgram);

		var attribslot;
		//disable all the attribute initially arrays - do I really need this?
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
		gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
		gl.uniform1i(GLGE.getUniformLocation(gl,this.GLShaderProgram, "TEXTURE"), 0);	
		if(renderType==GLGE.RENDER_PICK){
			gl.uniform1i(GLGE.getUniformLocation(gl,this.GLShaderProgram, "picktype"), this.pickType);	
		}else{
			gl.uniform1i(GLGE.getUniformLocation(gl,this.GLShaderProgram, "picktype"), 0);	
		}
		
		//generate and set the modelView matrix
		var scalefactor=this.size/100;
		var mMatrix=this.scene.camera.getViewMatrix().x(this.getModelMatrix().x(GLGE.scaleMatrix(this.aspect*scalefactor,scalefactor,scalefactor)));
		var mUniform = GLGE.getUniformLocation(gl,this.GLShaderProgram, "Matrix");
		gl.uniformMatrix4fv(mUniform, false, mMatrix.glData());
		var mUniform = GLGE.getUniformLocation(gl,this.GLShaderProgram, "PMatrix");
		gl.uniformMatrix4fv(mUniform, false, this.scene.camera.getProjectionMatrix().glData());
		var farUniform = GLGE.getUniformLocation(gl,this.GLShaderProgram, "far");
		gl.uniform1f(farUniform, this.scene.camera.getFar());
		//set the color
		gl.uniform3f(GLGE.getUniformLocation(gl,this.GLShaderProgram, "color"), this.color.r,this.color.g,this.color.b);
		
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.GLfaces);
		gl.drawElements(gl.TRIANGLES, this.GLfaces.numItems, gl.UNSIGNED_SHORT, 0);
	}
}
/**
* creates the plane mesh to draw
* @private
*/
GLGE.Text.prototype.createPlane=function(gl){
	//create the vertex positions
	if(!this.posBuffer) this.posBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.posBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new WebGLFloatArray([1,1,0,-1,1,0,-1,-1,0,1,-1,0]), gl.STATIC_DRAW);
	this.posBuffer.itemSize = 3;
	this.posBuffer.numItems = 4;
	//create the vertex uv coords
	if(!this.uvBuffer) this.uvBuffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, this.uvBuffer);
	gl.bufferData(gl.ARRAY_BUFFER, new WebGLFloatArray([0,0,1,0,1,1,0,1]), gl.STATIC_DRAW);
	this.uvBuffer.itemSize = 2;
	this.uvBuffer.numItems = 4;
	//create the faces
	if(!this.GLfaces) this.GLfaces = gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.GLfaces);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new WebGLUnsignedShortArray([0,1,2,2,3,0]), gl.STATIC_DRAW);
	this.GLfaces.itemSize = 1;
	this.GLfaces.numItems = 6;
}
/**
* sets the scene this text is in
* @param {GLGE.Scene} scene the scene
* @private
*/
GLGE.Text.prototype.setScene=function(scene){
    this.scene=scene;
}
/**
* sets the scene this text is in
* @returns {GLGE.Scene}
* @private
*/
GLGE.Text.prototype.getScene=function(){
    return this.scene;
}



/**
* @class Creates a new mesh/material to add to an object
* @param {GLGE.Mesh} mesh optional mesh
* @param {GLGE.Material} material optional material
*/
GLGE.MultiMaterial=function(uid){
	GLGE.Assets.registerAsset(this,uid);
	//if(mesh) this.mesh=mesh;
	//if(material) this.material=material;
}
GLGE.MultiMaterial.prototype.mesh=null;
GLGE.MultiMaterial.prototype.material=null;
GLGE.MultiMaterial.prototype.program=null;
GLGE.MultiMaterial.prototype.GLShaderProgramPick=null;
GLGE.MultiMaterial.prototype.GLShaderProgramShadow=null;
GLGE.MultiMaterial.prototype.GLShaderProgram=null;
/**
* sets the mesh
* @param {GLGE.Mesh} mesh 
*/
GLGE.MultiMaterial.prototype.setMesh=function(mesh){
	this.GLShaderProgram=null;
	this.mesh=mesh;
}
/**
* gets the mesh
* @returns {GLGE.Mesh}
*/
GLGE.MultiMaterial.prototype.getMesh=function(){
	return this.mesh;
}
/**
* sets the material
* @param {GLGE.Material} material 
*/
GLGE.MultiMaterial.prototype.setMaterial=function(material){
	this.GLShaderProgram=null;
	this.material=material;
}
/**
* gets the material
* @returns {GLGE.Material}
*/
GLGE.MultiMaterial.prototype.getMaterial=function(){
	return this.material;
}


/**
* @class An object that can be rendered in a scene
* @augments GLGE.Animatable
* @augments GLGE.Placeable
*/
GLGE.Object=function(uid){
	GLGE.Assets.registerAsset(this,uid);
	this.multimaterials=[];
}
GLGE.augment(GLGE.Placeable,GLGE.Object);
GLGE.augment(GLGE.Animatable,GLGE.Object);
GLGE.Object.prototype.action=null;
GLGE.Object.prototype.mesh=null;
GLGE.Object.prototype.skeleton=null;
GLGE.Object.prototype.scene=null;
GLGE.Object.prototype.transformMatrix=GLGE.identMatrix();
GLGE.Object.prototype.material=null;
GLGE.Object.prototype.gl=null;
GLGE.Object.prototype.actionStart=null;
GLGE.Object.prototype.blendState=null;
GLGE.Object.prototype.actionCache=null;
GLGE.Object.prototype.multimaterials=null;
GLGE.Object.prototype.zTrans=false;
GLGE.Object.prototype.id="";

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
GLGE.Object.prototype.setMaterial=function(material,idx){
	if(!idx) idx=0;
	if(!this.multimaterials[idx]) this.multimaterials[idx]=new GLGE.MultiMaterial();
	if(this.multimaterials[idx].getMaterial()!=material){
		this.multimaterials[idx].setMaterial(material);
		this.updateProgram();
	}
}
/**
* Gets the material associated with the object
* @returns GLGE.Material
*/
GLGE.Object.prototype.getMaterial=function(idx){
	if(!idx) idx=0;
	if(this.multimaterials[idx]) {
		return this.multimaterials[idx].getMaterial();
	}else{
		return false;
	}
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
GLGE.Object.prototype.setMesh=function(mesh,idx){
	if(!idx) idx=0;
	if(!this.multimaterials[idx]) this.multimaterials.push(new GLGE.MultiMaterial());
	this.multimaterials[idx].setMesh(mesh);
}
/**
* Gets the mesh associated with the object
* @returns GLGE.Mesh
*/
GLGE.Object.prototype.getMesh=function(idx){
	if(!idx) idx=0;
	if(this.multimaterials[idx]) {
		this.multimaterials[idx].getMesh();
	}else{
		return false;
	}
}
/**
* Initiallize all the GL stuff needed to render to screen
* @private
*/
GLGE.Object.prototype.GLInit=function(gl){
	this.gl=gl;
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
	for(var i=0; i<this.multimaterials.length;i++){
		this.multimaterials[i].GLShaderProgram=null;
	}
}
/**
* Adds another material to this object
* @returns GLGE.Material
*/
GLGE.Object.prototype.addMultiMaterial=function(multimaterial){
	this.multimaterials.push(multimaterial);
}
/**
* gets all of the objects materials and meshes
* @returns array of GLGE.MultiMaterial objects
*/
GLGE.Object.prototype.getMultiMaterials=function(){
	return this.multimaterials;
}
/**
* Creates the shader program for the object
* @private
*/
GLGE.Object.prototype.GLGenerateShader=function(gl){
	//create the programs strings
	//Vertex Shader
	var UV=false;
	var vertexStr="";
	var tangent=false;
	for(var i=0;i<this.mesh.buffers.length;i++){
		if(this.mesh.buffers[i].name=="tangent") tangent=true;
		if(this.mesh.buffers[i].size>1)
			vertexStr=vertexStr+"attribute vec"+this.mesh.buffers[i].size+" "+this.mesh.buffers[i].name+";\n";
		else
			vertexStr=vertexStr+"attribute float "+this.mesh.buffers[i].name+";\n";
		if(this.mesh.buffers[i].name=="UV") UV=true;
	}
	
	vertexStr=vertexStr+"uniform mat4 MVMatrix;\n";
	vertexStr=vertexStr+"uniform mat4 PMatrix;\n";  
	//normals needed for lighting
	vertexStr=vertexStr+"uniform mat4 uNMatrix;\n"; 

	for(var i=0; i<this.scene.lights.length;i++){
			vertexStr=vertexStr+"uniform vec3 lightpos"+i+";\n";
			vertexStr=vertexStr+"uniform vec3 lightdir"+i+";\n";
			vertexStr=vertexStr+"uniform mat4 lightmat"+i+";\n";
	}
  
	for(var i=0; i<this.mesh.boneWeights.length; i++){
		vertexStr=vertexStr+"uniform mat4 "+this.mesh.boneWeights[i].boneName+"Matrix;\n";  
		vertexStr=vertexStr+"uniform mat4 "+this.mesh.boneWeights[i].boneName+"nMatrix;\n";  
	}
	
	vertexStr=vertexStr+"varying vec3 eyevec;\n"; 
	for(var i=0; i<this.scene.lights.length;i++){
			vertexStr=vertexStr+"varying vec3 lightvec"+i+";\n"; 
			vertexStr=vertexStr+"varying vec3 tlightvec"+i+";\n"; 
			vertexStr=vertexStr+"varying float lightdist"+i+";\n"; 
	}
    
	vertexStr=vertexStr+"varying vec3 n;\n";  
	vertexStr=vertexStr+"varying vec3 b;\n";  
	vertexStr=vertexStr+"varying vec3 t;\n";  
	
	vertexStr=vertexStr+"varying vec4 UVCoord;\n";
	vertexStr=vertexStr+"varying vec3 OBJCoord;\n";
	vertexStr=vertexStr+"varying vec3 tang;\n";
	vertexStr=vertexStr+"varying vec3 teyevec;\n";
	
	vertexStr=vertexStr+"void main(void)\n";
	vertexStr=vertexStr+"{\n";
	if(UV) vertexStr=vertexStr+"UVCoord=UV;\n";
	vertexStr=vertexStr+"OBJCoord = position;\n";
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
	if(tangent) vertexStr=vertexStr+"tang = (uNMatrix*vec4(tangent,1.0)).xyz;\n";
	
	vertexStr=vertexStr+"t = normalize(tang);";
	vertexStr=vertexStr+"n = normalize(norm.rgb);";
	vertexStr=vertexStr+"b = normalize(cross(n,t));";
	if(tangent){
		vertexStr=vertexStr+"teyevec.x = dot(eyevec, t);";
		vertexStr=vertexStr+"teyevec.y = dot(eyevec, b);";
		vertexStr=vertexStr+"teyevec.z = dot(eyevec, n);";
	}else{
		vertexStr=vertexStr+"teyevec = eyevec;";
	}
	
	
	for(var i=0; i<this.scene.lights.length;i++){			
			if(this.scene.lights[i].getType()==GLGE.L_DIR){
				vertexStr=vertexStr+"vec3 tmplightvec"+i+" = -lightdir"+i+";\n";
			}else{
				vertexStr=vertexStr+"vec3 tmplightvec"+i+" = -(lightpos"+i+"-pos.xyz);\n";
			}
			//tan space stuff
			if(tangent){
				vertexStr=vertexStr+"tlightvec"+i+".x = dot(tmplightvec"+i+", t);";
				vertexStr=vertexStr+"tlightvec"+i+".y = dot(tmplightvec"+i+", b);";
				vertexStr=vertexStr+"tlightvec"+i+".z = dot(tmplightvec"+i+", n);";
				
			}else{
				vertexStr=vertexStr+"tlightvec"+i+" = tmplightvec"+i+";";
			}
			vertexStr=vertexStr+"lightvec"+i+" = tmplightvec"+i+";";

			
			vertexStr=vertexStr+"lightdist"+i+" = length(lightpos"+i+".xyz-pos.xyz);\n";
	}
	vertexStr=vertexStr+"}\n";
	
	//Fragment Shader
	if(!this.material){
		var fragStr="";
		fragStr=fragStr+"void main(void)\n";
		fragStr=fragStr+"{\n";
		fragStr=fragStr+"gl_FragColor = vec4(1.0,1.0,1.0,1.0);\n";
		fragStr=fragStr+"}\n";
	}
	else
	{
		fragStr=this.material.getFragmentShader(this.scene.lights);
	}
	
	//shadow fragment
	var shfragStr="";
	shfragStr=shfragStr+"varying vec3 eyevec;\n";
	shfragStr=shfragStr+"void main(void)\n";
	shfragStr=shfragStr+"{\n";
	shfragStr=shfragStr+"gl_FragColor=eyevec.z / 1000.0 * vec4(1.0, 256.0, 65536.0, 16777216.0);\n";
	shfragStr=shfragStr+"}\n";
	
	//picking fragment
	var pkfragStr="";
	pkfragStr=pkfragStr+"uniform float far;\n";
	pkfragStr=pkfragStr+"void main(void)\n";
	pkfragStr=pkfragStr+"{\n";
	var g=parseFloat(Math.round((this.sceneIndex+1)/256)/256);
	var r=parseFloat((this.sceneIndex-g*256+1)/256);
	pkfragStr=pkfragStr+"gl_FragColor = vec4("+(r.toFixed(17))+", "+(g.toFixed(17))+",1.0,1.0);\n";
	pkfragStr=pkfragStr+"}\n";
	
	this.GLFragmentShaderShadow=gl.createShader(gl.FRAGMENT_SHADER);
	this.GLFragmentShaderPick=gl.createShader(gl.FRAGMENT_SHADER);
	this.GLFragmentShader=gl.createShader(gl.FRAGMENT_SHADER);
	this.GLVertexShader=gl.createShader(gl.VERTEX_SHADER);


	gl.shaderSource(this.GLFragmentShader, fragStr);
	gl.compileShader(this.GLFragmentShader);
	if (!gl.getShaderParameter(this.GLFragmentShader, gl.COMPILE_STATUS)) {
	      alert(gl.getShaderInfoLog(this.GLFragmentShader));
	      return;
	}
	
	    
	//set and compile the fragment shader
	//need to set str
	gl.shaderSource(this.GLFragmentShaderShadow, shfragStr);
	gl.compileShader(this.GLFragmentShaderShadow);
	if (!gl.getShaderParameter(this.GLFragmentShaderShadow, gl.COMPILE_STATUS)) {
	      alert(gl.getShaderInfoLog(this.GLFragmentShaderShadow));
	      return;
	}
	
	//compile the pciking fragment
	gl.shaderSource(this.GLFragmentShaderPick, pkfragStr);
	gl.compileShader(this.GLFragmentShaderPick);
	if (!gl.getShaderParameter(this.GLFragmentShaderPick, gl.COMPILE_STATUS)) {
	      alert(gl.getShaderInfoLog(this.GLFragmentShaderPick));
	      return;
	}
	
	//set and compile the vertex shader
	//need to set str
	gl.shaderSource(this.GLVertexShader, vertexStr);
	gl.compileShader(this.GLVertexShader);
	if (!gl.getShaderParameter(this.GLVertexShader, gl.COMPILE_STATUS)) {
	      alert(gl.getShaderInfoLog(this.GLVertexShader));
	      return;
	}


	this.GLShaderProgramPick = gl.createProgram();
	gl.attachShader(this.GLShaderProgramPick, this.GLVertexShader);
	gl.attachShader(this.GLShaderProgramPick, this.GLFragmentShaderPick);
	gl.linkProgram(this.GLShaderProgramPick);

	this.GLShaderProgramShadow = gl.createProgram();
	gl.attachShader(this.GLShaderProgramShadow, this.GLVertexShader);
	gl.attachShader(this.GLShaderProgramShadow, this.GLFragmentShaderShadow);
	gl.linkProgram(this.GLShaderProgramShadow);
	
	this.GLShaderProgram = gl.createProgram();
	gl.attachShader(this.GLShaderProgram, this.GLVertexShader);
	gl.attachShader(this.GLShaderProgram, this.GLFragmentShader);
	gl.linkProgram(this.GLShaderProgram);	
}
/**
* creates shader programs;
* @param multimaterial the multimaterial object to create the shader programs for
* @private
*/
GLGE.Object.prototype.createShaders=function(multimaterial){
	if(this.gl){
		this.mesh=multimaterial.mesh;
		this.material=multimaterial.material;
		this.GLGenerateShader(this.gl);
	}
	multimaterial.GLShaderProgramPick=this.GLShaderProgramPick;
	multimaterial.GLShaderProgramShadow=this.GLShaderProgramShadow;
	multimaterial.GLShaderProgram=this.GLShaderProgram;
}
/**
* Sets the shader program uniforms ready for rendering
* @private
*/
GLGE.Object.prototype.GLUniforms=function(gl,renderType){
	var program;
	switch(renderType){
		case GLGE.RENDER_DEFAULT:
			program=this.GLShaderProgram;
			break;
		case GLGE.RENDER_SHADOW:
			program=this.GLShaderProgramShadow;
			break;
		case GLGE.RENDER_PICK:
			program=this.GLShaderProgramPick;
			break;
	}
	var camMat=this.scene.camera.getViewMatrix();
	//generate and set the modelView matrix
	mvMatrix=camMat.x(this.getModelMatrix());
	//set the amibent light
	gl.uniform3f(GLGE.getUniformLocation(gl,program, "amb"), this.scene.ambientColor.r,this.scene.ambientColor.g,this.scene.ambientColor.b);
	//set the amibent light
	gl.uniform1f(GLGE.getUniformLocation(gl,program, "far"), this.scene.camera.far);
	gl.uniform1f(GLGE.getUniformLocation(gl,program, "fogfar"), this.scene.fogFar);
	gl.uniform1f(GLGE.getUniformLocation(gl,program, "fognear"), this.scene.fogNear);
	gl.uniform1i(GLGE.getUniformLocation(gl,program, "fogtype"), this.scene.fogType);
	gl.uniform3f(GLGE.getUniformLocation(gl,program, "fogcolor"), this.scene.fogColor.r,this.scene.fogColor.g,this.scene.fogColor.b);
	
	var mvUniform = GLGE.getUniformLocation(gl,program, "MVMatrix");
	gl.uniformMatrix4fv(mvUniform, false, mvMatrix.glData());
	
	var pUniform = GLGE.getUniformLocation(gl,program, "PMatrix");
	gl.uniformMatrix4fv(pUniform, false, this.scene.camera.getProjectionMatrix().glData());
    
	//normalising matrix
	var normalMatrix = mvMatrix.inverse();
	normalMatrix = normalMatrix.transpose();
	var nUniform = GLGE.getUniformLocation(gl,program, "uNMatrix");
	gl.uniformMatrix4fv(nUniform, false, normalMatrix.glData());
    
	//light
	var pos,lpos;
	for(var i=0; i<this.scene.lights.length;i++){
		pos=camMat.x(this.scene.lights[i].getModelMatrix()).x([0,0,0]);
		gl.uniform3f(GLGE.getUniformLocation(gl,program, "lightpos"+i), pos.e(1),pos.e(2),pos.e(3));		
		
		lpos=camMat.x(this.scene.lights[i].getModelMatrix()).x([0,0,1]);
		gl.uniform3f(GLGE.getUniformLocation(gl,program, "lightdir"+i),lpos.e(1)-pos.e(1),lpos.e(2)-pos.e(2),lpos.e(3)-pos.e(3));
		gl.uniformMatrix4fv(GLGE.getUniformLocation(gl,program, "lightmat"+i), false, this.scene.lights[i].getModelMatrix().inverse().x(this.getModelMatrix()).glData());
	}
       
	//set bone transforms
	var boneUniform;
	var transforms={};
	if(this.action && this.skeleton){
		transforms=this.getBoneTransforms();
	}
	for(var i=0; i<this.mesh.boneWeights.length; i++){
		if(!transforms[this.mesh.boneWeights[i].boneName]) transforms[this.mesh.boneWeights[i].boneName]={matrix:GLGE.identMatrix()};
		
		boneUniform = GLGE.getUniformLocation(gl,program, this.mesh.boneWeights[i].boneName+"Matrix");
		gl.uniformMatrix4fv(boneUniform, false, transforms[this.mesh.boneWeights[i].boneName].matrix.glData());
        
		boneUniform = GLGE.getUniformLocation(gl,program, this.mesh.boneWeights[i].boneName+"nMatrix");
		gl.uniformMatrix4fv(boneUniform, false, transforms[this.mesh.boneWeights[i].boneName].matrix.inverse().transpose().glData());
	}
    
	if(this.material && renderType==GLGE.RENDER_DEFAULT) this.material.textureUniforms(gl,program,this.scene.lights);
	//this.material.textureUniforms(gl,program,this.scene.lights);
}
/**
* Renders the object to the screen
* @private
*/
GLGE.Object.prototype.GLRender=function(gl,renderType){
	//if look at is set then look
	if(this.lookAt) this.Lookat(this.lookAt);
 
	//animate this object
	if(renderType==GLGE.RENDER_DEFAULT) if(this.animation) this.animate();

	for(var i=0; i<this.multimaterials.length;i++){
		if(this.multimaterials[i].mesh){
			if(!this.multimaterials[i].GLShaderProgram){
				this.createShaders(this.multimaterials[i]);
			}else{
				this.GLShaderProgramPick=this.multimaterials[i].GLShaderProgramPick;
				this.GLShaderProgramShadow=this.multimaterials[i].GLShaderProgramShadow;
				this.GLShaderProgram=this.multimaterials[i].GLShaderProgram;
			}
			this.mesh=this.multimaterials[i].mesh;
			this.material=this.multimaterials[i].material;
 
			switch(renderType){
				case  GLGE.RENDER_DEFAULT:
					gl.useProgram(this.GLShaderProgram);
					this.mesh.GLAttributes(gl,this.GLShaderProgram);
					break;
				case  GLGE.RENDER_SHADOW:
					gl.useProgram(this.GLShaderProgramShadow);
					this.mesh.GLAttributes(gl,this.GLShaderProgramShadow);
					break;
				case  GLGE.RENDER_PICK:
					gl.useProgram(this.GLShaderProgramPick);
					this.mesh.GLAttributes(gl,this.GLShaderProgramPick);
					break;
			}
			this.GLUniforms(gl,renderType);
			
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.mesh.GLfaces);
			gl.drawElements(gl.TRIANGLES, this.mesh.GLfaces.numItems, gl.UNSIGNED_SHORT, 0);
		}
	}
}



/**
* @class Creates a new mesh to associate with a mesh
* @see GLGE.Object
*/
GLGE.Mesh=function(uid){
	GLGE.Assets.registerAsset(this,uid);
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
	//make sure all jsarray items are floats
	for(var i=0;i<jsArray.length;i++) jsArray[i]=parseFloat(jsArray[i]);
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
	
	
	//add a tangent buffer
	for(var i=0;i<this.buffers.length;i++){
		if(this.buffers[i].name=="position") var position=this.buffers[i].data;
		if(this.buffers[i].name=="UV") var uv=this.buffers[i].data;
		if(this.buffers[i].name=="normal") var normal=this.buffers[i].data;
	}
	

	if(position && uv){
		var tangentArray=[];
		var data={};
		var ref;
		for(var i=0;i<this.faces.data.length;i=i+3){
			var p1=[position[(parseInt(this.faces.data[i]))*3],position[(parseInt(this.faces.data[i]))*3+1],position[(parseInt(this.faces.data[i]))*3+2]];
			var p2=[position[(parseInt(this.faces.data[i+1]))*3],position[(parseInt(this.faces.data[i+1]))*3+1],position[(parseInt(this.faces.data[i+1]))*3+2]];
			var p3=[position[(parseInt(this.faces.data[i+2]))*3],position[(parseInt(this.faces.data[i+2]))*3+1],position[(parseInt(this.faces.data[i+2]))*3+2]];
			
			var n1=[normal[(parseInt(this.faces.data[i]))*3],normal[(parseInt(this.faces.data[i]))*3+1],normal[(parseInt(this.faces.data[i]))*3+2]];
			var n2=[normal[(parseInt(this.faces.data[i+1]))*3],normal[(parseInt(this.faces.data[i+1]))*3+1],normal[(parseInt(this.faces.data[i+1]))*3+2]];
			var n3=[normal[(parseInt(this.faces.data[i+2]))*3],normal[(parseInt(this.faces.data[i+2]))*3+1],normal[(parseInt(this.faces.data[i+2]))*3+2]];
			
			var p21=[p2[0]-p1[0],p2[1]-p1[1],p2[2]-p1[2]];
			var p31=[p3[0]-p1[0],p3[1]-p1[1],p3[2]-p1[2]];
			var uv21=[uv[(parseInt(this.faces.data[i+1]))*4]-uv[(parseInt(this.faces.data[i]))*4],uv[(parseInt(this.faces.data[i+1]))*4+1]-uv[(parseInt(this.faces.data[i]))*4+1]];
			var uv31=[uv[(parseInt(this.faces.data[i+2]))*4]-uv[(parseInt(this.faces.data[i]))*4],uv[(parseInt(this.faces.data[i+2]))*4+1]-uv[(parseInt(this.faces.data[i]))*4+1]];
			

   
			var tangent=new GLGE.Vec([p21[0]*uv31[1]-p31[0]*uv21[01],
								p21[1]*uv31[1]-p31[1]*uv21[1],
								p21[2]*uv31[1]-p31[2]*uv21[1]]).toUnitVector();		
								
			var cp = uv21[1] * uv31[0] - uv21[0] * uv31[1];
			if ( cp != 0.0 ) tangent=tangent.mul(1/cp).toUnitVector();

			if(data[[p1[0],p1[1],p1[2],n1[0],n1[1],n1[2]].join(",")]){
				tang=data[[p1[0],p1[1],p1[2],n1[0],n1[1],n1[2]].join(",")];
				tang.vec=tang.vec.mul(tang.weight).add(tangent).mul(1/(tang.weight));
				tang.weight++;
			}else{
				data[[p1[0],p1[1],p1[2],n1[0],n1[1],n1[2]].join(",")]={vec:tangent,weight:1};
			}
			if(data[[p2[0],p2[1],p2[2],n2[0],n2[1],n2[2]].join(",")]){
				tang=data[[p2[0],p2[1],p2[2],n2[0],n2[1],n2[2]].join(",")];
				tang.vec=tang.vec.mul(tang.weight).add(tangent).mul(1/(tang.weight+1));
				tang.weight++;
			}else{
				data[[p2[0],p2[1],p2[2],n2[0],n2[1],n2[2]].join(",")]={vec:tangent,weight:1};
			}
			if(data[[p3[0],p3[1],p3[2],n3[0],n3[1],n3[2]].join(",")]){
				tang=data[[p3[0],p3[1],p3[2],n3[0],n3[1],n3[2]].join(",")];
				tang.vec=tang.vec.mul(tang.weight).add(tangent).mul(1/(tang.weight+1));
				tang.weight++;
			}else{
				data[[p3[0],p3[1],p3[2],n3[0],n3[1],n3[2]].join(",")]={vec:tangent,weight:1};
			}
		}
		for(var i=0;i<position.length/3;i++){
			var p1=[position[i*3],position[i*3+1],position[i*3+2]];
			var n1=[normal[i*3],normal[i*3+1],normal[i*3+2]];
			t=data[[p1[0],p1[1],p1[2],n1[0],n1[1],n1[2]].join(",")].vec;
			if(t){
				tangentArray[i*3]=t.e(1);
				tangentArray[i*3+1]=t.e(2);
				tangentArray[i*3+2]=t.e(3);
			}
		}
		this.setBuffer("tangent",tangentArray,3);
	}
	
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
		attribslot=GLGE.getAttribLocation(gl,shaderProgram, this.buffers[i].name);
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
GLGE.Light=function(uid){
	GLGE.Assets.registerAsset(this,uid);
	this.color={r:1,g:1,b:1};
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
GLGE.Light.prototype.spotPMatrix=null;
GLGE.Light.prototype.spotExponent=10;
GLGE.Light.prototype.color=null; 
GLGE.Light.prototype.diffuse=true; 
GLGE.Light.prototype.specular=true; 
GLGE.Light.prototype.type=GLGE.L_POINT;
GLGE.Light.prototype.frameBuffer=null;
GLGE.Light.prototype.renderBuffer=null;
GLGE.Light.prototype.texture=null;
GLGE.Light.prototype.bufferHeight=256;
GLGE.Light.prototype.bufferWidth=256;
GLGE.Light.prototype.shadowBias=1.25;
GLGE.Light.prototype.castShadows=false;
/**
* Gets the spot lights projection matrix
* @returns the lights spot projection matrix
* @private
*/
GLGE.Light.prototype.getPMatrix=function(){
	if(!this.spotPMatrix){
		var far;
		if(this.scene && this.scene.camera) far=this.scene.camera.far;
			else far=1000;
		this.spotPMatrix=GLGE.makePerspective(Math.acos(this.spotCosCutOff)/3.14159*360, 1.0, 0.1, far);
	}
	return this.spotPMatrix;
}
/**
* Sets the shadow casting flag
* @param {number} value should cast shadows?
*/
GLGE.Light.prototype.setCastShadows=function(value){
	this.castShadows=value;
}
/**
* Gets the shadow casting flag
* @returns {number} true if casts shadows
*/
GLGE.Light.prototype.getCastShadows=function(){
	return this.castShadows;
}
/**
* Sets the shadow bias
* @param {number} value The shadow bias
*/
GLGE.Light.prototype.setShadowBias=function(value){
	this.shadowBias=value;
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
}
/**
* Gets the spot light cut off
* @returns {number} The cos of the limiting angle 
*/
GLGE.Light.prototype.getSpotCosCutOff=function(){
	return this.spotCosCutOff;
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
* @param {string} color The color of the light
*/
GLGE.Light.prototype.setColor=function(color){
	color=GLGE.colorParse(color);
	this.color={r:color.r,g:color.g,b:color.b};
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
        var tex = new WebGLUnsignedByteArray(this.bufferWidth * this.bufferHeight * 4);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, this.bufferWidth, this.bufferHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, tex);
    }
    
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT, this.bufferWidth, this.bufferHeight);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderBuffer);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
}

/**
* @constant 
* @description Enumeration for a perspective camera
*/
GLGE.C_PERSPECTIVE=1;
/**
* @constant 
* @description Enumeration for a orthographic camera
*/
GLGE.C_ORTHO=2;

/**
* @class Creates a new camera object
* @augments GLGE.Animatable
* @augments GLGE.Placeable
*/
GLGE.Camera=function(uid){
	GLGE.Assets.registerAsset(this,uid);
};
GLGE.augment(GLGE.Placeable,GLGE.Camera);
GLGE.augment(GLGE.Animatable,GLGE.Camera);
GLGE.Camera.prototype.fovy=35;
GLGE.Camera.prototype.aspect=1.0;
GLGE.Camera.prototype.near=0.1;
GLGE.Camera.prototype.far=1000.0;
GLGE.Camera.prototype.orthoscale=5;
GLGE.Camera.prototype.type=GLGE.C_PERSPECTIVE;
GLGE.Camera.prototype.pMatrix=null;

/**
* Method gets the orthographic scale for the camers
* @return {Matrix} Returns the orthographic scale
*/
GLGE.Camera.prototype.getOrthoScale=function(){
	if(this.type==GLGE.C_ORTHO) {
		return this.orthoscale
	}else{
		GLGE.error("You may only get a scale for a orthographic camera");
		return 1;
	}
};
/**
* Method sets the orthographic scale for the camers
* @param {number} scale The new orthographic scale
*/
GLGE.Camera.prototype.setOrthoScale=function(scale){
	if(this.type==GLGE.C_ORTHO) {
		this.orthoscale=scale;
		this.pMatrix=null;
	}
	else
	{
		GLGE.error("You may only set a scale for a orthographic camera");
	}
};

/**
* Method gets the far drawing distance
* @return {Matrix} Returns the cameras far draw distance
*/
GLGE.Camera.prototype.getFar=function(){
	return this.far;
};
/**
* Method sets the far draw distance of the camera
* @param {number} distance The far draw distance
*/
GLGE.Camera.prototype.setFar=function(distance){
	this.far=distance;
};

/**
* Method gets the near drawing distance
* @return {Matrix} Returns the cameras near draw distance
*/
GLGE.Camera.prototype.getNear=function(){
	return this.near;
};
/**
* Method sets the near draw distance of the camera
* @param {number} distance The near draw distance
*/
GLGE.Camera.prototype.setNear=function(distance){
	this.near=distance;
};

/**
* Method gets the current camera type
* @return {Matrix} Returns the camera type
*/
GLGE.Camera.prototype.getType=function(){
	return this.type
};
/**
* Method sets the type of camera GLGE.C_PERSPECTIVE or GLGE.C_ORTHO
* @param {number} type The type of this camera
*/
GLGE.Camera.prototype.setType=function(type){
	if(type==GLGE.C_PERSPECTIVE || type==GLGE.C_ORTHO){
		this.type=type;
		this.pMatrix=null;
	}else{
		GLGE.error("unsuported camera type");
	}
};

/**
* Method gets the current yfov if the camera type is GLGE.C_PERSPECTIVE
* @return {Matrix} Returns the yfov
*/
GLGE.Camera.prototype.getFovY=function(){
	if(this.type==GLGE.C_PERSPECTIVE) {
		return this.fovy
	}else{
		GLGE.error("You may only get a yfov for a perspective camera");
		return 1;
	}
};
/**
* Method sets the yfov of the camera
* @param {number} yfov The new yfov of the camera
*/
GLGE.Camera.prototype.setFovY=function(fovy){
	if(this.type==GLGE.C_PERSPECTIVE) {
		this.fovy=fovy;
		this.ymax=null;
		this.pMatrix=null;
	}
	else
	{
		GLGE.error("You may only set a yfov for a perspective camera");
	}
};

/**
* Method gets the current aspect if the camera type is GLGE.C_PERSPECTIVE
* @return {Matrix} Returns the yfov
*/
GLGE.Camera.prototype.getAspect=function(){
	if(this.type==GLGE.C_PERSPECTIVE || this.type==GLGE.C_ORTHO) {
		return this.aspect
	}
	else
	{
		GLGE.error("You may only set a aspect for a perspective or orthographic camera");
		return 1;
	}
};
/**
* Method sets the aspect of the camera
* @param {number} aspect The new projection matrix
*/
GLGE.Camera.prototype.setAspect=function(aspect){
	if(this.type==GLGE.C_PERSPECTIVE || this.type==GLGE.C_ORTHO) {
		this.aspect=aspect;
		this.pMatrix=null;
	}
	else
	{
		GLGE.error("You may only set a aspect for a perspective or orthographic camera");
	}
};


/**
* Method gets the current projection matrix of this camera
* @return {Matrix} Returns the camera projection matrix
*/
GLGE.Camera.prototype.getProjectionMatrix=function(){
	if(!this.pMatrix){
		switch(this.type){
			case GLGE.C_PERSPECTIVE:
				this.pMatrix=GLGE.makePerspective(this.fovy, this.aspect, this.near, this.far);
				break;
			case GLGE.C_ORTHO:
				this.pMatrix=GLGE.makeOrtho(-this.orthoscale*this.aspect,this.orthoscale*this.aspect,-this.orthoscale,this.orthoscale, this.near, this.far);
				break;
		}
	}
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
	var vMatrix=GLGE.translateMatrix(position.x,position.y,position.z);
	vMatrix=vMatrix.x(this.getRotMatrix());
	this.matrix=vMatrix.inverse();
};
/**
* Method generates the cameras view matrix
* @return Returns the view matrix based on this camera
* @type Matrix
*/
GLGE.Camera.prototype.getViewMatrix=function(){
	if(!this.matrix || !this.rotmatrix) this.updateMatrix();
	return this.matrix;
};



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
* @class Scene class containing the camera, lights and objects
*/
GLGE.Scene=function(uid){
	GLGE.Assets.registerAsset(this,uid);
	this.objects=[];
	this.groups=[];
	this.lights=[];
	this.camera=new GLGE.Camera();
	this.backgroundColor={r:1,g:1,b:1};
	this.ambientColor={r:0,g:0,b:0};
	this.fogColor={r:0.5,g:0.5,b:0.5};
}
GLGE.Scene.prototype.camera=null;
GLGE.Scene.prototype.objects=null;
GLGE.Scene.prototype.groups=null;
GLGE.Scene.prototype.lights=null;
GLGE.Scene.prototype.renderer=null;
GLGE.Scene.prototype.backgroundColor=null;
GLGE.Scene.prototype.fogColor=null;
GLGE.Scene.prototype.ambientColor=null;
GLGE.Scene.prototype.fogNear=10;
GLGE.Scene.prototype.fogFar=80;
GLGE.Scene.prototype.fogType=GLGE.FOG_NONE;
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
	this.backgroundColor={r:color.r,g:color.g,b:color.b};
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
* @param {string} color The ambient light color
*/
GLGE.Scene.prototype.setAmbientColor=function(color){	
	color=GLGE.colorParse(color);
	this.ambientColor={r:color.r,g:color.g,b:color.b};
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
	//set the scene index for picking
	object.sceneIndex=this.objects.length;
	this.objects.push(object);
	if(this.renderer) object.GLInit(this.renderer.gl);
	return this.objects.length-1;
}
//alias to add text
GLGE.Scene.prototype.addText=GLGE.Scene.prototype.addObject;
/**
* Adds a group to the scene
* @property {GLGE.Object} object The group to be added
*/
GLGE.Scene.prototype.addGroup=function(object){
	this.groups.push(object);
	object.scene=this;
	var subs=object.getObjects();	
	for(var i=0;i<subs.length;i++){
		this.addObject(subs[i]);
	}

};
/**
* Adds a light source to the scene
* @property {GLGE.Light} light The light to be added
* @returns {Number} The index of the added light
*/
GLGE.Scene.prototype.addLight=function(light){	
	light.scene=this;
	this.lights.push(light);
	if(this.renderer && light.type==GLGE.L_SPOT && !light.texture){
		light.createSpotBuffer(this.renderer.gl);
	}
}
/**
* used to initialize all the WebGL buffers etc need for this scene
* @private
*/
GLGE.Scene.prototype.init=function(){
	//sets the camera aspect to same aspect as the canvas
	this.camera.setAspect(this.renderer.canvas.width/this.renderer.canvas.height);

	this.createPickBuffer(this.renderer.gl);
	this.renderer.gl.clearColor(this.backgroundColor.r, this.backgroundColor.g, this.backgroundColor.b, 1.0);
	
	//get objects to init
	var initObject=this.objects;
	
	for(var i=0;i<initObject.length;i++){
		initObject[i].GLInit(this.renderer.gl);
	}
	for(var i=0;i<this.lights.length;i++){
		if(this.lights[i].type==GLGE.L_SPOT && !this.lights[i].texture){
			this.lights[i].createSpotBuffer(this.renderer.gl);
		}
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
	//if look at is set then look
	if(this.camera.lookAt) this.camera.Lookat(this.camera.lookAt);	
	
	//animate groups
	for(var i=0;i<this.groups.length;i++) if(this.groups[i].animation) this.groups[i].animate();
	
	//shadow stuff
	for(var i=0; i<this.lights.length;i++){
		if(this.lights[i].castShadows){
			gl.bindFramebuffer(gl.FRAMEBUFFER, this.lights[i].frameBuffer);
			gl.viewport(0,0,this.lights[i].bufferWidth,this.lights[i].bufferHeight);
			gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			var cameraMatrix=this.camera.matrix;
			var cameraPMatrix=this.camera.getProjectionMatrix();
			this.camera.setProjectionMatrix(this.lights[i].getPMatrix());
			this.camera.matrix=this.lights[i].getModelMatrix().inv();
			
			//draw shadows
			for(var n=0; n<this.objects.length;n++){
				if(!this.objects[n].zTrans) this.objects[n].GLRender(this.renderer.gl, GLGE.RENDER_SHADOW);
			}
			gl.flush();
			this.camera.matrix=cameraMatrix;
			this.camera.setProjectionMatrix(cameraPMatrix);
			
			gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		}
	}

        gl.viewport(0,0,this.renderer.canvas.width,this.renderer.canvas.height);

	
	var renderObject=this.objects;
	//original stuff
	gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	if(this.camera.animation) this.camera.animate();
	for(var i=0;i<this.lights.length;i++){
		if(this.lights[i].animation) this.lights[i].animate();
	}
	this.renderer.gl.disable(this.renderer.gl.BLEND);
	var transObjects=[];
	for(var i=0; i<renderObject.length;i++){
		if(!renderObject[i].zTrans) renderObject[i].GLRender(this.renderer.gl,GLGE.RENDER_DEFAULT);
			else transObjects.push(i)
	}
	this.renderer.gl.enable(this.renderer.gl.BLEND);
	for(var i=0; i<transObjects.length;i++){
		renderObject[transObjects[i]].GLRender(this.renderer.gl, GLGE.RENDER_DEFAULT);
	}
	
	
	
}
/**
* Sets up the WebGL needed create a picking frame and render buffer
* @private
*/
GLGE.Scene.prototype.createPickBuffer=function(gl){
    this.framePickBuffer = gl.createFramebuffer();
    this.renderPickBuffer = gl.createRenderbuffer();
    this.pickTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.pickTexture);

    //TODO update when null is accepted
    try {
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, null);
    } catch (e) {
        var tex = new WebGLUnsignedByteArray(3);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, 1, 1, 0, gl.RGB, gl.UNSIGNED_BYTE, tex);
    }
    
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.framePickBuffer);
    gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderPickBuffer);
    gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT, 1, 1);
    gl.bindRenderbuffer(gl.RENDERBUFFER, null);
    
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.pickTexture, 0);
    gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, this.renderPickBuffer);
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
}
/**
* Picks and object from canvas coords
* @param x the canvas x coord to pick
* @param y the canvas y coord to pick
*/
GLGE.Scene.prototype.pick=function(x,y){
	if(!this.camera){
		GLGE.error("No camera set for picking");
		return false;
	}else if(this.camera.matrix && this.camera.pMatrix){
		//get camera space coords
		var origmatrix=this.camera.matrix;	
		var origpmatrix=this.camera.pMatrix;
		xcoord =  -( ( ( 2 * x ) / this.renderer.canvas.width ) - 1 ) / this.camera.pMatrix.e(1,1);
		ycoord =( ( ( 2 * y ) / this.renderer.canvas.height ) - 1 ) / this.camera.pMatrix.e(2,2);
		zcoord =  1;
		if(this.camera.type==GLGE.C_PERSPECTIVE){
			var coord=[xcoord,ycoord,zcoord,0];
			coord=this.camera.matrix.inverse().x(coord);
			var cameraPos=this.camera.getPosition();
			var zvec=coord.toUnitVector();
			var xvec=(new GLGE.Vec([0,0,1])).cross(zvec).toUnitVector();
			var yvec=zvec.cross(xvec).toUnitVector();				
			this.camera.matrix=new GLGE.Mat([xvec.e(1), yvec.e(1), zvec.e(1), cameraPos.x,
							xvec.e(2), yvec.e(2), zvec.e(2), cameraPos.y,
							xvec.e(3), yvec.e(3), zvec.e(3), cameraPos.z,
							0, 0, 0, 1]).inverse();
		}
		if(this.camera.type==GLGE.C_ORTHO){
			this.camera.matrix=this.camera.matrix.inv().x(GLGE.translateMatrix(-xcoord,-ycoord,0)).inv();
		}
		this.camera.pMatrix=GLGE.makeOrtho(-0.0001,0.0001,-0.0001,0.0001,this.camera.near,this.camera.far);
		//render for picking
		var gl=this.renderer.gl;
		gl.bindFramebuffer(gl.FRAMEBUFFER, this.framePickBuffer);
		gl.viewport(0,0,1,1);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
		this.renderer.gl.disable(this.renderer.gl.BLEND);

		for(var i=0; i<this.objects.length;i++){
			this.objects[i].GLRender(this.renderer.gl,GLGE.RENDER_PICK);
		}
		var data=gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE);
		//TODO: firefox hack :-( remove when fixed!
		if(data.data) data=data.data;
		var index=data[0]+data[1]*256;
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
		gl.viewport(0,0,this.renderer.canvas.width,this.renderer.canvas.height);
		
		//revert the view matrix
		this.camera.matrix=origmatrix;	
		this.camera.pMatrix=origpmatrix;
		
		if(index>0){
			return this.objects[index-1];
		}else{
			return false;
		}
		
	}else{
		return false;
	}
	


}

/**
* @class Sets the scene to render
* @param {GLGE.Scene} scene The scene to be rendered
*/
GLGE.Renderer=function(canvas){
	this.canvas=canvas;
	try {
		this.gl = canvas.getContext("experimental-webgl",{alpha:false,depth:false,stencil:false,antialias:false,premultipliedAlpha:false});
	} catch(e) {}
	if (!this.gl) {
		alert("What, What Whaaat? No WebGL!");
		throw "cannot create webgl context";
	}

	//chome compatibility
	//TODO: Remove this when chome is right
	if (!this.gl.getProgramParameter)
	{
		this.gl.getProgramParameter = this.gl.getProgrami
	}
	if (!this.gl.getShaderParameter)
	{
		this.gl.getShaderParameter = this.gl.getShaderi
	}
	// End of Chrome compatibility code
	
	//set up defaults
	this.gl.clearDepth(1.0);
	this.gl.enable(this.gl.DEPTH_TEST);
	//this.gl.enable(this.gl.SAMPLE_ALPHA_TO_COVERAGE);
    
	this.gl.depthFunc(this.gl.LEQUAL);
	this.gl.blendFuncSeparate(this.gl.SRC_ALPHA,this.gl.ONE_MINUS_SRC_ALPHA,this.gl.ZERO,this.gl.ONE);
	
	//this.gl.enable(this.gl.CULL_FACE);
	
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
	this.scene.render(this.gl);
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
	this.blendMode=GLGE.BL_MIX;
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
GLGE.MaterialLayer.prototype.blendMode=null;
GLGE.MaterialLayer.prototype.mapto=GLGE.M_COLOR;
GLGE.MaterialLayer.prototype.mapinput=GLGE.UV1;
GLGE.MaterialLayer.prototype.scaleX=1;
GLGE.MaterialLayer.prototype.offsetX=0;
GLGE.MaterialLayer.prototype.rotX=0;
GLGE.MaterialLayer.prototype.scaleY=1;
GLGE.MaterialLayer.prototype.offsetY=0;
GLGE.MaterialLayer.prototype.rotY=0;
GLGE.MaterialLayer.prototype.scaleZ=1;
GLGE.MaterialLayer.prototype.offsetZ=0;
GLGE.MaterialLayer.prototype.rotZ=0;
GLGE.MaterialLayer.prototype.dScaleX=0;
GLGE.MaterialLayer.prototype.dOffsetX=0;
GLGE.MaterialLayer.prototype.dRotX=0;
GLGE.MaterialLayer.prototype.dScaleY=0;
GLGE.MaterialLayer.prototype.dOffsetY=0;
GLGE.MaterialLayer.prototype.dRotY=0;
GLGE.MaterialLayer.prototype.dScaleZ=0;
GLGE.MaterialLayer.prototype.dOffsetZ=0;
GLGE.MaterialLayer.prototype.dRotZ=0;
GLGE.MaterialLayer.prototype.matrix=null;

/**
* Gets the textures used by the layer
* @return {GLGE.Texture} The current shininess of the material
*/
GLGE.MaterialLayer.prototype.getMatrix=function(){
	if(!this.matrix){
		var offset=this.getOffset();
		var scale=this.getScale();
		var rotation=this.getRotation();
		this.matrix=GLGE.translateMatrix(offset.x,offset.y,offset.z).x(GLGE.scaleMatrix(scale.x,scale.y,scale.z).x(GLGE.rotateMatrix(rotation.x,rotation.y,rotation.z)));
	}
	return this.matrix;
};

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
* Gets the layers texture rotation
* @return {object} the current rotation
*/
GLGE.MaterialLayer.prototype.getRotation=function(){
	var rotation={};
	rotation.x=parseFloat(this.getRotX())+parseFloat(this.getDRotX());
	rotation.y=parseFloat(this.getRotY())+parseFloat(this.getDRotY());
	rotation.z=parseFloat(this.getRotZ())+parseFloat(this.getDRotZ());
	return rotation;
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
	this.matrix=null;
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
	this.matrix=null;
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
	this.matrix=null;
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
	this.matrix=null;
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
	this.matrix=null;
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
	this.matrix=null;
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
	this.matrix=null;
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
	this.matrix=null;
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
	this.matrix=null;
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
	this.matrix=null;
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
	this.matrix=null;
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
	this.matrix=null;
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
* Sets the layers texture X Rotation
* @param {Number} value the amount to roate the texture
*/
GLGE.MaterialLayer.prototype.setRotX=function(value){
	this.matrix=null;
	this.rotX=value;
};
/**
* Gets the layers texture X rotate
* @return {Number} the current rotate
*/
GLGE.MaterialLayer.prototype.getRotX=function(){
	return this.rotX;
};
/**
* Sets the layers texture Y rotate
* @param {Number} value the amount to rotate the texture
*/
GLGE.MaterialLayer.prototype.setRotY=function(value){
	this.matrix=null;
	this.rotY=value;
};
/**
* Gets the layers texture Y rotate
* @return {Number} the current rotate
*/
GLGE.MaterialLayer.prototype.getRotY=function(){
	return this.rotY;
};
/**
* Sets the layers texture Z rotate
* @param {Number} value the amount to rotate the texture
*/
GLGE.MaterialLayer.prototype.setRotZ=function(value){
	this.matrix=null;
	this.rotZ=value;
};
/**
* Gets the layers texture Z rotate
* @return {Number} the current rotate
*/
GLGE.MaterialLayer.prototype.getRotZ=function(){
	return this.rotZ;
};
/**
* Sets the layers texture X displacment rotation, useful for animation
* @param {Number} value the amount to rotation the texture
*/
GLGE.MaterialLayer.prototype.setDRotX=function(value){
	this.matrix=null;
	this.dRotX=value;
};
/**
* Gets the layers texture X displacment rotation, useful for animation
* @return {Number} the current rotation
*/
GLGE.MaterialLayer.prototype.getDRotX=function(){
	return this.dRotX;
};
/**
* Sets the layers texture Y displacment rotation, useful for animation
* @param {Number} value the amount to rotaion the texture
*/
GLGE.MaterialLayer.prototype.setDRotY=function(value){
	this.matrix=null;
	this.dRotY=value;
};
/**
* Gets the layers texture Y displacment rotation, useful for animation
* @return {Number} the current rotation
*/
GLGE.MaterialLayer.prototype.getDRotY=function(){
	return this.dRotY;
};
/**
* Sets the layers texture Z displacment rotation, useful for animation
* @param {Number} value the amount to rotation the texture
*/
GLGE.MaterialLayer.prototype.setDRotZ=function(value){
	this.matrix=null;
	this.dRotZ=value;
};
/**
* Gets the layers texture X displacment rotation, useful for animation
* @return {Number} the current rotation
*/
GLGE.MaterialLayer.prototype.getDRotZ=function(){
	return this.dRotZ;
};

/**
* Sets the layers blending mode
* @param {Number} value the blend mode for the layer
*/
GLGE.MaterialLayer.prototype.setBlendMode=function(value){
	this.blendMode=value;
};
/**
* Gets the layers tblending mode
* @return {Number} the blend mode for the layer
*/
GLGE.MaterialLayer.prototype.getBlendMode=function(){
	return this.blendMode;
};




/**
* @class The Material class creates materials to be applied to objects in the graphics engine
* @see GLGE.Object
* @augments GLGE.Animatable
*/
GLGE.Material=function(uid){
	GLGE.Assets.registerAsset(this,uid);
	this.layers=[];
	this.textures=[];
	this.lights=[];
	this.color={r:1,g:1,b:1,a:1};
	this.specColor={r:1,g:1,b:1};
	this.reflect=0.8;
	this.shine=10;
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
* @description Flag for mapping of the height in parallax mapping
*/
GLGE.M_HEIGHT=8192;

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
/**
* @constant 
* @description Enumeration for second normal texture coords
*/
GLGE.MAP_NORM=3;

/**
* @constant 
* @description Enumeration for second object texture coords
*/
GLGE.MAP_OBJ=4;

/**
* @constant 
* @description Enumeration for mix blending mode
*/
GLGE.BL_MIX=0;

/**
* @constant 
* @description Enumeration for mix blending mode
*/
GLGE.BL_MUL=1;
	
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
GLGE.Material.prototype.shadow=true;
/**
* Sets the flag indicateing the material should or shouldn't recieve shadows
* @param {boolean} value The recieving shadow flag
*/
GLGE.Material.prototype.setShadow=function(value){
	this.shadow=value
};
/**
* gets the show flag
* @returns {boolean} The shadow flag
*/
GLGE.Material.prototype.getShadow=function(value){
	return this.shadow;
};
/**
* Sets the base colour of the material
* @param {string} color The colour of the material
*/
GLGE.Material.prototype.setColor=function(color){
	if(!color.r){
		color=GLGE.colorParse(color);
	}
	this.color={r:color.r,g:color.g,b:color.b};
};
/**
* Sets the red base colour of the material
* @param {Number} r The new red level 0-1
*/
GLGE.Material.prototype.setColorR=function(value){
	this.color.r=value;
};
/**
* Sets the green base colour of the material
* @param {Number} g The new green level 0-1
*/
GLGE.Material.prototype.setColorG=function(value){
	this.color.g=value;
};
/**
* Sets the blue base colour of the material
* @param {Number} b The new blue level 0-1
*/
GLGE.Material.prototype.setColorB=function(value){
	this.color.b=value;
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
* @param {string} color The new specular colour
*/
GLGE.Material.prototype.setSpecularColor=function(color){
	if(!color.r){
		color=GLGE.colorParse(color);
	}
	this.specColor={r:color.r,g:color.g,b:color.b};
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
GLGE.Material.prototype.getFragmentShader=function(lights){
	var shader="";
	var tangent=false;
	for(var i=0; i<lights.length;i++){
		if(lights[i].type==GLGE.L_POINT || lights[i].type==GLGE.L_SPOT || lights[i].type==GLGE.L_DIR){
			shader=shader+"varying vec3 lightvec"+i+";\n"; 
			shader=shader+"varying vec3 tlightvec"+i+";\n"; 
			shader=shader+"varying vec3 lightpos"+i+";\n"; 
			shader=shader+"varying vec3 tlightdir"+i+";\n"; 
			shader=shader+"varying float lightdist"+i+";\n";  
			shader=shader+"varying vec2 spotCoords"+i+";\n"; 
		}
	}
	shader=shader+"varying vec3 n;\n";  
	shader=shader+"varying vec3 b;\n";  
	shader=shader+"varying vec3 t;\n";  
	shader=shader+"varying vec4 UVCoord;\n";
	shader=shader+"varying vec3 eyevec;\n"; 
	shader=shader+"varying vec3 OBJCoord;\n";
	shader=shader+"varying vec3 teyevec;\n";

	//texture uniforms
	for(var i=0; i<this.textures.length;i++){
		shader=shader+"uniform sampler2D TEXTURE"+i+";\n";
	}
	var cnt=0;
	var shadowlights=[];
	var num;
	for(var i=0; i<lights.length;i++){
			shader=shader+"uniform vec3 lightcolor"+i+";\n";  
			shader=shader+"uniform vec3 lightAttenuation"+i+";\n";  
			shader=shader+"uniform float spotCosCutOff"+i+";\n";  
			shader=shader+"uniform float spotExp"+i+";\n";  
			shader=shader+"uniform vec3 lightdir"+i+";\n";  
			shader=shader+"uniform mat4 lightmat"+i+";\n";
			shader=shader+"uniform float shadowbias"+i+";\n";  
			shader=shader+"uniform bool castshadows"+i+";\n";  
			if(lights[i].getCastShadows() && this.shadow){
				num=this.textures.length+(cnt++);
				shader=shader+"uniform sampler2D TEXTURE"+num+";\n";
				shadowlights[i]=num;
			}
	}
	for(i=0; i<this.layers.length;i++){		
		shader=shader+"uniform mat4 layer"+i+"Matrix;\n";  
	}
	
	shader=shader+"uniform vec4 baseColor;\n";
	shader=shader+"uniform vec3 specColor;\n";
	shader=shader+"uniform float shine;\n";
	shader=shader+"uniform float specular;\n";
	shader=shader+"uniform float reflective;\n";
	shader=shader+"uniform float emit;\n";
	shader=shader+"uniform float alpha;\n";
	shader=shader+"uniform vec3 amb;\n";
	shader=shader+"uniform float fognear;\n";
	shader=shader+"uniform float fogfar;\n";
	shader=shader+"uniform int fogtype;\n";
	shader=shader+"uniform vec3 fogcolor;\n";
	shader=shader+"uniform float far;\n";
	shader=shader+"uniform mat4 uNMatrix;\n"; 
    
	shader=shader+"void main(void)\n";
	shader=shader+"{\n";
	shader=shader+"float att;\n"; 
	shader=shader+"int texture;\n"; 
	shader=shader+"float mask=1.0;\n";
	shader=shader+"float spec=specular;\n"; 
	shader=shader+"vec3 specC=specColor;\n"; 
	shader=shader+"vec4 texturePos=vec4(1.0,1.0,1.0,1.0);\n"; 
	shader=shader+"vec2 textureCoords=vec2(0.0,0.0);\n"; 
	shader=shader+"vec4 spotCoords=vec4(0.0,0.0,0.0,0.0);\n"; 
	shader=shader+"float ref=reflective;\n";
	shader=shader+"float sh=shine;\n"; 
	shader=shader+"float em=emit;\n"; 
	shader=shader+"float al=alpha;\n"; 
	shader=shader+"vec4 normalmap= vec4(n,0.0);\n"
	shader=shader+"vec4 color = baseColor;"; //set the initial color
	shader=shader+"float pheight=0.0;\n"
	shader=shader+"vec2 textureHeight=vec2(0.0,0.0);\n";
	for(i=0; i<this.layers.length;i++){
		shader=shader+"textureCoords=vec2(0.0,0.0);\n"; 
		
		if(this.layers[i].mapinput==GLGE.UV1 || this.layers[i].mapinput==GLGE.UV2){
			shader=shader+"texturePos=vec4(vec2(UVCoord["+(this.layers[i].mapinput*2)+"],(1.0-UVCoord["+(this.layers[i].mapinput*2+1)+"])),1.0,1.0);\n";
		}
		
		if(this.layers[i].mapinput==GLGE.MAP_NORM){
			shader=shader+"texturePos=vec4(n.xyz,1.0);\n";
		}
		if(this.layers[i].mapinput==GLGE.MAP_OBJ){
			shader=shader+"texturePos=vec4(OBJCoord.xy,1.0);\n";
		}
		
		shader=shader+"textureCoords=(layer"+i+"Matrix * texturePos).xy+textureHeight;\n";
			
		if((this.layers[i].mapto & GLGE.M_COLOR) == GLGE.M_COLOR){			
			if(this.layers[i].blendMode==GLGE.BL_MUL){
				shader=shader+"color = color*(1.0-mask) + color*texture2D(TEXTURE"+this.layers[i].texture.idx+", textureCoords)*mask;\n";
			}
			else 
			{
				shader=shader+"color = color*(1.0-mask) + texture2D(TEXTURE"+this.layers[i].texture.idx+", textureCoords)*mask;\n";
			}
		}        
		if((this.layers[i].mapto & GLGE.M_HEIGHT) == GLGE.M_HEIGHT){
			//do paralax stuff
			shader=shader+"pheight = texture2D(TEXTURE"+this.layers[i].texture.idx+", textureCoords).x;\n";
			shader=shader+"textureHeight =(0.05* (pheight-0.5)  * normalize(teyevec).xy*vec2(1.0,-1.0));\n";
		}
		if((this.layers[i].mapto & GLGE.M_SPECCOLOR) == GLGE.M_SPECCOLOR){
			shader=shader+"specC = specC*(1.0-mask) + texture2D(TEXTURE"+this.layers[i].texture.idx+", textureCoords).rgb*mask;\n";
		}
		if((this.layers[i].mapto & GLGE.M_MSKR) == GLGE.M_MSKR){
			shader=shader+"mask = texture2D(TEXTURE"+this.layers[i].texture.idx+", textureCoords).r;\n";
		}
		if((this.layers[i].mapto & GLGE.M_MSKG) == GLGE.M_MSKG){
			shader=shader+"mask = texture2D(TEXTURE"+this.layers[i].texture.idx+", textureCoords).g;\n";
		}
		if((this.layers[i].mapto & GLGE.M_MSKG) == GLGE.M_MSKB){
			shader=shader+"mask = texture2D(TEXTURE"+this.layers[i].texture.idx+", textureCoords).b;\n";
		}
		if((this.layers[i].mapto & GLGE.M_MSKG) == GLGE.M_MSKA){
			shader=shader+"mask = texture2D(TEXTURE"+this.layers[i].texture.idx+", textureCoords).a;\n";
		}
		if((this.layers[i].mapto & GLGE.M_SPECULAR) == GLGE.M_SPECULAR){
			shader=shader+"spec = spec*(1.0-mask) + texture2D(TEXTURE"+this.layers[i].texture.idx+", textureCoords).r*mask;\n";
		}
		if((this.layers[i].mapto & GLGE.M_REFLECT) == GLGE.M_REFLECT){
			shader=shader+"ref = ref*(1.0-mask) + texture2D(TEXTURE"+this.layers[i].texture.idx+", textureCoords).g*mask;\n";
		}
		if((this.layers[i].mapto & GLGE.M_SHINE) == GLGE.M_SHINE){
			shader=shader+"sh = sh*(1.0-mask) + texture2D(TEXTURE"+this.layers[i].texture.idx+", textureCoords).b*mask*255.0;\n";
		}
		if((this.layers[i].mapto & GLGE.M_EMIT) == GLGE.M_EMIT){
			shader=shader+"em = em*(1.0-mask) + texture2D(TEXTURE"+this.layers[i].texture.idx+", textureCoords).r*mask;\n";
		}
		if((this.layers[i].mapto & GLGE.M_NOR) == GLGE.M_NOR){
			shader=shader+"normalmap = normalmap*(1.0-mask) + texture2D(TEXTURE"+this.layers[i].texture.idx+", textureCoords)*mask;\n";
			tangent=true;
		}
		if((this.layers[i].mapto & GLGE.M_ALPHA) == GLGE.M_ALPHA){
			shader=shader+"al = al*(1.0-mask) + texture2D(TEXTURE"+this.layers[i].texture.idx+", textureCoords).a*mask;\n";
		}
	}
	if(tangent){
		shader=shader+"vec3 normal = normalize(normalmap.rgb)*2.0-1.0;\n";
	}else{
		shader=shader+"vec3 normal = normalize(n);\n";
	}
	shader=shader+"vec3 lightvalue=amb;\n"; 
	shader=shader+"vec3 specvalue=vec3(0.0,0.0,0.0);\n"; 
	shader=shader+"float dotN,spotEffect;";
	shader=shader+"vec3 lightvec=vec3(0.0,0.0,0.0);";
	shader=shader+"vec3 viewvec=vec3(0.0,0.0,0.0);";
	for(var i=0; i<lights.length;i++){
	
		if(tangent){
			shader=shader+"lightvec=tlightvec"+i+"*vec3(-1.0,-1.0,1.0);\n";  
			shader=shader+"viewvec=teyevec*vec3(-1.0,-1.0,1.0);\n";  
		}else{
			shader=shader+"lightvec=lightvec"+i+";\n";  
			shader=shader+"viewvec=eyevec;\n"; 
		}
		
		if(lights[i].type==GLGE.L_POINT){ 
			shader=shader+"dotN=max(dot(normal,normalize(-lightvec)),0.0);\n";       
			shader=shader+"if(dotN>0.0){\n";
			shader=shader+"att = 1.0 / (lightAttenuation"+i+"[0] + lightAttenuation"+i+"[1] * lightdist"+i+" + lightAttenuation"+i+"[2] * lightdist"+i+" * lightdist"+i+");\n";
			if(lights[i].diffuse){
				shader=shader+"lightvalue += att * dotN * lightcolor"+i+";\n";
			}
			shader=shader+"}\n";
			
			if(lights[i].specular){
				shader=shader+"specvalue += att * specC * lightcolor"+i+" * spec  * pow(max(dot(reflect(normalize(lightvec), normal),normalize(viewvec)),0.0), sh);\n";
			}
		}
		shader=shader+"spotEffect = 0.0;\n";
		if(lights[i].type==GLGE.L_SPOT){
			shader=shader+"spotEffect = dot(normalize(lightdir"+i+"), normalize(-lightvec"+i+"));";	
			shader=shader+"if (spotEffect > spotCosCutOff"+i+") {\n";		
			shader=shader+"spotEffect = pow(spotEffect, spotExp"+i+");";
			//spot shadow stuff
			if(lights[i].getCastShadows() && this.shadow){
				shader=shader+"if(castshadows"+i+"){\n";
				shader=shader+"spotCoords=lightmat"+i+"*vec4(OBJCoord,1.0);";
				shader=shader+"spotCoords=(vec4(spotCoords.xy/(spotCoords.z*tan(acos(spotCosCutOff"+i+"))),0.0,1.0)/2.0)-0.5;";
				shader=shader+"vec4 dist = texture2D(TEXTURE"+shadowlights[i]+", -spotCoords.xy);";
				shader=shader+"float depth = dot(dist, vec4(1.0, 0.00390625, 0.0000152587890625, 0.000000059604644775390625))*1000.0;\n";
				shader=shader+"if(depth*shadowbias"+i+"<length(lightvec"+i+")){";
				shader=shader+"spotEffect=0.0;";
				shader=shader+"}\n";
				shader=shader+"}";
			}

			
			shader=shader+"dotN=max(dot(normal,normalize(-lightvec)),0.0);\n";       
			shader=shader+"if(dotN>0.0){\n";
			shader=shader+"att = spotEffect / (lightAttenuation"+i+"[0] + lightAttenuation"+i+"[1] * lightdist"+i+" + lightAttenuation"+i+"[2] * lightdist"+i+" * lightdist"+i+");\n";
			if(lights[i].diffuse){
				shader=shader+"lightvalue += att * dotN * lightcolor"+i+";\n";
			}
			if(lights[i].specular){
				shader=shader+"specvalue += att * specC * lightcolor"+i+" * spec  * pow(max(dot(reflect(normalize(lightvec), normal),normalize(viewvec)),0.0), sh);\n";
			}
			shader=shader+"}\n}\n";
		}
		if(lights[i].type==GLGE.L_DIR){
			shader=shader+"dotN=max(dot(normal,-normalize(lightvec)),0.0);\n";       
			if(lights[i].diffuse){
				shader=shader+"lightvalue += dotN * lightcolor"+i+";\n";
			}
			if(lights[i].specular){
				shader=shader+"specvalue += specC * lightcolor"+i+" * spec  * pow(max(dot(reflect(normalize(lightvec), normal),normalize(viewvec)),0.0), sh);\n";
			}
		}
	}
	shader=shader+"float fogfact=1.0;";
	shader=shader+"if(fogtype=="+GLGE.FOG_QUADRATIC+") fogfact=clamp(pow(max((fogfar - length(eyevec)) / (fogfar - fognear),0.0),2.0),0.0,1.0);\n";
	shader=shader+"if(fogtype=="+GLGE.FOG_LINEAR+") fogfact=clamp((fogfar - length(eyevec)) / (fogfar - fognear),0.0,1.0);\n";
	
	shader=shader+"lightvalue = (lightvalue)*ref;\n";
	shader=shader+"if(em>0.0) lightvalue=vec3(1.0,1.0,1.0);\n";
	shader=shader+"gl_FragColor =vec4(specvalue.rgb+color.rgb*(em+1.0)*lightvalue.rgb,al)*fogfact+vec4(fogcolor,al)*(1.0-fogfact);\n";
	//shader=shader+"gl_FragColor =vec4(normal,1.0);\n";
	
	shader=shader+"}\n";
	return shader;
};
/**
* Set the uniforms needed to render this material
* @private
*/
GLGE.Material.prototype.textureUniforms=function(gl,shaderProgram,lights){
	if(this.animation) this.animate();
	gl.uniform4f(GLGE.getUniformLocation(gl,shaderProgram, "baseColor"), this.color.r,this.color.g,this.color.b,this.color.a);
	gl.uniform3f(GLGE.getUniformLocation(gl,shaderProgram, "specColor"), this.specColor.r,this.specColor.g,this.specColor.b);
	gl.uniform1f(GLGE.getUniformLocation(gl,shaderProgram, "specular"), this.specular);
	gl.uniform1f(GLGE.getUniformLocation(gl,shaderProgram, "shine"), this.shine);
	gl.uniform1f(GLGE.getUniformLocation(gl,shaderProgram, "reflective"), this.reflect);
	gl.uniform1f(GLGE.getUniformLocation(gl,shaderProgram, "emit"), this.emit);
	gl.uniform1f(GLGE.getUniformLocation(gl,shaderProgram, "alpha"), this.alpha);
	var cnt=0;
	var num=0;
	for(var i=0; i<lights.length;i++){
		gl.uniform3f(GLGE.getUniformLocation(gl,shaderProgram, "lightcolor"+i), lights[i].color.r,lights[i].color.g,lights[i].color.b);
		gl.uniform3f(GLGE.getUniformLocation(gl,shaderProgram, "lightAttenuation"+i), lights[i].constantAttenuation,lights[i].linearAttenuation,lights[i].quadraticAttenuation);
		gl.uniform1f(GLGE.getUniformLocation(gl,shaderProgram, "spotCosCutOff"+i), lights[i].spotCosCutOff);
		gl.uniform1f(GLGE.getUniformLocation(gl,shaderProgram, "spotExp"+i), lights[i].spotExponent);
		gl.uniform1f(GLGE.getUniformLocation(gl,shaderProgram, "shadowbias"+i), lights[i].shadowBias);
		gl.uniform1i(GLGE.getUniformLocation(gl,shaderProgram, "castshadows"+i), lights[i].castShadows);
		    
		//shadow code
		if(lights[i].getCastShadows() && this.shadow) {
			num=this.textures.length+(cnt++);
			gl.activeTexture(gl["TEXTURE"+num]);
			gl.bindTexture(gl.TEXTURE_2D, lights[i].texture);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR);
			gl.generateMipmap(gl.TEXTURE_2D);
		    
			gl.uniform1i(GLGE.getUniformLocation(gl,shaderProgram, "TEXTURE"+num), num);
		}
	
			
	}
	
	var scale,offset;
	for(i=0; i<this.layers.length;i++){
		if(this.layers[i].animation) this.layers[i].animate();
		scale=this.layers[i].getScale();
		offset=this.layers[i].getOffset();		
		gl.uniformMatrix4fv(GLGE.getUniformLocation(gl,shaderProgram, "layer"+i+"Matrix"), false, this.layers[i].getMatrix().glData());
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
		gl.uniform1i(GLGE.getUniformLocation(gl,shaderProgram, "TEXTURE"+i), i);
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


