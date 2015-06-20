/**
 * Created by Techyard Systems PVT LTD on 4/13/2015.
 */
(function (l) {

    l.Loader = function (editor) {


        var manager = new THREE.LoadingManager();
        manager.onProgress = function (item, loaded, total) {

            console.log(item, loaded, total);

        };


        var scope = this;
        var signals = editor.signals;

        this.loadFile = function (file) {

            var filename = file.name;
            var extension = filename.split('.').pop().toLowerCase();

            switch (extension) {


                case 'obj':


                    var loader = new THREE.OBJLoader(manager);
                    loader.load(file.url, function (object) {

                        object.traverse(function (child) {

                            if (child instanceof THREE.Mesh) {


                                child.material.map = file.texture;

                            }

                        });

                        object.position.y = 0;
                        object.position.z =0;
                        object.position.x =0;
                        editor.addObject(object);
                        editor.select(object);

                    });

                    break;


                default:

                    alert('Unsupported file format (' + extension + ').');

                    break;

            }

        };

        this.handleJSON = function (data, file, filename) {

            if (data.metadata === undefined) { // 2.0

                data.metadata = { type: 'Geometry' };

            }

            if (data.metadata.type === undefined) { // 3.0

                data.metadata.type = 'Geometry';

            }

            if (data.metadata.version === undefined) {

                data.metadata.version = data.metadata.formatVersion;

            }

            if (data.metadata.type === 'BufferGeometry') {

                var loader = new THREE.BufferGeometryLoader();
                var result = loader.parse(data);

                var mesh = new THREE.Mesh(result);

                editor.addObject(mesh);
                editor.select(mesh);

            } else if (data.metadata.type.toLowerCase() === 'geometry') {

                var loader = new THREE.JSONLoader();
                var result = loader.parse(data);

                var geometry = result.geometry;
                var material;

                if (result.materials !== undefined) {

                    if (result.materials.length > 1) {

                        material = new THREE.MeshFaceMaterial(result.materials);

                    } else {

                        material = result.materials[ 0 ];

                    }

                } else {

                    material = new THREE.MeshPhongMaterial();

                }

                geometry.sourceType = "ascii";
                geometry.sourceFile = file.name;

                var mesh;

                if (geometry.animation && geometry.animation.hierarchy) {

                    mesh = new THREE.SkinnedMesh(geometry, material);

                } else {

                    mesh = new THREE.Mesh(geometry, material);

                }

                mesh.name = filename;

                editor.addObject(mesh);
                editor.select(mesh);

            } else if (data.metadata.type.toLowerCase() === 'object') {

                var loader = new THREE.ObjectLoader();
                var result = loader.parse(data);

                if (result instanceof THREE.Scene) {

                    editor.setScene(result);

                } else {

                    editor.addObject(result);
                    editor.select(result);

                }

            } else if (data.metadata.type.toLowerCase() === 'scene') {

                // DEPRECATED

                var loader = new THREE.SceneLoader();
                loader.parse(data, function (result) {

                    editor.setScene(result.scene);

                }, '');

            }

        };

    };

})(window.CFLoader = window.CFLoader || {});