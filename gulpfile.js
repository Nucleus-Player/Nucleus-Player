const _ = require('lodash');
const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const less = require('gulp-less');
const cssmin = require('gulp-cssmin');
const concat = require('gulp-concat');
const packager = require('electron-packager');
const spawn = require('child_process').spawn;

const paths = {
  clientScripts: ['src/assets/js/**/*.js'],
  externalScripts: ['node_modules/gmusic.js/dist/gmusic.min.js',
                    'node_modules/gmusic-theme.js/dist/gmusic-theme.min.js',
                    'node_modules/gmusic-mini-player.js/dist/gmusic-mini-player.min.js'],
  injectScripts: 'src/assets/inject/**/*.js',
  less: 'src/assets/less/**/*.less',
  fonts: 'node_modules/materialize-css/dist/font/**/*',
  images: ['src/assets/icons/**/*', 'src/assets/img/**/*'],
};

const packageJSON = require('./package.json');
const defaultPackageConf = {
  dir: '.',
  name: packageJSON.productName,
  version: packageJSON.dependencies['electron-prebuilt'].substr(1),
  platform: 'all',
  arch: 'all',
  'app-bundle-id': 'nucleus.player',
  'app-version': packageJSON.version,
  icon: './build/img/main',
  out: './dist/',
  overwrite: true,
  prune: true,
  ignore: 'dist/.*',
};

const cleanGlob = (glob) => {
  return () => {
    return gulp.src(glob, { read: false })
      .pipe(clean({ force: true }));
  };
};

gulp.task('clean', cleanGlob('./build'));
gulp.task('clean-build', cleanGlob('./build'));
gulp.task('clean-dist', cleanGlob('./dist/Nucleus Player-win32-ia32'));
gulp.task('clean-external', cleanGlob('./build/js/external.js'));
gulp.task('clean-client', cleanGlob('./build/js/client'));
gulp.task('clean-inject', cleanGlob('./build/js/inject'));
gulp.task('clean-less', cleanGlob('./build/css'));
gulp.task('clean-fonts', cleanGlob('./build/font'));
gulp.task('clean-images', cleanGlob('./build/img'));

gulp.task('external', ['clean-external'], () => {
  return gulp.src(paths.externalScripts)
    .pipe(concat('external.js'))
    .pipe(gulp.dest('./build/js'));
});

gulp.task('materialize-js', ['clean-client'], () => {
  return gulp.src('node_modules/materialize-css/dist/js/materialize.min.js')
    .pipe(gulp.dest('./build/js/client'));
});

gulp.task('transpile-client', ['materialize-js'], () => {
  return gulp.src(paths.clientScripts)
    .pipe(babel({
      presets: ['es2015'],
    }))
    .on('error', (err) => { console.error(err); })
    .pipe(gulp.dest('./build/js/client'));
});

gulp.task('transpile-inject', ['clean-inject'], () => {
  return gulp.src(paths.injectScripts)
    .pipe(babel({
      presets: ['es2015'],
    }))
    .on('error', (err) => { console.error(err); })
    .pipe(gulp.dest('./build/js/inject'));
});

gulp.task('transpile', ['transpile-client', 'transpile-inject']);

gulp.task('fonts', ['clean-fonts'], () => {
  return gulp.src(paths.fonts)
    .pipe(gulp.dest('./build/font'));
});

gulp.task('less', ['clean-less', 'fonts'], () => {
  return gulp.src(paths.less)
    .pipe(less())
    .pipe(cssmin())
    .pipe(concat('core.css'))
    .pipe(gulp.dest('./build/css'));
});

// Copy all static images
gulp.task('images', ['clean-images'], () => {
  return gulp.src(paths.images)
    .pipe(gulp.dest('./build/img/'));
});

// Rerun the task when a file changes
gulp.task('watch', () => {
  gulp.watch(paths.clientScripts, ['transpile-client']);
  gulp.watch(paths.injectScripts, ['transpile-inject']);
  gulp.watch(paths.images, ['images']);
  gulp.watch(paths.less, ['less']);
});

gulp.task('package-win', ['clean', 'clean-dist', 'build'], (done) => {
  packager(_.extend({}, defaultPackageConf, { platform: 'win32', arch: 'ia32' }), done);
});

gulp.task('package-darwin', ['clean', 'clean-dist', 'build'], (done) => {
  packager(_.extend({}, defaultPackageConf, { platform: 'darwin' }), () => {
    const child = spawn('zip', ['-r', '-y', 'Nucleus\ Player.zip', 'Nucleus\ Player.app'], {
      cwd: './dist/Nucleus Player-darwin-x64',
    });

    console.log('Zipping "Nucleus Player.app"'); // eslint-disable-line

    // spit stdout to screen
    child.stdout.on('data', function (data) {   process.stdout.write(data.toString());  });


    // Send stderr to the main console
    child.stderr.on('data', (data) => {
      process.stdout.write(data.toString());
    });

    child.on('close', (code) => {
      console.log('Finished zipping with code ' + code); // eslint-disable-line
      done();
    });
  });
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'transpile', 'images']);
gulp.task('build', ['clean-build', 'external', 'transpile', 'images', 'less']);
gulp.task('package', ['package-win', 'package-darwin']);
