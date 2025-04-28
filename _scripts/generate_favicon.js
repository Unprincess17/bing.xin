const fs = require('fs');
const path = require('path');
const { copyFile } = require('fs/promises'); // Use promises for async operations

// Configuration
const CONFIG = {
  targetDir: path.join(__dirname, '../res/favicon/'), // Source directory for .ico files
  exclude: ['favicon.ico'], // Files to exclude
  outputPath: path.join(__dirname, '../docs/favicon.ico') // Destination for the copied file
};

async function generateFavicon() {
  try {
    const files = fs.readdirSync(CONFIG.targetDir)
      .filter(file => 
        file.endsWith('.ico') && 
        !CONFIG.exclude.includes(file)
      );

    if (files.length === 0) {
      console.error('Error: No .ico files found in the target directory that are not excluded.');
      return;
    }

    // Randomly select a file
    const randomIndex = Math.floor(Math.random() * files.length);
    const selectedFile = files[randomIndex];
    const sourcePath = path.join(CONFIG.targetDir, selectedFile);
    
    //Copy the file
    await copyFile(sourcePath, CONFIG.outputPath);

    console.log(`✅ Favicon generated successfully: ${selectedFile} copied to favicon.ico`);

  } catch (err) {
    console.error(`Error generating favicon: ${err}`);
  }
}


// Execute
generateFavicon();
