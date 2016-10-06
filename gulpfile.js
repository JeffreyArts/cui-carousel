var gulp             = require('gulp');
var concat           = require('gulp-concat');
var connect          = require('gulp-connect');
var open             = require('gulp-open');
var plumber          = require('gulp-plumber');
var postcss          = require('gulp-postcss');
var rename           = require('gulp-rename');
var sass             = require('gulp-sass');
var uglify           = require('gulp-uglify');
var minify           = require('gulp-minify');
var autoprefixer     = require('autoprefixer');
var cssnano          = require('cssnano');
var postcssCalc      = require('postcss-calc');
var livereload       = require('gulp-livereload');


////////////////////////////////////////////////////////////////////////////////
// Configuration
////////////////////////////////////////////////////////////////////////////////
var wwwDev = './';

// Watchable directories/files      ////////////////////////////////////////////
var watching   = {
    default: {
        scss: [
            './_scss/*.scss',
            './_scss/**/*.scss',
        ],
        js: [
            './_js/*.js',
            './_js/**/*.js',
        ]
    }
};

// Source file(s)       ////////////////////////////////////////////////////////
var source    = {
    default: {
        scss: [
			'./_scss/index.scss'
        ],
        js: [
            // './_js/api.js',
            // './_js/helper.js',
            // './_js/helpers/initialize.js',
            // './_js/helpers/node-inserted.js',
            // './_js/helpers/change-dialog-state.js',
            // './_js/events.js',
        ]
    },
};


// Destination directory        ////////////////////////////////////////////////
var destination    = {
    default: {
        css:     wwwDev + '/css',
        js:      wwwDev + '/lib'
    }
};



////////////////////////////////////////////////////////////////////////////////
// Variables
////////////////////////////////////////////////////////////////////////////////

var app = '';
var www = '';
var cssName = '';
var port = 5000;

gulp.task('var:default',function() {
	app     = 'default';
	cssName = 'cui-carousel';
    jsName  = 'cui-carousel';
    port    = port;
    www     = wwwDev;
});



////////////////////////////////////////////////////////////////////////////////
// CSS
////////////////////////////////////////////////////////////////////////////////

gulp.task('scss->css', function () {
    var processors = [
        autoprefixer({browsers: ['last 3 versions']})
    ];
    return gulp.src(source[app].scss)
        .pipe(plumber())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(rename(cssName + '.css'))
        .pipe(gulp.dest(destination[app].css))
        .pipe(livereload())
});

gulp.task('watch:scss', function () {
    livereload.listen();
    gulp.watch(watching[app].scss,['scss->css']);
});

gulp.task('minify:scss', function () {
    var processors = [
        autoprefixer({browsers: ['last 20 versions']}),
        postcssCalc(),
        cssnano()
    ];


    return gulp.src(source[app].scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss(processors))
        .pipe(concat(cssName + '.min.css'))
        .pipe(gulp.dest(destination[app].css))
});


////////////////////////////////////////////////////////////////////////////////
// Javascript
////////////////////////////////////////////////////////////////////////////////

gulp.task('minify:js',function() {
    return gulp.src(source[app].js)
            .pipe(concat(jsName + '.min.js'))
            .pipe(uglify())
        	.pipe(gulp.dest(destination[app].js))
});

gulp.task('move:js',function() {
    return gulp.src(source[app].js)
            .pipe(concat(jsName + '.js'))
        	.pipe(gulp.dest(destination[app].js))
});

gulp.task('watch:js',function() {
    gulp.watch(watching[app].js,['move:js']);
});



////////////////////////////////////////////////////////////////////////////////
// Server
////////////////////////////////////////////////////////////////////////////////

gulp.task('start-server', function() {
    connect.server({
        port: port,
        root: www,
        http: false
    })

    gulp.src(__filename)
        .pipe(
            open({
                uri: 'http://localhost:' + port
            })
        );
});


////////////////////////////////////////////////////////////////////////////////
// Task Wrappers
////////////////////////////////////////////////////////////////////////////////

gulp.task('dev+css',    ['scss->css','watch:scss'                               ]);
gulp.task('dev+js',     ['move:js' , 'watch:js'                                 ]);

gulp.task('build+css',    ['scss->css', 'minify:scss'                           ]);
gulp.task('build+js',     ['move:js', 'minify:js'                               ]);



////////////////////////////////////////////////////////////////////////////////
// Callable Tasks
////////////////////////////////////////////////////////////////////////////////

gulp.task('default', [  'var:default',
                        'dev+js',
                        'dev+css'
                        //'start-server'
        ]);
gulp.task('build', [  'var:default',
                        'build+js',
                        'build+css'
        ]);