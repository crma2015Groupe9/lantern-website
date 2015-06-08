'use strict';

var path = require('path');

var stringColor = require('string-color');
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var nib = require('nib');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var batch = require('gulp-batch');

var open = require('open');
var connect = require('gulp-connect');

/*----------------------------------*/
/*----------------------------------*/
/*----------------------------------*/

var sourcePath = './sources';
var buildPath = './build';

var stylusMainFile = path.join(sourcePath, 'stylesheets/main.styl');
var stylesheetsPathToWatch = [];
stylesheetsPathToWatch.push(path.join(sourcePath, 'stylesheets/*.styl'));
stylesheetsPathToWatch.push(path.join(sourcePath, 'stylesheets/components/*.styl'));

var htmlFilesToConcat = [];
htmlFilesToConcat.push(path.join(sourcePath, 'top.html'));
htmlFilesToConcat.push(path.join(sourcePath, 'body.html'));
htmlFilesToConcat.push(path.join(sourcePath, 'bottom.html'));

var fallbackPath = path.join(sourcePath, 'bower_components/fallback/fallback.min.js');

var bowerComponentsFilesToConcat = [];
bowerComponentsFilesToConcat.push(path.join(sourcePath, 'bower_components/jquery/dist/jquery.min.js'));

var javascriptsFilesToConcat = [];
javascriptsFilesToConcat.push(path.join(sourcePath, 'javascript/classes/*.js'));
javascriptsFilesToConcat.push(path.join(sourcePath, 'javascript/main.js'));

/*----------------------------------*/
/*----------------------------------*/
/*----------------------------------*/

var browserYetOpen = false;

gulp.task('connect', function() {
  connect.server({
    root: buildPath,
    livereload: true
  });
});

gulp.task('livereload', function() {
	gulp.src(buildPath+'/**')
		.pipe(plumber())
		.pipe(connect.reload());

	if (!browserYetOpen) {
		open('http://localhost:8080');
		browserYetOpen = true;
	}
});

/*----------------------------------*/
/*----------------------------------*/
/*----------------------------------*/

gulp.task('stylesheets', function () {
	gulp.src(stylusMainFile)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(stylus({
			use: nib(),
			compress: true
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(buildPath))
});

gulp.task('javascript-vendor', function () {
	gulp.src(fallbackPath)
		.pipe(plumber())
		.pipe(gulp.dest(buildPath));

	gulp.src(bowerComponentsFilesToConcat)
		.pipe(plumber())
		.pipe(concat('javascript-vendor.js'))
		.pipe(gulp.dest(buildPath));
});

gulp.task('javascript', function () {
	gulp.src(javascriptsFilesToConcat)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(concat('main.min.js'))
		.pipe(uglify({
	        compress: {
	            negate_iife: false
	        }
	    }))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(buildPath));
});

gulp.task('html', function () {
	gulp.src(htmlFilesToConcat)
		.pipe(plumber())
		.pipe(concat('index.html'))
		.pipe(gulp.dest(buildPath));
});

gulp.task('build', ['stylesheets', 'javascript-vendor', 'javascript', 'html']);

gulp.task('watch', function () {
	watch(htmlFilesToConcat, batch(function (events, done) {
		gulp.start('html', done);
	}));

	watch(stylesheetsPathToWatch, batch(function (events, done) {
		gulp.start('stylesheets', done);
	}));

	watch(javascriptsFilesToConcat, batch(function (events, done) {
		gulp.start('javascript', done);
	}));
});

gulp.task('server', ['build', 'watch', 'connect'], function () {
	watch([buildPath+'/**'], batch(function (events, done) {
		gulp.start('livereload', done);
	}))
});

gulp.task('default', ['build']);



