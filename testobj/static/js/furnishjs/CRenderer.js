/**
 * Created by Techyard Systems PVT LTD on 3/25/2015.
 */
(function (cr) {

    cr.renderer = null;

    cr.initRender = function (width, height) {

        cr.renderer = new THREE.WebGLRenderer();
        cr.renderer.setSize(window.innerWidth, window.innerHeight);
        cr.renderer.shadowMapEnabled = true;
        cr.renderer.gammaInput = true;
        cr.renderer.gammaOutput = true;
        document.body.appendChild(cr.renderer.domElement);

    };
    cr.render = function (camera) {

        var scene = window.CScene.scene;

        var render = function () {
            requestAnimationFrame(render);
            cr.renderer.render(scene, camera);
        };
        render();
    };

})(window.CRenderer = window.CRenderer || {});