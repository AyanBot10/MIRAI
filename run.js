const { execSync } = require('child_process');

try {
  console.log('--- Forcing the bot to start on port 3000 ---');
  const port = null; // Force the port to null, ignoring any other port
  execSync(`PORT=${port} npm start`, { stdio: 'inherit' });

} catch (error) {
  console.error('Error occurred during the build process:', error);
  process.exit(1);
}
