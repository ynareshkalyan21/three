$(document).ready(function () {
   $(".texture-change").on("click", function(){
       var image = $(this).attr("src");
       var cfMaterial = window.CFMaterial;
       var cfEditor = window.cfEditor;
       var imgTexture = new THREE.ImageUtils.loadTexture(image);
        imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;
         imgTexture.repeat.set(1,1);
        imgTexture.anisotropy = 20;
        imgTexture.minFilter = THREE.NearestFilter;
         imgTexture.mapping = THREE.UVMapping;
        imgTexture.magFilter = THREE.NearestFilter;
        imgTexture.side = THREE.DoubleSide;
       //var bMeshItems = cfEditor.getObjectsByName("bMeshItems");
       //var sMeshItems = cfEditor.getObjectsByName("sMeshItems");
       var bMaterial = new THREE.MeshLambertMaterial({ map: imgTexture,shading: THREE.SmoothShading });
       bMaterial.combine = THREE.MixOperation;
       //bMeshItems.material = bMaterial;
       //console.log(bMeshItems);
       _.each(window.meshNames, function(name){
            var mesh = cfEditor.getObjectsByName(name);
           mesh.material = bMaterial
       });
       cfEditor.signals.sceneGraphChanged.dispatch();
   });
});