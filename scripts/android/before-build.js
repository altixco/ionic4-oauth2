const fs = require('fs');
const path = require('path');

module.exports = function(context) {
  if (!context.opts.platforms.includes('android')) return;

  const sourceBuildExtrasPath = path.join(context.opts.projectRoot, 'build-extras.gradle')
  const destinationBuildExtrasPath = path.join(context.opts.projectRoot, 'platforms/android/app/build-extras.gradle');

  fs.copyFile(sourceBuildExtrasPath, destinationBuildExtrasPath, (err) => {
    if (err) {
      console.error('build-extras.gradle has not been copied');
      throw err;
    }
    console.log('build-extras.gradle was copied to successfully');
  });
}
