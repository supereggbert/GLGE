import Blender as B

mesh = B.Object.Get("Cube").getData()

groups=mesh.getVertGroupNames()

weights={}
we={}
for group in groups:
    verts = mesh.getVertsFromGroup(group,1);
    weight=[]
    for i in range(len(mesh.verts)):
        weight.append(0.0)
        
    for v in verts:
        weight[v[0]]=v[1]
        
    weights[group]=weight
    we[group]=""
    

Faces = mesh.faces
co=""
no=""
fc=""
uv="";
output=""
cnt=0



for face in Faces:
    co=co + "%f,%f,%f," % (face.v[0].co[0],face.v[0].co[1],face.v[0].co[2])
    co=co + "%f,%f,%f," % (face.v[1].co[0],face.v[1].co[1],face.v[1].co[2])
    co=co + "%f,%f,%f," % (face.v[2].co[0],face.v[2].co[1],face.v[2].co[2])
    no=no + "%f,%f,%f," % (face.v[0].no[0],face.v[0].no[1],face.v[0].no[2])
    no=no + "%f,%f,%f," % (face.v[1].no[0],face.v[1].no[1],face.v[1].no[2])
    no=no + "%f,%f,%f," % (face.v[2].no[0],face.v[2].no[1],face.v[2].no[2])
    uv=uv + "%f,%f," % (face.uv[0][0],face.uv[0][1])
    uv=uv + "%f,%f," % (face.uv[1][0],face.uv[1][1])
    uv=uv + "%f,%f," % (face.uv[2][0],face.uv[2][1])
    #weights
    for weight in weights:
        we[weight]=we[weight]+"%f,%f,%f," % (weights[weight][face.v[0].index],weights[weight][face.v[1].index],weights[weight][face.v[2].index])
        
           
    fc=fc + "%i,%i,%i," % (cnt,cnt+1,cnt+2)
    cnt=cnt+3;

output=output+'<mesh id="cube">\n'
output=output+'<positions>'+co[:len(co)-1]+'</positions>\n'
output=output+'<normals>'+no[:len(no)-1]+'</normals>\n'
output=output+'<uv1>'+uv[:len(uv)-1]+'</uv1>\n'
output=output+'<faces>'+fc[:len(fc)-1]+'</faces>\n'

for weight in weights:
    output=output+'<weights channel="'+weight+'">'
    output=output+we[weight][:len(we[weight])-1]
    output=output+'</weights>\n'
output=output+'</mesh>\n'
print output
out = open("/media/disk/Blender Projects/export.txt", 'w')
out.write(output)
out.close()