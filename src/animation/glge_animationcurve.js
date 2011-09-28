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
 * @name glge_animationcurve.js
 * @author me@paulbrunt.co.uk
 */


(function(GLGE){





/**
* @class A curve which interpolates between control points
* @augments GLGE.QuickNotation
* @augments GLGE.JSONLoader
*/
GLGE.AnimationCurve=function(uid){
	this.keyFrames=[];
	this.solutions={};
	this.caches={};
	GLGE.Assets.registerAsset(this,uid);
};
GLGE.augment(GLGE.QuickNotation,GLGE.AnimationCurve);
GLGE.augment(GLGE.JSONLoader,GLGE.AnimationCurve);
GLGE.AnimationCurve.prototype.className="AnimationCurve";
GLGE.AnimationCurve.prototype.keyFrames=null;
/**
* Adds a point to the curve
* @param {object} point The point to add
* @returns {Number} Index of the newly added point
*/
GLGE.AnimationCurve.prototype.addPoint=function(point){
	this.keyFrames.push(point);
	return this.keyFrames.length-1;
};
GLGE.AnimationCurve.prototype.addStepPoint=GLGE.AnimationCurve.prototype.addPoint;
GLGE.AnimationCurve.prototype.addLinearPoint=GLGE.AnimationCurve.prototype.addPoint;
GLGE.AnimationCurve.prototype.addBezTriple=GLGE.AnimationCurve.prototype.addPoint;
/**
* Get the value of the curve at any point
* @param {Number} frame The frame(x-coord) to return the value for
* @returns {Number} The value of the curve at the given point
*/
GLGE.AnimationCurve.prototype.coord=function(x,y){
	return {x:x,y:y}
}
/**
* Sets the animation channel this curve animates
* @param {string} channel The property to animate
*/
GLGE.AnimationCurve.prototype.setChannel=function(channel){
	this.channel=channel
}
GLGE.AnimationCurve.prototype.getValue=function(frame){
	if(this.keyFrames.length==0) return 0;
	
	if(this.caches[frame]) return this.caches[frame];
	var startKey;
	var endKey;
	var preStartKey;
	var preEndKey;
	if(frame<this.keyFrames[0].x) return this.keyFrames[0].y;
	for(var i=0; i<this.keyFrames.length;i++){
		if(this.keyFrames[i].x==frame){
			return this.keyFrames[i].y;
		}
		if(this.keyFrames[i].x<=frame && (startKey==undefined || this.keyFrames[i].x>this.keyFrames[startKey].x)){
			preStartKey=startKey;
			startKey=i;
		}else if(this.keyFrames[i].x<=frame && (preStartKey==undefined || this.keyFrames[i].x>this.keyFrames[preStartKey].x)){
			preStartKey=i;
		}
		if(this.keyFrames[i].x>frame && (endKey==undefined || this.keyFrames[i].x<=this.keyFrames[endKey].x)){
			preEndKey=endKey;
			endKey=i;
		}else if(this.keyFrames[i].x>frame && (preEndKey==undefined || this.keyFrames[i].x<=this.keyFrames[preEndKey].x)){
			preEndKey=i;
		}
	}
	if(startKey==undefined){
		startKey=endKey;
		endKey=preEndKey;
	}
	if(endKey==undefined){
		endKey=startKey;
		startKey=preStartKey;
	}
	if(this.keyFrames[startKey] instanceof GLGE.BezTriple && this.keyFrames[endKey] instanceof GLGE.BezTriple){
		var C1=this.coord(this.keyFrames[startKey].x,this.keyFrames[startKey].y);
		var C2=this.coord(this.keyFrames[startKey].x3,this.keyFrames[startKey].y3);
		var C3=this.coord(this.keyFrames[endKey].x1,this.keyFrames[endKey].y1);
		var C4=this.coord(this.keyFrames[endKey].x,this.keyFrames[endKey].y);
		return this.atX(frame,C1,C2,C3,C4).y;
	}
	if(this.keyFrames[startKey] instanceof GLGE.LinearPoint && this.keyFrames[endKey] instanceof GLGE.BezTriple){
		var C1=this.coord(this.keyFrames[startKey].x,this.keyFrames[startKey].y);
		var C2=this.coord(this.keyFrames[endKey].x1,this.keyFrames[endKey].y1);
		var C3=this.coord(this.keyFrames[endKey].x1,this.keyFrames[endKey].y1);
		var C4=this.coord(this.keyFrames[endKey].x,this.keyFrames[endKey].y);
		return this.atX(frame,C1,C2,C3,C4).y;
	}
	if(this.keyFrames[startKey] instanceof GLGE.BezTriple && this.keyFrames[endKey] instanceof GLGE.LinearPoint){
		var C1=this.coord(this.keyFrames[startKey].x,this.keyFrames[startKey].y);
		var C2=this.coord(this.keyFrames[startKey].x3,this.keyFrames[startKey].y3);
		var C3=this.coord(this.keyFrames[startKey].x3,this.keyFrames[startKey].y3);
		var C4=this.coord(this.keyFrames[endKey].x,this.keyFrames[endKey].y);
		return this.atX(frame,C1,C2,C3,C4).y;
	}
	if(this.keyFrames[startKey] instanceof GLGE.LinearPoint && this.keyFrames[endKey] instanceof GLGE.LinearPoint){
		var value=(frame-this.keyFrames[startKey].x)*(this.keyFrames[endKey].y-this.keyFrames[startKey].y)/(this.keyFrames[endKey].x-this.keyFrames[startKey].x)+this.keyFrames[startKey].y;
		return value;
	}
	if(this.keyFrames[startKey] instanceof GLGE.StepPoint){
		return this.keyFrames[startKey].y
	}
	if(!this.keyFrames.preStartKey) this.keyFrames.preStartKey=this.keyFrames[0].y;
	
	this.caches[frame]=this.keyFrames.preStartKey;
	
	return this.caches[frame];
};
/**
* Function used to calculate bezier curve
* @private
*/
GLGE.AnimationCurve.prototype.B1=function(t) { return t*t*t };
/**
* Function used to calculate bezier curve
* @private
*/
GLGE.AnimationCurve.prototype.B2=function(t) { return 3*t*t*(1-t) };
/**
* Function used to calculate bezier curve
* @private
*/
GLGE.AnimationCurve.prototype.B3=function(t) { return 3*t*(1-t)*(1-t) };
/**
* Function used to calculate bezier curve
* @private
*/
GLGE.AnimationCurve.prototype.B4=function(t) { return (1-t)*(1-t)*(1-t) };
/**
* Gets the value of a bezier curve at a given point
* @private
*/
GLGE.AnimationCurve.prototype.getBezier=function(t,C1,C2,C3,C4) {
	var pos = {};
	pos.x = C1.x*this.B1(t) + C2.x*this.B2(t) + C3.x*this.B3(t) + C4.x*this.B4(t);
	pos.y = C1.y*this.B1(t) + C2.y*this.B2(t) + C3.y*this.B3(t) + C4.y*this.B4(t);
	return pos;
};
/**
* Solves cubic equation to get the parametic value of the curve at a specified point
* @private
*/
GLGE.AnimationCurve.prototype.Quad3Solve=function(a,b,c,d){
	ref=a+"-"+b+"-"+"-"+c+"-"+d;
	if(this.solutions[ref]){
		return this.solutions[ref];
	}
	else
	{
		b /= a;c /= a;d /= a;
		var q, r, d1, s, t, t1, r13;
		q = (3.0*c - (b*b))/9.0;
		r = -(27.0*d) + b*(9.0*c - 2.0*(b*b));
		r /= 54.0;
		t1 = (b/3.0);
		discrim = q*q*q + r*r;
		result=[];
				
		if (discrim > 0) { 
		// one real, two complex
		 s = r + Math.sqrt(discrim);
		 s = ((s < 0) ? -Math.pow(-s, (1.0/3.0)) : Math.pow(s, (1.0/3.0)));
		 t = r - Math.sqrt(discrim);
		 t = ((t < 0) ? -Math.pow(-t, (1.0/3.0)) : Math.pow(t, (1.0/3.0)));
		 result[0] = -t1 + s + t;
		 t1 = t1 + (s + t)/2.0;
		 result[1] = result[2] = -t1;
		 t1 = Math.sqrt(3.0)*(-t + s)/2;
		} 
		else if (discrim == 0){ 
		// All roots real
		 r13 = ((r < 0) ? -Math.pow(-r,(1.0/3.0)) : Math.pow(r,(1.0/3.0)));
		 result[1] = -t1 + 2.0*r13;
		 result[1] = result[2]  = -(r13 + t1);
		} 
		else
		{
			q = -q;
			d1 = q*q*q;
			d1 = Math.acos(r/Math.sqrt(1));
			r13 = 2.0*Math.sqrt(q);


			result[0] = -t1 + r13*Math.cos(d1/3.0);
			result[1] = -t1 + r13*Math.cos((d1 + 2.0*Math.PI)/3.0);
			result[2] = -t1 + r13*Math.cos((d1 + 4.0*Math.PI)/3.0);
		}
		var toreturn=false;
		//determine which is the correct result
		if(result[0]>=0 && result[0]<=1) toreturn=result[0];
		if(!toreturn && result[1]>=0 && result[1]<=1) toreturn=result[1];
		if(!toreturn && result[2]>=0 && result[2]<=1) toreturn=result[2];
		//cache result for next time
		this.solutions[ref]=toreturn;
		
		return toreturn;
	}
};
/**
* Get the value of the a single bezier curve 
* @param {Number} x xcoord of point to get
* @param {Number} C1 First bezier control point
* @param {Number} C2 Second bezier control point
* @param {Number} C3 Third bezier control point
* @param {Number} C4 Forth bezier control point
* @returns {Number} The value of the curve at the given x
*/
GLGE.AnimationCurve.prototype.atX=function(x,C1,C2,C3,C4){
	a=C1.x-C2.x*3+C3.x*3-C4.x;
	b=C2.x*3-C3.x*6+C4.x*3;
	c=C3.x*3-C4.x*3;
	d=C4.x-x;
	return this.getBezier(this.Quad3Solve(a,b,c,d),C1,C2,C3,C4);
};

})(GLGE);
