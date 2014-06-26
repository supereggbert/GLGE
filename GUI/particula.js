ParticleGUI = function()
{
	this.this.div;
	this.obj;
	this.particle;
}

ParticleGUI.add = function()
{
	var box = new GLGE.PhysicsBox();
	part = new GLGE.ParticleSystem();
	part.setImage("images/boom.png");
	part.setLoc(0,0,0);
	
	box.addChild(part);
	world.addPhysicsBox(box);


	this.obj = box;
	this.particle = part;
	
	this.createControlls(); // set this.div

	fillMenu(this.div);
}
ParticleGUI.Controlls = function(nome,valor,tipo,func)
{
	var con = document.createElement('input');
	var p = document.createElement('p');
	var text = document.createTextNode(nome);
	if(!valor)
		valor = 0;
	p.appendChild(text);
	con.setAttribute('id',nome);
	if(!tipo)
		con.setAttribute('type','range');
	else
		con.setAttribute('type',tipo);
	if(!tipo)
	{
		if(nome.substr(3) == "LifeTime"){
			con.setAttribute('min',0);
			con.setAttribute('max',100);
		}else
			if(nome == "NumParticles"){
				con.setAttribute('min',0);
				con.setAttribute('max',200);
			}else
				if(nome == "StartSize" || nome == "EndSize"){
					con.setAttribute('min',0);
					con.setAttribute('max',30);
				}else{
					con.setAttribute('min',-20);
					con.setAttribute('max',20);
				}
					
		
		con.setAttribute('step',1);
		con.setAttribute('value',valor);
		con.setAttribute('class','fundo');
	}else{
		con.setAttribute('class','fundoT');
	}
	con.onchange = func;
	p.appendChild(con);
	return p;
}
ParticleGUI.createControlls = function()
{
	var valor = 0;
	this.div = document.getElementById('controles');

	var particle = this.particle;

	this.div.appendChild(this.Controlls("Image",valor,'text',
		function()
			{
				var req = new XMLHttpRequest();
				var url = window.location+this.value;
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
					req.send("");				//	alert(window.location+document.getElementById("Image").value);
					
					particle.setImage(this.value);
				}
				
			}
		));
	this.div.appendChild(this.Controlls("MinLifeTime",valor,null,
		function()
			{
				particle.setMinLifeTime(this.value*100);
			}
		));
	this.div.appendChild(this.Controlls("MaxLifeTime",valor,null,
		function()
			{
				particle.setMaxLifeTime(this.value*100);
			}
		));
	
	this.div.appendChild(this.Controlls("StartAccX",valor,null,
		function()
			{
				particle.setStartAccX(this.value*0.0000001);
			}
		));
	this.div.appendChild(this.Controlls("StartAccY",valor,null,
		function()
			{
				particle.setStartAccY(this.value*0.0000001);
			}
		));
	this.div.appendChild(this.Controlls("StartAccZ",valor,null,
		function()
			{
				particle.setStartAccZ(this.value*0.0000001);
			}
		));
	
	this.div.appendChild(this.Controlls("EndAccX",valor,null,
		function()
			{
				particle.setEndAccX(this.value*0.00001);
			}
		));
	this.div.appendChild(this.Controlls("EndAccY",valor,null,
		function()
			{
				particle.setEndAccY(this.value*0.00001);
			}
		));
	this.div.appendChild(this.Controlls("EndAccZ",valor,null,
		function()
			{
				particle.setEndAccZ(this.value*0.00001);
			}
		));
	
	this.div.appendChild(this.Controlls("MinVelX",valor,null,
		function()
			{
				particle.setMinVelX(this.value*0.00001);
			}
		));
	this.div.appendChild(this.Controlls("MinVelY",valor,null,
		function()
			{
				particle.setMinVelY(this.value*0.00001);
			}
		));
	this.div.appendChild(this.Controlls("MinVelZ",valor,null,
		function()
			{
				particle.setMinVelZ(this.value*0.00001);
			}
		));
	
	this.div.appendChild(this.Controlls("MaxVelX",valor,null,
		function()
			{
				particle.setMaxVelX(this.value*0.00001);
			}
		));
	this.div.appendChild(this.Controlls("MaxVelY",valor,null,
		function()
			{
				particle.setMaxVelY(this.value*0.00001);
			}
		));
	this.div.appendChild(this.Controlls("MaxVelZ",valor,null,
		function()
			{
				particle.setMaxVelZ(this.value*0.00001);
			}
		));
	
	this.div.appendChild(this.Controlls("StartSize",valor,null,
		function()
			{
				particle.setStartSize(this.value*0.1);
			}
		));
	this.div.appendChild(this.Controlls("EndSize",valor,null,
		function()
			{
				particle.setEndSize(this.value*0.1);
			}
		));
	
	this.div.appendChild(this.Controlls("NumParticles",valor,null,
		function()
			{
				particle.setNumParticles(this.value);
			}
		));
	
	this.div.appendChild(this.Controlls("StartColor",valor,'text',
		function()
			{
				particle.setStartColor(this.value);
			}
		));
	this.div.appendChild(this.Controlls("EndColor",valor,'text',
		function()
			{
				particle.setEndColor(this.value);
			}
		));
	
	//this.div.appendChild(con);
	
}
ParticleGUI.GeraCodigo = function()
{
	var cod;
	var div = document.createElement('div');
	var p = document.createElement('p');				
	var colorS = document.getElementById("StartColor").value;
	var colorE = document.getElementById("EndColor").value;
	if(!colorS)
		colorS = "#000";
	if(!colorE)
		colorE = "#000";
	div.setAttribute('class','codigo');
	cod = "<particle_system"
	+" min_life_time='"		+this.minLifeTime
	+"' max_life_time='"		+this.maxLifeTime
	+"' start_acc_x='"		+this.startMaxAcceleration.x
	+"' start_acc_y='"		+this.startMaxAcceleration.y
	+"' start_acc_z='"		+this.startMaxAcceleration.z
	+"' end_acc_x='"			+this.endMaxAcceleration.x
	+"' end_acc_y='"			+this.endMaxAcceleration.y
	+"' end_acc_z='"			+this.endMaxAcceleration.z
	+"' start_size='"			+this.startSize
	+"' end_size='"			+this.endSize
	+"' num_thisicles='"		+this.numParticles
	+"' start_color='"			+colorS
	+"' end_color='"			+colorE
	+"' min_vel_x='"			+this.startMinVelocity.x
	+"' min_vel_y='"			+this.startMinVelocity.y
	+"' min_vel_z='"			+this.startMinVelocity.z
	+"' max_vel_x='"			+this.startMaxVelocity.x
	+"' max_vel_y='"			+this.startMaxVelocity.y
	+"' max_vel_z='"			+this.startMaxVelocity.z
	+"' image='"				+this.texture.image.src +"'" 
	+"/>"; 
	var text = document.createTextNode(cod);
	p.appendChild(text);
	div.appendChild(p);
	document.body.appendChild(div);
}