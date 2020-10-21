const capture = require("capture-website");
const sharp = require('sharp');
const smartcrop = require('smartcrop-sharp');
const fs = require("fs");

const IMAGE_WIDTH = process.argv[3] ? parseInt(process.argv[3]) : 1200;
const IMAGE_HEIGHT = process.argv[4] ? parseInt(process.argv[4]) : 630;

const crop = (src, dest) => {
    return smartcrop.crop(src, {
            width: IMAGE_WIDTH,
            height: IMAGE_HEIGHT,
            ruleOfThirds: false
        })
        .then(function (result) {
            const crop = result.topCrop;
            sharp(src)
                .extract({
                    width: crop.width,
                    height: crop.height,
                    left: crop.x,
                    top: crop.y
                })
                .resize(IMAGE_WIDTH, IMAGE_HEIGHT)
                .toFile(dest).then(function () {
                    fs.unlink("temp.png", function (error) {
                        if (error) {
                            console.log(error);
                        }
                    });
                });
        }, function (error) {
            console.log(error);
        })
}

if (!process.argv[2]) {
    throw "You must specify a URL or local HTML file, e.g. 'node thumb.js https://grouptag.cool'";
}

capture.file(process.argv[2], "temp.png", {
        fullPage: true,
        overwrite: true,
        height: 4000
    })
    .then(function (success) {
        console.log("Image successfully downloaded.");
        crop("temp.png", "out.png");
    }, function (error) {
        console.log(error);
    });