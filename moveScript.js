const gulp = require('gulp')
gulp.src('./Frontend/buildFiles/**/*').pipe(gulp.dest('./dist/buildFiles'));
gulp.src('./requiredFile/**/*').pipe(gulp.dest('./dist'))