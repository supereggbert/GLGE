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
 
if(typeof(GLGE) == "undefined"){
	/**
	* @namespace Holds the functionality of the library
	*/
	GLGE = {};
}

(function(GLGE){
 GLGE.ColladaDocuments=[];
 

 
 
/**
* @class Class to represent a collada object
* @augments GLGE.Group
*/
GLGE.Collada=function(uid){
	GLGE.Group.call(this);
	this.children=[];
	this.actions={};
	this.boneIdx=0;
	this.actionsIdx=0;
	GLGE.Assets.registerAsset(this,uid);


	

};
GLGE.augment(GLGE.Group,GLGE.Collada);
GLGE.Collada.prototype.type=GLGE.G_NODE;
GLGE.Collada.prototype.useLights=false;
GLGE.Collada.prototype.useCamera=false
GLGE.Collada.prototype.useBinaryAlpha=false;
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
		if (relativeto.indexOf("://")==-1){
			return relativeto.slice(0,relativeto.lastIndexOf("/"))+"/"+path;
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
* determine if this is a sketchupfile
* @private
*/
GLGE.Collada.prototype.isSketchupFile = function() {
    var asset=this.xml.getElementsByTagName("asset");
    if (!asset || asset.length==0)
        return false;
    for (var i=0;i<asset.length;++i){
        var contributor=asset[i].getElementsByTagName("contributor");
        if (!contributor || contributor.length==0)
            return false;
        for (var j=0;j<contributor.length;++j) {
            var authoring=contributor[j].getElementsByTagName("authoring_tool");
            if (!authoring || authoring.length==0)
                return false;
            for (var k=0;k<authoring.length;++k) {    
                var tool=authoring[k].firstChild.nodeValue;
                if (tool.indexOf("Google")==0) {
                    return true;
                }
            }
        }        
    }
    return false;
};


/**
* set flag indicating if binary alpha should be used
* @param {boolean} flag the flag indicating binary alpha use
*/
GLGE.Collada.prototype.setUseBinaryAlpha=function(flag){
	this.useBinaryAlpha=flag;
	return this;
}

/**
* set flag indicating if camera should be extracted from the collada document
* @param {boolean} node the value to parse
*/
GLGE.Collada.prototype.setUseCamera=function(usecamera){
	this.useCamera=usecamera;
	return this;
}
/**
* get flag indicating if camera should be extracted from the collada document
* @returns {boolean} node the value to parse
*/
GLGE.Collada.prototype.getUseCamera=function(){
	return this.useCamera;
}

/**
* set flag indicating if lights should be extracted from the collada document
* @param {boolean} node the value to parse
*/
GLGE.Collada.prototype.setUseLights=function(uselights){
	this.useLights=uselights;
	return this;
}
/**
* get flag indicating if lights should be extracted from the collada document
* @returns {boolean} node the value to parse
*/
GLGE.Collada.prototype.getUseLights=function(uselights){
	return this.useLights;
}

/**
* loads an collada file from a given url
* @param {DOM Element} node the value to parse
* @param {string} relativeTo optional the path the url is relative to
*/
GLGE.Collada.prototype.setDocument=function(url,relativeTo,cb){
	this.url=url;
    this.loadedCallback=cb;
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
    if (!element )
        return []
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
    if (!rootNode) {
        GLGE.error("Collada.getMeshes returning [], id: " + id);
        return [];        
    }
    var temp = rootNode.getElementsByTagName("mesh");
    if (!temp){
        GLGE.error("Collada.getMeshes returning [], id: " + id);
        return [];        
    }
    meshNode = null;
    if (temp.length) {
        meshNode = temp[0];
    }
    else {
        GLGE.error("Collada.getMeshes returning [], id: " + id);
    }
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
		
			for(var j=0; j<vcount[n]-2;j++){
				for(var k=0;k<=maxoffset;k++){
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
			inputs[n].offset=parseInt(inputs[n].getAttribute("offset"));
			outputData[block]=[];
			inputArray.push(inputs[n]);
			//inputArray[inputs[n].getAttribute("offset")]=inputs[n];
		}
		//get the face data and push the data into the mesh
		if(triangles[i].getElementsByTagName("p")[0].data) faces=triangles[i].getElementsByTagName("p")[0].data;
			else faces=this.parseArray(triangles[i].getElementsByTagName("p")[0]);

		for(var n=0;n<inputArray.length;n++){
			if(inputArray[n].block!="VERTEX"){
				inputArray[n].data=[inputArray[n].data];
				inputArray[n].data[0].block=inputArray[n].block;
			}
		}
		
		//get max offset
		var maxoffset=0;
		for(n=0;n<inputArray.length;n++){
			maxoffset=Math.max(inputArray[n].offset+1,maxoffset);
		}
		
		for(j=0;j<faces.length;j=j+maxoffset){
			for(n=0;n<inputArray.length;n++){
				for(var l=0;l<inputArray[n].data.length;l++){
					var block=inputArray[n].data[l].block;
					var pcnt=inputArray[n].data[l].stride;
					for(k=0;k<inputArray[n].data[l].stride;k++){
						if(inputArray[n].data[l].pmask[k]){
							outputData[block].push(inputArray[n].data[l].array[faces[j+inputArray[n].offset]*inputArray[n].data[l].stride+k+inputArray[n].data[l].offset]);
						}
					}
					if(skeletonData && block=="POSITION"){
						for(k=0;k<skeletonData.count;k++){
							vertexJoints.push(skeletonData.vertexJoints[faces[j+inputArray[n].offset]*skeletonData.count+k]);
							vertexWeights.push(skeletonData.vertexWeight[faces[j+inputArray[n].offset]*skeletonData.count+k]);
						}
					}
					//account for 1D and 2D
					if(block=="POSITION" && pcnt==1) {outputData[block].push(0);outputData[block].push(0);}
					if(block=="POSITION" && pcnt==2) outputData[block].push(0);
					//we can't handle 3d texcoords at the moment so try two
					if(block=="TEXCOORD0" && pcnt==3) outputData[block].pop();
					if(block=="TEXCOORD1" && pcnt==3) outputData[block].pop();
				}
			}
		}
		
		//create faces array
		faces=[];
		//create mesh
        var windingOrder=GLGE.Mesh.WINDING_ORDER_CLOCKWISE;
		if(!outputData.NORMAL){
            console.log("Autogenerating normals, do not know facings");
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
            var len=outputData.POSITION.length/3;
         	for(n=0;n<len;n++) faces.push(n);   
		}else {
            windingOrder=GLGE.Mesh.WINDING_ORDER_CLOCKWISE;
			for(n=0;n<outputData.POSITION.length;n=n+9){
				var vec1=GLGE.subVec3([outputData.POSITION[n],outputData.POSITION[n+1],outputData.POSITION[n+2]],[outputData.POSITION[n+3],outputData.POSITION[n+4],outputData.POSITION[n+5]]);
				var vec2=GLGE.subVec3([outputData.POSITION[n+6],outputData.POSITION[n+7],outputData.POSITION[n+8]],[outputData.POSITION[n],outputData.POSITION[n+1],outputData.POSITION[n+2]]);
				var vec3=GLGE.crossVec3(vec2,vec1);
                var clockwise_winding_order=0;                
                for (var dp=0;dp<9;dp+=3) {
                    if (
                        vec3[0]*outputData.NORMAL[n+dp]
                        + vec3[1]*outputData.NORMAL[n+dp+1]
                        + vec3[2]*outputData.NORMAL[n+dp+2]<0) {
                        clockwise_winding_order-=1;
                    }else clockwise_winding_order+=1;
                }
                if (clockwise_winding_order<0) {
                    var len=outputData.POSITION.length/3;
                    faces.push(n/3);
                    faces.push(n/3+2);
                    faces.push(n/3+1);//invert
                }else {
	                faces.push(n/3);
                    faces.push(n/3+1);
                    faces.push(n/3+2);
                }
            }
        }
	
        if (!this.isSketchupFile())
            windingOrder=GLGE.Mesh.WINDING_ORDER_UNKNOWN;
		function min(a,b){
            return (a>b?b:a);
        }
        var MAXVERTS=21843;
        MAXVERTS*=3;//always must be a multiple of 3 (3 vertices)
        var nummesh=((faces.length-faces.length%MAXVERTS)/MAXVERTS)+(faces.length%MAXVERTS?1:0);
		var trimesh=[];
        var vstride=3;
        var nstride=3;
        var tstride=2;
        for (var index=0;index<nummesh;++index) {
            trimesh.push(new GLGE.Mesh(undefined,windingOrder));
		    trimesh[index].setPositions(outputData.POSITION.slice(MAXVERTS*index*vstride,min(MAXVERTS*vstride*(index+1),outputData.POSITION.length)));
		    trimesh[index].setNormals(outputData.NORMAL.slice(MAXVERTS*index*nstride,min(MAXVERTS*(index+1)*nstride,outputData.POSITION.length)));
		    
		    if(outputData.TEXCOORD0) trimesh[index].setUV(outputData.TEXCOORD0.slice(MAXVERTS*index*tstride,min(MAXVERTS*(index+1)*tstride,outputData.TEXCOORD0.length)));
		    if(!outputData.TEXCOORD0 && outputData.TEXCOORD1) trimesh[index].setUV(outputData.TEXCOORD1.slice(MAXVERTS*index*tstride,min(MAXVERTS*(index+1)*tstride,outputData.TEXCOORD1.length)));
		    if(outputData.TEXCOORD1) trimesh[index].setUV2(outputData.TEXCOORD1.slice(MAXVERTS*index*tstride,min(MAXVERTS*(index+1)*tstride,outputData.TEXCOORD1.length)));
        }

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
            for (var index=0;index<nummesh;++index) {			
			    trimesh[index].setJoints(skeletonData.joints);
			    trimesh[index].setInvBindMatrix(skeletonData.inverseBindMatrix);
                var maxval=min(MAXVERTS*(index+1)*skeletonData.count,vertexJoints.length);
                var minval=MAXVERTS*index*skeletonData.count;
			    trimesh[index].setVertexJoints(vertexJoints.slice(minval,maxval),skeletonData.count);
			    trimesh[index].setVertexWeights(vertexWeights.slice(minval,maxval),skeletonData.count);
            }
		}
        for (var index=0;index<nummesh;++index) {		
		    trimesh[index].setFaces(faces.slice(0,min(MAXVERTS*(index+1),faces.length)-MAXVERTS*(index)));
		    trimesh[index].matName=triangles[i].getAttribute("material");
            
		    meshes.push(trimesh[index]);
        }
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
GLGE.Collada.prototype.createMaterialLayer=function(node,material,common,mapto,bvi){
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
	if(node.hasAttribute("texcoord") && bvi[node.getAttribute("texcoord")]){
		if(bvi[node.getAttribute("texcoord")]==1) {
			layer.setMapinput(GLGE.UV2);
		}else if (bvi[node.getAttribute("texcoord")]==0) {
			layer.setMapinput(GLGE.UV1);
		} else {
            GLGE.error("GLGE only supports 2 texture sets\n");
			layer.setMapinput(GLGE.UV1);
        }
	}else {
        GLGE.error("Collada material does not specify texture coordinates, but it may have them: defaulting to set 0\n");
        
        layer.setMapinput(GLGE.UV1);
    }
    
	// JHD: Added correct bracket enclosing for the "true" case.
	if (node.getElementsByTagName("blend_mode")[0]) {
		var blend = node.getElementsByTagName("blend_mode")[0].firstChild.nodeValue;
		if (blend == "MULTIPLY")
			layer.setBlendMode(GLGE.BL_MUL);
	}
	// JDH - End

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
GLGE.Collada.prototype.getMaterial=function(id,bvi){	

	// JHD: Added "else" and enclosing brackets
	if (!MaterialCache[this.url]) {
		MaterialCache[this.url] = {};
	} else if (MaterialCache[this.url][id]) {
		return MaterialCache[this.url][id];
	}
	
    	var materialLib=this.xml.getElementsByTagName("library_materials")[0];
	var materialNode=getChildElementById(materialLib, id); //this.xml.getElementById(id);
    if (!materialNode) {
        var returnMaterial=new GLGE.Material();
	    MaterialCache[this.url][id]=returnMaterial;        
        return returnMaterial;
    }
	var effectid=materialNode.getElementsByTagName("instance_effect")[0].getAttribute("url").substr(1);
	var effect=this.xml.getElementById(effectid);
	var common=effect.getElementsByTagName("profile_COMMON")[0];
	//glge only supports one technique currently so try and match as best we can
	var technique=common.getElementsByTagName("technique")[0];
	var returnMaterial=new GLGE.Material();
	returnMaterial.setBinaryAlpha(this.useBinaryAlpha);
    
	returnMaterial.setSpecular(0);
	
	MaterialCache[this.url][id]=returnMaterial;
	
	var child;
	var color;
	
	
	//do ambient lighting
	var ambient=technique.getElementsByTagName("ambient");
	if(ambient.length>0){
		child=ambient[0].firstChild;
		do{
			switch(child.tagName){
				case "color":
					color=child.firstChild.nodeValue.replace(/\s+/g,' ').split(" ");
					returnMaterial.setAmbient({r:color[0],g:color[1],b:color[2]});
					break;
				case "param":
					color=this.getFloat4(common,child.getAttribute("ref")).replace(/\s+/g,' ').split(" ");
					returnMaterial.setAmbient({r:color[0],g:color[1],b:color[2]});
					break;
				case "texture":
					this.createMaterialLayer(child,returnMaterial,common,GLGE.M_AMBIENT,bvi);
					break;
			}
		}while(child=child.nextSibling);
	}
	
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
					this.createMaterialLayer(child,returnMaterial,common,GLGE.M_COLOR,bvi);
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
					this.createMaterialLayer(child,returnMaterial,common,GLGE.M_NOR,bvi);
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
					this.createMaterialLayer(child,returnMaterial,common,GLGE.M_SHINE,bvi);
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
					this.createMaterialLayer(child,returnMaterial,common,GLGE.M_SPECCOLOR,bvi);
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
					returnMaterial.setEmit({r:color[0],g:color[1],b:color[2]});
					break;
				case "param":
					color=this.getFloat4(common,child.getAttribute("ref")).split(" ");
					returnMaterial.setEmit(color[0]);
					break;
				case "texture":
					this.createMaterialLayer(child,returnMaterial,common,GLGE.M_EMIT,bvi);
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
					this.createMaterialLayer(child,returnMaterial,common,GLGE.M_REFLECT,bvi);
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
				//Causing issues with a couple of models
				//returnMaterial.setAlpha(parseFloat(child.firstChild.nodeValue));
				//returnMaterial.trans=true;
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
					this.createMaterialLayer(child,returnMaterial,common,GLGE.M_ALPHA,bvi);
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


GLGE.Collada.prototype.setMaterialOntoMesh=function(meshes,node) {
	var materials=node.getElementsByTagName("instance_material");
	var objMaterials={};
	for(var i=0; i<materials.length;i++){
		var bvis=materials[i].getElementsByTagName("bind_vertex_input");
		var bvi={};
		for(var j=0;j<bvis.length;j++){
			if (bvis[j].hasAttribute("input_set")) {
				bvi[bvis[j].getAttribute("semantic")]=bvis[j].getAttribute("input_set");					
			}else {//the exporter is buggy eg VCGLab | MeshLab and does not specify input_set
				function getLastNumber(str){
					var retval="";
					for (var i=str.length-1;i>=0;--i)
						if (str[i]>="0"&&str[i]<="9")
							retval=str[i]+retval;
					if (retval.length==0) return "0";
					return retval;
				}
				bvi[bvis[j].getAttribute("semantic")]=getLastNumber(bvis[j].getAttribute("semantic"));
			}
		}
		mat=this.getMaterial(materials[i].getAttribute("target").substr(1),bvi);
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
		// JHD
		var geometryId = node.getAttribute("url").substr(1);
		var meshes = this.getMeshes(geometryId);
		// JHD - End
		this.setMaterialOntoMesh(meshes, node);
		// JHD
		node.GLGEObj.id = geometryId;
		// JHD - End
		return node.GLGEObj;
	}
};


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
	for(var n=0;n<inputsArray.length;n++){
		block=inputsArray[n].block;
		outputData[block]={};
		outputData[block].data=[];
		outputData[block].names=[];
		for(var k=0;k<inputsArray[n].data.array.length;k=k+inputsArray[n].data.stride){
			var pcnt=0;
			for(i=0;i<inputsArray[n].data.pmask.length;i++){
				if(inputsArray[n].data.pmask[i]){
					outputData[block].names.push(inputsArray[n].data.pmask[i].name);
					if(inputsArray[n].data.pmask[i].type=="float4x4"){
						outputData[block].stride=16;
						for(var j=0;j<16;j++){
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
			if(outputData["INTERPOLATION"] && outputData["INTERPOLATION"].data[i]=="BEZIER" && !outputData["IN_TANGENT"]){
				outputData["INTERPOLATION"].data[i]="LINEAR";
			}
			
			if((!outputData["INTERPOLATION"]) || outputData["INTERPOLATION"].data[i]=="LINEAR"){
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
			
			if(outputData["INTERPOLATION"] && outputData["INTERPOLATION"].data[i]=="BEZIER"){
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
	
	//blender 2.5a bug work round
	var target=channels[0].target[0].toString()
	if(!targetNode){
		var target=target.substring(target.indexOf("_")+1);
		targetNode=this.xml.getElementById(target);
	}
	if(!targetNode){
		var target=target.substring(target.indexOf("_")+1);
		targetNode=this.xml.getElementById(target);
	}
	//end work round
	
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
			for(var target in channelGroups){
				var animVector=this.getAnimationVector(channelGroups[target]);
				var targetNode=this.xml.getElementById(target);
				//blender 2.5a bug work round
				if(!targetNode){
					target=target.substring(target.indexOf("_")+1);
					targetNode=this.xml.getElementById(target);
				}
				if(!targetNode){
					target=target.substring(target.indexOf("_")+1);
					targetNode=this.xml.getElementById(target);
				}
				//end work round
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
	for(var n in this.actions) {this.setAction(this.actions[n],0,true);break}
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
		if(inputs[i].getAttribute("semantic")=="JOINT"){
			var jointdata=this.getSource(inputs[i].getAttribute("source").substr(1));
			if(jointdata.type=="IDREF_array"){
				var all_items_incorrect=(jointdata.array.length!=0);
				for(var k=0;k<jointdata.array.length;k=k+jointdata.stride){
					var curNode=this.getNode(this.xml.getElementById(jointdata.array[k]),true);
					var name=curNode.getName();
					if (!this.xml.getElementById(jointdata.array[k])) {
						GLGE.error("Bone is not specified "+jointdata.array[k]);
						inverseBindMatrix=[bindShapeMatrix=GLGE.identMatrix()];
					}else all_items_incorrect=false;
					joints.push(name);
				}
				if (all_items_incorrect)
					inverseBindMatrix=[bindShapeMatrix=GLGE.identMatrix()];
			}else if(jointdata.type=="Name_array"){
				var sidArray={};
				var sid,name;
				//is this right controller with no skeleton set, export bug??
				if(skeletons.length==0){
					var elements=this.xml.getElementsByTagName("node");
					for(k=0; k<elements.length;k++){
						sid=elements[k].getAttribute("sid");
						if(sid){
							sidArray[sid]=elements[k];
						}
						name=elements[k].getAttribute("name");
						if(name && !sidArray[name]){
							sidArray[name]=elements[k];
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
							name=elements[k].getAttribute("name");
							if(name && !sidArray[name]){
								sidArray[name]=elements[k];
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
	for(var i=0; i<inputs.length;i++){
		//TODO: sort out correct use of accessors for these source
		if(inputs[i].getAttribute("semantic")=="INV_BIND_MATRIX"){
			var matrixdata=this.getSource(inputs[i].getAttribute("source").substr(1));
			for(var k=0;k<matrixdata.array.length;k=k+matrixdata.stride){
				mat=matrixdata.array.slice(k,k+16);
				inverseBindMatrix.push(GLGE.mulMat4(GLGE.Mat4(mat),GLGE.Mat4(bindShapeMatrix.slice(0,16))));
			}
		}
	}
	//go though the inputs to get the data layout
	var vertexWeight=controller.getElementsByTagName("vertex_weights")[0];
	inputs=vertexWeight.getElementsByTagName("input");
	var inputArray=[];
	var outputData={};
	for(var n=0;n<inputs.length;n++){
		block=inputs[n].getAttribute("semantic");
		inputs[n].data=this.getSource(inputs[n].getAttribute("source").substr(1));
		inputs[n].block=block;
		outputData[block]=[];
		var offset=inputs[n].getAttribute("offset");
		if (!inputArray[offset])
			inputArray[offset]=[];//may be more than 1 input per offset -DRH
		inputArray[offset].push(inputs[n]);
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
				for (var ksub=0; ksub < inputArray[k].length; ++ksub) {
					block=inputArray[k][ksub].block;
					for(n=0;n<inputArray[k][ksub].data.stride;n++){
						if(inputArray[k][ksub].data.pmask[n]){
							if(block!="JOINT"){
								outputData[block].push(inputArray[k][ksub].data.array[parseInt(vs[vPointer])+parseInt(inputArray[k][ksub].data.offset)]);
							}else{
								outputData[block].push(parseInt(vs[vPointer]));
							}
							vPointer++;
						}
					}
				}
			}
		}
		//pad out the remaining data
		for(j=j; j<maxJoints;j++){
			for(var k=0; k<inputArray.length;k++){
				for (var ksub=0; ksub < inputArray[k].length; ++ksub) {
					block=inputArray[k][ksub].block;
					outputData[block].push(0);
				}
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

	var skeletonData={vertexJoints:outputData["JOINT"],vertexWeight:outputData["WEIGHT"],joints:joints,inverseBindMatrix:inverseBindMatrix,count:maxJoints};

	var meshes=this.getMeshes(controller.getElementsByTagName("skin")[0].getAttribute("source").substr(1),skeletonData);

	this.setMaterialOntoMesh(meshes,node);
	return node.GLGEObj;
};

/**
* creates a GLGE lights from a given instance light
* @param {node} node the element to parse
* @private
*/
GLGE.Collada.prototype.getInstanceLight=function(node){
	var type=node.getElementsByTagName("technique_common")[0].getElementsByTagName("*")[0];
	var light=new GLGE.Light;
	var color=type.getElementsByTagName("color");
	if(color.length>0){
		var colors=color[0].firstChild.nodeValue.split(" ");
		var c="rgb("+((colors[0]*255)|0)+","+((colors[1]*255)|0)+","+((colors[2]*255)|0)+")";
		light.setColor(c);
	}
	switch (type.tagName) {
		// JHD
		case "point":
			light.setType(GLGE.L_POINT);
		case "spot":
			// JHD - End
			var ca = type.getElementsByTagName("constant_attenuation");
			if (ca.length > 0)
				light.setAttenuationConstant(parseFloat(ca[0].firstChild.nodeValue));
			var la = type.getElementsByTagName("linear_attenuation");
			if (la.length > 0)
				light.setAttenuationLinear(parseFloat(la[0].firstChild.nodeValue));
			var qa = type.getElementsByTagName("quadratic_attenuation");
			if (qa.length > 0)
				light.setAttenuationQuadratic(parseFloat(qa[0].firstChild.nodeValue));
			// JHD
			if (type.tagName == "spot") {
				light.setType(GLGE.L_SPOT);
			} else {
				break;
			}
			// case "spot":
			// JHD - End
			var se = type.getElementsByTagName("falloff_exponent");
			if (se.length > 0) {
				var exp = parseFloat(se[0].firstChild.nodeValue);
				if (exp < 1.0001)
					exp *= 128; // if less then one then assume they
				// are using 0-1 so convert to 0-128
				light.setSpotExponent(exp);
			}
			var fa = type.getElementsByTagName("falloff_angle");
			if (fa.length > 0)
				light.setSpotCosCutOff(Math.cos(parseFloat(fa[0].firstChild.nodeValue) / 180
						* Math.PI));
			break;
	}
	return light;
}

// JHD
/**
* Creates a new group and parses it's children
* @param {DOM Element} node the element to parse
* @param {boolean} ref should this just get a reference for later addition
* @private
*/
GLGE.Collada.prototype.addColladaCamera = function(object) {
	object.matrix = null; // Clear any cache
	object.parent = this;
	this.children.push(object);
	this.hasCamera = true;

	return this;
}
// JHD - End

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
	if(ref && node && node.GLGEObjects){
		return node.GLGEObjects[0];
	}
	
	var newGroup=new GLGE.Group();
	var name="bone"+(++this.boneIdx);
	newGroup.setName(name);
	if (!node) {
        return newGroup;
    }
	if(!node.GLGEObjects) node.GLGEObjects=[];
	node.GLGEObjects.push(newGroup); //map Collada DOM to GLGE
	var child=node.firstChild;
	var matrix=GLGE.identMatrix();
	var data;
	if(child) do{
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
			case "instance_light":
				if(this.useLights) newGroup.addLight(this.getInstanceLight(this.xml.getElementById(child.getAttribute("url").substr(1))));
				break;
			case "instance_geometry":
				newGroup.addObject(this.getInstanceGeometry(child));
				break;
			case "instance_controller":
				newGroup.addObject(this.getInstanceController(child));
				break;
			// JHD
			case "instance_camera":
				if(!this.useCamera) break;
				newGroup.addColladaCamera(this.getNode(this.xml.getElementById(child.getAttribute("url").substr(1))));
				break;
			case "optics":
				if(!this.useCamera) break;
				var opticChild = child.getElementsByTagName("technique_common");
				if (opticChild && opticChild.length > 0) {
					opticChild = opticChild[0].getElementsByTagName("perspective");
					if (opticChild && opticChild.length > 0) {
						var yFov = opticChild[0].getElementsByTagName("yfov");
						if (yFov && yFov.length > 0) {
							newGroup.yFov = parseFloat(yFov[0].textContent);
						}
						var zNear = opticChild[0].getElementsByTagName("znear");
						if (zNear && zNear.length > 0) {
							newGroup.zNear = parseFloat(zNear[0].textContent);
						}
						var zFar = opticChild[0].getElementsByTagName("zfar");
						if (zFar && zFar.length > 0) {
							newGroup.zFar = parseFloat(zFar[0].textContent);
						}
					}
				}
				break;
				// JHD - End
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
    var metadata=this.xml.getElementsByTagName("asset");
    var up_axis="Z_UP";
    if(metadata.length) {
        var up_axis_node=metadata[0].getElementsByTagName("up_axis");
        if (up_axis_node.length) {
            up_axis_node=up_axis_node[0];
            var cur_axis=up_axis_node.firstChild.nodeValue;
            if (cur_axis.length)
                up_axis=cur_axis;
        }
    }
    var transformRoot=this;
    if (up_axis[0]!="Y"&&up_axis[0]!="y") {
        transformRoot = new GLGE.Group();
        this.addChild(transformRoot);
        if (up_axis[0]!="Z"&&up_axis[0]!="z") {
            transformRoot.setRotMatrix(GLGE.Mat4([0, -1 , 0,  0,
					                     1, 0, 0, 0,
					                     0, 0, 1, 0,
					                     0, 0, 0, 1]));
          
        }else {
            transformRoot.setRotMatrix(GLGE.Mat4([1, 0 , 0,  0,
					                     0, 0, 1, 0,
					                     0, -1, 0, 0,
					                     0, 0, 0, 1]));
            
        }
    }
	if(!this.rootId){
		var scene=this.xml.getElementsByTagName("scene");
		if(scene.length>0){
			transformRoot.addGroup(this.getNode(scene[0]));
		}else{
			GLGE.error("Please indicate the asset to render in Collada Document"+this.url);
		}
	}else{
		var root=this.xml.getElementById(this.rootId);
		if(root){
			transformRoot.addGroup(this.getNode(root));
		}else{
			GLGE.error("Asset "+this.rootId+" not found in document"+this.url);
		}
	}
	
	if(this.useCamera){
		// JHD
		var tempCamera;
		var findChild = function(root) {
			if (root.hasCamera) {
				tempCamera = root;
				return;
			}
			if (!root.children) {
				return;
			}
			for ( var i = 0; i < root.children.length && !tempCamera; i++) {
				findChild(root.children[i]);
			}
		};
		findChild(transformRoot);
		if (tempCamera) {
			pp = transformRoot.parent.parent;
			pp.camera.locX = tempCamera.locX;
			pp.camera.locY = tempCamera.locY;
			pp.camera.locZ = tempCamera.locZ;
			if (tempCamera.children && tempCamera.children.length > 0) {
				var child = tempCamera.children[0];
				if (child.yFov) {
					pp.camera.fovy = child.yFov;
					pp.camera.pMatrix = null;
				}
				// TODO: Does this really get applied into WebGL states?
				if (child.zNear) {
					pp.camera.near = child.zNear;
				}
				if (child.zFar) {
					pp.camera.far = child.zFar;
				}
			}
			// Clear camera cache - The camera has, at this point, already been
			// calculated!
			pp.camera.matrix = null;
			pp.camera.rotmatrix = tempCamera.rotmatrix;
			pp.camera.lookAt = null;
		}
		// JHD - End
	}
	
};


/**
* Exceptions for the bad exports out there, I'm sure there will be many more :-(
*/
var exceptions={
	"default":{},
	"COLLADA Mixamo exporter":{badAccessor:true},
	"FBX COLLADA exporter":{badAccessor:true},
	"Blender2.5":{flipangle:true,negjoints:true}
}
	
GLGE.Collada.prototype.getExceptions=function(){
	if(this.xml.getElementsByTagName("authoring_tool").length>0 && this.xml.getElementsByTagName("authoring_tool")[0].firstChild.nodeValue=="COLLADA Mixamo exporter"){
		return exceptions["COLLADA Mixamo exporter"];
	}
	if(this.xml.getElementsByTagName("authoring_tool").length>0 && this.xml.getElementsByTagName("authoring_tool")[0].firstChild.nodeValue=="FBX COLLADA exporter"){
		return exceptions["FBX COLLADA exporter"];
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
	if(!this.exceptions) this.exceptions=exceptions['default'];
/// FIXME -- I used to have some try/catches going on here to avoid silent fails
	this.initVisualScene();
	this.getAnimations();
    if (this.loadedCallback) {
        this.loadedCallback(this);
    }
    //WTF firefox gets here too soon????
    var collada=this;
    setTimeout(function(){
        collada.fireEvent("loaded",{url:this.url});
        if(collada.isComplete()) collada.fireEvent("downloadComplete",{});
    },1);
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
