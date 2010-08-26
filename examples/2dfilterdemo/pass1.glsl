#version 100

precision highp float;

uniform sampler2D GLGE_RENDER;
uniform sampler2D GLGE_PASS1;
uniform sampler2D TEXTURE0;
uniform vec3 lightpos;
uniform mat4 invProjView;

varying vec2 texCoord;

vec3 result=vec3(0.0,0.0,0.0);
vec3 suncolor=vec3(0.9,0.9,0.63);

void main(void){
	vec2 lightvec=texCoord-lightpos.xy;
	float lightdist=length(lightvec*vec2(1.0,0.444));
	vec3 suncolor=(1.0-pow(lightdist,0.1))*suncolor;
	if(lightdist<0.02) suncolor=suncolor*pow((0.02-lightdist)/0.02+1.0,2.0);
	if(lightpos.z-1.0<0.0) suncolor=vec3(0.0);
	float intensity=texture2D(GLGE_PASS1,texCoord).r;
	vec4 skycoord=invProjView*vec4(vec3((texCoord-0.5)*2.0,0.0),1.0);
	skycoord=invProjView*vec4(vec3((texCoord-0.5)*2.0,1.0),1.0);
	skycoord.xyz=normalize(skycoord.xyz/skycoord.w);
	result=max(suncolor,0.0)/0.4+texture2D(TEXTURE0,(skycoord.xy/(1.4+skycoord.z)+1.0)/2.0).rgb*intensity+texture2D(GLGE_RENDER,texCoord).rgb*(1.0-intensity);
	vec3 col=texture2D(GLGE_RENDER,texCoord).rgb+vec3(0.1,0.1,0.1);
	if(intensity<1.0) result=suncolor*dot(normalize(lightpos),vec3(0.0,0.0,1.0))*intensity*7.0+vec3(pow(col.r,2.5),pow(col.g,2.5),pow(col.b,2.5));	
	gl_FragColor = vec4(result,1.0);	
}	
