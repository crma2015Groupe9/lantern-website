'use strict';

var path = require('path');

var stringColor = require('string-color');
var gulp = require('gulp');
var stylus = require('gulp-stylus');
var nib = require('nib');
var jeet = require('jeet');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var watch = require('gulp-watch');
var batch = require('gulp-batch');

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

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

var stylesheetsVendors = [];
stylesheetsVendors.push(path.join(sourcePath, 'stylesheets/vendors/slick.css'));

var htmlFilesToConcat = [];
htmlFilesToConcat.push(path.join(sourcePath, 'top.html'));
htmlFilesToConcat.push(path.join(sourcePath, 'content/*.html'));
htmlFilesToConcat.push(path.join(sourcePath, 'bottom.html'));

var fallbackPath = path.join(sourcePath, 'bower_components/fallback/fallback.min.js');

var javascriptVendors = [];
javascriptVendors.push(path.join(sourcePath, 'bower_components/jquery/dist/jquery.min.js'));
javascriptVendors.push(path.join(sourcePath, 'javascript/vendors/pxloader-all.min.js'));
javascriptVendors.push(path.join(sourcePath, 'javascript/vendors/modernizr.min.js'));
javascriptVendors.push(path.join(sourcePath, 'javascript/vendors/jquery.color.js'));
javascriptVendors.push(path.join(sourcePath, 'javascript/vendors/slick.min.js'));

var javascriptsFilesToConcat = [];
javascriptsFilesToConcat.push(path.join(sourcePath, 'javascript/classes/*.js'));
javascriptsFilesToConcat.push(path.join(sourcePath, 'javascript/main.js'));

var fontsToWatch = [];
fontsToWatch.push(path.join(sourcePath, 'fonts/*.eot'));
fontsToWatch.push(path.join(sourcePath, 'fonts/*.svg'));
fontsToWatch.push(path.join(sourcePath, 'fonts/*.ttf'));
fontsToWatch.push(path.join(sourcePath, 'fonts/*.woff'));
fontsToWatch.push(path.join(sourcePath, 'fonts/*.woff2'));

var imagesToWatch = [];
imagesToWatch.push(path.join(sourcePath, ('images/**')));

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

gulp.task('stylesheets-vendor', function () {
	gulp.src(fallbackPath)
		.pipe(plumber())
		.pipe(gulp.dest(buildPath));

	gulp.src(stylesheetsVendors)
		.pipe(plumber())
		.pipe(concat('stylesheets-vendor.css'))
		.pipe(gulp.dest(buildPath));
});

gulp.task('stylesheets', function () {
	gulp.src(stylusMainFile)
		.pipe(plumber())
		.pipe(sourcemaps.init())
		.pipe(stylus({
			use: [nib(), jeet()],
			compress: true
		}))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(buildPath))
});

gulp.task('javascript-vendor', function () {
	gulp.src(fallbackPath)
		.pipe(plumber())
		.pipe(gulp.dest(buildPath));

	gulp.src(javascriptVendors)
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

gulp.task('build', ['images', 'stylesheets-vendor', 'stylesheets', 'javascript-vendor', 'javascript', 'html', 'fonts']);

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

	watch(fontsToWatch, batch(function (events, done) {
		gulp.start('fonts', done);
	}));

	watch(imagesToWatch, batch(function (events, done) {
		gulp.start('images', done);
	}));
});

gulp.task('fonts', function () {
	gulp.src(fontsToWatch)
		.pipe(plumber())
		.pipe(gulp.dest(path.join(buildPath, 'fonts')));
});

gulp.task('images', function () {
	gulp.src(imagesToWatch)
		.pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(path.join(buildPath, 'images')));
})

gulp.task('server', ['build', 'watch', 'connect'], function () {
	watch([buildPath+'/**'], batch(function (events, done) {
		gulp.start('livereload', done);
	}))
});

gulp.task('default', ['build']);



