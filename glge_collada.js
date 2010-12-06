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
 * @name glge_collada.js
 * @author me@paulbrunt.co.uk
 */
 
if(!GLGE){
	var GLGE={};
}
 
(function(GLGE){
 GLGE.ColladaDocuments=[];
 

 
 
/**
* @class Class to represent a collada object
* @augments GLGE.Group
*/
GLGE.Collada=function(){
	this.children=[];
	this.actions={};
	this.boneIdx=0;
	this.actionsIdx=0;
};
GLGE.augment(GLGE.Group,GLGE.Collada);
GLGE.Collada.prototype.type=GLGE.G_NODE;
/**
* Gets the absolute path given an import path and the path it's relative to
* @param {string} path the path to get the absolute path for
* @param {string} relativeto the path the supplied path is relativeto
* @returns {string} absolute path
* @private
*/
GLGE.Collada.prototype.getAbsolutePath=function(path,relativeto){
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
* function to get the element with a specified id
* @param {string} id the id of the element
* @private
*/
GLGE.Collada.prototype.getElementById=function(id){
	if(!this.idcache){
		var tags=this.getElementsByTagName("*");
		var attribid;
		this.idcache={};
		for(var i=0; i<tags.length;i++){
			attribid=tags[i].getAttribute("id");
			if(attribid!="") this.idcache[attribid]=tags[i];
		}
	}
	return this.idcache[id];
}


/**
* function extracts a javascript array from the document
* @param {DOM Element} node the value to parse
* @private
*/
GLGE.Collada.prototype.parseArray=function(node){
	var value;
	var child=node.firstChild;
	var prev="";
	var output=[];
	var currentArray;
	var i;
	while(child){
		currentArray=(prev+child.nodeValue).replace(/\s+/g," ").replace(/^\s+/g,"").split(" ");
		child=child.nextSibling;
		if(currentArray[0]=="") currentArray.unshift();
		if(child) prev=currentArray.pop();
		for(i=0;i<currentArray.length;i++) if(currentArray[i]!="") output.push(currentArray[i]);
	}
	return output;
};
/**
* loads an collada file from a given url
* @param {DOM Element} node the value to parse
* @param {string} relativeTo optional the path the url is relative to
*/
GLGE.Collada.prototype.setDocument=function(url,relativeTo){
	this.url=url;
	//use # to determine the is of the asset to extract
	if(url.indexOf("#")!=-1){
		this.rootId=url.substr(url.indexOf("#")+1);
		url=url.substr(0,url.indexOf("#"));
	}
	if(relativeTo) url=this.getAbsolutePath(url,relativeTo);
	this.docURL=url;
	if(GLGE.ColladaDocuments[url]){
		this.xml=GLGE.ColladaDocuments[url];
	}else{
		var req = new XMLHttpRequest();
		if(req) {
			req.overrideMimeType("text/xml")
			var docurl=url;
			var docObj=this;
			req.onreadystatechange = function() {
				if(this.readyState  == 4)
				{
					if(this.status  == 200 || this.status==0){
						this.responseXML.getElementById=docObj.getElementById;
						docObj.loaded(docurl,this.responseXML);
					}else{ 
						GLGE.error("Error loading Document: "+docurl+" status "+this.status);
					}
				}
			};
			req.open("GET", url, true);
			req.send("");
		}	
	}
};

/**
* gets data for a given source element
* @param {string} id the id of the source element
* @private
*/
GLGE.Collada.prototype.getSource=function(id){
	var element=this.xml.getElementById(id);
	if(!element.jsArray || this.badAccessor){
		var value;
		if(element.tagName=="vertices"){
			value=[];
			var inputs=element.getElementsByTagName("input");
			for(var i=0;i<inputs.length;i++){
				value[i]=this.getSource(inputs[i].getAttribute("source").substr(1));
				value[i].block=inputs[i].getAttribute("semantic");
			}
		}else{
			var accessor=element.getElementsByTagName("technique_common")[0].getElementsByTagName("accessor")[0];
			var sourceArray=this.xml.getElementById(accessor.getAttribute("source").substr(1));
			var type=sourceArray.tagName;
			value=this.parseArray(sourceArray);
			stride=parseInt(accessor.getAttribute("stride"));
			offset=parseInt(accessor.getAttribute("offset"));
			if(!offset) offset=0;
			if(!stride) stride=1;
			count=parseInt(accessor.getAttribute("count"));
			var params=accessor.getElementsByTagName("param");
			var pmask=[];
			for(var i=0;i<params.length;i++){if(params[i].hasAttribute("name") || this.exceptions.badAccessor || this.badAccessor) pmask.push({type:params[i].getAttribute("type"),name:params[i].getAttribute("name")}); else pmask.push(false);}
			value={array:value,stride:stride,offset:offset,count:count,pmask:pmask,type:type};
		}	

		element.jsArray=value;
	}
	
	return element.jsArray;
};


var meshCache={};

/**
* Creates a new object and added the meshes parse in the geomertry
* @param {string} id id of the geomerty to parse
* @private
*/
GLGE.Collada.prototype.getMeshes=function(id,skeletonData){
	if(!meshCache[this.url]) meshCache[this.url]=[];
	if(meshCache[this.url][id]) return meshCache[this.url][id];
	
	var i,n;
	var mesh;
	var inputs;
	var inputArray;		
	var vertexJoints;
	var vertexWeights;
	var faces;
	var outputData;
	var block;
	var set;
	var rootNode=this.xml.getElementById(id);
	var meshNode=rootNode.getElementsByTagName("mesh")[0];
	var meshes=[];
	if(!meshNode) return meshes;
	
	//convert polylists to triangles my head hurts now :-(
	var polylists=meshNode.getElementsByTagName("polylist");
	for(i=0;i<polylists.length;i++){
		faces=this.parseArray(polylists[i].getElementsByTagName("p")[0]);
		vcount=this.parseArray(polylists[i].getElementsByTagName("vcount")[0]);
		var inputcount=polylists[i].getElementsByTagName("input");
		var maxoffset=0;
		for(n=0;n<inputcount.length;n++) maxoffset=Math.max(maxoffset,inputcount[n].getAttribute("offset"));
		var tris=[];
		var cnt=0;
		for(n=0;n<vcount.length;n++){
		
			for(j=0; j<vcount[n]-2;j++){
				for(k=0;k<=maxoffset;k++){
					tris.push(faces[cnt+k]);
				}
				for(k=0;k<=maxoffset;k++){
					tris.push(faces[cnt+(maxoffset+1)*(j+1)+k]);
				}
				for(k=0;k<=maxoffset;k++){
					tris.push(faces[cnt+(maxoffset+1)*(j+2)+k]);
				}
			}
			cnt=cnt+(maxoffset+1)*vcount[n];
		}
		polylists[i].getElementsByTagName("p")[0].data=tris;
	}
	
	//convert polygons to tris
	var polygons=meshNode.getElementsByTagName("polygons");
	for(i=0;i<polygons.length;i++){
		var polys=polygons[i].getElementsByTagName("p");
		var tris=[];
		for(var l=0;l<polys.length;l++){
			var faces=this.parseArray(polys[l]);
			var inputcount=polygons[i].getElementsByTagName("input");
			var maxoffset=0;
			for(n=0;n<inputcount.length;n++) maxoffset=Math.max(maxoffset,inputcount[n].getAttribute("offset"));
			var cnt=0;
			for(j=0; j<(faces.length/(maxoffset+1))-2;j++){
				for(k=0;k<=maxoffset;k++){
					tris.push(faces[cnt+k]);
				}
				for(k=0;k<=maxoffset;k++){
					tris.push(faces[cnt+(maxoffset+1)*(j+1)+k]);
				}
				for(k=0;k<=maxoffset;k++){
					tris.push(faces[cnt+(maxoffset+1)*(j+2)+k]);
				}
			}
			cnt=cnt+(maxoffset+1)*(faces.length/(maxoffset+1));
		}
		if(polys.length>0) polygons[i].getElementsByTagName("p")[0].data=tris;
	}
	
	
	//create a mesh for each set of faces
	var triangles=[];
	var tris=meshNode.getElementsByTagName("triangles");
	for(i=0;i<polylists.length;i++){triangles.push(polylists[i])};
	for(i=0;i<polygons.length;i++){if(polygons[i].getElementsByTagName("p").length>0) triangles.push(polygons[i])};
	for(i=0;i<tris.length;i++){triangles.push(tris[i])};
	
	for(i=0;i<triangles.length;i++){
		//go though the inputs to get the data layout
		inputs=triangles[i].getElementsByTagName("input");
		vertexJoints=[];
		vertexWeights=[];
		inputArray=[];
		outputData={};
		for(n=0;n<inputs.length;n++){
			inputs[n].data=this.getSource(inputs[n].getAttribute("source").substr(1));
			block=inputs[n].getAttribute("semantic");
			if(block=="TEXCOORD"){
					set=inputs[n].getAttribute("set");
					if(!set) set=0;
					block=block+set;
			}
			if(block=="VERTEX"){
				for(var l=0;l<inputs[n].data.length;l++){
					outputData[inputs[n].data[l].block]=[];
				}
			}
			inputs[n].block=block;
			outputData[block]=[];
			inputArray[inputs[n].getAttribute("offset")]=inputs[n];
		}
		//get the face data and push the data into the mesh
		if(triangles[i].getElementsByTagName("p")[0].data) faces=triangles[i].getElementsByTagName("p")[0].data;
			else faces=this.parseArray(triangles[i].getElementsByTagName("p")[0]);

		var pcnt;
		for(var n=0;n<inputArray.length;n++){
			if(inputArray[n].block!="VERTEX"){
				inputArray[n].data=[inputArray[n].data];
				inputArray[n].data[0].block=inputArray[n].block;
			}
		}
		
		for(j=0;j<faces.length;j=j+inputArray.length){
			for(n=0;n<inputArray.length;n++){
				for(var l=0;l<inputArray[n].data.length;l++){
					var block=inputArray[n].data[l].block;
					pcnt=0;
					for(k=0;k<inputArray[n].data[l].stride;k++){
						if(inputArray[n].data[l].pmask[k]){
							outputData[block].push(inputArray[n].data[l].array[faces[j+n]*inputArray[n].data[l].stride+k+inputArray[n].data[l].offset]);
							pcnt++;
						}
					}
					if(skeletonData && block=="POSITION"){
						for(k=0;k<skeletonData.count;k++){
							vertexJoints.push(skeletonData.vertexJoints[faces[j+n]*skeletonData.count+k]);
							vertexWeights.push(skeletonData.vertexWeight[faces[j+n]*skeletonData.count+k]);
						}
					}
					//account for 1D and 2D
					if(block=="POSITION" && pcnt==1) outputData[block].push(0);
					if(block=="POSITION" && pcnt==2) outputData[block].push(0);
					//we can't handle 3d texcoords at the moment so try two
					if(block=="TEXCOORD0" && pcnt==3) outputData[block].pop();
					if(block=="TEXCOORD1" && pcnt==3) outputData[block].pop();
				}
			}
		}
		
		//create faces array
		faces=[];
		for(n=0;n<outputData.POSITION.length/3;n++) faces.push(n);
		//create mesh
		var trimesh=new GLGE.Mesh();
		if(!outputData.NORMAL){
			outputData.NORMAL=[];
			for(n=0;n<outputData.POSITION.length;n=n+9){
				var vec1=GLGE.subVec3([outputData.POSITION[n],outputData.POSITION[n+1],outputData.POSITION[n+2]],[outputData.POSITION[n+3],outputData.POSITION[n+4],outputData.POSITION[n+5]]);
				var vec2=GLGE.subVec3([outputData.POSITION[n+6],outputData.POSITION[n+7],outputData.POSITION[n+8]],[outputData.POSITION[n],outputData.POSITION[n+1],outputData.POSITION[n+2]]);
				var vec3=GLGE.toUnitVec3(GLGE.crossVec3(GLGE.toUnitVec3(vec2),GLGE.toUnitVec3(vec1)));
				outputData.NORMAL.push(vec3[0]);
				outputData.NORMAL.push(vec3[1]);
				outputData.NORMAL.push(vec3[2]);
				outputData.NORMAL.push(vec3[0]);
				outputData.NORMAL.push(vec3[1]);
				outputData.NORMAL.push(vec3[2]);
				outputData.NORMAL.push(vec3[0]);
				outputData.NORMAL.push(vec3[1]);
				outputData.NORMAL.push(vec3[2]);
			}
		}
		
		trimesh.setPositions(outputData.POSITION);
		trimesh.setNormals(outputData.NORMAL);
		if(outputData.TEXCOORD0) trimesh.setUV(outputData.TEXCOORD0);
		if(!outputData.TEXCOORD0 && outputData.TEXCOORD1) trimesh.setUV(outputData.TEXCOORD1);
		if(outputData.TEXCOORD1) trimesh.setUV2(outputData.TEXCOORD1);
		if(skeletonData){
			if(skeletonData.count>8){
				var newjoints=[];
				var newweights=[];
				for(var j=0;j<vertexWeights.length;j=j+skeletonData.count){
					var tmp=[];
					for(k=0;k<skeletonData.count;k++){
						tmp.push({weight:vertexWeights[j+k],joint:vertexJoints[j+k]});
					}
					tmp.sort(function(a,b){return parseFloat(b.weight)-parseFloat(a.weight)});
					for(k=0;k<8;k++){
						newjoints.push(tmp[k].joint);
						newweights.push(tmp[k].weight);
					}
				}
				vertexJoints=newjoints;
				vertexWeights=newweights;
				skeletonData.count=8;
			}
			
			trimesh.setJoints(skeletonData.joints);
			trimesh.setInvBindMatrix(skeletonData.inverseBindMatrix);
			trimesh.setVertexJoints(vertexJoints,skeletonData.count);
			trimesh.setVertexWeights(vertexWeights,skeletonData.count);
		}
		
		trimesh.setFaces(faces);
		trimesh.matName=triangles[i].getAttribute("material");

		meshes.push(trimesh);
	}
	meshCache[this.url][id]=meshes;
	return meshes;
};

/**
* Gets the float4 parameter for a shader
* @private
*/
GLGE.Collada.prototype.getFloat4=function(profile,sid){
    // MCB: it's possible for newparam to be in effect scope
	var params=profile.getElementsByTagName("newparam");
	for(var i=0;i<params.length;i++){
		if(params[i].getAttribute("sid")==sid){
			return params[i].getElementsByTagName("float4")[0].firstChild.nodeValue;
			break;
		}
	}
	return null;
}

/**
* Gets the float parameter for a shader
* @private
*/
GLGE.Collada.prototype.getFloat=function(profile,sid){
    // MCB: it's possible for newparam to be in effect scope
	var params=profile.getElementsByTagName("newparam");
	for(var i=0;i<params.length;i++){
		if(params[i].getAttribute("sid")==sid){
			return params[i].getElementsByTagName("float")[0].firstChild.nodeValue;
			break;
		}
	}
	return null;
}

/**
* Gets the sampler for a texture
* @private
*/
GLGE.Collada.prototype.getSampler=function(profile,sid){
    // MCB: it's possible for newparam to be in effect scope
	var params=profile.getElementsByTagName("newparam");
	for(var i=0;i<params.length;i++){
		if(params[i].getAttribute("sid")==sid){
			//only do 2d atm.
			return params[i].getElementsByTagName("sampler2D")[0].getElementsByTagName("source")[0].firstChild.nodeValue;
			break;
		}
	}
	return null;
}
/**
* Gets the surface for a texture
* @private
*/
GLGE.Collada.prototype.getSurface=function(profile,sid){
    // MCB: it's possible for newparam to be in effect scope
	var params=profile.getElementsByTagName("newparam");
	for(var i=0;i<params.length;i++){
		if(params[i].getAttribute("sid")==sid){
			return params[i].getElementsByTagName("surface")[0].getElementsByTagName("init_from")[0].firstChild.nodeValue;
			break;
		}
	}
	return null;
}

/**
* Gets the the collada image location
* @private
*/
GLGE.Collada.prototype.getImage=function(id){
	var image=this.xml.getElementById(id);
	if(!image) return;
	return this.getAbsolutePath(image.getElementsByTagName("init_from")[0].firstChild.nodeValue,this.docURL);

}

/**
* creates a material layer
* @private
*/
GLGE.Collada.prototype.createMaterialLayer=function(node,material,common,mapto){
	var textureImage;
	var imageid=this.getSurface(common,this.getSampler(common,node.getAttribute("texture")));
	if(!imageid) imageid=node.getAttribute("texture"); //assume converter bug  - workround
	textureImage=this.getImage(imageid);
	var texture=new GLGE.Texture();
	texture.setSrc(textureImage);
	material.addTexture(texture);
	var layer=new GLGE.MaterialLayer();
	layer.setTexture(texture);
	layer.setMapto(mapto);
	layer.setMapinput(GLGE.UV1);
	if(node.getElementsByTagName("blend_mode")[0]) var blend=node.getElementsByTagName("blend_mode")[0].firstChild.nodeValue;
	if(blend=="MULTIPLY")  layer.setBlendMode(GLGE.BL_MUL);
	material.addMaterialLayer(layer);
}


/**
 * Function will get element by id starting from specified node.
 * Author: Renato Bebić <renato.bebic@gmail.com>
 *
 * The material getter below borked if there is e.g. a scene node with the same name as the material.
 * This is used to fix that by only looking for materials in the library_materials element.
 */
function getChildElementById( dNode, id ) {

	var dResult = null;

	if ( dNode.getAttribute('id') == id )
		return dNode;

	for ( var i = 0; i < dNode.childNodes.length; i++ ) {
		if ( dNode.childNodes[i].nodeType == 1 ) {
                        dResult = getChildElementById( dNode.childNodes[i], id ); //note: 1-level deep would suffice here, doesn't need to recurse into further childs. but this works.
                        if ( dResult != null )
				break;
		}
	}

	return dResult;
}

var MaterialCache={};

/**
* Gets the sampler for a texture
* @param {string} id the id or the material element
* @private
*/
GLGE.Collada.prototype.getMaterial=function(id){	
	if(!MaterialCache[this.url]) MaterialCache[this.url]={};
	if(MaterialCache[this.url][id]){
		return MaterialCache[this.url][id];
	}
	
    	var materialLib=this.xml.getElementsByTagName("library_materials")[0];
	var materialNode=getChildElementById(materialLib, id); //this.xml.getElementById(id);
	var effectid=materialNode.getElementsByTagName("instance_effect")[0].getAttribute("url").substr(1);
	var effect=this.xml.getElementById(effectid);
	var common=effect.getElementsByTagName("profile_COMMON")[0];
	//glge only supports one technique currently so try and match as best we can
	var technique=common.getElementsByTagName("technique")[0];
	var returnMaterial=new GLGE.Material();
	returnMaterial.setSpecular(0);
	
	MaterialCache[this.url][id]=returnMaterial;
	
	var child;
	var color;
	
	//do diffuse color
	var diffuse=technique.getElementsByTagName("diffuse");
	if(diffuse.length>0){
		child=diffuse[0].firstChild;
		do{
			switch(child.tagName){
				case "color":
					color=child.firstChild.nodeValue.replace(/\s+/g,' ').split(" ");
					returnMaterial.setColor({r:color[0],g:color[1],b:color[2]});
					break;
				case "param":
					color=this.getFloat4(common,child.getAttribute("ref")).replace(/\s+/g,' ').split(" ");
					returnMaterial.setColor({r:color[0],g:color[1],b:color[2]});
					break;
				case "texture":
					this.createMaterialLayer(child,returnMaterial,common,GLGE.M_COLOR);
					break;
			}
		}while(child=child.nextSibling);
	}
	
	
	var bump=technique.getElementsByTagName("bump");
	if(bump.length>0){
		child=bump[0].firstChild;
		do{
			switch(child.tagName){
				case "texture":
					this.createMaterialLayer(child,returnMaterial,common,GLGE.M_NOR);
					break;
			}
		}while(child=child.nextSibling);
	}
	
	//do shininess
	var shininess=technique.getElementsByTagName("shininess");
	if(shininess.length>0){
		returnMaterial.setSpecular(1);
		child=technique.getElementsByTagName("shininess")[0].firstChild;
		do{
			switch(child.tagName){
				case "float":
					if(parseFloat(child.firstChild.nodeValue)>1) returnMaterial.setShininess(parseFloat(child.firstChild.nodeValue));
						else  returnMaterial.setShininess(parseFloat(child.firstChild.nodeValue)*128);
					break;
				case "param":
					var value=parseFloat(this.getFloat(common,child.getAttribute("ref")));
					if(value>1) returnMaterial.setShininess(value);
						else    returnMaterial.setShininess(value*128);
					break;
                // MCB: texture is invalid here. should remove this case.
				case "texture":
					this.createMaterialLayer(child,returnMaterial,common,GLGE.M_SHINE);
					break;
			}
		}while(child=child.nextSibling);
	}
	
	//do specular color
	var specular=technique.getElementsByTagName("specular");
	if(specular.length>0){
		returnMaterial.setSpecular(1);
		child=specular[0].firstChild;
		do{
			switch(child.tagName){
				case "color":
					color=child.firstChild.nodeValue.replace(/\s+/g,' ').split(" ");
					returnMaterial.setSpecularColor({r:color[0],g:color[1],b:color[2]});
					break;
				case "param":
					color=this.getFloat4(common,child.getAttribute("ref")).replace(/\s+/g,' ').split(" ");
					returnMaterial.setSpecularColor({r:color[0],g:color[1],b:color[2]});
					break;
				case "texture":
					this.createMaterialLayer(child,returnMaterial,common,GLGE.M_SPECCOLOR);
					break;
			}
		}while(child=child.nextSibling);
	}

	//do reflectivity
	/*
	var reflectivity=technique.getElementsByTagName("reflectivity");
	if(reflectivity.length>0){
		child=reflectivity[0].firstChild;
		do{
			switch(child.tagName){
				case "float":
					//returnMaterial.setReflectivity(parseFloat(child.firstChild.nodeValue))
					break;
				case "param":
					//returnMaterial.setReflectivity(parseFloat(this.getFloat(common,child.getAttribute("ref"))));
					break;
                // MCB: texture is invalid here. should remove this case.
				case "texture":
					var imageid=this.getSurface(common,this.getSampler(common,child.getAttribute("texture")));
					textureImage=this.getImage(imageid);
					var texture=new GLGE.Texture(textureImage);
					returnMaterial.addTexture(texture);
					returnMaterial.addMaterialLayer(new GLGE.MaterialLayer(texture,GLGE.M_REFLECT,GLGE.UV1));
					break;
			}
		}while(child=child.nextSibling);
	}*/
	
	//do emission color
	var emission=technique.getElementsByTagName("emission");
	if(emission.length>0){
		child=emission[0].firstChild;
		do{
			switch(child.tagName){
				case "color":
					color=child.firstChild.nodeValue.split(" ");
					returnMaterial.setEmit(color[0]);
					break;
				case "param":
					color=this.getFloat4(common,child.getAttribute("ref")).split(" ");
					returnMaterial.setEmit(color[0]);
					break;
				case "texture":
					this.createMaterialLayer(child,returnMaterial,common,GLGE.M_EMIT);
					break;
			}
		}while(child=child.nextSibling);
	}

	//do reflective color
	var reflective=technique.getElementsByTagName("reflective");
	if(reflective.length>0){
		child=reflective[0].firstChild;
		do{
			switch(child.tagName){
				case "color":
					color=child.firstChild.nodeValue.replace(/\s+/g,' ').split(" ");
//TODO				returnMaterial.setReflectiveColor({r:color[0],g:color[1],b:color[2]});
					break;
				case "param":
					color=this.getFloat4(common,child.getAttribute("ref")).replace(/\s+/g,' ').split(" ");
//TODO				returnMaterial.setReflectiveColor({r:color[0],g:color[1],b:color[2]});
					break;
				case "texture":
					this.createMaterialLayer(child,returnMaterial,common,GLGE.M_REFLECT);
					break;
			}
		}while(child=child.nextSibling);
	}

	//do transparency
	var transparency=technique.getElementsByTagName("transparency");
	if(transparency.length>0){
		child=transparency[0].firstChild;
		do{
			switch(child.tagName){
				case "float":
//TODO				returnMaterial.setTransparency(parseFloat(child.firstChild.nodeValue))
					break;
				case "param":
//TODO                    	returnMaterial.setTransparency(parseFloat(this.getFloat(common,child.getAttribute("ref"))));
					break;
			}
		}while(child=child.nextSibling);
	}
	
	//do transparent color
	var transparent=technique.getElementsByTagName("transparent");
	if(transparent.length>0){
        var opaque=transparent[0].getAttribute("opaque");
        if(!opaque) opaque="A_ONE"; // schema default
        
		child=transparent[0].firstChild;
		do{
			switch(child.tagName){
                // MCB: float is invalid here. should remove this case.
				case "float":
					var alpha=parseFloat(child.firstChild.nodeValue);
					if(alpha<1){
						returnMaterial.setAlpha(parseFloat(child.firstChild.nodeValue));
						returnMaterial.trans=true;
					}
					break;
				case "color":
					color=child.firstChild.nodeValue.replace(/\s+/g,' ').split(" ");
					var alpha=this.getMaterialAlpha(color,opaque,1);
//TODO                    	var alpha=this.getMaterialAlpha(color,opaque,returnMaterial.getTransparency());
					if(alpha<1){
						returnMaterial.setAlpha(alpha);
						returnMaterial.trans=true;
					}
					break;
				case "param":
					color=this.getFloat4(common,child.getAttribute("ref")).replace(/\s+/g,' ').split(" ");
					var alpha=this.getMaterialAlpha(color,opaque,1);
//TODO                    	var alpha=this.getMaterialAlpha(color,opaque,returnMaterial.getTransparency());
					if(alpha<1){
						returnMaterial.setAlpha(alpha);
						returnMaterial.trans=true;
					}
					break;
                // MCB: this case assumes opaque="A_ONE" and transparency="1.0"
				case "texture":
					this.createMaterialLayer(child,returnMaterial,common,GLGE.M_ALPHA);
					returnMaterial.trans=true;
					break;
			}
		}while(child=child.nextSibling);
	}

	return returnMaterial;
};

/**
* gets the material alpha from the transparent color
* @param {color} the transparent color
* @param {opaque} the transparent color opaque attribute value
* @param {transparency} the transparency value
* @private
*/
GLGE.Collada.prototype.getMaterialAlpha=function(color,opaque,transparency){
    var returnAlpha;

    switch(opaque){
        case "A_ONE":
            returnAlpha=parseFloat(color[3])*transparency;
            break;
        case "A_ZERO":
            returnAlpha=1-parseFloat(color[3])*transparency;
            break;
        case "RGB_ONE":
            var luminance=parseFloat(color[0])*0.212671
                         +parseFloat(color[1])*0.715160
                         +parseFloat(color[2])*0.072169;
            returnAlpha=luminance*transparency;
            break;
        case "RGB_ZERO":
            var luminance=parseFloat(color[0])*0.212671
                         +parseFloat(color[1])*0.715160
                         +parseFloat(color[2])*0.072169;
            returnAlpha=1-luminance*transparency;
            break;
    }
    return returnAlpha;
};

/**
* creates a GLGE Object from a given instance Geomertry
* @param {node} node the element to parse
* @private
*/
GLGE.Collada.prototype.getInstanceGeometry=function(node){
	if(node.GLGEObj && false){
		var obj=new GLGE.ObjectInstance();
		obj.setObject(node.GLGEObj);
		return obj;
	}else{
		var meshes=this.getMeshes(node.getAttribute("url").substr(1));
		var materials=node.getElementsByTagName("instance_material");
		var objMaterials={};
		for(var i=0; i<materials.length;i++){
			mat=this.getMaterial(materials[i].getAttribute("target").substr(1));
			objMaterials[materials[i].getAttribute("symbol")]=mat;
		}
		//create GLGE object
		var obj=new GLGE.Object();
		for(i=0; i<meshes.length;i++){
			if(objMaterials[meshes[i].matName] && objMaterials[meshes[i].matName].trans){
				obj.setZtransparent(true);
				//default to not pickable for transparent objects
				obj.setPickable(false);
			}
			var multimat=new GLGE.MultiMaterial();
			multimat.setMesh(meshes[i]);
			if(!objMaterials[meshes[i].matName]){
				objMaterials[meshes[i].matName]=new GLGE.Material();
				objMaterials[meshes[i].matName].setColor("lightgrey");
			}
			multimat.setMaterial(objMaterials[meshes[i].matName]);
			obj.addMultiMaterial(multimat);
		}
		obj.setSkeleton(this);
		node.GLGEObj=obj;
		return obj;
	}
}


/**
* creates an array of animation curves
* @param {string} id the id of the sampler
* @private
*/
GLGE.Collada.prototype.getAnimationSampler=function(id,rotation){
	var frameRate=30;
	var inputs=this.xml.getElementById(id).getElementsByTagName("input");
	var outputData={};
	var inputsArray=[];
	var data,block;
	for(var i=0;i<inputs.length;i++){
		//modify get source to return the array and element length
		data=this.getSource(inputs[i].getAttribute("source").substr(1));
		block=inputs[i].getAttribute("semantic");
		inputsArray.push({block:block,data:data});
	}
	for(n=0;n<inputsArray.length;n++){
		block=inputsArray[n].block;
		outputData[block]={};
		outputData[block].data=[];
		outputData[block].names=[];
		for(k=0;k<inputsArray[n].data.array.length;k=k+inputsArray[n].data.stride){
			pcnt=0;
			for(i=0;i<inputsArray[n].data.pmask.length;i++){
				if(inputsArray[n].data.pmask[i]){
					outputData[block].names.push(inputsArray[n].data.pmask[i].name);
					if(inputsArray[n].data.pmask[i].type=="float4x4"){
						outputData[block].stride=16;
						for(j=0;j<16;j++){
							outputData[block].data.push(inputsArray[n].data.array[j+k+inputsArray[n].data.offset+i]);
						}
					}else{
						pcnt++;
						outputData[block].stride=pcnt;
						outputData[block].data.push(inputsArray[n].data.array[k+inputsArray[n].data.offset+i]);
					}
				}
			}
		}
	}
	//this should return an array of curves
	var point;
	var anim=[];
	for(var i=0; i<outputData["OUTPUT"].stride;i++){
		anim.push(new GLGE.AnimationCurve());
	}
	for(var i=0;i<outputData["INPUT"].data.length;i++){
		for(var j=0;j<outputData["OUTPUT"].stride;j++){
			anim[j].name=outputData["OUTPUT"].names[j];
			//fix if type is bezier and no tangent the fallback to linear
			if(outputData["INTERPOLATION"].data[i]=="BEZIER" && !outputData["IN_TANGENT"]){
				outputData["INTERPOLATION"].data[i]="LINEAR"
			}
			
			if(outputData["INTERPOLATION"].data[i]=="LINEAR"){
				point=new GLGE.LinearPoint();
				point.setX(outputData["INPUT"].data[i]*frameRate);
				var val=parseFloat(outputData["OUTPUT"].data[i*outputData["OUTPUT"].stride+j]);
				if(val==-180) val=-179.9;
				if(val==180) val=179.9;
				if(this.exceptions["flipangle"] && rotation){
					if(anim[j].lastval){
						if(Math.abs(anim[j].lastval-(360+val))<Math.abs(anim[j].lastval-val)){
							val=360+val;
						}else if(Math.abs(anim[j].lastval-(val-360))<Math.abs(anim[j].lastval-val)){
							val=val-360;
						}
					}
				}
				point.setY(val);
				anim[j].lastval=val;
				anim[j].addPoint(point);
			}
			
			if(outputData["INTERPOLATION"].data[i]=="BEZIER"){
				point=new GLGE.BezTriple();
				point.setX1(outputData["IN_TANGENT"].data[(i*outputData["OUTPUT"].stride+j)*2]*frameRate);
				point.setY1(outputData["IN_TANGENT"].data[(i*outputData["OUTPUT"].stride+j)*2+1]);
				point.setX2(Math.round(outputData["INPUT"].data[i]*frameRate));
				point.setY2(outputData["OUTPUT"].data[i*outputData["OUTPUT"].stride+j]);
				point.setX3(outputData["OUT_TANGENT"].data[(i*outputData["OUTPUT"].stride+j)*2]*frameRate);
				point.setY3(outputData["OUT_TANGENT"].data[(i*outputData["OUTPUT"].stride+j)*2+1]);
				anim[j].addPoint(point);			
			}
		}
	}
	return anim;
}

/**
* Gets the animation vector for a node
* @param {object} channels the animation channels effecting this node
* @private
*/
GLGE.Collada.prototype.getAnimationVector=function(channels){
	//I can see no nice way to map a seuqnce of animated transforms onto a single transform 
	//so instead calc transform for each frame then use quat and trans then linear between them
	var maxFrame=0;
	//get the initial state of the target
	var targetNode=this.xml.getElementById(channels[0].target[0]);
	//get the initial transforms for the target node
	var child=targetNode.firstChild;
	var transforms=[];
	var sids={};
	do{
		switch(child.tagName){
			case "matrix":
			case "translate":
			case "rotate":
			case "scale":
				def={type:child.tagName,data:this.parseArray(child),animations:[]};
				if(child.hasAttribute("sid")) sids[child.getAttribute("sid")]=def;
				transforms.push(def);
				break;
		}
		child=child.nextSibling
	}while(child);
	//loop though the animation channels effecting this node
	var anim={};
	for(var i=0;i<channels.length;i++){
		var target=channels[i].target;
		var animcurves=this.getAnimationSampler(channels[i].source,/ANGLE/i.test(target));
		for(j=0;j<animcurves.length;j++){
			maxFrame=Math.max(maxFrame,animcurves[j].keyFrames[animcurves[j].keyFrames.length-1].x);
		}
		if(target[1].indexOf(".")!=-1){
			var splittarget=target[1].split(".");
			switch(splittarget[1]){
				case "X":
					sids[splittarget[0]].animations[0]=animcurves[0];
					break;
				case "Y":
					sids[splittarget[0]].animations[1]=animcurves[0];
					break;
				case "Z":
					sids[splittarget[0]].animations[2]=animcurves[0];
					break;
				case "ANGLE":
					sids[splittarget[0]].animations[3]=animcurves[0];
					break;
			}
		}else if(target[1].indexOf("(")!=-1){
			//do bracket type
			var idx=target[1].split("(");
			sidtarget=idx.shift();
			if(idx.length>1) idx=parseInt(idx[0])+4*parseInt(idx[1]);
				else idx=parseInt(idx[0]);
			sids[sidtarget].animations[idx]=animcurves[0];
		}else{
			//do all
			for(var j=0;j<animcurves.length;j++){
				switch(animcurves[j].name){
					case "X":
						sids[target[1]].animations[0]=animcurves[j];
						break;
					case "Y":
						sids[target[1]].animations[1]=animcurves[j];
						break;
					case "Z":
						sids[target[1]].animations[2]=animcurves[j];
						break;
					case "ANGLE":
						sids[target[1]].animations[3]=animcurves[j];
						break;
					default:
						sids[target[1]].animations[j]=animcurves[j];
						break;
				}
			}
		}
	
	}
	var animVector=new GLGE.AnimationVector();
	animVector.setFrames(maxFrame);
	var quatxcurve=new GLGE.AnimationCurve(); quatxcurve.setChannel("QuatX");
	var quatycurve=new GLGE.AnimationCurve(); quatycurve.setChannel("QuatY");
	var quatzcurve=new GLGE.AnimationCurve(); quatzcurve.setChannel("QuatZ");
	var quatwcurve=new GLGE.AnimationCurve(); quatwcurve.setChannel("QuatW");
	var locxcurve=new GLGE.AnimationCurve(); locxcurve.setChannel("LocX");
	var locycurve=new GLGE.AnimationCurve(); locycurve.setChannel("LocY");
	var loczcurve=new GLGE.AnimationCurve(); loczcurve.setChannel("LocZ");
	var scalexcurve=new GLGE.AnimationCurve(); scalexcurve.setChannel("ScaleX");
	var scaleycurve=new GLGE.AnimationCurve(); scaleycurve.setChannel("ScaleY");
	var scalezcurve=new GLGE.AnimationCurve(); scalezcurve.setChannel("ScaleZ");
	animVector.addAnimationCurve(quatxcurve);
	animVector.addAnimationCurve(quatycurve);
	animVector.addAnimationCurve(quatzcurve);
	animVector.addAnimationCurve(quatwcurve);
	animVector.addAnimationCurve(locxcurve);
	animVector.addAnimationCurve(locycurve);
	animVector.addAnimationCurve(loczcurve);
	animVector.addAnimationCurve(scalexcurve);
	animVector.addAnimationCurve(scaleycurve);
	animVector.addAnimationCurve(scalezcurve);
	var lastQuat=null;
	for(var frame=0; frame<maxFrame;frame++){
		var matrix=GLGE.identMatrix();
		for(var i=0;i<transforms.length;i++){
			//get full transform for this frame
			switch(transforms[i].type){
				case "matrix":
					var matrix_array=[
						(transforms[i].animations[0] ? transforms[i].animations[0].getValue(frame) : transforms[i].data[0]),
						(transforms[i].animations[1] ? transforms[i].animations[1].getValue(frame) : transforms[i].data[1]),
						(transforms[i].animations[2] ? transforms[i].animations[2].getValue(frame) : transforms[i].data[2]),
						(transforms[i].animations[3] ? transforms[i].animations[3].getValue(frame) : transforms[i].data[3]),
						(transforms[i].animations[4] ? transforms[i].animations[4].getValue(frame) : transforms[i].data[4]),
						(transforms[i].animations[5] ? transforms[i].animations[5].getValue(frame) : transforms[i].data[5]),
						(transforms[i].animations[6] ? transforms[i].animations[6].getValue(frame) : transforms[i].data[6]),
						(transforms[i].animations[7] ? transforms[i].animations[7].getValue(frame) : transforms[i].data[7]),
						(transforms[i].animations[8] ? transforms[i].animations[8].getValue(frame) : transforms[i].data[8]),
						(transforms[i].animations[9] ? transforms[i].animations[9].getValue(frame) : transforms[i].data[9]),
						(transforms[i].animations[10] ? transforms[i].animations[10].getValue(frame) : transforms[i].data[10]),
						(transforms[i].animations[11] ? transforms[i].animations[11].getValue(frame) : transforms[i].data[11]),
						(transforms[i].animations[12] ? transforms[i].animations[12].getValue(frame) : transforms[i].data[12]),
						(transforms[i].animations[13] ? transforms[i].animations[13].getValue(frame) : transforms[i].data[13]),
						(transforms[i].animations[14] ? transforms[i].animations[14].getValue(frame) : transforms[i].data[14]),
						(transforms[i].animations[15] ? transforms[i].animations[15].getValue(frame) : transforms[i].data[15])
					];
					matrix=GLGE.mulMat4(matrix,GLGE.Mat4(matrix_array));
					break;
				case "rotate":
					var rotate_array=[
						(transforms[i].animations[0] ? transforms[i].animations[0].getValue(frame) : transforms[i].data[0]),
						(transforms[i].animations[1] ? transforms[i].animations[1].getValue(frame) : transforms[i].data[1]),
						(transforms[i].animations[2] ? transforms[i].animations[2].getValue(frame) : transforms[i].data[2]),
						(transforms[i].animations[3] ? transforms[i].animations[3].getValue(frame) : transforms[i].data[3])
					];
					matrix=GLGE.mulMat4(matrix,GLGE.angleAxis(rotate_array[3]*0.017453278,[ rotate_array[0], rotate_array[1], rotate_array[2]]));
					break;
				case "translate":
					var translate_array=[
						(transforms[i].animations[0] ? transforms[i].animations[0].getValue(frame) : transforms[i].data[0]),
						(transforms[i].animations[1] ? transforms[i].animations[1].getValue(frame) : transforms[i].data[1]),
						(transforms[i].animations[2] ? transforms[i].animations[2].getValue(frame) : transforms[i].data[2])
					];
					matrix=GLGE.mulMat4(matrix,GLGE.translateMatrix(translate_array[0],translate_array[1],translate_array[2]));
					break;
				case "scale":
					var scale_array=[
						(transforms[i].animations[0] ? transforms[i].animations[0].getValue(frame) : transforms[i].data[0]),
						(transforms[i].animations[1] ? transforms[i].animations[1].getValue(frame) : transforms[i].data[1]),
						(transforms[i].animations[2] ? transforms[i].animations[2].getValue(frame) : transforms[i].data[2])
					];
					matrix=GLGE.mulMat4(matrix,GLGE.scaleMatrix(scale_array[0],scale_array[1],scale_array[2]));
					break;
			}
		}
		scale=GLGE.matrix2Scale(matrix);
		matrix=GLGE.mulMat4(matrix,GLGE.scaleMatrix(1/scale[0],1/scale[1],1/scale[2]));
		//convert to quat and trans and add to the curve
		quat=GLGE.rotationMatrix2Quat(matrix);
		if(lastQuat){
			//make sure we are in the same range as previous!
			if((lastQuat[0]*quat[0]+lastQuat[1]*quat[1]+lastQuat[2]*quat[2]+lastQuat[3]*quat[3])<0){
				quat[0]=quat[0]*-1;
				quat[1]=quat[1]*-1;
				quat[2]=quat[2]*-1;
				quat[3]=quat[3]*-1;
			}
		}
		lastQuat=quat;
		point=new GLGE.LinearPoint();
		point.setX(frame);
		point.setY(quat[0]);
		quatxcurve.addPoint(point);
		point=new GLGE.LinearPoint();
		point.setX(frame);
		point.setY(quat[1]);
		quatycurve.addPoint(point);
		point=new GLGE.LinearPoint();
		point.setX(frame);
		point.setY(quat[2]);
		quatzcurve.addPoint(point);
		point=new GLGE.LinearPoint();
		point.setX(frame);
		point.setY(quat[3]);
		quatwcurve.addPoint(point);
		point=new GLGE.LinearPoint();
		point.setX(frame);
		point.setY(matrix[3]);
		locxcurve.addPoint(point);
		point=new GLGE.LinearPoint();
		point.setX(frame);
		point.setY(matrix[7]);
		locycurve.addPoint(point);
		point=new GLGE.LinearPoint();
		point.setX(frame);
		point.setY(matrix[11]);
		loczcurve.addPoint(point);
		point=new GLGE.LinearPoint();
		point.setX(frame);
		point.setY(scale[0].toFixed(4));
		scalexcurve.addPoint(point);
		point=new GLGE.LinearPoint();
		point.setX(frame);
		point.setY(scale[1].toFixed(4));
		scaleycurve.addPoint(point);
		point=new GLGE.LinearPoint();
		point.setX(frame);
		point.setY(scale[2].toFixed(4));
		scalezcurve.addPoint(point);
	}
	//return the animation vector
	/*for(var i=0; i<targetNode.GLGEObjects.length;i++){
		targetNode.GLGEObjects[i].setAnimation(animVector);
		targetNode.GLGEObjects[i].animationStart=0;
		targetNode.GLGEObjects[i].setFrameRate(30);
	}*/
	return animVector;
}

var actionCache={};
/**
* creates an action form the intially animation within the document
* @private
*/
GLGE.Collada.prototype.getAnimations=function(){
	if(actionCache[this.url]){
		this.actions=actionCache[this.url];
	}else{
		var animationClips=this.xml.getElementsByTagName("animation_clip");
		var animations=this.xml.getElementsByTagName("animation");
		if(animationClips.length==0){
			animations.name="default";
			var clips=[animations];
		}else{
			var clips=[];
			for(var i=0;i<animationClips.length;i++){
				var anim=[];
				var instances=animationClips[i].getElementsByTagName("instance_animation");
				for(var j=0;j<instances.length;j++){
					anim.push(this.xml.getElementById(instances[j].getAttribute("url").substr(1)));
				}
				anim.name=animationClips[i].getAttribute("id");
				clips.push(anim);
			}
		}

		for(var k=0;k<clips.length;k++){
			var animations=clips[k];
			var channels,target,source;
			var channelGroups={};
			for(var i=0;i<animations.length;i++){
				channels=animations[i].getElementsByTagName("channel");
				for(var j=0;j<channels.length;j++){
					var target=channels[j].getAttribute("target").split("/");
					source=channels[j].getAttribute("source").substr(1);
					if(!channelGroups[target[0]]) channelGroups[target[0]]=[];
					channelGroups[target[0]].push({source:source,target:target});
				}
			}
			var action=new GLGE.Action();
			for(target in channelGroups){
				var animVector=this.getAnimationVector(channelGroups[target]);
				var targetNode=this.xml.getElementById(target);
				for(var i=0; i<targetNode.GLGEObjects.length;i++){
					var ac=new GLGE.ActionChannel();

					var name=targetNode.GLGEObjects[i].getName();
					ac.setTarget(name);
					ac.setAnimation(animVector);
					action.addActionChannel(ac);
				}
			}
			this.addColladaAction({name:animations.name,action:action});
		}
	}
	actionCache[this.url]=this.actions;
	for(n in this.actions) {this.setAction(this.actions[n],0,true);break}
}
/**
* Adds a collada action
* @param {object} action object hold action info
* @private
*/
GLGE.Collada.prototype.addColladaAction=function(action){
	this.actions[action.name]=action.action;
}
/**
* Gets the available actions from the collada file
* @returns {object} all the available actions within the collada file
*/
GLGE.Collada.prototype.getColladaActions=function(){
	return this.actions;
}


/**
* creates a GLGE Object from a given instance controler
* @param {node} node the element to parse
* @private
*/
GLGE.Collada.prototype.getInstanceController=function(node){
	var obj=new GLGE.Object();
	var controller=this.xml.getElementById(node.getAttribute("url").substr(1));
	var skeletons=node.getElementsByTagName("skeleton");
	var joints=controller.getElementsByTagName("joints")[0];
	var inputs=joints.getElementsByTagName("input");
	var bindShapeMatrix;
	if(controller.getElementsByTagName("bind_shape_matrix").length>0){
		bindShapeMatrix=this.parseArray(controller.getElementsByTagName("bind_shape_matrix")[0]);
	}else{
		//assume identity
		bindShapeMatrix=GLGE.identMatrix();
	}

	var inverseBindMatrix=[bindShapeMatrix];
	var base=new GLGE.Group;
	this.addGroup(base);
	var joints=[base];
	var mat;
	for(var i=0; i<inputs.length;i++){
		//TODO: sort out correct use of accessors for these source
		if(inputs[i].getAttribute("semantic")=="INV_BIND_MATRIX"){
			var matrixdata=this.getSource(inputs[i].getAttribute("source").substr(1));
			for(var k=0;k<matrixdata.array.length;k=k+matrixdata.stride){
				mat=matrixdata.array.slice(k,k+16);
				inverseBindMatrix.push(GLGE.mulMat4(GLGE.Mat4(mat),GLGE.Mat4(bindShapeMatrix.slice(0,16))));
			}
		}
		if(inputs[i].getAttribute("semantic")=="JOINT"){
			var jointdata=this.getSource(inputs[i].getAttribute("source").substr(1));
			if(jointdata.type=="IDREF_array"){
				for(var k=0;k<jointdata.array.length;k=k+jointdata.stride){
					var name=this.getNode(this.xml.getElementById(jointdata.array[k]),true).getName();
					joints.push(name);
				}
			}else if(jointdata.type=="Name_array"){
				var sidArray={};
				var sid;
				//is this right controller with no skeleton set, export bug??
				if(skeletons.length==0){
					var elements=this.xml.getElementsByTagName("node");
					for(k=0; k<elements.length;k++){
						sid=elements[k].getAttribute("sid");
						if(sid){
							sidArray[sid]=elements[k];
						}
					}
				}else{
					for(var n=0; n<skeletons.length;n++){
						var skeletonElement=this.xml.getElementById(skeletons[n].firstChild.nodeValue.substr(1));
						sid=skeletonElement.getAttribute("sid");
						if(sid) sidArray[sid]=skeletonElement;
						var elements=skeletonElement.getElementsByTagName("*");
						for(k=0; k<elements.length;k++){
							sid=elements[k].getAttribute("sid");
							if(sid){
								sidArray[sid]=elements[k];
							}
						}
					}
				}
				for(var k=0;k<jointdata.array.length;k=k+jointdata.stride){
					if(jointdata.array[k]!=""){
						var name=this.getNode(sidArray[jointdata.array[k]],true).getName();
						joints.push(name);
					}
				}
			}

		}
	}
	
	//go though the inputs to get the data layout
	var vertexWeight=controller.getElementsByTagName("vertex_weights")[0]
	inputs=vertexWeight.getElementsByTagName("input");
	inputArray=[];
	outputData={};
	for(n=0;n<inputs.length;n++){
		block=inputs[n].getAttribute("semantic");
		inputs[n].data=this.getSource(inputs[n].getAttribute("source").substr(1));
		inputs[n].block=block;
		outputData[block]=[];
		inputArray[inputs[n].getAttribute("offset")]=inputs[n];
	}
	
	
	var vcounts=this.parseArray(vertexWeight.getElementsByTagName("vcount")[0]);

	var vs=this.parseArray(vertexWeight.getElementsByTagName("v")[0]);

	//find the maximum vcount
	var maxJoints=0;

	for(var i=0; i<vcounts.length;i++) if(vcounts[i]) maxJoints=Math.max(maxJoints,parseInt(vcounts[i]));
	vPointer=0;
	var block;
	for(var i=0; i<vcounts.length;i++){
		for(var j=0; j<vcounts[i];j++){
			for(var k=0; k<inputArray.length;k++){
				block=inputArray[k].block;
					for(n=0;n<inputArray[k].data.stride;n++){
					if(inputArray[k].data.pmask[n]){
						if(block!="JOINT"){
							outputData[block].push(inputArray[k].data.array[parseInt(vs[vPointer])+parseInt(inputArray[k].data.offset)]);
						}else{
							outputData[block].push(parseInt(vs[vPointer]));
						}
						vPointer++;
					}
				}
			}
		}
		//pad out the remaining data
		for(j=j; j<maxJoints;j++){
			for(var k=0; k<inputArray.length;k++){
				block=inputArray[k].block;
				outputData[block].push(0);
			}
		}
	}	

	if(!this.badAccessor && outputData["JOINT"].length==0){
		this.badAccessor=true;
		return this.getInstanceController(node);
	}
	
	for(var i=0;i<outputData["JOINT"].length;i++){
			outputData["JOINT"][i]++;
	}
	//blender fix
	if(this.exceptions.negjoints){
		for(var i=0;i<outputData["JOINT"].length;i++){
			if(outputData["JOINT"][i]==0){
				outputData["WEIGHT"][i]=0;
			}
		}
	}

	var skeletonData={vertexJoints:outputData["JOINT"],vertexWeight:outputData["WEIGHT"],joints:joints,inverseBindMatrix:inverseBindMatrix,count:maxJoints}

	var meshes=this.getMeshes(controller.getElementsByTagName("skin")[0].getAttribute("source").substr(1),skeletonData);
	//var meshes=this.getMeshes(controller.getElementsByTagName("skin")[0].getAttribute("source").substr(1));
	var materials=node.getElementsByTagName("instance_material");
	var objMaterials={};
	for(var i=0; i<materials.length;i++){
		mat=this.getMaterial(materials[i].getAttribute("target").substr(1));
		objMaterials[materials[i].getAttribute("symbol")]=mat;
	}
	//create GLGE object
	for(i=0; i<meshes.length;i++){
		var multimat=new GLGE.MultiMaterial();
		multimat.setMesh(meshes[i]);
		if(objMaterials[meshes[i].matName]){
			if(objMaterials[meshes[i].matName].trans){
				obj.setZtransparent(true);
				//default to not picable to transparent objects
				obj.setPickable(false);
			}
			multimat.setMaterial(objMaterials[meshes[i].matName]);
		}else{
			var material=new GLGE.Material();
			multimat.setMaterial(material);
		}
		obj.addMultiMaterial(multimat);
	}
	obj.setSkeleton(this);
	return obj;
}

/**
* Creates a new group and parses it's children
* @param {DOM Element} node the element to parse
* @param {boolean} ref should this just get a reference for later addition
* @private
*/
GLGE.Collada.prototype.getNode=function(node,ref){

	//if a reference has previously been created then add it now
	if(!ref && node.GLGEObject){
		newGroup=node.GLGEObject;
		delete(this.GLGEObject);
		return newGroup;
	}
	
	//if a reference is requested a the node previously created then return here
	if(ref && node.GLGEObjects){
		return node.GLGEObjects[0];
	}
	
	var newGroup=new GLGE.Group();
	var name="bone"+(++this.boneIdx);
	newGroup.setName(name);
	
	if(!node.GLGEObjects) node.GLGEObjects=[];
	node.GLGEObjects.push(newGroup); //map Collada DOM to GLGE
	var child=node.firstChild;
	var matrix=GLGE.identMatrix();
	var data;
	do{
		switch(child.tagName){
			case "node":
				newGroup.addGroup(this.getNode(child));
				break;
			case "instance_node":
				newGroup.addGroup(this.getNode(this.xml.getElementById(child.getAttribute("url").substr(1))));
				break;
			case "instance_visual_scene":
				newGroup.addGroup(this.getNode(this.xml.getElementById(child.getAttribute("url").substr(1))));
				break;
			case "instance_geometry":
				newGroup.addObject(this.getInstanceGeometry(child));
				break;
			case "instance_controller":
				newGroup.addObject(this.getInstanceController(child));
				break;
			case "matrix":
				matrix=this.parseArray(child);
				break;
			case "translate":
				data=this.parseArray(child);
				matrix=GLGE.mulMat4(matrix,GLGE.translateMatrix(data[0],data[1],data[2]));
				break;
			case "rotate":
				data=this.parseArray(child);
				matrix=GLGE.mulMat4(matrix,GLGE.angleAxis(data[3]*0.017453278,[data[0],data[1],data[2]]));
				break;
			case "scale":
				data=this.parseArray(child);
				matrix=GLGE.mulMat4(matrix,GLGE.scaleMatrix(data[0],data[1],data[2]));
				break;
		}
	}while(child=child.nextSibling);
	
	newGroup.setLoc(matrix[3],matrix[7],matrix[11]);
	var mat=GLGE.Mat4([matrix[0], matrix[1], matrix[2], 0,
								matrix[4], matrix[5], matrix[6], 0,
								matrix[8], matrix[9], matrix[10], 0,
								0, 0, 0, 1]);
			
	newGroup.setRotMatrix(mat);
	
	if(ref) node.GLGEObject=newGroup;
	
	return newGroup;
};
/**
* Initializes the Object/Scene when the collada document has been loaded
* @private
*/
GLGE.Collada.prototype.initVisualScene=function(){
	if(!this.rootId){
		var scene=this.xml.getElementsByTagName("scene");
		if(scene.length>0){
			this.addGroup(this.getNode(scene[0]));
		}else{
			GLGE.error("Please indicate the asset to render in Collada Document"+this.url);
		}
	}else{
		var root=this.xml.getElementById(this.rootId);
		if(root){
			this.addGroup(this.getNode(root));
		}else{
			GLGE.error("Asset "+this.rootId+" not found in document"+this.url);
		}
	}
};


/**
* Exceptions for the bad exports out there, I'm sure there will be many more :-(
*/
var exceptions={
	"default":{},
	"COLLADA Mixamo exporter":{badAccessor:true},
	"Blender2.5":{flipangle:true,negjoints:true}
}
	
GLGE.Collada.prototype.getExceptions=function(){
	if(this.xml.getElementsByTagName("authoring_tool").length>0 && this.xml.getElementsByTagName("authoring_tool")[0].firstChild.nodeValue=="COLLADA Mixamo exporter"){
		return exceptions["COLLADA Mixamo exporter"];
	}
	if(this.xml.getElementsByTagName("authoring_tool").length>0 && /Blender 2.5/.test(this.xml.getElementsByTagName("authoring_tool")[0].firstChild.nodeValue)){
		return exceptions["Blender2.5"];
	}
}
/**
* Called when a collada document has is loaded
* @param {string} url the url of the loaded document
* @param {DOM Document} xml the xml document
* @private
*/
GLGE.Collada.prototype.loaded=function(url,xml){
	this.xml=xml;
	if(xml.getElementsByTagName("authoring_tool").length>0) this.exceptions=exceptions[xml.getElementsByTagName("authoring_tool")[0].firstChild.nodeValue];
	this.exceptions=this.getExceptions();
	if(!this.exceptions) this.exceptions=exceptions.default;
	this.initVisualScene();
	this.getAnimations();
	this.fireEvent("loaded",{url:this.url});
};

GLGE.Scene.prototype.addCollada=GLGE.Scene.prototype.addGroup;
GLGE.Group.prototype.addCollada=GLGE.Group.prototype.addGroup;


if(GLGE.Document){
	/**
	* Parses the dom element and creates a collada object
	* @param {domelement} ele the element to create the objects from
	* @private
	*/
	GLGE.Document.prototype.getCollada=function(ele){
		if(!ele.object){
			ele.object=new GLGE[this.classString(ele.tagName)]();
			ele.object.setDocument(ele.getAttribute("document"),this.getAbsolutePath(this.rootURL,null));
			ele.removeAttribute("document");
			this.setProperties(ele);
		}
		return ele.object;
	}
}

})(GLGE);