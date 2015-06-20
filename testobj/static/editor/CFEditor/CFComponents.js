/**
 * Created by Techyard Systems PVT LTD on 4/10/2015.
 */
(function (co) {


    var utils = window.CFUtils;
    co.CabinetsData = null;
    co.kitchen = function () {

        this.type = null;
        this.runningLength = 0;
        this.toetick = {

            height: 0,
            width: 0,
            depth: 0,
            thickness: 0
        };
        this.cabinets = {

            wall: [],
            base: [],
            tall: []


        };

    };

    co.kitchen.prototype = {

        setKitchen: function (data) {

            if (data) {


                this.type = data.type;
                this.runningLength = utils.InchToCm(data.runningLength);
                this.toetick.height = utils.InchToCm(data.toetick.height);
                this.toetick.thickness = utils.InchToCm(data.toetick.thickness);
                if (data.cabinets.length > 0) {

                    _.each(data.cabinets,function(cabinet){

                        var kCabinet = new co.cabinet();
                        kCabinet.setCabinet(cabinet);


                    });

                }
            }

        },
        updateKitchen: function (key,data) {

        },
        removeKitchen: function () {
        },
        validateCabinets: function () {
        }

    };

    co.wardrobe = function () {


        this.type = null;
        this.sections = [];
        this.toetick = {

            height: 0,
            width: 0,
            depth: 0,
            thickness: 0
        };
        this.loft = {

            height: 0,
            width: 0,
            depth: 0,
            material: 0

        };


    };

    co.cabinet = function () {

       this.type = null;


    };

    co.cabinet.prototype = {

        setCabinet :function(data){

            this.type = data.type;
            this.id = data.id;
            this.mesh = null;
            this.materials = {


            };
            this.position = {};
            this.rotation ={};




        },
        updateCabinet:function(){

        }

    };

    co.section = function (section) {

        this.type = null;
        this.caracass = {

            width: 0,
            height: 0,
            depth: 0,
            thickness: 0,
            material: null

        };
        this.shutter = {

            material: null,
            divisions: 0

        };
        this.divisions = [];//collection of divisions
        this.hasShutterDivisions = false;

    };

    co.division = function () {

        this.height = 0;
        this.width = 0;
        this.depth = 0;
        this.type = null;
        this.hasShutter = false;

    };





})(window.CFComponents = window.CFComponents || {});