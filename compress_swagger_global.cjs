const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

function compressSwagger(content) {
  // Regex to match a swagger block
  // We'll replace the entire block by parsing its lines.
  const swaggerRegex = /\/\*\*[\s\S]*?@swagger[\s\S]*?\*\//g;
  
  return content.replace(swaggerRegex, (match) => {
    const lines = match.split('\n');
    const newLines = [];
    
    let inResponses = false;
    let inParameters = false;
    let paramLines = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Check if we hit the end of the block
      if (line.trim() === '*/') {
        if (inResponses) {
          newLines.push(' *     responses: { 200: { description: Success } }');
        }
        newLines.push(line);
        continue;
      }

      if (line.includes('*     responses:')) {
        inResponses = true;
        continue;
      }
      
      if (inResponses) {
        // Skip lines that belong to responses block
        // Wait, what if there's something after responses? Usually responses is last.
        // If we see a line that doesn't start with space indent under responses, it means responses block ended.
        // But swagger responses is at indent 4 (after *). So any line with indent > 4 after * is inside responses.
        const matchIndent = line.match(/\*(\s+)/);
        if (matchIndent && matchIndent[1].length > 5) {
          continue; // still in responses
        } else {
          // responses block ended!
          newLines.push(' *     responses: { 200: { description: Success } }');
          inResponses = false;
          newLines.push(line);
        }
        continue;
      }
      
      // Keep other lines
      newLines.push(line);
    }
    
    return newLines.join('\n');
  });
}

walkDir(path.join(__dirname, 'src', 'routes'), (filePath) => {
  if (filePath.endsWith('.ts')) {
    const content = fs.readFileSync(filePath, 'utf8');
    const updated = compressSwagger(content);
    if (content !== updated) {
      fs.writeFileSync(filePath, updated, 'utf8');
      console.log(`Updated: ${filePath}`);
    }
  }
});

