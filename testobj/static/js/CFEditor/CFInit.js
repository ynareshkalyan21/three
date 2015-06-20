/**
 * Created by Techyard Systems PVT LTD on 4/13/2015.
 */
(function (window) {

    var Rdata = {

        dimensions: {

            height: 10,
            width: 14,
            depth: 8,
            faces: 3

        }


    };
    var room = null;
    var cfEditor = new window.CFEditor.Editor(), cfViewport = new window.CFViewport.Viewport(cfEditor), cfRoom = window.CFRoom, cfLight = window.CFLighting, cfMaterial = window.CFMaterial, cfComponents = window.CFComponents;
    window.cfEditor = cfEditor;
    cfLoader = window.CFLoader;


    var timeout;

    var saveState = function (scene) {

        if (cfEditor.config.configData.save === false) {

            return;

        }

        clearTimeout(timeout);

        timeout = setTimeout(function () {

            cfEditor.signals.savingStarted.dispatch();

            timeout = setTimeout(function () {

                // cfEditor.storage.set(cfEditor.toJSON());

                cfEditor.signals.savingFinished.dispatch();

            }, 100);

        }, 1000);

    };


    var signals = cfEditor.signals;

    signals.editorCleared.add(saveState);
    signals.geometryChanged.add(saveState);
    signals.objectAdded.add(saveState);
    signals.objectChanged.add(saveState);
    signals.objectRemoved.add(saveState);
    signals.materialChanged.add(saveState);
    signals.sceneGraphChanged.add(saveState);
    signals.editorInit.dispatch();

    var light1 = new cfLight.light(cfEditor, 'spot', new THREE.Color('rgb(245,245,245)'), 0, 0.8, {x: 2, y: 10, z: 20 }, {x: -3, y: -3, z: 2}, 0.5, 0.5, true);
    light1.setLight();

    var light2 = new cfLight.light(cfEditor, 'point', new THREE.Color('rgb(240,240,240)'), 0, 0.7, {x: 2, y: 10, z: 20 }, {x: 2, y: 2, z: 2}, 0.5, 0.5, false);
    light2.setLight();

    /*  var light1 = new cfLight.light(cfEditor, 'spot', new THREE.Color('rgb(245,245,245)'), 0, 1, {x: 0, y: 6, z: 8 */
    /*Rdata.dimensions.depth*/
    /*}, {x: 0, y: 0, z: 0}, 0.5, 0.5, false);
     light1.setLight();*/

    var cabinets = ["SU-24", "SR-6", "SU-24", "TU-18", "SU-24", "SU-24", "SU-24", "AU-24" ];

    var wallUnits = ["CNU-36", "CNU-36" , "CU-24", "OB-C-36" ];

    room = new cfRoom.Room(cfEditor, Rdata);
    room.add();

/*
    for (var k = 0; k < 1; k++) {

        var jsonLoader2 = new THREE.JSONLoader();
        //glendale_2.js
        jsonLoader2.load("/static/files/Table.js", function (data) {


            var material = new cfMaterial.material('lambert', {image: 'http://localhost:8004/static/images/tex_2.jpg', color: new THREE.Color('rgb(17,70,130)'), anisotropy: 30, repeatU: 1, repeatV: 1});

            material.setMaterial(data, function (mesh) {


                mesh.position.set(0, 0, Math.random(2, 5));
                mesh.castShadow = true;
                cfEditor.addObject(mesh);

            });


        });
    }*/


    $.getJSON('/static/files/Cabinets.json', function (cab) {

        cfComponents.CabinetsData = cab;

        $.getJSON('/static/files/Kitchen.json', function (kitData) {


            room = new cfRoom.Room(cfEditor, Rdata);
            room.add();


            var initialPosition = -room.dimensions.width / 2;
            var initPosWall = -room.dimensions.width / 2;
            var total_width = 0, wall_width = 0;

            var cabs = [];
            var wabs = [];

            for (var i = 0; i < cabinets.length; i++) {

                var cc = cabinets[i];
                var cabinet = cfComponents.CabinetsData.Base[cc];

                var cab_data = {

                    type: cabinet,
                    position: {

                        x: initialPosition + (cabinet.Width / 2),
                        y: -room.dimensions.height / 2 + 0.7,
                        z: 1.5

                    }


                };
                total_width = total_width + cabinet.Width;
                cabs.push(cab_data);
                initialPosition = initialPosition + cabinet.Width + 0.02;


            }
            for (var j = 0; j < wallUnits.length; j++) {

                var wc = wallUnits[j];
                var wabinet = cfComponents.CabinetsData.Base[wc];

                var wab_data = {

                    type: wabinet,
                    position: {

                        x: initPosWall + (wabinet.Width / 2),
                        y: -room.dimensions.height / 2 + 4.2 + 0.7,
                        z: 1

                    }


                };
                wall_width = wall_width + wabinet.Width;
                wabs.push(wab_data);
                initPosWall = initPosWall + wabinet.Width + 0.02;


            }
            var idCounter = 0;
                var getId = function(){
                    return idCounter++;
                };
            window.bMeshItems = [];
            window.sMeshItems = [];
            window.meshNames = [];
            _.each(cabs, function (c) {


                //Cabinets
                var jsonLoader = new THREE.JSONLoader();
                jsonLoader.load(c.type.BMesh, function (data) {
                    window.bMeshItems.push(data);

                    var material = new cfMaterial.material('lambert', {image: 'static/images/tex_1.jpg', color: 'rgb(172,186,84)', anisotropy: 10, repeatU: 1, repeatV: 1});

                    material.setMaterial(data, function (mesh) {
                        var name = "bMeshItems"+getId();
                        window.meshNames.push(name);
                        cfEditor.nameObject(mesh, name);
                        mesh.position.set(c.position.x, c.position.y, c.position.z);
                        mesh.castShadow = true;
                        cfEditor.addObject(mesh);

                    });


                });

                jsonLoader.load(c.type.SMesh, function (data) {

                    window.sMeshItems.push(data);
                    var material = new cfMaterial.material('phong', {image: 'static/images/tex_1.jpg', color: new THREE.Color('rgb(17,70,130)'), anisotropy: 10, repeatU: 1, repeatV: 1});
                    material.setMaterial(data, function (mesh) {
                        var name = "sMeshItems"+getId();
                        window.meshNames.push(name);
                        cfEditor.nameObject(mesh, name);
                        mesh.position.set(c.position.x, c.position.y, c.position.z + 1.2);
                        mesh.castShadow = true;
                        cfEditor.addObject(mesh);

                    });


                });

                jsonLoader.load(c.type.HMesh, function (data) {


                    var material2 = new cfMaterial.material('lambert', {image: null, color: new THREE.Color('rgb(255,255,255)'), anisotropy: 10, repeatU: 1, repeatV: 1});

                    material2.setMaterial(data, function (mesh) {


                        mesh.position.set(c.position.x, c.position.y, c.position.z + 1.3);
                        mesh.castShadow = true;
                        cfEditor.addObject(mesh);

                    });


                });


            });


            _.each(wabs, function (c) {


                //Cabinets
                var jsonLoader = new THREE.JSONLoader();
                jsonLoader.load(c.type.BMesh, function (data) {

                    var img = null;

                    if (c.type.HMesh != null) {


                        img = '/static/images/tex_1.jpg';
                    }

                    var material = new cfMaterial.material('lambert', {image: img, color: 'rgb(245,255,255)', anisotropy: 10, repeatU: 1, repeatV: 1});

                    material.setMaterial(data, function (mesh) {
                        mesh.position.set(c.position.x, c.position.y, c.position.z);
                        mesh.castShadow = true;
                        cfEditor.addObject(mesh);

                    });


                });

                if (c.type.SMesh != null) {
                    jsonLoader.load(c.type.SMesh, function (data) {


                        var material = new cfMaterial.material('phong', {image: 'static/images/tex_1.jpg', color: new THREE.Color('rgb(17,70,130)'), anisotropy: 10, repeatU: 1, repeatV: 1});

                        material.setMaterial(data, function (mesh) {

                            var name = "sMeshItems"+getId();
                        window.meshNames.push(name);
                        cfEditor.nameObject(mesh, name);
                            mesh.position.set(c.position.x, c.position.y, c.position.z + 0.6);
                            mesh.castShadow = true;
                            cfEditor.addObject(mesh);

                        });


                    });


                }

                if (c.type.HMesh != null) {
                    jsonLoader.load(c.type.HMesh, function (data) {


                        var material2 = new cfMaterial.material('lambert', {image: null, color: new THREE.Color('rgb(255,255,255)'), anisotropy: 10, repeatU: 1, repeatV: 1});

                        material2.setMaterial(data, function (mesh) {


                            mesh.position.set(c.position.x, c.position.y, c.position.z + 0.6);
                            mesh.castShadow = true;
                            cfEditor.addObject(mesh);

                        });


                    });


                }

            });

            var geometry = new THREE.BoxGeometry(total_width, 0.3, 2);
            var material = new cfMaterial.material('lambert', {image: 'static/images/tex_1.jpg', color: 'rgb(172,186,84)', anisotropy: 10, repeatU: 1, repeatV: 1});

            material.setMaterial(geometry, function (mesh) {
                var name = "skirting"+getId();
                        window.meshNames.push(name);
                        cfEditor.nameObject(mesh, name);

                mesh.position.set(-room.dimensions.width / 2 + total_width / 2, -room.dimensions.height / 2 + 0.6, 1.7);
                mesh.castShadow = true;
                cfEditor.addObject(mesh);

            });

            var geometry1 = new THREE.BoxGeometry(total_width - 1.8, 0.2, 2.2);
            var material4 = new cfMaterial.material('lambert', {image: '/static/images/mar.jpg', color: 'rgb(172,186,84)', anisotropy: 10, repeatU: 1, repeatV: 1});

            material4.setMaterial(geometry1, function (mesh) {


                mesh.position.set(-room.dimensions.width / 2 + total_width / 2 - 1, -room.dimensions.height / 2 + 3.1, 1.7);
                mesh.castShadow = true;
                cfEditor.addObject(mesh);

            });


        }, function () {


        });


    }, function () {


    });


    $('.menu-item').click(function () {




        /*   var x = 2;

         for (var i = 0; i < 6; i++) {


         var jsonLoader = new THREE.JSONLoader();
         jsonLoader.load("/static/files/bs028.js", function (data) {

         */
        /* var geometry = new THREE.BoxGeometry(1.8, 1, 1.5);*/
        /*

         var material = new cfMaterial.material('lambert', {image: 'http://localhost:8004/static/images/tex_1.jpg', color: 'rgb(172,186,84)', anisotropy: 10, repeatU: 1, repeatV: 1});

         material.setMaterial(data, function (mesh) {


         mesh.position.set(x, 0, 0);
         mesh.castShadow = true;
         x = x + 2;
         cfEditor.addObject(mesh);

         });


         });


         }*/


        /* var y = -(data.dimensions.width/2)+(2.5/2);
         for (var j = 0; j < 5; j++) {

         var geometry1 = new THREE.BoxGeometry(2.5,3,2);

         var materials = new cfMaterial.material('lambert', {image: 'http://localhost:8004/static/images/tex_1.jpg', color: 'rgb(172,186,84)', anisotropy: 10, repeatU: 1, repeatV: 1});

         materials.setMaterial(geometry1, function (mesh) {

         mesh.position.set(y,-(data.dimensions.height/2)+1.5, 1);
         mesh.castShadow = true;
         y = y + 2.508;
         cfEditor.addObject(mesh);


         });

         }*/


    });


    /* document.addEventListener('dragover', function (event) {

     event.preventDefault();
     event.dataTransfer.dropEffect = 'copy';

     }, false);

     document.addEventListener('drop', function (event) {

     event.preventDefault();
     editor.loader.loadFile(event.dataTransfer.files[ 0 ]);

     }, false);*/

    /* document.addEventListener('keydown', function (event) {

     switch (event.keyCode) {

     case 8: // prevent browser back
     event.preventDefault();
     break;

     }

     }, false);*/


    var onWindowResize = function (event) {
        cfEditor.signals.windowResize.dispatch();
    };
    window.addEventListener('resize', onWindowResize, false);
    onWindowResize();
    /* var hash = window.location.hash;
     if (hash.substr(1, 4) === 'app=') {
     if (confirm('Any unsaved data will be lost. Are you sure?')) {
     var loader = new THREE.XHRLoader();
     loader.crossOrigin = '';
     loader.load(hash.substr(5), function (text) {
     var json = JSON.parse(text);
     editor.clear();
     editor.fromJSON(json);
     });
     }
     }*/

})(window);