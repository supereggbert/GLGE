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
 * @name glge_quicknote.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){




var materialIdx=0;

/**
* @class The Material class creates materials to be applied to objects in the graphics engine
* @see GLGE.Object
* @augments GLGE.Animatable
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
* @augments GLGE.Events
*/
GLGE.Material=function(uid){
	GLGE.Assets.registerAsset(this,uid);
	this.layers=[];
	this.layerlisteners=[];
	this.textures=[];
	this.lights=[];
	this.color={r:1,g:1,b:1,a:1};
	this.specColor={r:1,g:1,b:1};
	this.reflect=0.8;
	this.shine=10;
	this.specular=1;
	this.emit=0;
	this.alpha=1;
	this.materialIdx=materialIdx++;
};
GLGE.augment(GLGE.Animatable,GLGE.Material);
GLGE.augment(GLGE.QuickNotation,GLGE.Material);
GLGE.augment(GLGE.JSONLoader,GLGE.Material);
GLGE.augment(GLGE.Events,GLGE.Material);


/**
 * @name GLGE.Material#shaderupdate
 * @event fires when the shader for this material needs updating
 * @param {object} data
 */
 
 /**
 * @name GLGE.Material#downloadComplete
 * @event fires when all the assets for this material have finished loading
 * @param {object} data
 */

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
* @description Flag for mapping of the height in parallax mapping
*/
GLGE.M_AMBIENT=16384;

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
* @description Enumeration for normal texture coords
*/
GLGE.MAP_NORM=3;

/**
* @constant 
* @description Enumeration for object texture coords
*/
GLGE.MAP_OBJ=4;

/**
* @constant 
* @description Enumeration for reflection coords
*/
GLGE.MAP_REF=5;

/**
* @constant 
* @description Enumeration for environment coords
*/
GLGE.MAP_ENV=6;

/**
* @constant 
* @description Enumeration for view coords
*/
GLGE.MAP_VIEW=7;

/**
* @constant 
* @description Enumeration for point coords
*/
GLGE.MAP_POINT=8;

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
GLGE.Material.prototype.className="Material";
GLGE.Material.prototype.textures=null;
GLGE.Material.prototype.color=null;
GLGE.Material.prototype.specColor=null;
GLGE.Material.prototype.specular=null;
GLGE.Material.prototype.emit=null;
GLGE.Material.prototype.shine=null;
GLGE.Material.prototype.reflect=null;
GLGE.Material.prototype.lights=null;
GLGE.Material.prototype.alpha=null;
GLGE.Material.prototype.ambient=null;
GLGE.Material.prototype.shadow=true;
GLGE.Material.prototype.downloadComplete=false;
/**
* Sets the flag indicateing the material should or shouldn't recieve shadows
* @param {boolean} value The recieving shadow flag
*/
GLGE.Material.prototype.setShadow=function(value){
	this.shadow=value;
	this.fireEvent("shaderupdate",{});
	return this;
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
	this.fireEvent("shaderupdate",{});
	return this;
};
/**
* Sets the red base colour of the material
* @param {Number} r The new red level 0-1
*/
GLGE.Material.prototype.setColorR=function(value){
	this.color.r=value;
	this.fireEvent("shaderupdate",{});
	return this;
};
/**
* Sets the green base colour of the material
* @param {Number} g The new green level 0-1
*/
GLGE.Material.prototype.setColorG=function(value){
	this.color.g=value;
	this.fireEvent("shaderupdate",{});
	return this;
};
/**
* Sets the blue base colour of the material
* @param {Number} b The new blue level 0-1
*/
GLGE.Material.prototype.setColorB=function(value){
	this.color.b=value;
	this.fireEvent("shaderupdate",{});
	return this;
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
	this.specColor={r:parseFloat(color.r),g:parseFloat(color.g),b:parseFloat(color.b)};
	this.fireEvent("shaderupdate",{});
	return this;
};
/**
* Gets the ambient lighting of the material
* @return {[r,g,b]} The current ambient lighting
*/
GLGE.Material.prototype.getAmbient=function(){
	return this.ambient;
};


/**
* Sets the ambient lighting of the material
* @param {string} color The new specular colour
*/
GLGE.Material.prototype.setAmbient=function(color){
	if(!color.r){
		color=GLGE.colorParse(color);
	}
	this.ambient={r:parseFloat(color.r),g:parseFloat(color.g),b:parseFloat(color.b)};
	this.fireEvent("shaderupdate",{});
	return this;
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
	this.fireEvent("shaderupdate",{});
	return this;
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
	this.fireEvent("shaderupdate",{});
	return this;
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
	if (value<=0) value=0.001;
	this.shine=value;
	this.fireEvent("shaderupdate",{});
	return this;
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
	this.fireEvent("shaderupdate",{});
	return this;
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
	this.fireEvent("shaderupdate",{});
	return this;
};
/**
* Gets the materials reflectivity
* @return {Number} The reflectivity of the material
*/
GLGE.Material.prototype.getReflectivity=function(){
	return this.reflect;
};

/**
* Sets the material to output with 0 alpha or 1 alpha
* @param {boolean} value binary alpha flag
*/
GLGE.Material.prototype.setBinaryAlpha=function(value){
	this.binaryAlpha=value;
	this.fireEvent("shaderupdate",{});
	return this;
};
/**
* Gets the binary alpha flag
* @return {boolean} The binary alpha flag
*/
GLGE.Material.prototype.getBinaryAlpha=function(){
	return this.binaryAlpha;
};

/**
* Add a new layer to the material
* @param {MaterialLayer} layer The material layer to add to the material
*/
GLGE.Material.prototype.addMaterialLayer=function(layer){
	if(typeof layer=="string")  layer=GLGE.Assets.get(layer);
	this.layers.push(layer);
	var material=this;
	var listener=function(event){
		material.fireEvent("shaderupdate",{});
	};
	this.layerlisteners.push(listener);
	layer.addEventListener("shaderupdate",listener);
	this.fireEvent("shaderupdate",{});
	return this;
};

/**
* Removes a layer from the material
* @param {MaterialLayer} layer The material layer to remove
*/
GLGE.Material.prototype.removeMaterialLayer=function(layer){
	var idx=this.layers.indexOf(layer);
	if(idx>=0){
		this.layers.splice(idx,1);
		layer.removeEventListener("shaderupdate",this.layerlisteners[idx]);
		this.layerlisteners.splice(idx,1);
		this.fireEvent("shaderupdate",{});
	}
	return this;
};

/**
* Gets all the materials layers
* @returns {GLGE.MaterialLayer[]} all of the layers contained within this material
*/
GLGE.Material.prototype.getLayers=function(){
	return this.layers;
};
/**
* Generate the code required to calculate the texture coords for each layer
* @private
*/
GLGE.Material.prototype.getLayerCoords=function(){
		var shader=[];
		shader.push("vec4 texturePos;\n"); 
		for(i=0; i<this.layers.length;i++){
			shader.push("textureCoords"+i+"=vec3(0.0,0.0,0.0);\n"); 
			
			if(this.layers[i].mapinput==GLGE.UV1 || this.layers[i].mapinput==GLGE.UV2){
				shader.push("texturePos=vec4(vec2(UVCoord["+(this.layers[i].mapinput*2)+"],(1.0-UVCoord["+(this.layers[i].mapinput*2+1)+"])),1.0,1.0);\n");
			}
			
			if(this.layers[i].mapinput==GLGE.MAP_NORM){
				shader.push("texturePos=vec4(normalize(n.xyz),1.0);\n");
			}
			if(this.layers[i].mapinput==GLGE.MAP_OBJ){
				shader.push("texturePos=vec4(normalize(OBJCoord.xyz),1.0);\n");
			}
			
			if(this.layers[i].mapinput==GLGE.MAP_REF){
				//will need to do in fragment to take the normal maps into account!
				shader.push("texturePos=vec4(reflect(normalize(eyevec.xyz),normalize(n.xyz)),1.0);\n");
			}
			

			
			if(this.layers[i].mapinput==GLGE.MAP_ENV){
				//will need to do in fragment to take the normal maps into account!
				shader.push("texturePos=envMat * vec4(reflect(normalize(eyevec.xyz),normalize(n.xyz)),1.0);\n");
			}
			
			shader.push("textureCoords"+i+"=(layer"+i+"Matrix * texturePos).xyz;\n");			
			
		}
		
		return shader.join("");
}
/**
* Generate the fragment shader program for this material
* @private
*/
GLGE.Material.prototype.getVertexVarying=function(){
	var shader=[];
	for(i=0; i<this.layers.length;i++){
		shader.push("uniform mat4 layer"+i+"Matrix;\n");  
		shader.push("varying vec3 textureCoords"+i+";\n"); 
	}
	return shader.join("");
}

GLGE.Material.prototype.registerPasses=function(gl,object){
	for(var i=0; i<this.textures.length;i++){
		if(this.textures[i].registerPasses) this.textures[i].registerPasses(gl,object);
	}
}

/**
* Generate the fragment shader program for this material
* @private
*/
GLGE.Material.prototype.getFragmentShader=function(lights,colors){
	var shader="#ifdef GL_ES\nprecision highp float;\n#endif\n";
	var tangent=false;
	for(var i=0; i<lights.length;i++){
		if(lights[i].type==GLGE.L_POINT || lights[i].type==GLGE.L_SPOT || lights[i].type==GLGE.L_DIR){
			shader=shader+"varying vec3 lightvec"+i+";\n"; 
			shader=shader+"varying float lightdist"+i+";\n";  
		}
	}
	shader=shader+"varying vec3 n;\n";  
	shader=shader+"varying vec3 t;\n";  
	shader=shader+"varying vec4 UVCoord;\n";
	shader=shader+"varying vec3 eyevec;\n"; 
	shader=shader+"varying vec3 OBJCoord;\n";
	if(colors) shader=shader+"varying vec4 vcolor;\n";
	//texture uniforms
	for(var i=0; i<this.textures.length;i++){
		if(this.textures[i].className=="Texture") shader=shader+"uniform sampler2D TEXTURE"+i+";\n";
		if(this.textures[i].className=="TextureCanvas") shader=shader+"uniform sampler2D TEXTURE"+i+";\n";
		if(this.textures[i].className=="TextureVideo") shader=shader+"uniform sampler2D TEXTURE"+i+";\n";
		if(this.textures[i].className=="TextureCube") shader=shader+"uniform samplerCube TEXTURE"+i+";\n";
	}
	
	var cnt=0;
	var shadowlights=[];
	var num;
	for(var i=0; i<lights.length;i++){
	    if(lights[i].type==GLGE.L_OFF) continue;
			shader=shader+"uniform vec3 lightcolor"+i+";\n";  
			shader=shader+"uniform vec3 lightAttenuation"+i+";\n";  
			shader=shader+"uniform float spotCosCutOff"+i+";\n";  
			shader=shader+"uniform float spotExp"+i+";\n";  
			shader=shader+"uniform vec3 lightdir"+i+";\n";  
			shader=shader+"uniform mat4 lightmat"+i+";\n";
			shader=shader+"uniform float shadowbias"+i+";\n"; 
			shader=shader+"uniform int shadowsamples"+i+";\n";  
			shader=shader+"uniform float shadowsoftness"+i+";\n";  
			shader=shader+"uniform bool castshadows"+i+";\n";  
			if(lights[i].getCastShadows() && this.shadow){
				shader=shader+"varying vec4 spotcoord"+i+";\n";  
				num=this.textures.length+(cnt++);
				shader=shader+"uniform sampler2D TEXTURE"+num+";\n";
				shadowlights[i]=num;
			}
	}
	for(i=0; i<this.layers.length;i++){		
		shader=shader+"varying vec3 textureCoords"+i+";\n";
		shader=shader+"uniform float layeralpha"+i+";\n";
		if((this.layers[i].mapto & GLGE.M_HEIGHT) == GLGE.M_HEIGHT){
			shader=shader+"uniform float layerheight"+i+";\n";
		}
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
	shader=shader+"uniform mat4 worldInverseTranspose;\n"; 
    shader=shader+"uniform mat4 projection;\n"; 
    shader=shader+"uniform bool emitpass;\n"; 
    
	shader=shader+"void main(void)\n";
	shader=shader+"{\n";
	shader=shader+"float att;\n"; 
	shader=shader+"int texture;\n"; 
	shader=shader+"float mask=1.0;\n";
	shader=shader+"float spec=specular;\n"; 
	shader=shader+"vec3 specC=specColor;\n"; 
	shader=shader+"vec4 view;\n"; 
	shader=shader+"vec3 textureCoords=vec3(0.0,0.0,0.0);\n"; 
	shader=shader+"float ref=reflective;\n";
	shader=shader+"float sh=shine;\n"; 
	shader=shader+"float em=emit;\n"; 
	shader=shader+"float al=alpha;\n"; 
	shader=shader+"vec3 amblight=amb;\n"; 
	shader=shader+"vec4 normalmap= vec4(n,0.0);\n"
	if(colors){
		shader=shader+"vec4 color = vcolor;";
		shader=shader+"al = vcolor.a;";
	}else{
		shader=shader+"vec4 color = baseColor;"; //set the initial color
	}
	shader=shader+"float pheight=0.0;\n"
	shader=shader+"vec3 textureHeight=vec3(0.0,0.0,0.0);\n";
	shader=shader+"vec3 normal = normalize(n);\n";
	shader=shader+"vec3 b = vec3(0.0,0.0,0.0);\n";
	var diffuseLayer=0;
	var anyAlpha=false;
	for(i=0; i<this.layers.length;i++){
		shader=shader+"textureCoords=textureCoords"+i+"+textureHeight;\n";
		shader=shader+"mask=layeralpha"+i+"*mask;\n";
		
		if(this.layers[i].mapinput==GLGE.MAP_VIEW){
			//will need to do in fragment to take the normal maps into account!
			shader=shader+"view=projection * vec4(-eyevec,1.0);\n";
			shader=shader+"textureCoords=view.xyz/view.w*0.5+0.5;\n";
			shader=shader+"textureCoords=textureCoords+textureHeight;\n";
		}
    	
        if(this.layers[i].mapinput==GLGE.MAP_POINT){
        	shader=shader+"textureCoords=vec3(gl_PointCoord,1.0);\n";
        }
    	
        
			
		if(this.layers[i].getTexture().className=="Texture" || this.layers[i].getTexture().className=="TextureCanvas"  || this.layers[i].getTexture().className=="TextureVideo" ){
			var txcoord="xy";
			var sampletype="2D";
		}else{
			var txcoord="xyz";
			var sampletype="Cube";
		}
		
		if((this.layers[i].mapto & GLGE.M_COLOR) == GLGE.M_COLOR){			
			diffuseLayer=i;
			if(this.layers[i].blendMode==GLGE.BL_MUL){
				shader=shader+"color = color*(1.0-mask) + color*texture"+sampletype+"(TEXTURE"+this.layers[i].texture.idx+", textureCoords."+txcoord+")*mask;\n";
			}
			else 
			{
				shader=shader+"color = color*(1.0-mask) + texture"+sampletype+"(TEXTURE"+this.layers[i].texture.idx+", textureCoords."+txcoord+")*mask;\n";
			}
		}        
		
		if((this.layers[i].mapto & GLGE.M_HEIGHT) == GLGE.M_HEIGHT){
			//do paralax stuff
			shader=shader+"pheight = texture2D(TEXTURE"+this.layers[i].texture.idx+", textureCoords."+txcoord+").x;\n";
			shader=shader+"textureHeight =vec3((layerheight"+i+"* (pheight-0.5)  * normalize(eyevec).xy*vec2(1.0,-1.0)),0.0);\n";
		}
		if((this.layers[i].mapto & GLGE.M_SPECCOLOR) == GLGE.M_SPECCOLOR){
			shader=shader+"specC = specC*(1.0-mask) + texture"+sampletype+"(TEXTURE"+this.layers[i].texture.idx+", textureCoords."+txcoord+").rgb*mask;\n";
		}
		if((this.layers[i].mapto & GLGE.M_MSKR) == GLGE.M_MSKR){
			shader=shader+"mask = texture"+sampletype+"(TEXTURE"+this.layers[i].texture.idx+", textureCoords."+txcoord+").r;\n";
		}
		if((this.layers[i].mapto & GLGE.M_MSKG) == GLGE.M_MSKG){
			shader=shader+"mask = texture"+sampletype+"(TEXTURE"+this.layers[i].texture.idx+", textureCoords."+txcoord+").g;\n";
		}
		if((this.layers[i].mapto & GLGE.M_MSKB) == GLGE.M_MSKB){
			shader=shader+"mask = texture"+sampletype+"(TEXTURE"+this.layers[i].texture.idx+", textureCoords."+txcoord+").b;\n";
		}
		if((this.layers[i].mapto & GLGE.M_MSKA) == GLGE.M_MSKA){
			shader=shader+"mask = texture"+sampletype+"(TEXTURE"+this.layers[i].texture.idx+", textureCoords."+txcoord+").a;\n";
		}
		if((this.layers[i].mapto & GLGE.M_SPECULAR) == GLGE.M_SPECULAR){
			shader=shader+"spec = spec*(1.0-mask) + texture"+sampletype+"(TEXTURE"+this.layers[i].texture.idx+", textureCoords."+txcoord+").r*mask;\n";
		}
		if((this.layers[i].mapto & GLGE.M_REFLECT) == GLGE.M_REFLECT){
			shader=shader+"ref = ref*(1.0-mask) + texture"+sampletype+"(TEXTURE"+this.layers[i].texture.idx+", textureCoords."+txcoord+").g*mask;\n";
		}
		if((this.layers[i].mapto & GLGE.M_SHINE) == GLGE.M_SHINE){
			shader=shader+"sh = sh*(1.0-mask) + texture"+sampletype+"(TEXTURE"+this.layers[i].texture.idx+", textureCoords."+txcoord+").b*mask*255.0;\n";
		}
		if((this.layers[i].mapto & GLGE.M_EMIT) == GLGE.M_EMIT){
			shader=shader+"em = em*(1.0-mask) + texture"+sampletype+"(TEXTURE"+this.layers[i].texture.idx+", textureCoords."+txcoord+").r*mask;\n";
		}
		if((this.layers[i].mapto & GLGE.M_NOR) == GLGE.M_NOR){
			shader=shader+"normalmap = normalmap*(1.0-mask) + texture"+sampletype+"(TEXTURE"+this.layers[i].texture.idx+", textureCoords."+txcoord+")*mask;\n";
			shader=shader+"normal = normalmap.rgb;\n";
			shader=shader+"normal = 2.0*(vec3(normal.r, -normal.g, normal.b) - vec3(0.5, -0.5, 0.5));";
			shader=shader+"b=normalize(cross(t.xyz,n));\n";
			shader=shader+"normal = normal.x*t + normal.y*b + normal.z*n;";
			shader=shader+"normal = normalize(normal);";
		}
		if((this.layers[i].mapto & GLGE.M_ALPHA) == GLGE.M_ALPHA){
			anyAlpha=true;
			shader=shader+"al = al*(1.0-mask) + texture"+sampletype+"(TEXTURE"+this.layers[i].texture.idx+", textureCoords."+txcoord+").a*mask;\n";
		}
		if((this.layers[i].mapto & GLGE.M_AMBIENT) == GLGE.M_AMBIENT){
			shader=shader+"amblight = amblight*(1.0-mask) + texture"+sampletype+"(TEXTURE"+this.layers[i].texture.idx+", textureCoords."+txcoord+").rgb*mask;\n";
		}
	}		
	if (!anyAlpha && this.layers.length) {
		if(this.layers[diffuseLayer].getTexture().className=="Texture" || this.layers[diffuseLayer].getTexture().className=="TextureCanvas"  || this.layers[diffuseLayer].getTexture().className=="TextureVideo" ) {
			var txcoord="xy";
			var sampletype="2D";
		}else{
			var txcoord="xyz";
			var sampletype="Cube";
		}
		shader=shader+"al = al*(1.0-mask) + texture"+sampletype+"(TEXTURE"+this.layers[diffuseLayer].texture.idx+", textureCoords."+txcoord+").a*mask;\n";        
	}
	if(this.binaryAlpha) {
		shader=shader+"if(al<0.5) discard;\n";
		shader=shader+"al=1.0;\n";
	}else {
		shader=shader+"if(al<0.0625) discard;\n";
	}
	shader=shader+"vec3 lightvalue=amblight;\n"; 
	shader=shader+"float dotN,spotEffect;";
	shader=shader+"vec3 lightvec=vec3(0.0,0.0,0.0);";
	shader=shader+"vec3 viewvec=vec3(0.0,0.0,0.0);";
	shader=shader+"vec3 specvalue=vec3(0.0,0.0,0.0);";
	shader=shader+"vec2 scoord=vec2(0.0,0.0);";
	shader=shader+"float spotmul=0.0;";
	shader=shader+"float rnd=0.0;";
	shader=shader+"float spotsampleX=0.0;";
	shader=shader+"float spotsampleY=0.0;";
	shader=shader+"float totalweight=0.0;";
	shader=shader+"int cnt=0;";
	shader=shader+"float specularSmoothStepValue=.125;\n";
	shader=shader+"vec2 spotoffset=vec2(0.0,0.0);";
	shader=shader+"float dp=0.0;";
	shader=shader+"if (normal.z<0.0) {normal.z=0.0;}\n";
	//shader=shader+"normal/=length(normal);\n"; //is this really needed 
		
    
    shader=shader+"float fogfact=1.0;";
    shader=shader+"if(fogtype=="+GLGE.FOG_QUADRATIC+") fogfact=clamp(pow(max((fogfar - length(eyevec)) / (fogfar - fognear),0.0),2.0),0.0,1.0);\n";
    shader=shader+"if(fogtype=="+GLGE.FOG_LINEAR+") fogfact=clamp((fogfar - length(eyevec)) / (fogfar - fognear),0.0,1.0);\n";
    
    
    shader=shader+"if (emitpass) {gl_FragColor=vec4(color.rgb*em,1.0);} else {\n";
    
	for(var i=0; i<lights.length;i++){
	    if(lights[i].type==GLGE.L_OFF) continue;
		shader=shader+"lightvec=lightvec"+i+";\n";  
		shader=shader+"viewvec=eyevec;\n"; 
		
		//shader=shader+"dp=dot(normal.rgb,eyevec.xyz); if (dp<0.0){(normal-=dp*eyevec/length(eyevec)); normal/=length(normal);}";
		
		if(lights[i].type==GLGE.L_POINT){ 
			shader=shader+"dotN=max(dot(normal,normalize(-lightvec)),0.0);\n";       
			shader=shader+"att = 1.0 / (lightAttenuation"+i+"[0] + lightAttenuation"+i+"[1] * lightdist"+i+" + lightAttenuation"+i+"[2] * lightdist"+i+" * lightdist"+i+");\n";
			shader=shader+"if(dotN>0.0){\n";
			if(lights[i].diffuse){
				shader=shader+"lightvalue += att * dotN * lightcolor"+i+";\n";
			}
			shader=shader+"}\n";
			if(lights[i].specular){
				shader=shader+"specvalue += smoothstep(-specularSmoothStepValue,specularSmoothStepValue,dotN)*att * specC * lightcolor"+i+" * spec  * pow(max(dot(reflect(normalize(lightvec), normal),normalize(viewvec)),0.0), 0.3*sh);\n";
			}
			
			
			
		}
		shader=shader+"spotEffect = 0.0;\n";
		if(lights[i].type==GLGE.L_SPOT){
			shader=shader+"spotEffect = dot(normalize(lightdir"+i+"), normalize(-lightvec"+i+"));";	
			shader=shader+"if (spotEffect > spotCosCutOff"+i+") {\n";		
			shader=shader+"spotEffect = pow(spotEffect, spotExp"+i+");";
			//spot shadow stuff
			if(lights[i].getCastShadows() && this.shadow){
				shader=shader+"scoord=(((spotcoord"+i+".xy)/spotcoord"+i+".w)+1.0)/2.0;\n";
				shader=shader+"if(scoord.x>0.0 && scoord.x<1.0 && scoord.y>0.0 && scoord.y<1.0){\n";
				shader=shader+"vec4 dist=texture2D(TEXTURE"+shadowlights[i]+", scoord);\n";
				shader=shader+"float depth = dot(dist, vec4(0.000000059604644775390625,0.0000152587890625,0.00390625,1.0))*"+lights[i].distance+".0;\n";
				shader=shader+"spotmul=0.0;\n";
				shader=shader+"totalweight=0.0;\n";
				shader=shader+"if((depth+shadowbias"+i+"-length(lightvec"+i+"))<0.0) {spotmul=1.0; totalweight=1.0;}\n";
				if(lights[i].samples>0){
					shader=shader+"for(int cnt=0; cnt<4; cnt++){;\n";
						shader=shader+"spotsampleX=-0.707106781;spotsampleY=-0.707106781;\n"; 
						shader=shader+"if(cnt==0 || cnt==3) spotsampleX=0.707106781;\n"; 
						shader=shader+"if(cnt==1 || cnt==3) spotsampleY=0.707106781;\n"; 
						shader=shader+"spotoffset=vec2(spotsampleX,spotsampleY)*0.5;\n";
						shader=shader+"dist=texture2D(TEXTURE"+shadowlights[i]+", scoord+spotoffset*shadowsoftness"+i+");\n";
						shader=shader+"depth = dot(dist, vec4(0.000000059604644775390625,0.0000152587890625,0.00390625,1.0))*"+lights[i].distance+".0;\n";
						shader=shader+"if((depth+shadowbias"+i+"-length(lightvec"+i+"))<0.0){\n";
						shader=shader+"spotmul+=length(spotoffset);\n";
						shader=shader+"}\n";
						shader=shader+"totalweight+=length(spotoffset);\n";
					shader=shader+"};\n";
				
					shader=shader+"if(totalweight!=spotmul){\n";
						shader=shader+"spotmul=0.0;\n";
						shader=shader+"totalweight=0.0;\n";
						shader=shader+"for(int cnt=0; cnt<"+lights[i].samples+"; cnt++){;\n"; 
							shader=shader+"rnd=(fract(sin(dot(scoord,vec2(12.9898,78.233))) * 43758.5453)-0.5)*2.0;\n"; //generate random number
							//shader=shader+"spotsampleY=(fract(sin(dot(spotcoord"+i+".yz + vec2(float(cnt)),vec2(12.9898,78.233))) * 43758.5453)-0.5)*2.0;\n"; //generate random number
							shader=shader+"spotsampleX=cos(float(cnt)*"+(360/lights[i].samples).toFixed(2)+"+rnd);\n";
							shader=shader+"spotsampleY=sin(float(cnt)*"+(360/lights[i].samples).toFixed(2)+"+rnd);\n"; 
							shader=shader+"spotoffset=vec2(spotsampleX,spotsampleY)*0.5;\n";
							shader=shader+"dist=texture2D(TEXTURE"+shadowlights[i]+", scoord+spotoffset*shadowsoftness"+i+");\n";
							shader=shader+"depth = dot(dist, vec4(0.000000059604644775390625,0.0000152587890625,0.00390625,1.0))*"+lights[i].distance+".0;\n";
							shader=shader+"if((depth+shadowbias"+i+"-length(lightvec"+i+"))<0.0){\n";
							shader=shader+"spotmul+=length(spotoffset);\n";
							shader=shader+"}\n";
							shader=shader+"totalweight+=length(spotoffset);\n";
						shader=shader+"};\n";
					shader=shader+"}\n";
				}
				shader=shader+"if(totalweight>0.0) spotEffect=spotEffect*pow(1.0-spotmul/totalweight,3.0);\n";
				shader=shader+"}\n";
			}
			//shader=shader+"color=vec4(vec3(spotEffect),1.0);\n";
			shader=shader+"dotN=max(dot(normal,normalize(-lightvec)),0.0);\n";  
			
			if(lights[i].negativeShadow){
				shader=shader+"if(dotN>0.0){\n";
				if(lights[i].diffuse){
					shader=shader+"lightvalue -= (1.0-spotEffect) / (lightAttenuation"+i+"[0] + lightAttenuation"+i+"[1] * lightdist"+i+" + lightAttenuation"+i+"[2] * lightdist"+i+" * lightdist"+i+");\n";
				}
				shader=shader+"}\n";
			}else{     
				shader=shader+"att = spotEffect / (lightAttenuation"+i+"[0] + lightdist"+i+"*(lightAttenuation"+i+"[1]  + lightAttenuation"+i+"[2] * lightdist"+i+"));\n";
			
				shader=shader+"if(dotN>0.0){\n";
				if(lights[i].diffuse){
					shader=shader+"lightvalue += att * dotN * lightcolor"+i+";\n";
				}
				shader=shader+"}\n";
				if(lights[i].specular){
				    shader=shader+"specvalue += smoothstep(-specularSmoothStepValue,specularSmoothStepValue,dotN) * att * specC * lightcolor"+i+" * spec  * pow(max(dot(reflect(normalize(lightvec), normal),normalize(viewvec)),0.0), 0.3 * sh);\n";
				}
			}
			
			
			shader=shader+"}\n";
		}
		if(lights[i].type==GLGE.L_DIR){
			shader=shader+"dotN=max(dot(normal,-normalize(lightvec)),0.0);\n";    
			if(lights[i].diffuse){
				shader=shader+"lightvalue += dotN * lightcolor"+i+";\n";
			}
			if(lights[i].specular){
				shader=shader+"specvalue += smoothstep(-specularSmoothStepValue,specularSmoothStepValue,dotN) * specC * lightcolor"+i+" * spec  * pow(max(dot(reflect(normalize(lightvec), normal),normalize(viewvec)),0.0), 0.3 * sh);\n";
			}
		}
	}
		
	shader=shader+"lightvalue = (lightvalue)*ref;\n";
	shader=shader+"if(em>0.0){lightvalue=vec3(1.0,1.0,1.0);}\n";
	shader=shader+"gl_FragColor =vec4(specvalue.rgb+color.rgb*(em+1.0)*lightvalue.rgb,al)*fogfact+vec4(fogcolor,al)*(1.0-fogfact);\n";
	//shader=shader+"gl_FragColor =vec4(vec3(color.rgb),1.0);\n";

    shader=shader+"}\n"; //end emit pass test
    
    shader=shader+"}\n";

	return shader;
};
/**
* Set the uniforms needed to render this material
* @private
*/
GLGE.Material.prototype.textureUniforms=function(gl,shaderProgram,lights,object){
	if(this.animation) this.animate();
	var pc=shaderProgram.caches;
		
	if(pc.baseColor!=this.color){
		if(this.ccache!=this.color){
			this.ccache=this.color;
			this.glColor=new Float32Array([this.color.r,this.color.g,this.color.b,this.color.a]);
		}
		gl.uniform4fv(GLGE.getUniformLocation(gl,shaderProgram, "baseColor"), this.glColor);
		pc.baseColor=this.color;
	}
	if(pc.specColor!=this.specColor){
		if(this.sccache!=this.specColor){
			this.sccache=this.specColor;
			this.glspecColor=new Float32Array([this.specColor.r,this.specColor.g,this.specColor.b]);
		}
		gl.uniform3fv(GLGE.getUniformLocation(gl,shaderProgram, "specColor"), this.glspecColor);
		pc.specColor=this.specColor;
	}
	if(pc.specular!=this.specular){
		GLGE.setUniform(gl,"1f",GLGE.getUniformLocation(gl,shaderProgram, "specular"), this.specular);
		pc.specular=this.specular;
	}
	if(pc.shine!=this.shine){
		GLGE.setUniform(gl,"1f",GLGE.getUniformLocation(gl,shaderProgram, "shine"), this.shine);
		pc.shine=this.shine;
	}
	if(pc.reflect!=this.reflect){
		GLGE.setUniform(gl,"1f",GLGE.getUniformLocation(gl,shaderProgram, "reflective"), this.reflect);
		pc.reflect=this.reflect;
	}
	if(pc.emit!=this.emit){
		GLGE.setUniform(gl,"1f",GLGE.getUniformLocation(gl,shaderProgram, "emit"), this.emit);
		pc.emit=this.emit;
	}
	if(pc.alpha!=this.alpha){
		GLGE.setUniform(gl,"1f",GLGE.getUniformLocation(gl,shaderProgram, "alpha"), this.alpha);
		pc.alpha=this.alpha;
	}
	
	/*
	if(this.ambient && pc.ambient!=this.ambient){
		gl.uniform3fv(GLGE.getUniformLocation(gl,shaderProgram, "amb"), new Float32Array([this.ambient.r,this.ambient.g,this.ambient.b]));
		pc.ambient=this.ambient;
	}
	*/
	var cnt=0;
	var num=0;
	if(!pc["lightcolor"]){
		pc["lightcolor"]=[];
		pc["lightAttenuation"]=[];
		pc["spotCosCutOff"]=[];
		pc["spotExponent"]=[];
		pc["shadowbias"]=[];
		pc["castshadows"]=[];
		pc["shadowsamples"]=[];
		pc["shadowsoftness"]=[];
	}
	for(var i=0; i<lights.length;i++){
	    if(lights[i].type==GLGE.L_OFF) continue;
		if(pc["lightcolor"][i]!=lights[i].color){
			GLGE.setUniform3(gl,"3f",GLGE.getUniformLocation(gl,shaderProgram, "lightcolor"+i), lights[i].color.r,lights[i].color.g,lights[i].color.b);
			pc["lightcolor"][i]=lights[i].color;
		}
		if(pc["lightAttenuation"][i]!=lights[i].constantAttenuation){
			GLGE.setUniform3(gl,"3f",GLGE.getUniformLocation(gl,shaderProgram, "lightAttenuation"+i), lights[i].constantAttenuation,lights[i].linearAttenuation,lights[i].quadraticAttenuation);
			pc["lightAttenuation"][i]=lights[i].constantAttenuation;
		}
		if(pc["spotCosCutOff"][i]!=lights[i].spotCosCutOff){
			GLGE.setUniform(gl,"1f",GLGE.getUniformLocation(gl,shaderProgram, "spotCosCutOff"+i), lights[i].spotCosCutOff);
			pc["spotCosCutOff"][i]=lights[i].spotCosCutOff;
		}
		if(pc["spotExponent"][i]!=lights[i].spotExponent){
			GLGE.setUniform(gl,"1f",GLGE.getUniformLocation(gl,shaderProgram, "spotExp"+i), lights[i].spotExponent);
			pc["spotExponent"][i]=lights[i].spotExponent;
			
		}
		if(pc["shadowbias"][i]!=lights[i].shadowBias){
			GLGE.setUniform(gl,"1f",GLGE.getUniformLocation(gl,shaderProgram, "shadowbias"+i), lights[i].shadowBias);
			pc["shadowbias"][i]=lights[i].shadowBias;
		}
		if(pc["shadowsoftness"][i]!=lights[i].softness){
			GLGE.setUniform(gl,"1f",GLGE.getUniformLocation(gl,shaderProgram, "shadowsoftness"+i), lights[i].softness);
			pc["shadowsoftness"][i]=lights[i].softness;
		}
		    
		//shadow code
		if(lights[i].getCastShadows() && this.shadow && this.emit==0) {
			num=this.textures.length+(cnt++);
			gl.activeTexture(gl["TEXTURE"+num]);
			gl.bindTexture(gl.TEXTURE_2D, lights[i].texture);
			GLGE.setUniform(gl,"1i",GLGE.getUniformLocation(gl,shaderProgram, "TEXTURE"+num), num);
		}
	
			
	}
	
	if(!shaderProgram.glarrays.layermat) shaderProgram.glarrays.layermat=[];
	

		
	var scale,offset;
	for(i=0; i<this.layers.length;i++){
		if(this.layers[i].animation) this.layers[i].animate();
		scale=this.layers[i].getScale();
		offset=this.layers[i].getOffset();		
		if(!shaderProgram.glarrays.layermat[i]) shaderProgram.glarrays.layermat[i]=new Float32Array(this.layers[i].getMatrix());
			else GLGE.mat4gl(this.layers[i].getMatrix(),shaderProgram.glarrays.layermat[i]);	
		
		try{GLGE.setUniformMatrix(gl,"Matrix4fv",GLGE.getUniformLocation(gl,shaderProgram, "layer"+i+"Matrix"), true, shaderProgram.glarrays.layermat[i]);}catch(e){}
		
		GLGE.setUniform(gl,"1f",GLGE.getUniformLocation(gl,shaderProgram, "layeralpha"+i), this.layers[i].getAlpha());
		GLGE.setUniform(gl,"1f",GLGE.getUniformLocation(gl,shaderProgram, "layerheight"+i), this.layers[i].getHeight());
	}
    
	for(var i=0; i<this.textures.length;i++){
		
			gl.activeTexture(gl["TEXTURE"+i]);
			if(this.textures[i].doTexture(gl,object)){
			}
			GLGE.setUniform(gl,"1i",GLGE.getUniformLocation(gl,shaderProgram, "TEXTURE"+i), i);
	}	

};

/**
* Adds a new texture to this material
* @returns {boolean} true if all resources have loaded false otherwise
*/
GLGE.Material.prototype.isComplete=function(){
    for(var i=0;i<this.textures.length;i++){
        if(!this.textures[i].isComplete) continue;
        if(!this.textures[i].isComplete()) return false;
    }
    return true;
}

/**
* Adds a new texture to this material
* @param {String} image URL of the image to be used by the texture
* @return {Number} index of the new texture
*/
GLGE.Material.prototype.addTexture=function(texture){	
	if(typeof texture=="string")  texture=GLGE.Assets.get(texture);
    var material=this;
    texture.addEventListener("downloadComplete",function(){
        if(material.isComplete()) material.fireEvent("downloadComplete");
    });
	this.textures.push(texture);
	texture.idx=this.textures.length-1;
	this.fireEvent("shaderupdate",{});
	return this;
};
GLGE.Material.prototype.addTextureCube=GLGE.Material.prototype.addTexture;
GLGE.Material.prototype.addTextureCamera=GLGE.Material.prototype.addTexture;
GLGE.Material.prototype.addTextureCanvas=GLGE.Material.prototype.addTexture;
GLGE.Material.prototype.addTextureVideo=GLGE.Material.prototype.addTexture;

GLGE.DEFAULT_MATERIAL=new GLGE.Material();

})(GLGE);