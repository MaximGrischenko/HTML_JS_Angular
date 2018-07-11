'use strict';

const gulp = require('gulp'),                     //основной плагин gulp
  watch = require('gulp-watch'),                  //расширение возможностей watch
  prefixer = require('gulp-autoprefixer'),        //расставление автопрефиксов
  uglify = require('gulp-uglify'),                //минификация js
  less = require('gulp-less'),                    //препроцессор less
  rename = require('gulp-rename'),                //переименовывание файлов
  sourcemaps = require('gulp-sourcemaps'),        //
  rigger = require('gulp-rigger'),                //работа с include в html и js
  cleancss = require('gulp-clean-css'),           //минификация css
  gcmq = require('gulp-group-css-media-queries'), //группирование медиа запросов
  imagemin = require('gulp-imagemin'),            //минификация изображений
  pngquant = require('gulp-pngquant'),            //дополнение к минификации изображений
  svgSprite = require('gulp-svg-sprite'),
  replace = require("gulp-replace"),
  cheerio = require("gulp-cheerio"),
  rimraf = require('rimraf'),                     //очистка директории
  browserSync = require("browser-sync"),          //атоматическая перезагрузка
  smartgrid = require("smart-grid"),
  reload = browserSync.reload;

const settings = {
  outputStyle: 'less',
  columns: 12,
  offset: '30px',
  container: {
    maxWidth: '1440px',
    fields: '15px'
  },
  breakPoints: {
    md: {
      width: "1170px",
      fields: "30px"
    },
    sm: {
      width: "768px",
      fields: "20px"
    },
    xs: {
      width: "480px",
      fields: "10px"
    }
  },
  properties: [
    'justify-content'
  ]
};

var path = {
  dest: {
    html: 'build/',
    js: 'build/assets/js/',
    css: 'build/assets/styles/',
    precss: 'src/assets/styles/partials',
    img: 'build/assets/images/',
    svg: 'build/assets/',
    fonts: 'build/assets/fonts/'
  },
  src: {
    html: 'src/index.html',
    js: 'src/assets/js/main.js',
    style: 'src/assets/styles/main.less',
    img: 'src/assets/images/*.*',
    svg: 'src/assets/svg-separate/*.svg',
    fonts: 'src/assets/fonts/**/*.*'
  },
  watch: {
    html: 'src/**/*.html',
    js: 'src/assets/js/**/*.js',
    style: 'src/assets/styles/**/*.less',
    img: 'src/assets/images/*.*',
    svg: 'src/assets/svg-separate/*.svg',
    fonts: 'src/assets/fonts/**/*.*'
  },
  clean: './build'
};

var config = {
  server: {
    baseDir: "./build"
  },
  tunnel: true,
  host: 'localhost',
  port: 8000,
  logPrefix: "FrontEnd",
  open: true,
  notify: false
};

var svg_config = {
  shape: {
    dimension: {         // Set maximum dimensions
      maxWidth: 32,
      maxHeight: 32
    },
    spacing: {         // Add padding
      padding: 0
    }
  },
  mode: {
    symbol: {
      dest : '.'
    }
  }
};

gulp.task('webserver', function () {
  browserSync(config);
});

gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});

gulp.task('html:build', function () {
  gulp.src(path.src.html)
    .pipe(rigger())
    .pipe(gulp.dest(path.dest.html))
    .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
  gulp.src(path.src.js)
    .pipe(sourcemaps.init())
    .pipe(rigger())
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(path.dest.js))
    .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
  gulp.src(path.src.style)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(gcmq())
    .pipe(prefixer({
      browsers: ['> 0.5%'],
      cascade: false
    }))
    .pipe(cleancss({
      level: 1
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(rename({suffix: ".min"}))
    .pipe(gulp.dest(path.dest.css))
    .pipe(reload({stream: true}));
});

gulp.task('smartgrid:build', function () {
  smartgrid(path.dest.precss, settings);
});

gulp.task('image:build', function () {
  gulp.src(path.src.img)
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()],
      interlaced: true
    }))
    .pipe(gulp.dest(path.dest.img))
    .pipe(reload({stream: true}));
});

gulp.task('svg-sprite:build', function (cb) {
  return gulp.src(path.src.svg)
    .pipe(cheerio({
      run: function($) {
        $("[fill]").removeAttr("fill");
        $("[stroke]").removeAttr("stroke");
        $("[style]").removeAttr("style");
      },
      parserOptions: {xmlMode: true}
    }))
    .pipe(replace("&gt;", ">"))
    .pipe(svgSprite(svg_config))
    .pipe(gulp.dest(path.dest.svg));
});

gulp.task('fonts:build', function() {
  gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.dest.fonts))
});

gulp.task('build', [
  'image:build',
  'html:build',
  'js:build',
  'smartgrid:build',
  'style:build',
  'fonts:build',
  'svg-sprite:build'
]);

gulp.task('watch', function(){
  watch([path.watch.html], function(event, cb) {
    gulp.start('html:build');
  });
  watch([path.watch.style], function(event, cb) {
    gulp.start('style:build');
  });
  watch([path.watch.js], function(event, cb) {
    gulp.start('js:build');
  });
  watch([path.watch.img], function(event, cb) {
    gulp.start('image:build');
  });
  watch([path.watch.svg], function(event, cb) {
    gulp.start('svg-sprite:build');
  });
  watch([path.watch.fonts], function(event, cb) {
    gulp.start('fonts:build');
  });
});

gulp.task('default', ['build', 'webserver', 'watch']);