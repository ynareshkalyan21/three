/**
 * Created by Techyard Systems PVT LTD on 6/12/2015.
 */
(function (s) {




    s.cuboid = function (h, w, d, t, shelf, shutter, hardware, texture, sections) {
        this.height = h;
        this.width = w;
        this.depth = d;
        this.thickness = t;
        this.shelf = shelf;
        this.shutter = shutter;
        this.hardware = hardware;
        this.texture = texture;
        this.sections = sections;
    };
    s.cuboid.prototype = function () {
    };
    s.cuboid.prototype.init = function () {
    };
    s.cuboid.prototype.shelf = function () {
    };
    s.cuboid.prototype.drawer = function () {
    };
    s.cuboid.prototype.shutter = function () {
    };
    s.cuboid.prototype.hardware = function () {
    };
    s.cuboid.prototype.update = function (h, w, d) {
    };
    s.cuboid.prototype.remove = function (item) {
    };
    s.cuboid.prototype.removeObject = function () {
    };
    s.cuboid.prototype.addSection = function () {
    };
    s.cuboid.prototype.texture = function () {
    };
    s.cuboid.prototype.constraints = function () {
    };

    s.shelf = function (w, d, t, position, parent, texture) {

        this.width = w;
        this.depth = d;
        this.thickness = t;
        this.position = position;
        this.parent = parent;
        this.texture = texture;


    };
    s.shelf.prototype.split = function(position,parent,texture){};
    s.shelf.prototype.texture = function () {
    };


})(window.CFShape = window.CFShape || {});