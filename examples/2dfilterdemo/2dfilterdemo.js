var canvas = document.getElementById( 'canvas' )
var renderer = new GLGE.Renderer( canvas );

var XMLdoc = new GLGE.Document();
var scene;
var filter;

XMLdoc.onLoad = function(){
	scene = XMLdoc.getElement( "mainscene" );
	renderer.setScene( scene );
	renderer.render();
	var eyetarget = XMLdoc.getElement( "eyetarget" );
	var camera = XMLdoc.getElement( "mainCamera" );


	//sets up 2d filter
	filter=new GLGE.Filter2d();
	
	scene.setFilter2d(filter);
	
	//god rays and sky	
	var FilterStr=[];
	FilterStr.push("uniform sampler2D GLGE_RENDER;\n");
	FilterStr.push("varying vec2 texCoord;\n");
	FilterStr.push("void main(void){\n");
	FilterStr.push("vec4 color = texture2D(GLGE_RENDER, texCoord);\n");
	FilterStr.push("float intensity = 0.0;\n");
	FilterStr.push("if(color.r==0.0 && color.g==0.0 && color.b==1.0) intensity=1.0;\n");
	FilterStr.push("gl_FragColor = vec4(vec3(intensity),1.0);\n");
	FilterStr.push("}\n");
	filter.addPass(FilterStr.join(""));
	
	var FilterStr=[];
	FilterStr.push("uniform sampler2D GLGE_RENDER;\n");
	FilterStr.push("uniform sampler2D GLGE_PASS0;\n");
	FilterStr.push("uniform vec3 lightpos;\n");
	FilterStr.push("varying vec2 texCoord;\n");
	FilterStr.push("void main(void){\n");
	FilterStr.push("float intensity=0.0;\n");
	FilterStr.push("vec2 lightvec=texCoord-lightpos.xy;\n");
	FilterStr.push("lightvec=lightvec*(1.0-clamp(length(lightvec),0.0,1.0));\n");
	FilterStr.push("if((lightpos.z-1.0)>0.0){\n");
	FilterStr.push("for(int i=1;i<30;i++){\n");
	FilterStr.push("intensity+=texture2D(GLGE_PASS0, texCoord-lightvec*0.045*float(i)).r*pow(length(lightvec),2.5);\n");
	FilterStr.push("}\n");
	FilterStr.push("}\n");
	FilterStr.push("intensity+=texture2D(GLGE_PASS0, texCoord).r;\n");
	FilterStr.push("gl_FragColor = vec4(vec3(intensity),1.0);\n");
	FilterStr.push("}\n");
	filter.addPass(FilterStr.join(""));
	

	
	var FilterStr=[];
	FilterStr.push("uniform sampler2D GLGE_RENDER;\n");
	FilterStr.push("uniform sampler2D GLGE_PASS1;\n");
	FilterStr.push("uniform sampler2D TEXTURE0;\n");
	FilterStr.push("uniform vec3 lightpos;\n");
	FilterStr.push("uniform mat4 invProjView;\n");
	FilterStr.push("varying vec2 texCoord;\n");
	FilterStr.push("vec3 result=vec3(0.0,0.0,0.0);\n");
	FilterStr.push("vec3 suncolor=vec3(0.9,0.9,0.63);\n");
	FilterStr.push("void main(void){\n");
	FilterStr.push("vec2 lightvec=texCoord-lightpos.xy;\n");
	FilterStr.push("float lightdist=length(lightvec*vec2(1.0,0.444));\n");
	FilterStr.push("vec3 suncolor=(1.0-pow(lightdist,0.1))*suncolor;\n");
	FilterStr.push("if(lightdist<0.02) suncolor=suncolor*pow((0.02-lightdist)/0.02+1.0,2.0);\n");
	FilterStr.push("if(lightpos.z-1.0<0.0) suncolor=vec3(0.0);\n");
	FilterStr.push("float intensity=texture2D(GLGE_PASS1,texCoord).r;\n");
	FilterStr.push("vec4 skycoord=invProjView*vec4(vec3((texCoord-0.5)*2.0,0.0),1.0);\n");
	FilterStr.push("skycoord=invProjView*vec4(vec3((texCoord-0.5)*2.0,1.0),1.0);\n");
	FilterStr.push("skycoord.xyz=normalize(skycoord.xyz/skycoord.w);\n");
	FilterStr.push("result=max(suncolor,0.0)/0.4+texture2D(TEXTURE0,(skycoord.xy/(1.4+skycoord.z)+1.0)/2.0).rgb*intensity+texture2D(GLGE_RENDER,texCoord).rgb*(1.0-intensity);\n");
	FilterStr.push("vec3 col=texture2D(GLGE_RENDER,texCoord).rgb+vec3(0.1,0.1,0.1);\n");
	FilterStr.push("if(intensity<1.0) result=suncolor*dot(normalize(lightpos),vec3(0.0,0.0,1.0))*intensity*7.0+vec3(pow(col.r,2.5),pow(col.g,2.5),pow(col.b,2.5));\n");	
	FilterStr.push("gl_FragColor = vec4(result,1.0);\n");	
	FilterStr.push("}\n");
	filter.addPass(FilterStr.join(""));
	
	var FilterStr=[];
	FilterStr.push("uniform sampler2D GLGE_RENDER;\n");
	FilterStr.push("uniform sampler2D GLGE_PASS2;\n");
	FilterStr.push("varying vec2 texCoord;\n");
	FilterStr.push("float blurSize=0.0015;\n");
	
	FilterStr.push("void main(void){\n");
	FilterStr.push("vec4 color=vec4(0.0,0.0,0.0,0.0);\n");
	FilterStr.push("color += texture2D(GLGE_PASS2, vec2(texCoord.x - 4.0*blurSize, texCoord.y)) * 0.05;");
   	FilterStr.push("color += texture2D(GLGE_PASS2, vec2(texCoord.x - 3.0*blurSize, texCoord.y)) * 0.09;");
   	FilterStr.push("color += texture2D(GLGE_PASS2, vec2(texCoord.x - 2.0*blurSize, texCoord.y)) * 0.12;");
   	FilterStr.push("color += texture2D(GLGE_PASS2, vec2(texCoord.x - blurSize, texCoord.y)) * 0.15;");
   	FilterStr.push("color += texture2D(GLGE_PASS2, vec2(texCoord.x, texCoord.y)) * 0.16;");
   	FilterStr.push("color += texture2D(GLGE_PASS2, vec2(texCoord.x + blurSize, texCoord.y)) * 0.15;");
   	FilterStr.push("color += texture2D(GLGE_PASS2, vec2(texCoord.x + 2.0*blurSize, texCoord.y)) * 0.12;");
   	FilterStr.push("color += texture2D(GLGE_PASS2, vec2(texCoord.x + 3.0*blurSize, texCoord.y)) * 0.09;");
   	FilterStr.push("color += texture2D(GLGE_PASS2, vec2(texCoord.x + 4.0*blurSize, texCoord.y)) * 0.05;");
	FilterStr.push("gl_FragColor = vec4(color.rgb,1.0);\n");
	FilterStr.push("}\n");
	filter.addPass(FilterStr.join(""));
	
	var FilterStr=[];
	FilterStr.push("uniform sampler2D GLGE_DEPTH;\n");
	FilterStr.push("uniform sampler2D GLGE_PASS3;\n");
	FilterStr.push("uniform sampler2D GLGE_PASS2;\n");
	FilterStr.push("varying vec2 texCoord;\n");
	FilterStr.push("float blurSize=0.0015;\n");
	FilterStr.push("void main(void){\n");
	FilterStr.push("vec4 color=vec4(0.0,0.0,0.0,0.0);\n");
	FilterStr.push("color += texture2D(GLGE_PASS3, vec2(texCoord.x, texCoord.y - 4.0*blurSize)) * 0.05;");
   	FilterStr.push("color += texture2D(GLGE_PASS3, vec2(texCoord.x, texCoord.y - 3.0*blurSize)) * 0.09;");
   	FilterStr.push("color += texture2D(GLGE_PASS3, vec2(texCoord.x, texCoord.y - 2.0*blurSize)) * 0.12;");
   	FilterStr.push("color += texture2D(GLGE_PASS3, vec2(texCoord.x, texCoord.y - blurSize)) * 0.15;");
   	FilterStr.push("color += texture2D(GLGE_PASS3, vec2(texCoord.x, texCoord.y)) * 0.16;");
   	FilterStr.push("color += texture2D(GLGE_PASS3, vec2(texCoord.x, texCoord.y + blurSize)) * 0.15;");
   	FilterStr.push("color += texture2D(GLGE_PASS3, vec2(texCoord.x, texCoord.y + 2.0*blurSize)) * 0.12;");
   	FilterStr.push("color += texture2D(GLGE_PASS3, vec2(texCoord.x, texCoord.y + 3.0*blurSize)) * 0.09;");
   	FilterStr.push("color += texture2D(GLGE_PASS3, vec2(texCoord.x, texCoord.y + 4.0*blurSize)) * 0.05;");
   	FilterStr.push("float blur=getDepth(GLGE_DEPTH,texCoord)-getDepth(GLGE_DEPTH,vec2(0.5,0.35));");
   	FilterStr.push("blur=clamp(pow(blur/5.0,2.0),0.0,1.0);");
   	FilterStr.push("color = texture2D(GLGE_PASS2, texCoord)*(1.0-blur)+color*blur;");
	FilterStr.push("gl_FragColor = vec4(color.rgb,1.0);\n");
	FilterStr.push("}\n");
	filter.addPass(FilterStr.join(""));

	
	var texture=new GLGE.Texture();
	texture.setSrc("skydome.png");
	filter.addTexture(texture);
	
	function startAnim(){
		camera.blendTo({LocX:7,LocY:5,LocZ:5},30000,GLGE.SPECIAL_BLEND);
		eyetarget.blendTo({LocZ:20,LocX: -100,LocY:-15},30000,GLGE.SPECIAL_BLEND);
		
		
		setTimeout(function(){
			camera.blendTo({LocX:-6,LocY:0,LocZ:6},30000,GLGE.SPECIAL_BLEND);
			eyetarget.blendTo({LocZ:100,LocX: 100,LocY:-10},30000,GLGE.SPECIAL_BLEND);
		},30000);
		
		setTimeout(function(){
			camera.blendTo({LocX:0,LocY:0,LocZ:3},30000,GLGE.SPECIAL_BLEND);
			eyetarget.blendTo({LocZ:-200,LocX: 50,LocY:0},15000,GLGE.SPECIAL_BLEND);
		},60000);
		
		setTimeout(function(){
			eyetarget.blendTo({LocZ:-100,LocX: -50,LocY:0},15000,GLGE.SPECIAL_BLEND);
		},75000);
		
		setTimeout(startAnim,90000);
	}
	startAnim();

	
	
	setInterval(function(){
		var pos=eyetarget.getPosition();
		camera.Lookat([pos.x,-pos.z,pos.y-20]);
		
		var lightloc=GLGE.mulMat4Vec4(scene.camera.getProjectionMatrix(),GLGE.mulMat4Vec4(scene.camera.getViewMatrix(),[0,-100,7,1]));
		lightloc=[(lightloc[0]/lightloc[3]+1)/2,(lightloc[1]/lightloc[3]+1)/2,(lightloc[2]/lightloc[3]+1)/2];
		filter.setUniform("3fv","lightpos",new WebGLFloatArray(lightloc));
		
		var invProjView=GLGE.mulMat4(GLGE.inverseMat4(scene.camera.getViewMatrix()),GLGE.inverseMat4(scene.camera.getProjectionMatrix()));
		filter.setUniform("Matrix4fv","invProjView",new WebGLFloatArray(GLGE.transposeMat4(invProjView)));
		
		renderer.render()
	
	},15);
}

XMLdoc.load("scene.xml");
