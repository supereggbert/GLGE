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
 
 
 (function(GLGE){
/**
* Class to represent a collada object
* @augments GLGE.Group
*/
GLGE.Collada=function(){
	this.objects=[];
};
GLGE.augment(GLGE.Group,GLGE.Collada);

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
		for(i=0;i<currentArray.length;i++) output.push(currentArray[i]);
	}

	return output;
};
/**
* loads an collada file from a given url
* @param {DOM Element} node the value to parse
*/
GLGE.Collada.prototype.setDocument=function(url){
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
};
/**
* gets data for a given source element
* @param {string} id the id of the source element
* @private
*/
GLGE.Collada.prototype.getSource=function(id){
	var element=this.xml.getElementById(id);
	if(!element.jsArray){
		var value;
		if(element.tagName=="vertices"){
			value=this.getSource(element.getElementsByTagName("input")[0].getAttribute("source").substr(1));
		}else{
			var accessor=element.getElementsByTagName("technique_common")[0].getElementsByTagName("accessor")[0];
			value=this.parseArray(this.xml.getElementById(accessor.getAttribute("source").substr(1)));
			stride=parseInt(accessor.getAttribute("stride"));
			offset=parseInt(accessor.getAttribute("offset"));
			if(!offset) offset=0;
			count=parseInt(accessor.getAttribute("count"));
			var params=accessor.getElementsByTagName("param");
			var pmask=[];
			for(var i=0;i<params.length;i++){if(params[i].hasAttribute("name")) pmask.push(true); else pmask.push(false);}
			value={array:value,stride:stride,offset:offset,count:count,pmask:pmask};
		}
		element.jsArray=value;
	}
	return element.jsArray;
};
 
GLGE.Collada.prototype.getMeshes=function(id){
	var i,n;
	var mesh;
	var inputs;
	var inputArray;
	var faces;
	var outputData;
	var block;
	var set;
	var rootNode=this.xml.getElementById(id);
	var meshNode=rootNode.getElementsByTagName("mesh")[0];
	var meshes=[];
	
	
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
	
	
	//create a mesh for each set of faces
	var triangles=[];
	var tris=meshNode.getElementsByTagName("triangles");
	for(i=0;i<polylists.length;i++){triangles.push(polylists[i])};
	for(i=0;i<tris.length;i++){triangles.push(tris[i])};
	
	for(i=0;i<triangles.length;i++){
		//go though the inputs to get the data layout
		inputs=triangles[i].getElementsByTagName("input");
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
			inputs[n].block=block;
			outputData[block]=[];
			inputArray[inputs[n].getAttribute("offset")]=inputs[n];
		}
		//get the face data and push the data into the mesh
		if(triangles[i].getElementsByTagName("p")[0].data) faces=triangles[i].getElementsByTagName("p")[0].data;
			else faces=this.parseArray(triangles[i].getElementsByTagName("p")[0]);
	
		var pcnt;
		for(j=0;j<faces.length;j=j+inputArray.length){
			for(n=0;n<inputArray.length;n++){
				block=inputArray[n].block;
				pcnt=0;
				for(k=0;k<inputArray[n].data.stride;k++){
					if(inputArray[n].data.pmask[k]){
						outputData[block].push(inputArray[n].data.array[faces[j+n]*inputArray[n].data.stride+k+inputArray[n].data.offset]);
						pcnt++;
					}
				}
				//account for 1D and 2D
				if(block=="VERTEX" && pcnt==1) outputData[block].push(0);
				if(block=="VERTEX" && pcnt==2) outputData[block].push(0);
				//we can't handle 3d texcoords at the moment so try two
				if(block=="TEXCOORD0" && pcnt==3) outputData[block].pop();
				if(block=="TEXCOORD1" && pcnt==3) outputData[block].pop();
			}
		}
		
		//create faces array
		faces=[];
		for(n=0;n<outputData.VERTEX.length/3;n++) faces.push(n);
		//create mesh
		var trimesh=new GLGE.Mesh();
		trimesh.setPositions(outputData.VERTEX);
		trimesh.setNormals(outputData.NORMAL);
		if(outputData.TEXCOORD0) trimesh.setUV(outputData.TEXCOORD0);
		if(outputData.TEXCOORD1) trimesh.setUV2(outputData.TEXCOORD1);
		trimesh.setFaces(faces);
		trimesh.matName=triangles[i].getAttribute("material");
		meshes.push(trimesh);
	}
	
	return meshes;
};
GLGE.Collada.prototype.getSampler=function(profile,sid){
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
GLGE.Collada.prototype.getSurface=function(profile,sid){
	var params=profile.getElementsByTagName("newparam");
	for(var i=0;i<params.length;i++){
		if(params[i].getAttribute("sid")==sid){
			return params[i].getElementsByTagName("surface")[0].getElementsByTagName("init_from")[0].firstChild.nodeValue;
			break;
		}
	}
	return null;
}
//gets the material from an id
GLGE.Collada.prototype.getMaterial=function(id){		
	var materialNode=this.xml.getElementById(id);
	var effectid=materialNode.getElementsByTagName("instance_effect")[0].getAttribute("url").substr(1);
	var effect=this.xml.getElementById(effectid);
	var common=effect.getElementsByTagName("profile_COMMON")[0];
	//glge only supports one technique currently so try and match as best we can
	var technique=common.getElementsByTagName("technique")[0];
	
	var returnMaterial=new GLGE.Material();
	returnMaterial.setSpecular(0);
	
	var child;
	var color;
	var textureImage;
	
	//do diffuse
	var diffuse=technique.getElementsByTagName("diffuse");
	if(diffuse.length>0){
		child=diffuse[0].firstChild;
		do{
			switch(child.tagName){
				case "color":
					color=child.firstChild.nodeValue.split(" ");
					returnMaterial.setColor({r:color[0],g:color[1],b:color[2]});
					break;
				case "texture":
					var imageid=this.getSurface(common,this.getSampler(common,child.getAttribute("texture")));
					textureImage=this.xml.getElementById(imageid).getElementsByTagName("init_from")[0].firstChild.nodeValue;
					if(child.getElementsByTagName("blend_mode")[0]) var blend=child.getElementsByTagName("blend_mode")[0].firstChild.nodeValue;
					var texture=new GLGE.Texture(textureImage);
					returnMaterial.addTexture(texture);
					var layer=new GLGE.MaterialLayer(texture,GLGE.M_COLOR,GLGE.UV1);
					if(blend=="MULTIPLY")  layer.setBlendMode(GLGE.BL_MUL);
					returnMaterial.addMaterialLayer(layer);
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
					var imageid=this.getSurface(common,this.getSampler(common,child.getAttribute("texture")));
					textureImage=this.xml.getElementById(imageid).getElementsByTagName("init_from")[0].firstChild.nodeValue;
					var texture=new GLGE.Texture(textureImage);
					returnMaterial.addTexture(texture);
					returnMaterial.addMaterialLayer(new GLGE.MaterialLayer(texture,GLGE.M_NOR,GLGE.UV1));
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
				case "texture":
					var imageid=this.getSurface(common,this.getSampler(common,child.getAttribute("texture")));
					textureImage=this.xml.getElementById(imageid).getElementsByTagName("init_from")[0].firstChild.nodeValue;
					var texture=new GLGE.Texture(textureImage);
					returnMaterial.addTexture(texture);
					returnMaterial.addMaterialLayer(new GLGE.MaterialLayer(texture,GLGE.M_SHINE,GLGE.UV1));
					break;
			}
		}while(child=child.nextSibling);
	}
	
	//do spec color
	var specular=technique.getElementsByTagName("specular");
	if(specular.length>0){
		returnMaterial.setSpecular(1);
		child=specular[0].firstChild;
		do{
			switch(child.tagName){
				case "color":
					color=child.firstChild.nodeValue.split(" ");
					returnMaterial.setSpecularColor({r:color[0],g:color[1],b:color[2]});
					break;
				case "texture":
					var imageid=this.getSurface(common,this.getSampler(common,child.getAttribute("texture")));
					textureImage=this.xml.getElementById(imageid).getElementsByTagName("init_from")[0].firstChild.nodeValue;
					var texture=new GLGE.Texture(textureImage);
					returnMaterial.addTexture(texture);
					returnMaterial.addMaterialLayer(new GLGE.MaterialLayer(texture,GLGE.M_SPECCOLOR,GLGE.UV1));
					break;
			}
		}while(child=child.nextSibling);
	}

	//do reflectivity
	var reflect=technique.getElementsByTagName("reflectivity");
	if(reflect.length>0){
		child=reflect[0].firstChild;
		do{
			switch(child.tagName){
				case "float":
					returnMaterial.setReflectivity(parseFloat(child.firstChild.nodeValue))
					break;
				case "texture":
					var imageid=this.getSurface(common,this.getSampler(common,child.getAttribute("texture")));
					textureImage=this.xml.getElementById(imageid).getElementsByTagName("init_from")[0].firstChild.nodeValue;
					var texture=new GLGE.Texture(textureImage);
					returnMaterial.addTexture(texture);
					returnMaterial.addMaterialLayer(new GLGE.MaterialLayer(texture,GLGE.M_REFLECT,GLGE.UV1));
					break;
			}
		}while(child=child.nextSibling);
	}
	
	//do reflectivity
	var transparent=technique.getElementsByTagName("transparent");
	if(transparent.length>0){
		child=transparent[0].firstChild;
		do{
			switch(child.tagName){
				case "float":
					var alpha=parseFloat(child.firstChild.nodeValue);
					if(alpha<1){
						returnMaterial.setAlpha(parseFloat(child.firstChild.nodeValue));
						returnMaterial.trans=true;
					}
					break;
				case "texture":
					var imageid=this.getSurface(common,this.getSampler(common,child.getAttribute("texture")));
					textureImage=this.xml.getElementById(imageid).getElementsByTagName("init_from")[0].firstChild.nodeValue;
					var texture=new GLGE.Texture(textureImage);
					returnMaterial.addTexture(texture);
					returnMaterial.addMaterialLayer(new GLGE.MaterialLayer(texture,GLGE.M_ALPHA,GLGE.UV1));
					returnMaterial.trans=true;
					break;
			}
		}while(child=child.nextSibling);
	}
	
	
	return returnMaterial;
};

GLGE.Collada.prototype.getInstanceGeometry=function(node){
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
		if(objMaterials[meshes[i].matName].trans){
			obj.setZtransparent(true);
		}
		obj.addMultiMaterial(new GLGE.MultiMaterial(meshes[i],objMaterials[meshes[i].matName]));
	}
	return obj;
}
GLGE.Collada.prototype.getNode=function(node){
	var newGroup=new GLGE.Group();
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
			case "instance_geometry":
				newGroup.addObject(this.getInstanceGeometry(child));
				break;
			case "matrix":
				matrix=new GLGE.Mat(this.parseArray(child));
				break;
			case "translate":
				data=this.parseArray(child);
				matrix=matrix.x(GLGE.translateMatrix(data[0],data[1],data[2]));
				break;
			case "rotate":
				data=this.parseArray(child);
				matrix=matrix.x(GLGE.angleAxis(data[3]*0.017453278,[data[0],data[1],data[2]]));
				break;
		}
	}while(child=child.nextSibling);
	newGroup.setLoc(matrix.data[3],matrix.data[7],matrix.data[11]);
	newGroup.setRotMatrix(new GLGE.Mat([matrix.data[0], matrix.data[1], matrix.data[2], 0,
								matrix.data[4], matrix.data[5], matrix.data[6], 0,
								matrix.data[8], matrix.data[9], matrix.data[10], 0,
								0, 0, 0, 1]));
	return newGroup;
};

GLGE.Collada.prototype.initVisualScene=function(){
	var sceneid=this.xml.getElementsByTagName("scene")[0].getElementsByTagName("instance_visual_scene")[0].getAttribute("url").substr(1);
	var sceneroot=this.xml.getElementById(sceneid);
	this.addGroup(this.getNode(sceneroot));
};
 
GLGE.Collada.prototype.loaded=function(url,xml){
		//var start=(new Date()).getTime();
		//alert((new Date()).getTime()-start);
	this.xml=xml;
	this.initVisualScene();
}

GLGE.Scene.prototype.addCollada=GLGE.Scene.prototype.addGroup;
})(GLGE);