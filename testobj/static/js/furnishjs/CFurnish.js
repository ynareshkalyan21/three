/**
 * Created by Techyard Systems PVT LTD on 3/25/2015.
 */
(function (cf) {


    cf.dimensions = {

        fov: 0,
        near: 0,
        far: 0,
        height: 0,
        width: 0,
        depth: 0,
        aspect: window.innerWidth / window.innerHeight,
        cameraPosition: {

            x: 2,
            y: 2,
            z: 5

        }



    };

    cf.init = function (room) {

        var csScene = window.CScene, csRoom = window.CRoom, csUtils = window.CUtils, csLight = window.CLight, csRenderer = window.CRenderer, csTexture = window.CTexture;
        csScene.createScene(room, function () {

            csUtils.setGlobalSetting(room);
            csLight.setDefault();
            csRoom.setRoom(room, 4);
            csScene.camera.position.z = cf.dimensions.far;
            csRenderer.render(csScene.camera);


            var x = -7.8;

            for (var i = 0; i < 5; i++) {

                var geometry = new THREE.BoxGeometry(1.8, 1, 2);

                var material = new csTexture.texture('lambert', {image: 'http://localhost:8004/static/images/tex_1.jpg', color: 'rgb(200,250,180)', anisotropy: 10, repeatU: 1, repeatV: 1});

                material.setMaterial(geometry, function (mesh) {

                    mesh.position.set(x, 2, 0);
                    mesh.castShadow = true;



                    x = x + 1.806;
                    csScene.scene.add(mesh);

                });

            }

            var y = -7.8;
            for (var j = 0; j < 5; j++) {

                var geometry1 = new THREE.BoxGeometry(2.5, 2, 1.5);

                var materials = new csTexture.texture('lambert', {image: 'http://localhost:8004/static/images/tex_1.jpg', color: 'rgb(250,158,158)', anisotropy: 10, repeatU: 1, repeatV: 1});

                materials.setMaterial(geometry1, function (mesh) {

                    mesh.position.set(y, -1.5, 0);
                    mesh.castShadow = true;


                    y = y + 3.51;


                    csScene.scene.add(mesh);

                });

            }
            csLight.setRoomLight();


        });


    };


})(window.CFurniture = window.CFurniture || {});