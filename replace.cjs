const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let newContent = content
        .replace(/Dewsoft Computer Institute/g, "Brainstorm Academy")
        .replace(/Dewsoft Computer Education/ig, "Brainstorm Computer Academy")
        .replace(/Dewsoft/g, "Brainstorm")
        .replace(/DEWSOFT/g, "BRAINSTORM")
        .replace(/dewsoft/g, "brainstorm")
        .replace(/www\.brainstormcomputer\.co\.in/g, "www.brainstormacademy.com")
        .replace(/brainstormkhordha@gmail\.com/g, "info@brainstormacademy.com");
      if (content !== newContent) {
        fs.writeFileSync(fullPath, newContent);
        console.log('Updated: ' + fullPath);
      }
    }
  }
}
replaceInDir('c:/Users/Ankit/Desktop/FL/Brainstrom/src');
