const fs = require('fs');
const path = require('path');

// Simple upload using fetch
async function uploadImage(filePath, token) {
  const fileName = path.basename(filePath);
  const fileBuffer = fs.readFileSync(filePath);
  const fileSize = fileBuffer.length;
  
  // First, get the asset URL
  const response = await fetch(`https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/assets/files/${process.env.SANITY_DATASET}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'image/png',
      'Content-Length': fileSize,
      'Authorization': `Bearer ${token}`,
      'Original-Filename': fileName
    },
    body: fileBuffer
  });
  
  if (!response.ok) {
    const error = await response.text();
    console.error('Error uploading:', error);
    return null;
  }
  
  const data = await response.json();
  console.log('Uploaded:', fileName, '->', data.document._id);
  return data.document;
}

const token = process.argv[2];
const images = [
  '/Volumes/MiDRIVE/Chroma-Team/UNT/website/unt-blog-posts/images/01-tax-season-survival-guide.png',
  '/Volumes/MiDRIVE/Chroma-Team/UNT/website/unt-blog-posts/images/02-small-business-tax-planning.png',
  '/Volumes/MiDRIVE/Chroma-Team/UNT/website/unt-blog-posts/images/03-common-tax-mistakes.png',
  '/Volumes/MiDRIVE/Chroma-Team/UNT/website/unt-blog-posts/images/04-tax-deadlines-2024.png',
  '/Volumes/MiDRIVE/Chroma-Team/UNT/website/unt-blog-posts/images/05-maximizing-tax-deductions.png'
];

process.env.SANITY_PROJECT_ID = 'p1x9y3wz';
process.env.SANITY_DATASET = 'production';

(async () => {
  for (const img of images) {
    await uploadImage(img, token);
  }
})();
