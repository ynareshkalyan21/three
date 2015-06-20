/**
 * Created by Techyard Systems PVT LTD on 4/9/2015.
 */


(function (c) {

    c.Config = function () {

        this.name = 'CFurnish_Editor';
        this.configData = {

            save: true,
            cameraPosition: {x:0, y: 0, z:18},
            cameraTarget: [0, 0,0],
            renderer:'WebGLRenderer',
            units: 'cm',
            selected:null

        };

    };
    c.Config.prototype = function () {
    };
    c.Config.prototype.constructor = c.Config;
    c.Config.prototype.setConfig = function (key,value) {

        this.configData[key] = value;

    };
    c.Config.prototype.getConfig = function (key) {

        return this.configData[key];
    };
    c.Config.prototype.clearConfig = function (configData) {
    };




})(window.CFConfig = window.CFConfig || {});