import Blender as B

ArmatureName="Armature"

output=""

#export the skeleton
arms=B.Armature.Get(ArmatureName)
output=output+"<skeleton id=\""+ArmatureName+"\">\n"
bones=arms.bones.values()
for bone in bones:
	if bone.hasParent():
		output=output+"<bone channel=\""+bone.name+"\""+" x=\"%f\" y=\"%f\" z=\"%f\" " % (bone.head["ARMATURESPACE"].x,bone.head["ARMATURESPACE"].y,bone.head["ARMATURESPACE"].z)+" parent=\""+ bone.parent.name +"\" />\n"
	else:
		output=output+"<bone channel=\""+bone.name+"\""+" x=\"%f\" y=\"%f\" z=\"%f\" " % (bone.head["ARMATURESPACE"].x,bone.head["ARMATURESPACE"].y,bone.head["ARMATURESPACE"].z)+" />\n"

output=output+"</skeleton>\n"
print output

actions=B.Armature.NLA.GetActions()


#export the actions

#first export the animations
for action in actions:
	name=actions[action].getName()
	ipos=actions[action].getAllChannelIpos()
	for ipo in ipos:
		output=output+"<animation_vector id=\""+action+"_"+ipo+"\">\n"
		for curve in ipos[ipo].curves:
			curvename=curve.getName();
			newname=""
			#not sure why but the Y and Z are interchanged between the engine and blender!
			if curvename=="LocZ":
				newname="LocY"
			if curvename=="LocY":
				newname="LocZ"
			if curvename=="ScaleZ":
				newname="ScaleY"
			if curvename=="ScaleY":
				newname="ScaleZ"
			if curvename=="QuatZ":
				newname="QuatY"
			if curvename=="QuatY":
				newname="QuatZ"
			if newname!="":
				curvename=newname
			output=output+"<animation_curve channel=\""+curvename+"\">\n"
			for point in curve.bezierPoints:
				output=output+"<bez_point>%f,%f,%f,%f,%f,%f</bez_point>\n" %(point.vec[0][0],point.vec[0][1],point.vec[1][0],point.vec[1][1],point.vec[2][0],point.vec[2][1]);
			output=output+"</animation_curve>\n"

		output=output+"</animation_vector>\n"

for action in actions:
	name=actions[action].getName()
	output=output+"<skeletal_action id=\""+action+"\">\n"
	ipos=actions[action].getAllChannelIpos()
	for ipo in ipos:
		output=output+"<animation channel=\""+ipo+"\" vector=\"#"+action+"_"+ipo+"\" />\n"
	output=output+"</skeletal_action>\n"

print output
out = open("/media/disk/Blender Projects/export.txt", 'w')
out.write(output)
out.close()