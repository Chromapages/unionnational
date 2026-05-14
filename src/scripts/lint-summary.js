const fs = require('fs');
const { execSync } = require('child_process');

try {
  const output = execSync('npx eslint src/ --format json --quiet', { maxBuffer: 1024 * 1024 * 10 }).toString();
  const results = JSON.parse(output);
  
  const fileSummary = results.map(file => ({
    filePath: file.filePath,
    errorCount: file.errorCount,
    warningCount: file.warningCount
  })).filter(file => file.errorCount > 0 || file.warningCount > 0)
    .sort((a, b) => b.errorCount - a.errorCount);
    
  console.log(JSON.stringify(fileSummary, null, 2));
} catch (err) {
  // If eslint exits with code 1, it still outputs the JSON
  if (err.stdout) {
    const results = JSON.parse(err.stdout.toString());
    const fileSummary = results.map(file => ({
      filePath: file.filePath,
      errorCount: file.errorCount,
      warningCount: file.warningCount
    })).filter(file => file.errorCount > 0 || file.warningCount > 0)
      .sort((a, b) => b.errorCount - a.errorCount);
      
    console.log(JSON.stringify(fileSummary, null, 2));
  } else {
    console.error(err);
  }
}
