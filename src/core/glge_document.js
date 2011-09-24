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
 * @name glge_document.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){




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
GLGE.Document.prototype.version=0;
GLGE.Document.prototype.preloader=null;
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
	if(path.substr(0,7)=="http://" || path.substr(0,7)=="file://"  || path.substr(0,8)=="https://"){
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
		for(var i=0;i<locpath.length;i++){
			if(locpath[i]=="..") initpath.pop();
				else if(locpath[i]!="") initpath.push(locpath[i]);
		}
		return proto+"//"+domain+"/"+initpath.join("/");
	}
}
/**
* Loads the root document
* @param {string} url URL of the resource to load
* @param {object} preload Decides if a preloader is used. true: default preloader, object: specialized preloader
*/
GLGE.Document.prototype.load=function(url, preload){
	
	if(preload)
		this.usePreloader(preload);
	
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
	
	if(this.preloader)
	{
		this.preloader.loadXMLFile(url);
	}
	else
	{
		var req = new XMLHttpRequest();
		if(req) {
			req.docurl=url;
			req.docObj=this;
			req.overrideMimeType("text/xml");
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
}
/**
* Trigered when a document has finished loading
* @param {string} url the absolute url of the document that has loaded
* @param {XMLDoc} responceXML the xml document that has finished loading
* @private
*/
GLGE.Document.prototype.loaded=function(url,responceXML){
	this.loadCount--;
	this.documents[url]={'xml':responceXML, 'url':url};
	var root=responceXML.getElementsByTagName("glge");
	if(root[0] && root[0].hasAttribute("version")) this.version=parseFloat(root[0].getAttribute("version"));
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
	this["onLoad"]();
}
/**
* Called when all documents have finished loading
* @event
*/
GLGE.Document.prototype["onLoad"]=function(){};
/**
* Use a preloader
* @param {object} [object]	This object contains optional parameters. Example1: {XMLQuota: 0.30, XMLBytes: 852605}, Example2: {XMLQuota: 0.13, numXMLFiles: 1}, Example3: true
*/
GLGE.Document.prototype.usePreloader = function(args){
	this.preloader = new GLGE.DocumentPreloader(this, args);
	var that = this;
	this.addLoadListener(function(url){that.preloadImages.call(that);});	
}
/**
* Start preloading images. This function should be called when the document (xml) is loaded.
* @private
*/
GLGE.Document.prototype.preloadImages = function(){
	var imageArrays = []; // 2 dimensional
	var docUrls = [];
	
	// create an array of all images
	for(var doc in this.documents){
		if(this.documents[doc].xml){
			imageArrays.push(this.documents[doc].xml.getElementsByTagName("texture"));
			docUrls.push(this.documents[doc].url);
		}
	}
	
	// add images to the preloader
	for(var a in imageArrays){
		for(var i=0; i<imageArrays[a].length; i++){
			var src = imageArrays[a][i].getAttribute("src");
			if(src)
				this.preloader.addImage(this.getAbsolutePath(src, docUrls[a]));
		}
	}
	this.preloader.loadImages();
}
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
		//if a uid is set in the xml doc then make sure it's registered correctly in the assets
		if(Obj.attributes[i].nodeName=="uid"){
			GLGE.Assets.unregisterAsset(Obj.object.uid);
			Obj.object.uid=Obj.attributes[i].value;
			GLGE.Assets.registerAsset(Obj.object,Obj.attributes[i].value);
		}
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
		for(var doc in this.documents){
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
* Parses the a data array
* @param {domelement} ele the element to create the objects from
* @private
*/
GLGE.Document.prototype.getData=function(ele){
	if(!ele.object){
		ele.object=this.parseArray(ele);
		if(ele.hasAttribute("type")){
			var type=ele.getAttribute("type");
			switch(type){
				case "matrix":
					for(var i=0;i<ele.object.length;i++){
						ele.object[i]=GLGE.Mat4(ele.object[i].split(" "));
					}
					break;
				case "links":
					for(var i=0;i<ele.object.length;i++){
						ele.object[i]=this.getElement(ele.object[i].substr(1));
					}
					break;
			}
		}
	}
	return ele.object;
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
		ele.object=new GLGE[this.classString(ele.tagName)];
		ele.object.setSrc(this.getAbsolutePath(ele.getAttribute("src"),rel));
		ele.removeAttribute("src");
		this.setProperties(ele);
	}
	return ele.object;
}
GLGE.Document.prototype.getTextureVideo=GLGE.Document.prototype.getTexture;

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
		for(var i=0;i<currentArray.length;i++) output.push(currentArray[i]);
	}
	return output;
}

/**
* Parses the mesh dom to create the mesh object
* @param {domelement} ele the element to create the mesh from
* @private
*/
GLGE.Document.prototype.getMesh=function(ele){
	if(this.version>0) return this.getDefault(ele); //as of GLGE XML 1.0 the mesh is nothing special!
	
	if(!ele.object){
		ele.object=new GLGE.Mesh();
		this.setProperties(ele);
		var child=ele.firstChild;
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
				case "color":
					ele.object.setVertexColors(this.parseArray(child));
					break;
				case "joint_names":
					var names=this.parseArray(child);
					var jointObjects=[];
					for(var i=0;i<names.length;i++){
						if(names[i].substr(0,1)=="#"){
							jointObjects.push(this.getElement(names[i].substr(1)));
						}else{
							jointObjects.push(names[i]);
						}
					}
					ele.object.setJoints(jointObjects);
					break;
				case "bind_matrix":
					var mats=this.parseArray(child);
					var invBind=[];
					for(var i=0;i<mats.length;i++){
						invBind.push(GLGE.Mat4(mats[i].split(" ")));
					}
					ele.object.setInvBindMatrix(invBind);
					break;
				case "joints":
					ele.object.setVertexJoints(this.parseArray(child),child.getAttribute("count"));
					break;
				case "weights":
					ele.object.setVertexWeights(this.parseArray(child),child.getAttribute("count"));
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
	this.listeners.push(listener);
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
* loads xml from a script tag
* @param {string} id the id of the element to load
*/
GLGE.Document.prototype.parseScript=function(id){
	this.rootURL=window.location.toString();
	var xmlScript = document.getElementById(id);
	if (!xmlScript) {
		return null;
	}
 
	var str = "";
	var k = xmlScript.firstChild;
	while (k) {
		if (k.nodeType == 3) {
			str += k.textContent;
		}
		k = k.nextSibling;
	}
	
	var parser=new DOMParser();
	var xmlDoc=parser.parseFromString(str,"text/xml");
	xmlDoc.getElementById=this.getElementById;
	
	this.documents["#"+id]={xml:xmlDoc};

	var imports=xmlDoc.getElementsByTagName("import");
	for(var i=0; i<imports.length;i++){
		if(!this.documents[this.getAbsolutePath(imports[i].getAttribute("url"),url)]){
			this.documents[this.getAbsolutePath(imports[i].getAttribute("url"),url)]={};
			this.loadDocument(imports[i].getAttribute("url"));
		}
	}
	if(this.loadCount==0){
		this.finishedLoading();
	}
}


})(GLGE);
