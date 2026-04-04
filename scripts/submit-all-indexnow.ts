// scripts/submit-all-indexnow.ts
import 'dotenv/config';
import fs from 'fs';
import path from 'path';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.bridgehomies.com';
const INDEXNOW_KEY = process.env.INDEXNOW_KEY;

if (!INDEXNOW_KEY) {
  console.error('❌ INDEXNOW_KEY is not set in .env file');
  console.error('Please add INDEXNOW_KEY=b8790e90fecf4ac294e0bd89b5bd4482 to your .env');
  process.exit(1);
}

console.log(`🚀 Submitting all URLs to IndexNow for ${SITE_URL}`);

const staticUrls = [
  `${SITE_URL}`,
  `${SITE_URL}/aboutus`,
  `${SITE_URL}/ai-ml-development`,
  `${SITE_URL}/blog`,
  `${SITE_URL}/design`,
  `${SITE_URL}/products`,
  `${SITE_URL}/terms`,
  `${SITE_URL}/webdev`,
  `${SITE_URL}/contact`,
  `${SITE_URL}/services`,
  // Add any other important static pages here
];

const contentDir = path.join(process.cwd(), 'content', 'blogs');
let blogUrls: string[] = [];

if (fs.existsSync(contentDir)) {
  const files = fs.readdirSync(contentDir)
    .filter(file => file.endsWith('.md') || file.endsWith('.mdx'));

  blogUrls = files.map(file => {
    const slug = file.replace(/\.mdx?$/, '');
    return `${SITE_URL}/blog/${slug}`;
  });

  console.log(`📚 Found ${blogUrls.length} blog posts`);
}

const allUrls = [...staticUrls, ...blogUrls];

console.log(`Total URLs to submit: ${allUrls.length}`);

async function submitToIndexNow(urls: string[]) {
  const payload = {
    host: 'www.bridgehomies.com',
    key: INDEXNOW_KEY,
    urlList: urls,
  };

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      console.log(`✅ Success! Submitted ${urls.length} URLs to IndexNow`);
    } else {
      const errorText = await response.text();
      console.error(`❌ IndexNow API error: ${response.status} - ${errorText}`);
    }
  } catch (error) {
    console.error('❌ Failed to connect to IndexNow:', error);
  }
}

// Since we only have ~20 pages, submit all at once
submitToIndexNow(allUrls);