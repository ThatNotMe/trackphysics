async function importMesh(path, name, scene, shadowGenerator){
    return new Promise((res, rej)=>{
        let damesh;
        BABYLON.SceneLoader.ImportMesh("", path, name, scene, function (meshes, particleSystems, skeletons){
            try{
                bones = skeletons[0].bones;
                skeleton = skeletons[0];
                meshes.forEach((mesh)=>{
                    shadowGenerator.addShadowCaster(mesh);
                    if(mesh.name=="hitbox") mesh.visibility = false;
                    if(mesh.name == "main body"){
                        damesh = mesh;
                        damesh.rotate(BABYLON.Axis.Y, Math.PI/4);
                    }
                    if(mesh.name == "turret" || mesh.name == "main body"){
                        mesh.material = new BABYLON.StandardMaterial("tank_material");
                        mesh.material.diffuseColor = new BABYLON.Color3(152/255.0, 204/255.0, 119/255.0);
                        if( mesh.name == "turret")	turretMesh = mesh; 
                    }
                    if(mesh.name=="susl"){
                        susl = mesh;
                    }else if(mesh.name=="susr"){
                        susr = mesh;
                    }
                    //this is the left and right chains
                    if(mesh.name == "tracksL" || mesh.name == "tracksR"){
                        //we assign them chain material
                        mesh.material = new BABYLON.StandardMaterial("chain_material");
                        mesh.material.diffuseTexture =  new BABYLON.Texture("./textures/mat_texture.png", scene);
                        mesh.material.diffuseTexture.vScale = 2.3
                        mesh.position.y = 0.27;
                        mesh.position.z = 0.025;
                        mesh.material.diffuseTexture.uScale = 5
                        mesh.alwaysSelectAsActiveMesh = true; 
                        chainMeshes.push( mesh );
                    }
                    //the meshes wl and wr are our tank wheels, we assign them black material
                    if(mesh.name.startsWith("wl") || mesh.name.startsWith("wr")){
                        mesh.material = new BABYLON.StandardMaterial("wheel_material");
                        mesh.material.diffuseColor = new BABYLON.Color3(70/255.0, 70/255.0, 70/255.0);
                        mesh.material.alphaMode = 0;
                        mesh.material.needAlphaBlending = () => false;
                        //the other wheels are instances so we assign each instance to its appropriate array  
                        if(mesh.instances != undefined){
                            mesh.instances.forEach((inst) => {
                                shadowGenerator.addShadowCaster(inst);
                                const index = parseInt(inst.name[2]); 
                                //based on the name we but the instance in its appropriate array
                                if(inst.name.startsWith("wl") && inst.name.length == 3) wheelMeshesLeft[index-1] = inst; 
                                else wheelMeshesRight[index-1] = inst;
                            });
                        }
                        //if the wheel mesh is stored as a mesh, we store it into its appropriate array
                        if(mesh.name.startsWith("wl") && mesh.name.length == 3){
                            const index = parseInt(mesh.name[2]);
                            wheelMeshesLeft[index-1] = mesh;
                        }
                        if(mesh.name.startsWith("wr") && mesh.name.length == 3){
                            const index = parseInt(mesh.name[2]);
                            wheelMeshesRight[index-1] = mesh;
                        }
                    }				
                });
                //create tank tracks using trailmesh
                /*var trailLeft = new BABYLON.TrailMesh('left track', wheelMeshesLeft[5], scene, .5, 60, true);
                var trailRight = new BABYLON.TrailMesh('right track', wheelMeshesRight[5], scene, .5, 60, true);
                var sourceMat = new BABYLON.StandardMaterial('sourceMat', scene);
                sourceMat.emissiveColor = sourceMat.diffuseColor = new BABYLON.Color3(0.01, 0.01, 0.01);
                sourceMat.specularColor = new BABYLON.Color3.Black();

                trailLeft.position.y = -wheelRadius;
                trailRight.position.y = -wheelRadius;

                trailLeft.material = sourceMat;
                trailRight.material = sourceMat;*/
                if(!damesh) rej("no mesh")
                else res(damesh);
            }catch(e){console.error(e)}
        });
    });
}