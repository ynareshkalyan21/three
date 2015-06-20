/**
 * Created by Techyard Systems PVT LTD on 3/25/2015.
 */
(function (cm) {


    cm.material = function (type, options) {

        this.type = type;
        this.options = options;
        this.shading = THREE.SmoothShading;

    };
    cm.material.prototype = function () {
    };
    cm.material.prototype.setMaterial = function (object, success) {

        if (this.options) {


            if (this.options.image) {
                var imgTexture = new THREE.ImageUtils.loadTexture(this.options.image);
                imgTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;
                 imgTexture.repeat.set(this.options.repeatU, this.options.repeatV);
                imgTexture.anisotropy = this.options.anisotropy;
                imgTexture.minFilter = THREE.NearestFilter;
                 imgTexture.mapping = THREE.UVMapping;
                imgTexture.magFilter = THREE.NearestFilter;
                imgTexture.side = this.options.side;

                this.texture = imgTexture;
            }
            if (this.options.bump) {

                var bumpTexture = new THREE.ImageUtils.loadTexture(this.options.bump);
                bumpTexture.wrapS = imgTexture.wrapT = THREE.RepeatWrapping;
                bumpTexture.repeat.set(this.options.repeatU, this.options.repeatV);
                bumpTexture.minFilter = THREE.NearestFilter;
                bumpTexture.mapping = THREE.UVMapping;
                bumpTexture.magFilter = THREE.NearestFilter;
                bumpTexture.anisotropy = this.options.anisotropy;
                this.bump = bumpTexture;

            } else {

                this.bump = imgTexture;
            }

            switch (this.type) {

                case 'face':

                    var materials = [];
                    if (this.options.materials.length > 0) {
                        var face = new THREE.MeshFaceMaterial(materials);
                        success(new THREE.Mesh(object, face));
                    }
                    break;
                case 'lambert':
                    var matLam;
                    if (this.texture != null) {
                        matLam = new THREE.MeshLambertMaterial({ map: this.texture,shading: this.shading });
                        matLam.combine = THREE.MixOperation;
                        success(new THREE.Mesh(object, matLam));
                    } else if (this.options.color) {
                        matLam = new THREE.MeshLambertMaterial({color: new THREE.Color(this.options.color), shading: this.shading, combine: THREE.MixOperation, reflectivity: 1});
                        matLam.combine = THREE.AddOperation;
                        success(new THREE.Mesh(object, matLam));
                    }
                    break;
                case 'phong':
                    var matphong;
                    if (this.options.image == null) {
                        matphong = new THREE.MeshPhongMaterial({bumpScale:0.5,specular:0x00ffaa,color:this.options.color, shading: this.shading, combine: THREE.MixOperation, reflectivity: 0.2});
                        success(new THREE.Mesh(object, matphong));
                    }else{

                        matphong = new THREE.MeshPhongMaterial({map:this.texture,bumpScale:0.5,shading: this.shading, combine: THREE.MixOperation, reflectivity: 0});
                        success(new THREE.Mesh(object, matphong));


                    }
                    break;
                case 'depth':
                    var matDepth;
                    matDepth = new THREE.MeshDepthMaterial({ wireframe: this.wireframe});
                    success(new THREE.Mesh(object, matDepth));
                    break;
                case 'line':
                    var matlinebase;
                    matlinebase = new THREE.LineBasicMaterial({ vertexColors: this.color});
                    success(new THREE.Mesh(object, matlinebase));
                    break;
                case 'normal':
                    var matnormal;
                    matnormal = new THREE.MeshNormalMaterial({wireframe: this.wireframe});
                    success(new THREE.Mesh(object, matnormal));
                    break;
                case 'basic':
                    var matbasic;

                    if (this.texture != null) {
                        matbasic = new THREE.MeshBasicMaterial({ map: this.texture, color: 'rgb(255,255,255)', shading: this.shade, reflectivity: 0.5 });
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


    cm.update = function (editor) {

        var object = editor.selected;

        var geometry = object.geometry;
        var material = object.material;

        var textureWarning = false;
        var objectHasUvs = false;

        if (object instanceof THREE.Sprite) objectHasUvs = true;
        if (geometry instanceof THREE.Geometry && geometry.faceVertexUvs[ 0 ].length > 0) objectHasUvs = true;
        if (geometry instanceof THREE.BufferGeometry && geometry.attributes.uv !== undefined) objectHasUvs = true;

        if (material) {

            if (material.uuid !== undefined) {

                material.uuid = materialUUID.getValue();

            }

            if (material instanceof materialClasses[ materialClass.getValue() ] === false) {

                material = new materialClasses[ materialClass.getValue() ]();
                object.material = material;

            }

            if (material.color !== undefined) {

                material.color.setHex(materialColor.getHexValue());

            }

            if (material.emissive !== undefined) {

                material.emissive.setHex(materialEmissive.getHexValue());

            }

            if (material.specular !== undefined) {

                material.specular.setHex(materialSpecular.getHexValue());

            }

            if (material.shininess !== undefined) {

                material.shininess = materialShininess.getValue();

            }

            if (material.uniforms !== undefined) {

                material.uniforms = JSON.parse(materialUniforms.getValue());

            }

            if (material.vertexShader !== undefined) {

                material.vertexShader = materialVertexShader.getValue();

            }

            if (material.fragmentShader !== undefined) {

                material.fragmentShader = materialFragmentShader.getValue();

            }

            if (material.vertexColors !== undefined) {

                var vertexColors = parseInt(materialVertexColors.getValue());

                if (material.vertexColors !== vertexColors) {

                    if (geometry instanceof THREE.Geometry) {

                        geometry.groupsNeedUpdate = true;

                    }

                    material.vertexColors = vertexColors;
                    material.needsUpdate = true;

                }

            }

            if (material.skinning !== undefined) {

                material.skinning = materialSkinning.getValue();

            }

            if (material.map !== undefined) {

                var mapEnabled = materialMapEnabled.getValue() === true;

                if (objectHasUvs) {

                    material.map = mapEnabled ? materialMap.getValue() : null;
                    material.needsUpdate = true;

                } else {

                    if (mapEnabled) textureWarning = true;

                }

            }

            if (material.alphaMap !== undefined) {

                var mapEnabled = materialAlphaMapEnabled.getValue() === true;

                if (objectHasUvs) {

                    material.alphaMap = mapEnabled ? materialAlphaMap.getValue() : null;
                    material.needsUpdate = true;

                } else {

                    if (mapEnabled) textureWarning = true;

                }

            }

            /*
             if ( material.lightMap !== undefined ) {

             var lightMapEnabled = materialLightMapEnabled.getValue() === true;

             if ( objectHasUvs )  {

             material.lightMap = lightMapEnabled ? materialLightMap.getValue() : null;
             material.needsUpdate = true;

             } else {

             if ( lightMapEnabled ) textureWarning = true;

             }

             }
             */

            if (material.bumpMap !== undefined) {

                var bumpMapEnabled = materialBumpMapEnabled.getValue() === true;

                if (objectHasUvs) {

                    material.bumpMap = bumpMapEnabled ? materialBumpMap.getValue() : null;
                    material.bumpScale = materialBumpScale.getValue();
                    material.needsUpdate = true;

                } else {

                    if (bumpMapEnabled) textureWarning = true;

                }

            }

            if (material.normalMap !== undefined) {

                var normalMapEnabled = materialNormalMapEnabled.getValue() === true;

                if (objectHasUvs) {

                    material.normalMap = normalMapEnabled ? materialNormalMap.getValue() : null;
                    material.needsUpdate = true;

                } else {

                    if (normalMapEnabled) textureWarning = true;

                }

            }

            if (material.specularMap !== undefined) {

                var specularMapEnabled = materialSpecularMapEnabled.getValue() === true;

                if (objectHasUvs) {

                    material.specularMap = specularMapEnabled ? materialSpecularMap.getValue() : null;
                    material.needsUpdate = true;

                } else {

                    if (specularMapEnabled) textureWarning = true;

                }

            }

            if (material.envMap !== undefined) {

                var envMapEnabled = materialEnvMapEnabled.getValue() === true;

                material.envMap = envMapEnabled ? materialEnvMap.getValue() : null;
                material.reflectivity = materialReflectivity.getValue();
                material.needsUpdate = true;

            }

            if (material.side !== undefined) {

                material.side = parseInt(materialSide.getValue());

            }

            if (material.shading !== undefined) {

                material.shading = parseInt(materialShading.getValue());

            }

            if (material.blending !== undefined) {

                material.blending = parseInt(materialBlending.getValue());

            }

            if (material.opacity !== undefined) {

                material.opacity = materialOpacity.getValue();

            }

            if (material.transparent !== undefined) {

                material.transparent = materialTransparent.getValue();

            }

            if (material.wireframe !== undefined) {

                material.wireframe = materialWireframe.getValue();

            }

            if (material.wireframeLinewidth !== undefined) {

                material.wireframeLinewidth = materialWireframeLinewidth.getValue();

            }

            updateRows();

            signals.materialChanged.dispatch(material);

        }

        if (textureWarning) {

            console.warn("Can't set texture, model doesn't have texture coordinates");

        }

    };


})
(window.CFMaterial = window.CFMaterial || {});