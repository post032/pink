"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
// var csso = require("gulp-csso");
// var rename = require("gulp-rename");
// var imagemin = require("gulp-imagemin");
// var svgstore = require("gulp-svgstore");
// var posthtml = require("gulp-posthtml");
// var include = require("posthtml-include");
// var del = require("del");
var pug = require("gulp-pug");

// sass.compiler = require('node-sass');

gulp.task("html", function(){
	return gulp.src("source/pug/*.pug")
	.pipe(plumber())
	.pipe(pug())
	.pipe(gulp.dest("source"));
});

gulp.task('css', function () {
  return gulp.src("source/sass/style.scss")
		.pipe(plumber())
    .pipe(sass())
		.pipe(postcss([
			autoprefixer()
		]))
    .pipe(gulp.dest("source/css"));
});

gulp.task("server", function(){
	server.init({
		server: "source/"
	});
	gulp.watch("source/**/*.{sass,scss}",gulp.series("css"))
	gulp.watch("source/**/*.pug",gulp.series("html"));
	// gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("start", gulp.series("html", "css", "server"));

// "use strict";
//
// var gulp = require("gulp");
// var less = require("gulp-less");
// var plumber = require("gulp-plumber");
// var postcss = require("gulp-postcss");
// var autoprefixer = require("autoprefixer");
// var server = require("browser-sync").create();
// var csso = require("gulp-csso");
// var rename = require("gulp-rename");
// var imagemin = require("gulp-imagemin");
// var svgstore = require("gulp-svgstore");
// var posthtml = require("gulp-posthtml");
// var include = require("posthtml-include");
// var del = require("del");
//
// gulp.task("css", function() {
//   return gulp.src("source/less/style.less")
//     .pipe(plumber())
//     .pipe(less())
//     .pipe(postcss([
//       autoprefixer()
//     ]))
//     .pipe(gulp.dest("build/css"))
//     .pipe(csso())
//     .pipe(rename("style.min.css"))
//     .pipe(gulp.dest("build/css"))
//     .pipe(server.stream());
// });
// gulp.task("server", function() {
//   server.init({
//     server: "build/",
//     notify: false,
//     open: true,
//     cors: true,
//     ui: false
//   });
//
//   gulp.watch("source/less/**/*.less", gulp.series("css"));
//   gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "html", "refresh"));
//   gulp.watch("source/*.html", gulp.series("html", "refresh"));
// });
// gulp.task("images", function() {
//   return gulp.src("source/img/**/*.{png,jpg,svg}")
//     .pipe(imagemin([
//       imagemin.optipng({
//         optimizationlevel: 3
//       }),
//       imagemin.jpegtran({
//         progressive: true
//       }),
//       imagemin.svgo()
//     ]))
//     .pipe(gulp.dest("source/img"));
// });
// gulp.task("sprite", function() {
//   return gulp.src("source/img/s-*.svg")
//     .pipe(svgstore({
//       inlineSvg: true
//     }))
//     .pipe(gulp.dest("build/img"));
// });
// gulp.task("html", function() {
//   return gulp.src("source/*.html")
//     .pipe(posthtml([
//       include()
//     ]))
//     .pipe(gulp.dest("build"));
// });
// gulp.task("copy", function() {
//   return gulp.src([
//       "source/fonts/**/*.{woff, woff2}",
//       "source/img/**",
//       "source/js/**"
//     ], {
//       base: "source"
//     })
//     .pipe(gulp.dest("build"));
// });
// gulp.task("clean", function() {
//   return del("build");
// })
// gulp.task("refresh", function(done) {
//   server.reload();
//   done;
// });
//
// gulp.task("build", gulp.series("clean", "copy", "css", "sprite", "html"));
// gulp.task("start", gulp.series("build", "server"));
