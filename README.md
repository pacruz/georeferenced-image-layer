# Georeferenced Image Layer

A prototype custom layer implementation that allows for an image (PNG, JPG, etc.) to be placed at a specified extent.

##  Example use

2D and 3D examples are available in the test-2d.html and test-3d.html files.

```javascript
var georefImage = new GeoreferencedImageLayer({
    url: './DistanceFromRoads1.png',
    opacity: 0.7,
    imgExtent: {
        ymax: 4606920.533,
        xmin: -13346827.380,
        xmax: -13267864.972,
        ymin: 4507066.583,
        spatialReference: {
            wkid: 102100
        }
    }
});
```

## Known issues

* This assumes web mercator, but could likely be modified to handle custom projections if needed.
