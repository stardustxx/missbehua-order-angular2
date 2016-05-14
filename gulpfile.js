var gulp = require("gulp");
var clean = require("gulp-clean");
var cleancss = require("gulp-clean-css");
var stripeCssComments = require("gulp-strip-css-comments");
var uglify = require("gulp-uglify");
var gulpSequence = require("gulp-sequence");
var directoryMap = require("gulp-directory-map");
var beautify = require("gulp-beautify");
var del = require("del");

gulp.task("build", gulpSequence("del-dist", "directoryMap"));

gulp.task("directoryMap", function(){
  return gulp.src("./Product/**/*.jpg")
    .pipe(directoryMap({
      filename: "products.json"
    }))
    .pipe(beautify({indentSize: 1}))
    .pipe(gulp.dest("dist"));
});

gulp.task("del-dist", function(){
  del(["./dist/"]);
});
