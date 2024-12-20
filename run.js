const { execSync } = require('child_process');

try {
  console.log('--- Forcing the bot to start on port ---');
   //ignoring any other port
  execSync(`npm start`, { stdio: 'inherit' });

} catch (error) {
  console.error('Error occurred during the build process:', error);
  process.exit(1);
}
