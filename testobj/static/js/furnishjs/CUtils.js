/**
 * Created by Techyard Systems PVT LTD on 3/25/2015.
 */
(function (cu) {


    cu.feetToMm = function (feet) {
        var val = (feet) * (1 / 0.0032808);
        return val.toFixed(1);
    };

    cu.inchToMm = function (inches) {

        return ((inches) * 25.4).toFixed(2);
    };
    cu.getObject = function (uId) {

    };

    cu.setGlobalSetting = function (roomDimensions) {

        var csFurnish = window.CFurniture, csCamera = window.CCamera, csScene = window.CScene;
        csFurnish.dimensions = {

            fov: 55,
            near: 1,
            far: cu.feetToMm(roomDimensions.depth)/100,
            height: 0,
            width: 0,
            depth: 0,
            aspect: window.innerWidth / window.innerHeight,
            cameraPosition: {
                x: 0,
                y: 0,
                z: 0
            }

        };
        csCamera.defaultCamera(1, csFurnish.dimensions.far, csFurnish.dimensions.cameraPosition);
        csFurnish.dimensions.height = 2 * Math.tan(csFurnish.dimensions.fov / 2) * (csFurnish.dimensions.far - 2);
        csFurnish.dimensions.width = csFurnish.dimensions.height * csFurnish.dimensions.aspect;

    };


})(window.CUtils = window.CUtils || {});
