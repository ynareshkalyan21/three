/**
 * Created by Techyard Systems PVT LTD on 4/9/2015.
 */


(function (u) {

    u.FeetToCm = function (feet) {

        return parseFloat((feet / 0.032808).toFixed(2));

    };
    u.InchToCm = function (inches) {

        return parseFloat((inches / 2.54).toFixed(2));
    };

    u.FtToPx = function () {

    };
    u.CanvasVisibleDimensions = function (camera) {

        var viewDimensions = {};
        var dist = camera.position.z;
        var vFOV = camera.fov * Math.PI / 180;
        var height = 2 * Math.tan(vFOV / 2) * dist;
        viewDimensions.width = height * camera.aspect;
        viewDimensions.height = height;

    };
    u.calculateSize = function (obj) {

        var dim = _calDim(obj);
        var x = ftToPx.width,
            y = ftToPx.height,
            z = ftToPx.depth;
        var areas = {
            x: dim.y * dim.z / (y * z),
            y: dim.x * dim.z / (x * z),
            z: dim.x * dim.y / (x * y)
        };
        var volume = dim.x * dim.y * dim.z / (x * y * z);
        return {
            volume: volume,
            areas: areas
        };

        function _calDim(_o) {
            var _b = new THREE.Box3();
            _b.setFromObject(_o);

            return {
                x: (_b.max.x - _b.min.x) || 0,
                y: (_b.max.y - _b.min.y) || 0,
                z: (_b.max.z - _b.min.z) || 0
            }

        }

    };

})(window.CFUtils = window.CFUtils || {});