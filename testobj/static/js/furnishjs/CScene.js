/**
 * Created by Techyard Systems PVT LTD on 3/25/2015.
 */
(function (cs) {

    cs.scene = null;
    cs.camera = null;
    cs.room = null;

    cs.createScene = function (data, success) {

        var csRenderer = window.CRenderer;
        cs.scene = new THREE.Scene();

        csRenderer.initRender(window.innerWidth, window.innerHeight);
        success();

    };
    cs.switchCamera = function (camera) {

        var csRenderer = window.CRenderer;
        csRenderer.render(camera);

    };
    cs.switchLights = function () {


    };

    cs.sceneUtils = function () {


    };

})(window.CScene = window.CScene || {});