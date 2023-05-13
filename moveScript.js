const gulp = require('gulp')
gulp.src('./Frontend/**/*').pipe(gulp.dest('./dist/FrontEnd'));
gulp.src('./requiredFile/**/*').pipe(gulp.dest('./dist'))