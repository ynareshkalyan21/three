/**
 * Created by Techyard Systems PVT LTD on 3/25/2015.
 */
(function (cr) {


    cr.room = function (dimensions, faces) {

        this.dimensions = {

            height: dimensions.height,
            width: dimensions.width,
            depth: dimensions.depth,
            faces: faces

        };
        this.walls = [];

    };
    cr.room.prototype = function () {
    };
    cr.room.prototype.addToScene = function () {

        var csScene = window.CScene, csUtils = window.CUtils;
        if (this.walls.length > 0) {

            for (var i = 0; i < this.walls.length; i++) {

                var wallDimension = {

                    width: 0,
                    height: 0,
                    depth: 0

                }, wallPosition = {

                    x: 0,
                    y: 0,
                    z: 0

                };

                var wallObj = this.walls[i];

                switch (i) {

                    case 0 :

                        wallDimension.height = (csUtils.feetToMm(wallObj.height)) / 200;
                        wallDimension.width = (csUtils.feetToMm(wallObj.width)) / 100;
                        wallDimension.depth = (csUtils.feetToMm(wallObj.depth)) / 100;

                        wallPosition.x = -(wallDimension.width);
                        wallPosition.y = 0;
                        wallPosition.z = 0;

                        var wall0 = new cr.wall(wallDimension, wallPosition, i,null);
                        wall0.addToScene();

                        break;
                    case 1:

                        wallDimension.height = (csUtils.feetToMm(wallObj.height)) / 200;
                        wallDimension.width = (csUtils.feetToMm(wallObj.width)) / 100;
                        wallDimension.depth = 0.1;


                        wallPosition.x = 0;
                        wallPosition.y = 0;
                        wallPosition.z = 0;

                        var wall1 = new cr.wall(wallDimension, wallPosition, i,null);
                        wall1.addToScene();

                        break;
                    case 2:

                        wallDimension.height = (csUtils.feetToMm(wallObj.height)) / 200;
                        wallDimension.width = 0;
                        wallDimension.depth = (csUtils.feetToMm(wallObj.depth)) / 100;


                        wallPosition.x = 9;
                        wallPosition.y = 0;
                        wallPosition.z = 0;

                        var wall2 = new cr.wall(wallDimension, wallPosition, i,null);
                        wall2.addToScene();
                        break;

                    case 3:
                        /*  wallDimension.height = (csUtils.feetToMm(wallObj.height)) / 200;
                         wallDimension.width = (csUtils.feetToMm(wallObj.width)) / 100;
                         wallDimension.depth = 0;

                         wallPosition.x = 0;
                         wallPosition.y = 0;
                         wallPosition.z = 8;

                         var wall3 = new cr.wall(wallDimension, wallPosition, i);
                         wall3.addToScene();*/
                        break;
                    case 4:
                        break;
                    default:
                        break;

                }


            }


            wallDimension.height = 0;
            wallDimension.width = (csUtils.feetToMm(wallObj.width)) / 100;
            wallDimension.depth = (csUtils.feetToMm(wallObj.depth)) / 100;

            wallPosition.x = 0;
            wallPosition.y = 4;
            wallPosition.z = 0;

            var ceiling = new cr.wall(wallDimension, wallPosition, i,null);
            ceiling.addToScene();

            wallDimension.height = 0;
            wallDimension.width = (csUtils.feetToMm(wallObj.width)) / 100;
            wallDimension.depth = (csUtils.feetToMm(wallObj.depth)) / 100;

            wallPosition.x = 0;
            wallPosition.y = -4.6;
            wallPosition.z = 0;

            var floor = new cr.wall(wallDimension, wallPosition, i,null);
            floor.addToScene();


        }

    };
    cr.wall = function (dimension, position, face,image) {

        this.dimensions = {

            width: dimension.width,
            height: dimension.height,
            depth: dimension.depth,
            thickness: 0.2

        };
        this.position = {

            x: position.x,
            y: position.y,
            z: position.z

        };
        this.image = image;
        this.face = face;
        this.abstacles = [];

    };
    cr.wall.prototype.addToScene = function () {

        var cTexture = window.CTexture, cScene = window.CScene;
        var that = this;
        var geometry = new THREE.BoxGeometry(this.dimensions.width, this.dimensions.height, this.dimensions.depth);
        var material = null;

        if (this.image != null) {



            material = new cTexture.texture('lambert', {image: this.image, color: null, anisotropy:10, repeatU:2.5, repeatV: 2});

        } else {



            material = new cTexture.texture('lambert', {color: new THREE.Color('rgb(255,255,255)'), image: null });
        }



        material.setMaterial(geometry, function (mesh) {

            mesh.position.set(that.position.x, that.position.y, that.position.z);
            mesh.receiveShadow = true;
            cScene.scene.add(mesh);

        });

    };
    cr.obstacle = function (type) {

        this.type = null;
        this.dimensions = {

            width: 0,
            height: 0

        };
        this.position = {

            top: 0.0,
            right: 0.0,
            left: 0.0,
            bottom: 0.0

        };
        this.model = null;
        this.accessory = null;

    };
    cr.obstacle.prototype.setProperties = function (data) {


    };
    cr.obstacle.prototype.addToScene = function (scene) {


    };
    cr.setRoom = function (data, faces) {

        var csScene = window.CScene;

        var room = new cr.room(data, faces);

        for (var i = 0; i < faces; i++) {

            room.walls.push(data);
        }
        room.addToScene();
    };

})
(window.CRoom = window.CRoom || {});
