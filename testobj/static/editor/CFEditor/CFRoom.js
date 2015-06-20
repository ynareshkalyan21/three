/**
 * Created by Techyard Systems PVT LTD on 3/25/2015.
 */
(function (cr) {

    cr.Room = function (editor, data) {

        this.dimensions = {

            height:data.dimensions.height,
            width: data.dimensions.width,
            depth: data.dimensions.depth,
            faces: data.dimensions.faces
        };
        this.Editor = editor;
        this.walls = [];
    };
    cr.Room.prototype.add = function () {


        var csUtils = window.CFUtils;

        var roomGroup = new THREE.Group();
        roomGroup.name = 'CFK-Room';
        this.Editor.addObject(roomGroup);

        if (this.dimensions.faces > 0) {

            for (var i = 0; i < this.dimensions.faces; i++) {

                var wallObj = new cr.wall(roomGroup, i, this);
                wallObj.add();


            }

            var floorObj = new cr.wall(roomGroup, 101, this),
                ceiling = new cr.wall(roomGroup, 102, this);
            floorObj.add();
            ceiling.add();


        }

    };

    cr.wall = function (group, face, room) {

        this.dimensions = {

            width: room.dimensions.width,
            height: room.dimensions.height,
            depth: room.dimensions.depth,
            thickness: 0.5

        };
        this.group = group;
        this.name = group.name + "_wall_" + face;
        this.position = {

            x: 0,
            y: 0,
            z: 0

        };
        this.face = face;
        this.Editor = room.Editor;

    };
    cr.wall.prototype.calcDimensions = function () {

        switch (this.face) {

            case 0 :

                this.position.x = -(this.dimensions.width / 2)-(this.dimensions.thickness/2);
                this.dimensions.width = this.dimensions.thickness;
                this.position.y = 0;
                this.position.z = (this.dimensions.depth / 2);

                break;
            case 1:
                this.position.x = 0;
                this.position.z = 0;
                this.dimensions.depth = this.dimensions.thickness;
                this.position.y = 0;


                break;
            case 2:
                this.position.z = -(this.dimensions.depth / 2);
                this.position.x = this.dimensions.width / 2+(this.dimensions.thickness/2);
                this.dimensions.width = this.dimensions.thickness;
                this.position.y = 0;
                this.position.z = (this.dimensions.depth / 2);
                break;
            case 3:
                break;
            case 4:
                break;
            case 101:
                this.position.y = -(this.dimensions.height / 2) + (this.dimensions.thickness / 2);
                this.dimensions.height = this.dimensions.thickness;
                this.position.x = 0;
                this.position.z = (this.dimensions.depth / 2);
                break;
            case 102:
                this.position.y = (this.dimensions.height / 2) - (this.dimensions.thickness / 2);
                this.dimensions.height = this.dimensions.thickness;
                this.position.x = 0;
                this.position.z = (this.dimensions.depth / 2);
                break;


        }


    };
    cr.wall.prototype.add = function () {

        var cTexture = window.CFMaterial;
        this.calcDimensions();
        var that = this;


        var geometry = new THREE.BoxGeometry(this.dimensions.width, this.dimensions.height, this.dimensions.depth);
        geometry.name = this.name;
        var material = new cTexture.material('lambert', {color: new THREE.Color('rgb(245,245,245)'), image: null });

        material.setMaterial(geometry, function (mesh) {

            mesh.position.set(that.position.x, that.position.y, that.position.z);
            mesh.receiveShadow = true;
            that.group.add(mesh);


        });

    };
  /*  cr.wall.prototype.setParent = function (parentId, object) {

        if (object !== null) {

            if (object.parent == undefined) {


                if (object.id !== parentId) {

                    this.Editor.moveObject(object, this.Editor.scene.getObjectById(parentId));

                }

            }
            this.Editor.signals.objectChanged.dispatch(object);
        }


    };*/

})
(window.CFRoom = window.CFRoom || {});
