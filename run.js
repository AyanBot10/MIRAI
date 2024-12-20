const { execSync } = require('child_process');

try {
  console.log('--- Starting the bot ---');
  execSync('npm start', { stdio: 'inherit' });

} catch (error) {
  console.error('Error occurred during the build process:', error);
  process.exit(1);
}
