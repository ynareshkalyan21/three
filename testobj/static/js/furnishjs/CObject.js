/**
 * Created by Techyard Systems PVT LTD on 3/25/2015.
 */
(function (co) {

    co.cabinet = function () {

        this.type = null;
        this.position = {

            left: 0.0,
            right: 0.0,
            bottom: 0.0,
            top: 0.0

        };
        this.materials = {

            base: {

                texture: null,
                type: null

            },
            door: {

                texture: null,
                type: null

            }
        };
        this.accessories = {

            handle: {

                model: null,
                texture: null

            }

        }
    };
    co.kitchenBase = function () {
    };

    co.kitchenBase.prototype = Object.create(co.cabinet.prototype);
    co.kitchenBase.prototype.constructor = co.kitchenBase;

    co.kitchenWall = function () {
    };

    co.kitchenWall.prototype = Object.create(co.cabinet.prototype);
    co.kitchenWall.prototype.constructor = co.kitchenWall;

    co.kitchenTall = function () {
    };

    co.kitchenTall.prototype = Object.create(co.cabinet.prototype);
    co.kitchenTall.prototype.constructor = co.kitchenTall;


})(window.CObject = window.CObject || {});