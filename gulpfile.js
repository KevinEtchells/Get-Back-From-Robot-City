/*eslint-env es6, node*/
/*eslint no-console: ["error", { allow: ["log", "error"] }]*/

(function () {

    "use strict";

    const exec = require('child_process').exec;
    const gulp = require("gulp");
    //const uglify = require("gulp-uglify-es").default;
    //const modifyFile = require("gulp-modify-file");
    const zip = require("gulp-zip");
    const htmlmin = require("gulp-htmlmin");
    const minifyInline = require("gulp-minify-inline");
    const inlinesource = require('gulp-inline-source');

    gulp.task("default", function (complete) {

        const TASK_COUNT = 2;
        let completedTasks = 0;

        const taskCompleted = function (msg) {
            console.log(msg);
            completedTasks = completedTasks + 1;
            if (completedTasks === TASK_COUNT) {

                // zip all files
                gulp.src("build/**")
                    .pipe(zip("build.zip"))
                    .pipe(gulp.dest("./"))
                    .on("end", function () {
                        console.log("Create ZIP file");

                        // Recompress zip using advzip (http://www.advancemame.it/download)
                        // (should save around 1KB off original 13KB zip)
                        exec("advzip.exe -z build.zip -4", function () {
                            console.log("Recompress ZIP file with advzip");
                            complete();
                        });

                    });

            }
        };

        // Uglify JS and save to build directory
        /*
        gulp.src("controller.js")
            .pipe(uglify())
            .on("error", function (err) {
                console.log(err.toString());
            })
            .pipe(gulp.dest("build/"))
            .on("end", function () {
                taskCompleted("Uglify JS");
            });
        */

        
        gulp.src("index.html")
            .pipe(inlinesource())
            .pipe(gulp.dest("build/"))
            .on("end", function () {

                gulp.src("build/index.html")
                .pipe(minifyInline())
                .pipe(gulp.dest("build/"))
                .on("end", function () {

                    gulp.src("build/index.html")
                    .pipe(htmlmin({keepClosingSlash: true, removeComments: true}))
                    .pipe(gulp.dest("build/"))
                    .on("end", function () {
                        taskCompleted("Minify HTML");
                    });

                });

            });
        

        // copy assets
        gulp.src("feet.png")
            .pipe(gulp.dest("build/"))
            .on("end", function () {
                taskCompleted("Copy assets");
            });

    });

}());
