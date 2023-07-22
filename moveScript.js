const gulp = require('gulp')
gulp.src('./Frontend/buildFiles/**/*').pipe(gulp.dest('./dist/distFrontEndBuild'));
gulp.src('./requiredFile/**/*').pipe(gulp.dest('./dist'))