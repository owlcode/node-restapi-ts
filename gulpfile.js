var gulp = require("gulp");
var ts = require("gulp-typescript");
var watch = require("gulp-watch");
var tsProject = ts.createProject("tsconfig.json");
var tslint = require("gulp-tslint");
var exec = require('child_process').exec;

gulp.task("default", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

gulp.task("watch", function () {
    return watch('api/**/*.ts', { ignoreInitial: false })
        .pipe(tsProject())
        .js.pipe(gulp.dest("dist"));
});

gulp.task("linter", function () {
    return tsProject.src()
        .pipe(tslint({formatter: "verbose"}))
        .pipe(tslint.report())
});

gulp.task("test", function () {
    gulp.src("dist/test/**")
      .pipe(gulp.dest('test'));
});

gulp.task("seed", function() {
    exec('node dist/components/seed/index.js', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
  });
})