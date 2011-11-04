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



 if(typeof(GLGE) == "undefined"){
	/**
	* @namespace Holds the functionality of the library
	*/
	GLGE = {};
}

(function(GLGE){

//speed ups parsing a float that is already a float is expensive!
var parseFloat2=function(val){
	if(typeof val!="number") return parseFloat(val);
		else return val;
}


/**
* Function to augment one object with another
* @param {object} obj1 Source Object
* @param {object} obj2 Destination Object
*/
GLGE.augment=function(obj1,obj2){
	obj2.prototype.baseclass = obj1;
	for(var proto in obj1.prototype){
		if(!obj2.prototype[proto]) // do not overwrite functions of the derived objects
			obj2.prototype[proto]=obj1.prototype[proto];
		else // Attach those to the baseclass instead. Use 'call(this)' to call baseclass methods
			obj2.prototype.baseclass[proto]=obj1.prototype[proto];
	}
}


/**
* Moves all GLGE function to global
**/
GLGE.makeGlobal=function(){
	for(var key in GLGE){
		window[key]=GLGE[key];
	}
}

GLGE.New=function(createclass){
	if(GLGE[createclass].prototype.className!=""){
		return new GLGE[createclass]();
	}else{
		return false;
	}
}

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
* @description Enumeration for global refrance frame
*/
GLGE.GLOBAL=0;
/**
* @constant 
* @description Enumeration for local refrance frame
*/
GLGE.LOCAL=1;


/**
* @constant 
* @description Enumeration for tri rendering
*/
GLGE.DRAW_TRIS=1;
/**
* @constant 
* @description Enumeration for line rendering
*/
GLGE.DRAW_LINES=2;

/**
* @constant 
* @description Enumeration for line loop rendering
*/
GLGE.DRAW_LINELOOPS=3;
/**
* @constant 
* @description Enumeration for line loop rendering
*/
GLGE.DRAW_LINESTRIPS=4;
/**
* @constant 
* @description Enumeration for point rendering
*/
GLGE.DRAW_POINTS=5;

/**
* @constant 
* @description Enumeration for point rendering
*/
GLGE.DRAW_TRIANGLESTRIP=6;




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
* @description Enumeration for rendering using normal shader
*/
GLGE.RENDER_NORMAL=3;

/**
* @constant 
* @description Enumeration for emit rendering
*/
GLGE.RENDER_EMIT=4;

/**
* @constant 
* @description Enumeration for depth rendering
*/
GLGE.RENDER_DEPTH=5;

/**
* @constant 
* @description Enumeration for no rendering
*/
GLGE.RENDER_NULL=6;

/**
* @constant 
* @description Enumeration for box bound text picking
*/
GLGE.TEXT_BOXPICK=1;
/**
* @constant 
* @description Enumeration for text bound text picking
*/
GLGE.TEXT_TEXTPICK=2;

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
* @constant 
* @description Enumeration for no value
*/
GLGE.NONE=0;

/**
* @constant 
* @description Enumeration for X-Axis
*/
GLGE.XAXIS=1;
/**
* @constant 
* @description Enumeration for Y-Axis
*/
GLGE.YAXIS=2;
/**
* @constant 
* @description Enumeration for Z-Axis
*/
GLGE.ZAXIS=3;

/**
* @constant 
* @description Enumeration for +X-Axis
*/
GLGE.POS_XAXIS=1;
/**
* @constant 
* @description Enumeration for -X-Axis
*/
GLGE.NEG_XAXIS=2;
/**
* @constant 
* @description Enumeration for +Y-Axis
*/
GLGE.POS_YAXIS=3;
/**
* @constant 
* @description Enumeration for -Y-Axis
*/
GLGE.NEG_YAXIS=4;
/**
* @constant 
* @description Enumeration for +Z-Axis
*/
GLGE.POS_ZAXIS=5;
/**
* @constant 
* @description Enumeration for -Z-Axis
*/
GLGE.NEG_ZAXIS=6;


GLGE.ZERO="ZERO";
GLGE.ONE="ONE";
GLGE.SRC_COLOR="SRC_COLOR";
GLGE.ONE_MINUS_SRC_COLOR="ONE_MINUS_SRC_COLOR";
GLGE.SRC_ALPHA="SRC_ALPHA";
GLGE.ONE_MINUS_SRC_ALPHA="ONE_MINUS_SRC_ALPHA";
GLGE.DST_ALPHA="DST_ALPHA";
GLGE.ONE_MINUS_DST_ALPHA="ONE_MINUS_DST_ALPHA";


/**
* @constant 
* @description Linear blending function
*/
GLGE.LINEAR_BLEND=function(value){
	return value;
}
/**
* @constant 
* @description Quadratic blending function
*/
GLGE.QUAD_BLEND=function(value){
	return value*value;
}
/**
* @constant 
* @description Special blending function
*/
GLGE.SPECIAL_BLEND=function(value){
	value=value*(2-value);
	return value*value;
}


GLGE.error=function(error){
    if (console&&console.log)
        console.log("GLGE error: "+error);
    //do not use a modal dialog to indicate this users can override GLGE.error if they desire
};

GLGE.warning=function(warning){
    if (console&&console.log)
        console.log("GLGE warning: "+warning);
    //do not use a modal dialog to indicate this users can override GLGE.warning if they desire
};

/**
* @namespace Holds the global asset store
*/
GLGE.Assets={};
GLGE.Assets.assets={};
//don't need to register assets unless we are using network or webworkers
GLGE.REGISTER_ASSETS=false;
 
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
	if(typeof uid=="object"){
		if(obj._) obj._(uid);
		uid=uid.uid;
	}
	if(!uid){
		uid=GLGE.Assets.createUUID();
	};
	obj.uid=uid;
	if(GLGE.REGISTER_ASSETS){
		GLGE.Assets.assets[uid]=obj;
	}
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
GLGE.Assets.get=function(uid){
	var value=GLGE.Assets.assets[uid];
	if(value){
		return value;
	}else{
		return false;
	}
}

/**
* @function hashing function
* @private
*/
GLGE.DJBHash=function(str){
      var hash = 5381;

      for(var i = 0; i < str.length; i++){
		hash = ((hash << 5) + hash) + str.charCodeAt(i);
      }

      return hash;
}

/**
* @function check if shader is already created if not then create it
* @private
*/
GLGE.getGLShader=function(gl,type,str){
	var hash=GLGE.DJBHash(str);
	if(!gl.shaderCache) gl.shaderCache={};
	if(!gl.shaderCache[hash]){
		var shader=gl.createShader(type);
		gl.shaderSource(shader, str);
		gl.compileShader(shader);
		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			try {
				GLGE.error(gl.getShaderInfoLog(shader));
				return;
			} catch (e) {
				/* Firefox hack: Assume no error if there was no shader log. */
			}
		}
		gl.shaderCache[hash]=shader;
	}
	return gl.shaderCache[hash];
}

var progIdx=0;
/**
* @function tries to re use programs
* @private
*/
GLGE.getGLProgram=function(gl,vShader,fShader){
	if(!gl.programCache) gl.programCache=[];
	var programCache=gl.programCache;
	for(var i=0; i<programCache.length;i++){
		if(programCache[i].fShader==fShader && programCache[i].vShader==vShader){
			return programCache[i].program;
		}
	}
	var program=gl.createProgram();
	program.progIdx=progIdx++;
	gl.attachShader(program, vShader);
	gl.attachShader(program, fShader);
	gl.linkProgram(program);
	if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
		GLGE.error("Couldn't link shader: " + gl.getProgramInfoLog(program));
	}
	programCache.push({vShader:vShader,fShader:fShader,program:program});
	if(!program.uniformDetails){
		program.uniformDetails={};
		var uniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
		for (var i=0;i<uniforms;++i) {
			var info=gl.getActiveUniform(program, i);
			program.uniformDetails[info.name]={loc:GLGE.getUniformLocation(gl,program,info.name),info:info};
		}
	}
	return program;
}


/**
* function to cache the uniform locations
* @param {glcontext} the gl context of the program
* @param {program} the shader program
* @param {string} the uniform name
* @private
*/
GLGE.getUniformLocation=function(gl,program, uniform){
	/*if(program.uniformDetails[uniform]){
		return program.uniformDetails[uniform].loc;
	}else{
		return gl.getUniformLocation(program, uniform);
	}*/
	if(!program.uniformCache) program.uniformCache={};
	if(!program.uniformChecked) program.uniformChecked={};
	if(!program.uniformChecked[uniform]){
		program.uniformCache[uniform]=gl.getUniformLocation(program, uniform);
		program.uniformChecked[uniform]=true;
	}
	return program.uniformCache[uniform];
};
/**
* functions to set uniforms with location check.
*/
GLGE.setUniform=function(gl,type,location,value){
	if(typeof value=="string") value=+value;
	if(location!=null)
		gl["uniform"+type](location,value);

};

GLGE.setUniform3=function(gl,type,location,value1,value2,value3){
	if(typeof value1=="string") value1=+value1;
	if(typeof value2=="string") value2=+value2;
	if(typeof value3=="string") value3=+value3;
	if(location!=null)
		gl["uniform"+type](location,value1,value2,value3);

};

GLGE.setUniform2=function(gl,type,location,value1,value2){
	if(typeof value1=="string") value1=+value1;
	if(typeof value2=="string") value2=+value2;
	if(location!=null)
		gl["uniform"+type](location,value1,value2);

};
GLGE.setUniform4=function(gl,type,location,value1,value2,value3,value4){
	if(location!=null)
		gl["uniform"+type](location,value1,value2,value3,value4);

};

GLGE.setUniformMatrix=function(gl,type,location,transpose,value){
	if(location!=null)
		gl["uniform"+type](location,transpose,value);
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
	if(program.attribCache[attrib]==undefined){
		program.attribCache[attrib]=gl.getAttribLocation(program, attrib);
	}
	return program.attribCache[attrib];
}




/**
* function to parse a colour input into RGB eg #ff00ff, red, rgb(100,100,100)
* @param {string} color the color to parse
*/
GLGE.colorParse=function(color){
	var red,green,blue,alpha;
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
		if(color.length==8){
			red=parseInt("0x"+color.substr(0,2))/255;
			green=parseInt("0x"+color.substr(2,2))/255;
			blue=parseInt("0x"+color.substr(4,2))/255;
			alpha=parseInt("0x"+color.substr(6,2))/255;
		}else if(color.length==4){
			red=parseInt("0x"+color.substr(0,1))/15;
			green=parseInt("0x"+color.substr(1,1))/15;
			blue=parseInt("0x"+color.substr(2,1))/15;
			alpha=parseInt("0x"+color.substr(3,1))/15;
		}else if(color.length==6){
			red=parseInt("0x"+color.substr(0,2))/255;
			green=parseInt("0x"+color.substr(2,2))/255;
			blue=parseInt("0x"+color.substr(4,2))/255;
			alpha=1;
		}else if(color.length==3){
			red=parseInt("0x"+color.substr(0,1))/15;
			green=parseInt("0x"+color.substr(1,1))/15;
			blue=parseInt("0x"+color.substr(2,1))/15;
			alpha=1;
		}
	}else if(color.substr && color.substr(0,4)=="rgb("){
		var colors=color.substr(4).split(",");
		red=parseInt(colors[0])/255;
		green=parseInt(colors[1])/255;
		blue=parseInt(colors[2])/255;
		alpha=1;
	}else if(color.substr && color.substr(0,5)=="rgba("){
		var colors=color.substr(4).split(",");
		red=parseInt(colors[0])/255;
		green=parseInt(colors[1])/255;
		blue=parseInt(colors[2])/255;
		alpha=parseInt(colors[3])/255;
	}else{
		red=0;
		green=0;
		blue=0;
		alpha=0;
	}
	return {r:red,g:green,b:blue,a:alpha};
}



})(GLGE);


