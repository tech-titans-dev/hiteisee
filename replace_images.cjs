const fs = require('fs');
const path = require('path');

const srcDir = 'c:/Users/Ankit/Desktop/FL/Brainstrom/src';

const replacements = [
  { file: 'pages/Login.tsx', from: "/gallery/10030.jpg", to: "/1.jpeg" },
  { file: 'pages/Index.tsx', from: "/gallery/10006.jpg", to: "/1.jpeg" },
  { file: 'pages/Index.tsx', from: "/gallery/10003.jpg", to: "/2.jpeg" },
  { file: 'pages/Index.tsx', from: "/gallery/10004.jpg", to: "/3.jpeg" },
  { file: 'pages/About.tsx', from: "/gallery/10006.jpg", to: "/1.jpeg" },
  { file: 'pages/About.tsx', from: "/gallery/10002.jpg", to: "/2.jpeg" },
  { file: 'components/shared/PageHero.tsx', from: "/gallery/10006.jpg", to: "/1.jpeg" },
  { file: 'pages/Apply.tsx', from: "/courses/10002.jpg", to: "/2.jpeg" }
];

for (const rep of replacements) {
  const filePath = path.join(srcDir, rep.file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(rep.from, rep.to);
    fs.writeFileSync(filePath, content);
  }
}

// Ensure the title is exactly "Brainstorm Computer Academy"
const indexHtmlPaths = [
  'c:/Users/Ankit/Desktop/FL/Brainstrom/index.html',
  'c:/Users/Ankit/Desktop/FL/Brainstrom/public/index.html'
];
for (const htmlPath of indexHtmlPaths) {
  if (fs.existsSync(htmlPath)) {
    let content = fs.readFileSync(htmlPath, 'utf8');
    content = content.replace(/<title>.*?<\/title>/gi, '<title>Brainstorm Computer Academy</title>');
    fs.writeFileSync(htmlPath, content);
  }
}

// Remove public/gallery and public/courses
const pubDir = 'c:/Users/Ankit/Desktop/FL/Brainstrom/public';
try { fs.rmSync(path.join(pubDir, 'gallery'), { recursive: true, force: true }); } catch (e) {}
try { fs.rmSync(path.join(pubDir, 'courses'), { recursive: true, force: true }); } catch (e) {}
