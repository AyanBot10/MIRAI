const { execSync } = require('child_process');

try {
  console.log('--- Checking out the repository code ---');
  execSync('git checkout main', { stdio: 'inherit' });

  console.log('--- Setting up Node.js version 20.x ---');
  const nodeVersion = '20.x';
  execSync(`nvm install ${nodeVersion}`, { stdio: 'inherit' });
  execSync(`nvm use ${nodeVersion}`, { stdio: 'inherit' });

  console.log('--- Installing dependencies ---');
  execSync('npm install', { stdio: 'inherit' });

  console.log('--- Starting the bot ---');
  execSync('npm start', { stdio: 'inherit' });

} catch (error) {
  console.error('Error occurred during the build process:', error);
  process.exit(1);
}
