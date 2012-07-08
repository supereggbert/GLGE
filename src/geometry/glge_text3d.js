/*
GLGE WebGL Graphics Engine
Copyright (c) 2011, Paul Brunt
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
 * @name glge_text3d.js
 * @author me@paulbrunt.co.uk
 */
 
(function(GLGE){

	
GLGE.fonts={};
	 
GLGE.registerFont=function(fontInfo){
	//glyphs
	GLGE.fonts[fontInfo.face["font-family"]+fontInfo.face["font-weight"]]=fontInfo;
};
	
GLGE.Text3d=function(uid){
	GLGE.Mesh.apply(this,arguments);
	this.loaded=true;
};
GLGE.augment(GLGE.Mesh,GLGE.Text3d);

GLGE.Text3d.prototype.font="";
GLGE.Text3d.prototype.weight="";
GLGE.Text3d.prototype.text="Hello World";
GLGE.Text3d.prototype.dirty=true;

GLGE.Text3d.prototype.setFont=function(font){
	this.font=font;
	this.dirty=true;
	return this;
};

GLGE.Text3d.prototype.setWeight=function(weight){
	this.weight=weight;
	this.dirty=true;
	return this;
};

GLGE.Text3d.prototype.setText=function(text){
	this.text=text;
	this.dirty=true;
	return this;
};

GLGE.Text3d.prototype.getFont=function(font){
	return this.fontt;
};

GLGE.Text3d.prototype.getWeight=function(weight){
	return this.weight;
};

GLGE.Text3d.prototype.getText=function(text){
	return this.text;
};

GLGE.Text3d.prototype.generateText=function(){
	this.offsetX=0;	
	this.idx=0;	
	
	var font=GLGE.fonts[this.font+this.weight];

	for(var i=0;i<this.text.length;i++){
		if(font.glyphs[this.text[i]].d){
			var letter=this.pathFromVML(font.glyphs[this.text[i]].d);
			if(i==0){
				var path=letter;
			}else{
				path=this.mergePaths(path,letter);
			}
		}
		
		this.offsetX+=font.glyphs[this.text[i]].w;
	}
	
	for(var i=0;i<path.length;i++){
		if(path[i][3]===undefined) path[i][3]=this.idx++;
	}
	
	var faces=this.earClip(path);
	
	var positions=[];
	for(var i=0;i<path.length;i++){
		positions.push(path[i][0],path[i][1],0);
	}
	
	this.setPositions(positions);
	this.setFaces(faces);
	this.dirty=false;
	
	return this;
};

GLGE.Text3d.prototype.pathFromVML=function(vml){
	var x , y;
	var reg = /([mrvxe])([^a-z]*)/g;
	var match;
	var points=[];
	var shapes=[];
	vml="m"+vml;
	for(var i = 0; match=reg.exec(vml); ++i) {
		var c = match[2].split(',');
		switch (match[1]) {
			case 'v':
				for(var i=0;i<=1;i+=0.1){
					var p=this.getBezier(1-i,x,y,x+(c[0]|0),y+(c[1]|0),x+(c[2]|0),y+(c[3]|0),x+(c[4]|0),y+(c[5]|0));
					p[2]=1; //smooth shade curve
					points.push(p);
				}
				x+=(c[4]|0);
				y+=(c[5]|0);
				break;
			case 'r':
				points.push([x,y,0]); //flat shade line
				points.push([x+=(c[0]|0),y+=(c[1]|0),0]);
				break;
			case 'm':
				if(i>0){
					shapes.push(points);
					points=[];
				}
				x=(c[0]|0)+this.offsetX;
				y=(c[1]|0);
				break;
		}
	}
	//points.push([points[0][0],points[0][1],points[0][2]]);
	
	for(var i=0;i<shapes.length;i++){
		points=this.mergePaths(points,shapes[i]);
	}
	
	return points;
};

GLGE.Text3d.prototype.earClip=function(path){
	var faces=[];
	var polyTemp=path.slice(0);
	var cnt=0; //prevent loop if we get stuck
	do{
		cnt++;
		for(var i=0;i<polyTemp.length;i++){
			var p0=polyTemp[i];
			var p1=polyTemp[(i+1)%polyTemp.length];
			var p2=polyTemp[(i+2)%polyTemp.length];
			var v1x=p2[1]-p0[1];
			var v1y=p0[0]-p2[0];
			var v2x=p1[0]-p0[0];
			var v2y=p1[1]-p0[1];
			if(v1x*v2x+v1y*v2y>=0 && !this.pointInsideTri(p0,p1,p2,path)){
				if(!this.lineIntersectLines(p2,p0,path)){
					faces.push(p0[3],p1[3],p2[3]);
					polyTemp.splice((i+1)%polyTemp.length,1);
				}
			}
		}
	}while(polyTemp.length>2 && cnt<100);
	
	return faces;
};

GLGE.Text3d.prototype.pointInsideTri=function(p0,p1,p2,poly){
	var dx1=p0[0]-p1[0];
	var dy1=p0[1]-p1[1];
	var dx2=p1[0]-p2[0];
	var dy2=p1[1]-p2[1];
	var dx3=p2[0]-p0[0];
	var dy3=p2[1]-p0[1];
	for(var i=0;i<poly.length;i++){
		var point=poly[i];
		if(point==p0 || point==p1 || point==p2) continue;
		if(-dy1*(point[0]-p0[0])+dx1*(point[1]-p0[1])<0 && 
		-dy2*(point[0]-p1[0])+dx2*(point[1]-p1[1])<0 && 
		-dy3*(point[0]-p2[0])+dx3*(point[1]-p2[1])<0){
			return true;
		}
	}
	return false;
};

GLGE.Text3d.prototype.lineIntersectLine=function(p0,p1,p2,p3){
	var dx1=p0[0]-p1[0];
	var dy1=p0[1]-p1[1];
	var dx2=p2[0]-p3[0];
	var dy2=p2[1]-p3[1];
	var d1=-dy1*(p2[0]-p0[0])+dx1*(p2[1]-p0[1]);
	var d2=-dy1*(p3[0]-p0[0])+dx1*(p3[1]-p0[1]);
	var d3=-dy2*(p0[0]-p2[0])+dx2*(p0[1]-p2[1]);
	var d4=-dy2*(p1[0]-p2[0])+dx2*(p1[1]-p2[1]);
	var t1=d1<=0 && d2<=0;
	var t2=d1>=0 && d2>=0;
	var t3=d3>=0 && d4>=0;
	var t4=d3<=0 && d4<=0;
	return !(t1||t2||t3||t4);
};

GLGE.Text3d.prototype.lineIntersectLines=function(p0,p1,poly){
	for(var i=0;i<poly.length;i++){
		var p2=poly[i];
		var p3=poly[(i+1)%poly.length];
		if(p2==p0 || p2==p1 || p3==p0 || p3==p1) continue;
		var intersect=this.lineIntersectLine(p0,p1,p2,p3);
		if(intersect){
			return true;
		}
	}
	return false;
};

GLGE.Text3d.prototype.getBezier=function(t,c1x,c1y,c2x,c2y,c3x,c3y,c4x,c4y){
	var tt=t*t;
	var st=1-t;
	var stst=st*st;
	var t1=tt*t;
	var t2=3*tt*st;
	var t3=3*t*stst;
	var t4=st*stst;
	return [c1x*t1+c2x*t2+c3x*t3+c4x*t4,c1y*t1+c2y*t2+c3y*t3+c4y*t4];
};

GLGE.Text3d.prototype.mergePaths=function(path1,path2){
	var points0=path1;
	var points1=path2;
	var P;
	for(var i=0;i<points0.length;i++){
		for(var j=0;j<points1.length;j++){
			if( !this.lineIntersectLines(points0[i],points1[j],points0) && !this.lineIntersectLines(points0[i],points1[j],points1)){
				P=[i,j];
			}
			if(P) break;
		}
		if(P) break;
	}

	var points=[];
	for(var i=0;i<points0.length;i++){
		var s1=points0[i];
		points.push(s1);
		if(i==P[0]){
			var s2=points1[P[1]];
			points.push(s2);
			for(var j=P[1]+1; j<points1.length+P[1];j++){
				var k=j%points1.length;
				points.push(points1[k]);
			}
			points.push(s2.slice(0));
			points.push(s1.slice(0));	
		}		
	}
	return points;
};
	
/**
* @private
*/
GLGE.Text3d.prototype.GLAttributes=function(){
	if(this.dirty) this.generateText();
	GLGE.Mesh.prototype.GLAttributes.apply(this,arguments);
};

})(GLGE);
