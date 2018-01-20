const gulp = require('gulp');
const babel = require('gulp-babel');


function build() {
    gulp.src('src/index.js')
        .pipe(babel({presets: ['env']}))
        .pipe(gulp.dest('dist'))
}

gulp.task('build', build);