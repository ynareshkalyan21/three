/**
 * Created by Techyard Systems PVT LTD on 3/25/2015.
 */
(function (cl) {

    cl.light = function (editor, type, color, distance, intensity, position, rotation, height, width, hastarget) {

        this.editor = editor;
        this.color = color;
        this.skyColor = 0x0000ff;
        this.groundColor = 0x00ff00;
        this.type = type;
        this.intensity = intensity;
        this.distance = distance;
        this.position = position;
        this.rotation = rotation;
        this.height = height;
        this.width = width;
        this.angle = 120;
        this.exponent = 15;
        this.target = hastarget;
    };
    cl.light.prototype.setLight = function () {

        switch (this.type) {

            case 'ambient':

                var ambient = new THREE.AmbientLight(this.color);
                ambient.shadowDarkness = 0.9;
                ambient.castShadow = true;
                this.editor.addObject(ambient);
                break;
            case 'area':
                var area = new THREE.AreaLight(this.color, this.intensity);
                area.position.set(this.position.x, this.position.y, this.position.z);
                area.width = this.width;
                area.height = this.height;
                area.shadowDarkness = 0.9;
                area.castShadow = true;
                this.editor.addObject(area);
                break;
            case 'directional':
                var directional = new THREE.DirectionalLight(this.color, this.intensity);
                directional.position.set(this.position.x, this.position.y, this.position.z);
                this.editor.addObject(directional);
                break;

            case 'hemi':

                var hemisphere = new THREE.HemisphereLight(this.skyColor, this.groundColor, this.intensity);
                hemisphere.position.set(this.position.x, this.position.y, this.position.z);
                this.editor.addObject(hemisphere);

                break;
            case 'point':

                var point = new THREE.PointLight(this.color, this.intensity, this.distance);
                //       console.log(this);
                point.position.set(this.position.x, this.position.y, this.position.z);
                this.editor.addObject(point);

                break;
            case 'spot':

                var spotLight = new THREE.SpotLight(this.color);
                spotLight.intensity = this.intensity;
                spotLight.angle = this.angle;
                spotLight.exponent = this.exponent;
                spotLight.position.set(this.position.x, this.position.y, this.position.z);

                spotLight.shadowCameraVisible = false;
                spotLight.shadowDarkness = 0.9;


                spotLight.castShadow = true;
                spotLight.shadowMapWidth = 1024;
                spotLight.shadowMapHeight = 512;

                spotLight.shadowCameraNear = 0;
                spotLight.shadowCameraFar = 25;
                spotLight.shadowCameraFov = 35;

                if (this.target) {

                    //console.log(this.position);
                    var obj = new THREE.Object3D();
                    obj.position.set(this.rotation.x, this.rotation.y, this.rotation.z);
                    this.editor.addObject(obj);
                    spotLight.target = obj;
                }
                this.editor.addObject(spotLight);
                break;

            default:

                var defambient = new THREE.AmbientLight(this.color);
                this.editor.addObject(defambient);
                break;


        }
    };
    cl.light.prototype.updateLight = function () {


    };
    cl.setDefault = function () {

        var csFurnish = window.CFurniture , csScene = window.CScene;
        var position = {

            x: 0,
            y: 0,
            z: 30

        };
        var rotation = {

            x: 0,
            y: 4,
            z: 5

        };
        var defLight = new cl.light('spot', new THREE.Color('rgb(245,245,245)'), 10, 1, position, rotation, 1, 1, true);
        defLight.setLight();


        var position1 = {

            x: 0,
            y: 3,
            z: 8

        };
        var defLight1 = new cl.light('ambient', new THREE.Color('rgb(145,145,145)'), 10, 0.1, position1, position, 20, 20, false);
        //defLight1.setLight();


    };
    cl.setRoomLight = function () {

        var csScene = window.CScene, csRoom = window.CRoom, csUtils = window.CUtils, csLight = window.CLight, csRenderer = window.CRenderer, csTexture = window.CTexture;

        for (var i = 0; i < 5; i++) {


            for (var j = 0; j < 1; j++) {


                var position1 = {

                    x: -8 + (4 * i),
                    y: -1.3,
                    z: 2 + (2 * j)

                };
                var rotation = {

                    x: -8 + (3 * i),
                    y: -4,
                    z: 1 + (2 * j)

                };
                var defLight1 = new cl.light('area', new THREE.Color('rgb(255,255,255)'), 8, 1, position1, rotation, 2, 2, true);
                //defLight1.setLight();


            }


        }


    };


})(window.CFLighting = window.CLighting || {});