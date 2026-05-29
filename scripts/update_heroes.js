const fs = require('fs');
const path = require('path');

const pagesDir = 'c:/Users/Ankit/Desktop/PROJECTS/dewsoft/src/pages';
const filesToUpdate = ['About.tsx', 'Courses.tsx', 'Contact.tsx', 'Downloads.tsx', 'Certification.tsx', 'Apply.tsx', 'Verification.tsx', 'Payment.tsx'];

filesToUpdate.forEach(file => {
  const filePath = path.join(pagesDir, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Extract Title from h1
  const titleMatch = content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  let title = file.replace('.tsx', '');
  if (titleMatch) {
    title = titleMatch[1].replace(/<[^>]+>/g, '').trim();
  }
  
  // Add import if missing
  if (!content.includes('PageHero')) {
    content = content.replace(/import.*?;/, match => `${match}\nimport { PageHero } from "@/components/shared/PageHero";`);
  }
  
  // Find the first section which is always the hero in this template
  const sectionRegex = /<section[\s\S]*?<\/section>/;
  
  if (sectionRegex.test(content)) {
    const newHero = `<PageHero \n        title="${title}" \n        subtitle="Explore more about ${title} and how Dewsoft Computer Education empowers digital mastery." \n      />`;
    content = content.replace(sectionRegex, newHero);
    
    // Clean up AnimatedSection if no longer used (optional, keeping it is harmless)
    
    fs.writeFileSync(filePath, content);
    console.log(`Successfully updated ${file} with global PageHero component.`);
  } else {
    console.log(`Skipped ${file} - no section tag found.`);
  }
});
