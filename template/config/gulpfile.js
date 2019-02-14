const gulp = require('gulp'),
      iconv = require('gulp-iconv'),
      replace = require('gulp-replace'),
      zip = require('gulp-zip'),
      os = require('os'),
      homeDir = os.homedir(),
      gameInfo = require('./package.json');

let gameDir = gameInfo.gameDir;
let buildDir = gameInfo.gameDir;
let targetLnik = gameInfo.targetLnik;
let targetDir = gameInfo.targetDir;

const isPhone = gameDir[0] === 'm';

if (gameInfo.targetDir) { // 传递了目标目录参数
  gameDir = gameInfo.targetDir;
} else if (!gameInfo.targetDir && isPhone) { // 未传递目标目录参数，并且是手机
  gameDir = `m/${gameDir}`;
}

//路径还原
gulp.task('restore:html', () => {
  gulp.src(`dist/${buildDir}/*.html`)
    .pipe(iconv({
      decoding: 'gbk',
      encoding: 'utf8'
    }))
    .pipe(replace(targetLnik, 'ossweb-img/'))
    .pipe(replace(`href="/${gameDir}/css/`, `href="css/`))
    .pipe(replace(`/${gameDir}/inc/`, `inc/`))
    .pipe(replace(`src="/${gameDir}/js/`, `src="js/`))
    .pipe(iconv({
      decoding: 'utf8',
      encoding: 'gbk'
    }))
    .pipe(gulp.dest(`./`));
});

gulp.task('restore:css', () => {
  gulp.src(`dist/${buildDir}/css/*.css`)
    .pipe(iconv({
      decoding: 'gbk',
      encoding: 'utf8'
    }))
    .pipe(replace(targetLnik, '../ossweb-img/'))
    .pipe(iconv({
      decoding: 'utf8',
      encoding: 'gbk'
    }))
    .pipe(gulp.dest(`./css`));
});

gulp.task('restore:js', () => {
  gulp.src(`dist/${buildDir}/js/*.js`)
    .pipe(iconv({
      decoding: 'gbk',
      encoding: 'utf8'
    }))
    .pipe(replace(targetLnik, 'ossweb-img/'))
    .pipe(iconv({
      decoding: 'utf8',
      encoding: 'gbk'
    }))
    .pipe(gulp.dest(`./js`));
});

gulp.task('restore:inc', () => {
  gulp.src(`dist/${buildDir}/inc/*.inc`)
    .pipe(iconv({
      decoding: 'gbk',
      encoding: 'utf8'
    }))
    .pipe(replace(targetLnik, 'ossweb-img/'))
    .pipe(iconv({
      decoding: 'utf8',
      encoding: 'gbk'
    }))
    .pipe(gulp.dest(`./inc`));
});

gulp.task('restore:image',  () => {

  gulp.src([`dist/${buildDir}/ossweb-img/*.jpg`, `dist/${buildDir}/ossweb-img/*.png`, `dist/${buildDir}/ossweb-img/*.gif`, `dist/${buildDir}/ossweb-img/*.mp4`])
    .pipe(gulp.dest('./ossweb-img'))

  gulp.src(`dist/${buildDir}/ossweb-img/*.css`)
    .pipe(iconv({
      decoding: 'gbk',
      encoding: 'utf8'
    }))
    .pipe(replace('./', '../ossweb-img/'))
    .pipe(iconv({
      decoding: 'utf8',
      encoding: 'gbk'
    }))
    .pipe(gulp.dest('./ossweb-img'));

  gulp.src(`dist/${buildDir}/ossweb-img/*.js`)
    .pipe(iconv({
      decoding: 'gbk',
      encoding: 'utf8'
    }))
    .pipe(replace(targetLnik, 'ossweb-img/'))
    .pipe(iconv({
      decoding: 'utf8',
      encoding: 'gbk'
    }))
    .pipe(gulp.dest('./ossweb-img'));
});


// 路径替换
gulp.task('build:html', () => {
  gulp.src(`./*.html`)
    .pipe(iconv({
      decoding: 'gbk',
      encoding: 'utf8'
    }))
    .pipe(replace('ossweb-img/', targetLnik))
    .pipe(replace(`href="css/`, `href="/${gameDir}/css/`))
    .pipe(replace(`inc/`, `/${gameDir}/inc/`))
    .pipe(replace(`src="js/`, `src="/${gameDir}/js/`, ))

    .pipe(iconv({
      decoding: 'utf8',
      encoding: 'gbk'
    }))
    .pipe(gulp.dest(`dist/${buildDir}`));
});

gulp.task('build:css', () => {
  gulp.src(`./css/*.css`)
    .pipe(iconv({
      decoding: 'gbk',
      encoding: 'utf8'
    }))
    .pipe(replace('../ossweb-img/', targetLnik))
    .pipe(iconv({
      decoding: 'utf8',
      encoding: 'gbk'
    }))
    .pipe(gulp.dest(`dist/${buildDir}/css`));
});

gulp.task('build:js', () => {
  gulp.src(`./js/*.js`)
    .pipe(iconv({
      decoding: 'gbk',
      encoding: 'utf8'
    }))
    .pipe(replace('ossweb-img/', targetLnik))
    .pipe(iconv({
      decoding: 'utf8',
      encoding: 'gbk'
    }))
    .pipe(gulp.dest(`dist/${buildDir}/js`));
});

gulp.task('build:inc', () => {
  gulp.src(`./inc/*.inc`)
    .pipe(iconv({
      decoding: 'gbk',
      encoding: 'utf8'
    }))
    .pipe(replace('ossweb-img/', targetLnik))
    .pipe(iconv({
      decoding: 'utf8',
      encoding: 'gbk'
    }))
    .pipe(gulp.dest(`dist/${buildDir}/inc`));
});

gulp.task('build:image',  () => {
  gulp.src(['./ossweb-img/*.jpg', './ossweb-img/*.png', './ossweb-img/*.gif', './ossweb-img/*.mp4'])
    .pipe(gulp.dest(`dist/${buildDir}/ossweb-img`));

  gulp.src('./ossweb-img/*.css')
    .pipe(iconv({
      decoding: 'gbk',
      encoding: 'utf8'
    }))
    .pipe(replace('../ossweb-img/', './'))
    .pipe(iconv({
      decoding: 'utf8',
      encoding: 'gbk'
    }))
    .pipe(gulp.dest(`dist/${buildDir}/ossweb-img`));

  gulp.src('./ossweb-img/*.js')
    .pipe(iconv({
      decoding: 'gbk',
      encoding: 'utf8'
    }))
    .pipe(replace('ossweb-img/', targetLnik))
    .pipe(iconv({
      decoding: 'utf8',
      encoding: 'gbk'
    }))
    .pipe(gulp.dest(`dist/${buildDir}/ossweb-img`));
});

// 压缩至桌面
gulp.task('zip',  () => {
  gulp.src(`dist/${buildDir}/**`)
    .pipe(zip(`${buildDir}.zip`))
    .pipe(gulp.dest(`${homeDir}/desktop`))
});

// 替换路径
gulp.task('restore', ['restore:html', 'restore:css', 'restore:js', 'restore:inc', 'restore:image']);

// 还原路径
gulp.task('build', ['build:html', 'build:css', 'build:js', 'build:inc', 'build:image']);