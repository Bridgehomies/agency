import http from 'http';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const PORT = 3001;
const CONTENT_DIR = path.join(process.cwd(), 'content', 'blogs');
const UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads', 'blog');

if (!fs.existsSync(CONTENT_DIR)) {
  fs.mkdirSync(CONTENT_DIR, { recursive: true });
}

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

function getAllPosts() {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'));

  return files
    .map((file) => {
      const raw = fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8');
      const { data, content } = matter(raw);
      const slug = data.slug || file.replace(/\.mdx?$/, '');

      return {
        id: data.id || slug,
        slug,
        title: data.title || '',
        excerpt: data.excerpt || '',
        author: data.author || '',
        authorRole: data.authorRole || '',
        date: data.date || '',
        readTime: data.readTime || '1 min',
        category: data.category || 'General',
        tags: Array.isArray(data.tags) ? data.tags : [],
        coverImage: data.coverImage || '',
        views: Number(data.views || 0),
        published: data.published === undefined ? false : Boolean(data.published),
        seoTitle: data.seoTitle || '',
        seoDescription: data.seoDescription || '',
        schemaType: data.schemaType || 'BlogPosting',
        faq: Array.isArray(data.faq) ? data.faq : [],
        content,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function escapeQuotes(value = '') {
  return String(value).replace(/"/g, '\\"');
}

// ─── Multipart parser (no dependencies) ──────────────────────────────────────

function parseMultipart(buffer, boundary) {
  const boundaryBuf = Buffer.from('--' + boundary);
  const parts = [];
  let start = 0;

  while (start < buffer.length) {
    const boundaryIdx = buffer.indexOf(boundaryBuf, start);
    if (boundaryIdx === -1) break;

    const headerStart = boundaryIdx + boundaryBuf.length + 2; // skip \r\n
    const headerEnd = buffer.indexOf(Buffer.from('\r\n\r\n'), headerStart);
    if (headerEnd === -1) break;

    const headerStr = buffer.slice(headerStart, headerEnd).toString('utf8');
    const dataStart = headerEnd + 4; // skip \r\n\r\n

    const nextBoundary = buffer.indexOf(boundaryBuf, dataStart);
    const dataEnd = nextBoundary === -1 ? buffer.length : nextBoundary - 2; // trim \r\n before boundary

    const data = buffer.slice(dataStart, dataEnd);
    parts.push({ headers: headerStr, data });
    start = nextBoundary === -1 ? buffer.length : nextBoundary;
  }

  return parts;
}

function getHeaderParam(headers, name) {
  const match = headers.match(new RegExp(`${name}="([^"]+)"`));
  return match ? match[1] : null;
}

// ─── Server ───────────────────────────────────────────────────────────────────

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // ── GET /posts ─────────────────────────────────────────────────────────────
  if (req.method === 'GET' && req.url === '/posts') {
    try {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ posts: getAllPosts() }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  // ── POST /upload ───────────────────────────────────────────────────────────
  if (req.method === 'POST' && req.url === '/upload') {
    const contentType = req.headers['content-type'] || '';
    const boundaryMatch = contentType.match(/boundary=(.+)$/);

    if (!boundaryMatch) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Missing multipart boundary.' }));
      return;
    }

    const boundary = boundaryMatch[1].trim();
    const chunks = [];

    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      try {
        const buffer = Buffer.concat(chunks);
        const parts = parseMultipart(buffer, boundary);

        const filePart = parts.find((p) =>
          p.headers.includes('Content-Disposition') && p.headers.includes('filename=')
        );

        if (!filePart || filePart.data.length === 0) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'No file found in request.' }));
          return;
        }

        const filename = getHeaderParam(filePart.headers, 'filename') || 'upload.jpg';
        const ext = path.extname(filename).toLowerCase() || '.jpg';
        const safeName = `blog-${Date.now()}${ext}`;
        const destPath = path.join(UPLOAD_DIR, safeName);

        fs.writeFileSync(destPath, filePart.data);

        const url = `/uploads/blog/${safeName}`;
        console.log(`[upload] Saved ${safeName} (${filePart.data.length} bytes)`);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, url }));
      } catch (err) {
        console.error('[upload] Error:', err);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // ── POST /save ─────────────────────────────────────────────────────────────
  if (req.method === 'POST' && req.url === '/save') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      try {
        const post = JSON.parse(body);
        const slug = post.slug || post.id || `post-${Date.now()}`;
        const filePath = path.join(CONTENT_DIR, `${slug}.mdx`);

        const frontmatter = `---
id: "${post.id}"
slug: "${slug}"
title: "${escapeQuotes(post.title)}"
excerpt: "${escapeQuotes(post.excerpt)}"
author: "${escapeQuotes(post.author)}"
authorRole: "${escapeQuotes(post.authorRole)}"
date: "${post.date || new Date().toISOString()}"
readTime: "${escapeQuotes(post.readTime || '1 min')}"
category: "${escapeQuotes(post.category || 'General')}"
tags: ${JSON.stringify(post.tags || [])}
coverImage: "${escapeQuotes(post.coverImage)}"
views: ${post.views || 0}
published: ${post.published ? 'true' : 'false'}
seoTitle: "${escapeQuotes(post.seoTitle)}"
seoDescription: "${escapeQuotes(post.seoDescription)}"
schemaType: "${escapeQuotes(post.schemaType || 'BlogPosting')}"
faq: ${JSON.stringify(post.faq || [])}
---
`;

        const fileContent = frontmatter + '\n' + (post.content || '');
        fs.writeFileSync(filePath, fileContent, 'utf8');

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, slug }));
      } catch (err) {
        console.error("Save error:", err);
        res.writeHead(500);
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // ── DELETE /delete/:slug ───────────────────────────────────────────────────
  if (req.method === 'DELETE' && req.url.startsWith('/delete/')) {
    const slug = req.url.split('/delete/')[1];
    try {
      const mdxPath = path.join(CONTENT_DIR, `${slug}.mdx`);
      const mdPath = path.join(CONTENT_DIR, `${slug}.md`);
      if (fs.existsSync(mdxPath)) fs.unlinkSync(mdxPath);
      if (fs.existsSync(mdPath)) fs.unlinkSync(mdPath);

      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ success: true }));
    } catch (err) {
      res.writeHead(500);
      res.end(JSON.stringify({ error: err.message }));
    }
    return;
  }

  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`[Admin Portal Auth] Content saver API listening on http://localhost:${PORT}`);
});
