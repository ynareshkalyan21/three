/**
 * Created by Techyard Systems PVT LTD on 3/25/2015.
 */
(function (cc) {


    cc.camera = function (near, far) {

        this.near = near;
        this.far = far;
        this.resolution = null;
        this.left = 0;
        this.right = 0;
        this.top = 0;
        this.bottom = 0;
        this.aspectRatio = 0;
        this.angle = 0;


    };
    cc.camera.prototype = function () {

    };
    cc.camera.prototype.constructor = cc.camera;
    cc.camera.prototype.setCamera = function (typeId, position) {

        var csRenderer = window.CRenderer, csScene = window.CScene;


        switch (typeId) {
            case 0:
                var cubeCamera = new THREE.CubeCamera(this.near, this.far, this.resolution);

                cubeCamera.position.copy(position);
                cubeCamera.updateCubeMap(csRenderer.renderer, csScene.scene);
                window.CScene.camera = cubeCamera;
                csScene.scene.add(cubeCamera);
                csRenderer.render(cubeCamera);
                break;
            case 1:
                var perspectiveCamera = new THREE.PerspectiveCamera(this.angle, this.aspectRatio, this.near, this.far);
                perspectiveCamera.position.set(position.x, position.y, position.z);
                perspectiveCamera.lookAt(csScene.scene.position);
                window.CScene.camera = perspectiveCamera;
                csScene.scene.add(window.CScene.camera);
                csRenderer.render(window.CScene.camera);
                break;
            case 2:
                var orthographicCamera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 1, 1000);
                csScene.scene.add(orthographicCamera);
                csRenderer.render(orthographicCamera);
                break;
            default :

                var perspective = new THREE.PerspectiveCamera(this.angle, this.aspectRatio, this.near, this.far);
                window.CScene.camera = perspective;
                perspective.position.set(position.x, position.y, position.z);
                perspective.lookAt(csScene.scene.position);
                csScene.scene.add(perspective);
                csRenderer.render(perspective);
                break;


        }


    };
    cc.camera.prototype.operateCamera = function (camera, action) {


    };

    cc.defaultCamera = function (near, far, pos) {

        var c = new cc.camera(near, far);
        c.angle = 35;
        c.aspectRatio = window.innerWidth / window.innerHeight;
        c.setCamera(1, pos);
    };

})(window.CCamera = window.CCamera || {});