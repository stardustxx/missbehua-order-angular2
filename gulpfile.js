var gulp = require("gulp");
var clean = require("gulp-clean");
var cleancss = require("gulp-clean-css");
var stripeCssComments = require("gulp-strip-css-comments");
var uglify = require("gulp-uglify");
var gulpSequence = require("gulp-sequence");
var directoryMap = require("gulp-directory-map");
var beautify = require("gulp-beautify");
var concat = require("gulp-concat");
var del = require("del");

// gulp.task("build", gulpSequence("directoryMap"));
gulp.task("build-dist", ["directoryMap", "move-html", "move-dist-dep-js", "build-dist-dep-css", "move-view-css"]);
gulp.task("build-dev", ["move-dev-dep-js", "build-dev-css"]);

gulp.task("move-dev-dep-js", function(){
  return gulp.src([
    "./node_modules/es6-shim/es6-shim.min.js",
    "./node_modules/zone.js/dist/zone.js",
    "./node_modules/reflect-metadata/Reflect.js",
    "./node_modules/jquery/dist/jquery.min.js",
    "./node_modules/tether/dist/js/tether.min.js",
    "./node_modules/bootstrap/dist/js/bootstrap.min.js",
    "./node_modules/intl/dist/Intl.min.js",
    "./node_modules/intl/locale-data/jsonp/en.js",
    "./node_modules/intl/locale-data/jsonp/zh.js"
  ])
  .pipe(gulp.dest("./dev/js/"));
});

gulp.task("build-dev-css", function(){
  return gulp.src([
    "./node_modules/tether/dist/css/tether.min.css",
    "./node_modules/bootstrap/dist/css/bootstrap.min.css",
    "./node_modules/font-awesome/css/font-awesome.min.css"
  ])
  .pipe(concat("project.css"))
  .pipe(gulp.dest("./dev/css/"));
});

gulp.task("directoryMap", function(){
  return gulp.src("./Product/**/*.jpg")
    .pipe(directoryMap({
      filename: "products.json"
    }))
    .pipe(beautify({indentSize: 1}))
    .pipe(gulp.dest("./dev/"));
});

gulp.task("move-view-css", function(){
  return gulp.src("./css/**/*")
    .pipe(gulp.dest("./dist/css/"));
});

gulp.task("move-html", function(){
  return gulp.src("./app/**/*.html")
    .pipe(gulp.dest("./dist/app/"));
});

gulp.task("move-dist-dep-js", function(){
  return gulp.src([
    "./node_modules/es6-shim/es6-shim.min.js",
    "./node_modules/zone.js/dist/zone.js",
    "./node_modules/reflect-metadata/Reflect.js",
    "./node_modules/jquery/dist/jquery.min.js",
    "./node_modules/tether/dist/js/tether.min.js",
    "./node_modules/bootstrap/dist/js/bootstrap.min.js",
    "./node_modules/intl/dist/Intl.min.js",
    "./node_modules/intl/locale-data/jsonp/en.js",
    "./node_modules/intl/locale-data/jsonp/zh.js"
  ])
  .pipe(gulp.dest("./dist/js/"));
});

gulp.task("build-dist-dep-css", function(){
  return gulp.src([
    "./node_modules/tether/dist/css/tether.min.css",
    "./node_modules/bootstrap/dist/css/bootstrap.min.css",
    "./node_modules/font-awesome/css/font-awesome.min.css"
  ])
  .pipe(concat("project.css"))
  .pipe(gulp.dest("./dist/css/"));
});

gulp.task("del-prod", function(){
  del(["./production/"]);
});
