/**
 * Created by Techyard Systems PVT LTD on 3/25/2015.
 */
(function (ct) {

    ct.getTypeCode = function (type) {
        if (type === 'face') {
            return 0;
        } else if (type === 'lambert') {
            return 1;
        } else if (type === 'phong') {
            return 2;
        } else if (type === 'depth') {
            return 3;
        } else if (type === 'lBasic') {
            return 4;
        } else if (type === 'normal') {
            return 5;
        } else if (type === 'basic') {
            return 6;
        } else {
            return -1;
        }
    };
    ct.texture = function (type, options) {

        this.type = type;
        this.options = options;
        this.img = '/static/images/tex_1.jpg';
        this.bump = null;
        this.shade = THREE.SmoothShading;
        this.isTransparent = false;
        this.bumpScale = 1;
        this.shininess = 100;
        this.specular = 'rgb(5,5,5)';
        this.wireframe = false;
        this.color = 0xffffff;
    };
    ct.texture.prototype = function () {
    };
    ct.texture.prototype.setMaterial = function (object, success) {

        var typeCode = ct.getTypeCode(this.type);


        if (this.options) {


            if (this.options.image) {
                var imgTexture =new THREE.ImageUtils.loadTexture(this.options.image);
                imgTexture.repeat.set(this.options.repeatU, this.options.repeatV);
                imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;
                imgTexture.anisotropy = this.options.anisotropy;
                imgTexture.minFilter = THREE.NearestFilter;
                imgTexture.mapping = THREE.UVMapping;
                imgTexture.magFilter = THREE.NearestFilter;

                this.texture = imgTexture;
            }
            if (this.options.bump) {

                var bumpTexture =new THREE.ImageUtils.loadTexture(this.options.bump);
                bumpTexture.repeat.set(this.options.repeatU, this.options.repeatV);
                bumpTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;
                bumpTexture.minFilter = THREE.NearestFilter;
                bumpTexture.mapping = THREE.UVMapping;
                bumpTexture.magFilter = THREE.NearestFilter;
                bumpTexture.anisotropy = this.options.anisotropy;
                this.bump = bumpTexture;

            } else {

                this.bump = imgTexture;
            }

            switch (typeCode) {
                case 0:
                    var materials = [];
                    if (this.options.materials.length > 0) {
                        var face = new THREE.MeshFaceMaterial(materials);
                        success(new THREE.Mesh(object, face));
                    }
                    break;
                case 1:
                    var matLam;
                    if (this.texture != null) {
                        matLam = new THREE.MeshLambertMaterial({ map: this.texture, shading: this.shade, reflectivity: 0.5, side: THREE.DoubleSide });
                        matLam.combine = THREE.MixOperation;
                        success(new THREE.Mesh(object, matLam));
                    } else if (this.options.color) {
                        matLam = new THREE.MeshLambertMaterial({color: new THREE.Color('rgb(255,255,255)'), shading: this.shade, combine: THREE.MixOperation, reflectivity: 1});
                         matLam.combine = THREE.AddOperation;
                        success(new THREE.Mesh(object, matLam));
                    }
                    break;
                case 2:
                    var matphong;
                    if (this.options.image) {
                        matphong = new THREE.MeshPhongMaterial({  bumpScale: this.bumpScale, color: this.options.color, specular: this.specular, shininess: this.shininess, shading: this.shade, combine: THREE.MultiplyOperation, reflectivity: 0.85});
                        success(new THREE.Mesh(object, matphong));
                    }
                    break;
                case 3:
                    var matDepth;
                    matDepth = new THREE.MeshDepthMaterial({ wireframe: this.wireframe});
                    success(new THREE.Mesh(object, matDepth));
                    break;
                case 4:
                    var matlinebase;
                    matlinebase = new THREE.LineBasicMaterial({ vertexColors: this.color});
                    success(new THREE.Mesh(object, matlinebase));
                    break;
                case 5:
                    var matnormal;
                    matnormal = new THREE.MeshNormalMaterial({wireframe: this.wireframe});
                    success(new THREE.Mesh(object, matnormal));
                    break;
                case 6:
                    var matbasic;

                    if (this.texture != null) {
                        matbasic = new THREE.MeshBasicMaterial({ map: this.texture,color: 'rgb(255,255,255)', shading: this.shade, reflectivity: 0.5 });
                        success(new THREE.Mesh(object, matLam));
                    } else if (this.options.color) {
                        matbasic = new THREE.MeshBasicMaterial({wireframe: this.wireframe, vertexColors: this.color, shading: this.shade, combine: THREE.MixOperation, reflectivity: 0.5});
                        success(new THREE.Mesh(object, matLam));
                    }
                    break;
                default:
                    throw "Failed:Material type not found";
                    break;

            }


        }


    };


})
(window.CTexture = window.CTexture || {});