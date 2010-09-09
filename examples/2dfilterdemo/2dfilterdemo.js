var canvas = document.getElementById( 'canvas' );
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
	filter.addPassFile("raysAndSky.glsl");
	
	filter.addPassFile("pass0.glsl");
	filter.addPassFile("pass1.glsl");
	filter.addPassFile("pass2.glsl");
	filter.addPassFile("pass3.glsl");
	
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
		filter.setUniform("3fv","lightpos",new Float32Array(lightloc));
		
		var invProjView=GLGE.mulMat4(GLGE.inverseMat4(scene.camera.getViewMatrix()),GLGE.inverseMat4(scene.camera.getProjectionMatrix()));
		filter.setUniform("Matrix4fv","invProjView",new Float32Array(GLGE.transposeMat4(invProjView)));
		
		renderer.render();
	
	},15);
};

XMLdoc.load("scene.xml");
