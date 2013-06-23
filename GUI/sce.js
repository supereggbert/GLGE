var SCEobjs = [];
var SCElistiner;
var SCEfuncao;

function SCEPoint()
{
	this.x		=	0;
	this.y		=	0;
	this.z		=	0;
}
function SCEBox(width,height,depth,obj,id)
{
	this.width	=	width;
	this.height	=	height;
	this.depth	=	depth;
	this.x		=	0;
	this.y		=	0;
	this.z		=	0;
	this.id 	=	id;
	this.obj	=	obj;
	SCEobjs.push(this);
}
SCEBox.prototype.update = function()
{
	this.x 		=	this.obj.getLocX();
	this.y 		=	this.obj.getLocY();
	this.z		=	this.obj.getLocZ();
}
SCEBox.prototype.collision = function()
{
	var obj;
	this.update();
	for(var i in SCEobjs)
	{
		obj = SCEobjs[i];
		if(obj == this)
			continue;
		
		if(this.x > (obj.x+obj.width))
			return false;
		if(this.y > (obj.y+obj.height))
			return false;
		if(this.z > (obj.z+obj.depth))
			return false;
		if((this.x+this.width) < obj.x)
			return false;
		if((this.y+this.height) < obj.y)
			return false;
		if((this.z+this.depth) < obj.z)
			return false;
	}
	return true;
}
function SCEUpdateAll()
{
	for(var i in SCEobjs)
		SCEobjs[i].update();

}

