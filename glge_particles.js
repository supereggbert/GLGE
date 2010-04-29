(function(GLGE){
GLGE.ParticleSystem=function(uid){
	this.startTime=(new Date()).getTime();
	this.texture={};
	this.startMaxVelocity={x:0,y:0,z:0};
	this.startMinVelocity={x:0,y:0,z:0};
	this.startMaxAcceleration={x:0,y:0,z:0};
	this.endMaxAcceleration={x:0,y:0,z:0};
	this.startMinAcceleration={x:0,y:0,z:0};
	this.endMinAcceleration={x:0,y:0,z:0};
	this.startColor={r:0,g:0,b:0,a:1};
	this.endColor={r:0,g:0,b:0,a:1};
}

GLGE.augment(GLGE.Placeable,GLGE.ParticleSystem);
GLGE.augment(GLGE.Animatable,GLGE.ParticleSystem);


GLGE.ParticleSystem.prototype.setMaxVelX=function(value){
	this.startMaxVelocity.x=parseFloat(value);
	this.attribute=null;
}
GLGE.ParticleSystem.prototype.setMaxVelY=function(value){
	this.startMaxVelocity.y=parseFloat(value);
	this.attribute=null;
}
GLGE.ParticleSystem.prototype.setMaxVelZ=function(value){
	this.startMaxVelocity.z=parseFloat(value);
	this.attribute=null;
}
GLGE.ParticleSystem.prototype.setMaxVelocity=function(x,y,z){
	this.startMaxVelocity={x:parseFloat(x),y:parseFloat(y),z:parseFloat(z)};
	this.attribute=null;
}

GLGE.ParticleSystem.prototype.setMinVelX=function(value){
	this.startMinVelocity.x=parseFloat(value);
	this.attribute=null;
}
GLGE.ParticleSystem.prototype.setMinVelY=function(value){
	this.startMinVelocity.y=parseFloat(value);
	this.attribute=null;
}
GLGE.ParticleSystem.prototype.setMinVelZ=function(value){
	this.startMinVelocity.z=parseFloat(value);
	this.attribute=null;
}
GLGE.ParticleSystem.prototype.setMinVelocity=function(x,y,z){
	this.startMinVelocity={x:parseFloat(x),y:parseFloat(y),z:parseFloat(z)};
	this.attribute=null;
}


GLGE.ParticleSystem.prototype.setVelX=function(value){
	this.startMaxVelocity.x=parseFloat(value);
	this.startMinVelocity.x=parseFloat(value);
	this.attribute=null;
}
GLGE.ParticleSystem.prototype.setVelY=function(value){
	this.startMaxVelocity.y=parseFloat(value);
	this.startMinVelocity.y=parseFloat(value);
	this.attribute=null;
}
GLGE.ParticleSystem.prototype.setVelZ=function(value){
	this.startMaxVelocity.z=parseFloat(value);
	this.startMinVelocity.z=parseFloat(value);
	this.attribute=null;
}
GLGE.ParticleSystem.prototype.setVelocity=function(x,y,z){
	this.startMaxVelocity={x:parseFloat(x),y:parseFloat(y),z:parseFloat(z)};
	this.startMinVelocity={x:parseFloat(x),y:parseFloat(y),z:parseFloat(z)};
	this.attribute=null;
}


GLGE.ParticleSystem.prototype.setMaxStartAccX=function(value){
	this.startMaxAcceleration.x=parseFloat(value);
	this.attribute=null;
}
GLGE.ParticleSystem.prototype.setMaxStartAccY=function(value){
	this.startMaxAcceleration.y=parseFloat(value);
	this.attribute=null;
}
GLGE.ParticleSystem.prototype.setMaxStartAccZ=function(value){
	this.startMaxAcceleration.z=parseFloat(value);
	this.attribute=null;
}
GLGE.ParticleSystem.prototype.setMaxStartAccelertaion=function(x,y,z){
	this.startMaxAcceleration={x:parseFloat(x),y:parseFloat(y),z:parseFloat(z)};
	this.attribute=null;
}

GLGE.ParticleSystem.prototype.setMinStartAccX=function(value){
	this.startMinAcceleration.x=parseFloat(value);
	this.attribute=null;
}
GLGE.ParticleSystem.prototype.setMinStartAccY=function(value){
	this.startMinAcceleration.y=parseFloat(value);
	this.attribute=null;
}
GLGE.ParticleSystem.prototype.setMinStartAccZ=function(value){
	this.startMinAcceleration.z=parseFloat(value);
	this.attribute=null;
}
GLGE.ParticleSystem.prototype.setMinStartAccelertaion=function(x,y,z){
	this.startMinAcceleration={x:parseFloat(x),y:parseFloat(y),z:parseFloat(z)};
	this.attribute=null;
}


GLGE.ParticleSystem.prototype.setStartAccX=function(value){
	this.startMaxAcceleration.x=parseFloat(value);
	this.startMinAcceleration.x=parseFloat(value);
	this.attribute=null;
}
GLGE.ParticleSystem.prototype.setStartAccY=function(value){
	this.startMaxAcceleration.y=parseFloat(value);
	this.startMinAcceleration.y=parseFloat(value);
	this.attribute=null;
}
GLGE.ParticleSystem.prototype.setStartAccZ=function(value){
	this.startMaxAcceleration.z=parseFloat(value);
	this.startMinAcceleration.z=parseFloat(value);
	this.attribute=null;
}
GLGE.ParticleSystem.prototype.setStartAccelertaion=function(x,y,z){
	this.startMaxAcceleration={x:parseFloat(x),y:parseFloat(y),z:parseFloat(z)};
	this.startMinAcceleration={x:parseFloat(x),y:parseFloat(y),z:parseFloat(z)};
	this.attribute=null;
}


GLGE.ParticleSystem.prototype.setMaxEndAccX=function(value){
	this.endMaxAcceleration.x=parseFloat(value);
	this.attribute=null;
}
GLGE.ParticleSystem.prototype.setMaxEndAccY=function(value){
	this.endMaxAcceleration.y=parseFloat(value);
	this.attribute=null;
}
GLGE.ParticleSystem.prototype.setMaxEndAccZ=function(value){
	this.endMaxAcceleration.z=parseFloat(value);
	this.attribute=null;
}
GLGE.ParticleSystem.prototype.setMaxEndAccelertaion=function(x,y,z){
	this.endMaxAcceleration={x:parseFloat(x),y:parseFloat(y),z:parseFloat(z)};
	this.attribute=null;
}

GLGE.ParticleSystem.prototype.setMinEndAccX=function(value){
	this.endMinAcceleration.x=parseFloat(value);
	this.attribute=null;
}
GLGE.ParticleSystem.prototype.setMinEndAccY=function(value){
	this.endMinAcceleration.y=parseFloat(value);
	this.attribute=null;
}
GLGE.ParticleSystem.prototype.setMinEndAccZ=function(value){
	this.endMinAcceleration.z=parseFloat(value);
	this.attribute=null;
}
GLGE.ParticleSystem.prototype.setMinEndAccelertaion=function(x,y,z){
	this.endMinAcceleration={x:parseFloat(x),y:parseFloat(y),z:parseFloat(z)};
	this.attribute=null;
}

GLGE.ParticleSystem.prototype.setEndAccX=function(value){
	this.endMinAcceleration.x=parseFloat(value);
	this.endMaxAcceleration.x=parseFloat(value);
	this.attribute=null;
}
GLGE.ParticleSystem.prototype.setEndAccY=function(value){
	this.endMinAcceleration.y=parseFloat(value);
	this.endMaxAcceleration.y=parseFloat(value);
	this.attribute=null;
}
GLGE.ParticleSystem.prototype.setEndAccZ=function(value){
	this.endMinAcceleration.z=parseFloat(value);
	this.endMaxAcceleration.z=parseFloat(value);
	this.attribute=null;
}
GLGE.ParticleSystem.prototype.setEndAccelertaion=function(x,y,z){
	this.endMinAcceleration={x:parseFloat(x),y:parseFloat(y),z:parseFloat(z)};
	this.endMaxAcceleration={x:parseFloat(x),y:parseFloat(y),z:parseFloat(z)};
	this.attribute=null;
}


GLGE.ParticleSystem.prototype.setStartColor=function(value){
	var color=GLGE.colorParse(value);
	this.startColor=color;
	this.attribute=null;
}

GLGE.ParticleSystem.prototype.setEndColor=function(value){
	var color=GLGE.colorParse(value);
	this.endColor=color;
	this.attribute=null;
}

GLGE.ParticleSystem.prototype.setStartSize=function(value){
	this.startSize=parseFloat(value);
	this.attribute=null;
}

GLGE.ParticleSystem.prototype.setEndSize=function(value){
	this.endSize=parseFloat(value);
	this.attribute=null;
}

GLGE.ParticleSystem.prototype.setLifeTime=function(value){
	this.maxLifeTime=parseFloat(value);
	this.minLifeTime=parseFloat(value);
	this.attribute=null;
}

GLGE.ParticleSystem.prototype.setMaxLifeTime=function(value){
	this.maxLifeTime=parseFloat(value);
	this.attribute=null;
}
GLGE.ParticleSystem.prototype.setMinLifeTime=function(value){
	this.minLifeTime=parseFloat(value);
	this.attribute=null;
}
GLGE.ParticleSystem.prototype.setNumParticles=function(value){
	this.numParticles=parseFloat(value);
	this.attribute=null;
}


//returns a particles initial velocity
GLGE.ParticleSystem.prototype.velocityFunction=function(i){
	return [
		(this.startMaxVelocity.x-this.startMinVelocity.x) * Math.random()+this.startMinVelocity.x,
		(this.startMaxVelocity.y-this.startMinVelocity.y) * Math.random()+this.startMinVelocity.y,
		(this.startMaxVelocity.z-this.startMinVelocity.z) * Math.random()+this.startMinVelocity.z
		];
}
//returns initial and end accelerations
GLGE.ParticleSystem.prototype.accelerationFunction=function(i){
	return [[
		(this.startMaxAcceleration.x-this.startMinAcceleration.x) * Math.random()+this.startMinAcceleration.x,
		(this.startMaxAcceleration.y-this.startMinAcceleration.y) * Math.random()+this.startMinAcceleration.y,
		(this.startMaxAcceleration.z-this.startMinAcceleration.z) * Math.random()+this.startMinAcceleration.z,
		],
		[
		(this.endMaxAcceleration.x-this.endMinAcceleration.x) * Math.random()+this.endMinAcceleration.x,
		(this.endMaxAcceleration.y-this.endMinAcceleration.y) * Math.random()+this.endMinAcceleration.y,
		(this.endMaxAcceleration.z-this.endMinAcceleration.z) * Math.random()+this.endMinAcceleration.z,
		]];
}
//returns initial and end colors
GLGE.ParticleSystem.prototype.colorFunction=function(i){
	return [[this.startColor.r,this.startColor.g,this.startColor.b,this.startColor.a],[this.endColor.r,this.endColor.g,this.endColor.b,this.endColor.a]];
}
//returns initial position of the particle
GLGE.ParticleSystem.prototype.positionFunction=function(i){
	return [0,0,0];
}
//returns start and end sizes of the particle
GLGE.ParticleSystem.prototype.sizeFunction=function(i){
	return [this.startSize,this.endSize];
}
GLGE.ParticleSystem.prototype.lifeTimeFunction=function(i){
	return (this.maxLifeTime-this.minLifeTime)*Math.random()+this.minLifeTime;
}
//lifetime of a particle
GLGE.ParticleSystem.prototype.minLifeTime=2000;
GLGE.ParticleSystem.prototype.maxLifeTime=2000;
//particle emit rate
GLGE.ParticleSystem.prototype.numParticles=200;
GLGE.ParticleSystem.prototype.startTime=0;
GLGE.ParticleSystem.prototype.startSize=0;
GLGE.ParticleSystem.prototype.endSize=1;
GLGE.ParticleSystem.prototype.toRender=true;
GLGE.ParticleSystem.prototype.renderFirst=true;
GLGE.ParticleSystem.prototype.className="ParticleSystem";
GLGE.ParticleSystem.prototype.zTrans=true;
GLGE.ParticleSystem.prototype.velocity=null;
GLGE.ParticleSystem.prototype.loop=1;

GLGE.ParticleSystem.prototype.setVelocityFunction=function(func){
	this.vecoityFunction=func;
	this.particles=null;
}
GLGE.ParticleSystem.prototype.setAccelerationFunction=function(func){
	this.accelerationFunction=func;
	this.particles=null;
}
GLGE.ParticleSystem.prototype.setPositionFunction=function(func){
	this.colorFunction=func;
	this.particles=null;
}
GLGE.ParticleSystem.prototype.setColorFunction=function(func){
	this.positionFunction=func;
	this.particles=null;
}
GLGE.ParticleSystem.prototype.setSizeFunction=function(func){
	this.sizeFunction=func;
	this.particles=null;
}
//creates the attribute arrays for the particles
GLGE.ParticleSystem.prototype.generateParticles=function(gl){
	var num_particles=this.numParticles;
	this.attribute={initPos:[],initAcc:[],endAcc:[],initVel:[],initColor:[],endColor:[],sizeAndOffset:[]};
	this.faces=[];
	for(var i=0; i<num_particles;i++){
		var position=this.positionFunction(i);
		var velocity=this.velocityFunction(i);
		var acceleration=this.accelerationFunction(i);
		var color=this.colorFunction(i);
		var size=this.sizeFunction(i);
		var lifetime=this.lifeTimeFunction(i);
		var offsetTime=Math.floor(Math.random()*lifetime);
		for(var y=-1;y<=1;y=y+2){
			for(var x=-1;x<=1;x=x+2){
				this.attribute.initPos.push(parseFloat(position[0])+x,parseFloat(position[1])+y,parseFloat(position[2]));
				this.attribute.initAcc.push(acceleration[0][0],acceleration[0][1],acceleration[0][2]);
				this.attribute.endAcc.push(acceleration[1][0],acceleration[1][1],acceleration[1][2]);
				this.attribute.initVel.push(velocity[0],velocity[1],velocity[2]);
				this.attribute.initColor.push(color[0][0],color[0][1],color[0][2],color[0][3]);
				this.attribute.endColor.push(color[1][0],color[1][1],color[1][2],color[1][3]);
				this.attribute.sizeAndOffset.push(size[0],size[1],offsetTime,lifetime);
			}
		}
	}
	
	//create the face buffer
	for(var i=0; i<num_particles;i=i+4){
		this.faces.push(0+i,1+i,2+i);
		this.faces.push(1+i,2+i,3+i);
	}
	this.facesGL=gl.createBuffer();
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.facesGL);
	gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new WebGLUnsignedShortArray(this.faces), gl.STATIC_DRAW);
	this.facesGL.num=this.faces.length;

	this.attribute.initPosGL=this.createBuffer(gl,this.attribute.initPos);
	this.attribute.initAccGL=this.createBuffer(gl,this.attribute.initAcc);
	this.attribute.endAccGL=this.createBuffer(gl,this.attribute.endAcc);
	this.attribute.initVelGL=this.createBuffer(gl,this.attribute.initVel);
	this.attribute.initColorGL=this.createBuffer(gl,this.attribute.initColor);
	this.attribute.endColorGL=this.createBuffer(gl,this.attribute.endColor);
	this.attribute.sizeAndOffsetGL=this.createBuffer(gl,this.attribute.sizeAndOffset);
}
GLGE.ParticleSystem.prototype.setLoop=function(value){
	this.loop=value;
}

GLGE.ParticleSystem.prototype.reset=function(){
	this.startTime=(new Date()).getTime();
}

//creates the shader programs
GLGE.ParticleSystem.prototype.generateProgram=function(gl){
	var vtxShader=[
	//attributes
	"attribute vec3 position;",
	"attribute vec3 initVel;",
	"attribute vec3 initAcc;",
	"attribute vec3 endAcc;",
	"attribute vec4 initColor;",
	"attribute vec4 endColor;",
	"attribute vec4 sizeTimeLife;",
	//uniforms
	"uniform float time;",
	"uniform bool loop;",
	"uniform mat4 mvMatrix;",
	"uniform mat4 pMatrix;",
	//varying
	"varying vec2 UV;",
	"varying vec4 color;",
	//main
	"void main(){",
	
	"UV = (position.xy+1.0)/2.0;",
	"if((time>sizeTimeLife[2] && (time-sizeTimeLife[2])<sizeTimeLife[3]) || loop){",
	"float localTime = mod((time - sizeTimeLife[2]), sizeTimeLife[3]);",
	"color = (endColor-initColor)/sizeTimeLife[3]*localTime+initColor;",
	"float size = (sizeTimeLife[1]-sizeTimeLife[0])/sizeTimeLife[3]*localTime+sizeTimeLife[0];",
	"vec3 pos = (endAcc-initAcc)*(localTime*log(localTime)-localTime)+0.5*initAcc*localTime*localTime+initVel*localTime;",
	"pos = (mvMatrix*vec4(pos,1.0)).xyz;",
	"vec3 positions = pos+(position*size);",
	"gl_Position = pMatrix*vec4(positions,1.0);",
	"}else{",
	"gl_Position = vec4(0.0,0.0,0.0,1.0);",
	"}",
	"}"
	].join("");
	frgShader=[
	//uniforms
	"uniform sampler2D texture;",
	//varying
	"varying vec2 UV;",
	"varying vec4 color;",
	//main
	"void main(){",
	"gl_FragColor=texture2D(texture,UV)*color;",
	"}"
	].join("");


	var vertexShader=gl.createShader(gl.VERTEX_SHADER);
	var fragmentShader=gl.createShader(gl.FRAGMENT_SHADER);

	gl.shaderSource(vertexShader, vtxShader);
	gl.compileShader(vertexShader);
	if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
	      alert(gl.getShaderInfoLog(vertexShader));
	      return;
	}

	gl.shaderSource(fragmentShader,frgShader);
	gl.compileShader(fragmentShader);
	if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
	      alert(gl.getShaderInfoLog(fragmentShader));
	      return;
	}

	if(this.program) gl.deleteProgram(this.Program);
	this.program = gl.createProgram();
	gl.attachShader(this.program, vertexShader);
	gl.attachShader(this.program, fragmentShader);
	gl.linkProgram(this.program);	
}
//creates the required webgl buffers
GLGE.ParticleSystem.prototype.createBuffer=function(gl,array){
	var buffer = gl.createBuffer();
	gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
	gl.bufferData(gl.ARRAY_BUFFER, new WebGLFloatArray(array), gl.STATIC_DRAW);
	return buffer;
}
//sets the uniformas
GLGE.ParticleSystem.prototype.setUniforms=function(gl){
	var program=this.program;
	if(!program.glarrays) program.glarrays={};
	var cameraMatrix=gl.scene.camera.getViewMatrix();
	
	var pos=this.getPosition();
	//var camerapos=gl.scene.camera.getPosition();
	var mvMatrix=GLGE.mulMat4(cameraMatrix,[
		1,0,0,pos.x,
		0,1,0,pos.y,
		0,0,1,pos.z,
		0,0,0,1]);

		
	var mvUniform = GLGE.getUniformLocation(gl,program, "mvMatrix");

	if(!program.glarrays.mvMatrix) program.glarrays.mvMatrix=new WebGLFloatArray(mvMatrix);
		else GLGE.mat4gl(mvMatrix,program.glarrays.mvMatrix);
	gl.uniformMatrix4fv(mvUniform, true, program.glarrays.mvMatrix);

	var pUniform = GLGE.getUniformLocation(gl,program, "pMatrix");
	if(!program.glarrays.pMatrix) program.glarrays.pMatrix=new WebGLFloatArray(gl.scene.camera.getProjectionMatrix());
			else GLGE.mat4gl(gl.scene.camera.getProjectionMatrix(),program.glarrays.pMatrix);	
	gl.uniformMatrix4fv(pUniform, true, program.glarrays.pMatrix);

	gl.uniform1f(GLGE.getUniformLocation(gl,program, "time"), ((new Date()).getTime()-this.startTime));
	gl.uniform1i(GLGE.getUniformLocation(gl,program, "loop"), this.loop);
	
	
	gl.activeTexture(gl.TEXTURE0);
	//create the texture if it's not already created
	if(!this.glTexture) this.glTexture=gl.createTexture();
	//if the image is loaded then set in the texture data
	if(this.texture.state==1){
		gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
		gl.texImage2D(gl.TEXTURE_2D, 0, this.texture.image,false,false);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
		gl.generateMipmap(gl.TEXTURE_2D);
		gl.bindTexture(gl.TEXTURE_2D, null);
		this.texture.state=2;
		program.texture=true;
	}
	gl.bindTexture(gl.TEXTURE_2D, this.glTexture);
	if(program.texture){
		gl.uniform1i(GLGE.getUniformLocation(gl,program, "texture"), 0);
	}

}
//sets the texture image
GLGE.ParticleSystem.prototype.setImage=function(url){
	var texture=this.texture;
	texture.image=new Image();
	texture.image.onload=function(e){
		texture.state=1;
	}
	texture.image.src=url;
}

//sets the attributes
GLGE.ParticleSystem.prototype.setAttributes=function(gl){
	for(var i=0; i<8; i++) gl.disableVertexAttribArray(i);
	
	var attrib=GLGE.getAttribLocation(gl,this.program, "position");
	if(attrib>-1){
		gl.bindBuffer(gl.ARRAY_BUFFER, this.attribute.initPosGL);
		gl.enableVertexAttribArray(attrib);
		gl.vertexAttribPointer(attrib, 3, gl.FLOAT, false, 0, 0);
	}

	var attrib=GLGE.getAttribLocation(gl,this.program, "initAcc");
	if(attrib>-1){
		gl.bindBuffer(gl.ARRAY_BUFFER, this.attribute.initAccGL);
		gl.enableVertexAttribArray(attrib);
		gl.vertexAttribPointer(attrib, 3, gl.FLOAT, false, 0, 0);
	}

	var attrib=GLGE.getAttribLocation(gl,this.program, "endAcc");
	if(attrib>-1){
		gl.bindBuffer(gl.ARRAY_BUFFER, this.attribute.endAccGL);
		gl.enableVertexAttribArray(attrib);
		gl.vertexAttribPointer(attrib, 3, gl.FLOAT, false, 0, 0);
	}

	var attrib=GLGE.getAttribLocation(gl,this.program, "initColor");
	if(attrib>-1){
		gl.bindBuffer(gl.ARRAY_BUFFER, this.attribute.initColorGL);
		gl.enableVertexAttribArray(attrib);
		gl.vertexAttribPointer(attrib, 4, gl.FLOAT, false, 0, 0);
	}

	var attrib=GLGE.getAttribLocation(gl,this.program, "endColor");
	if(attrib>-1){
		gl.bindBuffer(gl.ARRAY_BUFFER, this.attribute.endColorGL);
		gl.enableVertexAttribArray(attrib);
		gl.vertexAttribPointer(attrib, 4, gl.FLOAT, false, 0, 0);
	}

	var attrib=GLGE.getAttribLocation(gl,this.program, "sizeTimeLife");
	if(attrib>-1){
		gl.bindBuffer(gl.ARRAY_BUFFER, this.attribute.sizeAndOffsetGL);
		gl.enableVertexAttribArray(attrib);
		gl.vertexAttribPointer(attrib, 4, gl.FLOAT, false, 0, 0);
	}
	
	var attrib=GLGE.getAttribLocation(gl,this.program, "initVel");
	if(attrib>-1){
		gl.bindBuffer(gl.ARRAY_BUFFER, this.attribute.initVelGL);
		gl.enableVertexAttribArray(attrib);
		gl.vertexAttribPointer(attrib, 3, gl.FLOAT, false, 0, 0);
	}
	
}


//renders the paricle system
GLGE.ParticleSystem.prototype.GLRender=function(gl){
	if(!this.attribute) this.generateParticles(gl);
	if(!this.program) this.generateProgram(gl);
	
	gl.useProgram(this.program);
	this.setAttributes(gl);
	this.setUniforms(gl);
	gl.colorMask(0,0,0,0);
	gl.disable(gl.BLEND);
	gl.enable(gl.STENCIL_TEST);
	gl.stencilFunc(gl.ALWAYS, 1, 1);
	gl.stencilOp(gl.KEEP, gl.KEEP, gl.REPLACE);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.facesGL);
	gl.drawElements(gl.TRIANGLES,this.facesGL.num, gl.UNSIGNED_SHORT, 0);
	gl.stencilFunc(gl.EQUAL, 1, 1);
	gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
	gl.colorMask(1,1,1,1);
	gl.disable(gl.DEPTH_TEST);
	gl.enable(gl.BLEND);
	gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.facesGL);
	gl.drawElements(gl.TRIANGLES,this.facesGL.num, gl.UNSIGNED_SHORT, 0);
	gl.stencilOp(gl.REPLACE, gl.REPLACE, gl.REPLACE);
	gl.stencilFunc(gl.ALWAYS, 0, 0);
	gl.enable(gl.DEPTH_TEST);

}

GLGE.Scene.prototype.addParticleSystem=GLGE.Scene.prototype.addGroup;
GLGE.Group.prototype.addParticleSystem=GLGE.Group.prototype.addGroup;

})(GLGE);