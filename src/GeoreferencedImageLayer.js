define([
        'esri/layers/BaseDynamicLayer',
        'esri/geometry/Point'
    ],
    function(
        BaseDynamicLayer, Point
    ) {
        var GeoreferencedImageLayer = BaseDynamicLayer.createSubclass({
            declaredClass: 'esrips.layer.GeoreferencedImageLayer',
            properties: {
                url: null,
                imgExtent: null
            },
            load: function() {
                this._img = new Image();
                this._img.src = this.url;

                this._upperLeftMerc = new Point({
                    x: this.imgExtent.xmin,
                    y: this.imgExtent.ymax,
                    spatialReference: { wkid: 102100 }
                });
                this._lowerRightMerc = new Point({
                    x: this.imgExtent.xmax,
                    y: this.imgExtent.ymin,
                    spatialReference: { wkid: 102100 }
                });
            },
            getImageUrl: function(extent, width, height) {
                var outCanvas = document.createElement('canvas');
                outCanvas.width = width;
                outCanvas.height = height;
                var outCtx = outCanvas.getContext('2d');

                //TODO: project bounding points to "extent" projection
                var newULX = (this._upperLeftMerc.x - extent.xmin) / (extent.xmax - extent.xmin) * width;
                var newULY = height - (this._upperLeftMerc.y - extent.ymin) / (extent.ymax - extent.ymin) * height;

                var newLRX = (this._lowerRightMerc.x - extent.xmin) / (extent.xmax - extent.xmin) * width;
                var newLRY = height - (this._lowerRightMerc.y - extent.ymin) / (extent.ymax - extent.ymin) * height;

                var imageWidth = Math.abs(newLRX - newULX);
                var imageHeight = Math.abs(newULY - newLRY);

                outCtx.drawImage(this._img, newULX, newULY, imageWidth, imageHeight);

                return outCanvas.toDataURL();

            }
        });

        return GeoreferencedImageLayer;
    });