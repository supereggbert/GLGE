BoxGUI = function(){
	this.div;
	this.obj;
}

BoxGUI.add = function()
{
	var box = new GLGE.Object();
	box.setMesh(doc.getElement("cubo"));
	box.setMaterial(doc.getElement("mcubo"));
	var physic = new GLGE.PhysicsMesh();
	physic.addChild(box);
	world.addChild(physic);

	var div = document.createElement('div');
	div.appendChild(this.Controlls("X",0,
			function()
			{
				physic.setLocX(this.value);
			}
	));
	div.appendChild(this.Controlls("Y",0,
			function()
			{
				physic.setLocY(this.value);
			}
		));
	div.appendChild(this.Controlls("Z",0,
		function()
			{
				physic.setLocZ(this.value);
			}
		));
	
	div.appendChild(this.Controlls("ScaleX",1,
		function()
			{
				physic.setScaleX(this.value);
			}
		));
	
	div.appendChild(this.Controlls("ScaleY",1,
		function()
			{
				physic.setScaleY(this.value);
			}
		));
	
	div.appendChild(this.Controlls("ScaleZ",1,
		function()
			{
				physic.setScaleZ(this.value);
			}
		));
	

	this.div = div;
	this.obj = physic; 
	GUIIndexGUI.push(this);

	fillMenu(this.div);

}
BoxGUI.Controlls =function(name,value,func)
{
	
	var con = document.createElement('input');
	var p = document.createElement('p');
	var text = document.createTextNode(name);
	p.appendChild(text);
	con.setAttribute('id',name);
	con.setAttribute('type','textfield');
	con.setAttribute('value',value);
	con.setAttribute('class','fundoT');
	
	con.onchange = func;
	p.appendChild(con);
	return p;
}
