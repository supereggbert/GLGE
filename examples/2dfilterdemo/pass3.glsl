#version 100

precision highp float;

uniform sampler2D GLGE_DEPTH;
uniform sampler2D GLGE_PASS3;
uniform sampler2D GLGE_PASS2;

varying vec2 texCoord;

float blurSize=0.0015;

float getDepth(sampler2D texture,vec2 texCoord){
	return dot(texture2D(texture,texCoord), vec4(0.000000059604644775390625,0.0000152587890625,0.00390625,1.0))*10000.0;
}

void main(void){
	vec4 color=vec4(0.0,0.0,0.0,0.0);
	color += texture2D(GLGE_PASS3, vec2(texCoord.x, texCoord.y - 4.0*blurSize)) * 0.05;
	color += texture2D(GLGE_PASS3, vec2(texCoord.x, texCoord.y - 3.0*blurSize)) * 0.09;
	color += texture2D(GLGE_PASS3, vec2(texCoord.x, texCoord.y - 2.0*blurSize)) * 0.12;
	color += texture2D(GLGE_PASS3, vec2(texCoord.x, texCoord.y - blurSize)) * 0.15;
	color += texture2D(GLGE_PASS3, vec2(texCoord.x, texCoord.y)) * 0.16;
	color += texture2D(GLGE_PASS3, vec2(texCoord.x, texCoord.y + blurSize)) * 0.15;
	color += texture2D(GLGE_PASS3, vec2(texCoord.x, texCoord.y + 2.0*blurSize)) * 0.12;
	color += texture2D(GLGE_PASS3, vec2(texCoord.x, texCoord.y + 3.0*blurSize)) * 0.09;
	color += texture2D(GLGE_PASS3, vec2(texCoord.x, texCoord.y + 4.0*blurSize)) * 0.05;
	float blur=getDepth(GLGE_DEPTH,texCoord)-getDepth(GLGE_DEPTH,vec2(0.5,0.35));
	blur=clamp(pow(blur/5.0,2.0),0.0,1.0);
	color = texture2D(GLGE_PASS2, texCoord)*(1.0-blur)+color*blur;
	gl_FragColor = vec4(color.rgb,1.0);
}
	
