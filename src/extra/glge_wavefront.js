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
 * @name glge_wavefront.js
 * @author me@paulbrunt.co.uk
 */

(function(GLGE){
/**
* @class parses and displays a warefront object file with mtl material
* @param {string} uid the unique id for this object
* @augments GLGE.Object
*/
GLGE.Wavefront=function(uid){
	this.multimaterials=[];
	this.materials={};
	this.instances=[];
	this.queue=[];
	this.idMaterials = [];//storaged name of material (string)
	GLGE.Object.call(this,uid);
	GLGE.Assets.registerAsset(this,uid);
}
GLGE.augment(GLGE.Object,GLGE.Wavefront);
/**
* Gets the absolute path given an import path and the path it's relative to
* @param {string} path the path to get the absolute path for
* @param {string} relativeto the path the supplied path is relativeto
* @returns {string} absolute path
* @private
*/
GLGE.Wavefront.prototype.getAbsolutePath=function(path,relativeto){
	if(path.substr(0,7)=="http://" || path.substr(0,7)=="file://"  || path.substr(0,7)=="https://"){
		return path;
	}
	else
	{
		if(!relativeto){
			relativeto=window.location.href;
		}
		if(relativeto.indexOf("?")>0){
			relativeto=relativeto.substr(0,relativeto.indexOf("?"));
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
};



/**
* Loads a material file from a url
* @param {string} url the url of the material file
* @private
*/
GLGE.Wavefront.prototype.loadMaterials=function(url){
	if(!this.loading){
		this.loadFile(url,null,function(url,text){
			this.parseMaterials(text.split("\n"));
			if(this.queue.length>0){
				var matUrl=this.queue.pop();
				this.loadMaterials(matUrl,this.src);
			}else{
				this.parseMesh();
				this.fireEvent("loaded",{});
			}
		});
	}else{
		this.queue.push(url);
	}

};
/**
* creates the GLGE materials from a mtl file
* @param {string} file the file to parse
* @private
*/
GLGE.Wavefront.prototype.parseMaterials=function(file){
	//loop though all lines and look for matlibs
	var j = 0;
	var i = 0;
	var index = 0;
	var idNameMaterial;
	while(i<file.length)
	{
		//newmtl
		if(file[i].substr(0,6)=="newmtl")
		{
			var data=file[i].replace(/^\s+|\s+$/g,"").replace(/\s+/g," ").split(" ");
			var material=new GLGE.Material;
			idNameMaterial = file[j].substr(7);
			j=i+1;
			
			while(file[j].substr(0,6) != "newmtl")
			{
				
				data=file[j].replace(/^\s+|\s+$/g,"").replace(/\s+/g," ").split(" ");
				if(data.length>1)
				{
					switch(data[0]){
						case "Kd":
							material.setColorR(parseFloat(data[1]));
							material.setColorG(parseFloat(data[2]));
							material.setColorB(parseFloat(data[3]));
							break;
						case "Ks":
							material.setSpecularColor({r:parseFloat(data[1]),g:parseFloat(data[2]),b:parseFloat(data[3])});
							break;
						case "Ns":
							material.setShininess(parseFloat(data[1]));
							break;
						case "d":
							this.setZtransparent(true);
							material.setAlpha(parseFloat(data[1]));
							break;
						case "map_Kd":
							var ml=new GLGE.MaterialLayer;
							ml.setMapto(GLGE.M_COLOR);
							ml.setMapinput(GLGE.UV1);
							var tex=new GLGE.Texture;
							var k=1;
							while(data[k][0]=="-") k=k+2;
							tex.setSrc(this.getAbsolutePath(data[k],this.relativeTo));
							material.addTexture(tex);
							ml.setTexture(tex);
							material.addMaterialLayer(ml);
							break;
						case "map_Ks":
						case "map_spec":
							var ml=new GLGE.MaterialLayer;
							ml.setMapto(GLGE.M_SPECULAR);
							ml.setMapinput(GLGE.UV1);
							var tex=new GLGE.Texture;
							var k=1;
							while(data[k][0]=="-") k=k+2;
							tex.setSrc(this.getAbsolutePath(data[k],this.relativeTo));
							material.addTexture(tex);
							ml.setTexture(tex);
							material.addMaterialLayer(ml);
							break;
						case "bump":
						case "map_bump":
							var ml=new GLGE.MaterialLayer;
							ml.setMapto(GLGE.M_NOR);
							ml.setMapinput(GLGE.UV1);
							var tex=new GLGE.Texture;
							var k=1;
							while(data[k][0]=="-") k=k+2;
							tex.setSrc(this.getAbsolutePath(data[k],this.relativeTo));
							material.addTexture(tex);
							ml.setTexture(tex);
							material.addMaterialLayer(ml);
							break;
					}
				}
				j++;
				if(j>=file.length)
					break;
			}
			i=j-1;
			this.materials[index]=material;
			this.idMaterials.push(idNameMaterial);
			index++;
		}
		i++;
	}
};
/**
* loads a resource from a url
* @param {string} url the url of the resource to load
* @param {string} relativeTo the url to load relative to
* @param {function} callback thefunction to call once the file is loaded
* @private
*/
GLGE.Wavefront.prototype.loadFile=function(url,relativeTo,callback){
	this.loading=true;
	if(!callback) callback=this.loaded;
	if(!relativeTo && this.relativeTo) relativeTo=this.relativeTo;
	url=this.getAbsolutePath(url,relativeTo);
	if(!this.relativeTo) this.relativeTo=url;
	var req = new XMLHttpRequest();
	var that=this;
	if(req) {
		req.overrideMimeType("text/plain")
		req.onreadystatechange = function() {
			if(this.readyState  == 4)
			{
				if(this.status  == 200 || this.status==0){
					that.loading=false;
					callback.call(that,url,this.responseText);
				}else{ 
					GLGE.error("Error loading Document: "+url+" status "+this.status);
				}
			}
		};
		req.open("GET", url, true);
		req.send("");
	}	
}
/**
* loads a wavefront ojvect from a given url
* @param {DOM Element} url the url to retrieve
* @param {string} relativeTo optional the path the url is relative to
*/
GLGE.Wavefront.prototype.setSrc=function(url,relativeTo){
	this.src=this.getAbsolutePath(url,relativeTo);
	this.loadFile(this.src,relativeTo);
};
/**
* loads a resource from a url
* @param {string} url the url of the resource loaded
* @param {string} objfile the loaded file
* @private
*/
GLGE.Wavefront.prototype.loaded=function(url,objfile){
	this.file=objArray=objfile.split("\n");
	var hasMaterial=false;
	//loop through the file and load the Materials
	for(var i=0;i<objArray.length;i++){
		var data=objArray[i].split(" ");
		if(data.length>1){
			if(data[0]=="mtllib"){
				hasMaterial=true;
				this.loadMaterials(data[1]);
			}
		}
	}
	if(!hasMaterial){
		this.parseMesh();
		this.fireEvent("loaded",{});
	}
	
};
/**
* creates a new multimaterial
* @private
*/
GLGE.Wavefront.prototype.createMultiMaterial=function(idxDataOrig,verts,norms,texCoords,faces,material,smooth){
	//loop though the indexes to produce streams
	var positions=[];
	var normals=[];
	var uv=[];
	var newfaces=[];
	var idxData=[];
	for(var i=0;i<faces.length;i++){
		var data=idxDataOrig[faces[i]];
		if(idxData.indexOf(data)==-1 || !smooth){
			idxData.push(data);
			newfaces.push(idxData.length-1);
		}else{
			newfaces.push(idxData.indexOf(data));
		}
	}
	faces=newfaces;
	for(i=0;i<idxData.length;i++){
		if(idxData[i].indexOf("/")>0) var vertData=idxData[i].split("/");
			else var vertData=[idxData[i]];
		if(!verts[vertData[0]-1]) GLGE.error(vertData[0]);
		positions.push(verts[vertData[0]-1][1]);
		positions.push(verts[vertData[0]-1][2]);
		positions.push(verts[vertData[0]-1][3]);
		if(vertData[1]){
			uv.push(texCoords[vertData[1]-1][1]);
			uv.push(texCoords[vertData[1]-1][2]);
		}
		if(vertData[2]){
			normals.push(norms[vertData[2]-1][1]);
			normals.push(norms[vertData[2]-1][2]);
			normals.push(norms[vertData[2]-1][3]);
		}
	}
	var multiMat=new GLGE.MultiMaterial;
	var mesh=new GLGE.Mesh;
	
	mesh.setPositions(positions);
	if(uv.length>0) mesh.setUV(uv);
	if(normals.length>0) mesh.setNormals(normals);
	mesh.setFaces(faces);
	multiMat.setMesh(mesh);
	multiMat.setMaterial(material);
	this.addMultiMaterial(multiMat);
}
/**
* Parses the mesh
* @private
*/
GLGE.Wavefront.prototype.parseMesh=function(){
	objArray=this.file;
	var texCoords=[];
	var verts=[];
	var norms=[];
	var faces=[];
	var idxData=[];
	var vertoffset=0;
	var smooth=true;
	var material=new GLGE.Material;
	for(var i=0;i<objArray.length;i++){
		if(objArray[i][0]!="#"){
			var data=objArray[i].replace(/^\s+|\s+$/g,"").replace(/\s+/g," ").split(" ");
			if(data.length>0){
				switch(data[0]){
					case "s":
						if(data[1]=="1") smooth=true;
							else smooth=false;
					case "o":
						if(faces.length>0){
							this.createMultiMaterial(idxData,verts,norms,texCoords,faces,material,smooth);
							faces=[];
							material=new GLGE.Material;
						}
						break;
					case "usemtl":
						if(faces.length>0){
							this.createMultiMaterial(idxData,verts,norms,texCoords,faces,material,smooth);
							faces=[];
						}
						if(this.idMaterials.indexOf(data[1]) == -1)//Material no name 
							material=this.materials[0];//default
						else
							material=this.materials[this.idMaterials.indexOf(data[1])];//get Idname material
						break;
					case "v":
						verts.push(data);
						break;
					case "vt":
						texCoords.push(data);
						break;
					case "vn":
						norms.push(data);
						break;
					case "f":
						var tmpface=[];
						for(var j=1;j<data.length;j++){
							var idx=idxData.indexOf(data[j]);
							if(idx==-1 || !smooth){
								idxData.push(data[j]);
								idx=idxData.length-1;
							}
							tmpface.push(idx);
						}
						for(j=0;j<tmpface.length-2;j++){
							faces.push(tmpface[0]-vertoffset);
							faces.push(tmpface[1+j]-vertoffset);
							faces.push(tmpface[2+j]-vertoffset);
						}
						break;
				}
			}
		}
	}
	this.createMultiMaterial(idxData,verts,norms,texCoords,faces,material,smooth);
};

/**
* Parses the dom element and creates a texture
* @param {domelement} ele the element to create the objects from
* @private
*/
GLGE.Document.prototype.getWavefront=function(ele){
	if(!ele.object){
		var rel=this.getAbsolutePath(this.rootURL,null);
		ele.object=new GLGE[this.classString(ele.tagName)];
		//ele.object.setSrc(this.getAbsolutePath(ele.getAttribute("src"),rel));
		ele.object.setSrc(ele.getAttribute("src"),rel);
		ele.removeAttribute("src");
		this.setProperties(ele);
	}
	return ele.object;
}
})(GLGE);

