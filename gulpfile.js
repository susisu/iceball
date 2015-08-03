var gulp    = require("gulp"),
    webpack = require("gulp-webpack");

var packageInfo = require("./package.json");
var banner      = "iceball " + packageInfo.version + "\n\
copyright (c) 2015 Susisu | MIT License\n\
https://github.com/susisu/iceball";

gulp.task("webpack", function () {
    return gulp.src("./lib/iceball.js")
        .pipe(webpack({
            "output": {
                "libraryTarget": "var",
                "library"      : "iceball",
                "sourcePrefix" : "    ",
                "filename"     : "iceball.js"
            },
            "externals": {
                "loquat": true
            },
            "plugins": [
                new webpack.webpack.BannerPlugin(
                    banner,
                    { "entryOnly": true }
                )
            ]
        }))
        .pipe(gulp.dest("./dist"));
});

gulp.task("webpack-min", function () {
    return gulp.src("./lib/iceball.js")
        .pipe(webpack({
            "output": {
                "libraryTarget": "var",
                "library"      : "iceball",
                "sourcePrefix" : "    ",
                "filename"     : "iceball.min.js",
            },
            "externals": {
                "loquat": true
            },
            "plugins": [
                new webpack.webpack.optimize.UglifyJsPlugin(),
                new webpack.webpack.BannerPlugin(
                    banner,
                    { "entryOnly": true }
                )
            ]
        }))
        .pipe(gulp.dest("./dist"));
});

gulp.task("build", ["webpack", "webpack-min"]);

gulp.task("default", ["build"]);
